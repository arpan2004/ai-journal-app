import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { EntryForm } from "@/components/journal/entry-form"

export default async function CreatePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />

      <main className="container mx-auto px-4 py-8">
        <EntryForm />
      </main>
    </div>
  )
}
