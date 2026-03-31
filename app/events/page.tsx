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
  Check,
  Sparkles,
  Loader2,
  X
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
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type EventStatus = "draft" | "published" | "needs_volunteers"
type EventType = "fundraiser" | "school_event" | "book_fair" | "fun_run" | "party" | "field_trip" | "other"

interface VolunteerOpportunity {
  id: string
  role: string
  spots: number
  timing: string
  hours: string
  selected: boolean
}

interface Event {
  id: string
  name: string
  type?: EventType
  date?: string
  location?: string
  committee?: string
  notes?: string
  status: EventStatus
  opportunities?: VolunteerOpportunity[]
}

const eventTypeLabels: Record<EventType, string> = {
  fundraiser: "Fundraiser",
  school_event: "School Event",
  book_fair: "Book Fair",
  fun_run: "Fun Run",
  party: "Party",
  field_trip: "Field Trip",
  other: "Other"
}

const suggestionsByType: Record<EventType, Omit<VolunteerOpportunity, "id" | "selected">[]> = {
  fun_run: [
    { role: "Course Marshal", spots: 4, timing: "Day-of", hours: "3 hrs" },
    { role: "Registration Table", spots: 3, timing: "Day-of", hours: "2 hrs" },
    { role: "Water Station Volunteer", spots: 4, timing: "Day-of", hours: "3 hrs" },
    { role: "Finish Line Crew", spots: 2, timing: "Day-of", hours: "2 hrs" },
  ],
  book_fair: [
    { role: "Setup Crew", spots: 3, timing: "Oct 26 eve", hours: "2 hrs" },
    { role: "Cashier", spots: 8, timing: "Oct 27-31", hours: "Flexible" },
    { role: "Inventory Manager", spots: 2, timing: "Oct 27", hours: "1 hr" },
    { role: "Cleanup Crew", spots: 3, timing: "Oct 31", hours: "2 hrs" },
  ],
  field_trip: [
    { role: "Chaperone", spots: 4, timing: "Day-of", hours: "Full day" },
    { role: "Group Leader", spots: 2, timing: "Day-of", hours: "Full day" },
  ],
  fundraiser: [
    { role: "Event Setup", spots: 3, timing: "2 hrs before event", hours: "2 hrs" },
    { role: "Event Helper", spots: 4, timing: "During event", hours: "Varies" },
  ],
  school_event: [
    { role: "Event Setup", spots: 3, timing: "2 hrs before event", hours: "2 hrs" },
    { role: "Event Helper", spots: 4, timing: "During event", hours: "Varies" },
  ],
  party: [
    { role: "Event Setup", spots: 3, timing: "2 hrs before event", hours: "2 hrs" },
    { role: "Event Helper", spots: 4, timing: "During event", hours: "Varies" },
  ],
  other: [
    { role: "Event Setup", spots: 3, timing: "2 hrs before event", hours: "2 hrs" },
    { role: "Event Helper", spots: 4, timing: "During event", hours: "Varies" },
  ],
}

const initialEvents: Event[] = [
  {
    id: "1",
    name: "Falcon Fun Run",
    type: "fun_run",
    date: "October 8, 2024",
    location: "School Track",
    committee: "Fun Run",
    status: "needs_volunteers"
  },
  {
    id: "2",
    name: "Scholastic Book Fair",
    type: "book_fair",
    date: "October 27-31, 2024",
    location: "School Library",
    committee: "Book Fair",
    status: "draft"
  },
  {
    id: "3",
    name: "Spring Dance Party",
    type: "party",
    date: "April 5, 2025",
    location: "Gymnasium",
    committee: "Spring Dance Party",
    status: "draft"
  },
  {
    id: "4",
    name: "Science Night",
    type: "school_event",
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

function CreateEventDialog({ 
  onCreateEvent 
}: { 
  onCreateEvent: (event: Event) => void 
}) {
  const [open, setOpen] = useState(false)
  const [eventName, setEventName] = useState("")
  const [eventType, setEventType] = useState<EventType | "">("")
  const [eventDate, setEventDate] = useState("")
  const [eventLocation, setEventLocation] = useState("")
  const [eventNotes, setEventNotes] = useState("")
  const [publishImmediately, setPublishImmediately] = useState(false)
  
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<VolunteerOpportunity[]>([])

  const canShowSuggestButton = eventName.trim() && eventType

  const handleSuggestOpportunities = () => {
    if (!eventType) return
    
    setIsLoadingSuggestions(true)
    
    // Simulate AI thinking
    setTimeout(() => {
      const typeSuggestions = suggestionsByType[eventType as EventType] || suggestionsByType.other
      const opportunitiesWithIds: VolunteerOpportunity[] = typeSuggestions.map((s, i) => ({
        ...s,
        id: `opp-${Date.now()}-${i}`,
        selected: true
      }))
      setSuggestions(opportunitiesWithIds)
      setIsLoadingSuggestions(false)
      setShowSuggestions(true)
    }, 1200)
  }

  const toggleSuggestion = (id: string) => {
    setSuggestions(suggestions.map(s => 
      s.id === id ? { ...s, selected: !s.selected } : s
    ))
  }

  const handleCreateEvent = () => {
    const newEvent: Event = {
      id: `event-${Date.now()}`,
      name: eventName,
      type: eventType as EventType,
      date: eventDate || undefined,
      location: eventLocation || undefined,
      notes: eventNotes || undefined,
      status: publishImmediately ? "published" : "draft",
      opportunities: suggestions.filter(s => s.selected)
    }
    
    onCreateEvent(newEvent)
    
    // Reset form
    setEventName("")
    setEventType("")
    setEventDate("")
    setEventLocation("")
    setEventNotes("")
    setPublishImmediately(false)
    setShowSuggestions(false)
    setSuggestions([])
    setOpen(false)
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      // Reset form when closing
      setEventName("")
      setEventType("")
      setEventDate("")
      setEventLocation("")
      setEventNotes("")
      setPublishImmediately(false)
      setShowSuggestions(false)
      setSuggestions([])
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          New Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
          <DialogDescription>
            Add a new event to your calendar.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <FieldGroup>
            <Field>
              <FieldLabel>Event Name</FieldLabel>
              <Input 
                placeholder="e.g., Spring Book Fair"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel>Event Type</FieldLabel>
              <Select value={eventType} onValueChange={(value) => setEventType(value as EventType)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(eventTypeLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel>Date</FieldLabel>
              <Input 
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel>Location</FieldLabel>
              <Input 
                placeholder="e.g., School Gymnasium"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel>Notes (optional)</FieldLabel>
              <Textarea 
                placeholder="Any additional details..."
                value={eventNotes}
                onChange={(e) => setEventNotes(e.target.value)}
                rows={3}
              />
            </Field>
          </FieldGroup>

          <div className="flex items-center gap-2">
            <Checkbox 
              id="publish-immediately" 
              checked={publishImmediately}
              onCheckedChange={(checked) => setPublishImmediately(checked === true)}
            />
            <Label htmlFor="publish-immediately" className="text-sm cursor-pointer">
              Publish immediately
            </Label>
          </div>

          {/* AI Suggestions Section */}
          {canShowSuggestButton && !showSuggestions && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5 text-muted-foreground"
              onClick={handleSuggestOpportunities}
              disabled={isLoadingSuggestions}
            >
              {isLoadingSuggestions ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Thinking...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Suggest volunteer opportunities
                </>
              )}
            </Button>
          )}

          {showSuggestions && suggestions.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Suggested Opportunities</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 px-2 text-xs text-muted-foreground"
                  onClick={() => setShowSuggestions(false)}
                >
                  <X className="h-3 w-3 mr-1" />
                  Hide
                </Button>
              </div>
              <div className="space-y-2">
                {suggestions.map((suggestion) => (
                  <label
                    key={suggestion.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      suggestion.selected 
                        ? "border-primary/50 bg-primary/5" 
                        : "border-border bg-muted/30"
                    }`}
                  >
                    <Checkbox 
                      checked={suggestion.selected}
                      onCheckedChange={() => toggleSuggestion(suggestion.id)}
                      className="mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{suggestion.role}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {suggestion.spots} spots · {suggestion.timing} · {suggestion.hours}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Uncheck any you don&apos;t need. Checked opportunities will be created with your event.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button 
            disabled={!eventName.trim()}
            onClick={handleCreateEvent}
          >
            {suggestions.some(s => s.selected) 
              ? "Create Event + Add Opportunities" 
              : "Create Event"
            }
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [copyConfirmation, setCopyConfirmation] = useState<string | null>(null)

  const handleCreateEvent = (event: Event) => {
    setEvents([event, ...events])
  }

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
          <CreateEventDialog onCreateEvent={handleCreateEvent} />
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
