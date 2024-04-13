import { defineConfig } from 'astro/config';
import { siteMeta } from './src/lib/constants';
import mdx from "@astrojs/mdx";
import react from '@astrojs/react';
const {
  siteUrl
} = siteMeta;


// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  prefetch: {
    prefetchAll: true
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "src/styles/mixin.scss";`
        }
      }
    }
  },
  integrations: [
    mdx(),
    react()
  ]
});