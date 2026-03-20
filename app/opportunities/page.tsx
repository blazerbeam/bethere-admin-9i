import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Empty, EmptyDescription, EmptyTitle } from "@/components/ui/empty"
import { HandHeart } from "lucide-react"

export default function OpportunitiesPage() {
  return (
    <AdminLayout 
      title="Opportunities" 
      description="Manage volunteer opportunities for parents and community members."
    >
      <Card>
        <CardHeader>
          <CardTitle>All Opportunities</CardTitle>
          <CardDescription>
            Create volunteer opportunities and track sign-ups.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Empty>
            <HandHeart className="h-10 w-10" />
            <EmptyTitle>No opportunities available</EmptyTitle>
            <EmptyDescription>
              Post your first volunteer opportunity.
            </EmptyDescription>
          </Empty>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}
