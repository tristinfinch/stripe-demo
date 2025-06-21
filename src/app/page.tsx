import { CreditCard, Link2, ShoppingCart, Zap } from "lucide-react"
import Image from 'next/image'
import { IntegrationCard } from '../components/IntegrationCard'

export default function Home() {
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
              quality={85}
            />
          </div>
          <div className="md:w-3/5">
            <div>
              <p className="mb-8">
          Finally, a jetpack that won&apos;t set your pants on fire (we&apos;re looking at you, 1960s prototypes). 
          The Flight Pack combines cutting-edge propulsion technology with our proprietary 
          <span className="font-semibold"> &quot;Please-Don&apos;t-Sue-Us&quot;</span> safety system to deliver 
          the aerial commuting solution you&apos;ve been dreaming about since watching Saturday morning cartoons.
              </p>


        <h2 className="text-xl font-bold mb-4">Key Features:</h2>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li><span className="font-semibold">Zero-to-Hero Mode:</span> Achieve heights of up to 500 feet, or roughly 100 disappointed pigeons</li>
          <li><span className="font-semibold">WhisperLoud™ Technology:</span> Only slightly louder than a commercial airliner taking off in your backyard</li>
          <li><span className="font-semibold">Smart Landing Assist:</span> Because &quot;falling with style&quot; is only charming in animated movies</li>
          <li><span className="font-semibold">Premium Comfort Straps:</span> Engineered to distribute the crushing weight of your childhood dreams evenly across your shoulders</li>
        </ul>

        <h2 className="text-xl font-bold mb-4">Technical Specifications:</h2>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li><span className="font-semibold">Flight time:</span> 23 minutes (or one really good guitar solo&apos;)</li>
          <li><span className="font-semibold">Maximum speed:</span> 65 mph (fast enough to outrun your responsibilities)</li>
          <li><span className="font-semibold">Fuel type:</span> Eco-friendly* compressed unicorn tears (*results may vary)</li>
          <li><span className="font-semibold">Weight capacity:</span> Up to 250 lbs of human and/or emotional baggage</li>
        </ul>

        <p className="text-sm italic">
          Warning: Side effects may include: sudden popularity at parties, jealous stares from birds, 
          and an irresistible urge to hum superhero theme songs. Not recommended for indoor use, 
          wedding proposals, or avoiding your ex at the grocery store.
              </p>
              <p className="text-xs mt-2">
                Patent pending. FAA approval pending. Your neighbor&apos;s approval definitely pending.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        <IntegrationCard
          title="Payment Links"
          description="Simple way to accept payments with a link"
          href="/payment-links"
          icon={<Link2 className="text-primary" />}
        />
        <IntegrationCard
          title="Checkout"
          description="Hosted payment page with tRPC integration"
          href="/checkout"
          icon={<ShoppingCart className="text-primary" />}
        />
        <IntegrationCard
          title="Elements"
          description="Custom payment form with Stripe Elements"
          href="/elements"
          icon={<CreditCard className="text-primary" />}
        />
        <IntegrationCard
          title="Direct API"
          description="Direct Stripe API integration with webhooks"
          href="/direct-api"
          icon={<Zap className="text-primary" />}
          status="beta"
        />
      </div>
    </div>
  )
}
