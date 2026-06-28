import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
    const { userId } = await auth()
    if (!userId) {
        redirect('/sign-in')
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-6">My Account</h1>
            <nav className="flex gap-1 mb-8 border-b">
                <Link href="/account/profile"
                    className="px-4 py-2 text-sm font-medium border-b-2 border-transparent hover:border-gray-300">
                    Profile
                </Link>
                <Link href="/account/orders"
                    className="px-4 py-2 text-sm font-medium border-b-2 border-transparent hover:border-gray-300">
                    Orders
                </Link>
            </nav>
            {children}
        </div>
    )
}
