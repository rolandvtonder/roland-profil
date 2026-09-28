import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRightIcon,
  CheckCircleIcon,
  CircleNotchIcon,
  ClockIcon,
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  MapPinIcon,
  PaperPlaneTiltIcon,
  WarningCircleIcon,
  WhatsappLogoIcon,
} from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent, ReactNode } from 'react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { site, socials, whatsappUrl } from '../content'

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error'
type Field = 'name' | 'business' | 'email' | 'phone' | 'website' | 'message'
type Values = Record<Field, string>
type Errors = Partial<Record<Field, string>>

const emptyValues: Values = { name: '', business: '', email: '', phone: '', website: '', message: '' }
const fieldOrder: Field[] = ['name', 'business', 'email', 'phone', 'message']
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const socialIcons = { LinkedIn: LinkedinLogoIcon, Instagram: InstagramLogoIcon, GitHub: GithubLogoIcon }
const activeSocials = socials.filter((social) => social.href)

const contactDetails = [
  { icon: EnvelopeSimpleIcon, label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { icon: WhatsappLogoIcon, label: 'WhatsApp', value: site.whatsapp.display, href: whatsappUrl, external: true },
  { icon: MapPinIcon, label: 'Based in', value: site.location },
  { icon: ClockIcon, label: 'Response time', value: site.responseTime },
]

function validate(values: Values): Errors {
  const errors: Errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.business.trim()) errors.business = 'Please enter your business name so I can design your preview.'
  if (!values.email.trim()) errors.email = 'Please enter your email so I can reply.'
  else if (!emailPattern.test(values.email.trim()))
    errors.email = 'That email address doesn’t look quite right. Check for typos, e.g. name@company.com.'
  const digits = values.phone.replace(/\D/g, '')
  if (values.phone.trim() && (digits.length < 9 || digits.length > 15))
    errors.phone = 'That number looks too short or long. Try the format 082 123 4567, or leave it blank.'
  if (values.message.trim().length < 10) errors.message = 'Tell me a little about your business (at least 10 characters).'
  return errors
}

const inputClass = (hasError: boolean) =>
  `block w-full rounded-xl border bg-white/[0.03] px-4 py-3.5 text-base text-ink placeholder:text-ink-subtle transition-[border-color,box-shadow,background-color] duration-200 focus:border-accent-bright focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgba(61,126,255,0.2)] focus:outline-none ${
    hasError ? 'border-[#FF8A8A]/70' : 'border-line hover:border-line-strong'
  }`

type FieldShellProps = { id: string; label: string; required?: boolean; error?: string; hint?: string; children: ReactNode }

function FieldShell({ id, label, required, error, hint, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-3 text-sm text-ink-muted">
        <span>
          {label}
          {required && (
            <span aria-hidden="true" className="text-accent-soft">
              {' '}
              *
            </span>
          )}
        </span>
        {hint && <span className="text-xs text-ink-subtle">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-sm text-[#FF8A8A]">
          <WarningCircleIcon size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  const [values, setValues] = useState<Values>(emptyValues)
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [attempted, setAttempted] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const nameRef = useRef<HTMLInputElement>(null)
  const businessRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const panelHeadingRef = useRef<HTMLHeadingElement>(null)

  const errors = validate(values)
  const shownError = (field: Field) => (touched[field] || attempted ? errors[field] : undefined)
  const fieldProps = (field: Field) => ({
    id: `contact-${field}`,
    name: field,
    value: values[field],
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValues((v) => ({ ...v, [field]: e.target.value })),
    onBlur: () => setTouched((t) => ({ ...t, [field]: true })),
    'aria-invalid': shownError(field) ? true : undefined,
    'aria-describedby': shownError(field) ? `contact-${field}-error` : undefined,
    className: inputClass(Boolean(shownError(field))),
  })

  // Move focus to the confirmation so screen readers announce it
  useEffect(() => {
    if (status === 'sent' || status === 'mailto') panelHeadingRef.current?.focus()
  }, [status])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setAttempted(true)
    const firstInvalid = fieldOrder.find((field) => errors[field])
    if (firstInvalid) {
      // Focus the first problem field and bring it clear of the fixed navbar
      const refs = { name: nameRef, business: businessRef, email: emailRef, phone: phoneRef, message: messageRef }
      const el = refs[firstInvalid as keyof typeof refs].current
      el?.focus({ preventScroll: true })
      el?.scrollIntoView({ block: 'center' })
      return
    }

    const v = Object.fromEntries(Object.entries(values).map(([k, val]) => [k, val.trim()])) as Values
    const subject = `Free preview request from ${v.business}`

    // No form service configured yet: hand the message to the visitor's email app
    if (!site.web3formsKey) {
      const body = [
        `Name: ${v.name}`,
        `Business: ${v.business}`,
        `Email: ${v.email}`,
        ...(v.phone ? [`WhatsApp / phone: ${v.phone}`] : []),
        ...(v.website ? [`Current website: ${v.website}`] : []),
        '',
        v.message,
      ].join('\n')
      window.location.assign(`mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
      setStatus('mailto')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: site.web3formsKey,
          subject,
          from_name: `${site.name} portfolio`,
          name: v.name,
          business: v.business,
          email: v.email,
          phone: v.phone || 'Not given',
          current_website: v.website || 'None given',
          message: v.message,
        }),
      })
      const result = (await response.json()) as { success?: boolean }
      if (!response.ok || !result.success) throw new Error('Form service rejected the submission')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  function resetForm() {
    setValues(emptyValues)
    setTouched({})
    setAttempted(false)
    setStatus('idle')
  }

  const showPanel = status === 'sent' || status === 'mailto'

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden px-gutter py-28 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-[720px] w-[720px] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(61,126,255,0.12), transparent)' }}
      />
      <div className="relative grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <SectionHeading layout="stack" id="contact-title" index="06" label="Contact" title="Get your free preview." subtitle="See your new site before you pay.">
            Tell me a little about your business and I’ll design your new homepage for free, with no obligation. If you love it, we’ll build the rest together.
          </SectionHeading>

          <Reveal delay={0.15}>
            <ul className="mt-10 space-y-5">
              {contactDetails.map(({ icon: Icon, label, value, href, external }) => (
                <li key={label} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-white/[0.03] text-accent-soft">
                    <Icon size={20} weight="light" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs tracking-[0.08em] text-ink-subtle uppercase">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        className="break-words text-ink no-underline transition-colors hover:text-accent-soft"
                      >
                        {value}
                        {external && <span className="sr-only"> (opens WhatsApp)</span>}
                      </a>
                    ) : (
                      <p className="text-ink">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {activeSocials.length > 0 && (
              <ul className="mt-8 flex gap-3" aria-label="Social profiles">
                {activeSocials.map(({ label, href }) => {
                  const Icon = socialIcons[label]
                  return (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${label} (opens in a new tab)`}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
                      >
                        <Icon size={20} aria-hidden="true" />
                      </a>
                    </li>
                  )
                })}
              </ul>
            )}
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative rounded-3xl border border-line bg-surface/70 p-6 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.8)] backdrop-blur-sm sm:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {showPanel ? (
                <motion.div
                  key="panel"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="flex min-h-[420px] flex-col items-start justify-center"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent-soft">
                    {status === 'sent' ? <CheckCircleIcon size={28} weight="light" aria-hidden="true" /> : <PaperPlaneTiltIcon size={28} weight="light" aria-hidden="true" />}
                  </span>
                  <h3 ref={panelHeadingRef} tabIndex={-1} className="mt-6 font-display text-3xl text-ink outline-none" style={{ fontWeight: 600, letterSpacing: '-0.02em' }}>
                    {status === 'sent' ? `Thanks, ${values.name.trim().split(' ')[0]}!` : 'Almost there.'}
                  </h3>
                  <p className="mt-3 max-w-[46ch] text-[17px] leading-relaxed text-ink-muted">
                    {status === 'sent' ? (
                      <>Your request is in. I’ll start on your homepage preview and be in touch soon.</>
                    ) : (
                      <>
                        Your email app should now be open with your request ready. Just press send. If nothing opened, email me at{' '}
                        <a href={`mailto:${site.email}`} className="text-accent-soft underline underline-offset-4">
                          {site.email}
                        </a>{' '}
                        or{' '}
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-accent-soft underline underline-offset-4">
                          WhatsApp me
                        </a>
                        .
                      </>
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={status === 'sent' ? resetForm : () => setStatus('idle')}
                    className="mt-8 cursor-pointer rounded-full border border-white/35 bg-white/[0.04] px-6 py-[11px] text-[15px] text-white transition-colors hover:bg-white/[0.12]"
                  >
                    {status === 'sent' ? 'Send another request' : 'Back to the form'}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  onSubmit={handleSubmit}
                  noValidate
                  aria-labelledby="contact-form-title"
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 id="contact-form-title" className="font-display text-2xl text-ink" style={{ fontWeight: 600, letterSpacing: '-0.01em' }}>
                      Request your free preview
                    </h3>
                    <p className="text-xs text-ink-subtle">
                      <span aria-hidden="true" className="text-accent-soft">
                        *
                      </span>{' '}
                      Required
                    </p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <FieldShell id="contact-name" label="Your name" required error={shownError('name')}>
                      <input ref={nameRef} type="text" autoComplete="name" required placeholder="Jane Smith" {...fieldProps('name')} />
                    </FieldShell>
                    <FieldShell id="contact-business" label="Business name" required error={shownError('business')}>
                      <input ref={businessRef} type="text" autoComplete="organization" required placeholder="Smith Plumbing" {...fieldProps('business')} />
                    </FieldShell>
                    <FieldShell id="contact-email" label="Email" required error={shownError('email')}>
                      <input ref={emailRef} type="email" inputMode="email" autoComplete="email" required placeholder="jane@company.com" {...fieldProps('email')} />
                    </FieldShell>
                    <FieldShell id="contact-phone" label="WhatsApp number" hint="Optional" error={shownError('phone')}>
                      <input ref={phoneRef} type="tel" inputMode="tel" autoComplete="tel" placeholder="082 123 4567" {...fieldProps('phone')} />
                    </FieldShell>
                  </div>

                  <FieldShell id="contact-website" label="Current website" hint="Optional">
                    <input type="text" inputMode="url" autoComplete="url" placeholder="yourbusiness.co.za, or leave blank if you don’t have one" {...fieldProps('website')} />
                  </FieldShell>

                  <FieldShell id="contact-message" label="About your business" required error={shownError('message')}>
                    <textarea
                      ref={messageRef}
                      rows={5}
                      required
                      placeholder="What do you do, who are your customers, and what should your new website help you achieve?"
                      {...fieldProps('message')}
                      className={`${inputClass(Boolean(shownError('message')))} min-h-[140px] resize-y`}
                    />
                  </FieldShell>

                  {status === 'error' && (
                    <div role="alert" className="flex items-start gap-3 rounded-xl border border-[#FF8A8A]/40 bg-[#FF8A8A]/[0.08] px-4 py-3 text-sm text-[#FFC2C2]">
                      <WarningCircleIcon size={18} aria-hidden="true" className="mt-px shrink-0" />
                      <p>
                        Sorry, your request didn’t send. Please try again, or email me directly at{' '}
                        <a href={`mailto:${site.email}`} className="underline underline-offset-4">
                          {site.email}
                        </a>{' '}
                        or{' '}
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                          WhatsApp me
                        </a>
                        .
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col-reverse items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs leading-relaxed text-ink-subtle">Free and no obligation. I’ll only use your details to reply to you.</p>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-accent-strong px-[30px] py-[14px] text-[15px] font-medium text-white shadow-[0_12px_32px_-12px_rgba(42,98,244,0.9)] transition-[background-color,box-shadow,transform] duration-200 hover:bg-accent-hover active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 sm:w-auto"
                    >
                      {status === 'sending' ? (
                        <>
                          <CircleNotchIcon size={18} aria-hidden="true" className="animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send my request
                          <ArrowRightIcon size={16} aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </div>
                  <p role="status" className="sr-only">
                    {status === 'sending' ? 'Sending your request…' : ''}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
