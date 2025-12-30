import { enableVisualEditing } from '@sanity/visual-editing'

export default defineNuxtPlugin(() => {
  const router = useRouter()

  // Always enable visual editing - it only activates when inside the Presentation tool iframe
  enableVisualEditing({
    history: {
      subscribe: (navigate) => {
        const unwatch = watch(
          () => router.currentRoute.value.fullPath,
          (path) => {
            navigate({ type: 'push', url: path })
          }
        )
        return () => unwatch()
      },
      update: (update) => {
        if (update.type === 'push' || update.type === 'replace') {
          const url = new URL(update.url, location.origin)
          router.push(url.pathname + url.search)
        } else if (update.type === 'pop') {
          router.back()
        }
      },
    },
  })
})
