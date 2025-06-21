import { publicProcedure, router } from '../trpc'
import { z } from 'zod'

export const stripeRouter = router({
  createCheckoutSession: publicProcedure
    .input(z.object({}))
    .mutation(async () => {
      throw new Error('Not implemented')
    }),

  createPaymentIntent: publicProcedure
    .input(z.object({}))
    .mutation(async () => {
      throw new Error('Not implemented')
    }),

  chargeDirect: publicProcedure
    .input(z.object({}))
    .mutation(async () => {
      throw new Error('Not implemented')
    }),
})
