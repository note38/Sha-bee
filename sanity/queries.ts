import { client } from './client'
import type { Product, Category } from './types'

// ─── LOCAL MOCK DATASETS (FALLBACKS) ───────────────────────

export const MOCK_CATEGORIES = [
  {
    _id: 'cat-electronics',
    name: 'Electronics',
    slug: 'electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80',
    description: 'Latest gadgets, smart wearables, and premium accessories.'
  },
  {
    _id: 'cat-fashion',
    name: 'Fashion',
    slug: 'fashion',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
    description: 'Classic denim, premium hoodies, and stylish everyday essentials.'
  },
  {
    _id: 'cat-home-living',
    name: 'Home & Living',
    slug: 'home-living',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80',
    description: 'Handcrafted ceramic sets, soy candles, and minimalist lighting.'
  }
]

export const MOCK_PRODUCTS = [
  // Electronics
  {
    _id: 'prod-headphones',
    name: 'Wireless Noise-Canceling Headphones',
    slug: 'wireless-noise-canceling-headphones',
    price: 19999, // $199.99
    inStock: true,
    category: { name: 'Electronics', slug: 'electronics' },
    description: 'Experience pure sound with industry-leading noise cancellation, long battery life, and comfortable over-ear cups.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'
    ],
    variants: [
      { size: 'Standard', color: 'Matte Black', stock: 25, sku: 'EL-HP-BLK', priceAdjustment: 0 },
      { size: 'Standard', color: 'Platinum Silver', stock: 15, sku: 'EL-HP-SLV', priceAdjustment: 0 }
    ]
  },
  {
    _id: 'prod-smartwatch',
    name: 'Smart Fitness Watch',
    slug: 'smart-fitness-watch',
    price: 12999, // $129.99
    inStock: true,
    category: { name: 'Electronics', slug: 'electronics' },
    description: 'Track your workouts, monitor heart rate, receive notifications, and enjoy up to 7 days of battery life.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'
    ],
    variants: [
      { size: '40mm', color: 'Obsidian Black', stock: 30, sku: 'EL-SW-40-BLK', priceAdjustment: 0 },
      { size: '44mm', color: 'Obsidian Black', stock: 20, sku: 'EL-SW-44-BLK', priceAdjustment: 1000 }
    ]
  },
  {
    _id: 'prod-keyboard',
    name: 'Mechanical Gaming Keyboard',
    slug: 'mechanical-gaming-keyboard',
    price: 8999, // $89.99
    inStock: true,
    category: { name: 'Electronics', slug: 'electronics' },
    description: 'Tactile mechanical switches, customizable RGB backlighting, and durable construction for gaming or typing.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80'
    ],
    variants: [
      { size: 'Tenkeyless', color: 'RGB Black', stock: 12, sku: 'EL-KB-TKL-RGB', priceAdjustment: 0 }
    ]
  },
  // Fashion
  {
    _id: 'prod-denim-jacket',
    name: 'Classic Denim Jacket',
    slug: 'classic-denim-jacket',
    price: 7999, // $79.99
    inStock: true,
    category: { name: 'Fashion', slug: 'fashion' },
    description: 'Timeless style and rugged durability. Features button closures, chest pockets, and an adjustable waist.',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80'
    ],
    variants: [
      { size: 'S', color: 'Indigo Blue', stock: 10, sku: 'FA-DJ-IND-S', priceAdjustment: 0 },
      { size: 'M', color: 'Indigo Blue', stock: 15, sku: 'FA-DJ-IND-M', priceAdjustment: 0 },
      { size: 'L', color: 'Indigo Blue', stock: 8, sku: 'FA-DJ-IND-L', priceAdjustment: 0 }
    ]
  },
  {
    _id: 'prod-hoodie',
    name: 'Premium Cotton Hoodie',
    slug: 'premium-cotton-hoodie',
    price: 5999, // $59.99
    inStock: true,
    category: { name: 'Fashion', slug: 'fashion' },
    description: 'Super-soft brushed fleece interior, adjustable drawstring hood, and front kangaroo pocket. Perfect for layering.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80'
    ],
    variants: [
      { size: 'M', color: 'Charcoal Gray', stock: 20, sku: 'FA-HD-GRY-M', priceAdjustment: 0 },
      { size: 'L', color: 'Charcoal Gray', stock: 20, sku: 'FA-HD-GRY-L', priceAdjustment: 0 }
    ]
  },
  {
    _id: 'prod-backpack',
    name: 'Minimalist Leather Backpack',
    slug: 'minimalist-leather-backpack',
    price: 14999, // $149.99
    inStock: false,
    category: { name: 'Fashion', slug: 'fashion' },
    description: 'Handcrafted from full-grain leather, featuring a padded laptop sleeve, multiple organizer pockets, and comfortable straps.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80'
    ],
    variants: [
      { size: 'Standard', color: 'Tan Brown', stock: 0, sku: 'FA-BP-BRN', priceAdjustment: 0 }
    ]
  },
  // Home & Living
  {
    _id: 'prod-coffee-mug',
    name: 'Ceramic Coffee Mug Set',
    slug: 'ceramic-coffee-mug-set',
    price: 3499, // $34.99
    inStock: true,
    category: { name: 'Home & Living', slug: 'home-living' },
    description: 'A set of 4 earthy, hand-glazed stoneware mugs. Dishwasher and microwave safe.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80'
    ],
    variants: [
      { size: '350ml', color: 'Earthy Clay', stock: 40, sku: 'HL-CM-CLY', priceAdjustment: 0 }
    ]
  },
  {
    _id: 'prod-candle',
    name: 'Aromatic Soy Candle',
    slug: 'aromatic-soy-candle',
    price: 2499, // $24.99
    inStock: true,
    category: { name: 'Home & Living', slug: 'home-living' },
    description: '100% natural soy wax candle infused with lavender and eucalyptus essential oils. Burns for up to 50 hours.',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80'
    ],
    variants: [
      { size: '200g', color: 'Glass Jar', stock: 50, sku: 'HL-SC-LAV', priceAdjustment: 0 }
    ]
  },
  {
    _id: 'prod-lamp',
    name: 'Minimalist Desk Lamp',
    slug: 'minimalist-desk-lamp',
    price: 4500, // $45.00
    inStock: true,
    category: { name: 'Home & Living', slug: 'home-living' },
    description: 'Sleek matte finish with adjustable arm and three color temperature modes. Warm lighting for your workspace.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80'
    ],
    variants: [
      { size: 'Standard', color: 'Matte White', stock: 18, sku: 'HL-DL-WHT', priceAdjustment: 0 }
    ]
  }
]

export const MOCK_HOMEPAGE = {
  heroHeading: 'Elevate Your Lifestyle',
  heroSubheading: 'Explore our curated collection of premium products designed for modern living.',
  heroCtaLabel: 'Shop the Collection',
  heroCtaLink: '/products',
  heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80',
  featuredProducts: MOCK_PRODUCTS.slice(0, 4),
  featuredCategories: MOCK_CATEGORIES
}

// ─── QUERY WRAPPERS WITH MOCK FALLBACKS ────────────────────

export async function getAllProducts() {
  try {
    const res = await client.fetch<Product[]>(`
      *[_type == "product"] | order(_createdAt desc) {
        _id, name, price, inStock,
        "slug": slug.current,
        "image": images[0].asset->url,
        category->{ name, "slug": slug.current }
      }
    `)
    if (res && res.length > 0) return res
  } catch (err) {
    console.warn("getAllProducts query failed. Falling back to mock data.", err)
  }
  return MOCK_PRODUCTS as any[]
}

/** Single product by slug */
export async function getProductBySlug(slug: string) {
  try {
    const res = await client.fetch<any>(`
      *[_type == "product" && slug.current == $slug][0] {
        _id, name, price, inStock, variants, description,
        "slug": slug.current,
        "images": images[].asset->url,
        category->{ name, "slug": slug.current }
      }
    `, { slug })
    if (res) return res
  } catch (err) {
    console.warn(`getProductBySlug query failed for ${slug}. Falling back to mock data.`, err)
  }
  const found = MOCK_PRODUCTS.find(p => p.slug === slug)
  if (found) {
    // If description is a string in mock, map it to Portable Text if needed,
    // but app rendering expects whatever getProductBySlug returns (doesn't currently render description).
    return found as any
  }
  return null
}

/** Products filtered by category slug */
export async function getProductsByCategory(categorySlug: string) {
  try {
    const res = await client.fetch<any[]>(`
      *[_type == "product" && category->slug.current == $categorySlug]
      | order(_createdAt desc) {
        _id, name, price, inStock,
        "slug": slug.current,
        "image": images[0].asset->url
      }
    `, { categorySlug })
    if (res && res.length > 0) return res
  } catch (err) {
    console.warn(`getProductsByCategory query failed for ${categorySlug}. Falling back to mock data.`, err)
  }
  return MOCK_PRODUCTS.filter(p => p.category?.slug === categorySlug) as any[]
}

/** Full-text search by product name */
export async function searchProducts(query: string) {
  try {
    const res = await client.fetch<any[]>(`
      *[_type == "product" && name match $query] {
        _id, name, price,
        "slug": slug.current,
        "image": images[0].asset->url
      }
    `, { query: query + '*' } as any)
    if (res && res.length > 0) return res
  } catch (err) {
    console.warn(`searchProducts query failed for ${query}. Falling back to mock data.`, err)
  }
  const clean = query.toLowerCase()
  return MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(clean)) as any[]
}

/** Sort products by price — direction must be inlined (GROQ doesn't accept $dir) */
export async function getProductsSortedByPrice(dir: 'asc' | 'desc' = 'asc') {
  try {
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
    const res = await client.fetch<any[]>(groq)
    if (res && res.length > 0) return res
  } catch (err) {
    console.warn(`getProductsSortedByPrice query failed. Falling back to mock data.`, err)
  }
  return [...MOCK_PRODUCTS].sort((a, b) => dir === 'desc' ? b.price - a.price : a.price - b.price) as any[]
}

// ─── CATEGORIES ─────────────────────────────────────────

/** All categories */
export async function getAllCategories() {
  try {
    const res = await client.fetch<Category[]>(`
      *[_type == "category"] | order(name asc) {
        _id, name,
        "slug": slug.current,
        "image": image.asset->url
      }
    `)
    if (res && res.length > 0) return res
  } catch (err) {
    console.warn("getAllCategories query failed. Falling back to mock data.", err)
  }
  return MOCK_CATEGORIES as any[]
}

/** Category + its products in one query */
export async function getCategoryWithProducts(slug: string) {
  try {
    const res = await client.fetch<{
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
    if (res && res.category) return res
  } catch (err) {
    console.warn(`getCategoryWithProducts query failed for ${slug}. Falling back to mock data.`, err)
  }
  
  const category = MOCK_CATEGORIES.find(c => c.slug === slug) || null
  const products = MOCK_PRODUCTS.filter(p => p.category?.slug === slug)
  
  return {
    category,
    products: products as any[]
  }
}

export async function getHomepage() {
  try {
    const res = await client.fetch(`
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
    if (res && res.heroHeading) return res
  } catch (err) {
    console.warn("getHomepage query failed. Falling back to mock data.", err)
  }
  return MOCK_HOMEPAGE as any
}

export type ProductFilters = {
  category?: string
  sort?: 'newest' | 'price-asc' | 'price-desc'
  inStock?: boolean
}

export async function getFilteredProducts(filters: ProductFilters = {}) {
  const { category, sort = 'newest', inStock } = filters

  try {
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
    const res = await client.fetch(query, { category })
    if (res && res.length > 0) return res
  } catch (err) {
    console.warn("getFilteredProducts query failed. Falling back to mock data.", err)
  }

  // Filter local mock products
  let products = [...MOCK_PRODUCTS]
  if (category) {
    products = products.filter(p => p.category?.slug === category)
  }
  if (inStock) {
    products = products.filter(p => p.inStock)
  }
  if (sort === 'price-asc') {
    products.sort((a, b) => a.price - b.price)
  } else if (sort === 'price-desc') {
    products.sort((a, b) => b.price - a.price)
  }
  
  return products as any[]
}