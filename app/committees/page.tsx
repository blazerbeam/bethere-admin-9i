import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Empty, EmptyDescription, EmptyTitle } from "@/components/ui/empty"
import { Users } from "lucide-react"

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
            Create and organize committees for your PTO activities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Empty>
            <Users className="h-10 w-10" />
            <EmptyTitle>No committees yet</EmptyTitle>
            <EmptyDescription>
              Get started by creating your first committee.
            </EmptyDescription>
          </Empty>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}
