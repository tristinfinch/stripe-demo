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

  let periodEnd: number | null = null
  
  if (session.subscription) {
    try {
      const subscriptionId = typeof session.subscription === 'string' 
        ? session.subscription 
        : (session.subscription as any).id
      const subscription = await stripe.subscriptions.retrieve(subscriptionId) as any
      periodEnd = subscription.current_period_end
    } catch (error) {
      console.error('Failed to retrieve subscription:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
      <h1 className="text-3xl font-bold mb-4">
        Thanks, {session.customer_details?.name || 'friend'}!
      </h1>
      {session.metadata?.cartId && (
        <p className="text-xl mb-4">
          Your order #{session.metadata.cartId} is confirmed.
        </p>
      )}
      {periodEnd && (
        <p className="text-xl mb-4">
          Subscription: Active (renews {new Date(periodEnd * 1000).toLocaleDateString()})
        </p>
      )}
      {session.subscription && !periodEnd && (
        <p className="text-xl mb-4">
          Subscription: Active
        </p>
      )}
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
