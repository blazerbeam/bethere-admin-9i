"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Calendar, 
  Plus, 
  Sparkles, 
  Tags, 
  UserPlus, 
  ListTodo, 
  Clock,
  MapPin,
  MoreHorizontal,
  Copy,
  ChevronRight,
  Lightbulb
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"

interface Event {
  id: string
  name: string
  date?: string
  location?: string
  committee?: string
  suggestedRoles?: string[]
  suggestedTasks?: string[]
  suggestedTags?: string[]
}

const sampleEvents: Event[] = [
  {
    id: "1",
    name: "Fall Book Fair",
    date: "October 15-19, 2024",
    location: "School Library",
    committee: "Book Fair",
    suggestedRoles: ["Setup Crew", "Cashier", "Inventory Manager", "Cleanup Crew"],
    suggestedTasks: ["Order books from vendor", "Set up display tables", "Create volunteer schedule", "Count cash drawer"],
    suggestedTags: ["fundraiser", "literacy", "fall"]
  },
  {
    id: "2",
    name: "Annual Fun Run",
    date: "May 10, 2025",
    location: "School Track",
    committee: "Fun Run",
    suggestedRoles: ["Course Marshal", "Registration", "Water Station", "Finish Line"],
    suggestedTasks: ["Mark course route", "Order t-shirts", "Set up water stations", "Prepare awards"],
    suggestedTags: ["fundraiser", "fitness", "spring", "outdoor"]
  },
  {
    id: "3",
    name: "Spring Dance Party",
    date: "April 5, 2025",
    location: "Gymnasium",
    committee: "Spring Dance Party"
  }
]

function EventActions({ event }: { event: Event }) {
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
          <span className="sr-only">Event actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
          Actions
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <Copy className="mr-2 h-4 w-4" />
          Duplicate event
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy className="mr-2 h-4 w-4" />
          Duplicate as template
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal flex items-center gap-1">
          <Sparkles className="h-3 w-3" />
          Generate suggestions
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <UserPlus className="mr-2 h-4 w-4" />
          Suggest volunteer roles
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ListTodo className="mr-2 h-4 w-4" />
          Suggest tasks
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Tags className="mr-2 h-4 w-4" />
          Suggest tags
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Lightbulb className="mr-2 h-4 w-4" />
          Suggest support needs
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function SuggestionsPreview({ event }: { event: Event }) {
  const hasSuggestions = event.suggestedRoles || event.suggestedTasks || event.suggestedTags
  
  if (!hasSuggestions) {
    return (
      <div className="mt-4 pt-4 border-t border-dashed">
        <Button variant="outline" size="sm" className="text-xs gap-1.5">
          <Sparkles className="h-3.5 w-3.5" />
          Generate suggestions
        </Button>
      </div>
    )
  }

  return (
    <div className="mt-4 pt-4 border-t border-dashed space-y-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Sparkles className="h-3 w-3" />
        <span className="font-medium uppercase tracking-wide">AI Suggestions</span>
      </div>
      
      {event.suggestedTags && (
        <div>
          <div className="text-[11px] text-muted-foreground mb-1">Tags</div>
          <div className="flex flex-wrap gap-1.5">
            {event.suggestedTags.map((tag, idx) => (
              <Badge 
                key={idx} 
                variant="outline" 
                className="text-xs bg-muted/50 border-dashed cursor-pointer hover:bg-muted"
              >
                {tag}
                <span className="ml-1 text-muted-foreground">+</span>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {event.suggestedRoles && (
        <div>
          <div className="text-[11px] text-muted-foreground mb-1">Volunteer Roles</div>
          <div className="flex flex-wrap gap-1.5">
            {event.suggestedRoles.map((role, idx) => (
              <Badge 
                key={idx} 
                variant="outline" 
                className="text-xs bg-blue-50/50 border-blue-200 border-dashed text-blue-700 cursor-pointer hover:bg-blue-100/50"
              >
                {role}
                <span className="ml-1 text-blue-400">+</span>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {event.suggestedTasks && (
        <div>
          <div className="text-[11px] text-muted-foreground mb-1">Tasks</div>
          <ul className="space-y-1">
            {event.suggestedTasks.slice(0, 3).map((task, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                <span>{task}</span>
                <button className="ml-auto text-xs text-primary hover:underline">Add</button>
              </li>
            ))}
            {event.suggestedTasks.length > 3 && (
              <li className="text-xs text-muted-foreground pl-3.5">
                +{event.suggestedTasks.length - 3} more
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

function EventCard({ event }: { event: Event }) {
  return (
    <div className="group border rounded-lg p-4 hover:bg-muted/30 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium truncate">{event.name}</h3>
            {event.committee && (
              <Badge variant="secondary" className="text-xs shrink-0">
                {event.committee}
              </Badge>
            )}
          </div>
          
          <div className="mt-1.5 flex items-center gap-4 text-sm text-muted-foreground">
            {event.date && (
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {event.date}
              </span>
            )}
            {event.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {event.location}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <EventActions event={event} />
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <SuggestionsPreview event={event} />
    </div>
  )
}

function CreateEventDialog() {
  const [eventName, setEventName] = useState("")
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          New Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
          <DialogDescription>
            Add a new event. You can generate suggestions after creating.
          </DialogDescription>
        </DialogHeader>
        
        <FieldGroup>
          <Field>
            <FieldLabel>Event Name</FieldLabel>
            <Input 
              placeholder="e.g., Spring Book Fair"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </Field>
        </FieldGroup>

        {eventName.length > 3 && (
          <div className="rounded-lg border border-dashed p-4 bg-muted/30">
            <div className="flex items-center gap-1.5 text-sm font-medium mb-3">
              <Sparkles className="h-4 w-4 text-primary" />
              Quick suggestions available
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <button className="flex items-center gap-2 hover:text-foreground transition-colors w-full text-left">
                <UserPlus className="h-4 w-4" />
                Generate likely volunteer roles
              </button>
              <button className="flex items-center gap-2 hover:text-foreground transition-colors w-full text-left">
                <ListTodo className="h-4 w-4" />
                Generate task checklist
              </button>
              <button className="flex items-center gap-2 hover:text-foreground transition-colors w-full text-left">
                <Tags className="h-4 w-4" />
                Suggest relevant tags
              </button>
              <button className="flex items-center gap-2 hover:text-foreground transition-colors w-full text-left">
                <Calendar className="h-4 w-4" />
                Find similar past events
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline">Cancel</Button>
          <Button disabled={!eventName}>Create Event</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function EventsPage() {
  return (
    <AdminLayout 
      title="Events" 
      description="Schedule and manage PTO events."
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>All Events</CardTitle>
            <CardDescription>
              Plan and track events for your school community.
            </CardDescription>
          </div>
          <CreateEventDialog />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sampleEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}
