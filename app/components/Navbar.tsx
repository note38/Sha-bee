'use client'

import { Show, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import WelcomeBanner from './WelcomeBanner'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm">
      <Link href="/" className="font-bold text-lg">
        Sha-bee
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/products">Products</Link>
        
        <Show when="signed-in">
          <WelcomeBanner />
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Link
                label="My Account"
                labelIcon={<span>👤</span>}
                href="/account"
              />
              <UserButton.Link
                label="My Orders"
                labelIcon={<span>📦</span>}
                href="/account/orders"
              />
            </UserButton.MenuItems>
          </UserButton>
        </Show>

        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="text-sm">Sign in</button>
          </SignInButton>
        </Show>
      </div>
    </nav>
  )
}
