import { ArrowUpRightIcon, LockSimpleIcon, PencilSimpleIcon, SealCheckIcon } from '@phosphor-icons/react'
import PageShell from '../components/PageShell'
import SubPageHero from '../components/SubPageHero'
import FaqList from '../components/FaqList'
import CtaBand from '../components/CtaBand'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { projects } from '../content'
import { asset } from '../lib/asset'
import { caseStudies } from '../pages'

function displayAddress(url: string) {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

export default function CaseStudyView({ slug }: { slug: string }) {
  const study = caseStudies.find((c) => c.slug === slug)
  if (!study) throw new Error(`No case study for slug "${slug}"`)
  const project = projects.find((p) => p.title === study.project)
  if (!project) throw new Error(`No project named "${study.project}" in content.ts`)
  const isClient = study.status === 'client'

  return (
    <PageShell>
      <SubPageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Work', href: '/#work' }, { label: project.title }]}
        eyebrow="Case study"
        heading={study.heading}
        headingAccent={study.headingAccent}
        intro={study.intro}
        secondaryCta={{ label: isClient ? `Visit ${displayAddress(project.url)}` : 'View the concept', href: project.url, external: true }}
      >
        <Reveal delay={0.35} className="mt-12">
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {study.client.map(({ label, value }) => (
              <div key={label} className="bg-page px-5 py-5">
                <dt className="text-[12.5px] tracking-[0.07em] text-ink-subtle uppercase">{label}</dt>
                <dd className="mt-2 text-[15px] leading-snug text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        {!isClient && (
          <Reveal delay={0.4} className="mt-8">
            <p className="max-w-[62ch] rounded-2xl border border-line bg-surface/50 px-5 py-4 text-[14.5px] leading-relaxed text-ink-muted">
              <strong className="font-semibold text-ink">This is a concept, not a commissioned project.</strong> I designed and
              built it myself to show {project.title} what their website could be. It is my work and my decisions throughout,
              but they did not hire me for it.
            </p>
          </Reveal>
        )}
      </SubPageHero>

      {/* The site itself */}
      <section className="px-gutter pb-24 md:pb-32">
        <Reveal className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)]">
          <div aria-hidden="true" className="flex items-center gap-3 border-b border-line px-4 py-2.5">
            <div className="flex w-12 shrink-0 gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            </div>
            <div className="mx-auto flex min-w-0 items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-1 text-xs text-ink-subtle">
              <LockSimpleIcon size={11} className="shrink-0" />
              <span className="truncate">{displayAddress(project.url)}</span>
            </div>
            <div className="w-12 shrink-0" />
          </div>
          {/* The screenshot is the whole page, so it's capped and faded rather
              than dropping several thousand pixels into the middle of the article */}
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="relative block max-h-[560px] overflow-hidden md:max-h-[680px]">
            <img
              src={asset(project.image)}
              alt={`The ${project.title} homepage`}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
              style={{ background: 'linear-gradient(to bottom, transparent, #060A14)' }}
            />
            <span className="sr-only">Open {project.title} in a new tab</span>
          </a>
        </Reveal>
        <Reveal delay={0.1} className="mt-6 flex flex-wrap items-center gap-4">
          {isClient ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[13px] text-accent-soft">
              <SealCheckIcon size={13} weight="fill" aria-hidden="true" />
              Client project
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-white/[0.04] px-3 py-1 text-[13px] text-ink-muted">
              <PencilSimpleIcon size={13} aria-hidden="true" />
              Concept
            </span>
          )}
          <span className="text-[14px] text-ink-subtle">{project.category}</span>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/visit ml-auto inline-flex items-center gap-1.5 text-[14px] text-ink-muted no-underline transition-colors hover:text-ink"
          >
            Open the live site
            <ArrowUpRightIcon size={14} aria-hidden="true" className="transition-transform group-hover/visit:translate-x-0.5 group-hover/visit:-translate-y-0.5" />
          </a>
        </Reveal>
      </section>

      {/* The brief */}
      <section className="px-gutter pb-24 md:pb-32">
        <Reveal className="grid gap-8 rounded-3xl border border-line bg-surface/50 px-7 py-10 sm:px-12 sm:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
          <h2 className="font-display text-[1.6rem] leading-snug font-bold tracking-[-0.03em] text-ink sm:text-[1.9rem]">The brief</h2>
          <p className="text-[16px] leading-[1.75] text-ink-muted">{study.brief}</p>
        </Reveal>
      </section>

      {/* What I built */}
      <section aria-labelledby="built-title" className="px-gutter pb-24 md:pb-32">
        <SectionHeading id="built-title" index="01" label="The build" title="What I built." subtitle="Piece by piece.">
          Every part of the site exists to answer a question a customer was going to ask anyway.
        </SectionHeading>
        <ul className="mt-14 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:mt-16">
          {study.built.map(({ title, text }, i) => (
            <Reveal key={title} delay={0.04 * i} className="border-t border-line pt-6">
              <h3 className="font-display text-[1.15rem] leading-snug text-ink" style={{ fontWeight: 600 }}>
                {title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Decisions */}
      <section aria-labelledby="decisions-title" className="relative overflow-hidden px-gutter pb-24 md:pb-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 -left-52 h-[620px] w-[620px] rounded-full"
          style={{ background: 'radial-gradient(closest-side, rgba(61,126,255,0.10), transparent)' }}
        />
        <div className="relative">
          <SectionHeading id="decisions-title" index="02" label="Decisions" title="Why it looks" subtitle="the way it does.">
            The choices that mattered, and the reasoning behind them.
          </SectionHeading>
          <ol className="mt-14 space-y-px overflow-hidden rounded-3xl border border-line bg-line lg:mt-16">
            {study.decisions.map(({ title, text }, i) => (
              <li key={title} className="grid gap-4 bg-page px-7 py-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-10 sm:px-10">
                <Reveal delay={0.04 * i}>
                  <h3 className="font-display text-[1.15rem] leading-snug text-ink" style={{ fontWeight: 600 }}>
                    {title}
                  </h3>
                </Reveal>
                <Reveal delay={0.04 * i + 0.05}>
                  <p className="text-[15px] leading-relaxed text-ink-muted">{text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Outcome */}
      <section className="px-gutter pb-24 md:pb-32">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <h2 className="font-display text-[1.8rem] leading-tight font-extrabold tracking-[-0.03em] text-ink sm:text-[2.2rem]" style={{ textWrap: 'balance' }}>
            The result
          </h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-muted">{study.outcome}</p>
        </Reveal>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="px-gutter pb-24 md:pb-32">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading layout="stack" id="faq-title" index="03" label="FAQ" title="Questions?" subtitle="Here are the answers.">
              What people ask me about projects like this one.
            </SectionHeading>
          </div>
          <FaqList faqs={study.faqs} />
        </div>
      </section>

      <CtaBand
        title="Want something like this?"
        text="Tell me about your business and I'll design your new homepage for free, so you can see it before you spend anything."
      />
    </PageShell>
  )
}
