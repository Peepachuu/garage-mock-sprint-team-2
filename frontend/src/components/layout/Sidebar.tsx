import Link from 'next/link'
import { LayoutDashboard, User, Settings, Users } from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/team-page', label: 'Team', icon: Users },
]

export function Sidebar() {
  return (
    <aside className="hidden lg:flex w-60 flex-col border-r border-zinc-200 bg-white">
      <div className="flex h-14 items-center px-4 border-b border-zinc-300">
        <span className="font-semibold text-sm text-black">
          {process.env.NEXT_PUBLIC_APP_NAME ?? 'App'}
        </span>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-zinc-100 transition-colors"
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
