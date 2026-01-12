<template>
  <section class="portfolio-grid">
    <div class="max-w-lg md:max-w-full mx-auto">
      <div class="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
        <div v-for="post in posts" :key="post._id">
          <NuxtLink :to="`/portfolio/${post.slug?.current}`" class="block group">
            <div class="relative aspect-3/2 mb-2 bg-gray-100 rounded-md overflow-hidden">
              <NuxtImg
                v-if="post.previewImage?.asset?._ref"
                provider="sanity"
                :src="post.previewImage.asset._ref"
                :width="imageWidth(post.previewImage.asset._ref)"
                :height="imageHeight(post.previewImage.asset._ref)"
                loading="lazy"
                :alt="post.title"
                sizes="100vw md:50vw xl:33vw"
                class="w-full h-full object-cover"
              />
            </div>
            <h3 class="text-2xl/9 md:text-xl/7 group-hover:text-brand-red duration-200">{{ post.title }}</h3>
            <span v-if="post.tagline" class="text-gray-600">{{ post.tagline }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { imageWidth, imageHeight } = useImageDimensions()

interface PortfolioPreview {
  _id: string
  title: string
  slug: { current: string }
  tagline?: string
  previewImage?: {
    asset?: {
      _ref?: string
    }
  }
}

defineProps<{
  posts: PortfolioPreview[]
}>()
</script>
