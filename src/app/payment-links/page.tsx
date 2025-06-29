'use client'

import { Button } from "@/components/ui/button"
import Image from 'next/image'

const products = [
  {
    id: 'flight-pack',
    name: 'Finch Foundry Flight Pack™',
    price: '$99.99',
    description: 'One-time purchase',
    image: '/images/finchfoundryflightpack.png',
    paymentLink: 'https://buy.stripe.com/test_14AeVca4b5lOfwl6uTffy01'
  },
  {
    id: 'service-package',
    name: 'Service Package™',
    price: '$25.99',
    description: 'One-time maintenance package',
    image: '/images/service-package.png',
    paymentLink: 'https://buy.stripe.com/test_dRmbJ0gsz6pS97XdXlffy02'
  },
  {
    id: 'subscription',
    name: 'Premium Subscription',
    price: '$5/month',
    description: 'Recurring monthly payment',
    image: '/images/subscription.png',
    paymentLink: 'https://buy.stripe.com/test_dRmeVca4b01u97X5qPffy00'
  }
]

export default function PaymentLinksPage() {
  return (
    <div className="container py-12 mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Purchase Options</h1>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm">
            <div className="bg-slate-100 h-48 flex items-center justify-center p-4">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className="object-contain h-full"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{product.name}</h2>
              <p className="text-2xl font-bold mb-2">{product.price}</p>
              <p className="text-sm text-gray-600 mb-4">{product.description}</p>
              <Button asChild className="w-full">
                <a href={product.paymentLink} target="_blank" rel="noopener noreferrer">
                  Buy Now
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
