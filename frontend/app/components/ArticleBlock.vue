<template>
  <section class="article-block">
    <div class="prose">
      <PortableText v-if="content" :value="content" :components="portableTextComponents" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import type { PortableTextBlock } from '@portabletext/types'
import PortableTextImage from './portabletext/PortableTextImage.vue'

defineProps<{
  _key: string
  _type: string
  content?: PortableTextBlock[]
}>()

const portableTextComponents: any = {
  types: {
    image: PortableTextImage
  }
}
</script>
