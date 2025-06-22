import { stripePaymentRouter } from './stripe'
import { router } from '../trpc-instance'
import { AppRouter } from '../trpc'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Stripe from 'stripe'
import { AnyRouter } from '@trpc/server'

describe('stripePaymentRouter', () => {
  const mockCreate = vi.fn().mockResolvedValue({
    id: 'test_session_id',
    url: 'https://checkout.stripe.com/pay/test_session_id'
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should create checkout session', async () => {
    const appRouter: AppRouter = router({
      stripePayments: stripePaymentRouter
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
    const result = await caller.stripePayments.createCheckoutSession({
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
        price: 'price_1RcVamAcie4ZOM3HyFtgsfEE',
        quantity: 1
      }],
      mode: 'subscription',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
      metadata: {
        product_id: 'price_1RcVamAcie4ZOM3HyFtgsfEE'
      }
    })
  })
})
