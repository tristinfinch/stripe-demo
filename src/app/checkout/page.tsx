'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useCart } from '@/providers/cart-provider'

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false)
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  const { cart, clearCart } = useCart()

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      // Get the first item's mode (all items should have same mode)
      const mode = cart[0].priceId.includes('subscription') ? 'subscription' : 'payment'
      
      const res = await fetch('/api/stripe/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: cart[0].priceId,
          mode
        })
      })

      if (!res.ok) throw new Error('Failed to create session')
      
      const { id } = await res.json()
      const stripe = await stripePromise
      await stripe?.redirectToCheckout({ sessionId: id })
      clearCart()
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to initiate checkout')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-12 mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Checkout</h1>
        
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-2/5">
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="w-20 h-20 object-contain"
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p>${(item.price / 100).toFixed(2)}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-3/5">
            <div className="mb-8">
              <p className="text-2xl font-bold mb-4">
                Total: ${(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) / 100).toFixed(2)}
              </p>
            </div>
            
            <div className="flex gap-4">
              <Button
                onClick={handleCheckout}
                disabled={isLoading || cart.length === 0}
                size="lg"
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Checkout (${cart.length} item${cart.length !== 1 ? 's' : ''})`
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
