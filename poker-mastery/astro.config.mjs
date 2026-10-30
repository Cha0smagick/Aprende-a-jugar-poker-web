import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://poker-mastery.github.io',
  base: '/poker-mastery/',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'auto',
    assets: 'assets',
  },
  integrations: [
    vue(),
    tailwind({ applyBaseStyles: false }),
    mdx(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
    syntaxHighlight: 'shiki',
  },
  vite: {
    optimizeDeps: {
      include: ['katex', 'chart.js', 'd3', 'pinia', 'vue'],
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-katex': ['katex'],
            'vendor-chart': ['chart.js', 'chartjs-adapter-date-fns'],
            'vendor-d3': ['d3'],
            'vendor-vue': ['vue', 'pinia'],
            'vendor-utils': ['lodash-es', 'date-fns', 'uuid', 'qrcode', 'jspdf', 'html2canvas'],
          },
        },
      },
    },
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});