import { stripe } from '@/lib/stripe'
import { cookies } from 'next/headers'
import Link from 'next/link'
import type Stripe from 'stripe'

export default async function SuccessPage() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('session_id')?.value
  if (!sessionId) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-600">Error</h1>
        <p className="text-xl mb-8">Missing session ID</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    )
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['payment_intent'],
  })

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
      <h1 className="text-3xl font-bold mb-4">
        Thanks, {session.customer_details?.name || 'friend'}!
      </h1>
      {session.metadata?.cartId && (
        <p className="text-xl mb-4">
          Your purchase #{session.metadata.cartId} is confirmed.
        </p>
      )}
      <p className="text-xl mb-4">
        Your one-time payment was successful
      </p>
      <p className="text-xl mb-4">
        Status: {typeof session.payment_intent === 'object' ? session.payment_intent?.status : 'Processing'}
      </p>
      {session.customer_details?.email && (
        <p className="text-xl mb-4">
          Receipt sent to: {session.customer_details.email}
        </p>
      )}
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  )
}
