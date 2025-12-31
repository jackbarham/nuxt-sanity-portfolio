export default defineNuxtPlugin(() => {
  // Only load visual editing when inside Sanity Presentation iframe
  const isInIframe = window.self !== window.top
  if (!isInIframe) return

  // Load visual editing from CDN to avoid bundling React/framer-motion (~700KB)
  const script = document.createElement('script')
  script.src = 'https://unpkg.com/@sanity/visual-editing@2/dist/visual-editing.umd.cjs'
  script.async = true
  script.onload = () => {
    const router = useRouter()
    // @ts-expect-error - loaded from CDN
    const { enableVisualEditing } = window.SanityVisualEditing || {}

    if (enableVisualEditing) {
      enableVisualEditing({
        history: {
          subscribe: (navigate: (nav: { type: string; url: string }) => void) => {
            const unwatch = watch(
              () => router.currentRoute.value.fullPath,
              (path) => {
                navigate({ type: 'push', url: path })
              }
            )
            return () => unwatch()
          },
          update: (update: { type: string; url: string }) => {
            if (update.type === 'push' || update.type === 'replace') {
              const url = new URL(update.url, location.origin)
              router.push(url.pathname + url.search)
            } else if (update.type === 'pop') {
              router.back()
            }
          },
        },
      })
    }
  }
  document.head.appendChild(script)
})
