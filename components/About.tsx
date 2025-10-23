import { Target, Users, TrendingUp } from 'lucide-react'

export default function About() {
  const features = [
    {
      icon: Target,
      title: 'Our Vision',
      description: 'To close the gap between people and their financial goals through innovative solutions and exceptional service.',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'We cater to the full spectrum of customers, delivering unparalleled financial momentum to those who need it most.',
    },
    {
      icon: TrendingUp,
      title: 'Market Leader',
      description: 'One of the largest providers of alternative financial solutions in North America with decades of experience.',
    },
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            About Momentum Financial Services Group
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide access to cash, financial products, and services through our family of brands that are supported by our robust retail network, digital, and mobile platforms.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2"
            >
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <feature.icon size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-200 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
