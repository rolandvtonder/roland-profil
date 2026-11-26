// Full-page capture of a site that animates on scroll.
//
// A plain fullPage screenshot renders a scroll-pinned section as thousands of
// pixels of blank -- Karam Motors has a 5044px one. Forcing opacity and
// visibility on every element does not fix it either: on that site it popped
// the mobile menu open and blanked the hero.
//
// So this walks the page a viewport at a time, photographs each stop, drops any
// frame whose largest visible heading repeats the previous kept one (that is a
// pinned section holding still while the scrollbar moves), hides position:fixed
// chrome after the first frame, and stitches the keepers back to back.
//
//   node scripts/capture-site.mjs <url> <out.webp>
//
// House format: 1280 wide. Thumbnails are a separate step.

import puppeteer from 'puppeteer-core'
import { writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'

const [url, out] = process.argv.slice(2)
if (!url || !out) {
  console.error('usage: node scripts/capture-site.mjs <url> <out.webp>')
  process.exit(1)
}

const W = 1280
const H = 900
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  // Kept out of the repo: it is a browser profile, not source.
  userDataDir: path.join(os.tmpdir(), 'rwd-capture-profile'),
  args: ['--hide-scrollbars', '--force-device-scale-factor=1'],
})
const page = await browser.newPage()
await page.setViewport({ width: W, height: H })
await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 })

// A pass down and back up first, so lazy images and scroll-triggered reveals
// have all fired before anything is photographed.
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight * 0.5) {
    window.scrollTo(0, y)
    await new Promise((r) => setTimeout(r, 260))
  }
  window.scrollTo(0, 0)
  await new Promise((r) => setTimeout(r, 1200))
})

// The biggest heading on screen identifies which section we are looking at. A
// pinned section holds its heading across several screens of scrolling, which
// is what tells us a frame is a repeat rather than new content.
const heading = () =>
  page.evaluate(() => {
    let best = null
    let bestSize = 0
    for (const el of document.querySelectorAll('h1,h2,h3')) {
      const r = el.getBoundingClientRect()
      if (r.bottom < 0 || r.top > window.innerHeight || !el.innerText.trim()) continue
      const size = parseFloat(getComputedStyle(el).fontSize)
      if (size > bestSize) {
        bestSize = size
        best = el.innerText.trim()
      }
    }
    return best
  })

const maxScroll = await page.evaluate(() => document.body.scrollHeight - window.innerHeight)
const stops = []
for (let y = 0; y < maxScroll; y += H) stops.push(y)
stops.push(maxScroll)

const frames = []
let lastHeading = Symbol('none')
let lastKeptY = -Infinity

for (const [i, y] of stops.entries()) {
  await page.evaluate((y) => window.scrollTo(0, y), y)
  await new Promise((r) => setTimeout(r, 950))

  if (i === 0) {
    await page.evaluate(() => {
      for (const el of document.querySelectorAll('body *')) {
        if (getComputedStyle(el).position === 'fixed') el.setAttribute('data-hide-after-first', '')
      }
    })
  } else {
    await page.evaluate(() => {
      for (const el of document.querySelectorAll('[data-hide-after-first]'))
        el.style.setProperty('visibility', 'hidden', 'important')
    })
    await new Promise((r) => setTimeout(r, 120))
  }

  const h = await heading()
  // The final stop earns a frame of its own only when the last kept frame
  // stopped short of the bottom, otherwise the footer appears twice.
  const isLast = i === stops.length - 1
  const bottomUnseen = isLast && maxScroll - lastKeptY >= H * 0.6
  if (h !== null && h === lastHeading && !bottomUnseen) continue

  lastHeading = h
  lastKeptY = y
  frames.push(await page.screenshot({ encoding: 'base64', type: 'png' }))
}

// Stacked back to back, so the strip reads as one continuous page rather than
// leaving holes where the repeats were dropped.
const total = frames.length * H
const stitched = await page.evaluate(
  async (frames, W, H, total) => {
    const c = document.createElement('canvas')
    c.width = W
    c.height = total
    const ctx = c.getContext('2d')
    for (const [i, data] of frames.entries()) {
      const img = new Image()
      img.src = 'data:image/png;base64,' + data
      await img.decode()
      ctx.drawImage(img, 0, i * H)
    }
    return c.toDataURL('image/webp', 0.82)
  },
  frames,
  W,
  H,
  total,
)

await mkdir(path.dirname(out), { recursive: true })
await writeFile(out, Buffer.from(stitched.split(',')[1], 'base64'))
console.log(`  ${path.basename(out)}  kept ${frames.length}/${stops.length} frames, ${W}x${total}`)
await browser.close()
