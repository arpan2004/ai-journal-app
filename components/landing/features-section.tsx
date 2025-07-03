"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, TreePine, Sparkles, Search, Shield, Zap } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Categorization",
    description:
      "Write naturally while our AI automatically organizes your thoughts into meaningful categories. No manual tagging required.",
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    icon: TreePine,
    title: "Interactive Tree Visualization",
    description:
      "See your ideas come to life in beautiful, interactive tree diagrams that show connections between your thoughts.",
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  {
    icon: Sparkles,
    title: "Smart Insights",
    description:
      "Discover patterns in your thinking and get AI-generated insights about your personal growth and interests.",
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: Search,
    title: "Powerful Search",
    description:
      "Find any thought instantly with intelligent search that understands context and meaning, not just keywords.",
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    icon: Shield,
    title: "Private & Secure",
    description:
      "Your thoughts are yours alone. End-to-end encryption ensures your journal remains completely private.",
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-900/20",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built for speed with modern technology. Capture thoughts instantly without any lag or delays.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white"
          >
            Powerful Features for
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {" "}
              Modern Journaling
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Everything you need to capture, organize, and understand your thoughts like never before.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
