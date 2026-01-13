import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  compatibilityDate: '2025-12-30',
  devtools: {
    enabled: true
  },
  css: ['./app/assets/css/main.css'],
  modules: [
    '@nuxt/image', 
    'nuxt-svgo', 
    '@nuxt/fonts',
    'vue3-carousel-nuxt',
  ],
  components: [
    { path: '~/components', global: true },
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ]
  },
  runtimeConfig: {
    public: {
      sanity: {
        projectId: process.env.NUXT_SANITY_PROJECT_ID,
        dataset: process.env.NUXT_SANITY_DATASET,
        apiVersion: process.env.NUXT_SANITY_API_VERSION,
      },
    }
  },
  fonts: {
    defaults: {
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  },
  image: {
    quality: 80,
    sanity: {
      projectId: process.env.NUXT_SANITY_PROJECT_ID!,
      dataset: process.env.NUXT_SANITY_DATASET!,
    }
  },
  app: {
    pageTransition: { 
      name: 'page', 
      mode: 'out-in' 
    },
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: process.env.NUXT_APP_TITLE || 'App Title',
      meta: [
        { 
          name: 'description', 
          content: 'FAFO Demo for Nuxt v4 with Sanity CMS integration.'
        }
      ],
      link: [
        {
          rel: 'shortcut icon',
          type: 'image/png',
          href: '/favicon.png?v=1'
        },
      ]
    }
  }
})