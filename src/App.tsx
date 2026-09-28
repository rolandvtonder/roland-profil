import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Work from './components/Work'
import HowItWorks from './components/HowItWorks'
import Services from './components/Services'
import About from './components/About'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    // reducedMotion="user": honour the visitor's OS "reduce motion" setting
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar menuOpen={menuOpen} onMenuOpenChange={setMenuOpen} />
      {/* Inert while the mobile menu is open so focus stays inside the menu */}
      <div inert={menuOpen}>
        <main id="main" tabIndex={-1} className="w-full outline-none">
          <Hero />
          <Work />
          <HowItWorks />
          <Services />
          <About />
          <Faq />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}

export default App
