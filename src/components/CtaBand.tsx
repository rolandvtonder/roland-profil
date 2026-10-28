import { ArrowRightIcon, WhatsappLogoIcon } from '@phosphor-icons/react'
import Reveal from './Reveal'
import { previewCta, whatsappUrl } from '../content'

/** The closing call to action every sub-page ends on. */
export default function CtaBand({ title, text }: { title: string; text: string }) {
  return (
    <section className="relative overflow-hidden px-gutter py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[620px] w-[900px] -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(closest-side, rgba(61,126,255,0.16), transparent)' }}
      />
      <Reveal className="relative mx-auto max-w-[760px] rounded-3xl border border-line bg-surface/70 px-7 py-12 text-center backdrop-blur-sm sm:px-12 sm:py-14">
        <h2 className="font-display text-[1.9rem] leading-tight font-extrabold tracking-[-0.03em] text-ink sm:text-[2.4rem]" style={{ textWrap: 'balance' }}>
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-[52ch] text-[16px] leading-relaxed text-ink-muted">{text}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href={previewCta.href}
            className="group/cta inline-flex cursor-pointer items-center gap-2.5 rounded-[12px] bg-accent-strong px-7 py-3.5 text-[15px] font-medium text-white no-underline shadow-[0_14px_36px_-12px_rgba(42,98,244,0.95)] transition-all duration-200 hover:bg-accent-hover active:scale-[0.98]"
          >
            Get a free homepage preview
            <ArrowRightIcon size={17} aria-hidden="true" className="transition-transform duration-200 group-hover/cta:translate-x-0.5" />
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[12px] border border-line-strong px-6 py-3.5 text-[15px] font-medium text-ink-muted no-underline transition-colors duration-200 hover:border-accent/40 hover:text-ink"
          >
            <WhatsappLogoIcon size={18} aria-hidden="true" />
            WhatsApp me
            <span className="sr-only"> (opens WhatsApp)</span>
          </a>
        </div>
      </Reveal>
    </section>
  )
}
