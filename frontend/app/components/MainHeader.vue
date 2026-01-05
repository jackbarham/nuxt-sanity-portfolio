<template>
  <header 
    class="header fixed top-0 left-0 w-full z-50 transform transition-transform duration-300 ease-in-out" 
    :class="headerVisible ? 'translate-y-0' : '-translate-y-full'"
  >
    
    <!-- Main Header -->
    <div class="relative z-50 border-b border-stone-200 bg-stone-50">
      <div class="h-16 md:h-18 flex justify-between items-center layout-full">
        
        <!-- Title -->
        <h1 class="text-lg md:text-2xl font-heading mb-0.5 md:mb-1">
          <NuxtLink to="/" @click="closeMobileMenu()">{{ appTitle }}</NuxtLink>
        </h1>
        
        <!-- Desktop Navigation -->
        <nav aria-label="Main navigation">
          <ul class="hidden md:flex md:space-x-12 lg:space-x-16 mb-0.5 items-center">
            <li v-for="link in menu" :key="link.url">
              <NuxtLink :to="link.url" :aria-label="link.title" class="relative group">
                <span class="block font-heading font-medium tracking-wide text-base md:text-lg">{{ link.title }}</span>
                <span class="relative block">
                  <span class="absolute left-0 bottom-0 h-0.5 bg-gray-950 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out origin-left opacity-90"></span>
                </span>
              </NuxtLink>
            </li>
          </ul>
        </nav>
        
        <!-- Toggle Menu Button -->
        <div @click="toggleMobileMenu()" class="relative z-50 visible md:hidden w-8 h-8 cursor-pointer">
          <svgo-burger v-if="!menuOpen" filled class="text-gray-950" />
          <svgo-close v-else filled class="text-gray-950" />
        </div>
        
      </div>
    </div>
    
    <!-- Mobile Navigation -->
    <nav 
      aria-label="Mobile navigation"
      :id="menuOpen ? 'mobile-navigation' : undefined"
      class="absolute -z-10 left-0 w-full bg-stone-50 p-12 transform transition-transform ease-in-out duration-200"
      :class="menuOpen ? 'translate-y-0' : '-translate-y-full'"
      :style="{ top: '64px', height: 'calc(100dvh - 64px)' }"
    >
      <ul class="space-y-4">
        <li 
          v-for="(link, index) in menu" 
          :key="link.url"
          class="transform transition-all ease-in-out duration-300"
          :class="menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'"
          :style="{ transitionDelay: menuOpen ? `${200 + (index * 150)}ms` : '0ms' }"
        >
          <NuxtLink 
            :to="link.url" 
            @click="closeMobileMenu"
            :aria-label="link.title"
            class="block text-3xl font-heading font-medium tracking-wide py-3"
          >{{ link.title }}</NuxtLink>
        </li>
      </ul>

      <!-- CTA button -->
      <div 
        class="absolute bottom-12 min-w-48 transform transition-opacity duration-700 ease-in-out"
        :class="menuOpen ? 'opacity-100' : 'opacity-0'"
        :style="{ 
          transitionDelay: menuOpen ? '200ms' : '0ms',
          transitionDuration: menuOpen ? '700ms' : '150ms'
        }"
      >
        <a href="mailto:jack@airboxmedia.com" class="">
          <span class="inline-block mb-2">Get started</span>
          <span class="block text-xl font-heading font-medium tracking-wide md:text-lg">More copy here</span>
        </a>
      </div>
      
    </nav>

  </header>
</template>

<script setup lang="ts">
import type { MainMenu } from '~/types/sanity'

defineProps<{
  menu?: MainMenu[] | null
}>()

const appTitle = useRuntimeConfig().public.appTitle

// Mobile menu state
const menuOpen = ref(false)

// Header visibility state
const headerVisible = ref(true)
const lastScrollY = ref(0)
const scrollDirection = ref('up')

// Mobile menu functions
const toggleMobileMenu = () => {
  menuOpen.value = !menuOpen.value
  updateBodyClass()
}

const closeMobileMenu = () => {
  menuOpen.value = false
  updateBodyClass()
}

// Lock/unlock body scroll
const updateBodyClass = () => {
  if (import.meta.client) {
    if (menuOpen.value) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }
}

// Close menu when route changes
const router = useRouter()
router.afterEach(() => {
  closeMobileMenu()
})

// Handle scroll for header show/hide
const handleScroll = () => {
  if (!import.meta.client) return
  
  const currentScrollY = window.scrollY
  
  // At top of page - always show header
  if (currentScrollY <= 50) {
    headerVisible.value = true
    lastScrollY.value = currentScrollY
    return
  }
  
  // Determine scroll direction
  if (currentScrollY > lastScrollY.value) {
    // Scrolling down - hide header
    scrollDirection.value = 'down'
    headerVisible.value = false
  } else if (currentScrollY < lastScrollY.value) {
    // Scrolling up - show header
    scrollDirection.value = 'up'
    headerVisible.value = true
  }
  
  lastScrollY.value = currentScrollY
}

// Handle window resize to close mobile menu
const handleResize = () => {
  if (menuOpen.value) {
    closeMobileMenu()
  }
}

// Setup scroll and resize listeners
onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
  }
})

// Cleanup on unmount
onUnmounted(() => {
  if (import.meta.client) {
    document.body.classList.remove('overflow-hidden')
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)
  }
})
</script>