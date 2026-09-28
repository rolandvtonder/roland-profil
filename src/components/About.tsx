import { motion } from 'framer-motion'
import LogoMark from './LogoMark'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { about, site } from '../content'
import { asset } from '../lib/asset'
import { easeOutSoft, revealViewport } from '../lib/motion'

function Portrait() {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line bg-surface">
      {about.photo ? (
        <img src={asset(about.photo)} alt={about.photoAlt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      ) : (
        // Branded stand-in until a photo is added in content.ts
        <div aria-hidden="true" className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(120% 80% at 25% 15%, rgba(61,126,255,0.38), transparent 60%), radial-gradient(90% 70% at 85% 95%, rgba(42,98,244,0.28), transparent 60%), linear-gradient(160deg, #0E1A36 0%, #070C18 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(141,181,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(141,181,255,0.09) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
              maskImage: 'radial-gradient(ellipse at 50% 45%, #000 20%, transparent 72%)',
              WebkitMaskImage: 'radial-gradient(ellipse at 50% 45%, #000 20%, transparent 72%)',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center pb-10">
            <LogoMark size={148} className="drop-shadow-[0_0_48px_rgba(61,126,255,0.55)]" />
          </div>
        </div>
      )}
      <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-page/55 px-4 py-3 backdrop-blur-md">
        <div>
          <p className="text-sm font-medium text-ink">{site.name}</p>
          <p className="text-xs text-ink-muted">{site.role}</p>
        </div>
        <span className="hidden items-center gap-2 text-xs text-ink-muted sm:flex">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-bright" />
          {site.availability}
        </span>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative px-gutter py-28 md:py-36">
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
        <Reveal className="mx-auto w-full max-w-[500px] lg:mx-0">
          <Portrait />
        </Reveal>

        <div>
          <SectionHeading layout="stack" id="about-title" index="04" label="About" title={about.title} subtitle={about.subtitle} />
          <Reveal delay={0.1} className="mt-8 max-w-[62ch] space-y-5 text-[17px] leading-relaxed text-ink-muted">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
          <ul className="mt-12 grid gap-8 border-t border-line pt-10 sm:grid-cols-3 sm:gap-6">
            {about.values.map(({ icon: Icon, title, text }, i) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={{ duration: 0.6, delay: 0.08 * i, ease: easeOutSoft }}
              >
                <Icon size={26} weight="light" aria-hidden="true" className="text-accent-soft" />
                <h3 className="mt-3 text-[15px] font-medium text-ink">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{text}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
