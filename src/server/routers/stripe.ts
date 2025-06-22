import { publicProcedure, router } from '../trpc-instance'
import { z } from 'zod'

export const stripePaymentRouter = router({
    createCheckoutSession: publicProcedure
    .input(z.object({
      quantity: z.number().min(1),
      successUrl: z.string(),
      cancelUrl: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      const session = await ctx.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price: 'price_1RcVamAcie4ZOM3HyFtgsfEE',
          quantity: input.quantity
        }],
        mode: 'subscription',
        success_url: `${input.successUrl}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${input.cancelUrl}?session_id={CHECKOUT_SESSION_ID}`,
        metadata: {
          product_id: 'price_1RcVamAcie4ZOM3HyFtgsfEE'
        }
      })
      return { sessionId: session.id }
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
