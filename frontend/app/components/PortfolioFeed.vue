<template>
  <section class="portfolio-feed">
    <div class="py-16 md:py-20 lg:py-28">
      <div class="layout-wide">
        <div class="max-w-lg md:max-w-full mx-auto">
          <header class="md:flex items-center justify-between mb-8 md:mb-12">
            <div>
              <h2 v-if="heading" class="text-4xl md:text-5xl font-black">{{ heading }}</h2>
              <p v-if="intro" class="mt-4 text-lg text-gray-600 max-w-2xl">{{ intro }}</p>
            </div>
            <NuxtLink
              v-if="buttonCta?.link?.slug?.current && buttonCta?.text"
              :to="`/${buttonCta.link.slug.current}`"
              class="hidden md:inline-flex items-center px-6 py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-200"
            >
              {{ buttonCta.text }}
            </NuxtLink>
          </header>
          <PortfolioGrid :posts="displayedPosts" />
          <NuxtLink
            v-if="buttonCta?.link?.slug?.current && buttonCta?.text"
            :to="`/${buttonCta.link.slug.current}`"
            class="md:hidden inline-flex items-center px-6 py-3 mt-8 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-200"
          >
            {{ buttonCta.text }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface PortfolioPreview {
  _id: string
  title: string
  slug: { current: string }
  tagline?: string
  previewImage?: {
    asset?: {
      _ref?: string
      url?: string
    }
  }
}

interface Props {
  _key: string
  _type: string
  heading?: string
  intro?: string
  buttonCta?: {
    text?: string
    link?: {
      _ref?: string
      slug?: { current: string }
    }
  }
  feedType?: 'latest' | 'manual'
  selectedItems?: PortfolioPreview[]
  displayCount?: '3' | '6' | 'all'
}

const props = defineProps<Props>()

// Fetch all portfolio items for "latest" mode
const { data: allPortfolio } = await useSanityQuery<PortfolioPreview[]>(groq`
  *[_type == "portfolio"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    tagline,
    previewImage{
      asset
    }
  }
`)

// Compute the posts to display based on feedType and displayCount
const displayedPosts = computed(() => {
  let posts: PortfolioPreview[] = []

  if (props.feedType === 'manual' && props.selectedItems?.length) {
    // Use manually selected items in their specified order
    posts = props.selectedItems
  } else {
    // Use latest items from the query
    posts = allPortfolio.value || []
  }

  // Apply display count limit
  if (props.displayCount && props.displayCount !== 'all') {
    const limit = parseInt(props.displayCount, 10)
    posts = posts.slice(0, limit)
  }

  return posts
})
</script>
