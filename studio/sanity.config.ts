import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'

export default defineConfig({
  name: 'default',
  title: 'Nuxt + Sanity Portfolio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  deployment: {
    appId: process.env.SANITY_STUDIO_APP_ID!,
  },

  plugins: [
    structureTool({structure}),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
