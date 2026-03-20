import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

const committees = [
  "Art Literacy",
  "Book Fair",
  "Carnival",
  "Classroom Parent Leader",
  "Multi Cultural",
  "5th Grade Celebration + Fundraiser",
  "Family Night",
  "Falcon Outreach",
  "Field Day",
  "First Day School Supplies",
  "Foundation Fundraising",
  "Fun Run",
  "Oregon Battle of the Books",
  "PTO Sponsorships",
  "Round Up / Auction",
  "Science Fair / Art Showcase",
  "Summer Kindergarten Playdates",
  "Spring Dance Party",
  "Holiday Scrip",
  "Staff & Teacher Appreciation",
  "Talent Showcase",
  "Three Bees Garden",
  "Volunteer Coordinator",
  "Yearbook",
  "Run Club",
]

export default function CommitteesPage() {
  return (
    <AdminLayout 
      title="Committees" 
      description="Manage your PTO committees and their members."
    >
      <Card>
        <CardHeader>
          <CardTitle>All Committees</CardTitle>
          <CardDescription>
            {committees.length} committees for Forest Hills PTO activities.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y divide-border">
            {committees.map((committee) => (
              <li key={committee}>
                <button className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-muted/50 transition-colors">
                  <span className="font-medium">{committee}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}
