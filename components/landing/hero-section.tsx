"use client"

import { Button } from "@/components/ui/button"
import { Brain, Sparkles, TreePine, FileText } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />

      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Logo/Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-xl opacity-30 animate-pulse" />
              <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full">
                <Brain className="h-12 w-12 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Mindz Root
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">AI-Powered Journal</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transform your thoughts into organized insights. Write freely while AI automatically categorizes and
              visualizes your ideas in beautiful, interactive trees.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              asChild
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Link href="/auth">
                <Sparkles className="h-5 w-5 mr-2" />
                Start Journaling Free
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              <Link href="#features">Learn More</Link>
            </Button>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300">
              <Brain className="h-5 w-5 text-purple-500" />
              <span>AI Categorization</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300">
              <TreePine className="h-5 w-5 text-green-500" />
              <span>Visual Organization</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300">
              <FileText className="h-5 w-5 text-blue-500" />
              <span>Smart Insights</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
