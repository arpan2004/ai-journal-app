"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2, Sparkles } from "lucide-react"

export function EntryForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in both title and content")
      return
    }

    setIsLoading(true)

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        toast.error("You must be logged in to create entries")
        return
      }

      // Get existing categories for this user
      const { data: existingCategories } = await supabase.from("categories").select("name").eq("user_id", user.id)

      const categoryNames = existingCategories?.map((c) => c.name) || []

      // Use AI to categorize the entry
      const response = await fetch("/api/categorize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      })
      if (!response.ok) {
        toast.error("Failed to categorize entry")
        return
      }
      const data = await response.json()
      const suggestedCategory = data.category
      console.log('Suggested category:', suggestedCategory)

      // Check if category exists, if not create it
      let categoryId: string | null = null

      const { data: existingCategory } = await supabase
        .from("categories")
        .select("id")
        .eq("name", suggestedCategory)
        .eq("user_id", user.id)
        .single()

      if (existingCategory) {
        categoryId = existingCategory.id
      } else {
        // Create new category
        const { data: newCategory, error: categoryError } = await supabase
          .from("categories")
          .insert({
            name: suggestedCategory,
            user_id: user.id,
          })
          .select("id")
          .single()

        if (categoryError) {
          console.error("Error creating category:", categoryError)
          toast.error("Failed to create category")
          return
        }

        categoryId = newCategory.id
      }

      // Create the entry
      const { error: entryError } = await supabase.from("entries").insert({
        title: title.trim(),
        content: content.trim(),
        category_id: categoryId,
        user_id: user.id,
      })

      if (entryError) {
        console.error("Error creating entry:", entryError)
        toast.error("Failed to create entry")
        return
      }

      toast.success(`Entry created and categorized as "${suggestedCategory}"!`)
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Error:", error)
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <span>Create New Journal Entry</span>
          </CardTitle>
          <CardDescription>Write your thoughts and let AI automatically categorize them for you</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="What's on your mind?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Share your thoughts, ideas, or reflections..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isLoading}
                rows={8}
                className="resize-none"
              />
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating & Categorizing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Create Entry
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push("/")} disabled={isLoading}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
