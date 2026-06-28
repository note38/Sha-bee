'use client'
// error boundaries must be client components
export default function Error({ reset }: { reset: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
            <p className="text-gray-500">Failed to load products.</p>
            <button onClick={reset} className="px-4 py-2 bg-black text-white rounded-lg text-sm">
                Try again </button>
        </div>)
}