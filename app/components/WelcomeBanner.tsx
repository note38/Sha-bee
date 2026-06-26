'use client'

import { useUser } from '@clerk/nextjs'

export default function WelcomeBanner() {
  const { user, isLoaded } = useUser()

  if (!isLoaded || !user) return null

  return <p className="text-sm text-slate-700">Hello, {user.firstName}!</p>
}
