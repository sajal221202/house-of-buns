import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/apple-touch-icon.png'],
      manifest: {
        name: 'House of Buns',
        short_name: 'House of Buns',
        description: 'Order 100% pure veg burgers from House of Buns, Indore.',
        theme_color: '#123d24',
        background_color: '#f7ecd9',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Admin portal is a separate tool for staff, not the customer-facing app —
        // never let it get precached/served offline under the install prompt.
        navigateFallbackDenylist: [/^\/admin/, /^\/counter/],
      },
    }),
  ],
})
