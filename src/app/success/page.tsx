import { stripe } from '@/lib/stripe'
import { cookies } from 'next/headers'
import Link from 'next/link'

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
        Your {session.mode === 'subscription' ? 'subscription' : 'purchase'} was successful!
      </p>
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <h3 className="font-bold mb-2">Order Details:</h3>
        <p>Product: {session.metadata?.productName || 'Unknown'}</p>
        <p>Amount: ${(session.amount_total || 0) / 100}</p>
        <p>Status: {typeof session.payment_intent === 'object' ? session.payment_intent?.status : 'Processing'}</p>
      </div>
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
