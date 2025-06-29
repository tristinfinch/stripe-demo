'use client'

import { CartProvider } from '@/providers/cart-provider'
import { Header } from '@/components/header'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
        <Header />
        {children}
      </div>
    </CartProvider>
  )
}
