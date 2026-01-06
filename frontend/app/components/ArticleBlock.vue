<template>
  <section class="article-block">
    <PortableText v-if="content" :value="content" :components="portableTextComponents" />
  </section>
</template>

<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import type { PortableTextBlock } from '@portabletext/types'

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

defineProps<{
  _key: string
  _type: string
  content?: PortableTextBlock[]
}>()

const PortableTextImage = defineComponent({
  props: {
    value: {
      type: Object as PropType<SanityImage>,
      required: true,
    },
  },
  setup(props) {
    const imageId = computed(() => props.value?.asset?._ref || '')

    return () =>
      imageId.value
        ? h('figure', { class: 'portable-text-image' }, [
            h(resolveComponent('NuxtImg'), {
              provider: 'sanity',
              src: imageId.value,
              alt: props.value?.alt || '',
              sizes: '100vw sm:100vw md:780px',
              loading: 'lazy',
              class: 'w-full',
            }),
            props.value?.caption
              ? h('figcaption', props.value.caption)
              : null,
          ])
        : null
  },
})


const portableTextComponents: any = {
  types: {
    image: PortableTextImage
  }
}
</script>
