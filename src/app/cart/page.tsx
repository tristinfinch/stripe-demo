'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/providers/cart-provider'
import Image from 'next/image'
import Link from 'next/link'
import { loadStripe } from '@stripe/stripe-js'

function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false)
  const { cart, clearCart } = useCart()
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify({ 
          cart: cart.map(item => ({ 
            priceId: item.priceId, 
            qty: item.quantity 
          }))
        }),
        headers: { 'Content-Type': 'application/json' },
      })
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
    <Button 
      onClick={handleCheckout}
      disabled={isLoading}
      className="w-full"
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </>
      ) : (
        'Proceed to Checkout'
      )}
    </Button>
  )
}

export default function CartPage() {
  const { cart, removeItem, updateQuantity, clearCart, itemCount } = useCart()

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="container py-12 mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      {itemCount === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-4 text-foreground">Your cart is empty</p>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <div className="bg-card rounded-lg shadow-md p-6">
              <ul className="divide-y">
                {cart.map(item => (
                  <li key={item.id} className="py-6 flex flex-col sm:flex-row">
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                    
                    <div className="ml-4 flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-medium">{item.name}</h3>
                          <p className="text-gray-500 mt-1">${item.price.toFixed(2)}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </Button>
                      </div>
                      
                      <div className="flex-1 flex items-end justify-between">
                        <div className="flex items-center mt-4">
                          <label htmlFor={`quantity-${item.id}`} className="mr-2">Qty:</label>
                          <input
                            type="number"
                            id={`quantity-${item.id}`}
                            min="1"
                            value={item.quantity}
                            onChange={e => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="w-16 border rounded-md py-1 px-2"
                          />
                        </div>
                        
                        <p className="text-lg font-medium text-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6">
                <Button variant="secondary" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/3">
            <div className="bg-card rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <CheckoutButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
