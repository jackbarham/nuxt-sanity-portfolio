import { defineType, defineField } from 'sanity'
import { BlockContentIcon } from '@sanity/icons'

export const textBlock = defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Text Block',
        media: BlockContentIcon,
      }
    },
  },
})
