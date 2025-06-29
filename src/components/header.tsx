import Link from 'next/link'
import { CartCounter } from './cart-counter'

export function Header() {
  return (
    <header className="bg-slate-800 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white">
          Stripe Demo
        </Link>
        
        <nav className="flex items-center gap-6">
        <Link href="/" className="text-white hover:text-blue-300">
          Products
        </Link>
          <Link href="/cart" className="text-white hover:text-blue-300">
            Cart
          </Link>
          <CartCounter />
        </nav>
      </div>
    </header>
  )
}
