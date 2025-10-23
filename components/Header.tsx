'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-primary text-white sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="text-white">MFSG</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="hover:text-accent transition-colors">
              About Us
            </a>
            <a href="#mission" className="hover:text-accent transition-colors">
              Our Mission
            </a>
            <a href="#brands" className="hover:text-accent transition-colors">
              Our Brands
            </a>
            <a href="#careers" className="hover:text-accent transition-colors">
              Careers
            </a>
            <a href="#contact" className="hover:text-accent transition-colors">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <a
              href="#about"
              className="block hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </a>
            <a
              href="#mission"
              className="block hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Mission
            </a>
            <a
              href="#brands"
              className="block hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Brands
            </a>
            <a
              href="#careers"
              className="block hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Careers
            </a>
            <a
              href="#contact"
              className="block hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}
