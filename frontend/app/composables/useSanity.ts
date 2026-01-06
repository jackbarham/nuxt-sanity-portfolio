/**
 * GROQ template literal tag for syntax highlighting and editor support.
 * Enables IDE extensions to recognize GROQ queries for highlighting/autocomplete.
 *
 * Example: const query = groq`*[_type == "page" && slug.current == $slug][0]`
 */
export const groq = (strings: TemplateStringsArray, ...values: unknown[]) => {
  return strings.reduce((acc, str, i) => acc + str + (values[i] ?? ''), '')
}

/**
 * Fetches data from Sanity using GROQ queries via the /api/sanity endpoint.
 * Wraps useAsyncData for caching and SSR support.
 *
 * const { data: page } = await useSanityQuery<Page>(
 *   groq`*[_type == "page" && slug.current == $slug][0]`,
 *   { slug: 'about' }
 * )
 */
export async function useSanityQuery<T = unknown>(query: string, params: Record<string, string | number | boolean> = {}) {
  const { data, error } = await useAsyncData(
    `sanity-${query}-${JSON.stringify(params)}`,
    () => $fetch<T>('/api/sanity', {
      method: 'POST',
      body: { query, params },
    })
  )

  return { data, error }
}
