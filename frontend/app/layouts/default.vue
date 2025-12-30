<template>
  <div class="flex flex-col h-screen">
    <MainHeader />
    <main role="main" class="flex-1 pt-16 md:pt-18 relative layout-wide">
      <div class="relative min-h-full py-16">
        <slot />
      </div>
    </main>
    <MainFooter 
      :footer="settings?.footer" 
      :social-media="settings?.socialMedia" 
    />
  </div>
</template>

<script setup lang="ts">
import type { Settings } from '~/types/sanity'

const { data: settings } = await useSanityQuery<Settings>(
  groq`*[_type == "settings" && _id == "settings"][0]{
    footer,
    socialMedia,
    defaultMeta {
      description,
      "imageUrl": image.asset->url
    }
  }`
)

// Set default SEO meta from Sanity settings
useSeoMeta({
  description: () => settings.value?.defaultMeta?.description,
  ogDescription: () => settings.value?.defaultMeta?.description,
  ogImage: () => settings.value?.defaultMeta?.imageUrl,
  twitterImage: () => settings.value?.defaultMeta?.imageUrl,
  twitterCard: 'summary_large_image',
})
</script>