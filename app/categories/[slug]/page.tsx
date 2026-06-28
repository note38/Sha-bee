import { client } from '@/sanity/client'
import { getCategoryWithProducts } from '@/sanity/queries'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
    const slugs = await client.fetch<{ slug: string }[]>(
        '*[_type == "category"]{ "slug": slug.current }'
    )
    return slugs.map((s) => ({ slug: s.slug }))
}

export default async function CategoryPage({
    params,
}: {
    params: { slug: string }
}) {
    const { category, products } = await getCategoryWithProducts(params.slug)

    if (!category) notFound()  // shows Next.js 404 page

    return (
        <main className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
            <p className="text-gray-500 mb-8">{category.description}</p>
            <p className="text-sm text-gray-400 mb-4">
                {products.length} products
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((p: any) => (
                    <a key={p._id} href={`/products/${p.slug}`}
                        className="border rounded-lg overflow-hidden">
                        <img src={p.image} alt={p.name}
                            className="w-full aspect-square object-cover" />
                        <div className="p-3">
                            <p className="font-medium text-sm">{p.name}</p>
                            <p className="text-gray-500 text-sm">
                                ${(p.price / 100).toFixed(2)}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </main>
    )
}