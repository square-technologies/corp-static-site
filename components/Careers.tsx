import { Briefcase, MapPin, Clock, ChevronRight, GraduationCap, Heart, TrendingUp, Users } from 'lucide-react'

export default function Careers() {
  const benefits = [
    {
      icon: GraduationCap,
      title: 'Education & Training',
      description: 'World-class training programs and education reimbursement to support your professional growth.',
    },
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive medical, dental, and vision programs with 24/7 employee assistance.',
    },
    {
      icon: TrendingUp,
      title: 'Financial Rewards',
      description: 'Performance-based bonuses, pension program with company match, and employee discounts.',
    },
    {
      icon: Users,
      title: 'Work-Life Balance',
      description: 'Flexible spending accounts, vacation and holiday pay, and employee referral rewards.',
    },
  ]

  const jobOpenings = [
    {
      title: 'Store Manager',
      location: 'Toronto, ON',
      type: 'Full-Time',
      department: 'Retail Operations',
      description: 'Lead our retail team and drive exceptional customer experiences while managing daily store operations and team development.',
    },
    {
      title: 'Customer Service Representative',
      location: 'Vancouver, BC',
      type: 'Full-Time',
      department: 'Customer Service',
      description: 'Provide outstanding service to customers, process financial transactions, and help customers achieve their financial goals.',
    },
    {
      title: 'Assistant Manager',
      location: 'Calgary, AB',
      type: 'Full-Time',
      department: 'Retail Operations',
      description: 'Support store operations, lead team members, and ensure compliance with company policies and procedures.',
    },
    {
      title: 'Financial Services Representative',
      location: 'Montreal, QC',
      type: 'Full-Time',
      department: 'Financial Services',
      description: 'Help customers with loan applications, financial products, and provide personalized financial solutions.',
    },
    {
      title: 'District Manager',
      location: 'Multiple Locations',
      type: 'Full-Time',
      department: 'Operations Management',
      description: 'Oversee multiple store locations, drive performance metrics, and develop store managers across your district.',
    },
    {
      title: 'Customer Service Representative',
      location: 'Edmonton, AB',
      type: 'Part-Time',
      department: 'Customer Service',
      description: 'Deliver exceptional customer service in a fast-paced environment while processing transactions and building customer relationships.',
    },
    {
      title: 'Loss Prevention Specialist',
      location: 'Toronto, ON',
      type: 'Full-Time',
      department: 'Security & Compliance',
      description: 'Ensure store security, prevent losses, and maintain compliance with regulatory requirements and company policies.',
    },
    {
      title: 'Marketing Coordinator',
      location: 'Head Office - Toronto, ON',
      type: 'Full-Time',
      department: 'Marketing',
      description: 'Support marketing campaigns, coordinate promotional activities, and help drive brand awareness across all channels.',
    },
    {
      title: 'HR Business Partner',
      location: 'Head Office - Toronto, ON',
      type: 'Full-Time',
      department: 'Human Resources',
      description: 'Partner with business leaders on talent management, employee relations, and organizational development initiatives.',
    },
  ]

  return (
    <section id="careers" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Join Our Team
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Build your career with Momentum Financial Services Group. We're looking for passionate individuals who want to make a difference in people's financial lives.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-primary text-center mb-12">
            Why Work With Us
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="bg-gradient-to-br from-primary to-primary-dark w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <benefit.icon size={28} className="text-white" />
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">
                  {benefit.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Job Openings Section */}
        <div>
          <h3 className="text-3xl font-bold text-primary text-center mb-12">
            Current Opportunities
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobOpenings.map((job, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-accent"
              >
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-xl font-bold text-primary pr-2">
                      {job.title}
                    </h4>
                    <Briefcase size={24} className="text-accent flex-shrink-0" />
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin size={16} className="mr-2 text-accent" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <Clock size={16} className="mr-2 text-accent" />
                    <span>{job.type}</span>
                  </div>
                  <div className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {job.department}
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {job.description}
                </p>
                <button className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all flex items-center justify-center group">
                  Apply Now
                  <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">
            Don't See the Right Position?
          </h3>
          <p className="text-lg mb-6 text-gray-100">
            We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <button className="bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all shadow-lg">
            Submit Your Resume
          </button>
        </div>
      </div>
    </section>
  )
}
