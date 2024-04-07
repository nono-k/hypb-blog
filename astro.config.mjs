import { defineConfig } from 'astro/config';
import { siteMeta } from './src/lib/constants';

const { siteUrl } = siteMeta;

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
});
