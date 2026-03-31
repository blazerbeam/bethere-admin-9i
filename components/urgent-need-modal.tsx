"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AlertTriangle, Loader2, Sparkles, CheckCircle2, ArrowRight } from "lucide-react"

const existingEvents = [
  { id: "1", name: "Falcon Fun Run" },
  { id: "2", name: "Scholastic Book Fair" },
  { id: "3", name: "Spring Dance Party" },
  { id: "4", name: "Science Night" },
]

const matchedParents = [
  { name: "Jessica Lee", detail: "volunteered at Fun Run", initials: "JL" },
  { name: "Priya Raman", detail: "interested in Room Parent", initials: "PR" },
  { name: "Amy Renalds", detail: "frequent volunteer", initials: "AR" },
]

type ModalState = "form" | "sending" | "sent"

export function UrgentNeedModal() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [modalState, setModalState] = useState<ModalState>("form")
  
  // Form fields
  const [whatNeeded, setWhatNeeded] = useState("")
  const [whenDate, setWhenDate] = useState("")
  const [whenTime, setWhenTime] = useState("")
  const [volunteersNeeded, setVolunteersNeeded] = useState("1")
  const [tiedToEvent, setTiedToEvent] = useState("")
  
  // Message drafting
  const [isWritingMessage, setIsWritingMessage] = useState(false)
  const [draftedMessage, setDraftedMessage] = useState("")
  const [showMessage, setShowMessage] = useState(false)

  const handleDraftMessage = () => {
    setIsWritingMessage(true)
    
    // Simulate AI writing
    setTimeout(() => {
      const dateDisplay = whenDate 
        ? new Date(whenDate).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })
        : "the scheduled date"
      
      const message = `Hi! We have an urgent need for ${volunteersNeeded} volunteer${Number(volunteersNeeded) > 1 ? "s" : ""} for ${whatNeeded || "[what's needed]"} on ${dateDisplay}. This opportunity needs to be filled today. Can you help? Reply or tap below to sign up.`
      
      setDraftedMessage(message)
      setIsWritingMessage(false)
      setShowMessage(true)
    }, 1000)
  }

  const handleSendNow = () => {
    setModalState("sending")
    
    // Simulate sending
    setTimeout(() => {
      setModalState("sent")
    }, 1500)
  }

  const handleSaveAsDraft = () => {
    // Just close the modal - in a real app this would save
    resetAndClose()
  }

  const handleViewOpportunity = () => {
    resetAndClose()
    router.push("/opportunities")
  }

  const resetAndClose = () => {
    setOpen(false)
    // Reset state after animation
    setTimeout(() => {
      setModalState("form")
      setWhatNeeded("")
      setWhenDate("")
      setWhenTime("")
      setVolunteersNeeded("1")
      setTiedToEvent("")
      setDraftedMessage("")
      setShowMessage(false)
    }, 200)
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetAndClose()
    } else {
      setOpen(true)
    }
  }

  const canDraftMessage = whatNeeded.trim().length > 0

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium">
          <AlertTriangle className="h-4 w-4" />
          Urgent Need
        </Button>
      </DialogTrigger>
      <DialogContent 
        className="sm:max-w-lg max-h-[90vh] overflow-y-auto"
        showCloseButton={modalState !== "sending"}
      >
        {modalState === "form" && (
          <>
            <DialogHeader className="bg-red-50 -m-6 mb-0 p-6 pb-4 rounded-t-lg border-b border-red-100">
              <div className="flex items-center gap-2">
                <span className="text-xl">🚨</span>
                <DialogTitle>Send an Urgent Volunteer Need</DialogTitle>
              </div>
              <DialogDescription>
                We&apos;ll notify matched parents immediately.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 pt-4">
              {/* What do you need? */}
              <div className="space-y-2">
                <Label htmlFor="what-needed" className="text-sm font-medium">
                  What do you need?
                </Label>
                <Input
                  id="what-needed"
                  placeholder="e.g. Field trip chaperone for tomorrow's trip"
                  value={whatNeeded}
                  onChange={(e) => setWhatNeeded(e.target.value)}
                  className="text-base"
                />
              </div>

              {/* When? */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">When?</Label>
                <div className="flex gap-2">
                  <Input
                    type="date"
                    value={whenDate}
                    onChange={(e) => setWhenDate(e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    type="time"
                    value={whenTime}
                    onChange={(e) => setWhenTime(e.target.value)}
                    placeholder="Time (optional)"
                    className="w-32"
                  />
                </div>
              </div>

              {/* How many volunteers? */}
              <div className="space-y-2">
                <Label htmlFor="volunteers-needed" className="text-sm font-medium">
                  How many volunteers?
                </Label>
                <Input
                  id="volunteers-needed"
                  type="number"
                  min="1"
                  value={volunteersNeeded}
                  onChange={(e) => setVolunteersNeeded(e.target.value)}
                  className="w-24"
                />
              </div>

              {/* Tied to an event? */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Tied to an event? <span className="text-muted-foreground font-normal">(optional)</span>
                </Label>
                <Select value={tiedToEvent} onValueChange={setTiedToEvent}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Not tied to a specific event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Not tied to a specific event</SelectItem>
                    {existingEvents.map((event) => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Draft message button */}
              {!showMessage && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-orange-600 border-orange-300 hover:bg-orange-50 hover:text-orange-700"
                  onClick={handleDraftMessage}
                  disabled={!canDraftMessage || isWritingMessage}
                >
                  {isWritingMessage ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Writing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Draft message for parents
                    </>
                  )}
                </Button>
              )}

              {/* Drafted message textarea */}
              {showMessage && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Message to parents</Label>
                  <Textarea
                    value={draftedMessage}
                    onChange={(e) => setDraftedMessage(e.target.value)}
                    rows={4}
                    className="text-sm"
                  />
                </div>
              )}

              {/* Matched parents preview */}
              <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                <div className="text-sm font-medium">Who will be notified</div>
                <p className="text-sm text-muted-foreground">
                  14 parents match based on availability and past activity
                </p>
                <div className="space-y-2">
                  {matchedParents.map((parent) => (
                    <div key={parent.name} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs bg-orange-100 text-orange-700">
                          {parent.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <span className="font-medium">{parent.name}</span>
                        <span className="text-muted-foreground"> · {parent.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">+ 11 more</p>
              </div>
            </div>

            {/* Bottom actions */}
            <div className="pt-4 space-y-3">
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                onClick={handleSendNow}
                disabled={!whatNeeded.trim()}
              >
                Send Now
              </Button>
              <button
                type="button"
                className="w-full text-sm text-muted-foreground hover:text-foreground text-center"
                onClick={handleSaveAsDraft}
              >
                Save as draft instead
              </button>
            </div>
          </>
        )}

        {modalState === "sending" && (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            <p className="text-muted-foreground">Sending to matched parents...</p>
          </div>
        )}

        {modalState === "sent" && (
          <div className="flex flex-col items-center text-center py-6 gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <DialogTitle className="text-xl mb-2">Urgent need sent!</DialogTitle>
              <p className="text-sm text-muted-foreground">
                Notified 14 matched parents · {new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Responses will appear in your Opportunities view
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full pt-4">
              <Button 
                className="w-full gap-2"
                onClick={handleViewOpportunity}
              >
                View opportunity
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                className="w-full"
                onClick={resetAndClose}
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
