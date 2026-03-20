import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, HandHeart } from "lucide-react"
import Link from "next/link"

const quickLinks = [
  {
    title: "Committees",
    description: "Organize and manage your PTO committees",
    href: "/committees",
    icon: Users,
  },
  {
    title: "Events",
    description: "Schedule and track school events",
    href: "/events",
    icon: Calendar,
  },
  {
    title: "Opportunities",
    description: "Post and manage volunteer opportunities",
    href: "/opportunities",
    icon: HandHeart,
  },
]

export default function HomePage() {
  return (
    <AdminLayout 
      title="Dashboard" 
      description="Welcome to BeThere Admin. Manage your PTO activities."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {quickLinks.map((link) => (
          <Link key={link.href} href={link.href} className="block">
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                    <link.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-base">{link.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{link.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </AdminLayout>
  )
}
