'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useCart } from '@/providers/cart-provider'

export default function FlightPackPage() {
  const { addItem } = useCart()
  return (
    <div className="container py-12 mx-auto px-4">
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-3xl font-bold mb-2 text-center">Finch Foundry Flight Pack™</h1>
        <p className="text-xl italic text-center mb-8">
          Your commute just got vertical.
        </p>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/5">
            <Image
              src="/images/finchfoundryflightpack.png"
              alt="Finch Foundry Flight Pack"
              width={500}
              height={500}
              className="w-full h-auto max-h-[400px] object-contain rounded-none"
              priority
            />
          </div>
          <div className="md:w-3/5">
            <div className="mb-8">
              <p className="mb-4">
                Finally, a jetpack that won't set your pants on fire <i>(we're looking at you, 1960s prototypes)</i>. 
                The Flight Pack combines cutting-edge propulsion technology with our proprietary 
                <span className="font-semibold"> "Please-Don't-Sue-Us"</span> safety system to deliver the aerial commuting solution you've been dreaming about since watching Saturday morning cartoons.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-2">Key Features:</h3>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li><b>Zero-to-Hero Mode:</b> Achieve heights of up to 500 feet, or roughly 100 disappointed pigeons</li>
                <li><b>WhisperLoud™ Technology:</b> Only slightly louder than a commercial airliner taking off in your backyard</li>
                <li><b>Smart Landing Assist:</b> Because "falling with style" is only charming in animated movies</li>
                <li><b>Premium Comfort Straps:</b> Engineered to distribute the crushing weight of your childhood dreams evenly across your shoulders</li>
              </ul>

              <h3 className="text-xl font-bold mt-6 mb-2">Technical Specifications:</h3>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li><b>Flight time:</b> 23 minutes (or one really good guitar solo)</li>
                <li><b>Maximum speed:</b> 65 mph (fast enough to outrun your responsibilities)</li>
                <li><b>Fuel type:</b> Eco-friendly* compressed unicorn tears <i>(*results may vary)</i></li>
                <li><b>Weight capacity:</b> Up to 250 lbs of human and/or emotional baggage</li>
              </ul>

              <p className="italic text-sm mt-6 mb-4">
                <b>Warning:</b> Side effects may include: sudden popularity at parties, jealous stares from birds, and an irresistible urge to hum superhero theme songs. Not recommended for indoor use, wedding proposals, or avoiding your ex at the grocery store.
              </p>

              <p className="text-xs text-gray-500">
                Patent pending. FAA approval pending. Your neighbor's approval definitely pending.
              </p>

              <div className="mt-8 flex gap-4">
                <Button 
                  className="flex items-center gap-2"
                  onClick={() => addItem({
                    id: 'flight-pack',
                    name: 'Finch Foundry Flight Pack™',
                    priceId: 'price_1RdfXkAcie4ZOM3HGAO3UxBp',
                    price: 99.99,
                    image: '/images/finchfoundryflightpack.png'
                  })}
                >
                  Add to Cart
                </Button>
                <Button asChild variant="outline">
                  <Link href="/payment-links?product=flight-pack">
                    Buy Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
