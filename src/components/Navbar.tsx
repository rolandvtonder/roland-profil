import { AnimatePresence, motion } from 'framer-motion'
import { ListIcon, WhatsappLogoIcon, XIcon } from '@phosphor-icons/react'
import { useEffect, useRef } from 'react'
import LogoMark from './LogoMark'
import PillLink from './PillLink'
import { navLinks, previewCta, site, whatsappUrl } from '../content'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrolled } from '../hooks/useScrolled'
import { easeOutSoft } from '../lib/motion'

const sectionIds = ['top', 'work', 'process', 'services', 'about', 'faq', 'contact'] as const
const menuLinks = [...navLinks, { label: 'Contact', href: '#contact' }]

type NavbarProps = {
  menuOpen: boolean
  onMenuOpenChange: (open: boolean) => void
}

function AvailabilityDot() {
  return (
    <span aria-hidden="true" className="relative flex h-2 w-2">
      <span className="absolute inset-0 animate-ping rounded-full bg-accent-bright opacity-60 motion-reduce:hidden" />
      <span className="relative h-2 w-2 rounded-full bg-accent-bright" />
    </span>
  )
}

export default function Navbar({ menuOpen, onMenuOpenChange }: NavbarProps) {
  const scrolled = useScrolled(24)
  const active = useActiveSection(sectionIds)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  // Mobile menu: lock page scroll, focus the first link, close on Escape
  useEffect(() => {
    if (!menuOpen) return
    const root = document.documentElement
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      onMenuOpenChange(false)
      toggleRef.current?.focus()
    }
    root.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    firstLinkRef.current?.focus()
    return () => {
      root.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen, onMenuOpenChange])

  // Close the mobile menu if the window grows to desktop width
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onChange = () => {
      if (desktop.matches) onMenuOpenChange(false)
    }
    desktop.addEventListener('change', onChange)
    return () => desktop.removeEventListener('change', onChange)
  }, [onMenuOpenChange])

  const solid = scrolled || menuOpen

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <nav
          aria-label="Main"
          className={`relative flex items-center justify-between border-b transition-[padding,background-color,border-color] duration-300 ${
            solid
              ? 'w-full border-line bg-page/75 px-5 py-3.5 backdrop-blur-xl sm:px-8 lg:px-11 lg:py-4'
              : 'mx-auto w-full max-w-[1440px] border-transparent px-6 py-6 sm:px-12 md:px-16 md:py-8'
          }`}
        >
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2.5 rounded-md no-underline" aria-label={`${site.name}, back to top`}>
            <LogoMark size={28} />
            <span className="font-display text-2xl font-extrabold tracking-[-0.02em] text-white md:text-[25px]">{site.name}</span>
          </a>

          {/* Center links */}
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[34px] lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1)
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative flex items-center py-2 text-[15px] whitespace-nowrap no-underline transition-colors duration-200 hover:text-white ${
                      isActive ? 'text-white' : 'text-white/80'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-dot"
                        className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent-bright"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Right */}
          <div className="hidden items-center lg:flex">
            <a
              href={previewCta.href}
              className="cursor-pointer rounded-[10px] bg-accent-strong px-6 py-2.5 text-[15px] font-medium whitespace-nowrap text-white no-underline shadow-[0_10px_28px_-12px_rgba(42,98,244,0.9)] transition-all duration-200 hover:bg-accent-hover active:scale-[0.98]"
            >
              {previewCta.label}
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => onMenuOpenChange(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/35 bg-white/[0.04] text-white backdrop-blur-[6px] transition-colors hover:bg-white/[0.12] lg:hidden"
          >
            {menuOpen ? <XIcon size={20} aria-hidden="true" /> : <ListIcon size={20} aria-hidden="true" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-page/95 px-6 pt-28 pb-10 backdrop-blur-2xl sm:px-10 lg:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {menuLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.06 + i * 0.045, ease: easeOutSoft }}
                    className="border-b border-line"
                  >
                    <a
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={link.href}
                      onClick={() => onMenuOpenChange(false)}
                      className="flex items-center justify-between py-4 font-display text-[2.1rem] leading-tight font-semibold text-ink no-underline"
                    >
                      {link.label}
                      <span aria-hidden="true" className="text-base tabular-nums text-ink-subtle">
                        0{i + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.3, ease: easeOutSoft }}
              className="mt-auto flex flex-col gap-6 pt-12"
            >
              <span className="flex items-center gap-2.5 text-[15px] text-ink-muted">
                <AvailabilityDot />
                {site.availability}
              </span>
              <div className="flex flex-col gap-3">
                <PillLink href={previewCta.href} variant="primary" size="lg" onClick={() => onMenuOpenChange(false)} className="w-full">
                  {previewCta.label}
                </PillLink>
                <PillLink href={whatsappUrl} size="lg" external className="w-full">
                  <WhatsappLogoIcon size={18} aria-hidden="true" />
                  WhatsApp me
                  <span className="sr-only"> (opens WhatsApp)</span>
                </PillLink>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
