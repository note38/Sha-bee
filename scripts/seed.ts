import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'

// ─── LOAD ENVIRONMENT VARIABLES MANUALLY ───────────────────
function loadEnv() {
  try {
    const envPath = path.resolve(process.cwd(), '.env.local')
    if (!fs.existsSync(envPath)) {
      console.warn('.env.local file not found at:', envPath)
      return
    }
    const content = fs.readFileSync(envPath, 'utf-8')
    content.split(/\r?\n/).forEach(line => {
      // ignore comments and empty lines
      if (!line || line.trim().startsWith('#')) return
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
      if (match) {
        const key = match[1]
        let value = match[2] || ''
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.substring(1, value.length - 1)
        } else if (value.startsWith("'") && value.endsWith("'")) {
          value = value.substring(1, value.length - 1)
        }
        process.env[key] = value.trim()
      }
    })
    console.log('Successfully loaded .env.local environment variables.')
  } catch (err) {
    console.error('Failed to parse .env.local:', err)
  }
}

loadEnv()

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId || !token) {
  console.error('CRITICAL ERROR: NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN must be defined in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false, // Disable CDN for write operations
})

// Helper to convert string to Portable Text block representation
function stringToPortableText(text: string) {
  return [
    {
      _type: 'block',
      _key: 'block-' + Math.random().toString(36).substring(2, 11),
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: 'span-' + Math.random().toString(36).substring(2, 11),
          text: text,
          marks: []
        }
      ]
    }
  ]
}

// Helper to download an image from a URL and upload it to Sanity
async function uploadImageFromUrl(url: string, filename: string) {
  console.log(`Downloading image for ${filename}...`)
  try {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Failed to fetch image ${url}: ${res.statusText}`)
    }
    const arrayBuffer = await res.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    console.log(`Uploading ${filename} to Sanity assets...`)
    const asset = await client.assets.upload('image', buffer, { filename })
    console.log(`Uploaded asset: ${asset._id}`)
    return asset
  } catch (error) {
    console.error(`Error uploading image ${filename} from ${url}:`, error)
    return null
  }
}

// ─── DATA TO SEED ─────────────────────────────────────────

const categoriesToSeed = [
  {
    _id: 'cat-electronics',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest gadgets, smart wearables, and premium accessories.',
    imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80'
  },
  {
    _id: 'cat-fashion',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Classic denim, premium hoodies, and stylish everyday essentials.',
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80'
  },
  {
    _id: 'cat-home-living',
    name: 'Home & Living',
    slug: 'home-living',
    description: 'Handcrafted ceramic sets, soy candles, and minimalist lighting.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80'
  }
]

const productsToSeed = [
  // Electronics
  {
    _id: 'prod-headphones',
    name: 'Wireless Noise-Canceling Headphones',
    slug: 'wireless-noise-canceling-headphones',
    price: 19999, // $199.99
    inStock: true,
    categoryRef: 'cat-electronics',
    description: 'Experience pure sound with industry-leading noise cancellation, long battery life, and comfortable over-ear cups.',
    imageUrls: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'],
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
    categoryRef: 'cat-electronics',
    description: 'Track your workouts, monitor heart rate, receive notifications, and enjoy up to 7 days of battery life.',
    imageUrls: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'],
    variants: [
      { size: '40mm', color: 'Obsidian Black', stock: 30, sku: 'EL-SW-40-BLK', priceAdjustment: 0 },
      { size: '44mm', color: 'Obsidian Black', stock: 20, sku: 'EL-SW-44-BLK', priceAdjustment: 1000 } // +$10
    ]
  },
  {
    _id: 'prod-keyboard',
    name: 'Mechanical Gaming Keyboard',
    slug: 'mechanical-gaming-keyboard',
    price: 8999, // $89.99
    inStock: true,
    categoryRef: 'cat-electronics',
    description: 'Tactile mechanical switches, customizable RGB backlighting, and durable construction for gaming or typing.',
    imageUrls: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80'],
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
    categoryRef: 'cat-fashion',
    description: 'Timeless style and rugged durability. Features button closures, chest pockets, and an adjustable waist.',
    imageUrls: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80'],
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
    categoryRef: 'cat-fashion',
    description: 'Super-soft brushed fleece interior, adjustable drawstring hood, and front kangaroo pocket. Perfect for layering.',
    imageUrls: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80'],
    variants: [
      { size: 'M', color: 'Charcoal Gray', stock: 20, sku: 'FA-HD-GRY-M', priceAdjustment: 0 },
      { size: 'L', color: 'Charcoal Gray', stock: 20, sku: 'FA-HD-GRY-L', priceAdjustment: 0 },
      { size: 'M', color: 'Olive Green', stock: 15, sku: 'FA-HD-OLV-M', priceAdjustment: 0 }
    ]
  },
  {
    _id: 'prod-backpack',
    name: 'Minimalist Leather Backpack',
    slug: 'minimalist-leather-backpack',
    price: 14999, // $149.99
    inStock: false, // out of stock
    categoryRef: 'cat-fashion',
    description: 'Handcrafted from full-grain leather, featuring a padded laptop sleeve, multiple organizer pockets, and comfortable straps.',
    imageUrls: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80'],
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
    categoryRef: 'cat-home-living',
    description: 'A set of 4 earthy, hand-glazed stoneware mugs. Dishwasher and microwave safe.',
    imageUrls: ['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80'],
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
    categoryRef: 'cat-home-living',
    description: '100% natural soy wax candle infused with lavender and eucalyptus essential oils. Burns for up to 50 hours.',
    imageUrls: ['https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80'],
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
    categoryRef: 'cat-home-living',
    description: 'Sleek matte finish with adjustable arm and three color temperature modes. Warm lighting for your workspace.',
    imageUrls: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80'],
    variants: [
      { size: 'Standard', color: 'Matte White', stock: 18, sku: 'HL-DL-WHT', priceAdjustment: 0 }
    ]
  }
]

async function seed() {
  console.log('Starting seed process...')
  
  // ─── 1. CLEAN UP PREVIOUS MOCK DOCUMENTS ─────────────────
  console.log('Cleaning up existing mock documents...')
  try {
    // Delete homepage
    await client.delete({ query: '*[_type == "homepage"]' })
    // Delete products
    await client.delete({ query: '*[_type == "product"]' })
    // Delete categories
    await client.delete({ query: '*[_type == "category"]' })
    console.log('Cleaned up previous data successfully.')
  } catch (error) {
    console.warn('Error during cleanup (continuing anyway):', error)
  }

  // ─── 2. SEED CATEGORIES ─────────────────────────────────
  console.log('\n--- Seeding Categories ---')
  const seededCategories: Record<string, string> = {}
  
  for (const cat of categoriesToSeed) {
    let imageAssetRef: any = null
    if (cat.imageUrl) {
      const asset = await uploadImageFromUrl(cat.imageUrl, `category-${cat.slug}.jpg`)
      if (asset) {
        imageAssetRef = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id
          }
        }
      }
    }

    const doc = {
      _type: 'category',
      _id: cat._id,
      name: cat.name,
      slug: {
        _type: 'slug',
        current: cat.slug
      },
      description: cat.description,
      ...(imageAssetRef && { image: imageAssetRef })
    }

    console.log(`Creating category: ${cat.name}`)
    const createdCat = await client.createOrReplace(doc)
    seededCategories[cat._id] = createdCat._id
    console.log(`Created category with ID: ${createdCat._id}`)
  }

  // ─── 3. SEED PRODUCTS ───────────────────────────────────
  console.log('\n--- Seeding Products ---')
  const seededProductIds: string[] = []
  
  for (const prod of productsToSeed) {
    const uploadedImages = []
    for (let i = 0; i < prod.imageUrls.length; i++) {
      const asset = await uploadImageFromUrl(prod.imageUrls[i], `product-${prod.slug}-${i + 1}.jpg`)
      if (asset) {
        uploadedImages.push({
          _key: 'img-' + Math.random().toString(36).substring(2, 11),
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id
          }
        })
      }
    }

    const doc = {
      _type: 'product',
      _id: prod._id,
      name: prod.name,
      slug: {
        _type: 'slug',
        current: prod.slug
      },
      price: prod.price,
      inStock: prod.inStock,
      category: {
        _type: 'reference',
        _ref: seededCategories[prod.categoryRef]
      },
      description: stringToPortableText(prod.description),
      images: uploadedImages,
      variants: prod.variants.map(v => ({
        _key: 'var-' + Math.random().toString(36).substring(2, 11),
        size: v.size,
        color: v.color,
        stock: v.stock,
        sku: v.sku,
        priceAdjustment: v.priceAdjustment
      }))
    }

    console.log(`Creating product: ${prod.name}`)
    const createdProd = await client.createOrReplace(doc)
    seededProductIds.push(createdProd._id)
    console.log(`Created product with ID: ${createdProd._id}`)
  }

  // ─── 4. SEED HOMEPAGE ───────────────────────────────────
  console.log('\n--- Seeding Homepage ---')
  
  const heroImageUrl = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80'
  const heroAsset = await uploadImageFromUrl(heroImageUrl, 'hero-bg.jpg')
  let heroImageAssetRef = null
  if (heroAsset) {
    heroImageAssetRef = {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: heroAsset._id
      }
    }
  }

  const homepageDoc = {
    _type: 'homepage',
    _id: 'singleton-homepage',
    heroHeading: 'Elevate Your Lifestyle',
    heroSubheading: 'Explore our curated collection of premium products designed for modern living.',
    heroCtaLabel: 'Shop the Collection',
    heroCtaLink: '/products',
    ...(heroImageAssetRef && { heroImage: heroImageAssetRef }),
    featuredProducts: seededProductIds.slice(0, 4).map(id => ({
      _key: 'feat-prod-' + Math.random().toString(36).substring(2, 11),
      _type: 'reference',
      _ref: id
    })),
    featuredCategories: Object.values(seededCategories).map(id => ({
      _key: 'feat-cat-' + Math.random().toString(36).substring(2, 11),
      _type: 'reference',
      _ref: id
    }))
  }

  console.log('Creating homepage singleton document...')
  const createdHomepage = await client.createOrReplace(homepageDoc)
  console.log(`Created homepage with ID: ${createdHomepage._id}`)

  console.log('\nSeeding completed successfully! 🎉')
}

seed().catch(err => {
  console.error('Fatal error seeding database:', err)
  process.exit(1)
})
