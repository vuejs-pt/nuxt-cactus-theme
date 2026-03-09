import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: [
    './assets/css/main.css',
    './assets/css/overrides.css'
  ],

  modules: [
    '@nuxtjs/color-mode',
    '@nuxt/content',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  colorMode: {
    preference: 'system',
    dataValue: 'theme',
    storageKey: 'cactus-theme',
    classSuffix: '',
    fallback: 'light'
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com',
  },

  runtimeConfig: {
    webmentionApiKey: process.env.WEBMENTION_API_KEY || '',
    public: {
      webmentionUrl: process.env.WEBMENTION_URL || '',
    },
  },

  ssr: true,

  nitro: {
    prerender: {
      routes: ['/rss.xml'],
    },
  },
})
