"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client"
import type { User } from "@supabase/supabase-js"
import { LogOut, Plus, Home, FileText } from "lucide-react"
import Link from "next/link"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { useState } from "react"
import Image from "next/image"

interface NavbarProps {
  user: User | null
}

export function Navbar({ user }: NavbarProps) {
  const supabase = createClient()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = "/auth"
  }

  if (!user) return null

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Brand and Hamburger */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 relative">
              <Image 
                src="/mindzroot-logo.png" 
                alt="Mindz Root Logo" 
                width={32} 
                height={32}
                className="rounded-lg"
              />
            </div>
            <span className="text-xl font-bold">Mindz Root</span>
          </Link>
          {/* Hamburger for mobile */}
          <button
            className="sm:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Center: Navigation links (hidden on mobile) */}
        <div className="hidden sm:flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/entries">
              <FileText className="h-4 w-4 mr-2" />
              All Entries
            </Link>
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link href="/create">
              <Plus className="h-4 w-4 mr-2" />
              New Entry
            </Link>
          </Button>
        </div>

        {/* Right: User info and sign out */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="hidden sm:inline text-sm text-muted-foreground">Welcome, {user.user_metadata?.full_name || user.email}</span>
          <ModeToggle />
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Sign Out</span>
          </Button>
        </div>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-4">
          <div className="flex flex-col space-y-2 mt-2">
            <Button variant="ghost" size="sm" asChild className="justify-start">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <Home className="h-4 w-4 mr-2" /> Home
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="justify-start">
              <Link href="/entries" onClick={() => setMenuOpen(false)}>
                <FileText className="h-4 w-4 mr-2" /> All Entries
              </Link>
            </Button>
            <Button variant="default" size="sm" asChild className="justify-start">
              <Link href="/create" onClick={() => setMenuOpen(false)}>
                <Plus className="h-4 w-4 mr-2" /> New Entry
              </Link>
            </Button>
            <span className="text-sm text-muted-foreground mt-2">Welcome, {user.user_metadata?.full_name || user.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut} className="justify-start">
              <LogOut className="h-4 w-4 mr-2" /> Sign Out
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
