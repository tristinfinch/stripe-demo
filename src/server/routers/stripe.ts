import { publicProcedure, router } from '../trpc'
import { z } from 'zod'

export const stripeRouter = router({
  createCheckoutSession: publicProcedure
    .input(z.object({
      productId: z.string(),
      quantity: z.number().min(1),
      successUrl: z.string(),
      cancelUrl: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      const session = await ctx.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price: input.productId,
          quantity: input.quantity
        }],
        mode: 'payment',
        success_url: input.successUrl,
        cancel_url: input.cancelUrl,
        metadata: {
          product_id: input.productId
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
