import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// SPA build; SEO head is injected per-route in a postbuild step (scripts/postbuild-seo.mjs).
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 2048,
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion'],
          lightbox: ['yet-another-react-lightbox'],
        },
      },
    },
  },
})
