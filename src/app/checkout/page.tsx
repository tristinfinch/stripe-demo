'use client'

import { Button } from '@/components/ui/button'
import { trpc } from '@/utils/api'
import { Loader2, ShoppingCart } from 'lucide-react'
import Image from 'next/image'

export default function CheckoutPage() {
  const { mutate: createCheckout, isPending } = trpc.stripePayments.createCheckoutSession.useMutation({
    onSuccess: (data: { sessionId: string }) => {
      window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`
    },
    onError: (error) => {
      console.error('Checkout error:', error)
      alert('Failed to initiate checkout: ' + error.message)
    }
  })

  const handleBuyNow = () => {
    createCheckout({
      quantity: 1,
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`
    })
  }

  const handleAddToCart = () => {
    // TODO: Implement cart functionality
    alert('Cart functionality coming soon!')
  }

  return (
    <div className="container py-12 mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Finch Foundry Flight Pack™</h1>
        <p className="text-xl italic text-center mb-8">
          Your commute just got vertical.
        </p>
        
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-2/5">
            <Image
              src="/images/finchfoundryflightpack.png"
              alt="Finch Foundry Flight Pack"
              width={500}
              height={500}
              className="w-full h-auto max-h-[400px] object-contain rounded-none"
              priority
            />
          </div>
          <div className="md:w-3/5">
            <div className="mb-8">
              <p className="mb-4">
                Finally, a jetpack that won't set your pants on fire (we're looking at you, 1960s prototypes). 
                The Flight Pack combines cutting-edge propulsion technology with our proprietary 
                <span className="font-semibold"> "Please-Don't-Sue-Us"</span> safety system.
              </p>
              <p className="text-2xl font-bold mb-4">$5/month</p>
            </div>
            
            <div className="flex gap-4">
              <Button
                onClick={handleBuyNow}
                disabled={isPending}
                size="lg"
                className="flex-1"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Buy Now'
                )}
              </Button>
              <Button
                onClick={handleAddToCart}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
