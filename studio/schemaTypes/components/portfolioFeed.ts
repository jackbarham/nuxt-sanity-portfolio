import { defineType, defineField } from 'sanity'
import { InlineIcon } from '@sanity/icons'

export const portfolioFeed = defineType({
  name: 'portfolioFeed',
  title: 'Portfolio Feed',
  type: 'object',
  icon: InlineIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'buttonCta',
      title: 'Button CTA',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
        }),
        defineField({
          name: 'link',
          title: 'Link to Page',
          type: 'reference',
          to: [{ type: 'page' }],
        }),
      ],
    }),
    defineField({
      name: 'feedType',
      title: 'Feed Type',
      type: 'string',
      options: {
        list: [
          { title: 'Show Latest Items', value: 'latest' },
          { title: 'Choose Items Manually', value: 'manual' },
        ],
        layout: 'radio',
      },
      initialValue: 'latest',
    }),
    defineField({
      name: 'selectedItems',
      title: 'Selected Portfolio Items',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'portfolio' }],
        },
      ],
      description: 'Choose and reorder portfolio items to display',
      hidden: ({ parent }) => parent?.feedType !== 'manual',
    }),
    defineField({
      name: 'displayCount',
      title: 'Number of Items to Show',
      type: 'string',
      options: {
        list: [
          { title: '3 Items', value: '3' },
          { title: '6 Items', value: '6' },
          { title: 'All Items', value: 'all' },
        ],
        layout: 'radio',
      },
      initialValue: '3',
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      feedType: 'feedType',
      displayCount: 'displayCount',
    },
    prepare({ heading, feedType, displayCount }) {
      const feedLabel = feedType === 'manual' ? 'Manual selection' : 'Latest items'
      const countLabel = displayCount === 'all' ? 'all' : displayCount
      return {
        title: heading || 'Portfolio Feed',
        subtitle: `${feedLabel} • ${countLabel} items`,
        media: InlineIcon,
      }
    },
  },
})
