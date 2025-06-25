import { router } from './trpc-instance'
import { stripePaymentRouter } from './routers/stripe'

export const appRouter = router({
  stripe: stripePaymentRouter,
})

export type AppRouter = typeof appRouter
