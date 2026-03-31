"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Calendar, 
  Plus, 
  Clock,
  MapPin,
  MoreHorizontal,
  Copy,
  Pencil,
  Eye,
  Archive,
  Check
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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

type EventStatus = "draft" | "published" | "needs_volunteers"

interface Event {
  id: string
  name: string
  date?: string
  location?: string
  committee?: string
  status: EventStatus
}

const initialEvents: Event[] = [
  {
    id: "1",
    name: "Falcon Fun Run",
    date: "October 8, 2024",
    location: "School Track",
    committee: "Fun Run",
    status: "needs_volunteers"
  },
  {
    id: "2",
    name: "Scholastic Book Fair",
    date: "October 27-31, 2024",
    location: "School Library",
    committee: "Book Fair",
    status: "draft"
  },
  {
    id: "3",
    name: "Spring Dance Party",
    date: "April 5, 2025",
    location: "Gymnasium",
    committee: "Spring Dance Party",
    status: "draft"
  },
  {
    id: "4",
    name: "Science Night",
    date: "November 15, 2024",
    location: "School Cafeteria",
    committee: "STEM",
    status: "draft"
  }
]

function StatusBadge({ status }: { status: EventStatus }) {
  switch (status) {
    case "draft":
      return <Badge variant="secondary" className="text-xs">Draft</Badge>
    case "published":
      return <Badge className="text-xs bg-green-100 text-green-800 hover:bg-green-100">Published</Badge>
    case "needs_volunteers":
      return <Badge className="text-xs bg-orange-100 text-orange-800 hover:bg-orange-100">Needs Volunteers</Badge>
  }
}

function EventActions({ 
  event, 
  onCopy, 
  onPublish 
}: { 
  event: Event
  onCopy: (event: Event) => void
  onPublish: (event: Event) => void
}) {
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
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onCopy(event)}>
          <Copy className="mr-2 h-4 w-4" />
          Copy event
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Eye className="mr-2 h-4 w-4" />
          View responses
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Archive className="mr-2 h-4 w-4" />
          Archive
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function EventCard({ 
  event, 
  onCopy, 
  onPublish,
  copyConfirmation
}: { 
  event: Event
  onCopy: (event: Event) => void
  onPublish: (event: Event) => void
  copyConfirmation: string | null
}) {
  const showCopyConfirm = copyConfirmation === event.id

  return (
    <div className="group border rounded-lg p-4 hover:bg-muted/30 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-medium truncate">{event.name}</h3>
            <StatusBadge status={event.status} />
            {event.committee && (
              <Badge variant="outline" className="text-xs shrink-0">
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

          {showCopyConfirm && (
            <div className="mt-2 flex items-center gap-1.5 text-sm text-green-700">
              <Check className="h-3.5 w-3.5" />
              Copied as draft: &quot;{event.name} (Copy)&quot;
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {event.status === "draft" && (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-orange-600 border-orange-300 hover:bg-orange-50 hover:text-orange-700"
              onClick={() => onPublish(event)}
            >
              Publish
            </Button>
          )}
          <EventActions event={event} onCopy={onCopy} onPublish={onPublish} />
        </div>
      </div>
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
            Add a new event. It will be saved as a draft.
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

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline">Cancel</Button>
          <Button disabled={!eventName}>Create Event</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [copyConfirmation, setCopyConfirmation] = useState<string | null>(null)

  const handleCopyEvent = (event: Event) => {
    const newEvent: Event = {
      ...event,
      id: `copy-${Date.now()}`,
      name: `${event.name} (Copy)`,
      status: "draft"
    }
    setEvents([newEvent, ...events])
    setCopyConfirmation(newEvent.id)
    
    // Clear confirmation after 3 seconds
    setTimeout(() => {
      setCopyConfirmation(null)
    }, 3000)
  }

  const handlePublishEvent = (event: Event) => {
    setEvents(events.map(e => 
      e.id === event.id 
        ? { ...e, status: "published" as EventStatus }
        : e
    ))
  }

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
            {events.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onCopy={handleCopyEvent}
                onPublish={handlePublishEvent}
                copyConfirmation={copyConfirmation}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}
