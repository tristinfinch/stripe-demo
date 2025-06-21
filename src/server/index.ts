import { router } from './trpc'
import { stripeRouter } from './routers/stripe'

export const appRouter = router({
  stripe: stripeRouter,
})

export type AppRouter = typeof appRouter
