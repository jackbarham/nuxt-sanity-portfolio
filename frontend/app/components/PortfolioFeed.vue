<template>
  <section class="portfolio-feed">
    <div class="py-16 md:py-20 lg:py-28">
      <div class="layout-mid">
        <div class="max-w-lg md:max-w-full mx-auto">
          <header class="md:flex items-center justify-between mb-8">
            <div v-if="heading || intro">
              <h2 v-if="heading" class="text-4xl md:text-5xl">{{ heading }}</h2>
              <p v-if="intro" class="mt-2 md:mt-3 text-lg text-gray-800 max-w-2xl">{{ intro }}</p>
            </div>
            <div class="mt-4 md:mt-0">
              <ButtonLight
                v-if="buttonCta?.link?.slug?.current && buttonCta?.text"
                :url="buttonCta.link.slug.current"
                :text="buttonCta.text"
              />
            </div>
          </header>
          <PortfolioGrid :posts="displayedPosts" />
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

// Only fetch latest items when in "latest" mode
const limit = props.displayCount === 'all' ? 100 : parseInt(props.displayCount || '3', 10)

const { data: latestPortfolio } = props.feedType === 'latest'
  ? await useSanityQuery<PortfolioPreview[]>(groq`
      *[_type == "portfolio"] | order(_createdAt desc) [0...$limit] {
        _id,
        title,
        slug,
        tagline,
        previewImage { asset }
      }
    `, { limit })
  : { data: ref([]) }

// Use selected items for manual mode, fetched items for latest mode
const displayedPosts = computed(() => {
  if (props.feedType === 'manual') {
    return props.selectedItems || []
  }
  return latestPortfolio.value || []
})
</script>
