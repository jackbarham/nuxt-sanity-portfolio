<template>
  <footer class="footer">
    <div class="bg-gray-950 text-stone-50 pt-20 pb-16 md:py-20">
      <div class="lg:flex justify-between items-center md:flex-row-reverse layout-full">
        <div class="flex justify-center lg:justify-normal lg:mr-0 mb-12 lg:mb-0">
          <p>Social media links</p>
        </div>
        <div class="text-center lg:text-left">
          <h1 class="text-2xl text-stone-50 font-heading mb-2">
            <NuxtLink to="/" class="hover:text-brand-red">{{ appTitle }}</NuxtLink>
          </h1>
          <p class="text-stone-200 text-sm max-w-60 lg:max-w-full mx-auto">Demo website for Nuxt v4 & Sanity CMS.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const appTitle = useRuntimeConfig().public.appTitle
</script>