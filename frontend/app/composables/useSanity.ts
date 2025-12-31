// Simple groq template literal tag (just returns the string)
export const groq = (strings: TemplateStringsArray, ...values: unknown[]) => {
  return strings.reduce((acc, str, i) => acc + str + (values[i] ?? ''), '')
}

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
