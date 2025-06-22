'use client'

import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Stripe from 'stripe'

function SuccessPageContent() {
  const searchParams = useSearchParams()
  const [session, setSession] = useState<Stripe.Checkout.Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!searchParams) {
      setError('Invalid URL parameters')
      setLoading(false)
      return
    }
    const sessionId = searchParams.get('session_id')
    if (!sessionId) {
      setError('No session ID found')
      setLoading(false)
      return
    }

    const fetchSession = async () => {
      try {
        const response = await fetch(`/api/stripe/session?id=${sessionId}`)
        if (!response.ok) throw new Error('Failed to fetch session')
        const data = await response.json()
        setSession(data.session)
        // Clean URL after loading session
        window.history.replaceState({}, document.title, window.location.pathname)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchSession()
  }, [searchParams])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-4">Processing payment...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-600">Error</h1>
        <p className="text-xl mb-8">{error}</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      {session?.amount_total && (
        <p className="text-xl mb-4">
          Amount: ${(session.amount_total / 100).toFixed(2)}
        </p>
      )}
      <p className="text-xl mb-8">
        Thank you for your purchase!
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12 max-w-2xl text-center">Loading payment details...</div>}>
      <SuccessPageContent />
    </Suspense>
  )
}
