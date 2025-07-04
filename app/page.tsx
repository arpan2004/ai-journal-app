import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { TreeVisualization } from "@/components/journal/tree-visualization"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Brain } from "lucide-react"
import Link from "next/link"
import { FileText, Tag } from "lucide-react" // Import FileText and Tag components

export default async function HomePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/landing")
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

  // Fetch user's categories
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  const userName = user.user_metadata?.full_name || user.email?.split("@")[0] || "User"

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />

      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
              <Brain className="h-8 w-8 text-purple-500" />
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Your AI-Organized Journal
              </h1>
            </div>
            <p className="text-base sm:text-xl text-muted-foreground max-w-xs sm:max-w-2xl mx-auto">
              Visualize your thoughts and ideas organized by AI into meaningful categories
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Total Entries</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold">{entries?.length || 0}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Categories</CardTitle>
                <Tag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold">{categories?.length || 0}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Quick Action</CardTitle>
                <Plus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/create">
                    <Plus className="h-4 w-4 mr-2" />
                    New Entry
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Tree Visualization */}
          {entries && entries.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Your Journal Tree</CardTitle>
                <CardDescription className="text-xs sm:text-base">
                  Interactive visualization of your entries organized by AI-generated categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[320px] sm:min-w-0">
                    <TreeVisualization entries={entries} categories={categories || []} userName={userName} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8 sm:py-12">
                <Brain className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Start Your AI Journal Journey</h3>
                <p className="text-muted-foreground mb-6 max-w-xs sm:max-w-md mx-auto">
                  Create your first entry and watch as AI automatically organizes your thoughts into meaningful
                  categories.
                </p>
                <Button asChild size="lg">
                  <Link href="/create">
                    <Plus className="h-5 w-5 mr-2" />
                    Create Your First Entry
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
