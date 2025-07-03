"use client"

import { Card, CardContent } from "@/components/ui/card"
import { PenTool, Brain, TreePine, Eye } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    icon: PenTool,
    title: "Write Freely",
    description: "Just start writing. No need to think about categories or organization - focus on your thoughts.",
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: Brain,
    title: "AI Analyzes",
    description: "Our AI reads your entry and automatically determines the best category based on content and context.",
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    icon: TreePine,
    title: "Auto-Organize",
    description:
      "Your entry is instantly organized into the perfect category, creating connections with similar thoughts.",
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  {
    icon: Eye,
    title: "Visualize Insights",
    description:
      "See your thoughts come alive in interactive trees that reveal patterns and connections you never noticed.",
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Four simple steps to transform your journaling experience with the power of AI.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="h-full text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 rounded-full ${step.bgColor} flex items-center justify-center mx-auto mb-6`}
                  >
                    <step.icon className={`h-8 w-8 ${step.color}`} />
                  </div>
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>

              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-300 to-blue-300 dark:from-purple-600 dark:to-blue-600" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
