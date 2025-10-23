export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary-dark to-navy py-20 md:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Closing the Gap Between People and Their{' '}
              <span className="text-accent">Financial Goals</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Momentum Financial Services Group is one of the largest providers of alternative financial solutions in North America.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#about"
                className="bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                Learn More
              </a>
              <a
                href="#contact"
                className="bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">40+</div>
              <div className="text-gray-200">Years Experience</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-200">Locations</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">2M+</div>
              <div className="text-gray-200">Customers Served</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-200">Digital Access</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave SVG at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 43.9999C106.667 43.9999 213.333 7.33325 320 7.33325C426.667 7.33325 533.333 43.9999 640 43.9999C746.667 43.9999 853.333 7.33325 960 7.33325C1066.67 7.33325 1173.33 43.9999 1280 43.9999C1386.67 43.9999 1440 19.0266 1440 0V100H0V43.9999Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}
