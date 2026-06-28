export default function Loading() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 aspect-square rounded-lg mb-3" />
                    <div className="bg-gray-200 h-4 rounded w-3/4 mb-2" />
                    <div className="bg-gray-200 h-3 rounded w-1/2" />
                </div>
        ))}
            </div>
        </div>
    )
}