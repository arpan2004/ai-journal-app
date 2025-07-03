"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="border-0 shadow-2xl bg-white/10 backdrop-blur-lg">
            <CardContent className="p-12 text-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl lg:text-5xl font-bold text-white">Ready to Transform Your Journaling?</h2>
                  <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                    Join thousands of users who have discovered the power of AI-organized thoughts. Start your journey
                    to better self-understanding today.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button asChild size="lg" className="text-lg px-8 py-6 bg-white text-purple-600 hover:bg-gray-100">
                    <Link href="/auth">
                      <Sparkles className="h-5 w-5 mr-2" />
                      Get Started Free
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Link href="#features">
                      Learn More
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">100%</div>
                    <div className="text-white/80">Free to Start</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">AI</div>
                    <div className="text-white/80">Powered Organization</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">∞</div>
                    <div className="text-white/80">Unlimited Entries</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
