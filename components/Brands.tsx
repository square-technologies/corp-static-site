import { Building2, CreditCard, Wallet } from 'lucide-react'

export default function Brands() {
  const brands = [
    {
      icon: Building2,
      name: 'MoneyMart',
      description: 'Leading provider of alternative financial services with locations across North America.',
      color: 'from-blue-600 to-blue-800',
    },
    {
      icon: CreditCard,
      name: 'Financial Solutions',
      description: 'Comprehensive suite of lending and financial products tailored to your needs.',
      color: 'from-accent to-accent-dark',
    },
    {
      icon: Wallet,
      name: 'Digital Services',
      description: 'Convenient online and mobile platforms for 24/7 access to your financial solutions.',
      color: 'from-primary to-primary-dark',
    },
  ]

  return (
    <section id="brands" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Family of Brands
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Through our diverse portfolio of brands, we serve millions of customers with tailored financial solutions across multiple channels.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${brand.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
              
              <div className="relative p-8 text-white">
                <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <brand.icon size={40} />
                </div>
                
                <h3 className="text-3xl font-bold mb-4">{brand.name}</h3>
                <p className="text-gray-100 leading-relaxed mb-6">{brand.description}</p>
                
                <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Platform Features */}
        <div className="mt-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-primary text-center mb-12">
            How We Serve You
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h4 className="text-xl font-semibold text-primary mb-3">Retail Network</h4>
              <p className="text-gray-600">
                Hundreds of convenient locations across North America for in-person service
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-accent text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h4 className="text-xl font-semibold text-primary mb-3">Digital Platform</h4>
              <p className="text-gray-600">
                Easy-to-use online portal for managing your account and accessing services
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h4 className="text-xl font-semibold text-primary mb-3">Mobile Apps</h4>
              <p className="text-gray-600">
                On-the-go access through our mobile applications for iOS and Android
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
