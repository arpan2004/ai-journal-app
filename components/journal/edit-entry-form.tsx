"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner"
import { Loader2, Save, X } from "lucide-react"
import type { Entry } from "@/lib/types"

interface EditEntryFormProps {
  entry: Entry
  onClose: () => void
  onUpdate: () => void
}

export function EditEntryForm({ entry, onClose, onUpdate }: EditEntryFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState(entry.title)
  const [content, setContent] = useState(entry.content)
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
        toast.error("You must be logged in to edit entries")
        return
      }

      // Update the entry
      const { error: entryError } = await supabase
        .from("entries")
        .update({
          title: title.trim(),
          content: content.trim(),
        })
        .eq("id", entry.id)
        .eq("user_id", user.id)

      if (entryError) {
        console.error("Error updating entry:", entryError)
        toast.error("Failed to update entry")
        return
      }

      toast.success("Entry updated successfully!")
      onUpdate()
      onClose()
    } catch (error) {
      console.error("Error:", error)
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="edit-title">Title</Label>
          <Input
            id="edit-title"
            placeholder="What's on your mind?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-content">Content</Label>
          <Textarea
            id="edit-content"
            placeholder="Share your thoughts, ideas, or reflections..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isLoading}
            rows={8}
            className="resize-none"
          />
        </div>

        <div className="flex space-x-2 pt-4">
          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
} 