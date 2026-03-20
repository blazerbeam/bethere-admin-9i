"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, ChevronDown, Calendar, Users, BookOpen } from "lucide-react"

type SlotStatus = "filled" | "open"

interface Slot {
  name: string
  status: SlotStatus
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
          { name: "Kindergarten - Anderson", status: "filled" },
          { name: "1st Grade - Hertert", status: "open" },
          { name: "2nd Grade - Peterson", status: "open" }
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
          { name: "Kindergarten - Leach", status: "filled" },
          { name: "3rd Grade - Miller", status: "open" }
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
                  <ul className="ml-6 space-y-1">
                    {item.slots.map((slot, slotIdx) => (
                      <li key={slotIdx} className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">{slot.name}</span>
                        <Badge 
                          variant={slot.status === "filled" ? "secondary" : "outline"}
                          className={`text-xs ${
                            slot.status === "open" 
                              ? "border-orange-300 text-orange-600 bg-orange-50" 
                              : ""
                          }`}
                        >
                          {slot.status === "filled" ? "Filled" : "Open"}
                        </Badge>
                      </li>
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
