import { stripeRouter } from './stripe'
import { router } from '../trpc'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Stripe from 'stripe'

describe('stripeRouter', () => {
  const mockCreate = vi.fn().mockResolvedValue({
    id: 'test_session_id',
    url: 'https://checkout.stripe.com/pay/test_session_id'
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should create checkout session', async () => {
    const appRouter = router({
      stripe: stripeRouter
    })
    
    const caller = appRouter.createCaller({ 
      stripe: {
        checkout: {
          sessions: {
            create: mockCreate
          }
        }
      } as unknown as Stripe
    })
    const result = await caller.stripe.createCheckoutSession({
      productId: 'price_test123',
      quantity: 1,
      successUrl: 'http://localhost:3000/success',
      cancelUrl: 'http://localhost:3000/cancel'
    })

    expect(result).toEqual({
      sessionId: 'test_session_id'
    })
    expect(mockCreate).toHaveBeenCalledWith({
      payment_method_types: ['card'],
      line_items: [{
        price: 'price_test123',
        quantity: 1
      }],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
      metadata: {
        product_id: 'price_test123'
      }
    })
  })
})
