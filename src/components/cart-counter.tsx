import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/providers/cart-provider'

export function CartCounter() {
  const { itemCount } = useCart()

  return (
    <Link href="/cart" className="relative flex items-center">
      <ShoppingCart className="h-6 w-6" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  )
}
