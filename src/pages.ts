// ─────────────────────────────────────────────────────────────────────────
//  SUB-PAGE CONTENT: one entry per service page and per case study.
//
//  Each of these becomes its own URL with its own title and description, so
//  it can rank in Google on its own rather than competing with the homepage.
//  Edit the copy here; the page layouts read from it.
// ─────────────────────────────────────────────────────────────────────────
// Kept free of React imports on purpose: scripts/build-pages.mjs reads this
// file directly in Node to generate each page's HTML, titles and schema.

export type FaqItem = { question: string; answer: string }

/** Icon names resolved to components in ServicePageView. */
export type ServiceIcon = 'penNib' | 'code' | 'deviceMobile' | 'stack' | 'shoppingBag' | 'chartLineUp'

export type ServicePage = {
  slug: string
  icon: ServiceIcon
  /** Shown in the browser tab and as the Google result headline. Keep under ~60 characters. */
  title: string
  /** The Google result snippet. Keep under ~155 characters. */
  description: string
  /** The on-page headline. */
  heading: string
  headingAccent: string
  intro: string
  /** The problem this service solves, in the client's words rather than mine. */
  problem: { title: string; body: string }
  includes: { title: string; text: string }[]
  process: { step: string; title: string; text: string }[]
  goodFor: string[]
  faqs: FaqItem[]
  /** Project titles from content.ts to show at the bottom as proof. */
  relatedProjects: string[]
}

export const servicePages: ServicePage[] = [
  {
    slug: 'web-design',
    icon: 'penNib',
    title: 'Web Design | Roland Web Design',
    description:
      'Custom website design for South African businesses. No templates. See your new homepage designed for free before you spend a cent.',
    heading: 'Web design that',
    headingAccent: 'earns its keep.',
    intro:
      'A website is usually the first thing a customer sees of your business, and they decide whether to trust you in about three seconds. I design sites that make that decision easy: clear, fast, and built around the one thing you want a visitor to do.',
    problem: {
      title: 'Most small business websites fail for the same reason',
      body: 'They are built to list information rather than to get a response. The phone number is buried three scrolls down, the photos are stock, and nothing tells a visitor why they should pick you over the next company in the search results. A good design fixes the order of things: who you are, why you can be trusted, and how to reach you, in that order and all within reach.',
    },
    includes: [
      { title: 'A design made for your business', text: 'Not a template with your logo dropped in. Your colours, your photos, your services, laid out around what your customers actually ask you.' },
      { title: 'Mobile first, properly', text: 'Most of your visitors are on a phone. I design for that screen first and scale up, rather than shrinking a desktop layout and hoping.' },
      { title: 'One obvious next step', text: 'Every page points at a single action, whether that is a call, a WhatsApp, a quote request or a booking.' },
      { title: 'Wireframes before pixels', text: 'We agree the structure before anything gets styled, so changes happen while they are cheap.' },
      { title: 'Your content, written properly', text: 'If you have no copy, I will draft it. Most clients find this the hardest part, so I do not leave you to it.' },
      { title: 'A free homepage first', text: 'You see a real design of your actual homepage before any money changes hands.' },
    ],
    process: [
      { step: '01', title: 'Free homepage preview', text: 'Tell me about your business and I design your new homepage. No cost, no obligation, nothing to sign.' },
      { step: '02', title: 'Refine together', text: 'Love it? We adjust until it feels right. Colours, wording, photos, layout.' },
      { step: '03', title: 'Build the rest', text: 'I build out the remaining pages in the agreed style and keep you updated as it comes together.' },
      { step: '04', title: 'Launch', text: 'Domain connected, hosting set up, ready for Google, and live.' },
    ],
    goodFor: [
      'Trades and services that need the phone to ring',
      'Tour operators and travel agencies',
      'Hire and equipment companies',
      'Any business whose current site was built more than five years ago',
    ],
    faqs: [
      { question: 'How much does a website design cost?', answer: 'It depends on how many pages and features you need. You get a fixed quote upfront after your free homepage preview, so there are no surprises halfway through.' },
      { question: 'Do you use templates?', answer: 'No. Every site is designed around your business. Templates are why so many small business websites look like each other, and looking like everyone else is the opposite of what you are paying for.' },
      { question: 'What if I do not like the design?', answer: 'That is exactly why the first homepage is free. If it is not right, you have lost nothing and owe me nothing.' },
      { question: 'Can you redesign my existing site?', answer: 'Yes, and it is often the quickest win. You already have content and search history; a redesign keeps both and fixes how it looks and converts.' },
    ],
    relatedProjects: ['LIFTR Co', 'Flexi Tours'],
  },
  {
    slug: 'web-development',
    icon: 'code',
    title: 'Web Development | Roland Web Design',
    description:
      'Hand-built, fast-loading websites for South African businesses. Responsive on every screen, built to be found on Google.',
    heading: 'Websites built',
    headingAccent: 'by hand, built to last.',
    intro:
      'Design is half of it. The other half is a site that loads quickly on a patchy mobile connection, works on every screen, and does not fall apart the first time you need something changed. I write the code myself rather than stacking plugins on top of each other.',
    problem: {
      title: 'Slow sites lose customers before they load',
      body: 'A page that takes five seconds on a phone loses a large share of its visitors before they see anything. Most of the weight comes from page builders and plugins doing work your site never needed. Hand-built pages carry only what they use, which is why they load in under a second and keep working when the signal is poor.',
    },
    includes: [
      { title: 'Fast by default', text: 'Compressed images, minimal scripts, and nothing loaded that the page does not need.' },
      { title: 'Works on every screen', text: 'Tested from small phones up to large desktops, not just the one I happen to be using.' },
      { title: 'Search ready from day one', text: 'Proper page titles, descriptions, structured data and a sitemap, so Google can read it correctly.' },
      { title: 'Accessible', text: 'Real contrast, keyboard navigation and screen-reader labels. It is the right thing to do and it also helps your ranking.' },
      { title: 'Content you can change', text: 'Where it makes sense, the parts you update often are separated from the code so they are easy to edit.' },
      { title: 'Integrations that work', text: 'WhatsApp, booking systems, payment providers, maps, enquiry forms that actually reach your inbox.' },
    ],
    process: [
      { step: '01', title: 'Agree the structure', text: 'Which pages exist, what each one is for, and what a visitor should do on it.' },
      { step: '02', title: 'Build', text: 'I build the pages, wire up the forms and integrations, and test on real devices.' },
      { step: '03', title: 'Review', text: 'You get a private link to click through everything and tell me what needs changing.' },
      { step: '04', title: 'Launch and hand over', text: 'Live on your domain with hosting, backups and a walkthrough of anything you will manage yourself.' },
    ],
    goodFor: [
      'Businesses whose current site is slow or breaks on mobile',
      'Anyone paying monthly for a page builder they never use',
      'Sites that need booking, quoting or payment built in',
      'Companies with a lot of content to organise properly',
    ],
    faqs: [
      { question: 'What do you build websites with?', answer: 'Modern, standards-based web technology rather than a drag-and-drop builder. The result is a site that loads fast, scores well on Google, and is not locked into a monthly platform fee.' },
      { question: 'Will I be able to edit it myself?', answer: 'Most clients prefer to message me their changes and have it done the same day. If you would rather edit it yourself, we can add a simple editor for the parts that change often.' },
      { question: 'How long does a build take?', answer: 'Most small business sites are live within one to two weeks of approving the design, depending on how quickly the content comes together.' },
      { question: 'Do I need to buy hosting?', answer: 'I can arrange hosting and your domain, or work with what you already have. Either way you own both.' },
    ],
    relatedProjects: ['LIFTR Co', 'JPM Plumbing & Electrical'],
  },
  {
    slug: 'mobile-apps',
    icon: 'deviceMobile',
    title: 'Mobile App Development | Roland Web Design',
    description:
      'iOS and Android app design and development for South African businesses. From a simple booking app to a tool your whole team runs on.',
    heading: 'Mobile apps that',
    headingAccent: 'people actually open twice.',
    intro:
      'An app is worth building when it does something a website cannot: work offline, send a notification, live on the home screen, or use the camera and location. If your idea does not need those, I will tell you so and build you a web app instead for a fraction of the cost.',
    problem: {
      title: 'Most business apps get installed once and deleted',
      body: 'Usually because they were built as a shrunken version of a website, with nothing in them worth returning for. An app earns its place when it removes a step from someone\'s day: a technician logging a job on site without signal, a customer rebooking in two taps, a manager seeing today\'s numbers without opening a laptop.',
    },
    includes: [
      { title: 'iOS and Android from one build', text: 'One codebase for both platforms, which keeps the cost and the ongoing maintenance down.' },
      { title: 'Works without signal', text: 'Where it matters, the app keeps working offline and syncs when the connection comes back.' },
      { title: 'Push notifications', text: 'Reach people on their home screen without paying for messages or hoping an email is opened.' },
      { title: 'App Store and Play Store setup', text: 'Listings, screenshots, descriptions and the submission process handled.' },
      { title: 'Designed before it is built', text: 'You see and click through the screens before a line of code is written.' },
      { title: 'A plan for version two', text: 'Apps are never finished. I build the first version to be added to, not replaced.' },
    ],
    process: [
      { step: '01', title: 'Work out if you need one', text: 'An honest conversation about whether an app is right, or whether a website does the job cheaper.' },
      { step: '02', title: 'Design the screens', text: 'Clickable screens you can try on your own phone before anything is built.' },
      { step: '03', title: 'Build and test', text: 'Built in stages, with a test version on your phone throughout so there are no surprises.' },
      { step: '04', title: 'Publish', text: 'Submitted to the App Store and Play Store, through review, and live.' },
    ],
    goodFor: [
      'Teams working on site, often without signal',
      'Businesses with repeat customers who book regularly',
      'Anyone running operations on WhatsApp and spreadsheets',
      'Products that need the camera, GPS or notifications',
    ],
    faqs: [
      { question: 'How much does an app cost?', answer: 'Considerably more than a website, because there is more to build and two app stores to satisfy. We scope it properly first so you get a fixed number rather than an open meter.' },
      { question: 'Do I really need an app?', answer: 'Often not, and I will say so. If your idea works as a website that people can add to their home screen, that is faster and cheaper to build and needs no app store approval.' },
      { question: 'Can you update my existing app?', answer: 'Depending on how it was built, usually yes. Send me the details and I will tell you honestly whether it is better to extend or rebuild.' },
      { question: 'Who owns the app?', answer: 'You do. The code, the store listings and the accounts are yours.' },
    ],
    relatedProjects: ['LIFTR Co'],
  },
  {
    slug: 'custom-software',
    icon: 'stack',
    title: 'Custom Software Development | Roland Web Design',
    description:
      'Custom business software built around how you actually work: dashboards, booking and quoting systems, and tools off-the-shelf software gets wrong.',
    heading: 'Software shaped',
    headingAccent: 'around how you work.',
    intro:
      'Every business ends up with a spreadsheet that three people are scared to touch, or a process that only works because someone remembers all the steps. Custom software turns that into something reliable, without forcing you to change how you work to suit a product built for someone else.',
    problem: {
      title: 'Off-the-shelf software makes you work its way',
      body: 'You pay monthly for features you never use, while the one thing your business actually depends on is missing or awkward. So the real work happens in a spreadsheet alongside it, and now you have two versions of the truth. Software built for you does the opposite: it covers your process exactly, and nothing else.',
    },
    includes: [
      { title: 'Dashboards that answer real questions', text: 'Today\'s jobs, this month\'s revenue, what is overdue, who is where. The numbers you actually check.' },
      { title: 'Quoting and booking systems', text: 'Consistent quotes, trackable bookings, and nothing lost between a phone call and a diary.' },
      { title: 'Connecting what you already use', text: 'Your accounting package, your calendar, WhatsApp, your website enquiries, talking to each other.' },
      { title: 'Automating the repetitive bits', text: 'The reports someone rebuilds every Monday morning, or the follow-up nobody remembers to send.' },
      { title: 'Access levels', text: 'Staff see what they need to, you see everything, and the sensitive parts stay closed.' },
      { title: 'Your data stays yours', text: 'Exportable, readable and under your control. No hostage situations.' },
    ],
    process: [
      { step: '01', title: 'Watch how it works now', text: 'I learn your current process properly, including the workarounds, because those are usually the requirements.' },
      { step: '02', title: 'Scope the first version', text: 'The smallest thing that genuinely helps, delivered fast, rather than a twelve-month project.' },
      { step: '03', title: 'Build in stages', text: 'You use it while it is being built and shape it as it goes.' },
      { step: '04', title: 'Roll out and support', text: 'Training for the team, and I stay available for the changes that always surface in the first month.' },
    ],
    goodFor: [
      'Businesses running on spreadsheets that have outgrown them',
      'Teams re-entering the same information in two places',
      'Anyone paying for software that only half fits',
      'Companies whose process is their advantage and should not be changed to suit a product',
    ],
    faqs: [
      { question: 'Is custom software not expensive?', answer: 'It costs more upfront than a monthly subscription and less over several years, particularly once you count the time people spend working around software that does not fit. We start with the smallest useful version so you see value early.' },
      { question: 'What if my requirements change?', answer: 'They will. That is the main advantage of building it yourself rather than renting it: when your process changes, the software changes with it.' },
      { question: 'Where does my data live?', answer: 'Somewhere you control, and exportable at any time. You are never locked in.' },
      { question: 'Can you work with the systems we already have?', answer: 'Usually yes. Most accounting and scheduling packages can be connected, so new software adds to what you have rather than replacing all of it.' },
    ],
    relatedProjects: ['LIFTR Co', 'Flexi Tours'],
  },
  {
    slug: 'ecommerce',
    icon: 'shoppingBag',
    title: 'E-commerce Website Development | Roland Web Design',
    description:
      'Online stores for South African businesses. Easy for customers to shop, easy for you to manage, with local payment and delivery built in.',
    heading: 'Online stores',
    headingAccent: 'built to sell.',
    intro:
      'An online store lives or dies on the boring details: how fast the product pages load, how few steps there are to check out, and how easy it is for you to add stock on a Tuesday evening. I build stores that get those right rather than ones that merely look good in a screenshot.',
    problem: {
      title: 'Most abandoned carts are the shop\'s fault',
      body: 'People leave because the checkout asked them to create an account, or delivery cost appeared only at the final step, or the page took too long on a phone. Each of those is fixable. Removing steps between wanting something and paying for it is most of the work in building a store that sells.',
    },
    includes: [
      { title: 'Product pages that sell', text: 'Proper photos, clear pricing, stock status, and the answers to the questions that stop people buying.' },
      { title: 'A checkout with no dead ends', text: 'Guest checkout, delivery costs shown early, and as few fields as the sale needs.' },
      { title: 'South African payments', text: 'PayFast, Yoco, Ozow, card and EFT. The methods your customers already trust.' },
      { title: 'Delivery that makes sense', text: 'Courier rates, collection options and tracking, set up for how you actually ship.' },
      { title: 'A back office you will use', text: 'Adding a product should take two minutes, not a training course.' },
      { title: 'Built for Google Shopping', text: 'Structured product data so your items can appear in search and shopping results.' },
    ],
    process: [
      { step: '01', title: 'Map the catalogue', text: 'Products, variants, pricing rules and how customers will browse them.' },
      { step: '02', title: 'Design the shop', text: 'Home, category, product and checkout, designed around the path to a sale.' },
      { step: '03', title: 'Build and connect', text: 'Payments, delivery and stock wired up and tested with real test transactions.' },
      { step: '04', title: 'Launch and watch', text: 'Live, with analytics so we can see where people drop off and fix it.' },
    ],
    goodFor: [
      'Shops selling on WhatsApp and Instagram who have outgrown it',
      'Businesses with a physical store adding online sales',
      'Anyone paying commission on a marketplace they do not control',
      'Hire and equipment companies taking deposits online',
    ],
    faqs: [
      { question: 'Which payment providers can you set up?', answer: 'The ones South Africans actually use: PayFast, Yoco, Ozow, card and EFT. We pick based on your fees and what your customers expect.' },
      { question: 'Can I manage stock myself?', answer: 'Yes. Adding products, changing prices and marking items out of stock are all things you will do yourself, and I will show you how.' },
      { question: 'What does an online store cost to run?', answer: 'Hosting, a payment provider fee per transaction, and your domain. I will give you the real monthly figure upfront so there are no surprises.' },
      { question: 'Can you move my existing store?', answer: 'Usually yes, including products, customers and order history, depending on the platform you are on now.' },
    ],
    relatedProjects: ['Flexi Hire', 'LIFTR Co'],
  },
  {
    slug: 'seo',
    icon: 'chartLineUp',
    title: 'SEO & Website Performance | Roland Web Design',
    description:
      'Technical SEO, speed tuning and Google Business Profile setup for South African businesses, so the right customers find you.',
    heading: 'Get found by people',
    headingAccent: 'already looking for you.',
    intro:
      'Someone in your area is searching for what you do right now. Whether they find you or the company down the road comes down to a handful of unglamorous things: how fast your site loads, whether Google can read it properly, and whether your business details are consistent everywhere they appear.',
    problem: {
      title: 'Ranking is not a trick, it is maintenance',
      body: 'Nobody can guarantee you the top spot, and anyone who does is selling something. What actually works is the slow, dull version: a fast site Google can read, a verified Business Profile, genuine reviews, and a page for each thing you want to be found for. Done consistently, it compounds.',
    },
    includes: [
      { title: 'A technical audit in plain English', text: 'What is holding the site back, what it costs you, and what to fix first. No jargon, no 60-page PDF.' },
      { title: 'Speed tuning', text: 'Image compression, fewer scripts, and the Core Web Vitals scores Google measures you on.' },
      { title: 'Pages that can rank', text: 'A page for each service and each area, so you are not asking one homepage to rank for twenty things at once.' },
      { title: 'Google Business Profile', text: 'Set up or cleaned up properly: categories, services, photos, hours and service areas.' },
      { title: 'Structured data', text: 'The hidden markup that lets Google show your reviews, services and opening hours directly in results.' },
      { title: 'Search Console, read for you', text: 'I set it up and translate what it is telling you into things worth doing.' },
    ],
    process: [
      { step: '01', title: 'Audit', text: 'Where you stand now, what people are actually searching, and who you are competing with.' },
      { step: '02', title: 'Fix the foundations', text: 'Speed, structure, titles, descriptions and the technical issues blocking you.' },
      { step: '03', title: 'Build out the pages', text: 'A page for each service and location worth ranking for, written properly.' },
      { step: '04', title: 'Measure', text: 'Monthly, in plain language: what moved, what did not, what is next.' },
    ],
    goodFor: [
      'Businesses invisible for searches they should own',
      'Sites that are slow on mobile',
      'Anyone whose competitors appear on Google Maps and they do not',
      'Companies who have been sold SEO before and saw nothing for it',
    ],
    faqs: [
      { question: 'How long before I see results?', answer: 'Two to three months for local searches, longer for competitive national terms. Anyone promising first page in two weeks is either lying or about to do something that gets you penalised.' },
      { question: 'Can you guarantee a number one ranking?', answer: 'No, and neither can anyone else. Google does not sell positions in its organic results. What I can do is fix the things known to matter and show you the movement honestly.' },
      { question: 'Do I need to pay monthly?', answer: 'Not necessarily. Much of the value is in one-off fixes to the site itself. Ongoing work makes sense when you are actively competing for traffic.' },
      { question: 'What is a Google Business Profile?', answer: 'The listing that shows your business on Google Maps and in local results, with your hours, photos and reviews. For a local business it is often worth more than the website itself, and it is free.' },
    ],
    relatedProjects: ['Flexi Tours', 'Drip Dry Plumbing'],
  },
]

// ── Case studies ─────────────────────────────────────────────────────────
// One page per client project. These are the pages with a real chance of
// ranking for niche searches like "crane hire website".
export type CaseStudy = {
  slug: string
  /** Must match a `title` in `projects` in content.ts, so the screenshot and links are reused. */
  project: string
  /**
   * 'client' = a paid, live project. 'concept' = a redesign Roland designed and
   * built unprompted to pitch the business. Concept pages say so plainly, and
   * their titles target the industry rather than the company name so they don't
   * compete with the real business for its own name.
   */
  status: 'client' | 'concept'
  title: string
  description: string
  heading: string
  headingAccent: string
  intro: string
  client: { label: string; value: string }[]
  brief: string
  built: { title: string; text: string }[]
  decisions: { title: string; text: string }[]
  outcome: string
  faqs: FaqItem[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'safari-travel-website',
    project: 'Flexi Travel & Safari',
    status: 'client',
    title: 'Safari Website Design Case Study | Flexi Travel & Safari',
    description:
      'How I designed and built flexitravelandsafari.com: African safaris sold to Europe and America, European holidays sold to Southern Africa, and a payment plan built into the site.',
    heading: 'One brand,',
    headingAccent: 'two opposite markets.',
    intro:
      'Flexi Travel & Safari sells African safaris to travellers in Europe and America, and European holidays to travellers in South Africa, Botswana and Namibia. Two audiences who share almost nothing: different continents, different currencies, different reasons to book and different fears about doing it.',
    client: [
      { label: 'Client', value: 'Flexi Travel & Safari' },
      { label: 'Industry', value: 'Safari and international travel' },
      { label: 'Markets', value: 'Europe, America, Southern Africa' },
      { label: 'Scope', value: 'Design, build, SEO, launch' },
    ],
    brief:
      'Most travel sites address one kind of traveller. This one had to address two who want opposite things, without either feeling they had landed somewhere meant for someone else. A visitor in Madrid looking at safaris and a visitor in Johannesburg saving for Spain needed to find their half within seconds of arriving.',
    built: [
      { title: 'Two front doors, one homepage', text: 'The site splits at the top into African Safaris and European Adventures, each labelled with who it is for. Nobody has to work out which half is theirs.' },
      { title: 'Prices in the right currency', text: 'Safaris quoted in euros for the European market, European trips in rand for the Southern African one. Asking somebody to convert is asking them to leave.' },
      { title: 'A payment plan built into the product', text: 'European holidays can be paid monthly over up to twelve months before departure. That is the reason this business wins bookings, so it gets its own page and sits in every itinerary card.' },
      { title: 'Signature itineraries with real detail', text: 'Duration, nights, countries and a from-price on every card, because travellers compare before they enquire and hidden pricing loses them.' },
      { title: 'The founder\u2019s story told properly', text: 'She grew up in Hwange, Zimbabwe, where elephants wandered out of the reserve into her uncles\u2019 fields, and now lives in Spain. That story is the entire differentiator against a booking site, so it gets room.' },
      { title: 'Travel guides for search', text: 'Content aimed at people researching a destination months before they are ready to book, bringing them in early.' },
    ],
    decisions: [
      { title: 'Split the audience, not the brand', text: 'Two separate sites would have halved the credibility and doubled the upkeep. One brand with two clear routes keeps the story whole and the admin sane.' },
      { title: 'Lead with feeling, follow immediately with facts', text: 'Full-bleed photography to carry the idea, then days, nights, countries and price directly underneath. Travel is decided emotionally and justified practically.' },
      { title: 'Make the payment plan a headline, not small print', text: 'For a South African paying for Europe, spreading the cost over twelve months is the deciding factor. Burying it in terms would have wasted the best argument on the site.' },
      { title: 'Segment the safaris by who is travelling', text: 'Couples, families, women travelling together and the well-travelled each want a different trip. Sorting by traveller rather than by country matches how people actually choose.' },
    ],
    outcome:
      'A single site that serves two continents without compromise: a European visitor finds safaris priced in euros, a South African visitor finds Europe priced in rand and payable monthly, and both meet the same founder\u2019s story on the way through.',
    faqs: [
      { question: 'Can one website serve two completely different markets?', answer: 'Yes, if the split happens immediately and each route is complete on its own. The mistake is blending both audiences into one homepage, which leaves neither convinced. This site splits at the top and keeps currency, pricing and tone consistent within each half.' },
      { question: 'Do you build websites for safari and tour operators?', answer: 'Yes, it is the sector I have done the most work in. Flexi Travel & Safari and Flexi Tours are both live client sites, and there are several concept redesigns for travel agencies in my portfolio.' },
      { question: 'Can you show prices in more than one currency?', answer: 'Yes. On this site safaris are quoted in euros for the European and American market and European trips in rand for Southern Africa, because asking someone to do the conversion themselves costs you enquiries.' },
      { question: 'Can a website handle payment plans or deposits?', answer: 'Yes. This one presents a twelve-month payment schedule as part of the product, with dates agreed upfront. Full online payment handling can be added where the business needs it.' },
    ],
  },
  {
    slug: 'liftr-co',
    project: 'LIFTR Co',
    status: 'client',
    title: 'Crane Hire Website Case Study | LIFTR Co',
    description:
      'How I designed and built the website for LIFTR Co, a nationwide crane hire and lifting company: service pages, a lift gallery, plant sales and WhatsApp quoting.',
    heading: 'A crane hire site',
    headingAccent: 'built for site managers.',
    intro:
      'LIFTR Co hire out mobile and spider cranes across South Africa, run glass and steel installations, and sell plant and access equipment. One business, several very different things to explain, and an enquiry process that had to work from a building site on a phone.',
    client: [
      { label: 'Client', value: 'LIFTR Co Pty Ltd' },
      { label: 'Industry', value: 'Crane hire and lifting' },
      { label: 'Based', value: 'Cape Town, serving all of South Africa' },
      { label: 'Scope', value: 'Design, build, SEO, launch' },
    ],
    brief:
      'The people who hire cranes are site managers, project managers and contractors, usually standing somewhere muddy with one hand free. They need to know within seconds whether you have the right machine, whether you can get it onto their site, and how fast they can get a price. Anything that makes them think is a reason to call the next company instead.',
    built: [
      { title: 'A page per machine type', text: 'Mobile cranes, spider cranes, crane trucks, cherry pickers and scissor lifts each get their own explanation, with capacities and reach stated plainly rather than buried in a brochure.' },
      { title: 'A gallery of completed lifts', text: 'Over a hundred photos and clips of real jobs. In this industry the proof that you have done it before is the entire sales pitch.' },
      { title: 'Plant and equipment for sale', text: 'A second business line with its own listings, specifications and enquiry route, kept separate from hire so neither confuses the other.' },
      { title: 'WhatsApp on every page', text: 'The fastest way to quote a lift is photos of the site. A WhatsApp button on every page turns that into a thirty-second exchange.' },
      { title: 'Built for search', text: 'Separate pages for each service and machine type, so searches like "spider crane hire" land on the page about spider cranes rather than a homepage.' },
    ],
    decisions: [
      { title: 'Lead with the machine, not the company', text: 'Nobody searching for a crane cares about the company history. The homepage opens with what can be hired and how big it is.' },
      { title: 'Photos over illustrations', text: 'Their own equipment on their own jobs, throughout. Stock photography in an industrial sector reads as a company with nothing to show.' },
      { title: 'Four ways to get a quote', text: 'Call, WhatsApp, site check and enquiry form, because different customers reach for different ones and losing an enquiry over a missing option is expensive.' },
    ],
    outcome:
      'LIFTR Co now have a site that explains a complicated hire fleet in a way a contractor can scan in under a minute, with the proof of past jobs doing the convincing and WhatsApp doing the quoting.',
    faqs: [
      { question: 'Do you build websites for plant and equipment hire companies?', answer: 'Yes. Hire businesses have specific needs: a catalogue of machines with real specifications, proof of past jobs, and a quoting route that works from a site rather than an office. LIFTR Co is a working example.' },
      { question: 'Can you build a site with a large photo gallery?', answer: 'Yes, and the trick is doing it without making the site slow. Images are compressed and loaded as needed, so a gallery of over a hundred photos still opens quickly on a phone.' },
      { question: 'How long did this project take?', answer: 'Design, build and launch for a site of this size typically runs a few weeks, depending on how quickly photos and specifications come together.' },
    ],
  },
  {
    slug: 'flexi-tours',
    project: 'Flexi Tours',
    status: 'client',
    title: 'Tour Operator Website Case Study | Flexi Tours Cape Town',
    description:
      'How I redesigned the Flexi Tours website: Cape Town day tours, safaris, packages, airport transfers and travel guides, with WhatsApp booking throughout.',
    heading: 'A tour operator site',
    headingAccent: 'that turns browsing into booking.',
    intro:
      'Flexi Tours run private and shared tours around Cape Town, plus safaris, multi-day packages and airport transfers. Their old site had the tours buried beneath a wall of blog posts, and visitors had to work to find what they could actually book.',
    client: [
      { label: 'Client', value: 'Flexi Tours' },
      { label: 'Industry', value: 'Tour operator and transfers' },
      { label: 'Based', value: 'Cape Town' },
      { label: 'Scope', value: 'Full redesign, build, launch' },
    ],
    brief:
      'Travel buyers compare. Someone planning a Cape Town trip has six tabs open and is deciding on price, what is included, and whether the company looks like it will actually show up at the hotel. The job was to answer all three faster than the other five tabs.',
    built: [
      { title: 'A browsable tour catalogue', text: 'Day tours, shared experiences, safaris and adventures laid out so a visitor can scan what is on offer instead of reading their way to it.' },
      { title: 'Transfer pricing in the open', text: 'Airport and inter-city transfer prices stated rather than hidden behind an enquiry, because the companies that hide pricing lose to the ones that do not.' },
      { title: 'Multi-day packages', text: 'Longer itineraries presented as proper products, with what is included day by day.' },
      { title: 'Travel guides that bring traffic', text: 'Guides on Cape Point, the Winelands, Table Mountain and Chapman\'s Peak, which pull in people searching those places and introduce them to the tours.' },
      { title: 'WhatsApp booking one tap away', text: 'International visitors and local bookers alike reach for WhatsApp. An enquiry is never more than one tap from anywhere on the site.' },
    ],
    decisions: [
      { title: 'Put the product above the content', text: 'The old site opened with blog posts. The new one opens with what you can book, and the guides support that rather than blocking it.' },
      { title: 'Show Cape Town, not icons', text: 'Full-bleed photography of the actual destinations. People book a feeling first and an itinerary second.' },
      { title: 'Plan my trip as the main action', text: 'A single clear action repeated throughout, rather than a scatter of competing buttons.' },
    ],
    outcome:
      'Flexi Tours went live on their own domain with their tours, packages and transfers at the front, guides feeding the top of the funnel, and WhatsApp carrying the enquiries.',
    faqs: [
      { question: 'Do you build websites for tour operators and travel agencies?', answer: 'Yes, and it is the sector I have done the most work in. Flexi Tours is a live client; Sure Penzance Travel, Lara Travel and Travel Delight are concept redesigns in my portfolio.' },
      { question: 'Can you add online booking and payments?', answer: 'Yes. Whether you need full online booking or a WhatsApp enquiry depends on your tours and how you handle availability, and we work that out before building.' },
      { question: 'Will a redesign lose my Google ranking?', answer: 'Not if it is done properly. Existing content and addresses are preserved and redirected, so the history you have built carries over to the new site.' },
    ],
  },
  {
    slug: 'emergency-plumber-website',
    project: 'Drip Dry Plumbing',
    status: 'concept',
    title: 'Plumber Website Design | Concept Case Study',
    description:
      'A concept website design for a family-run plumbing business, built around 24-hour call-outs, one-tap calling and the trust signals that win emergency jobs.',
    heading: 'A plumber\u2019s site',
    headingAccent: 'built for 2am.',
    intro:
      'Nobody browses for a plumber. They search when water is coming through a ceiling, they pick from the first few results, and they call. This concept is designed entirely around that moment: who you are, that you answer at night, and a phone number that is never more than a thumb away.',
    client: [
      { label: 'Business', value: 'Drip Dry Plumbing' },
      { label: 'Industry', value: 'Plumbing' },
      { label: 'Based', value: 'Roodepoort' },
      { label: 'Type', value: 'Concept redesign' },
    ],
    brief:
      'Emergency trades have a particular problem: the customer is stressed, on a phone, and comparing three companies in under a minute. They are not reading your about page. They want to know that you cover their area, that you will actually come out tonight, and that the last person who called you was glad they did.',
    built: [
      { title: 'Call button fixed to the screen', text: 'On a phone the number follows you down the page. In an emergency the gap between deciding and dialling should be zero.' },
      { title: '24-hour call-outs stated at the top', text: 'The single most important fact about an emergency plumber, placed where it cannot be missed rather than halfway down a services list.' },
      { title: 'Services in plain language', text: 'Burst pipes, blocked drains, geysers, leak detection. The words customers actually type, not trade terminology.' },
      { title: 'Reviews doing the reassuring', text: 'Real ratings near the top, because a stranger vouching for you beats anything you can say about yourself.' },
      { title: 'Service areas spelled out', text: 'Which suburbs are covered, so nobody wastes a call and you waste no time on jobs too far out.' },
    ],
    decisions: [
      { title: 'Design for one hand and one thumb', text: 'Every important action sits in the lower half of the screen, where a thumb reaches without shifting grip.' },
      { title: 'Trust before selling', text: 'Years in business, number of jobs, Google rating, all above the fold. In a trade where people fear being overcharged, proof comes first.' },
      { title: 'No enquiry form on the homepage', text: 'A form is the wrong tool for an emergency. Call and WhatsApp are the actions; the form lives on the contact page for non-urgent work.' },
    ],
    outcome:
      'A concept that turns a plumbing website into what it should be: the shortest possible path between a panicking homeowner and a phone ringing.',
    faqs: [
      { question: 'Do you build websites for plumbers and trades?', answer: 'Yes. Trade websites have a specific job, which is to turn a search into a phone call as fast as possible. This concept and the JPM Plumbing & Electrical one both show that approach.' },
      { question: 'What should a plumber\u2019s website have on it?', answer: 'A phone number that is always visible, your hours and whether you do call-outs, the areas you cover, your services in the words customers use, and reviews. Everything else is secondary.' },
      { question: 'Is this a real client project?', answer: 'No. This is a concept I designed and built to show what the business could have. It was pitched to them rather than commissioned.' },
    ],
  },
  {
    slug: 'plumbing-electrical-website',
    project: 'JPM Plumbing & Electrical',
    status: 'concept',
    title: 'Trade Website with Quote Form | Concept Case Study',
    description:
      'A concept website for a combined plumbing and electrical business: services, before-and-after work, service areas, FAQs and a quote request form.',
    heading: 'Two trades,',
    headingAccent: 'one clear website.',
    intro:
      'A company doing both plumbing and electrical work has a positioning problem. Say too little and you look like a handyman; say too much and nobody knows what you actually specialise in. This concept splits the two cleanly and lets the completed work make the case.',
    client: [
      { label: 'Business', value: 'JPM Plumbing & Electrical' },
      { label: 'Industry', value: 'Plumbing and electrical' },
      { label: 'Based', value: 'Johannesburg' },
      { label: 'Type', value: 'Concept redesign' },
    ],
    brief:
      'Unlike an emergency call-out, much of this work is planned: a rewire, a geyser replacement, a certificate of compliance. The customer has time to compare, which means they will read more and expect to see evidence. The site has to carry proof and make requesting a quote effortless.',
    built: [
      { title: 'Plumbing and electrical kept separate', text: 'Two clear paths from the homepage, so a customer with an electrical problem never has to wade through plumbing services.' },
      { title: 'Before and after projects', text: 'Photographs of finished work. In a trade people cannot assess, showing the standard is the entire argument.' },
      { title: 'A quote form that gets used', text: 'Short, with a photo upload, because a picture of the problem saves two phone calls.' },
      { title: 'Service areas and FAQs', text: 'The two things that generate the most time-wasting phone calls, answered on the page instead.' },
      { title: 'Compliance and certification visible', text: 'For electrical work this is non-negotiable to customers, and most trade sites bury it.' },
    ],
    decisions: [
      { title: 'Lead with completed work, not a stock photo', text: 'A real geyser installation beats a smiling model in overalls every time.' },
      { title: 'Let the FAQ do the filtering', text: 'Answering "do you issue a CoC" and "do you charge a call-out fee" upfront means better calls, not fewer.' },
      { title: 'One form, reachable from everywhere', text: 'Rather than scattering different enquiry routes, every call to action points at the same quote request.' },
    ],
    outcome:
      'A concept showing how a two-trade business can look specialised in both, with finished work carrying the credibility and a quote request always one click away.',
    faqs: [
      { question: 'Can a website cover two different trades without looking confused?', answer: 'Yes, if the two are separated from the homepage onwards rather than merged into one services list. This concept shows that structure.' },
      { question: 'Should a trade website have a quote form or just a phone number?', answer: 'Both, used for different things. Emergencies need a phone number; planned work suits a form, particularly one that lets someone attach a photo of the problem.' },
      { question: 'Is this a real client project?', answer: 'No. This is a concept I designed and built to pitch to the business rather than a commissioned job.' },
    ],
  },
  {
    slug: 'travel-agency-website',
    project: 'Sure Penzance Travel',
    status: 'concept',
    title: 'Travel Agency Website Design | Concept Case Study',
    description:
      'A concept website design for an established travel agency: a full-screen destination slideshow, hand-picked holiday specials and corporate travel services.',
    heading: 'A travel agency site',
    headingAccent: 'that sells the destination.',
    intro:
      'Travel agencies compete with booking sites that have endless budgets and no personality. What an agency has instead is judgement: somebody who has been there, knows which hotel is worth it, and will answer the phone when a flight is cancelled. This concept puts that front and centre.',
    client: [
      { label: 'Business', value: 'Sure Penzance Travel' },
      { label: 'Industry', value: 'Travel agency' },
      { label: 'Based', value: 'Alberton' },
      { label: 'Type', value: 'Concept redesign' },
    ],
    brief:
      'An established agency with a long client list and a website that did not reflect it. The job was to make it look like a place that plans serious trips, while keeping the specials, which are what actually drive enquiries, easy to find and easy to act on.',
    built: [
      { title: 'A full-screen destination slideshow', text: 'Travel is sold on feeling first. Large photography of real destinations opens the site rather than a form.' },
      { title: 'Hand-picked holiday specials', text: 'Current deals as proper cards with price and dates, because this is what returning visitors come back to check.' },
      { title: 'Corporate travel given its own route', text: 'Business travel buyers have nothing in common with someone booking a honeymoon, so they get their own path.' },
      { title: 'A human face on the agency', text: 'Who you will be dealing with, which is the one thing a booking site can never offer.' },
      { title: 'Enquiry rather than checkout', text: 'The sale happens in conversation, so every card leads to a short enquiry rather than a cart.' },
    ],
    decisions: [
      { title: 'Photography over interface', text: 'Big images, minimal chrome. An agency site competing on warmth should not look like a flight comparison tool.' },
      { title: 'Specials above the fold on return visits', text: 'The deals are the hook, so they sit high rather than behind a menu.' },
      { title: 'Leisure and corporate split early', text: 'Two audiences, two journeys, decided on the homepage.' },
    ],
    outcome:
      'A concept that gives an established agency a site matching its experience, leading with destinations and letting the specials do the converting.',
    faqs: [
      { question: 'Do you build websites for travel agencies?', answer: 'It is the sector I have done the most work in. Flexi Tours is a live client; this, Lara Travel and Travel Delight are concept redesigns showing different angles on the same industry.' },
      { question: 'What makes a travel website convert?', answer: 'Strong photography, current specials that are easy to find, pricing that is not hidden, and a short enquiry route. Travel buyers compare across tabs, so anything that slows them down loses them.' },
      { question: 'Is this a real client project?', answer: 'No. This is a concept redesign I built to pitch to the agency, not a commissioned project.' },
    ],
  },
  {
    slug: 'corporate-travel-website',
    project: 'Lara Travel',
    status: 'concept',
    title: 'Corporate Travel Website Design | Concept Case Study',
    description:
      'A concept website for a travel agency covering corporate, group and leisure travel, with destination guides, team profiles and Google reviews.',
    heading: 'Corporate travel,',
    headingAccent: 'without the brochure feel.',
    intro:
      'Corporate travel is bought on reliability, not romance. A procurement manager booking flights for twelve staff wants to know you will handle a 3am change without drama. This concept is built for that buyer while still serving the leisure side of the business.',
    client: [
      { label: 'Business', value: 'Lara Travel' },
      { label: 'Industry', value: 'Corporate, group and leisure travel' },
      { label: 'Based', value: 'Johannesburg' },
      { label: 'Type', value: 'Concept redesign' },
    ],
    brief:
      'Three audiences through one front door: companies booking business travel, groups organising a trip together, and individuals planning a holiday. Each wants something different, and a single homepage trying to please all three ends up convincing none of them.',
    built: [
      { title: 'Three clear routes from the homepage', text: 'Corporate, group and leisure, chosen in the first few seconds rather than guessed at.' },
      { title: 'Destination guides', text: 'Useful content that brings in search traffic from people researching a trip before they are ready to book.' },
      { title: 'Team profiles', text: 'Named consultants with photographs. Corporate buyers want to know who picks up the phone.' },
      { title: 'Google reviews on the page', text: 'Pulled through rather than retyped, so they stay current and are visibly genuine.' },
      { title: 'A corporate enquiry built for procurement', text: 'Different questions, different tone, different expectations from a holiday enquiry.' },
    ],
    decisions: [
      { title: 'Confidence over wanderlust', text: 'Restrained design and clear structure. Corporate buyers read sunset photography as a consumer brand, which costs credibility.' },
      { title: 'Guides as the top of the funnel', text: 'Most people search a destination long before they search an agency. The guides catch them early.' },
      { title: 'Show the people', text: 'The whole argument for an agency over a booking site is that a person handles it. So show the people.' },
    ],
    outcome:
      'A concept that serves a corporate buyer and a holiday booker from the same site without diluting either, with guides pulling in traffic and real reviews closing the gap.',
    faqs: [
      { question: 'How is a corporate travel website different from a leisure one?', answer: 'The buyer is different. Corporate wants reliability, named contacts, clear process and fast response. Leisure wants inspiration and price. Trying to do both with the same page tends to fail at both.' },
      { question: 'Can you pull live Google reviews onto a website?', answer: 'Yes. Showing them live rather than retyping keeps them current, and visitors can tell the difference.' },
      { question: 'Is this a real client project?', answer: 'No. This is a concept redesign built to pitch to the agency rather than a commissioned job.' },
    ],
  },
  {
    slug: 'group-travel-website',
    project: 'Travel Delight',
    status: 'concept',
    title: 'Group Travel Website Design | Concept Case Study',
    description:
      'A concept website for a group travel specialist planning choir, school and family tours, with featured journeys, a destinations map and trip galleries.',
    heading: 'Group tours,',
    headingAccent: 'sold to the organiser.',
    intro:
      'Group travel has an unusual customer: one person organising a trip for thirty others, who will be blamed personally if it goes wrong. They are not buying a holiday, they are buying the confidence to stand up in front of a committee and recommend you.',
    client: [
      { label: 'Business', value: 'Travel Delight' },
      { label: 'Industry', value: 'Group and educational travel' },
      { label: 'Based', value: 'Johannesburg' },
      { label: 'Type', value: 'Concept redesign' },
    ],
    brief:
      'Choir tours, school trips and extended family travel all run on the same anxiety: a lot of people, a lot of money, one organiser carrying the risk. The site has to show previous groups coming home happy, and make the first conversation easy to start.',
    built: [
      { title: 'Featured journeys as full itineraries', text: 'Day by day, with what is included, because an organiser has to present this to other people.' },
      { title: 'A destinations map', text: 'Where they have taken groups before, shown geographically. It communicates range faster than a list.' },
      { title: 'Galleries from previous trips', text: 'Real groups on real tours. For an organiser weighing up the risk, this is the strongest evidence available.' },
      { title: 'Built around group types', text: 'Choirs, schools and families each have different concerns, so each gets its own path.' },
      { title: 'An enquiry suited to planning', text: 'Group size, rough dates and purpose, which is what actually starts a useful conversation.' },
    ],
    decisions: [
      { title: 'Cinematic, but with substance underneath', text: 'Big imagery to carry the feeling, immediately followed by detail the organiser needs to justify the choice.' },
      { title: 'Lead with past groups, not destinations', text: 'The destination is rarely the question. Whether you can look after thirty people is.' },
      { title: 'No pricing, deliberately', text: 'Group pricing depends on numbers and dates. Showing a figure that cannot hold creates a worse conversation than none.' },
    ],
    outcome:
      'A concept aimed squarely at the person organising the trip, with previous groups providing the reassurance and itineraries detailed enough to forward to a committee.',
    faqs: [
      { question: 'Do you build websites for group and educational travel?', answer: 'Yes. Group travel has a distinct buyer, the organiser, and sites that address them directly work far better than ones written for an individual traveller.' },
      { question: 'Should a travel website show prices?', answer: 'For fixed products, yes. For group travel, where price depends on numbers and dates, a figure that cannot be honoured usually causes more problems than it solves.' },
      { question: 'Is this a real client project?', answer: 'No. This is a concept redesign I built to pitch to the business rather than a commissioned project.' },
    ],
  },
  {
    slug: 'event-hire-website',
    project: 'Flexi Hire',
    status: 'concept',
    title: 'Event & Tent Hire Website Design | Concept Case Study',
    description:
      'A concept website for a tent and event furniture hire company: hire catalogue, ready-made seating packages and quick WhatsApp quotes.',
    heading: 'An event hire site',
    headingAccent: 'that quotes in a tap.',
    intro:
      'Someone planning a wedding or a function is juggling a venue, caterers, furniture and a budget that keeps moving. They are getting quotes from four hire companies at once. The one that answers fastest, with the clearest pricing, usually wins the job.',
    client: [
      { label: 'Business', value: 'Flexi Hire' },
      { label: 'Industry', value: 'Tent and event furniture hire' },
      { label: 'Based', value: 'Centurion' },
      { label: 'Type', value: 'Concept redesign' },
    ],
    brief:
      'Hire businesses lose work to slow quoting. The customer has a date, a headcount and a budget, and wants a number. Anything that makes them wait or fill in a long form sends them to a competitor who replied in ten minutes.',
    built: [
      { title: 'A browsable hire catalogue', text: 'Tents, tables, chairs, linen and decor with photographs and capacities, so people can see what they are getting.' },
      { title: 'Ready-made packages', text: 'Seating for 50, 100 or 200 priced as a bundle. Most customers do not know what they need item by item.' },
      { title: 'WhatsApp quoting', text: 'A tap sends an enquiry with the items already attached, turning a quote into a short conversation.' },
      { title: 'Availability made plain', text: 'Hire is a date business. Asking for the date first avoids quoting on stock that is already out.' },
      { title: 'Real events as the gallery', text: 'Set-ups at actual functions, which shows scale far better than a product photo on white.' },
    ],
    decisions: [
      { title: 'Packages before individual items', text: 'A customer planning their first event wants a starting point, not a parts list.' },
      { title: 'Prices where possible', text: 'Even indicative pricing filters out the wrong enquiries and builds trust with the right ones.' },
      { title: 'WhatsApp over a quote form', text: 'Hire enquiries involve back and forth about dates and numbers. A chat suits that; an email thread does not.' },
    ],
    outcome:
      'A concept built around the thing that decides hire jobs: how quickly and clearly you can turn a date and a headcount into a number.',
    faqs: [
      { question: 'Do you build websites for hire companies?', answer: 'Yes. Hire businesses need a catalogue with real specifications, package options, and a fast quoting route. This concept and the LIFTR Co crane hire project both show that.' },
      { question: 'Should a hire company show prices online?', answer: 'Where possible, yes, at least as a starting range. Hidden pricing costs you the customers who were comparing, and they are most of them.' },
      { question: 'Is this a real client project?', answer: 'No. This is a concept I designed and built to pitch to the business, not a commissioned job.' },
    ],
  },
]
