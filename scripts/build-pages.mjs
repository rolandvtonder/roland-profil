// Generates one HTML entry and one React entry per sub-page from src/pages.ts.
//
// Each page needs its own real HTML file so Google gets a unique title,
// description, canonical and structured data without having to run JavaScript.
// Run with: npm run pages
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { servicePages, caseStudies } from '../src/pages.ts'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const SITE = 'https://rolandwebdesign.co.za'
const BUSINESS = 'Roland Web Design'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const json = (o) => JSON.stringify(o, null, 2).replace(/</g, '\\u003c')

function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }
}

function breadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(({ name, url }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      ...(url ? { item: `${SITE}${url}` } : {}),
    })),
  }
}

function html({ route, title, description, entry, schemas }) {
  const url = `${SITE}${route}`
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#060A14" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:site_name" content="${BUSINESS}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:locale" content="en_ZA" />
    <meta property="og:image" content="${SITE}/og-image.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
${schemas.map((s) => `    <script type="application/ld+json">\n${json(s).split('\n').map((l) => `      ${l}`).join('\n')}\n    </script>`).join('\n')}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/entries/${entry}.tsx"></script>
  </body>
</html>
`
}

function entryTsx(view, slug) {
  return `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import ${view} from '../pages/${view}'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <${view} slug="${slug}" />
  </StrictMode>,
)
`
}

const written = []

async function write(file, contents) {
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, contents, 'utf8')
  written.push(path.relative(root, file).replace(/\\/g, '/'))
}

// ── Service pages ────────────────────────────────────────────────────────
for (const page of servicePages) {
  const route = `/services/${page.slug}/`
  const entry = `service-${page.slug}`
  const serviceName = `${page.heading} ${page.headingAccent}`.replace(/\.$/, '')
  await write(
    path.join(root, 'services', page.slug, 'index.html'),
    html({
      route,
      title: page.title,
      description: page.description,
      entry,
      schemas: [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: serviceName,
          description: page.description,
          url: `${SITE}${route}`,
          provider: { '@type': 'ProfessionalService', name: BUSINESS, url: `${SITE}/` },
          areaServed: [
            { '@type': 'Country', name: 'South Africa' },
            { '@type': 'Country', name: 'United States' },
          ],
        },
        breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/#services' },
          { name: page.heading.replace(/ that$| built$| shaped$/, ''), url: route },
        ]),
        faqSchema(page.faqs),
      ],
    }),
  )
  await write(path.join(root, 'src', 'entries', `${entry}.tsx`), entryTsx('ServicePageView', page.slug))
}

// ── Case studies ─────────────────────────────────────────────────────────
for (const study of caseStudies) {
  const route = `/work/${study.slug}/`
  const entry = `work-${study.slug}`
  await write(
    path.join(root, 'work', study.slug, 'index.html'),
    html({
      route,
      title: study.title,
      description: study.description,
      entry,
      schemas: [
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: study.title,
          description: study.description,
          url: `${SITE}${route}`,
          image: `${SITE}/og-image.jpg`,
          author: { '@type': 'Person', name: 'Roland van Tonder', url: `${SITE}/` },
          publisher: { '@type': 'Organization', name: BUSINESS, url: `${SITE}/` },
        },
        breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Work', url: '/#work' },
          { name: study.project, url: route },
        ]),
        faqSchema(study.faqs),
      ],
    }),
  )
  await write(path.join(root, 'src', 'entries', `${entry}.tsx`), entryTsx('CaseStudyView', study.slug))
}

// ── Sitemap ──────────────────────────────────────────────────────────────
const today = new Date().toISOString().slice(0, 10)
const urls = [
  { loc: `${SITE}/`, priority: '1.0', changefreq: 'monthly' },
  ...servicePages.map((p) => ({ loc: `${SITE}/services/${p.slug}/`, priority: '0.8', changefreq: 'monthly' })),
  ...caseStudies.map((c) => ({ loc: `${SITE}/work/${c.slug}/`, priority: '0.7', changefreq: 'yearly' })),
]
await write(
  path.join(root, 'public', 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, priority, changefreq }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`,
)

console.log(`generated ${written.length} files:`)
for (const f of written) console.log(`  ${f}`)
console.log(`\nsitemap now lists ${urls.length} URLs`)
