import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import { SITE_CONFIG } from './src/config/site';

// https://astro.build/config
export default defineConfig({
  site: 'https://shivsahajaoverseas.com',
  output: 'static',
  adapter: vercel(),
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => {
        const pathname = new URL(page, 'https://shivsahajaoverseas.com').pathname.replace(/\/+$/, '') || '/';
        if (!SITE_CONFIG.features.enableImport && pathname === '/import') {
          return false;
        }
        if (!SITE_CONFIG.features.enableGlobalTrade && (pathname === '/trade' || pathname === '/export')) {
          return false;
        }
        return true;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
