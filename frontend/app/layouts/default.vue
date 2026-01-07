<template>
  <div class="flex flex-col h-screen">
    <MainHeader :site-title="settings?.siteTitle" :menu="settings?.mainMenu" />
    <main role="main" class="flex-1 pt-16 md:pt-18 relative">
      <div class="relative min-h-full py-16">
        <slot />
      </div>
    </main>
    <MainFooter
      :site-title="settings?.siteTitle"
      :footer="settings?.footer"
      :social-media="settings?.socialMedia"
    />
  </div>
</template>

<script setup lang="ts">
import type { Settings } from '~/types/sanity'

const { data: settings } = await useSanityQuery<Settings>(
  groq`*[_type == "settings" && _id == "settings"][0]{
    siteTitle,
    mainMenu[]->{
      title,
      "url": "/" + select(slug.current == "home" => "", slug.current)
    },
    footer,
    socialMedia,
    defaultMeta {
      description,
      "imageUrl": image.asset->url
    }
  }`
)

// Set default SEO meta from CMS settings
useCustomSeoMeta({
  siteTitle: () => settings.value?.siteTitle,
  description: () => settings.value?.defaultMeta?.description,
  image: () => settings.value?.defaultMeta?.imageUrl,
})
</script>