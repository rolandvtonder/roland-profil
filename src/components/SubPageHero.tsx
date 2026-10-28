import { motion } from 'framer-motion'
import { ArrowRightIcon, CaretRightIcon } from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import type { ReactNode } from 'react'
import { previewCta } from '../content'

type Crumb = { label: string; href?: string }

type SubPageHeroProps = {
  crumbs: Crumb[]
  icon?: Icon
  eyebrow: string
  heading: string
  headingAccent: string
  intro: string
  /** Optional extra content under the buttons, e.g. a client detail list. */
  children?: ReactNode
  secondaryCta?: { label: string; href: string; external?: boolean }
}

export default function SubPageHero({ crumbs, icon: HeroIcon, eyebrow, heading, headingAccent, intro, children, secondaryCta }: SubPageHeroProps) {
  return (
    <section className="relative overflow-hidden px-gutter pt-36 pb-20 md:pt-44 md:pb-28">
      {/* Same blue wash as the homepage hero, so sub-pages feel like the same site */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[20%] -left-[12%] h-[820px] w-[820px]"
        style={{ background: 'radial-gradient(closest-side, rgba(61,126,255,0.24) 0%, rgba(42,98,244,0.08) 45%, transparent 72%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: 'radial-gradient(rgba(141,181,255,0.14) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 40% 40%, #000 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 40% 40%, #000 20%, transparent 80%)',
        }}
      />

      <div className="relative z-10 max-w-[820px]">
        {/* Breadcrumbs help visitors and give Google the page's place in the site */}
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-8"
        >
          <ol className="flex flex-wrap items-center gap-1.5 text-[13.5px] text-ink-subtle">
            {crumbs.map((crumb, i) => (
              <li key={crumb.label} className="flex items-center gap-1.5">
                {crumb.href ? (
                  <a href={crumb.href} className="no-underline transition-colors hover:text-ink">
                    {crumb.label}
                  </a>
                ) : (
                  <span aria-current="page" className="text-ink-muted">
                    {crumb.label}
                  </span>
                )}
                {i < crumbs.length - 1 && <CaretRightIcon size={12} aria-hidden="true" className="text-ink-subtle/60" />}
              </li>
            ))}
          </ol>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: 'easeOut' }}
          className="flex items-center gap-3.5"
        >
          {HeroIcon && (
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent-soft">
              <HeroIcon size={22} weight="light" aria-hidden="true" />
            </span>
          )}
          <span className="text-[13.5px] font-medium tracking-[0.08em] text-accent-soft uppercase">{eyebrow}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: 'easeOut' }}
          className="mt-6 font-display text-[38px] leading-[1.06] font-extrabold tracking-[-0.035em] text-ink sm:text-[50px] lg:text-[58px]"
          style={{ textWrap: 'balance' }}
        >
          <span className="block">{heading}</span>
          <span className="block text-accent-soft">{headingAccent}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mt-7 max-w-[62ch] text-[17px] leading-[1.65] text-ink-muted sm:text-lg"
        >
          {intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease: 'easeOut' }}
          className="mt-9 flex flex-wrap items-center gap-6"
        >
          <a
            href={previewCta.href}
            className="group/cta inline-flex cursor-pointer items-center gap-2.5 rounded-[12px] bg-accent-strong px-7 py-3.5 text-[15px] font-medium text-white no-underline shadow-[0_14px_36px_-12px_rgba(42,98,244,0.95)] transition-all duration-200 hover:bg-accent-hover active:scale-[0.98] sm:text-base"
          >
            Get a free homepage preview
            <ArrowRightIcon size={17} aria-hidden="true" className="transition-transform duration-200 group-hover/cta:translate-x-0.5" />
          </a>
          {secondaryCta && (
            <a
              href={secondaryCta.href}
              target={secondaryCta.external ? '_blank' : undefined}
              rel={secondaryCta.external ? 'noopener noreferrer' : undefined}
              className="text-[15px] font-medium text-ink-muted underline-offset-4 transition-colors duration-200 hover:text-ink hover:underline"
            >
              {secondaryCta.label}
              {secondaryCta.external && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          )}
        </motion.div>

        {children}
      </div>
    </section>
  )
}
