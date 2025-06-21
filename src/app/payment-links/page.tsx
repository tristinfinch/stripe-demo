import { Button } from "@/components/ui/button"
import Image from 'next/image'

export default function PaymentLinksPage() {
  return (
    <div className="container py-12 mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Finch Foundry Flight Pack™</h1>
        <p className="text-xl italic text-center mb-8">
          Your commute just got vertical.
        </p>
        
        <div className="flex flex-col md:flex-row gap-8 mb-12">
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
                Finally, a jetpack that won't set your pants on fire (we're looking at you, 1960s prototypes). 
                The Flight Pack combines cutting-edge propulsion technology with our proprietary 
                <span className="font-semibold"> "Please-Don't-Sue-Us"</span> safety system.
              </p>
              <p className="text-2xl font-bold mb-4">$99.99</p>
            </div>
            <Button
              asChild
              size="lg"
              className="w-full md:w-auto"
            >
              <a href="https://buy.stripe.com/test_dRmeVca4b01u97X5qPffy00">
                Buy Now
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
