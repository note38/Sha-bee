import { getHomepage } from '@/sanity/queries'
import Image from 'next/image'
import Link from 'next/link'
import type { Product, Category } from '@/sanity/types'

export const revalidate = 300  // refresh every 5 min

export default async function HomePage() {
  const data = await getHomepage()

  // fallbacks if no homepage doc created in Studio yet
  const heroHeading = data?.heroHeading ?? 'Welcome to Our Store'
  const heroSubheading = data?.heroSubheading ?? 'Discover our latest collection'
  const heroCtaLabel = data?.heroCtaLabel ?? 'Shop Now'
  const heroCtaLink = data?.heroCtaLink ?? '/products'
  const heroImage = data?.heroImage
  const featured = data?.featuredProducts ?? []
  const categories = data?.featuredCategories ?? []

  return (
    <main>

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center
                          justify-center bg-gray-900 text-white overflow-hidden">
        {heroImage && (
          <Image src={heroImage} alt="Hero" fill
            sizes="100vw"
            className="object-cover opacity-50" priority />
        )}
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            {heroHeading}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            {heroSubheading}
          </p>
          <Link href={heroCtaLink}
            className="inline-block bg-white text-black font-semibold
                       px-8 py-3 rounded-full hover:bg-gray-100 transition">
            {heroCtaLabel}
          </Link>
        </div>
      </section>

      {/* ── FEATURED CATEGORIES ──────────────────── */}
      {categories.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((cat: Category) => (
              <Link key={cat._id} href={`/categories/${cat.slug}`}
                className="relative rounded-xl overflow-hidden
                           aspect-video group bg-gray-100">
                {cat.image && (
                  <Image src={cat.image} alt={cat.name} fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-300" />
                )}
                <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                  <span className="text-white font-semibold text-lg">{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── FEATURED PRODUCTS ────────────────────── */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link href="/products"
              className="text-sm text-gray-500 hover:text-black transition">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map((p: Product) => (
              <Link key={p._id} href={`/products/${p.slug}`} className="group">
                <div className="rounded-xl overflow-hidden bg-gray-100 aspect-square mb-3">
                  {p.image && (
                    <Image src={p.image} alt={p.name} width={400} height={400}
                      className="w-full h-full object-cover
                                 group-hover:scale-105 transition duration-300" />
                  )}
                </div>
                <p className="font-medium text-sm mb-1">{p.name}</p>
                <p className="text-gray-500 text-sm">
                  ${(p.price / 100).toFixed(2)}
                </p>
                {!p.inStock && (
                  <span className="text-xs text-red-500">Out of stock</span>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

    </main>
  )
}