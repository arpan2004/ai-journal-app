"use client"

import { Brain } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-purple-400" />
              <span className="text-xl font-bold">AI Journal</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Transform your thoughts into organized insights with the power of artificial intelligence.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#features" className="hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/auth" className="hover:text-white transition-colors">
                  Get Started
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Mindz Root. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
