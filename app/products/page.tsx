import { getAllProducts, getAllCategories } from '@/sanity/queries'

export default async function ProductsPage() {

    const [products, categories] = await Promise.all([
        getAllProducts(),
        getAllCategories(),
    ])

    return (
        <main className="max-w-6xl mx-auto px-4 py-10">
            {/* category filter pills */}
            <div className="flex gap-2 mb-6 flex-wrap">
                {categories.map((c: any) => (
                    <a key={c._id} href={`/products?category=${c.slug}`}
                        className="px-3 py-1 rounded-full border text-sm">
                        {c.name}
                    </a>
                ))}
            </div>
            {/* product grid */}
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