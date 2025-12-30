<template>
  <div class="flex flex-col h-screen">
    <MainHeader />
    <main role="main" class="flex-1 pt-16 md:pt-18 relative layout-wide">
      <div class="relative min-h-full py-16">
        <slot />
      </div>
    </main>
    <MainFooter />
  </div>
</template>

<script setup>
// 
</script>