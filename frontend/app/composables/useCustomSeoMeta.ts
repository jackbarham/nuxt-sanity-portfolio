interface SeoMetaOptions {
  title?: () => string | undefined
  description?: () => string | undefined
  image?: () => string | undefined
}

/**
 * Sets up SEO meta tags with optional title suffix from appTitle
 */
export function useCustomSeoMeta(options: SeoMetaOptions) {
  const { appTitle } = useRuntimeConfig().public

  useSeoMeta({
    title: options.title ? () => `${options.title!()} - ${appTitle}` : undefined,
    ogTitle: options.title ? () => `${options.title!()} - ${appTitle}` : undefined,
    description: options.description,
    ogDescription: options.description,
    ogImage: options.image,
    twitterImage: options.image,
    twitterCard: 'summary_large_image',
  })
}
