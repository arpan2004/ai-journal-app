import { categorizeEntry } from "@/lib/ai"
import { createClient } from "@/utils/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { title, content } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get existing categories for this user
    const { data: existingCategories } = await supabase.from("categories").select("name").eq("user_id", user.id)

    const categoryNames = existingCategories?.map((c) => c.name) || []

    // Use AI to categorize the entry
    const suggestedCategory = await categorizeEntry(title, content, categoryNames)

    return NextResponse.json({ category: suggestedCategory })
  } catch (error) {
    console.error("Error categorizing entry:", error)
    return NextResponse.json({ error: "Failed to categorize entry" }, { status: 500 })
  }
}
