import Link from 'next/link'

export default function CancelPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
      <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
      <p className="text-xl mb-8">
        Your purchase of the Finch Foundry Flight Pack™ was not completed
      </p>
      <div className="flex gap-4 justify-center">
        <Link
          href="/payment-links"
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Try Again
        </Link>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}
