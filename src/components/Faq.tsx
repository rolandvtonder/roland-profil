import { ArrowRightIcon, WhatsappLogoIcon } from '@phosphor-icons/react'
import FaqList from './FaqList'
import PillLink from './PillLink'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { faqs, whatsappUrl } from '../content'

type FaqProps = {
  /** 'preview' is the homepage cut: the first few questions, with a link to the rest. */
  variant?: 'preview' | 'full'
  /** The /faq/ page has its own hero, so it turns the section heading off. */
  heading?: boolean
}

export default function Faq({ variant = 'preview', heading = true }: FaqProps) {
  const preview = variant === 'preview'
  const shown = preview ? faqs.slice(0, 4) : faqs

  return (
    <section id="faq" aria-labelledby={heading ? 'faq-title' : undefined} className="relative px-gutter py-28 md:py-36">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        {heading && (
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading layout="stack" id="faq-title" index="05" label="FAQ" title="Questions?" subtitle="Here are the answers.">
              The things business owners ask me most. Can’t find yours? Send me a WhatsApp and I’ll get back to you.
            </SectionHeading>
            <Reveal delay={0.15} className="mt-10">
              <PillLink href={whatsappUrl} external>
                <WhatsappLogoIcon size={18} aria-hidden="true" />
                Ask me on WhatsApp
                <span className="sr-only"> (opens WhatsApp)</span>
              </PillLink>
            </Reveal>
          </div>
        )}

        <div className={heading ? '' : 'lg:col-span-2'}>
          <FaqList faqs={shown} />
          {preview && (
            <Reveal className="mt-8">
              <a
                href="/faq/"
                className="group/all inline-flex items-center gap-2 text-[15px] font-medium text-accent-soft no-underline transition-colors hover:text-accent-bright"
              >
                All {faqs.length} questions
                <ArrowRightIcon size={15} aria-hidden="true" className="transition-transform duration-200 group-hover/all:translate-x-0.5" />
              </a>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
