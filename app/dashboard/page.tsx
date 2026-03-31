"use client"

import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UrgentNeedModal } from "@/components/urgent-need-modal"
import { Users, Calendar, HandHeart, MapPin, Clock, UserX, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"

const quickStats = [
  { label: "Active opportunities", value: 7 },
  { label: "Spots still open", value: 28 },
  { label: "Parents available to match", value: 14 },
  { label: "Events this month", value: 2 },
]

const needsAttention = [
  {
    type: "role",
    icon: UserX,
    title: "Secretary position is unfilled",
    subtitle: "2 interested candidates are waiting",
    cta: "Review candidates",
    href: "/committees",
  },
  {
    type: "event",
    icon: AlertTriangle,
    title: "Book Fair Setup has 0 volunteers",
    subtitle: "Event is in 3 weeks · 3 spots needed",
    cta: "Post opportunity",
    href: "/opportunities",
  },
  {
    type: "draft",
    icon: FileText,
    title: "Fun Run opportunities are still in draft",
    subtitle: "Parents can't see them yet",
    cta: "Review & publish",
    href: "/opportunities",
  },
]

const upcomingEvents = [
  {
    name: "Falcon Fun Run",
    date: "Oct 8",
    location: "School Track",
  },
  {
    name: "Scholastic Book Fair",
    date: "Oct 27–31",
    location: "School Library",
  },
  {
    name: "Halloween Parade",
    date: "Oct 29",
    location: "School",
  },
]

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

export default function DashboardPage() {
  return (
    <AdminLayout 
      title="Dashboard" 
      description="Forest Hills Elementary PTO — Here's what needs your attention today."
      headerAction={<UrgentNeedModal />}
    >
      <div className="space-y-6">
        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {quickStats.map((stat) => (
            <div key={stat.label} className="rounded-lg border bg-card p-4">
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Needs Your Attention - Priority Cards */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Needs your attention</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {needsAttention.map((item) => (
              <Card key={item.title} className="flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-orange-600 mb-2">
                    <item.icon className="h-5 w-5" />
                    <span className="text-xs font-medium uppercase tracking-wide">
                      {item.type === "role" ? "Role Gap" : item.type === "event" ? "Event at Risk" : "Draft Sitting Idle"}
                    </span>
                  </div>
                  <CardTitle className="text-base leading-snug">{item.title}</CardTitle>
                  <CardDescription className="text-sm">{item.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-2">
                  <Button asChild variant="outline" className="w-full justify-between">
                    <Link href={item.href}>
                      {item.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-base">Upcoming Events</CardTitle>
                <CardDescription>This month at Forest Hills</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.name} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-medium">
                    {event.date.split(" ")[0]}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{event.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{event.date}</span>
                      <MapPin className="h-3 w-3 ml-1" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
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
      </div>
    </AdminLayout>
  )
}
