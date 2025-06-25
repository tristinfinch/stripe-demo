import { stripePaymentRouter } from './stripe'
import { describe } from 'vitest'

describe('stripePaymentRouter', () => {
  it('should be defined', () => {
    expect(stripePaymentRouter).toBeDefined()
  })
})
