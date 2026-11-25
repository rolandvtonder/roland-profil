// Square cards carrying a client's own words, for social.
//
// A review converts better than a portfolio shot, because it is someone else
// saying it. Quotes are reproduced exactly as written -- the same promise
// /reviews/ makes on the site -- so the lowercase and the odd grammar stay.
//
//   node scripts/make-review-cards.mjs [slug]
//
// Output: social-posts/reviews/<slug>.png  (1080x1080)

import { writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import puppeteer from 'puppeteer-core'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const SIZE = 1080

const C = {
  page: '#060A14',
  lineStrong: 'rgba(141, 181, 255, 0.26)',
  ink: '#F4F7FF',
  inkMuted: '#A9B4CC',
  inkSubtle: '#7D89A3',
  accentBright: '#5B95FF',
  accentSoft: '#8DB5FF',
  star: '#FFC24B',
}

const cards = [
  {
    slug: 'daron-liftr',
    quote: 'Working with Roland on the LIFTR site was an absolute breeze. He is responsive, proactive, and brought great creative and technical ideas to the table that made our site stand out. If you need a reliable web designer who delivers high-quality work on time, Roland is your guy.',
    name: 'Daron Medcalf',
    role: 'Owner, LIFTR Co',
    domain: 'liftrco.co.za',
  },
  {
    slug: 'amanda-bokkoms',
    quote: 'Our brand new website designed by Roland came with very little effort from our side. He made it easy was flexible when I requested access to do some edits myself. Very affordable and it looks so much more professional than my previous dated site. Thank you Roland. Really appreciate your contribution to our small business.',
    name: 'Amanda',
    role: 'Bokkoms Self-Catering, Paternoster',
    domain: 'stayatbokkomsinpaternoster.com',
  },
  {
    slug: 'george-flexi-tours',
    quote: 'Fantastic to work with, very good attention to detail and got the job done better than expected.',
    name: 'George',
    role: 'Manager, Flexi Tours',
    domain: 'flexi-tours.co.za',
  },
  {
    slug: 'greg-karam',
    quote: 'Roland did a great job with my website, also very reasonably priced. highly recommend.',
    name: 'Greg Karam',
    role: 'Karam Motors, Fourways',
    domain: 'karammotors.co.za',
  },
]

const logo = `<svg width="40" height="40" viewBox="6.2 6 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18.6 20.2 22.4 24.6" stroke="${C.accentBright}" stroke-width="3" stroke-linecap="round"/>
  <path d="M11 23.5V8.5h5.25a4.5 4.5 0 0 1 0 9H11" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const star = `<svg width="30" height="30" viewBox="0 0 24 24" fill="${C.star}"><path d="M12 2l2.9 6.3 6.8.8-5 4.7 1.3 6.8L12 17.3 5.9 20.6l1.4-6.8-5-4.7 6.8-.8z"/></svg>`

function html(card) {
  // Long quotes have to come down in size or they overrun the card.
  const n = card.quote.length
  const size = n > 300 ? 40 : n > 200 ? 46 : n > 120 ? 54 : 62
  return `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${SIZE}px; height: ${SIZE}px; overflow: hidden; background: ${C.page};
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif; -webkit-font-smoothing: antialiased;
  }
  .stage { position: relative; width: 100%; height: 100%; padding: 72px; display: flex; flex-direction: column; }
  .glow {
    position: absolute; top: -280px; left: -180px; width: 900px; height: 900px; border-radius: 50%;
    background: radial-gradient(circle, rgba(61,126,255,0.26) 0%, rgba(61,126,255,0.08) 44%, transparent 70%);
  }
  .glow-2 {
    position: absolute; bottom: -320px; right: -220px; width: 760px; height: 760px; border-radius: 50%;
    background: radial-gradient(circle, rgba(61,126,255,0.14) 0%, transparent 66%);
  }
  .top { position: relative; display: flex; align-items: center; justify-content: space-between; }
  .stars { display: flex; gap: 6px; }
  .brand { display: flex; align-items: center; gap: 12px; }
  .brand .name { font-size: 24px; font-weight: 800; letter-spacing: -0.02em; color: ${C.ink}; }

  .quote {
    position: relative; flex: 1; display: flex; align-items: center;
    font-size: ${size}px; font-weight: 600; line-height: 1.32; letter-spacing: -0.02em; color: ${C.ink};
    padding: 48px 0 32px;
  }
  .quote span { display: block; }
  .mark { color: ${C.accentSoft}; }

  .foot { position: relative; border-top: 1px solid ${C.lineStrong}; padding-top: 30px; }
  .name { font-size: 30px; font-weight: 700; color: ${C.ink}; }
  .role { margin-top: 8px; font-size: 24px; font-weight: 500; color: ${C.accentSoft}; }
  .src { margin-top: 6px; font-size: 20px; font-weight: 500; color: ${C.inkSubtle}; }
</style></head>
<body>
  <div class="stage">
    <div class="glow"></div><div class="glow-2"></div>
    <div class="top">
      <div class="stars">${star.repeat(5)}</div>
      <div class="brand">${logo}<span class="name">Roland Web Design</span></div>
    </div>
    <div class="quote"><span><span class="mark">&ldquo;</span>${card.quote}<span class="mark">&rdquo;</span></span></div>
    <div class="foot">
      <div class="name">${card.name}</div>
      <div class="role">${card.role}</div>
      <div class="src">Google review &middot; ${card.domain}</div>
    </div>
  </div>
</body></html>`
}

const only = process.argv[2]
const list = only ? cards.filter((c) => c.slug === only) : cards
if (!list.length) {
  console.error(`no card called "${only}". Try: ${cards.map((c) => c.slug).join(', ')}`)
  process.exit(1)
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.setViewport({ width: SIZE, height: SIZE, deviceScaleFactor: 1 })

const outDir = path.join(root, 'social-posts/reviews')
await mkdir(outDir, { recursive: true })

for (const card of list) {
  await page.setContent(html(card), { waitUntil: 'load', timeout: 60000 })
  await page.evaluate(() => document.fonts.ready)
  if (!await page.evaluate(() => document.fonts.check('800 24px "Plus Jakarta Sans"')))
    throw new Error('Plus Jakarta Sans did not load')

  // Catch a quote that has overrun the card rather than shipping it clipped.
  const overflow = await page.evaluate(() => {
    const q = document.querySelector('.quote')
    return q.scrollHeight - q.clientHeight
  })
  if (overflow > 2) throw new Error(`${card.slug}: quote overflows by ${overflow}px - lower the font size`)

  await writeFile(path.join(outDir, `${card.slug}.png`), await page.screenshot({ type: 'png' }))
  console.log(`  ${card.slug}.png`)
}

await browser.close()
console.log(`\n${list.length} review card(s) in social-posts/reviews/`)
