import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    // Use the port assigned via PORT when one is set, otherwise Vite's default
    port: Number(process.env.PORT) || 5173,
  },
})
