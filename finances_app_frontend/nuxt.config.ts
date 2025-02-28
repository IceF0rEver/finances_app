// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'shadcn-nuxt',
    '@nuxtjs/i18n',
    '@nuxt/icon',
  ],

  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
    },
  },

  i18n: {
    lazy: true,
    langDir: 'langs/',
    locales: [
      { code: 'en', language: 'en-US', file: 'en-US.json' },
      { code: 'fr', language: 'fr-FR', file: 'fr-FR.json' }
    ],
    defaultLocale: 'fr',
    strategy: 'prefix',
  },
  colorMode: {
    classSuffix: '',
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    classPrefix: '',
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    storageKey: 'nuxt-color-mode'
  },
  ssr: false,
})