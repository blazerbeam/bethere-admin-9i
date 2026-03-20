"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, ChevronDown, Calendar, Users, BookOpen, MoreHorizontal, Copy, Sparkles, Tags, ListTodo, UserPlus, Mail, Plus, X, ExternalLink, User, Crown, DollarSign, Megaphone, GraduationCap, Heart, TreePine } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Volunteer {
  name: string
  role?: "lead" | "co-lead" | "support"
}

interface InterestedPerson {
  name: string
  interest?: "lead" | "support" | "general"
}

interface Slot {
  name: string
  volunteers: Volunteer[]
  needsMore?: boolean
  interested?: InterestedPerson[]
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
  tags?: string[]
  category?: "classroom" | "events" | "programs" | "fundraising" | "operations"
}

interface BoardRole {
  title: string
  assignee: string | null
  interested?: InterestedPerson[]
}

// Board Leadership Data
const boardRoles: BoardRole[] = [
  { 
    title: "President", 
    assignee: "Sarah Mitchell",
    interested: []
  },
  { 
    title: "Vice President", 
    assignee: "David Chen",
    interested: [
      { name: "Amanda Foster", interest: "lead" }
    ]
  },
  { 
    title: "Treasurer", 
    assignee: "Jennifer Mozinski",
    interested: []
  },
  { 
    title: "Secretary", 
    assignee: null,
    interested: [
      { name: "Priya Raman", interest: "lead" },
      { name: "Kate Vance", interest: "general" }
    ]
  },
  { 
    title: "Communications", 
    assignee: "Stephanie Knight",
    interested: []
  },
  { 
    title: "Fundraising Chair", 
    assignee: null,
    interested: [
      { name: "Maria Santos", interest: "lead" }
    ]
  },
]

// Sample data for parent involvement across the system
const parentInvolvement: Record<string, {
  committees: { name: string; role: string; item: string }[]
  events: { name: string; role: string }[]
  interests: { committee: string; item: string; type: string }[]
}> = {
  "Leia Wien": {
    committees: [
      { name: "Classroom Parent Leader", role: "Lead", item: "Room Parent - Kindergarten Anderson" }
    ],
    events: [
      { name: "Fall Book Fair", role: "Volunteer" }
    ],
    interests: []
  },
  "Erin Kirkpatrick": {
    committees: [
      { name: "Classroom Parent Leader", role: "Support", item: "Room Parent - Kindergarten Leach" },
      { name: "Classroom Parent Leader", role: "Support", item: "Room Parent - 3rd Grade Miller" }
    ],
    events: [],
    interests: []
  },
  "Jessica Lee": {
    committees: [],
    events: [],
    interests: [
      { committee: "Classroom Parent Leader", item: "Room Parent - 1st Grade Hertert", type: "support" }
    ]
  },
  "Amanda Foster": {
    committees: [],
    events: [
      { name: "Annual Fun Run", role: "Volunteer" }
    ],
    interests: [
      { committee: "Classroom Parent Leader", item: "Room Parent - 5th Grade Vaughan", type: "lead" }
    ]
  },
  "Maria Santos": {
    committees: [],
    events: [],
    interests: [
      { committee: "Classroom Parent Leader", item: "Room Parent - 4th Grade Wright", type: "support" }
    ]
  },
  "Sarah Mitchell": {
    committees: [
      { name: "Board", role: "President", item: "PTO Board" }
    ],
    events: [],
    interests: []
  },
  "David Chen": {
    committees: [
      { name: "Board", role: "Vice President", item: "PTO Board" }
    ],
    events: [],
    interests: []
  },
  "Priya Raman": {
    committees: [],
    events: [],
    interests: [
      { committee: "Board", item: "Secretary", type: "lead" }
    ]
  }
}

const committees: Committee[] = [
  // Classroom Roles
  {
    name: "Classroom Parent Leader",
    tags: ["year-round", "classroom"],
    category: "classroom",
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
            needsMore: true,
            interested: [
              { name: "Jessica Lee", interest: "support" },
              { name: "Priya Raman", interest: "support" }
            ]
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
            ],
            interested: [
              { name: "David Chen", interest: "general" }
            ]
          },
          { 
            name: "4th Grade - Wright", 
            volunteers: [
              { name: "Sonal Haladay", role: "co-lead" },
              { name: "Beth Anteparra-Naujock", role: "co-lead" }
            ],
            needsMore: true,
            interested: [
              { name: "Maria Santos", interest: "support" },
              { name: "Tom Nguyen", interest: "support" },
              { name: "Rachel Kim", interest: "general" }
            ]
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
            needsMore: true,
            interested: [
              { name: "Amanda Foster", interest: "lead" },
              { name: "Chris Park", interest: "support" }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Classroom Photographers",
    tags: ["year-round", "classroom"],
    category: "classroom",
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
            ],
            interested: [
              { name: "Sarah Mitchell", interest: "general" }
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
  // School Events
  {
    name: "Fun Run",
    tags: ["fundraiser", "outdoor", "spring"],
    category: "events",
    items: [
      { type: "event", name: "Annual Fun Run" }
    ]
  },
  {
    name: "Book Fair",
    tags: ["fundraiser", "literacy"],
    category: "events",
    items: [
      { type: "event", name: "Fall Book Fair" },
      { type: "event", name: "Spring Book Fair" }
    ]
  },
  { name: "Carnival", tags: ["event", "spring"], category: "events" },
  { name: "Multi Cultural", tags: ["event", "community"], category: "events" },
  { name: "5th Grade Celebration + Fundraiser", tags: ["event", "5th-grade"], category: "events" },
  { name: "Family Night", tags: ["event", "community"], category: "events" },
  { name: "Field Day", tags: ["event", "outdoor", "spring"], category: "events" },
  { name: "Science Fair / Art Showcase", tags: ["event", "enrichment"], category: "events" },
  { name: "Spring Dance Party", tags: ["event", "spring"], category: "events" },
  { name: "Talent Showcase", tags: ["event", "enrichment"], category: "events" },
  // Programs
  {
    name: "Art Literacy",
    tags: ["enrichment", "classroom"],
    category: "programs",
    items: [
      {
        type: "program",
        name: "Monthly Classroom Sessions",
        description: "Needs 5+ volunteers per class"
      }
    ]
  },
  { name: "Oregon Battle of the Books", tags: ["enrichment", "literacy"], category: "programs" },
  { name: "Three Bees Garden", tags: ["enrichment", "outdoor"], category: "programs" },
  { name: "Run Club", tags: ["enrichment", "outdoor"], category: "programs" },
  { name: "Summer Kindergarten Playdates", tags: ["community", "summer"], category: "programs" },
  // Fundraising
  { name: "Foundation Fundraising", tags: ["fundraiser"], category: "fundraising" },
  { name: "PTO Sponsorships", tags: ["fundraiser"], category: "fundraising" },
  { name: "Round Up / Auction", tags: ["fundraiser", "event"], category: "fundraising" },
  { name: "Holiday Scrip", tags: ["fundraiser"], category: "fundraising" },
  // Operations & Service
  { name: "Falcon Outreach", tags: ["community"], category: "operations" },
  { name: "First Day School Supplies", tags: ["service", "fall"], category: "operations" },
  { name: "Staff & Teacher Appreciation", tags: ["service"], category: "operations" },
  { name: "Volunteer Coordinator", tags: ["operations"], category: "operations" },
  { name: "Yearbook", tags: ["year-round"], category: "operations" },
]

// Category configuration
const categoryConfig: Record<string, { label: string; icon: typeof Users; description: string }> = {
  classroom: { 
    label: "Classroom Roles", 
    icon: GraduationCap,
    description: "Parent leaders and photographers for each classroom"
  },
  events: { 
    label: "School Events", 
    icon: Calendar,
    description: "Annual and seasonal school-wide events"
  },
  programs: { 
    label: "Programs & Enrichment", 
    icon: TreePine,
    description: "Ongoing enrichment and community programs"
  },
  fundraising: { 
    label: "Fundraising", 
    icon: DollarSign,
    description: "Revenue-generating activities and campaigns"
  },
  operations: { 
    label: "Operations & Service", 
    icon: Heart,
    description: "Behind-the-scenes support and appreciation"
  },
}

// Calculate gap stats for an item - ONLY based on assignments, not interested
function getItemGapStats(item: CommitteeItem) {
  if (!item.slots) return { total: 0, open: 0, needsSupport: 0 }
  
  const total = item.slots.length
  const open = item.slots.filter(s => s.volunteers.length === 0).length
  const needsSupport = item.slots.filter(s => s.needsMore && s.volunteers.length > 0).length
  
  return { total, open, needsSupport }
}

// Calculate gap stats for an entire committee
function getCommitteeGapStats(committee: Committee) {
  if (!committee.items) return { totalSlots: 0, open: 0, needsSupport: 0, totalInterested: 0 }
  
  let totalSlots = 0
  let open = 0
  let needsSupport = 0
  let totalInterested = 0
  
  for (const item of committee.items) {
    const stats = getItemGapStats(item)
    totalSlots += stats.total
    open += stats.open
    needsSupport += stats.needsSupport
    
    if (item.slots) {
      for (const slot of item.slots) {
        totalInterested += slot.interested?.length || 0
      }
    }
  }
  
  return { totalSlots, open, needsSupport, totalInterested }
}

// Sort items by urgency: open first, then needs support, then covered
function sortItemsByNeed(items: CommitteeItem[]): CommitteeItem[] {
  return [...items].sort((a, b) => {
    const statsA = getItemGapStats(a)
    const statsB = getItemGapStats(b)
    
    // Open slots are highest priority
    if (statsA.open > 0 && statsB.open === 0) return -1
    if (statsB.open > 0 && statsA.open === 0) return 1
    
    // Then needs support
    if (statsA.needsSupport > 0 && statsB.needsSupport === 0) return -1
    if (statsB.needsSupport > 0 && statsA.needsSupport === 0) return 1
    
    // Sort by severity within same category
    if (statsA.open !== statsB.open) return statsB.open - statsA.open
    if (statsA.needsSupport !== statsB.needsSupport) return statsB.needsSupport - statsA.needsSupport
    
    return 0
  })
}

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

function GapSummary({ item }: { item: CommitteeItem }) {
  const { open, needsSupport } = getItemGapStats(item)
  
  if (open === 0 && needsSupport === 0) return null
  
  return (
    <div className="flex items-center gap-3 text-xs">
      {needsSupport > 0 && (
        <span className="text-amber-600 font-medium">
          {needsSupport} need{needsSupport === 1 ? 's' : ''} support
        </span>
      )}
      {needsSupport > 0 && open > 0 && (
        <span className="text-muted-foreground">•</span>
      )}
      {open > 0 && (
        <span className="text-red-600 font-medium">
          {open} open
        </span>
      )}
    </div>
  )
}

// Parent Profile Sheet Component
function ParentProfileSheet({ 
  parentName, 
  open, 
  onOpenChange 
}: { 
  parentName: string | null
  open: boolean
  onOpenChange: (open: boolean) => void 
}) {
  const involvement = parentName ? parentInvolvement[parentName] : null
  
  const totalAssignments = involvement 
    ? involvement.committees.length + involvement.events.length 
    : 0
  const totalInterests = involvement?.interests.length || 0

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <SheetTitle>{parentName}</SheetTitle>
              <SheetDescription>
                {totalAssignments} assignment{totalAssignments !== 1 ? 's' : ''}
                {totalInterests > 0 && ` • ${totalInterests} interest${totalInterests !== 1 ? 's' : ''}`}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-140px)] pr-4">
          <div className="space-y-6">
            {/* Current Assignments */}
            {involvement && involvement.committees.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4 text-amber-600" />
                  Committee Roles
                </h4>
                <div className="space-y-2">
                  {involvement.committees.map((c, i) => (
                    <div key={i} className="p-3 rounded-lg border bg-card">
                      <div className="font-medium text-sm">{c.item}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {c.name} • {c.role}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {involvement && involvement.events.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  Event Assignments
                </h4>
                <div className="space-y-2">
                  {involvement.events.map((e, i) => (
                    <div key={i} className="p-3 rounded-lg border bg-card">
                      <div className="font-medium text-sm">{e.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{e.role}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Expressed Interests */}
            {involvement && involvement.interests.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2 text-muted-foreground">
                  <Sparkles className="h-4 w-4" />
                  Expressed Interest
                </h4>
                <div className="space-y-2">
                  {involvement.interests.map((int, i) => (
                    <div key={i} className="p-3 rounded-lg border border-dashed bg-muted/30">
                      <div className="font-medium text-sm">{int.item}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {int.committee} • Interested in {int.type}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No involvement case */}
            {(!involvement || (involvement.committees.length === 0 && involvement.events.length === 0 && involvement.interests.length === 0)) && (
              <div className="text-center py-8 text-muted-foreground">
                <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No recorded involvement yet</p>
              </div>
            )}

            {/* Quick Actions */}
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-3">Quick Actions</h4>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  Send email
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <UserPlus className="h-3.5 w-3.5" />
                  Assign to role
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

// Clickable parent name component
function ParentName({ 
  name, 
  className = "",
  onParentClick 
}: { 
  name: string
  className?: string
  onParentClick: (name: string) => void 
}) {
  return (
    <span
      role="button"
      tabIndex={0}
      className={`hover:underline hover:text-primary cursor-pointer ${className}`}
      onClick={(e) => {
        e.stopPropagation()
        onParentClick(name)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          e.stopPropagation()
          onParentClick(name)
        }
      }}
    >
      {name}
    </span>
  )
}

// Actionable Interested Section
function InterestedSection({ 
  interested, 
  slotName,
  onParentClick 
}: { 
  interested: InterestedPerson[]
  slotName: string
  onParentClick: (name: string) => void 
}) {
  if (!interested || interested.length === 0) return null

  const leadInterest = interested.filter(p => p.interest === "lead")
  const supportInterest = interested.filter(p => p.interest === "support")
  const generalInterest = interested.filter(p => p.interest === "general" || !p.interest)

  return (
    <div className="mt-3 pt-3 border-t border-dashed border-muted-foreground/20">
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground/70 font-medium mb-2">
        Interested Candidates
      </div>
      <div className="space-y-1.5">
        {leadInterest.map((p, i) => (
          <InterestedPersonRow 
            key={`lead-${i}`} 
            person={p} 
            slotName={slotName}
            onParentClick={onParentClick}
          />
        ))}
        {supportInterest.map((p, i) => (
          <InterestedPersonRow 
            key={`support-${i}`} 
            person={p} 
            slotName={slotName}
            onParentClick={onParentClick}
          />
        ))}
        {generalInterest.map((p, i) => (
          <InterestedPersonRow 
            key={`general-${i}`} 
            person={p} 
            slotName={slotName}
            onParentClick={onParentClick}
          />
        ))}
      </div>
    </div>
  )
}

function InterestedPersonRow({ 
  person, 
  slotName,
  onParentClick 
}: { 
  person: InterestedPerson
  slotName: string
  onParentClick: (name: string) => void 
}) {
  const interestLabel = person.interest === "lead" ? "Lead" : person.interest === "support" ? "Support" : "General"
  const interestColor = person.interest === "lead" 
    ? "bg-blue-100 text-blue-700 border-blue-200" 
    : person.interest === "support" 
      ? "bg-amber-100 text-amber-700 border-amber-200"
      : "bg-gray-100 text-gray-600 border-gray-200"

  return (
    <div className="flex items-center justify-between gap-2 p-2 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors group/interested">
      <div className="flex items-center gap-2 min-w-0">
        <ParentName 
          name={person.name} 
          className="text-sm font-medium truncate"
          onParentClick={onParentClick}
        />
        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${interestColor}`}>
          {interestLabel}
        </Badge>
      </div>
      
      {/* Quick actions - visible on hover */}
      <div className="flex items-center gap-1 opacity-0 group-hover/interested:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
              <UserPlus className="h-3 w-3" />
              <span className="hidden sm:inline">Assign</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
              Assign {person.name} to {slotName}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Users className="mr-2 h-4 w-4" />
              Assign as Lead
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Users className="mr-2 h-4 w-4" />
              Assign as Support
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Calendar className="mr-2 h-4 w-4" />
              Assign to different slot
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
          <Mail className="h-3 w-3" />
          <span className="hidden sm:inline">Reach out</span>
        </Button>
      </div>
    </div>
  )
}

function SlotDisplay({ 
  slot, 
  onParentClick 
}: { 
  slot: Slot
  onParentClick: (name: string) => void 
}) {
  const hasVolunteers = slot.volunteers.length > 0
  const leads = slot.volunteers.filter(v => v.role === "lead")
  const coLeads = slot.volunteers.filter(v => v.role === "co-lead")
  const supporters = slot.volunteers.filter(v => v.role === "support")
  const unroledVolunteers = slot.volunteers.filter(v => !v.role)

  const isOpen = !hasVolunteers
  const needsSupport = slot.needsMore && hasVolunteers

  // Background colors based on status - gaps dominate visual attention
  const bgClass = isOpen 
    ? "bg-red-50/60 border-red-200" 
    : needsSupport 
      ? "bg-amber-50/50 border-amber-200" 
      : "bg-background border-border/60"

  return (
    <div className={`rounded-lg border p-4 ${bgClass}`}>
      <div className="flex items-start justify-between gap-4">
        <span className="font-semibold text-sm">{slot.name}</span>
        <div className="flex items-center gap-2 shrink-0">
          {isOpen && (
            <Badge 
              variant="outline"
              className="text-xs border-red-300 text-red-700 bg-red-100 font-semibold"
            >
              Open
            </Badge>
          )}
          {needsSupport && (
            <Badge 
              variant="outline"
              className="text-xs border-amber-300 text-amber-700 bg-amber-100 font-semibold"
            >
              Needs support
            </Badge>
          )}
        </div>
      </div>
      
      {hasVolunteers && (
        <div className="mt-2 space-y-1">
          {coLeads.length > 0 && (
            <div className="flex items-baseline gap-2 text-sm">
              <span className="text-xs text-muted-foreground uppercase tracking-wide w-16 shrink-0">Co-leads</span>
              <span>
                {coLeads.map((v, i) => (
                  <span key={v.name}>
                    <ParentName name={v.name} onParentClick={onParentClick} />
                    {i < coLeads.length - 1 && ", "}
                  </span>
                ))}
              </span>
            </div>
          )}
          {leads.length > 0 && (
            <div className="flex items-baseline gap-2 text-sm">
              <span className="text-xs text-muted-foreground uppercase tracking-wide w-16 shrink-0">Lead</span>
              <span>
                {leads.map((v, i) => (
                  <span key={v.name}>
                    <ParentName name={v.name} onParentClick={onParentClick} />
                    {i < leads.length - 1 && ", "}
                  </span>
                ))}
              </span>
            </div>
          )}
          {supporters.length > 0 && (
            <div className="flex items-baseline gap-2 text-sm">
              <span className="text-xs text-muted-foreground uppercase tracking-wide w-16 shrink-0">Support</span>
              <span className="text-muted-foreground">
                {supporters.map((v, i) => (
                  <span key={v.name}>
                    <ParentName name={v.name} className="text-muted-foreground" onParentClick={onParentClick} />
                    {i < supporters.length - 1 && ", "}
                  </span>
                ))}
              </span>
            </div>
          )}
          {unroledVolunteers.length > 0 && (
            <div className="text-sm text-muted-foreground">
              {unroledVolunteers.map((v, i) => (
                <span key={v.name}>
                  <ParentName name={v.name} className="text-muted-foreground" onParentClick={onParentClick} />
                  {i < unroledVolunteers.length - 1 && ", "}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Interested section - now actionable */}
      <InterestedSection 
        interested={slot.interested || []} 
        slotName={slot.name}
        onParentClick={onParentClick}
      />
    </div>
  )
}

function ItemSection({ 
  type, 
  items,
  onParentClick 
}: { 
  type: "event" | "role" | "program"
  items: CommitteeItem[]
  onParentClick: (name: string) => void 
}) {
  if (items.length === 0) return null
  
  const labels: Record<string, string> = {
    event: "Events",
    role: "Roles",
    program: "Programs"
  }

  // Sort items by need within each section
  const sortedItems = sortItemsByNeed(items)

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <ItemTypeIcon type={type} />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {labels[type]}
        </span>
      </div>
      
      <div className="space-y-4">
        {sortedItems.map((item, idx) => (
          <div key={idx} className="group/item">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-sm text-foreground">{item.name}</h4>
              <div className="flex items-center gap-2">
                <GapSummary item={item} />
                <ItemActions item={item} />
              </div>
            </div>
            
            {item.slots && item.slots.length > 0 && (
              <div className="space-y-3">
                {item.slots.map((slot, slotIdx) => (
                  <SlotDisplay 
                    key={slotIdx} 
                    slot={slot} 
                    onParentClick={onParentClick}
                  />
                ))}
              </div>
            )}
            
            {item.description && (
              <p className="text-sm text-muted-foreground">{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function CommitteeActions({ committee }: { committee: Committee }) {
  const hasItems = committee.items && committee.items.length > 0
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Committee actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
          Actions
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
          <Copy className="mr-2 h-4 w-4" />
          Duplicate committee
        </DropdownMenuItem>
        {hasItems && (
          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
            <Copy className="mr-2 h-4 w-4" />
            Duplicate structure only
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal flex items-center gap-1">
          <Sparkles className="h-3 w-3" />
          Generate suggestions
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
          <Tags className="mr-2 h-4 w-4" />
          Suggest tags
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
          <UserPlus className="mr-2 h-4 w-4" />
          Suggest volunteer roles
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
          <ListTodo className="mr-2 h-4 w-4" />
          Suggest tasks
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
          <Calendar className="mr-2 h-4 w-4" />
          Suggest related events
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ItemActions({ item }: { item: CommitteeItem }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 w-6 p-0 opacity-0 group-hover/item:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="h-3.5 w-3.5" />
          <span className="sr-only">Item actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
          Actions
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
          <Copy className="mr-2 h-4 w-4" />
          Duplicate {item.type}
        </DropdownMenuItem>
        {item.slots && item.slots.length > 0 && (
          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
            <Copy className="mr-2 h-4 w-4" />
            Duplicate slots structure
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal flex items-center gap-1">
          <Sparkles className="h-3 w-3" />
          Suggestions
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
          <UserPlus className="mr-2 h-4 w-4" />
          Suggest volunteer needs
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
          <ListTodo className="mr-2 h-4 w-4" />
          Suggest tasks
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function CommitteeGapSummary({ committee }: { committee: Committee }) {
  const { totalSlots, open, needsSupport, totalInterested } = getCommitteeGapStats(committee)
  
  // No slots to track
  if (totalSlots === 0) return null
  
  // Fully covered
  if (open === 0 && needsSupport === 0) {
    return (
      <span className="text-xs text-muted-foreground/60">
        Fully covered
      </span>
    )
  }
  
  return (
    <div className="flex items-center gap-2 text-xs">
      {open > 0 && (
        <span className="text-red-600 font-medium">
          {open} open
        </span>
      )}
      {open > 0 && needsSupport > 0 && (
        <span className="text-muted-foreground">•</span>
      )}
      {needsSupport > 0 && (
        <span className="text-amber-600 font-medium">
          {needsSupport} need{needsSupport === 1 ? 's' : ''} support
        </span>
      )}
      {totalInterested > 0 && (open > 0 || needsSupport > 0) && (
        <>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">
            {totalInterested} interested
          </span>
        </>
      )}
    </div>
  )
}

// Create Event Dialog
function CreateEventDialog({ 
  committee,
  open, 
  onOpenChange 
}: { 
  committee: Committee
  open: boolean
  onOpenChange: (open: boolean) => void 
}) {
  const [eventName, setEventName] = useState("")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
          <DialogDescription>
            Create a new event under {committee.name}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="event-name">Event Name</Label>
            <Input 
              id="event-name" 
              placeholder="e.g., Spring Fun Run 2025"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
          
          {eventName.length > 3 && (
            <div className="space-y-3 pt-2">
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Suggestions based on similar events
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                  + Setup crew (3-5 volunteers)
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                  + Registration table
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                  + Water station lead
                </Badge>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            Create Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Committee Detail Sheet
function CommitteeDetailSheet({ 
  committee,
  open, 
  onOpenChange,
  onParentClick 
}: { 
  committee: Committee | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onParentClick: (name: string) => void 
}) {
  const [createEventOpen, setCreateEventOpen] = useState(false)
  
  if (!committee) return null

  const { totalSlots, open: openSlots, needsSupport, totalInterested } = getCommitteeGapStats(committee)
  const events = committee.items?.filter(i => i.type === "event") || []
  const roles = committee.items?.filter(i => i.type === "role") || []
  const programs = committee.items?.filter(i => i.type === "program") || []

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-xl lg:max-w-2xl p-0">
          <SheetHeader className="p-6 pb-4 border-b">
            <div className="flex items-start justify-between">
              <div>
                <SheetTitle className="text-xl">{committee.name}</SheetTitle>
                <SheetDescription className="mt-1">
                  {totalSlots > 0 ? (
                    <span className="flex items-center gap-2 flex-wrap">
                      <span>{totalSlots} slot{totalSlots !== 1 ? 's' : ''}</span>
                      {openSlots > 0 && (
                        <Badge variant="outline" className="text-xs border-red-300 text-red-700 bg-red-50">
                          {openSlots} open
                        </Badge>
                      )}
                      {needsSupport > 0 && (
                        <Badge variant="outline" className="text-xs border-amber-300 text-amber-700 bg-amber-50">
                          {needsSupport} need support
                        </Badge>
                      )}
                      {totalInterested > 0 && (
                        <span className="text-muted-foreground">• {totalInterested} interested</span>
                      )}
                    </span>
                  ) : (
                    "No roles or events configured yet"
                  )}
                </SheetDescription>
              </div>
            </div>

            {/* Tags */}
            {committee.tags && committee.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {committee.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="p-6 space-y-8">
              {/* Quick Actions */}
              <div>
                <h4 className="text-sm font-medium mb-3">Quick Actions</h4>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1.5"
                    onClick={() => setCreateEventOpen(true)}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Create Event
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <UserPlus className="h-3.5 w-3.5" />
                    Add Role
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    Email volunteers
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Content sections */}
              <div className="space-y-8">
                <ItemSection type="role" items={roles} onParentClick={onParentClick} />
                <ItemSection type="event" items={events} onParentClick={onParentClick} />
                <ItemSection type="program" items={programs} onParentClick={onParentClick} />
              </div>

              {/* Empty state */}
              {!committee.items || committee.items.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Calendar className="h-10 w-10 mx-auto mb-3 opacity-40" />
                  <p className="font-medium">No items yet</p>
                  <p className="text-sm mt-1">Create an event or add roles to get started</p>
                  <Button 
                    variant="outline" 
                    className="mt-4 gap-1.5"
                    onClick={() => setCreateEventOpen(true)}
                  >
                    <Plus className="h-4 w-4" />
                    Create First Event
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <CreateEventDialog 
        committee={committee}
        open={createEventOpen}
        onOpenChange={setCreateEventOpen}
      />
    </>
  )
}

function CommitteeRow({ 
  committee,
  onOpenDetail,
  onParentClick 
}: { 
  committee: Committee
  onOpenDetail: (committee: Committee) => void
  onParentClick: (name: string) => void 
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasItems = committee.items && committee.items.length > 0
  
  // Get gap stats for row background
  const { open, needsSupport } = getCommitteeGapStats(committee)

  const events = committee.items?.filter(i => i.type === "event") || []
  const roles = committee.items?.filter(i => i.type === "role") || []
  const programs = committee.items?.filter(i => i.type === "program") || []
  
  // Subtle row background based on urgency
  const rowBgClass = open > 0 
    ? "bg-red-50/30 hover:bg-red-50/50" 
    : needsSupport > 0 
      ? "bg-amber-50/30 hover:bg-amber-50/50" 
      : "hover:bg-muted/50"

  return (
    <li className="group">
      <div 
        className={`flex w-full items-center justify-between px-6 py-4 text-left transition-colors cursor-pointer ${rowBgClass} ${!hasItems ? 'cursor-default' : ''}`}
        onClick={() => hasItems && setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={hasItems ? 0 : -1}
        onKeyDown={(e) => {
          if (hasItems && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            setIsExpanded(!isExpanded)
          }
        }}
      >
        <div className="flex items-center gap-2">
          <span className="font-medium">{committee.name}</span>
          {/* Detail view button */}
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation()
              onOpenDetail(committee)
            }}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="sr-only">Open detail view</span>
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <CommitteeGapSummary committee={committee} />
          <CommitteeActions committee={committee} />
          {hasItems ? (
            isExpanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )
          ) : (
            <span className="text-xs text-muted-foreground">No items yet</span>
          )}
        </div>
      </div>
      
      {isExpanded && committee.items && (
        <div className="border-t bg-muted/20 px-6 py-6">
          <div className="space-y-8">
            <ItemSection type="role" items={roles} onParentClick={onParentClick} />
            <ItemSection type="event" items={events} onParentClick={onParentClick} />
            <ItemSection type="program" items={programs} onParentClick={onParentClick} />
          </div>
        </div>
      )}
    </li>
  )
}

// Board Leadership Section
function BoardLeadershipSection({ 
  onParentClick 
}: { 
  onParentClick: (name: string) => void 
}) {
  const openRoles = boardRoles.filter(r => !r.assignee).length
  const totalInterested = boardRoles.reduce((acc, r) => acc + (r.interested?.length || 0), 0)

  return (
    <Card className="mb-8 border-2 border-primary/10 bg-gradient-to-br from-background to-primary/5">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Crown className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Board Leadership</CardTitle>
            <CardDescription>
              {openRoles > 0 ? (
                <span className="flex items-center gap-2">
                  <span className="text-red-600 font-medium">{openRoles} open position{openRoles !== 1 ? 's' : ''}</span>
                  {totalInterested > 0 && (
                    <>
                      <span>•</span>
                      <span>{totalInterested} interested</span>
                    </>
                  )}
                </span>
              ) : (
                "All positions filled"
              )}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {boardRoles.map((role) => {
            const isOpen = !role.assignee
            const hasInterested = role.interested && role.interested.length > 0
            
            return (
              <div 
                key={role.title}
                className={`rounded-lg border p-4 transition-colors ${
                  isOpen 
                    ? "bg-red-50/60 border-red-200" 
                    : "bg-background border-border/60"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-semibold text-sm">{role.title}</h4>
                  {isOpen && (
                    <Badge 
                      variant="outline"
                      className="text-xs border-red-300 text-red-700 bg-red-100 font-semibold shrink-0"
                    >
                      Open
                    </Badge>
                  )}
                </div>
                
                {role.assignee ? (
                  <div className="text-sm">
                    <ParentName 
                      name={role.assignee} 
                      onParentClick={onParentClick}
                    />
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    No one assigned
                  </div>
                )}

                {/* Interested candidates */}
                {hasInterested && (
                  <div className="mt-3 pt-3 border-t border-dashed border-muted-foreground/20">
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground/70 font-medium mb-2">
                      Interested
                    </div>
                    <div className="space-y-1.5">
                      {role.interested!.map((person, i) => (
                        <div 
                          key={i}
                          className="flex items-center justify-between gap-2 p-2 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors group/interested"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <ParentName 
                              name={person.name} 
                              className="text-sm truncate"
                              onParentClick={onParentClick}
                            />
                            {person.interest === "lead" && (
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-blue-100 text-blue-700 border-blue-200">
                                Lead
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-1 opacity-0 group-hover/interested:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs gap-1">
                              <UserPlus className="h-3 w-3" />
                              <span className="hidden sm:inline">Assign</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                              <Mail className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

// Committee Category Section
function CommitteeCategorySection({ 
  category,
  committees,
  onOpenDetail,
  onParentClick 
}: { 
  category: string
  committees: Committee[]
  onOpenDetail: (committee: Committee) => void
  onParentClick: (name: string) => void 
}) {
  const config = categoryConfig[category]
  if (!config || committees.length === 0) return null

  const Icon = config.icon

  // Calculate category-level stats
  let totalOpen = 0
  let totalNeedsSupport = 0
  for (const committee of committees) {
    const stats = getCommitteeGapStats(committee)
    totalOpen += stats.open
    totalNeedsSupport += stats.needsSupport
  }

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4 px-2">
        <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-base">{config.label}</h3>
          <p className="text-xs text-muted-foreground">{config.description}</p>
        </div>
        {(totalOpen > 0 || totalNeedsSupport > 0) && (
          <div className="flex items-center gap-2 text-xs">
            {totalOpen > 0 && (
              <Badge variant="outline" className="border-red-300 text-red-700 bg-red-50">
                {totalOpen} open
              </Badge>
            )}
            {totalNeedsSupport > 0 && (
              <Badge variant="outline" className="border-amber-300 text-amber-700 bg-amber-50">
                {totalNeedsSupport} need support
              </Badge>
            )}
          </div>
        )}
      </div>
      
      <Card>
        <CardContent className="p-0">
          <ul className="divide-y divide-border">
            {committees.map((committee) => (
              <CommitteeRow 
                key={committee.name} 
                committee={committee}
                onOpenDetail={onOpenDetail}
                onParentClick={onParentClick}
              />
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export default function CommitteesPage() {
  const [selectedCommittee, setSelectedCommittee] = useState<Committee | null>(null)
  const [committeeDetailOpen, setCommitteeDetailOpen] = useState(false)
  const [selectedParent, setSelectedParent] = useState<string | null>(null)
  const [parentProfileOpen, setParentProfileOpen] = useState(false)

  const handleOpenDetail = (committee: Committee) => {
    setSelectedCommittee(committee)
    setCommitteeDetailOpen(true)
  }

  const handleParentClick = (name: string) => {
    setSelectedParent(name)
    setParentProfileOpen(true)
  }

  // Group committees by category
  const committeesByCategory = {
    classroom: committees.filter(c => c.category === "classroom"),
    events: committees.filter(c => c.category === "events"),
    programs: committees.filter(c => c.category === "programs"),
    fundraising: committees.filter(c => c.category === "fundraising"),
    operations: committees.filter(c => c.category === "operations"),
  }

  return (
    <AdminLayout 
      title="Committees" 
      description="Manage PTO leadership, committees, and volunteer roles."
    >
      {/* Board Leadership Section */}
      <BoardLeadershipSection onParentClick={handleParentClick} />

      {/* Categorized Committees */}
      <CommitteeCategorySection 
        category="classroom"
        committees={committeesByCategory.classroom}
        onOpenDetail={handleOpenDetail}
        onParentClick={handleParentClick}
      />
      
      <CommitteeCategorySection 
        category="events"
        committees={committeesByCategory.events}
        onOpenDetail={handleOpenDetail}
        onParentClick={handleParentClick}
      />
      
      <CommitteeCategorySection 
        category="programs"
        committees={committeesByCategory.programs}
        onOpenDetail={handleOpenDetail}
        onParentClick={handleParentClick}
      />
      
      <CommitteeCategorySection 
        category="fundraising"
        committees={committeesByCategory.fundraising}
        onOpenDetail={handleOpenDetail}
        onParentClick={handleParentClick}
      />
      
      <CommitteeCategorySection 
        category="operations"
        committees={committeesByCategory.operations}
        onOpenDetail={handleOpenDetail}
        onParentClick={handleParentClick}
      />

      {/* Committee Detail Sheet */}
      <CommitteeDetailSheet 
        committee={selectedCommittee}
        open={committeeDetailOpen}
        onOpenChange={setCommitteeDetailOpen}
        onParentClick={handleParentClick}
      />

      {/* Parent Profile Sheet */}
      <ParentProfileSheet
        parentName={selectedParent}
        open={parentProfileOpen}
        onOpenChange={setParentProfileOpen}
      />
    </AdminLayout>
  )
}
