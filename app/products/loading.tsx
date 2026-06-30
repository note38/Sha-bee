export default function Loading() {
    return (
        <main className="max-w-6xl mx-auto px-4 py-10">
            <div className="h-9 w-32 bg-gray-200 rounded-lg mb-6 animate-pulse" />
            <div className="flex gap-2 mb-8">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-8 w-20 bg-gray-200 rounded-full animate-pulse" />
                ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                        <div className="aspect-square bg-gray-200 rounded-xl mb-3" />
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                        <div className="h-3 bg-gray-200 rounded w-1/3" />
                    </div>
                ))}
            </div>
        </main>
    )
}