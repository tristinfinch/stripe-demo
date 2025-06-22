import { CreditCard, Link2, ShoppingCart, Zap } from "lucide-react"
import { IntegrationCard } from '../components/IntegrationCard'
import Image from 'next/image'

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
            />
          </div>
          <div className="md:w-3/5">
            <div className="mb-8">
              <p className="mb-4">
                Finally, a jetpack that won&apos;t set your pants on fire <i>(we&apos;re looking at you, 1960s prototypes)</i>. 
                The Flight Pack combines cutting-edge propulsion technology with our proprietary 
                <span className="font-semibold"> &quot;Please-Don&apos;t-Sue-Us&quot;</span> safety system to deliver the aerial commuting solution you&apos;ve been dreaming about since watching Saturday morning cartoons.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-2">Key Features:</h3>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li><b>Zero-to-Hero Mode:</b> Achieve heights of up to 500 feet, or roughly 100 disappointed pigeons</li>
                <li><b>WhisperLoud™ Technology:</b> Only slightly louder than a commercial airliner taking off in your backyard</li>
                <li><b>Smart Landing Assist:</b> Because &quot;falling with style&quot; is only charming in animated movies</li>
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
                Patent pending. FAA approval pending. Your neighbor&apos;s approval definitely pending.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-8 text-center" data-testid="page-title">
        Stripe Integrations
      </h2>
      
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center"
        data-testid="cards-grid"
      >
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
