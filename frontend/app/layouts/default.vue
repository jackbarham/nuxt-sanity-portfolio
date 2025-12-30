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
    socialMedia
  }`
)
</script>