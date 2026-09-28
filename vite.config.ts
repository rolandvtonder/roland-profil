import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // GitHub Pages serves this site from /roland-profil/, so the deploy workflow
  // sets BASE_PATH. Locally — and on rolandwebdesign.co.za later — it stays '/'.
  base: process.env.BASE_PATH || '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    // Use the port assigned via PORT when one is set, otherwise Vite's default
    port: Number(process.env.PORT) || 5173,
  },
})
