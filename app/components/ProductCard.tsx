import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/sanity/types'

export default function ProductCard({ product }: { product: Product }) {
    const { name, price, slug, image, inStock } = product

    return (
        <Link href={`/products/${slug}`} className="group block">
            <div className="relative rounded-xl overflow-hidden
                      bg-gray-100 aspect-square mb-3">
                {image ? (
                    <Image
                        src={image}
                        alt={name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center
                          text-gray-300 text-sm">
                        No image
                    </div>
                )}

                {!inStock && (
                    <span className="absolute top-2 left-2 bg-white text-xs font-medium
                           px-2 py-1 rounded-full text-gray-500 shadow-sm">
                        Sold out
                    </span>
                )}
            </div>

            <p className="font-medium text-sm mb-0.5 group-hover:underline line-clamp-1">
                {name}
            </p>
            <p className="text-gray-500 text-sm">
                ${(price / 100).toFixed(2)}
            </p>
        </Link>
    )
}