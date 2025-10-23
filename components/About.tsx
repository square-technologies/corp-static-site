import { Target, Users, TrendingUp, User } from 'lucide-react'

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

  const team = [
    {
      name: 'Sarah Mitchell',
      role: 'Chief Executive Officer',
      bio: 'With over 20 years of experience in financial services, Sarah leads our strategic vision and drives innovation across all business units.',
    },
    {
      name: 'Michael Chen',
      role: 'Chief Financial Officer',
      bio: 'Michael brings extensive expertise in corporate finance and risk management, ensuring sustainable growth and fiscal responsibility.',
    },
    {
      name: 'David Rodriguez',
      role: 'Chief Technology Officer',
      bio: 'David spearheads our digital transformation initiatives, leveraging cutting-edge technology to enhance customer experiences.',
    },
    {
      name: 'Jennifer Williams',
      role: 'Chief Operating Officer',
      bio: 'Jennifer oversees our nationwide operations, optimizing processes and maintaining excellence across our retail and digital channels.',
    },
    {
      name: 'Robert Thompson',
      role: 'Chief Marketing Officer',
      bio: 'Robert crafts our brand strategy and customer engagement initiatives, building meaningful connections with communities we serve.',
    },
    {
      name: 'Lisa Anderson',
      role: 'Chief Legal Officer',
      bio: 'Lisa ensures regulatory compliance and corporate governance while protecting the interests of our customers and stakeholders.',
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

        <div className="grid md:grid-cols-3 gap-8 mb-20">
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

        {/* Leadership Team Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Leadership Team
            </h3>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the experienced leaders driving innovation and excellence at Momentum Financial Services Group.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gradient-to-br from-primary to-primary-dark w-24 h-24 rounded-full flex items-center justify-center mb-4">
                    <User size={48} className="text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-primary mb-1">
                    {member.name}
                  </h4>
                  <p className="text-sm font-semibold text-accent mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
