"use client"

import { useRef } from "react"
import dynamic from "next/dynamic"
import type { Entry, Category } from "@/lib/types"

// Only import the 2D version to avoid VR/3D/aframe issues
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false })

interface TreeVisualizationProps {
  entries: Entry[]
  categories: Category[]
  userName: string
}

export function TreeVisualization({ entries, categories, userName }: TreeVisualizationProps) {
  const fgRef = useRef<any>(null)

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
    nodes.push({ id: nodeId, type: "entry", name: e.title, preview: e.content.slice(0, 40) + "…" })
    links.push({
      source: `cat-${e.category_id ?? "uncategorized"}`,
      target: nodeId,
    })
  })

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

  return (
    <div className="w-full h-[600px] border rounded-lg bg-background">
      <ForceGraph2D
        ref={fgRef}
        graphData={{ nodes, links }}
        nodeCanvasObject={nodeCanvasObject}
        d3VelocityDecay={0.35}
        backgroundColor="transparent"
        linkColor={() => "#a1a1aa"}
        nodeRelSize={6}
        linkWidth={1.5}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={2}
      />
    </div>
  )
}
