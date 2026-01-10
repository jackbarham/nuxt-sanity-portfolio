<template>
  <footer class="footer">
    <div class="pt-12 pb-16 md:py-12 border-t border-stone-200">
      <div class="lg:flex justify-between items-center md:flex-row-reverse layout-full">
        <div v-if="socialMedia?.socialLinks?.length" class="flex justify-center lg:justify-normal lg:mr-0 mb-8 lg:mb-0 gap-4">
          <a
            v-for="link in socialMedia.socialLinks"
            :key="link._key"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-brand-red transition-colors font-medium"
          >{{ link.name }}</a>
        </div>
        <div class="text-center lg:text-left">
          <h1 class="text-2xl font-heading mb-1">
            <NuxtLink to="/" class="hover:text-brand-red">{{ siteTitle }}</NuxtLink>
          </h1>
          <p class="text-sm max-w-52 lg:max-w-full mx-auto">
            {{ footer?.tagline || 'Default tagline' }}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { Settings } from '~/types/sanity'

defineProps<{
  siteTitle?: string | null
  footer?: Settings['footer']
  socialMedia?: Settings['socialMedia']
}>()
</script>