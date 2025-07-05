"use client"

import { useRef, useState } from "react"
import dynamic from "next/dynamic"
import type { Entry, Category } from "@/lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Tag, X, Edit } from "lucide-react"
import { format } from "date-fns"
import { EditEntryForm } from "./edit-entry-form"

// Only import the 2D version to avoid VR/3D/aframe issues
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false })

interface TreeVisualizationProps {
  entries: Entry[]
  categories: Category[]
  userName: string
}

export function TreeVisualization({ entries, categories, userName }: TreeVisualizationProps) {
  const fgRef = useRef<any>(null)
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  // Build nodes / links
  const nodes: any[] = []
  const links: any[] = []

  // Root node
  nodes.push({ id: "user", type: "user", name: userName })

  // Group entries by category
  const entriesByCat: Record<string, Entry[]> = {}
  entries.forEach((e) => {
    const key = e.category_id ?? "uncategorized"
    if (!entriesByCat[key]) entriesByCat[key] = []
    entriesByCat[key].push(e)
  })

  categories.forEach((cat) => {
    nodes.push({ id: `cat-${cat.id}`, type: "category", name: cat.name, count: entriesByCat[cat.id]?.length ?? 0 })
    links.push({ source: "user", target: `cat-${cat.id}` })
  })

  // Handle uncategorized bucket
  if (entriesByCat["uncategorized"]) {
    nodes.push({
      id: "cat-uncategorized",
      type: "category",
      name: "Uncategorized",
      count: entriesByCat["uncategorized"].length,
    })
    links.push({ source: "user", target: "cat-uncategorized" })
  }

  entries.forEach((e) => {
    const nodeId = `entry-${e.id}`
    nodes.push({ id: nodeId, type: "entry", name: e.title, preview: e.content.slice(0, 40) + "…", entry: e })
    links.push({
      source: `cat-${e.category_id ?? "uncategorized"}`,
      target: nodeId,
    })
  })

  const handleNodeClick = (node: any) => {
    if (node.type === "entry" && node.entry) {
      setSelectedEntry(node.entry)
      setIsModalOpen(true)
      setIsEditMode(false)
    }
  }

  const handleEditClick = () => {
    setIsEditMode(true)
  }

  const handleUpdate = () => {
    // Refresh the page to show updated data
    window.location.reload()
  }

  // Render node as HTML via Canvas
  const nodeCanvasObject = (node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const label = node.name
    const fontSize = 14 / globalScale
    ctx.font = `${fontSize}px Inter, sans-serif`
    const textWidth = ctx.measureText(label).width
    const padding = 4
    const boxWidth = textWidth + padding * 2
    const boxHeight = fontSize + padding * 2

    // colors
    let bg = "#4f46e5"
    if (node.type === "category") bg = "#059669"
    if (node.type === "entry") bg = "#ea580c"

    // rounded rect
    ctx.fillStyle = bg
    const r = 4
    ctx.beginPath()
    ctx.moveTo(node.x - boxWidth / 2 + r, node.y - boxHeight / 2)
    ctx.lineTo(node.x + boxWidth / 2 - r, node.y - boxHeight / 2)
    ctx.quadraticCurveTo(
      node.x + boxWidth / 2,
      node.y - boxHeight / 2,
      node.x + boxWidth / 2,
      node.y - boxHeight / 2 + r,
    )
    ctx.lineTo(node.x + boxWidth / 2, node.y + boxHeight / 2 - r)
    ctx.quadraticCurveTo(
      node.x + boxWidth / 2,
      node.y + boxHeight / 2,
      node.x + boxWidth / 2 - r,
      node.y + boxHeight / 2,
    )
    ctx.lineTo(node.x - boxWidth / 2 + r, node.y + boxHeight / 2)
    ctx.quadraticCurveTo(
      node.x - boxWidth / 2,
      node.y + boxHeight / 2,
      node.x - boxWidth / 2,
      node.y + boxHeight / 2 - r,
    )
    ctx.lineTo(node.x - boxWidth / 2, node.y - boxHeight / 2 + r)
    ctx.quadraticCurveTo(
      node.x - boxWidth / 2,
      node.y - boxHeight / 2,
      node.x - boxWidth / 2 + r,
      node.y - boxHeight / 2,
    )
    ctx.fill()

    // text
    ctx.fillStyle = "#ffffff"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(label, node.x, node.y)
  }

  const getCategoryName = (categoryId: string | null | undefined) => {
    if (!categoryId) return "Uncategorized"
    const category = categories.find(cat => cat.id === categoryId)
    return category?.name || "Uncategorized"
  }

  return (
    <>
      <div className="w-full h-[600px] border rounded-lg bg-background">
        <ForceGraph2D
          ref={fgRef}
          graphData={{ nodes, links }}
          nodeCanvasObject={nodeCanvasObject}
          onNodeClick={handleNodeClick}
          d3VelocityDecay={0.35}
          backgroundColor="transparent"
          linkColor={() => "#a1a1aa"}
          nodeRelSize={6}
          linkWidth={1.5}
          linkDirectionalParticles={2}
          linkDirectionalParticleWidth={2}
        />
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
                      <Clock className="h-4 w-4" />
                      <span>{selectedEntry?.created_at ? format(new Date(selectedEntry.created_at), 'h:mm a') : 'Unknown time'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Tag className="h-4 w-4" />
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {getCategoryName(selectedEntry?.category_id)}
                      </span>
                    </div>
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
