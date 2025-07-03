"use client"

import type { Entry } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { FileText, Calendar, Tag } from "lucide-react"

interface EntriesListProps {
  entries: Entry[]
}

export function EntriesList({ entries }: EntriesListProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No entries yet</h3>
        <p className="text-muted-foreground">Create your first journal entry to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <Card key={entry.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">{entry.title}</CardTitle>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}</span>
                  </div>
                  {entry.category && (
                    <div className="flex items-center space-x-1">
                      <Tag className="h-3 w-3" />
                      <Badge variant="secondary" className="text-xs">
                        {entry.category.name}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-3">{entry.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
