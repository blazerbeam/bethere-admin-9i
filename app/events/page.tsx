import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Empty, EmptyDescription, EmptyTitle } from "@/components/ui/empty"
import { Calendar } from "lucide-react"

export default function EventsPage() {
  return (
    <AdminLayout 
      title="Events" 
      description="Schedule and manage PTO events."
    >
      <Card>
        <CardHeader>
          <CardTitle>All Events</CardTitle>
          <CardDescription>
            Plan and track events for your school community.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Empty>
            <Calendar className="h-10 w-10" />
            <EmptyTitle>No events scheduled</EmptyTitle>
            <EmptyDescription>
              Create your first event to get started.
            </EmptyDescription>
          </Empty>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}
