<template>
  <figure v-if="imageId" class="portable-text-image">
    <NuxtImg
      provider="sanity"
      :src="imageId"
      :alt="value?.alt || ''"
      sizes="100vw sm:100vw md:780px"
      loading="lazy"
      class="rounded-lg"
    />
    <figcaption v-if="value?.caption" class="text-center">{{ value.caption }}</figcaption>
  </figure>
</template>

<script setup lang="ts">
interface SanityImageAsset {
  _ref: string
  _type: string
}

interface SanityImage {
  _type: string
  asset: SanityImageAsset
  alt?: string
  caption?: string
}

const props = defineProps<{
  value: SanityImage
}>()

const imageId = computed(() => props.value?.asset?._ref || '')
</script>
