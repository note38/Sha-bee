import { Suspense } from 'react'
import { getFilteredProducts, getAllCategories } from '@/sanity/queries'
import ProductFilters from '../components/ProductFilters'
import ProductCard from '../components/ProductCard'
import type { Product } from '@/sanity/types'

export const revalidate = 60

type Props = {
    searchParams: Promise<{ category?: string; sort?: string; inStock?: string }>
}

export default async function ProductsPage({ searchParams }: Props) {
    const sp = await searchParams   // ← must await in Next.js 16

    const [products, categories] = await Promise.all([
        getFilteredProducts({
            category: sp.category,
            sort: sp.sort as any,
            inStock: sp.inStock === 'true',
        }),
        getAllCategories(),
    ])

    return (
        <main className="max-w-6xl mx-auto px-4 py-10">
            <div className="flex items-baseline justify-between mb-6">
                <h1 className="text-3xl font-bold">Products</h1>
                <span className="text-sm text-gray-400">
                    {products.length} {products.length === 1 ? 'product' : 'products'}
                </span>
            </div>

            <Suspense fallback={<div className="h-10 mb-8" />}>
                <ProductFilters categories={categories} />
            </Suspense>

            {products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product: Product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-gray-400">
                    <p className="text-lg mb-2">No products found</p>
                    <a href="/products" className="text-sm underline">Clear filters</a>
                </div>
            )}
        </main>
    )
}