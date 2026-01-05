<template>
  <div>
    <template v-if="page">
      <h1>{{ page.title }}</h1>
      <!-- Components will be rendered here once built -->
    </template>
    <template v-else>
      <h1>Page not found</h1>
    </template>
  </div>
</template>

<script setup lang="ts">
interface Page {
  _id: string
  title: string
  slug: { current: string }
  pageMeta?: {
    image?: {
      asset?: {
        url: string
      }
    }
    description?: string
  }
  components?: unknown[]
}

const route = useRoute()
const slug = route.params.slug
  ? Array.isArray(route.params.slug)
    ? route.params.slug.join('/')
    : route.params.slug
  : 'home'

const { data: page } = await useSanityQuery<Page>(groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    pageMeta{
      description,
      image{
        asset->{url}
      }
    },
    components
  }
`, { slug })

useSeoMeta({
  title: () => page.value?.title,
  ogTitle: () => page.value?.title,
  description: () => page.value?.pageMeta?.description,
  ogDescription: () => page.value?.pageMeta?.description,
  ogImage: () => page.value?.pageMeta?.image?.asset?.url,
})
</script>
