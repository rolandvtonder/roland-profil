import {
  ChartLineUpIcon,
  CheckIcon,
  CodeIcon,
  DeviceMobileIcon,
  PenNibIcon,
  ShoppingBagOpenIcon,
  StackIcon,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import PageShell from '../components/PageShell'
import SubPageHero from '../components/SubPageHero'
import FaqList from '../components/FaqList'
import CtaBand from '../components/CtaBand'
import Reveal from '../components/Reveal'
import ProjectCard from '../components/ProjectCard'
import SectionHeading from '../components/SectionHeading'
import { projects } from '../content'
import { servicePages } from '../pages'
import type { ServiceIcon } from '../pages'

// pages.ts stays free of React imports, so the icon names are resolved here
const icons: Record<ServiceIcon, Icon> = {
  penNib: PenNibIcon,
  code: CodeIcon,
  deviceMobile: DeviceMobileIcon,
  stack: StackIcon,
  shoppingBag: ShoppingBagOpenIcon,
  chartLineUp: ChartLineUpIcon,
}

export default function ServicePageView({ slug }: { slug: string }) {
  const page = servicePages.find((p) => p.slug === slug)
  if (!page) throw new Error(`No service page for slug "${slug}"`)

  const related = page.relatedProjects
    .map((title) => projects.find((p) => p.title === title))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <PageShell>
      <SubPageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/#services' }, { label: page.heading.replace(/ that$| built$| shaped$/, '') }]}
        icon={icons[page.icon]}
        eyebrow="Service"
        heading={page.heading}
        headingAccent={page.headingAccent}
        intro={page.intro}
        secondaryCta={{ label: 'See my recent work', href: '/#work' }}
      />

      {/* The problem this service exists to solve */}
      <section className="px-gutter pb-24 md:pb-32">
        <Reveal className="grid gap-8 rounded-3xl border border-line bg-surface/50 px-7 py-10 sm:px-12 sm:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
          <h2 className="font-display text-[1.6rem] leading-snug font-bold tracking-[-0.03em] text-ink sm:text-[1.9rem]" style={{ textWrap: 'balance' }}>
            {page.problem.title}
          </h2>
          <p className="text-[16px] leading-[1.75] text-ink-muted">{page.problem.body}</p>
        </Reveal>
      </section>

      {/* What's included */}
      <section aria-labelledby="includes-title" className="relative px-gutter pb-24 md:pb-32">
        <SectionHeading id="includes-title" index="01" label="What's included" title="What you get." subtitle="Everything below, as standard.">
          No tiers, no add-ons held back for a bigger package. These are part of the job.
        </SectionHeading>
        <ul className="mt-14 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {page.includes.map(({ title, text }, i) => (
            <Reveal key={title} delay={0.04 * i} className="border-t border-line pt-6">
              <h3 className="flex items-start gap-3 font-display text-[1.1rem] leading-snug text-ink" style={{ fontWeight: 600 }}>
                <CheckIcon size={18} weight="bold" aria-hidden="true" className="mt-1 shrink-0 text-accent-soft" />
                {title}
              </h3>
              <p className="mt-3 pl-[30px] text-[15px] leading-relaxed text-ink-muted">{text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section aria-labelledby="process-title" className="relative overflow-hidden px-gutter pb-24 md:pb-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-10 -right-52 h-[640px] w-[640px] rounded-full"
          style={{ background: 'radial-gradient(closest-side, rgba(61,126,255,0.10), transparent)' }}
        />
        <div className="relative">
          <SectionHeading id="process-title" index="02" label="How it works" title="From first chat" subtitle="to live, in four steps.">
            The same process every time, so you always know where the project is.
          </SectionHeading>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {page.process.map(({ step, title, text }, i) => (
              <li key={step} className="bg-page px-7 py-9">
                <Reveal delay={0.05 * i}>
                  <span className="text-[13px] font-medium tabular-nums text-accent-soft">[{step}]</span>
                  <h3 className="mt-4 font-display text-[1.15rem] leading-snug text-ink" style={{ fontWeight: 600 }}>
                    {title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who it suits */}
      <section aria-labelledby="goodfor-title" className="px-gutter pb-24 md:pb-32">
        <Reveal className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20">
          <h2 id="goodfor-title" className="font-display text-[1.8rem] leading-tight font-extrabold tracking-[-0.03em] text-ink sm:text-[2.2rem]">
            A good fit if you&rsquo;re&hellip;
          </h2>
          <ul className="space-y-4">
            {page.goodFor.map((item) => (
              <li key={item} className="flex items-start gap-3.5 border-b border-line pb-4 text-[16px] leading-relaxed text-ink-muted">
                <CheckIcon size={18} weight="bold" aria-hidden="true" className="mt-1 shrink-0 text-accent-soft" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Proof */}
      {related.length > 0 && (
        <section aria-labelledby="related-title" className="px-gutter pb-24 md:pb-32">
          <SectionHeading id="related-title" index="03" label="Proof" title="Work like this." subtitle="Sites I designed and built.">
            Hover a preview to scroll through the page, or click to open the live site.
          </SectionHeading>
          <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:mt-16">
            {related.map((project, i) => (
              <ProjectCard key={project.title} project={{ ...project, featured: false }} index={i} />
            ))}
          </ul>
        </section>
      )}

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="px-gutter pb-24 md:pb-32">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading layout="stack" id="faq-title" index="04" label="FAQ" title="Questions?" subtitle="Here are the answers.">
              The things people ask me most about this. Yours not here? Send me a WhatsApp.
            </SectionHeading>
          </div>
          <FaqList faqs={page.faqs} />
        </div>
      </section>

      <CtaBand
        title="See it before you pay a cent."
        text="Tell me about your business and I'll design your new homepage for free. If you love it, we build the rest together."
      />
    </PageShell>
  )
}
