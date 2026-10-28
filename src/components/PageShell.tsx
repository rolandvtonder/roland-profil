import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

/**
 * The frame every sub-page sits in: navbar, main content, footer.
 * The homepage keeps its own App.tsx so its section order stays obvious.
 */
export default function PageShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar menuOpen={menuOpen} onMenuOpenChange={setMenuOpen} />
      <div inert={menuOpen}>
        <main id="main" tabIndex={-1} className="w-full outline-none">
          {children}
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
