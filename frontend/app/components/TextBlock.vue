<template>
  <section class="text-block">
    <h2 v-if="heading">{{ heading }}</h2>
    <PortableText v-if="content" :value="content" />
  </section>
</template>

<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import type { PortableTextBlock } from '@portabletext/types'

defineProps<{
  _key: string
  _type: string
  heading?: string
  content?: PortableTextBlock[]
}>()
</script>
