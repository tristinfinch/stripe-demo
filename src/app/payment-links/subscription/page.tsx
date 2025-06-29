import { Button } from "@/components/ui/button"
import Image from 'next/image'

export default function SubscriptionPage() {
  return (
    <div className="container py-12 mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Premium Subscription Bundle</h1>
        <p className="text-xl italic text-center mb-8">
          Get the Finch Foundry Flight Pack™ AND Service Package™ together
        </p>
        
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-2/5 space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-2">Finch Foundry Flight Pack™</h2>
              <Image
                src="/images/finchfoundryflightpack.png"
                alt="Finch Foundry Flight Pack"
                width={300}
                height={300}
                className="w-full h-auto object-contain"
              />
              <p className="mt-2">
                Your vertical commute solution with cutting-edge propulsion and safety features.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-2">Service Package™</h2>
              <Image
                src="/images/service-package.png"
                alt="Service Package"
                width={300}
                height={300}
                className="w-full h-auto object-contain"
              />
              <p className="mt-2">
                Complete maintenance package to keep your Flight Pack in top condition.
              </p>
            </div>
          </div>
          
          <div className="md:w-3/5">
            <div className="mb-8 bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Bundle Benefits</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Get both products for one low monthly price</li>
                <li>Priority customer support</li>
                <li>Exclusive access to new features</li>
                <li>Regular maintenance included</li>
              </ul>
              
              <p className="text-2xl font-bold mt-6">$5/month</p>
              <p className="text-sm text-gray-600 mt-2">
                Cancel anytime • Free updates included
              </p>
            </div>
            
            <Button
              asChild
              size="lg"
              className="w-full"
            >
              <a href="https://buy.stripe.com/test_dRmeVca4b01u97X5qPffy00">
                Subscribe Now
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
