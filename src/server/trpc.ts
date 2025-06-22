import { initTRPC } from '@trpc/server'
import Stripe from 'stripe'
import { stripeRouter } from './routers/stripe'

interface Context {
  stripe: Stripe
}

const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure
export const middleware = t.middleware

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
  stripe: stripeRouter
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
