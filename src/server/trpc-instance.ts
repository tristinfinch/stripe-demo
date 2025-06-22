import { initTRPC } from '@trpc/server';
import Stripe from 'stripe';

interface Context {
  stripe: Stripe;
}

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;
