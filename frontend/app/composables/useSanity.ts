import { createClient } from '@sanity/client'

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

export function useSanityClient() {
  const config = useRuntimeConfig()
  const previewMode = useSanityPreviewMode()

  const client = createClient({
    projectId: config.public.sanity.projectId,
    dataset: config.public.sanity.dataset,
    apiVersion: config.public.sanity.apiVersion,
    useCdn: !previewMode.value,
    perspective: previewMode.value ? 'drafts' : 'published',
    stega: previewMode.value ? {
      enabled: true,
      studioUrl: config.public.sanityVisualEditing.studioUrl,
    } : false,
    token: previewMode.value ? config.public.sanityVisualEditing.token : undefined,
  })

  return client
}

export async function useSanityQuery<T = unknown>(query: string, params: Record<string, string | number | boolean> = {}) {
  const client = useSanityClient()
  const previewMode = useSanityPreviewMode()

  const { data, error } = await useAsyncData(
    `sanity-${query}-${JSON.stringify(params)}-${previewMode.value}`,
    () => client.fetch<T>(query, params)
  )

  return { data, error }
}
