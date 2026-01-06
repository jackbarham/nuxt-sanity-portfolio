import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  compatibilityDate: '2025-12-30',
  devtools: {
    enabled: true
  },

  // Enable Nitro compression for smaller assets
  nitro: {
    compressPublicAssets: true,
  },
  css: ['./app/assets/css/main.css'],
  modules: [
    '@nuxt/image',
    'nuxt-svgo',
  ],
  components: [
    { path: '~/components', global: true },
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
    build: {
      // Enable CSS code splitting - loads CSS per route
      cssCodeSplit: true,
      // Optimize chunk sizes
      rollupOptions: {
        output: {
          // Split vendor chunks for better caching
          manualChunks: {
            'sanity': ['@sanity/client'],
            'portable-text': ['@portabletext/vue'],
          },
        },
      },
    },
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
        // Preconnect to Sanity CDN for faster asset loading
        { rel: 'preconnect', href: 'https://cdn.sanity.io', crossorigin: '' },
        { rel: 'dns-prefetch', href: 'https://cdn.sanity.io' },
      ],
    }
  }
})