import { defineConfig } from 'astro/config';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import { siteMeta } from './src/lib/constants';
import { h } from 'hastscript';
import { transformerCopyButton } from '@rehype-pretty/transformers';
import icon from 'astro-icon';
import mdx from "@astrojs/mdx";
import react from '@astrojs/react';
import remarkBreaks from 'remark-breaks';
import remarkGemoji from 'remark-gemoji';
import remarkLinkCard from 'remark-link-card';
import remarkMath from 'remark-math';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeRaw from 'rehype-raw';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import partytown from "@astrojs/partytown";
import sitemap from '@astrojs/sitemap';

const {
  siteUrl
} = siteMeta;

const codeOptions = {
  theme: 'one-dark-pro',
  defaultLang: 'plaintext',
  transformers: [
    transformerCopyButton({
      visibility: 'hover',
      feedbackDuration: 2_500,
    })
  ],
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
    icon(),
    react(),
    partytown({
      config: {
        forward: ["dataLayer.push"]
      }
    }),
    sitemap(),
  ],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [
      remarkBreaks,
      remarkGemoji,
      remarkMath,
      [
        remarkLinkCard, {
          cache: true,
          shortenUrl: true
        }
      ]
    ],
    rehypePlugins: [
      rehypeRaw,
      rehypeKatex,
      [rehypeExternalLinks, { target: '_blank' }],
      [rehypePrettyCode, codeOptions],
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties(node) {
            return {
              'aria-labelledby': node.properties.id,
              class: 'heading-link',
            };
          },
          content: h('span.heading-link-icon', {
            title: 'リンク',
          })
        }
      ]
    ]
  },
  experimental: {
    svg: true,
  }
});