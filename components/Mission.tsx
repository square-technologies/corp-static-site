import { Zap, Shield, Heart } from 'lucide-react'

export default function Mission() {
  return (
    <section id="mission" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Mission Statement */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Our Mission
            </h2>
            <div className="w-24 h-1 bg-accent mb-8"></div>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              To be a leading non-prime lender in North America catering to the full spectrum of customers, delivering unparalleled financial momentum.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              We believe everyone deserves access to financial services that help them achieve their goals. Through our innovative approach and commitment to customer success, we're changing the landscape of alternative lending.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <Zap className="text-accent" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-primary mb-1">Fast & Efficient</h4>
                  <p className="text-gray-600">Quick approvals and seamless digital experience</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <Shield className="text-accent" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-primary mb-1">Secure & Trusted</h4>
                  <p className="text-gray-600">Industry-leading security and compliance standards</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <Heart className="text-accent" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-primary mb-1">Customer Focused</h4>
                  <p className="text-gray-600">Dedicated to helping you achieve your financial goals</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Image/Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-primary to-navy rounded-2xl p-12 text-white shadow-2xl">
              <div className="space-y-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold mb-3">Innovation</h3>
                  <p className="text-gray-200">
                    Leveraging technology to create better financial solutions
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold mb-3">Accessibility</h3>
                  <p className="text-gray-200">
                    Making financial services available to everyone who needs them
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold mb-3">Excellence</h3>
                  <p className="text-gray-200">
                    Delivering exceptional service and results for our customers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
