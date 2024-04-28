import { defineConfig } from 'astro/config';
import { siteMeta } from './src/lib/constants';
import mdx from "@astrojs/mdx";
import react from '@astrojs/react';
import remarkBreaks from 'remark-breaks';
import remarkGemoji from 'remark-gemoji';
import remarkLinkCard from 'remark-link-card';
import rehypePrettyCode from 'rehype-pretty-code';
import partytown from "@astrojs/partytown";
const {
  siteUrl
} = siteMeta;
const codeOptions = {
  theme: 'one-dark-pro',
  defaultLang: 'plaintext',
  onVistitLine(node) {
    if (node.children.length === 0) {
      node.children = [{
        type: 'text',
        value: ' '
      }];
    }
  },
  onVisitHighlightedLine(node) {
    if (!node.properties) {
      node.properties = {}; // propertiesが定義されていない場合は初期化する
    }
    if (!node.properties.className) {
      node.properties.className = []; // classNameが定義されていない場合は初期化する
    }
    node.properties.className.push('highlighted');
  }
};


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
    react(),
    partytown({
      config: {
        forward: ["dataLayer.push"]
      }
    })
  ],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkBreaks, remarkGemoji, [remarkLinkCard, {
      cache: true,
      shortenUrl: true
    }]],
    rehypePlugins: [[rehypePrettyCode, codeOptions]]
  }
});