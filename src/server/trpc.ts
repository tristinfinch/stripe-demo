import { router } from './trpc-instance'
import Stripe from 'stripe'
import { stripePaymentRouter } from './routers/stripe'

interface Context {
  stripe: Stripe
}


export function createContext(): Context {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set')
  }
  return {
    stripe: new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-05-28.basil'
    })
  }
}

export const appRouter = router({
  stripePayments: stripePaymentRouter
})

export type AppRouter = typeof appRouter

export function createTestCaller() {
  return appRouter.createCaller({
    stripe: {
      checkout: {
        sessions: {
          create: async () => ({ id: 'test_id', url: 'test_url' })
        }
      }
    } as unknown as Stripe
  })
}
