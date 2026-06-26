import { auth, currentUser } from '@clerk/nextjs/server'

export default async function AccountPage() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium">Not signed in</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <h1 className="text-3xl font-semibold">Hello, {user?.firstName}!</h1>
        <p className="mt-3 text-sm text-slate-600">
          Signed in as {user?.emailAddresses?.[0]?.emailAddress ?? 'unknown email'}.
        </p>
      </div>
    </main>
  )
}
