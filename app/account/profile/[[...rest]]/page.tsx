import { UserProfile } from '@clerk/nextjs'

export default function ProfilePage() {
  return (
    <UserProfile
      path="/account/profile"   // must match your route
      routing="path"            // uses URL path for sub-routes
      appearance={{
        elements: {
          rootBox: 'w-full',
          card: 'shadow-none border border-gray-200 rounded-xl w-full',
        },
      }}
    />
  )
}
