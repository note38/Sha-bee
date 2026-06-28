import { auth, currentUser } from '@clerk/nextjs/server'

export default async function OrdersPage() {
    const { userId } = await auth()
    const user = await currentUser()
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Order History</h2>
            <div className="border border-dashed border-gray-200 rounded-xl p-10 text-center text-gray-400 text-sm">
                <p>No orders yet, {user?.firstName}.</p>
                <a href="/products" className="mt-3 inline-block text-black underline text-sm">
                    Start shopping → </a>
            </div>
        </div>
    )
}