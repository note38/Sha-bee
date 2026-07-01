import { client } from '@/sanity/client'
import { getProductBySlug } from '@/sanity/queries'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
    const slugs = await client.fetch<{ slug: string }[]>(
        '*[_type == "product"]{ "slug": slug.current }'
    )
    return slugs.map((s) => ({ slug: s.slug }))
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const product = await getProductBySlug(slug)

    if (!product) notFound()

    return (
        <main className="max-w-5xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Images */}
                <div className="flex flex-col gap-4">
                    {product.images?.length > 0 ? (
                        product.images.map((url: string, i: number) => (
                            <img
                                key={i}
                                src={url}
                                alt={`${product.name} image ${i + 1}`}
                                className="w-full rounded-xl object-cover"
                            />
                        ))
                    ) : (
                        <div className="w-full aspect-square bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                            No image
                        </div>
                    )}
                </div>

                {/* Details */}
                <div>
                    <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">
                        {product.category?.name}
                    </p>
                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                    <p className="text-2xl font-semibold text-indigo-600 mb-4">
                        ${(product.price / 100).toFixed(2)}
                    </p>
                    <p className={`text-sm mb-6 ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </p>

                    {/* Variants */}
                    {product.variants?.length > 0 && (
                        <div className="mb-6">
                            <p className="font-medium mb-2">Variants</p>
                            <div className="flex flex-wrap gap-2">
                                {product.variants.map((v: any, i: number) => (
                                    <span
                                        key={i}
                                        className="border rounded-md px-3 py-1 text-sm text-gray-700"
                                    >
                                        {v.size && `Size: ${v.size}`}
                                        {v.size && v.color && ' · '}
                                        {v.color && `Color: ${v.color}`}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        disabled={!product.inStock}
                        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </main>
    )
}