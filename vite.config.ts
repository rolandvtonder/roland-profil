import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import { servicePages, caseStudies } from './src/pages'

const page = (p: string) => fileURLToPath(new URL(p, import.meta.url))

// One HTML entry per URL, so every page ships real markup with its own
// title, description and structured data rather than relying on JavaScript.
const input = {
  main: page('index.html'),
  ...Object.fromEntries(servicePages.map((s) => [`service-${s.slug}`, page(`services/${s.slug}/index.html`)])),
  ...Object.fromEntries(caseStudies.map((c) => [`work-${c.slug}`, page(`work/${c.slug}/index.html`)])),
}

export default defineConfig({
  // The site is served from the root of rolandwebdesign.co.za.
  base: process.env.BASE_PATH || '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: { input },
  },
  server: {
    // Use the port assigned via PORT when one is set, otherwise Vite's default
    port: Number(process.env.PORT) || 5173,
  },
})
