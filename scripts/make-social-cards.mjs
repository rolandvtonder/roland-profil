// Generates square social cards from the project screenshots.
//
// One 1080x1080 PNG per project, in the site's own visual language: midnight
// page colour, the electric-blue glow from the hero, the site shown in browser
// chrome, and the Concept tag carried over from /work/ so an uncommissioned
// demo is never posted as if a client paid for it.
//
//   node scripts/make-social-cards.mjs
//
// Output: social-posts/<slug>.png

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import puppeteer from 'puppeteer-core'
import { all, barLabel, pick } from './social-projects.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const SIZE = 1080

// Brand tokens, copied from src/index.css. Keep in step if those change.
const C = {
  page: '#060A14',
  surface: '#0B1222',
  surface2: '#111B31',
  line: 'rgba(141, 181, 255, 0.12)',
  lineStrong: 'rgba(141, 181, 255, 0.26)',
  ink: '#F4F7FF',
  inkMuted: '#A9B4CC',
  inkSubtle: '#7D89A3',
  accent: '#3D7EFF',
  accentBright: '#5B95FF',
  accentSoft: '#8DB5FF',
}


const logo = `<svg width="46" height="46" viewBox="6.2 6 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18.6 20.2 22.4 24.6" stroke="${C.accentBright}" stroke-width="3" stroke-linecap="round"/>
  <path d="M11 23.5V8.5h5.25a4.5 4.5 0 0 1 0 9H11" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

function html(post, dataUri) {
  // A long title needs to step down a size or it wraps into the category line.
  const titleSize = post.title.length > 18 ? 56 : 68
  return `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${SIZE}px; height: ${SIZE}px; overflow: hidden;
    background: ${C.page};
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .stage {
    position: relative; width: 100%; height: 100%;
    padding: 64px 64px 60px; display: flex; flex-direction: column;
  }
  /* The hero's blue radial glow, top-right so it sits behind the screenshot. */
  .glow {
    position: absolute; top: -260px; right: -200px;
    width: 900px; height: 900px; border-radius: 50%;
    background: radial-gradient(circle, rgba(61,126,255,0.30) 0%, rgba(61,126,255,0.10) 42%, transparent 68%);
    pointer-events: none;
  }
  .glow-2 {
    position: absolute; bottom: -340px; left: -240px;
    width: 760px; height: 760px; border-radius: 50%;
    background: radial-gradient(circle, rgba(61,126,255,0.16) 0%, transparent 66%);
    pointer-events: none;
  }
  .brand { position: relative; display: flex; align-items: center; gap: 14px; }
  .brand .name { font-size: 27px; font-weight: 800; letter-spacing: -0.02em; color: ${C.ink}; }

  .frame {
    position: relative; margin-top: 46px;
    border: 1px solid ${C.lineStrong}; border-radius: 18px; overflow: hidden;
    background: ${C.surface};
    box-shadow: 0 40px 90px rgba(0,0,0,0.55), 0 0 0 1px rgba(141,181,255,0.05);
  }
  .bar {
    height: 46px; display: flex; align-items: center; gap: 9px; padding: 0 18px;
    background: ${C.surface2}; border-bottom: 1px solid ${C.line};
  }
  .dot { width: 11px; height: 11px; border-radius: 50%; background: rgba(141,181,255,0.22); }
  .url {
    margin-left: 14px; font-size: 18px; font-weight: 500; color: ${C.inkSubtle};
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  /* Sized so the frame and the footer fill the stage with no dead band
     between them: 1080 - padding - brand row - frame margin - bar - footer. */
  .shot { display: block; width: 100%; height: 620px; object-fit: cover; object-position: top center; }

  .foot { position: relative; margin-top: auto; padding-top: 42px; }
  .row { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; }
  .title { font-size: ${titleSize}px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.04; color: ${C.ink}; }
  .category { margin-top: 14px; font-size: 25px; font-weight: 500; color: ${C.accentSoft}; }
  .tag {
    flex: none; margin-top: 8px; padding: 9px 18px; border-radius: 999px;
    font-size: 18px; font-weight: 600; letter-spacing: 0.01em;
    border: 1px solid ${post.client ? 'rgba(61,126,255,0.45)' : C.lineStrong};
    background: ${post.client ? 'rgba(61,126,255,0.14)' : 'transparent'};
    color: ${post.client ? C.accentSoft : C.inkSubtle};
  }
</style></head>
<body>
  <div class="stage">
    <div class="glow"></div>
    <div class="glow-2"></div>
    <div class="brand">${logo}<span class="name">Roland Web Design</span></div>
    <div class="frame">
      <div class="bar">
        <span class="dot"></span><span class="dot"></span><span class="dot"></span>
        <span class="url">${barLabel(post)}</span>
      </div>
      <img class="shot" src="${dataUri}" alt="">
    </div>
    <div class="foot">
      <div class="row">
        <div>
          <div class="title">${post.title}</div>
          <div class="category">${post.category}</div>
        </div>
        <div class="tag">${post.client ? 'Live site' : 'Concept'}</div>
      </div>
    </div>
  </div>
</body></html>`
}

const posts = pick(all, process.argv[2])

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.setViewport({ width: SIZE, height: SIZE, deviceScaleFactor: 1 })

const outDir = path.join(root, 'social-posts')
await mkdir(outDir, { recursive: true })

for (const post of posts) {
  // file:// URLs do not load inside setContent, so the screenshot goes in as data.
  const buf = await readFile(path.join(root, post.image))
  const dataUri = `data:image/webp;base64,${buf.toString('base64')}`

  // networkidle0 hangs here: the Google Fonts connection never goes quiet.
  // Wait for load, then for the webfont specifically, and check it landed --
  // a silent fallback to system sans would ship cards in the wrong typeface.
  await page.setContent(html(post, dataUri), { waitUntil: 'load', timeout: 60000 })
  await page.evaluate(() => document.fonts.ready)
  const fontOk = await page.evaluate(() => document.fonts.check('800 68px "Plus Jakarta Sans"'))
  if (!fontOk) throw new Error('Plus Jakarta Sans did not load - cards would render in a fallback face')

  const shot = await page.screenshot({ type: 'png' })
  await writeFile(path.join(outDir, `${post.slug}.png`), shot)
  console.log(`  ${post.slug}.png  (${post.client ? 'live' : 'concept'})`)
}

// ── Cover images ─────────────────────────────────────────────────────────
// Facebook and LinkedIn crop covers hard, and differently on phones, so every
// word sits in the middle where both platforms keep it.
const covers = [
  { slug: 'facebook-cover', w: 1640, h: 624, scale: 2 },
  { slug: 'linkedin-cover', w: 1584, h: 396, scale: 1 },
]

function coverHtml(c) {
  const u = c.h / 312 // keeps type in proportion across the two shapes
  return `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${c.w}px; height: ${c.h}px; overflow: hidden; background: ${C.page};
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif; -webkit-font-smoothing: antialiased;
  }
  .wrap {
    position: relative; width: 100%; height: 100%;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; gap: ${14 * u}px;
  }
  .glow {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    width: ${c.w * 0.8}px; height: ${c.h * 2.4}px; border-radius: 50%;
    background: radial-gradient(ellipse, rgba(61,126,255,0.26) 0%, rgba(61,126,255,0.08) 45%, transparent 70%);
  }
  .brand { position: relative; display: flex; align-items: center; gap: ${12 * u}px; }
  .brand svg { width: ${42 * u}px; height: ${42 * u}px; }
  .name { font-size: ${34 * u}px; font-weight: 800; letter-spacing: -0.02em; color: ${C.ink}; }
  .line {
    position: relative; font-size: ${21 * u}px; font-weight: 500; line-height: 1.4;
    color: ${C.inkMuted}; max-width: ${560 * u}px;
  }
  .line b { color: ${C.accentSoft}; font-weight: 600; }
  .url {
    position: relative; margin-top: ${6 * u}px; font-size: ${17 * u}px; font-weight: 600;
    letter-spacing: 0.02em; color: ${C.ink};
    padding: ${9 * u}px ${22 * u}px; border-radius: 999px;
    border: 1px solid rgba(61,126,255,0.45); background: rgba(61,126,255,0.14);
  }
</style></head>
<body><div class="wrap">
  <div class="glow"></div>
  <div class="brand">${logo}<span class="name">Roland Web Design</span></div>
  <div class="line">Websites that bring growing businesses <b>more calls and enquiries</b>.</div>
  <div class="url">Free homepage preview &middot; rolandwebdesign.co.za</div>
</div></body></html>`
}

for (const c of covers) {
  await page.setViewport({ width: c.w / c.scale, height: c.h / c.scale, deviceScaleFactor: c.scale })
  await page.setContent(coverHtml({ ...c, w: c.w / c.scale, h: c.h / c.scale }), { waitUntil: 'load', timeout: 60000 })
  await page.evaluate(() => document.fonts.ready)
  const shot = await page.screenshot({ type: 'png' })
  await writeFile(path.join(outDir, `${c.slug}.png`), shot)
  console.log(`  ${c.slug}.png  (${c.w}x${c.h})`)
}

await browser.close()
console.log(`\n${posts.length} cards and ${covers.length} covers written to social-posts/`)
