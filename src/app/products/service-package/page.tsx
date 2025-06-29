'use client'

import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useCart } from '@/providers/cart-provider'
import Image from 'next/image'

export default function ServicePackagePage() {
  const { addItem } = useCart()

  return (
    <div className="container py-12 mx-auto px-4">
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-3xl font-bold mb-2 text-center">Finch Foundry Flight Pack Service Package™</h1>
        <p className="text-xl italic text-center mb-8">
          Because even turbo-charged dreams need an occasional tune-up.
        </p>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/5">
              <div className="bg-slate-100 h-64 flex items-center justify-center">
                <Image
                  src="/images/service-package.png"
                  alt="Finch Foundry Service Package"
                  width={500}
                  height={500}
                  className="w-full h-full object-contain"
                />
              </div>
          </div>
          <div className="md:w-3/5">
            <div className="mb-8">
              <p className="mb-4">
                Your Flight Pack is the envy of pigeons everywhere—but after a few audacious commutes, 
                its thrusters have more crumbs in them than your car's cup-holder. Enter the Service Package: 
                a pit-crew, spa-day, and tech-support hotline rolled into one glorious maintenance bundle. 
                Think "Formula 1 garage," only with fewer tires and more "please don't explode" checklists.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-2">What's Included:</h3>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li><b>Feather-Lite Full Tune-Up:</b> We tighten every bolt, calibrate every sensor, and remove yesterday's bugs—literal and software. Your jetpack will purr like a caffeinated hummingbird.</li>
                <li><b>Unicorn-Tear Fluid Flush:</b> Replace that mystical propellant before it turns into glittery sludge. Fresh tears mean 23% better thrust and 100% less rainbow residue on your landing pad.</li>
                <li><b>WhisperLoud™ Noise Re-Balancing:</b> Shaves 3 decibels off your backyard-airliner roar. Your neighbors may notice 8% less panic during your morning launch routine.</li>
                <li><b>Smart Landing Assist Re-sync:</b> Ensures your jetpack still distinguishes "driveway" from "rosebush." Also updates the "That's-A-Pool-Not-A-Landing-Pad" detection algorithm.</li>
                <li><b>Strap Therapy & Re-padding:</b> Distributes the weight of your existential dread and the pack more evenly. Now with 40% more memory foam and 60% less chafing.</li>
                <li><b>Firmware v2.3 "Please-Don't-Sue-Us" Patch:</b> New safety subroutines, bug fixes, and—rumor has it—an Easter-egg karaoke mode. (Singing while flying voids warranty.)</li>
              </ul>

              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                <p className="text-yellow-700">
                  <b>Service Schedule:</b> Every 50 flight hours or after any encounter with a flock of geese, whichever comes first.
                </p>
              </div>

              <div className="mt-8 flex gap-4">
                <Button 
                  className="flex items-center gap-2"
                  onClick={() => addItem({
                    id: 'service-package',
                    name: 'Finch Foundry Service Package™',
                    priceId: 'price_1RdvdiAcie4ZOM3H34mIJ3IF',
                    price: 25.99,
                    image: '/images/service-package.png'
                  })}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </Button>
                <Button asChild variant="outline">
                  <Link href="/payment-links?product=service-package">
                    Buy Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
