// Simple groq template literal tag (just returns the string)
export const groq = (strings: TemplateStringsArray, ...values: unknown[]) => {
  return strings.reduce((acc, str, i) => acc + str + (values[i] ?? ''), '')
}

// Detect if we're inside the Sanity Presentation tool iframe
export function useVisualEditingEnabled() {
  return useState('visual-editing-enabled', () => {
    if (import.meta.client) {
      try {
        return window.parent !== window
      } catch {
        return false
      }
    }
    return false
  })
}

export function useSanityPreviewMode() {
  const cookie = useCookie('sanity-preview')
  const inIframe = useVisualEditingEnabled()
  return computed(() => cookie.value === 'true' || inIframe.value)
}

export async function useSanityQuery<T = unknown>(query: string, params: Record<string, string | number | boolean> = {}) {
  const previewMode = useSanityPreviewMode()
  const isPreview = previewMode.value

  const { data, error } = await useAsyncData(
    `sanity-${query}-${JSON.stringify(params)}-${isPreview}`,
    () => $fetch<T>('/api/sanity', {
      method: 'POST',
      body: { query, params, preview: isPreview },
    })
  )

  return { data, error }
}
