export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface SocialLink {
  _key: string
  name: string
  url: string
}

export interface Settings {
  _id: string
  _type: 'settings'
  defaultMeta?: {
    image?: SanityImage
    imageUrl?: string // Resolved from GROQ: image.asset->url
    description?: string
  }
  socialMedia?: {
    socialLinks?: SocialLink[]
  }
  footer?: {
    tagline?: string
  }
}

// Base type for all page builder blocks
export interface BlockBase {
  _type: string
  _key: string
}

// Block types
export interface TextBlock extends BlockBase {
  _type: 'textBlock'
  heading?: string
  content?: PortableTextBlock[]
}

export type Block = TextBlock // Add more: TextBlock | HeroBlock | GalleryBlock

// Portable Text block type (simplified)
export interface PortableTextBlock {
  _type: string
  _key: string
  children?: Array<{ text: string }>
  [key: string]: unknown
}

export interface Page {
  _id: string
  title: string
  slug: { current: string }
  pageMeta?: {
    image?: {
      asset?: {
        url: string
      }
    }
    description?: string
  }
  components?: Block[]
}