import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { EntriesList } from "@/components/journal/entries-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

export default async function EntriesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth")
  }

  // Fetch user's entries with categories
  const { data: entries } = await supabase
    .from("entries")
    .select(`
      *,
      category:categories(*)
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>All Journal Entries</span>
            </CardTitle>
            <CardDescription>Browse through all your journal entries organized chronologically</CardDescription>
          </CardHeader>
          <CardContent>
            <EntriesList entries={entries || []} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
