'use client'

import { Button } from '@/components/ui/button'
import { trpc } from '@/utils/api'
import { Loader2 } from 'lucide-react'

export default function CheckoutPage() {
  const { mutate, isPending } = trpc.stripe.createCheckoutSession.useMutation({
    onSuccess: (data) => {
      window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`
    },
    onError: (error) => {
      console.error('Checkout error:', error)
      alert('Failed to initiate checkout: ' + error.message)
    }
  })

  const handleCheckout = () => {
    mutate({
      productId: 'price_123', // Replace with actual test price ID
      quantity: 1,
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <Button 
          onClick={handleCheckout}
          disabled={isPending}
          className="w-full"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Proceed to Payment'
          )}
        </Button>
      </div>
    </div>
  )
}
