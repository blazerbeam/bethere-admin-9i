"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, ChevronDown, Calendar, Users, BookOpen } from "lucide-react"

interface Volunteer {
  name: string
  role?: "lead" | "co-lead" | "support"
}

interface Slot {
  name: string
  volunteers: Volunteer[]
  needsMore?: boolean
}

interface CommitteeItem {
  type: "event" | "role" | "program"
  name: string
  slots?: Slot[]
  description?: string
}

interface Committee {
  name: string
  items?: CommitteeItem[]
}

const committees: Committee[] = [
  {
    name: "Fun Run",
    items: [
      { type: "event", name: "Annual Fun Run" }
    ]
  },
  {
    name: "Book Fair",
    items: [
      { type: "event", name: "Fall Book Fair" },
      { type: "event", name: "Spring Book Fair" }
    ]
  },
  {
    name: "Classroom Parent Leader",
    items: [
      { 
        type: "role", 
        name: "Room Parent",
        slots: [
          { 
            name: "Kindergarten - Anderson", 
            volunteers: [
              { name: "Leia Wien", role: "lead" },
              { name: "Taryn Hatchel", role: "support" },
              { name: "Brynee Fletcher", role: "support" },
              { name: "Joe Dobbyn", role: "support" },
              { name: "Carly Lagusis", role: "support" }
            ]
          },
          { 
            name: "Kindergarten - Leach", 
            volunteers: [
              { name: "Kelly Robinson", role: "lead" },
              { name: "Erin Kirkpatrick", role: "support" },
              { name: "Renee Canazaro", role: "support" },
              { name: "Becca Kraus", role: "support" }
            ]
          },
          { 
            name: "1st Grade - Hertert", 
            volunteers: [
              { name: "Katarina Harding", role: "lead" }
            ],
            needsMore: true
          },
          { 
            name: "1st Grade - Bengston", 
            volunteers: [
              { name: "Caitlin Heitz", role: "lead" },
              { name: "Amy Renalds", role: "support" },
              { name: "Meena Tappouni", role: "support" }
            ]
          },
          { 
            name: "2nd Grade - Peterson", 
            volunteers: [
              { name: "Jennifer Mozinski", role: "lead" },
              { name: "Svetlana Darling", role: "support" },
              { name: "Jill Cabral Schinn", role: "support" },
              { name: "Johannes Ruhl", role: "support" }
            ]
          },
          { 
            name: "3rd Grade - Miller", 
            volunteers: [
              { name: "Stephanie Knight", role: "lead" },
              { name: "Amy Pfieffer", role: "support" },
              { name: "Erin Kirkpatrick", role: "support" }
            ]
          },
          { 
            name: "4th Grade - Wright", 
            volunteers: [
              { name: "Sonal Haladay", role: "co-lead" },
              { name: "Beth Anteparra-Naujock", role: "co-lead" }
            ],
            needsMore: true
          },
          { 
            name: "5th Grade - Young", 
            volunteers: [
              { name: "Kate Vance", role: "lead" },
              { name: "Esther Choo", role: "support" },
              { name: "Jenni Shawcross", role: "support" }
            ]
          },
          { 
            name: "5th Grade - Vaughan", 
            volunteers: [
              { name: "Michelle Smigel", role: "lead" }
            ],
            needsMore: true
          }
        ]
      }
    ]
  },
  {
    name: "Classroom Photographers",
    items: [
      {
        type: "role",
        name: "Photographer",
        slots: [
          { 
            name: "Kindergarten - Leach", 
            volunteers: [
              { name: "Lisa Boomer" },
              { name: "Julia Daigneault" },
              { name: "Lindsay Amiri" }
            ]
          },
          { 
            name: "3rd Grade - Miller", 
            volunteers: [
              { name: "Brittany Tanner" },
              { name: "Bridget Thompson" }
            ]
          },
          { 
            name: "4th Grade - Bartlett", 
            volunteers: [
              { name: "Inna King" },
              { name: "Nicole Woodruff" },
              { name: "Taryn Hatchel" }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Art Literacy",
    items: [
      {
        type: "program",
        name: "Monthly Classroom Sessions",
        description: "Needs 5+ volunteers per class"
      }
    ]
  },
  { name: "Carnival" },
  { name: "Multi Cultural" },
  { name: "5th Grade Celebration + Fundraiser" },
  { name: "Family Night" },
  { name: "Falcon Outreach" },
  { name: "Field Day" },
  { name: "First Day School Supplies" },
  { name: "Foundation Fundraising" },
  { name: "Oregon Battle of the Books" },
  { name: "PTO Sponsorships" },
  { name: "Round Up / Auction" },
  { name: "Science Fair / Art Showcase" },
  { name: "Summer Kindergarten Playdates" },
  { name: "Spring Dance Party" },
  { name: "Holiday Scrip" },
  { name: "Staff & Teacher Appreciation" },
  { name: "Talent Showcase" },
  { name: "Three Bees Garden" },
  { name: "Volunteer Coordinator" },
  { name: "Yearbook" },
  { name: "Run Club" },
]

function ItemTypeIcon({ type }: { type: "event" | "role" | "program" }) {
  switch (type) {
    case "event":
      return <Calendar className="h-4 w-4 text-blue-600" />
    case "role":
      return <Users className="h-4 w-4 text-amber-600" />
    case "program":
      return <BookOpen className="h-4 w-4 text-emerald-600" />
  }
}

function ItemTypeBadge({ type }: { type: "event" | "role" | "program" }) {
  const variants: Record<string, string> = {
    event: "bg-blue-50 text-blue-700 border-blue-200",
    role: "bg-amber-50 text-amber-700 border-amber-200",
    program: "bg-emerald-50 text-emerald-700 border-emerald-200",
  }
  
  return (
    <Badge variant="outline" className={`text-xs capitalize ${variants[type]}`}>
      {type}
    </Badge>
  )
}

function SlotDisplay({ slot }: { slot: Slot }) {
  const hasVolunteers = slot.volunteers.length > 0
  const leads = slot.volunteers.filter(v => v.role === "lead")
  const coLeads = slot.volunteers.filter(v => v.role === "co-lead")
  const supporters = slot.volunteers.filter(v => v.role === "support")
  const unroledVolunteers = slot.volunteers.filter(v => !v.role)

  return (
    <li className="text-sm">
      <div className="flex items-start gap-2">
        <span className="text-muted-foreground font-medium">{slot.name}</span>
        {!hasVolunteers && (
          <Badge 
            variant="outline"
            className="text-xs border-orange-300 text-orange-600 bg-orange-50"
          >
            Open
          </Badge>
        )}
        {slot.needsMore && hasVolunteers && (
          <Badge 
            variant="outline"
            className="text-xs border-amber-300 text-amber-600 bg-amber-50"
          >
            Needs support
          </Badge>
        )}
      </div>
      
      {hasVolunteers && (
        <div className="mt-1 ml-4 space-y-0.5">
          {coLeads.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Co-Leads:</span>
              <span className="text-sm">{coLeads.map(v => v.name).join(", ")}</span>
            </div>
          )}
          {leads.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Lead:</span>
              <span className="text-sm">{leads.map(v => v.name).join(", ")}</span>
            </div>
          )}
          {supporters.length > 0 && (
            <div className="flex items-start gap-2">
              <span className="text-xs text-muted-foreground">Support:</span>
              <span className="text-sm text-muted-foreground">
                {supporters.map(v => v.name).join(", ")}
              </span>
            </div>
          )}
          {unroledVolunteers.length > 0 && (
            <div className="text-sm">
              {unroledVolunteers.map(v => v.name).join(", ")}
            </div>
          )}
        </div>
      )}
    </li>
  )
}

function CommitteeRow({ committee }: { committee: Committee }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasItems = committee.items && committee.items.length > 0

  return (
    <li>
      <button 
        className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-muted/50 transition-colors"
        onClick={() => hasItems && setIsExpanded(!isExpanded)}
        disabled={!hasItems}
      >
        <span className="font-medium">{committee.name}</span>
        {hasItems ? (
          isExpanded ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )
        ) : (
          <span className="text-xs text-muted-foreground">No items yet</span>
        )}
      </button>
      
      {isExpanded && committee.items && (
        <div className="border-t bg-muted/30 px-6 py-3">
          <ul className="space-y-3">
            {committee.items.map((item, idx) => (
              <li key={idx} className="space-y-2">
                <div className="flex items-center gap-2">
                  <ItemTypeIcon type={item.type} />
                  <span className="text-sm font-medium">{item.name}</span>
                  <ItemTypeBadge type={item.type} />
                </div>
                
                {item.slots && (
                  <ul className="ml-6 space-y-3">
                    {item.slots.map((slot, slotIdx) => (
                      <SlotDisplay key={slotIdx} slot={slot} />
                    ))}
                  </ul>
                )}
                
                {item.description && (
                  <p className="ml-6 text-sm text-muted-foreground">{item.description}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  )
}

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
              <CommitteeRow key={committee.name} committee={committee} />
            ))}
          </ul>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}
