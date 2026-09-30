import { motion } from 'framer-motion'
import { ArrowRightIcon, LockSimpleIcon } from '@phosphor-icons/react'
import { hero, projects } from '../content'
import { asset } from '../lib/asset'

// The three sites that float beside the headline, front card last
const showcase = [
  // The two back cards are hidden on phones, where the cluster has no room
  { project: projects.find((p) => p.title === 'LIFTR Co')!, className: 'hidden sm:block left-0 top-2 w-[230px] lg:w-[290px]', rotate: -7, delay: 0.6 },
  { project: projects.find((p) => p.title === 'Drip Dry Plumbing')!, className: 'hidden sm:block right-0 top-16 w-[230px] lg:w-[290px]', rotate: 6, delay: 0.3 },
  {
    project: projects.find((p) => p.title === 'Flexi Tours')!,
    className: 'left-1/2 bottom-0 w-[290px] -translate-x-1/2 sm:left-6 sm:w-[270px] sm:translate-x-0 lg:left-16 lg:w-[340px]',
    rotate: -2,
    delay: 0,
  },
]

function ShowcaseCard({ image, title, rotate, delay, className }: { image: string; title: string; rotate: number; delay: number; className: string }) {
  return (
    <motion.div
      className={`group/card absolute ${className}`}
      initial={{ opacity: 0, y: 28, rotate }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 0.9, delay: 0.35 + delay * 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ rotate: 0, scale: 1.04, y: -10, zIndex: 30, transition: { duration: 0.35, ease: 'easeOut' } }}
    >
      {/* Gentle float, so the cluster feels alive without distracting */}
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 7 + delay * 2, repeat: Infinity, ease: 'easeInOut', delay }}
        className="overflow-hidden rounded-2xl border border-white/12 bg-surface shadow-[0_30px_70px_-25px_rgba(0,0,0,0.85)] transition-[border-color,box-shadow] duration-300 group-hover/card:border-accent/50 group-hover/card:shadow-[0_40px_90px_-25px_rgba(61,126,255,0.5)]"
      >
        <div aria-hidden="true" className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="mx-auto flex items-center gap-1 rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[10px] text-ink-subtle">
            <LockSimpleIcon size={9} />
            {title}
          </span>
        </div>
        <img src={asset(image)} alt={`${title} website`} loading="lazy" decoding="async" className="h-[150px] w-full object-cover object-top lg:h-[180px]" />
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative w-full overflow-hidden pt-32 pb-20 lg:min-h-[100svh] lg:pt-0 lg:pb-0">
      {/* Electric-blue glow on the left, subtle dot grid across the whole stage */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[15%] -left-[10%] h-[900px] w-[900px]"
        style={{ background: 'radial-gradient(closest-side, rgba(61,126,255,0.28) 0%, rgba(42,98,244,0.10) 45%, transparent 72%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage: 'radial-gradient(rgba(141,181,255,0.16) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 45%, #000 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 45%, #000 20%, transparent 80%)',
        }}
      />

      <div className="relative z-10 grid h-full items-center gap-16 px-gutter lg:min-h-[100svh] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
        {/* Copy */}
        <div className="max-w-[640px]">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: 'easeOut' }}
            className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-white/[0.04] px-3.5 py-1.5 text-[13.5px] font-medium text-ink-muted backdrop-blur-sm"
          >
            <span aria-hidden="true" className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent-bright opacity-60 motion-reduce:hidden" />
              <span className="relative h-2 w-2 rounded-full bg-accent-bright" />
            </span>
            {hero.badge}
          </motion.span>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: 'easeOut' }}
            className="mt-7 font-display text-[40px] leading-[1.06] font-extrabold tracking-[-0.035em] text-ink sm:text-[52px] lg:text-[58px]"
            style={{ textWrap: 'balance' }}
          >
            <span className="block">{hero.title}</span>
            <span className="block text-accent-soft">{hero.titleAccent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
            className="mt-6 max-w-[540px] text-base leading-[1.6] tracking-[-0.01em] text-ink-muted sm:text-lg"
          >
            {hero.blurb}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
            className="mt-9 flex flex-wrap items-center gap-6"
          >
            <a
              href={hero.primaryCta.href}
              className="group/cta inline-flex cursor-pointer items-center gap-2.5 rounded-[12px] bg-accent-strong px-7 py-3.5 text-[15px] font-medium text-white no-underline shadow-[0_14px_36px_-12px_rgba(42,98,244,0.95)] transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_18px_44px_-12px_rgba(61,126,255,1)] active:scale-[0.98] sm:text-base"
            >
              {hero.primaryCta.label}
              <ArrowRightIcon size={17} aria-hidden="true" className="transition-transform duration-200 group-hover/cta:translate-x-0.5" />
            </a>
            <a href="#work" className="text-[15px] font-medium text-ink-muted underline-offset-4 transition-colors duration-200 hover:text-ink hover:underline">
              See my recent work
            </a>
          </motion.div>
        </div>

        {/* Floating previews of real sites */}
        <div className="relative mx-auto h-[250px] w-full max-w-[420px] sm:h-[420px] sm:max-w-[520px] lg:h-[560px] lg:max-w-none">
          {showcase.map(({ project, className, rotate, delay }) => (
            <ShowcaseCard key={project.title} image={project.image} title={project.title} rotate={rotate} delay={delay} className={className} />
          ))}
        </div>
      </div>
    </section>
  )
}
