// Renders a vertical scroll-through Reel per client site.
//
// The site is not re-recorded live -- scroll animations and load timing make
// that flaky. Instead the existing full-page capture is panned behind a fixed
// branded surround, which is deterministic and matches the post cards.
//
//   node scripts/make-reels.mjs [slug]
//
// Output: social-posts/reels/<slug>.mp4  (1080x1920, H.264, 30fps, 15s)

import { spawn } from 'node:child_process'
import { stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ffmpegPath from 'ffmpeg-static'
import { reels, pick, renderFrames, outDir, W, H, WIN_X, WIN_Y, WIN_W, WIN_H } from './make-reel-frame.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const FPS = 30
const HOLD = 1.5 // still at the top, and again at the bottom
const SCROLL = 12
const DUR = HOLD * 2 + SCROLL

function run(args) {
  return new Promise((resolve, reject) => {
    const p = spawn(ffmpegPath, args, { stdio: ['ignore', 'ignore', 'pipe'] })
    let err = ''
    p.stderr.on('data', (d) => { err += d })
    p.on('close', (code) => (code === 0 ? resolve() : reject(new Error(err.slice(-1500)))))
  })
}

const list = pick(process.argv[2])

console.log('rendering frames...')
await renderFrames(list)

console.log('\nencoding...')
for (const reel of list) {
  const shot = path.join(root, 'public/work', reel.image)
  const surround = path.join(outDir, `${reel.slug}-surround.png`)
  const out = path.join(outDir, `${reel.slug}.mp4`)

  // The capture is 1280 wide; scaled to the window width it gets taller than
  // the window, and that overflow is exactly how far there is to scroll.
  // clip() holds the first and last frames still instead of starting mid-motion.
  const pan = `(ih-${WIN_H})*clip((t-${HOLD})/${SCROLL},0,1)`

  const filter = [
    `color=c=0x060A14:s=${W}x${H}:r=${FPS}:d=${DUR}[bg]`,
    `[0:v]scale=${WIN_W}:-2,crop=${WIN_W}:${WIN_H}:0:'${pan}'[pan]`,
    `[bg][pan]overlay=${WIN_X}:${WIN_Y}[base]`,
    `[base][1:v]overlay=0:0,format=yuv420p[v]`,
  ].join(';')

  await run([
    '-y',
    '-loop', '1', '-i', shot,
    '-loop', '1', '-i', surround,
    // A silent track: some Instagram uploads reject a video with no audio stream.
    '-f', 'lavfi', '-i', 'anullsrc=channel_layout=stereo:sample_rate=44100',
    '-filter_complex', filter,
    '-map', '[v]', '-map', '2:a',
    '-t', String(DUR),
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '20',
    '-r', String(FPS), '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '128k', '-shortest',
    '-movflags', '+faststart',
    out,
  ])

  const { size } = await stat(out)
  console.log(`  ${reel.slug}.mp4  ${(size / 1024 / 1024).toFixed(1)} MB`)
}

console.log(`\n${list.length} reel(s) in ${outDir}`)
