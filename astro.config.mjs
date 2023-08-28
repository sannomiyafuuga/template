import { defineConfig } from 'astro/config'
import { base, siteConfig } from './site.config.mjs'

// https://astro.build/config
export default defineConfig({
  site: `${siteConfig.siteUrl}${base.production}`,
  base: process.env.NODE_ENV === 'development' ? base.development : base.production,
  server: ({ command }) => ({
    port: command === 'dev' ? 3000 : 4000,
    open: true,
    host: true,
  }),
  vite: {
    build: {
      assetsInlineLimit: 0, // インライン化しないように設定
      rollupOptions: {
        output: {
          entryFileNames: `assets/js/main.js`,
          chunkFileNames: `assets/js/chunks/[name].js`,
          assetFileNames: (assetInfo) => {
            if (/\.(css|scss)$/.test(assetInfo.name)) {
              return `assets/css/main.css`
            }
            return `assets/[ext]/[name][extname]`
          },
        },
      },
    },
  },
})
