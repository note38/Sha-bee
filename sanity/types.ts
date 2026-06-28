export type Product = {
    _id: string
    name: string
    slug: string
    price: number        // cents e.g. 2999
    inStock: boolean
    image?: string       // first image URL (listing)
    images?: string[]    // all image URLs (detail)
    description?: any[]  // block content
    category?: {
        name: string
        slug: string
    }
    variants?: Variant[]
}

export type Variant = {
    _key: string
    size?: string
    color?: string
    stock: number
    sku?: string
    priceAdjustment: number
}

export type Category = {
    _id: string
    name: string
    slug: string
    description?: string
    image?: string
}