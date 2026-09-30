// ─────────────────────────────────────────────────────────────────────────
//  SITE CONTENT: edit your copy, projects and services here.
//  Anything marked PLACEHOLDER should be replaced before the site goes live.
// ─────────────────────────────────────────────────────────────────────────
import {
  ChartLineUpIcon,
  ChatsCircleIcon,
  CodeIcon,
  EyeIcon,
  LightningIcon,
  MagicWandIcon,
  PenNibIcon,
  ShieldCheckIcon,
  ShoppingBagOpenIcon,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'

export const site = {
  name: 'Roland', // the wordmark in the navbar and footer
  businessName: 'Roland Web Design', // the trading name, used in the page title and copyright
  url: 'https://rolandwebdesign.co.za',
  role: 'Web Designer & Developer',
  // Switch to hello@rolandwebdesign.co.za once the domain and mailbox are set up
  email: 'rolandvtonder@gmail.com',
  whatsapp: {
    display: '064 070 3335',
    number: '27640703335', // international format (27 + number without the leading 0) for wa.me links
    message: 'Hi Roland, I’d like to chat about a website.', // pre-filled when a visitor opens the chat
  },
  location: 'Brackenhurst, Alberton',
  availability: 'Available for projects',
  responseTime: 'I reply within one business day',
  // Paste a free Web3Forms access key (https://web3forms.com) to receive form
  // submissions straight to your inbox. Leave it empty and the contact form
  // opens the visitor's email app with their message ready to send instead.
  web3formsKey: '',
}

export const whatsappUrl = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(site.whatsapp.message)}`

// The main call to action, used in the navbar, hero and throughout the page.
export const previewCta = { label: 'Get a Free Preview', href: '#contact' }

// Add a full URL to show a profile in the Contact section and footer.
export const socials: { label: 'LinkedIn' | 'Instagram' | 'GitHub'; href: string }[] = [
  { label: 'LinkedIn', href: '' },
  { label: 'Instagram', href: '' },
  { label: 'GitHub', href: '' },
]

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'How it works', href: '#process' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
]

export const hero = {
  badge: 'Available for new projects',
  title: 'Websites That Bring You',
  titleAccent: 'More Calls & WhatsApps',
  primaryCta: { label: 'Get a free homepage preview', href: '#contact' },
  blurb:
    'I design and build fast, modern websites for local businesses, and I’ll design your homepage first so you can see your new site before you spend a cent.',
}

// ── Work ─────────────────────────────────────────────────────────────────
// Websites Roland designed and built. `image` is a full-page screenshot in
// /public/work/: the card shows the top of it and scrolls through it on hover.
// status 'client' = a paying client; 'concept' = a redesign pitched to the business.
// Add `testimonial` once the client gives you a quote.
export type Project = {
  title: string
  category: string
  status: 'client' | 'concept'
  description: string
  highlights: string[]
  url: string
  image: string
  testimonial?: { quote: string; name: string; role: string }
  featured?: boolean
}

export const projects: Project[] = [
  {
    title: 'LIFTR Co',
    category: 'Crane hire · Nationwide',
    status: 'client',
    description:
      'A full website for a nationwide crane hire and lifting company: mobile and spider crane hire, glass and steel installations, access equipment, a gallery of completed lifts and a plant-for-sale listing — with WhatsApp quoting on every page.',
    highlights: ['Service pages', 'Lift gallery', 'Equipment for sale', 'WhatsApp quotes'],
    url: 'https://liftrco.co.za/',
    image: '/work/liftr.webp',
    featured: true,
  },
  {
    title: 'Flexi Tours',
    category: 'Tour operator · Cape Town',
    status: 'client',
    description:
      'A complete redesign for a Cape Town tour company: day tours, safaris, multi-day packages, airport transfers and travel guides, with a WhatsApp enquiry always one tap away.',
    highlights: ['Tour catalogue', 'Transfer pricing', 'Travel guides', 'WhatsApp booking'],
    url: 'https://flexi-tours.co.za/',
    image: '/work/flexitours.webp',
    featured: true,
  },
  {
    title: 'Drip Dry Plumbing',
    category: 'Plumbing · Roodepoort',
    status: 'concept',
    description:
      'A trust-first concept for a family-run plumbing business, built around 24-hour call-outs, clear services and one-tap calls.',
    highlights: ['24h call-outs', 'Click-to-call', 'Reviews'],
    url: 'https://rolandvtonder.github.io/Dripdryplumbing-web-demo/index.html',
    image: '/work/dripdry-plumbing.webp',
  },
  {
    title: 'Sure Penzance Travel',
    category: 'Travel agency · Alberton',
    status: 'concept',
    description:
      'A modern concept for an established travel agency, with a full-screen destination slideshow, hand-picked holiday specials and business travel services.',
    highlights: ['Destination slideshow', 'Holiday specials', 'Corporate travel'],
    url: 'https://rolandvtonder.github.io/Sure-Travel-web-demo/',
    image: '/work/sure-travel.webp',
  },
  {
    title: 'Flexi Hire',
    category: 'Event hire · Centurion',
    status: 'concept',
    description:
      'A concept for a tent and events furniture hire company, showcasing its hire ranges and ready-made seating packages with quick WhatsApp quotes.',
    highlights: ['Hire catalogue', 'Package pricing', 'WhatsApp quotes'],
    url: 'https://rolandvtonder.github.io/Flexihire-demo-web/',
    image: '/work/flexihire.webp',
  },
  {
    title: 'Lara Travel',
    category: 'Travel agency · Johannesburg',
    status: 'concept',
    description:
      'A bold concept for a Johannesburg travel agency covering corporate, group and leisure travel, with destination guides, team profiles and Google reviews.',
    highlights: ['Destination guides', 'Team profiles', 'Reviews'],
    url: 'https://rolandvtonder.github.io/Lara-Travel-demo-web/',
    image: '/work/lara-travel.webp',
  },
  {
    title: 'JPM Plumbing & Electrical',
    category: 'Plumbing & electrical · Johannesburg',
    status: 'concept',
    description:
      'A lead-generating concept for a plumbing and electrical team, with services, before-and-after projects, service areas, FAQs and a quote request form.',
    highlights: ['Quote form', 'Before & after', 'FAQ'],
    url: 'https://rolandvtonder.github.io/JPM-Plumbing-web-demo/',
    image: '/work/jpm-plumbing.webp',
  },
  {
    title: 'Travel Delight',
    category: 'Group travel · Johannesburg',
    status: 'concept',
    description:
      'A cinematic concept for a group travel specialist that plans choir, school and family tours, with featured journeys, a destinations map and trip galleries.',
    highlights: ['Group tours', 'Destinations map', 'Photo galleries'],
    url: 'https://rolandvtonder.github.io/Travel-Delight-web-demo/',
    image: '/work/travel-delight.webp',
  },
]

// ── How it works ─────────────────────────────────────────────────────────
export const processSteps = [
  {
    title: 'Free homepage preview',
    text: 'Tell me about your business and I’ll design your new homepage for free. No cost, no obligation.',
    badge: 'Free',
  },
  {
    title: 'Build & refine',
    text: 'Love it? I build the rest of your site and we fine-tune it together until it feels right.',
  },
  {
    title: 'Launch',
    text: 'I connect your domain, set up hosting and get you ready for Google, then take your new site live.',
  },
  {
    title: 'Ongoing support',
    text: 'Need a change later? Just WhatsApp me. Optional care plans keep everything updated and secure.',
  },
]

// ── Services ─────────────────────────────────────────────────────────────
export const services: { icon: Icon; title: string; description: string; tags: string[] }[] = [
  {
    icon: PenNibIcon,
    title: 'Web Design',
    description:
      'Custom designs shaped around your brand and your customers. No templates, no cookie-cutter layouts.',
    tags: ['UI design', 'Wireframes', 'Prototypes'],
  },
  {
    icon: CodeIcon,
    title: 'Web Development',
    description:
      'Hand-built, responsive websites that load fast and work beautifully on every screen size.',
    tags: ['Responsive', 'CMS', 'Integrations'],
  },
  {
    icon: ShoppingBagOpenIcon,
    title: 'E-commerce',
    description:
      'Online stores that are easy for customers to shop and just as easy for you to manage.',
    tags: ['Product pages', 'Checkout', 'Payments'],
  },
  {
    icon: ChartLineUpIcon,
    title: 'SEO & Performance',
    description:
      'Technical SEO, speed tuning and analytics, so the right people find you and stick around.',
    tags: ['On-page SEO', 'Core Web Vitals', 'Analytics'],
  },
  {
    icon: MagicWandIcon,
    title: 'Redesigns',
    description:
      'Give an outdated site a fresh start without losing the content and search rankings you’ve built.',
    tags: ['Site audit', 'Migration', 'Refresh'],
  },
  {
    icon: ShieldCheckIcon,
    title: 'Care & Hosting',
    description:
      'Updates, backups, security and small content changes, all taken care of after launch.',
    tags: ['Hosting', 'Backups', 'Support'],
  },
]

// ── About ────────────────────────────────────────────────────────────────
export const about = {
  title: 'Hi, I’m Roland.',
  subtitle: 'I help local businesses win more work online.',
  // Draft story: add a personal touch (how you started, what you enjoy) whenever you like.
  paragraphs: [
    'I’m a web designer and developer based in Brackenhurst, Alberton. I build fast, modern websites for local businesses, from plumbers and electricians to travel agencies, event companies and crane hire, designed to turn visitors into calls, WhatsApps and bookings.',
    'Every project starts the same way: I design a free preview of your homepage, so you can see exactly what you’re getting before you spend a cent. If you love it, I build the rest, take it live and stay just a WhatsApp away for changes.',
  ],
  // PLACEHOLDER: put your photo in /public (e.g. /public/roland.jpg) and set photo: '/roland.jpg'
  photo: '',
  photoAlt: 'Roland, web designer in Alberton',
  values: [
    { icon: ChatsCircleIcon, title: 'One point of contact', text: 'You deal with me directly, from the first chat to launch day.' },
    { icon: EyeIcon, title: 'See it before you pay', text: 'Your homepage preview is free, with no obligation.' },
    { icon: LightningIcon, title: 'Fast by default', text: 'Quick-loading, mobile-first sites that are ready for Google.' },
  ] satisfies { icon: Icon; title: string; text: string }[],
}

// ── FAQ ──────────────────────────────────────────────────────────────────
export const faqs = [
  {
    question: 'How much does a website cost?',
    answer:
      'It depends on how many pages and features you need. After your free homepage preview you’ll get a fixed quote upfront, so there are no surprises.',
  },
  {
    // PLACEHOLDER: check these timeframes match how fast you work
    question: 'How long does it take?',
    answer:
      'Your free preview usually takes a few days. Most small business websites are live within one to two weeks after you say yes, depending on how quickly we finalise your content.',
  },
  {
    question: 'Do I need my own domain and hosting?',
    answer:
      'No. I can register your domain and host your website for you, or use a domain and hosting you already have.',
  },
  {
    question: 'Can I make changes to the website myself?',
    answer:
      'Most clients simply WhatsApp me their changes and I update the site for them. If you’d rather edit it yourself, we can talk about adding a simple editor for the parts you change often.',
  },
  {
    question: 'Will my website show up on Google?',
    answer:
      'Every site is built to be fast, mobile-friendly and search-ready, with proper page titles and descriptions. I’ll also help you set up your Google Business Profile so you can appear in local searches and on Google Maps.',
  },
  {
    question: 'Do you only work with businesses in Alberton?',
    answer:
      'I’m based in Brackenhurst, Alberton and happy to meet local clients in person, but I work with businesses all over South Africa via WhatsApp, email and video calls.',
  },
]
