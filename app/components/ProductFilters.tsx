'use client'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import type { Category } from '@/sanity/types'

export default function ProductFilters({ categories }: { categories: Category[] }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // ^ already resolved — no await needed, this is a client hook, not the page prop

    function updateParam(key: string, value: string) {
        const params = new URLSearchParams(searchParams.toString())
        value ? params.set(key, value) : params.delete(key)
        router.push(`${pathname}?${params.toString()}`)
    }

    const activeCategory = searchParams.get('category') ?? ''
    const activeSort = searchParams.get('sort') ?? 'newest'
    const activeInStock = searchParams.get('inStock') === 'true'

    return (
        <div className="flex flex-wrap gap-3 items-center mb-8">

            {/* Category pills */}
            <div className="flex gap-2 flex-wrap">
                <button
                    onClick={() => updateParam('category', '')}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${activeCategory === ''
                            ? 'bg-black text-white border-black'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}>
                    All
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat._id}
                        onClick={() => updateParam('category', cat.slug)}
                        className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${activeCategory === cat.slug
                                ? 'bg-black text-white border-black'
                                : 'border-gray-200 hover:border-gray-400'
                            }`}>
                        {cat.name}
                    </button>
                ))}
            </div>

            <div className="h-6 w-px bg-gray-200 hidden md:block" />

            {/* Sort dropdown */}
            <select
                id="product-sort"
                name="sort"
                value={activeSort}
                onChange={(e) => updateParam('sort', e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white">
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
            </select>

            {/* In-stock toggle */}
            <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                    id="filter-in-stock"
                    name="inStock"
                    type="checkbox"
                    checked={activeInStock}
                    onChange={(e) => updateParam('inStock', e.target.checked ? 'true' : '')}
                    className="rounded"
                />
                In stock only
            </label>

            {/* Clear filters — only shows when something is active */}
            {(activeCategory || activeSort !== 'newest' || activeInStock) && (
                <button
                    onClick={() => router.push(pathname)}
                    className="text-sm text-gray-400 hover:text-black transition-colors ml-auto">
                    Clear all
                </button>
            )}

        </div>
    )
}
