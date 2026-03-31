"use client"

import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Plus,
  Users,
  Eye
} from "lucide-react"

interface Opportunity {
  id: string
  title: string
  date: string
  duration: string
  location: string
  status: "open" | "coming-soon"
  spotsNeeded: number
  spotsFilled: number
  tags: string[]
}

const opportunities: Opportunity[] = [
  {
    id: "1",
    title: "Fun Run — Course Marshal",
    date: "October 8",
    duration: "2–3 hrs",
    location: "School Track",
    status: "open",
    spotsNeeded: 4,
    spotsFilled: 1,
    tags: ["outdoor", "event-day", "fun-run"]
  },
  {
    id: "2",
    title: "Fun Run — Registration Table",
    date: "October 8",
    duration: "3 hrs",
    location: "School Track",
    status: "open",
    spotsNeeded: 3,
    spotsFilled: 2,
    tags: ["event-day", "fun-run"]
  },
  {
    id: "3",
    title: "Book Fair — Setup Crew",
    date: "October 27",
    duration: "2 hrs",
    location: "School Library",
    status: "open",
    spotsNeeded: 3,
    spotsFilled: 0,
    tags: ["book-fair", "setup"]
  },
  {
    id: "4",
    title: "Book Fair — Cashier",
    date: "October 27–31",
    duration: "flexible shifts",
    location: "School Library",
    status: "open",
    spotsNeeded: 8,
    spotsFilled: 3,
    tags: ["book-fair", "ongoing"]
  },
  {
    id: "5",
    title: "Spring Dance Party — Event Volunteer",
    date: "February 27",
    duration: "evening (3 hrs)",
    location: "School Gym",
    status: "open",
    spotsNeeded: 6,
    spotsFilled: 0,
    tags: ["event-day", "spring"]
  },
  {
    id: "6",
    title: "Science Night — Setup & Demo Helper",
    date: "March 12",
    duration: "evening (2 hrs)",
    location: "School",
    status: "open",
    spotsNeeded: 4,
    spotsFilled: 0,
    tags: ["event-day", "spring"]
  },
  {
    id: "7",
    title: "Art Literacy — Classroom Session Helper",
    date: "Monthly (Oct–May, no Dec)",
    duration: "2 hrs/session",
    location: "Classrooms",
    status: "open",
    spotsNeeded: 5,
    spotsFilled: 0,
    tags: ["ongoing", "classroom", "art-literacy"]
  },
  {
    id: "8",
    title: "Field Day — Station Volunteer",
    date: "June TBD",
    duration: "half day",
    location: "School Fields",
    status: "coming-soon",
    spotsNeeded: 0,
    spotsFilled: 0,
    tags: ["field-day", "end-of-year"]
  }
]

function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  const isComingSoon = opportunity.status === "coming-soon"
  const progressPercent = opportunity.spotsNeeded > 0 
    ? (opportunity.spotsFilled / opportunity.spotsNeeded) * 100 
    : 0

  return (
    <Card className={`group transition-all hover:shadow-md ${isComingSoon ? "opacity-60" : ""}`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-foreground truncate">
                {opportunity.title}
              </h3>
              {isComingSoon && (
                <Badge variant="secondary" className="shrink-0">
                  Coming Soon
                </Badge>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {opportunity.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {opportunity.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {opportunity.location}
              </span>
            </div>

            {!isComingSoon && (
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Users className="h-3.5 w-3.5" />
                    {opportunity.spotsFilled} of {opportunity.spotsNeeded} spots filled
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {opportunity.spotsNeeded - opportunity.spotsFilled} needed
                  </span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>
            )}

            <div className="flex flex-wrap gap-1.5">
              {opportunity.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="text-xs font-normal px-2 py-0.5"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Button 
            size="sm" 
            variant={isComingSoon ? "outline" : "default"}
            className={!isComingSoon ? "bg-orange-500 hover:bg-orange-600" : ""}
            disabled={isComingSoon}
          >
            <Eye className="h-4 w-4 mr-1.5" />
            {isComingSoon ? "View" : "Manage"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function OpportunitiesPage() {
  const activeOpportunities = opportunities.filter(o => o.status === "open")
  const comingSoonOpportunities = opportunities.filter(o => o.status === "coming-soon")

  return (
    <AdminLayout 
      title="Opportunities" 
      description="Manage volunteer opportunities for parents and community members."
    >
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle>Active Opportunities</CardTitle>
              <CardDescription>
                {activeOpportunities.length} opportunities currently accepting volunteers
              </CardDescription>
            </div>
            <Button size="sm" className="gap-1.5 bg-orange-500 hover:bg-orange-600">
              <Plus className="h-4 w-4" />
              New Opportunity
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </CardContent>
        </Card>

        {comingSoonOpportunities.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription>
                Future opportunities not yet open for sign-ups
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {comingSoonOpportunities.map((opportunity) => (
                <OpportunityCard key={opportunity.id} opportunity={opportunity} />
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
