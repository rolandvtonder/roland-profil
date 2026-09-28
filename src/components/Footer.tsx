import { ArrowUpIcon } from '@phosphor-icons/react'
import LogoMark from './LogoMark'
import PillLink from './PillLink'
import { navLinks, previewCta, site, socials, whatsappUrl } from '../content'

const year = new Date().getFullYear()
const footerLinks = [...navLinks, { label: 'Contact', href: '#contact' }]
const activeSocials = socials.filter((social) => social.href)

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line px-gutter pt-20">
      <div className="grid gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <a href="#top" className="inline-flex items-center gap-2.5 rounded-md no-underline" aria-label={`${site.name}, back to top`}>
            <LogoMark size={26} />
            <span className="font-display text-2xl font-extrabold tracking-[-0.02em] text-white">{site.name}</span>
          </a>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-muted">
            Websites that bring Alberton businesses more calls and WhatsApps. Start with a free homepage preview.
          </p>
          <PillLink href={previewCta.href} className="mt-8">
            {previewCta.label}
          </PillLink>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm text-ink-subtle">Navigate</h2>
          <ul className="mt-4 space-y-1">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="inline-block py-1.5 text-[15px] text-ink-muted no-underline transition-colors hover:text-ink">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm text-ink-subtle">Get in touch</h2>
          <ul className="mt-4 space-y-1 text-[15px]">
            <li>
              <a href={`mailto:${site.email}`} className="inline-block py-1.5 break-all text-ink-muted no-underline transition-colors hover:text-ink">
                {site.email}
              </a>
            </li>
            <li>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-block py-1.5 text-ink-muted no-underline transition-colors hover:text-ink">
                WhatsApp {site.whatsapp.display}
                <span className="sr-only"> (opens WhatsApp)</span>
              </a>
            </li>
            <li className="py-1.5 text-ink-muted">{site.location}</li>
            {activeSocials.map(({ label, href }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block py-1.5 text-ink-muted no-underline transition-colors hover:text-ink">
                  {label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Oversized wordmark */}
      <p
        aria-hidden="true"
        className="pointer-events-none mt-16 text-center font-display leading-[0.78] select-none"
        style={{
          fontSize: 'clamp(4.5rem, 19vw, 19rem)',
          fontWeight: 400,
          letterSpacing: '0.08em',
          marginRight: '-0.08em',
          background: 'linear-gradient(180deg, rgba(141,181,255,0.2) 0%, rgba(141,181,255,0.02) 85%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {site.name.toUpperCase()}
      </p>

      <div className="relative flex flex-col-reverse items-start justify-between gap-4 border-t border-line py-8 text-sm text-ink-subtle sm:flex-row sm:items-center">
        <p>
          © {year} {site.businessName}. All rights reserved.
        </p>
        <a href="#top" className="group inline-flex items-center gap-2 py-1 text-ink-subtle no-underline transition-colors hover:text-ink">
          Back to top
          <ArrowUpIcon size={14} aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  )
}
