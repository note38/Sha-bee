import { client } from './client'
import type { Product, Category } from './types'

export async function getAllProducts() {
  return client.fetch<Product[]>(`
    *[_type == "product"] | order(_createdAt desc) {
      _id, name, price, inStock,
      "slug": slug.current,
      "image": images[0].asset->url,
      category->{ name, "slug": slug.current }
    }
  `)
}

/** Single product by slug */
export async function getProductBySlug(slug: string) {
  return client.fetch<any>(`
    *[_type == "product" && slug.current == $slug][0] {
      _id, name, price, inStock, variants, description,
      "slug": slug.current,
      "images": images[].asset->url,
      category->{ name, "slug": slug.current }
    }
  `, { slug })
}

/** Products filtered by category slug */
export async function getProductsByCategory(categorySlug: string) {
  return client.fetch<any[]>(`
    *[_type == "product" && category->slug.current == $categorySlug]
    | order(_createdAt desc) {
      _id, name, price, inStock,
      "slug": slug.current,
      "image": images[0].asset->url
    }
  `, { categorySlug })
}

/** Full-text search by product name */
export async function searchProducts(query: string) {
  // Append '*' for prefix matching; cast params to any to satisfy typed client
  return client.fetch<any[]>(`
    *[_type == "product" && name match $query] {
      _id, name, price,
      "slug": slug.current,
      "image": images[0].asset->url
    }
  `, { query: query + '*' } as any)
}

/** Sort products by price — direction must be inlined (GROQ doesn't accept $dir) */
export async function getProductsSortedByPrice(dir: 'asc' | 'desc' = 'asc') {
  const groq = dir === 'desc'
    ? `*[_type == "product"] | order(price desc) {
      _id, name, price,
      "slug": slug.current,
      "image": images[0].asset->url
    }`
    : `*[_type == "product"] | order(price asc) {
      _id, name, price,
      "slug": slug.current,
      "image": images[0].asset->url
    }`

  return client.fetch<any[]>(groq)
}

// ─── CATEGORIES ─────────────────────────────────────────

/** All categories */
export async function getAllCategories() {
  return client.fetch<Category[]>(`
    *[_type == "category"] | order(name asc) {
      _id, name,
      "slug": slug.current,
      "image": image.asset->url
    }
  `)
}

/** Category + its products in one query */
export async function getCategoryWithProducts(slug: string) {
  return client.fetch<{
    category: {
      _id: string
      name: string
      description?: string
      slug: string
      image?: string
    } | null
    products: any[]
  }>(`
    {
      "category": *[_type == "category" && slug.current == $slug][0] {
        _id, name, description,
        "slug": slug.current,
        "image": image.asset->url
      },
      "products": *[_type == "product" && category->slug.current == $slug] {
        _id, name, price,
        "slug": slug.current,
        "image": images[0].asset->url
      }
    }
  `, { slug })
}
export async function getHomepage() {
  return client.fetch(`
    *[_type == "homepage"][0] {
      heroHeading,
      heroSubheading,
      heroCtaLabel,
      heroCtaLink,
      "heroImage": heroImage.asset->url,

      "featuredProducts": featuredProducts[]->{ 
        _id, name, price, inStock,
        "slug": slug.current,
        "image": images[0].asset->url,
        category->{ name, "slug": slug.current }
      },

      "featuredCategories": featuredCategories[]->{
        _id, name,
        "slug": slug.current,
        "image": image.asset->url
      }
    }
  `)
}

export type ProductFilters = {
  category?: string
  sort?: 'newest' | 'price-asc' | 'price-desc'
  inStock?: boolean
}

export async function getFilteredProducts(filters: ProductFilters = {}) {
  const { category, sort = 'newest', inStock } = filters

  // build filter conditions array
  const conditions = ['_type == "product"']
  if (category) conditions.push('category->slug.current == $category')
  if (inStock) conditions.push('inStock == true')

  // map sort param to GROQ order clause
  const sortMap = {
    newest: '_createdAt desc',
    'price-asc': 'price asc',
    'price-desc': 'price desc',
  }
  const order = sortMap[sort] ?? '_createdAt desc'

  const query = `
    *[${conditions.join(' && ')}] | order(${order}) {
      _id, name, price, inStock,
      "slug": slug.current,
      "image": images[0].asset->url,
      category->{ name, "slug": slug.current }
    }
  `

  return client.fetch(query, { category })
}