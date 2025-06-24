import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'
import type Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const requestHeaders = await headers()
  const signature = requestHeaders.get('stripe-signature')!

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      // TODO: Implement order fulfillment logic
      console.log('Order completed:', session.metadata?.cartId)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Unknown error'
    console.error('Webhook error:', error)
    return NextResponse.json({ error }, { status: 400 })
  }
}
