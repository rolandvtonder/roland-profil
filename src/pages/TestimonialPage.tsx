import { useRef, useState } from 'react'
import { ArrowRightIcon, CheckCircleIcon, WhatsappLogoIcon } from '@phosphor-icons/react'
import PageShell from '../components/PageShell'
import Reveal from '../components/Reveal'
import { site, whatsappUrl } from '../content'

type Values = { name: string; business: string; role: string; message: string; consent: boolean }
const empty: Values = { name: '', business: '', role: '', message: '', consent: false }

const field =
  'block w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3.5 text-base text-ink placeholder:text-ink-subtle transition-[border-color,box-shadow,background-color] duration-200 focus:border-accent-bright focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgba(61,126,255,0.2)] focus:outline-none'

/**
 * A short form clients can fill in from a single link, rather than being asked
 * to compose a testimonial from scratch in a WhatsApp reply. The consent box is
 * not optional: their words and their business name go on a public website.
 */
export default function TestimonialPage() {
  const [values, setValues] = useState<Values>(empty)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [attempted, setAttempted] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  const missing = {
    name: !values.name.trim(),
    business: !values.business.trim(),
    message: values.message.trim().length < 10,
    consent: !values.consent,
  }
  const hasErrors = Object.values(missing).some(Boolean)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setAttempted(true)
    if (hasErrors) return

    setStatus('sending')
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: site.web3formsKey,
          subject: `Testimonial from ${values.business}`,
          from_name: `${site.name} testimonials`,
          name: values.name,
          business: values.business,
          role: values.role || 'Not given',
          testimonial: values.message,
          permission_to_publish: 'Yes',
        }),
      })
      const result = (await response.json()) as { success?: boolean }
      if (!response.ok || !result.success) throw new Error('rejected')
      setStatus('sent')
      panelRef.current?.focus({ preventScroll: true })
      panelRef.current?.scrollIntoView({ block: 'center' })
    } catch {
      setStatus('error')
    }
  }

  const set = (key: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value }))

  return (
    <PageShell>
      <section className="relative overflow-hidden px-gutter pt-36 pb-28 md:pt-44 md:pb-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-[20%] left-1/2 h-[760px] w-[900px] -translate-x-1/2"
          style={{ background: 'radial-gradient(closest-side, rgba(61,126,255,0.18) 0%, transparent 72%)' }}
        />

        <div className="relative mx-auto max-w-[640px]">
          {status === 'sent' ? (
            <div ref={panelRef} tabIndex={-1} className="rounded-3xl border border-accent/40 bg-accent/[0.07] px-7 py-12 text-center outline-none sm:px-12">
              <CheckCircleIcon size={44} weight="light" aria-hidden="true" className="mx-auto text-accent-soft" />
              <h1 className="mt-6 font-display text-[2rem] leading-tight font-extrabold tracking-[-0.03em] text-ink">Thank you, genuinely.</h1>
              <p className="mx-auto mt-5 max-w-[46ch] text-[16px] leading-relaxed text-ink-muted">
                That means a lot. It will go up on my site shortly, and I will send you the link when it does.
              </p>
              <a
                href="/"
                className="group/home mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-accent-soft no-underline transition-colors hover:text-accent-bright"
              >
                Have a look at the site
                <ArrowRightIcon size={15} aria-hidden="true" className="transition-transform duration-200 group-hover/home:translate-x-0.5" />
              </a>
            </div>
          ) : (
            <>
              <Reveal>
                <p className="text-[12.5px] tracking-[0.1em] text-ink-subtle uppercase">A small favour</p>
                <h1 className="mt-5 font-display text-[2.1rem] leading-[1.08] font-extrabold tracking-[-0.035em] text-ink sm:text-[2.6rem]" style={{ textWrap: 'balance' }}>
                  Would you say a few words
                  <span className="block text-accent-soft">about working with me?</span>
                </h1>
                <p className="mt-6 text-[16.5px] leading-relaxed text-ink-muted">
                  Two or three sentences is plenty, and it takes about a minute. It helps other business owners decide whether to trust me with
                  their website, which matters more than anything I can say about myself.
                </p>
              </Reveal>

              <Reveal delay={0.1} className="mt-10">
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-[14px] text-ink-muted">Your name</span>
                      <input type="text" autoComplete="name" value={values.name} onChange={set('name')} placeholder="Daron Medcalf" className={field} />
                      {attempted && missing.name && <span className="mt-1.5 block text-[13px] text-red-300">Please add your name.</span>}
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-[14px] text-ink-muted">Your business</span>
                      <input type="text" autoComplete="organization" value={values.business} onChange={set('business')} placeholder="LIFTR Co" className={field} />
                      {attempted && missing.business && <span className="mt-1.5 block text-[13px] text-red-300">Please add your business name.</span>}
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-[14px] text-ink-muted">
                      Your role <span className="text-ink-subtle">(optional)</span>
                    </span>
                    <input type="text" value={values.role} onChange={set('role')} placeholder="Owner" className={field} />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-[14px] text-ink-muted">How was it, working with me?</span>
                    <textarea
                      rows={5}
                      value={values.message}
                      onChange={set('message')}
                      placeholder="What you needed, how it went, and whether the site has done what you hoped. Plain words are better than polished ones."
                      className={`${field} resize-y`}
                    />
                    {attempted && missing.message && <span className="mt-1.5 block text-[13px] text-red-300">A sentence or two is all I need.</span>}
                  </label>

                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-white/[0.02] px-4 py-4">
                    <input
                      type="checkbox"
                      checked={values.consent}
                      onChange={set('consent')}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[#2A62F4]"
                    />
                    <span className="text-[14.5px] leading-relaxed text-ink-muted">
                      I am happy for Roland to publish this, with my name and business, on rolandwebdesign.co.za.
                    </span>
                  </label>
                  {attempted && missing.consent && <span className="block text-[13px] text-red-300">I need your permission before I can use it.</span>}

                  {status === 'error' && (
                    <p className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-[14.5px] text-red-200">
                      That did not send. Please try again, or just WhatsApp it to me and I will copy it across.
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="group/send inline-flex cursor-pointer items-center gap-2.5 rounded-[12px] bg-accent-strong px-7 py-3.5 text-[15px] font-medium text-white shadow-[0_14px_36px_-12px_rgba(42,98,244,0.95)] transition-all duration-200 hover:bg-accent-hover active:scale-[0.98] disabled:opacity-60"
                    >
                      {status === 'sending' ? 'Sending…' : 'Send it'}
                      <ArrowRightIcon size={16} aria-hidden="true" className="transition-transform duration-200 group-hover/send:translate-x-0.5" />
                    </button>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[14.5px] text-ink-muted no-underline transition-colors hover:text-ink"
                    >
                      <WhatsappLogoIcon size={17} aria-hidden="true" />
                      Rather send it on WhatsApp
                      <span className="sr-only"> (opens WhatsApp)</span>
                    </a>
                  </div>
                </form>
              </Reveal>
            </>
          )}
        </div>
      </section>
    </PageShell>
  )
}
