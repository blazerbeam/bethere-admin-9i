"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Users, Calendar, HandHeart, LayoutGrid } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutGrid,
  },
  {
    label: "Committees",
    href: "/committees",
    icon: Users,
  },
  {
    label: "Events",
    href: "/events",
    icon: Calendar,
  },
  {
    label: "Opportunities",
    href: "/opportunities",
    icon: HandHeart,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-56 flex-col border-r border-border bg-sidebar">
      <div className="flex h-14 items-center border-b border-border px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-lg font-semibold text-sidebar-foreground">
            BeThere
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            Admin
          </span>
        </Link>
      </div>
      <nav className="flex-1 p-3">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
