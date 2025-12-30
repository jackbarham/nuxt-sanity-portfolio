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
    description?: string
  }
  socialMedia?: {
    socialLinks?: SocialLink[]
  }
  footer?: {
    tagline?: string
  }
}
