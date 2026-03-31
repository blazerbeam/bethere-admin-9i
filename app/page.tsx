import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, HandHeart, AlertCircle, MapPin, Clock } from "lucide-react"
import Link from "next/link"

const summaryMetrics = [
  {
    title: "Active Opportunities",
    value: 7,
    description: "Volunteer opportunities",
    href: "/opportunities",
    icon: HandHeart,
  },
  {
    title: "Spots Needed",
    value: 28,
    description: "Volunteers still needed",
    href: "/opportunities",
    icon: Users,
  },
  {
    title: "Events This Month",
    value: 2,
    description: "Fun Run Oct 8, Book Fair Oct 27–31",
    href: "/events",
    icon: Calendar,
  },
  {
    title: "Needs Attention",
    value: 3,
    description: "Committees need help",
    href: "/committees",
    icon: AlertCircle,
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

const needsAttention = [
  {
    role: "Secretary",
    status: "No one assigned",
    detail: "2 candidates interested",
    urgency: "high",
  },
  {
    role: "Fundraising Chair",
    status: "No one assigned",
    detail: "1 candidate interested",
    urgency: "high",
  },
  {
    role: "Room Parent: 1st Grade Hertert",
    status: "Lead assigned",
    detail: "Needs support volunteer",
    urgency: "medium",
  },
  {
    role: "Book Fair Setup Crew",
    status: "0 of 3 spots filled",
    detail: "Event in 3 weeks",
    urgency: "high",
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

export default function HomePage() {
  return (
    <AdminLayout 
      title="Dashboard" 
      description="Forest Hills Elementary PTO — Manage your activities and volunteers."
    >
      <div className="space-y-6">
        {/* Summary Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {summaryMetrics.map((metric) => (
            <Link key={metric.title} href={metric.href} className="block">
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardDescription>{metric.title}</CardDescription>
                    <metric.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
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

          {/* Needs Attention */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                  <AlertCircle className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <CardTitle className="text-base">Needs Attention</CardTitle>
                  <CardDescription>Roles and spots to fill</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {needsAttention.map((item) => (
                  <div key={item.role} className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{item.role}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.status} · {item.detail}
                      </p>
                    </div>
                    <Badge 
                      variant={item.urgency === "high" ? "destructive" : "secondary"}
                      className="shrink-0"
                    >
                      {item.urgency === "high" ? "Urgent" : "Needs help"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

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
