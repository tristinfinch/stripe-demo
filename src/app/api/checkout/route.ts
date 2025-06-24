import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'

interface CartItem {
  priceId: string
  qty: number
}

export async function POST(req: Request) {
  const requestHeaders = await headers()
  const idempotencyKey = requestHeaders.get('x-idempotency-key') || crypto.randomUUID()
  const { cart } = (await req.json()) as { cart: CartItem[] }

  // Validate price IDs against environment variables
  const line_items = cart.map((item) => ({
    price: item.priceId === 'basic' ? process.env.STRIPE_PRICE_BASIC : item.priceId,
    quantity: item.qty,
  }))

  const session = await stripe.checkout.sessions.create(
    {
      mode: 'subscription',
      line_items,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
      metadata: { cartId: crypto.randomUUID() },
    },
    { idempotencyKey }
  )

  return NextResponse.json({ id: session.id })
}

// Keep existing GET endpoint for session retrieval
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('id')

  if (!sessionId) {
    return NextResponse.json(
      { error: 'Session ID is required' },
      { status: 400 }
    )
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return NextResponse.json({ session })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to retrieve session', details: message },
      { status: 500 }
    )
  }
}
