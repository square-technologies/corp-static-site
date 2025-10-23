import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Mission from '@/components/Mission'
import Brands from '@/components/Brands'
import Careers from '@/components/Careers'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Mission />
      <Brands />
      <Careers />
      <Contact />
      <Footer />
    </main>
  )
}
