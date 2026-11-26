// Builds the two pieces a scroll-through Reel needs.
//
//   <slug>-surround.png  1080x1920 with a TRANSPARENT window where the site
//                        scrolls. ffmpeg overlays this on top of the panning
//                        screenshot, so the chrome and branding stay fixed
//                        while the site moves underneath.
//   <slug>-preview.png   the same frame with the top of the site composited
//                        in, so the look can be judged without encoding.
//
//   node scripts/make-reel-frame.mjs [slug]
//
// Output: social-posts/reels/

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import puppeteer from 'puppeteer-core'
import { all, barLabel, pick as pickFrom } from './social-projects.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'

// Reel canvas and the window the site scrolls through.
//
// Instagram crops grid thumbnails to about 4:5 from the CENTRE of a 9:16 reel,
// which on 1080x1920 is y 285..1635. Anything outside that is invisible in the
// grid, so the logo and the title block both sit inside it -- otherwise the
// tile shows a bare browser window and none of the branding.
export const W = 1080
export const H = 1920
export const SAFE_TOP = 285
export const SAFE_BOTTOM = 1635
export const WIN_X = 60
export const WIN_Y = 470
export const WIN_W = 960
export const WIN_H = 830
export const BAR_H = 52 // browser chrome bar, sits directly above the window

const C = {
  page: '#060A14',
  surface2: '#111B31',
  line: 'rgba(141, 181, 255, 0.12)',
  lineStrong: 'rgba(141, 181, 255, 0.26)',
  ink: '#F4F7FF',
  inkSubtle: '#7D89A3',
  accentBright: '#5B95FF',
  accentSoft: '#8DB5FF',
}

export const reels = all

const logo = `<svg width="44" height="44" viewBox="6.2 6 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18.6 20.2 22.4 24.6" stroke="${C.accentBright}" stroke-width="3" stroke-linecap="round"/>
  <path d="M11 23.5V8.5h5.25a4.5 4.5 0 0 1 0 9H11" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

// `hole: true` punches the window out so ffmpeg can show video through it.
function html(reel, { hole, shotUri }) {
  const titleSize = reel.title.length > 18 ? 58 : 70
  return `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${W}px; height: ${H}px; overflow: hidden;
    background: ${hole ? 'transparent' : C.page};
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif; -webkit-font-smoothing: antialiased;
  }
  .bg { position: absolute; inset: 0; background: ${hole ? 'transparent' : C.page}; }
  .glow {
    position: absolute; top: -300px; right: -260px; width: 1100px; height: 1100px; border-radius: 50%;
    background: radial-gradient(circle, rgba(61,126,255,${hole ? 0 : 0.28}) 0%, rgba(61,126,255,${hole ? 0 : 0.09}) 44%, transparent 70%);
  }
  .glow-2 {
    position: absolute; bottom: -380px; left: -280px; width: 900px; height: 900px; border-radius: 50%;
    background: radial-gradient(circle, rgba(61,126,255,${hole ? 0 : 0.15}) 0%, transparent 66%);
  }
  .brand { position: absolute; top: ${SAFE_TOP + 25}px; left: 60px; display: flex; align-items: center; gap: 14px; }
  .brand .name { font-size: 30px; font-weight: 800; letter-spacing: -0.02em; color: ${C.ink}; }

  /* Chrome bar sits directly on top of the window. */
  .bar {
    position: absolute; left: ${WIN_X}px; top: ${WIN_Y - BAR_H}px; width: ${WIN_W}px; height: ${BAR_H}px;
    display: flex; align-items: center; gap: 10px; padding: 0 20px;
    background: ${C.surface2}; border: 1px solid ${C.lineStrong}; border-bottom: 1px solid ${C.line};
    border-radius: 18px 18px 0 0;
  }
  .dot { width: 12px; height: 12px; border-radius: 50%; background: rgba(141,181,255,0.22); }
  .url { margin-left: 14px; font-size: 20px; font-weight: 500; color: ${C.inkSubtle}; }

  /* The window itself: either a hole, or the screenshot for the preview. */
  .win {
    position: absolute; left: ${WIN_X}px; top: ${WIN_Y}px; width: ${WIN_W}px; height: ${WIN_H}px;
    overflow: hidden; border: 1px solid ${C.lineStrong}; border-top: none; border-radius: 0 0 18px 18px;
    background: ${hole ? 'transparent' : '#000'};
  }
  .win img { display: block; width: 100%; }

  /* Bottom-anchored to the safe line, not the canvas, so the grid crop keeps it. */
  .foot { position: absolute; left: 60px; right: 60px; top: ${WIN_Y + WIN_H + 40}px; }
  .title { font-size: ${titleSize}px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.05; color: ${C.ink}; }
  .category { margin-top: 16px; font-size: 28px; font-weight: 500; color: ${C.accentSoft}; }
  .tag {
    display: inline-block; margin-top: 28px; padding: 12px 24px; border-radius: 999px;
    font-size: 21px; font-weight: 600;
    border: 1px solid ${reel.client ? 'rgba(61,126,255,0.45)' : C.lineStrong};
    background: ${reel.client ? 'rgba(61,126,255,0.14)' : 'transparent'};
    color: ${reel.client ? C.accentSoft : C.inkSubtle};
  }
</style></head>
<body>
  <div class="bg"></div><div class="glow"></div><div class="glow-2"></div>
  <div class="brand">${logo}<span class="name">Roland Web Design</span></div>
  <div class="bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="url">${barLabel(reel)}</span></div>
  <div class="win">${hole ? '' : `<img src="${shotUri}" alt="">`}</div>
  <div class="foot">
    <div class="title">${reel.title}</div>
    <div class="category">${reel.category}</div>
    <div class="tag">${reel.client ? 'Live site' : 'Concept'}</div>
  </div>
</body></html>`
}

export const outDir = path.join(root, 'social-posts/reels')

/** Writes <slug>-surround.png and <slug>-preview.png for each reel given. */
export async function renderFrames(list) {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 })
  await mkdir(outDir, { recursive: true })

  for (const reel of list) {
    const buf = await readFile(path.join(root, reel.image))
    const shotUri = `data:image/webp;base64,${buf.toString('base64')}`

    for (const hole of [true, false]) {
      await page.setContent(html(reel, { hole, shotUri }), { waitUntil: 'load', timeout: 60000 })
      await page.evaluate(() => document.fonts.ready)
      if (!await page.evaluate(() => document.fonts.check('800 70px "Plus Jakarta Sans"')))
        throw new Error('Plus Jakarta Sans did not load')

      // omitBackground is what leaves the window transparent for the overlay.
      const shot = await page.screenshot({ type: 'png', omitBackground: hole })
      const name = hole ? `${reel.slug}-surround.png` : `${reel.slug}-preview.png`
      await writeFile(path.join(outDir, name), shot)
      console.log(`  ${name}`)
    }
  }

  await browser.close()
}

export const pick = (slug) => pickFrom(reels, slug)

// Only run when invoked directly, so make-reels.mjs can import the geometry.
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const list = pick(process.argv[2])
  await renderFrames(list)
  console.log(`\n${list.length} reel frame set(s) in ${outDir}`)
}
