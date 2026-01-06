import type { StructureResolver } from 'sanity/structure'
import { CogIcon } from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Settings singleton
      S.listItem()
        .title('Settings')
        .icon(CogIcon)
        .child(S.document().schemaType('settings').documentId('settings')),

      S.divider(),

      // All other document types (excluding settings from the default list)
      ...S.documentTypeListItems().filter(
        (listItem) => !['settings'].includes(listItem.getId() ?? '')
      ),
    ])
