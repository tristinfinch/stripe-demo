import { test, expect } from '@playwright/test'

test('Payment Links flow', async ({ page }) => {
  // Navigate to payment links page
  await page.goto('/payment-links')
  
  // Click the Buy Now button
  const buyButton = page.getByRole('link', { name: 'Buy Now' })
  await expect(buyButton).toBeVisible()
  await buyButton.click()

  // Verify we're on Stripe Checkout
  await expect(page).toHaveURL(/checkout\.stripe\.com/)

  // Simulate successful payment (test mode)
  await page.getByTestId('hosted-payment-submit-button').click()

  // Verify we're redirected to success page
  await expect(page).toHaveURL(/success/)
  await expect(page.getByText('Payment Successful!')).toBeVisible()
})
