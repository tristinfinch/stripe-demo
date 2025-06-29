import Image from 'next/image';
import Link from 'next/link';

export default function ProductsPage() {
  const products = [
    {
      id: 'flight-pack',
      title: 'Finch Foundry Flight Pack™',
      description: 'Your commute just got vertical.',
      image: '/images/finchfoundryflightpack.png',
      href: '/products/flight-pack'
    },
    {
      id: 'service-package',
      title: 'Finch Foundry Service Package™',
      description: 'Because even turbo-charged dreams need an occasional tune-up.',
      image: null,
      href: '/products/service-package'
    }
  ];

  return (
    <div className="container py-12 mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {products.map((product) => (
          <Link key={product.id} href={product.href} className="group">
            <div className="border rounded-lg overflow-hidden transition-all duration-300 group-hover:shadow-lg h-full flex flex-col">
              <div className="bg-slate-100 h-32 flex items-center justify-center">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={300}
                    height={200}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-gray-500 text-center p-4">
                    <div className="bg-slate-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                      Product Image
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6 flex-grow">
                <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                  {product.title}
                </h2>
                <p className="text-gray-600">{product.description}</p>
              </div>
              <div className="p-4 bg-gray-50 border-t">
                <span className="text-blue-600 group-hover:text-blue-800 transition-colors">
                  View details →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
