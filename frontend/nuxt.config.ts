import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  compatibilityDate: '2025-12-30',
  devtools: { 
    enabled: true 
  },
  css: ['./app/assets/css/main.css'],
  modules: ['@nuxt/image'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  runtimeConfig: {
    public: {
      appTitle: process.env.NUXT_APP_TITLE || 'App Title',
      sanity: {
        projectId: process.env.NUXT_SANITY_PROJECT_ID,
        dataset: process.env.NUXT_SANITY_DATASET,
        apiVersion: process.env.NUXT_SANITY_API_VERSION,
      },
      sanityVisualEditing: {
        studioUrl: process.env.NUXT_SANITY_STUDIO_URL,
        token: process.env.NUXT_SANITY_API_READ_TOKEN || '',
      }
    }
  },
  image: {
    quality: 70,
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
      ],
    }
  }
})