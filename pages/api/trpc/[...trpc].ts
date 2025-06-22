import { createNextApiHandler } from '@trpc/server/adapters/next'
import { appRouter } from '@/server/trpc'
import { createContext } from '@/server/trpc'

export default createNextApiHandler({
  router: appRouter,
  createContext: async () => {
    try {
      return await createContext()
    } catch (err) {
      console.error('Failed to create context:', err)
      throw err
    }
  },
  onError({ error }) {
    console.error('TRPC error:', error)
  }
})
