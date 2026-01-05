import { createClient } from '@sanity/client'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const { query, params = {} } = body

  if (!query) {
    throw createError({
      statusCode: 400,
      message: 'Query is required',
    })
  }

  const client = createClient({
    projectId: config.public.sanity.projectId,
    dataset: config.public.sanity.dataset,
    apiVersion: config.public.sanity.apiVersion,
    useCdn: !import.meta.dev,
  })

  return client.fetch(query, params)
})
