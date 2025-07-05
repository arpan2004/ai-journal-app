"use client"

import { useState } from "react"
import type { Entry } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow, format } from "date-fns"
import { FileText, Calendar, Tag, X, Edit } from "lucide-react"
import { EditEntryForm } from "./edit-entry-form"

interface EntriesListProps {
  entries: Entry[]
}

export function EntriesList({ entries }: EntriesListProps) {
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  const handleEntryClick = (entry: Entry) => {
    setSelectedEntry(entry)
    setIsModalOpen(true)
    setIsEditMode(false)
  }

  const handleEditClick = () => {
    setIsEditMode(true)
  }

  const handleUpdate = () => {
    // Refresh the page to show updated data
    window.location.reload()
  }

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
    <>
      <div className="space-y-4">
        {entries.map((entry) => (
          <Card key={entry.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle 
                    className="text-lg cursor-pointer hover:text-primary transition-colors"
                    onClick={() => handleEntryClick(entry)}
                  >
                    {entry.title}
                  </CardTitle>
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {isEditMode && selectedEntry ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-left">
                  Edit Entry
                </DialogTitle>
              </DialogHeader>
              <EditEntryForm 
                entry={selectedEntry} 
                onClose={() => setIsEditMode(false)} 
                onUpdate={handleUpdate}
              />
            </>
          ) : (
            <>
              <DialogHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
                <div className="flex-1">
                  <DialogTitle className="text-2xl font-bold text-left">
                    {selectedEntry?.title}
                  </DialogTitle>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{selectedEntry?.created_at ? format(new Date(selectedEntry.created_at), 'MMM dd, yyyy') : 'Unknown date'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{selectedEntry?.created_at ? format(new Date(selectedEntry.created_at), 'h:mm a') : 'Unknown time'}</span>
                    </div>
                    {selectedEntry?.category && (
                      <div className="flex items-center space-x-1">
                        <Tag className="h-4 w-4" />
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {selectedEntry.category.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </DialogHeader>
              
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <div className="bg-muted/50 rounded-lg p-6 border">
                  <p className="text-lg leading-relaxed whitespace-pre-wrap">
                    {selectedEntry?.content}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Close
                </Button>
                <Button onClick={handleEditClick}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Entry
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
