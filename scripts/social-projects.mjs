// The single list behind every social asset: post cards and scroll Reels.
//
// `image` is repo-relative on purpose. Live client captures live in
// public/work/ because the website uses them; demo captures live in
// social-posts/captures/ because nothing on the site does, and anything under
// public/ gets copied into the deployed build whether it is used or not.
//
// `client: false` draws the quiet outlined Concept tag instead of the filled
// blue Live site one, and its caption has to say so in words too. These are
// real businesses that were pitched and did not buy; none of it may be
// presented as paid work.

/** Live client sites, on their own domains. */
export const clients = [
  { slug: 'karam-motors', title: 'Karam Motors', category: 'Car dealership · Fourways', domain: 'karammotors.co.za', image: 'public/work/karam-motors.webp', client: true },
  { slug: 'bokkoms', title: 'Bokkoms', category: 'Self-catering · Paternoster', domain: 'stayatbokkomsinpaternoster.com', image: 'public/work/bokkoms.webp', client: true },
  { slug: 'liftr-co', title: 'LIFTR Co', category: 'Crane hire · Nationwide', domain: 'liftrco.co.za', image: 'public/work/liftr.webp', client: true },
  { slug: 'flexi-tours', title: 'Flexi Tours', category: 'Tour operator · Cape Town', domain: 'flexi-tours.co.za', image: 'public/work/flexitours.webp', client: true },
  { slug: 'flexi-travel-safari', title: 'Flexi Travel & Safari', category: 'Safari & travel · Spain and SA', domain: 'flexitravelandsafari.com', image: 'public/work/flexi-travel-safari.webp', client: true },
]

/** The six concepts that are also on the website, under /work/. */
export const siteConcepts = [
  { slug: 'drip-dry-plumbing', title: 'Drip Dry Plumbing', category: 'Plumbing · Roodepoort', image: 'public/work/dripdry-plumbing.webp', client: false },
  { slug: 'jpm-plumbing', title: 'JPM Plumbing & Electrical', category: 'Plumbing & electrical · Johannesburg', image: 'public/work/jpm-plumbing.webp', client: false },
  { slug: 'sure-penzance-travel', title: 'Sure Penzance Travel', category: 'Travel agency · Alberton', image: 'public/work/sure-travel.webp', client: false },
  { slug: 'flexi-hire', title: 'Flexi Hire', category: 'Event hire · Centurion', image: 'public/work/flexihire.webp', client: false },
  { slug: 'lara-travel', title: 'Lara Travel', category: 'Travel agency · Johannesburg', image: 'public/work/lara-travel.webp', client: false },
  { slug: 'travel-delight', title: 'Travel Delight', category: 'Group travel · Johannesburg', image: 'public/work/travel-delight.webp', client: false },
]

// Names and places taken from each demo's own <title>, not guessed from the
// repo name. Captured with scripts/capture-site.mjs.
export const demoConcepts = [
  { slug: 'albatross-guesthouse', title: 'Albatross Guesthouse', category: 'Guesthouse · Langebaan', image: 'social-posts/captures/albatross-guesthouse.webp', client: false },
  { slug: 'west-coast-roof-care', title: 'West Coast Roof Care', category: 'Roofing & waterproofing · West Coast', image: 'social-posts/captures/west-coast-roof-care.webp', client: false },
  { slug: 'venue-at-boschkop', title: 'Venue at Boschkop', category: 'Self-catering venue · Pretoria', image: 'social-posts/captures/venue-at-boschkop.webp', client: false },
  { slug: 'titan-plant-hire', title: 'Titan Plant Hire', category: 'Plant hire · Port Elizabeth', image: 'social-posts/captures/titan-plant-hire.webp', client: false },
  { slug: 'the-suit-hire', title: 'The Suit Hire', category: 'Suit & tuxedo hire · Johannesburg South', image: 'social-posts/captures/the-suit-hire.webp', client: false },
  { slug: 'the-duck-pond', title: 'The Duckpond', category: 'Venue & accommodation · Ballito', image: 'social-posts/captures/the-duck-pond.webp', client: false },
  { slug: 'wedding-party-group', title: 'The Wedding Party Group', category: 'Weddings & events · Pretoria', image: 'social-posts/captures/wedding-party-group.webp', client: false },
  { slug: 'tanganyika-hair-salon', title: 'Tanganyika Hair Salon', category: 'Hair salon & barber · Alberton', image: 'social-posts/captures/tanganyika-hair-salon.webp', client: false },
  { slug: 'sharbee-africa-events', title: 'Sharbee Africa', category: 'Events & destination management', image: 'social-posts/captures/sharbee-africa-events.webp', client: false },
  { slug: 'samu-hair-and-beauty', title: "Samu's Hair & Beauty", category: 'Hair & beauty · Rosebank', image: 'social-posts/captures/samu-hair-and-beauty.webp', client: false },
  { slug: 'salon-lauren', title: 'Salon Lauren', category: 'Hair & beauty · Kraaifontein', image: 'social-posts/captures/salon-lauren.webp', client: false },
  { slug: 'salon-chic', title: 'Salon Chic Hair & Nails', category: 'Hair & nails · Goodwood, Cape Town', image: 'social-posts/captures/salon-chic.webp', client: false },
]

/** Clients first: real paid work leads, concepts follow. */
export const all = [...clients, ...siteConcepts, ...demoConcepts]

/** A concept has no live domain to show, so the chrome bar says what it is. */
export function barLabel(p) {
  return p.client ? p.domain : 'concept design'
}

export function pick(list, slug) {
  const out = slug ? list.filter((p) => p.slug === slug) : list
  if (!out.length) throw new Error(`no project called "${slug}". Try one of: ${list.map((p) => p.slug).join(', ')}`)
  return out
}
