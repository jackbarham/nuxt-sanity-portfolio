<template>
  <div>
    <template v-if="page">
      <template v-for="block in page.components" :key="block._key">
        <component
          v-if="getBlockComponent(block._type)"
          :is="getBlockComponent(block._type)"
          v-bind="block"
        />
        <div v-else-if="isDev" class="p-4 bg-yellow-100 border border-yellow-400 text-yellow-800">
          Unknown block type: <strong>{{ block._type }}</strong>
        </div>
      </template>
    </template>
    <template v-else>
      <h1>Page not found</h1>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Page } from '~/types/sanity'

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
    components[]{
      ...,
      _type,
      _key
    }
  }
`, { slug })

// Check if in development mode
const isDev = import.meta.dev
const { resolve: getBlockComponent } = useBlockResolver()

useCustomSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.pageMeta?.description,
  image: () => page.value?.pageMeta?.image?.asset?.url,
})
</script>
