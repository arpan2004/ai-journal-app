import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 relative">
              <Image 
                src="/mindzroot-logo.png" 
                alt="Mindz Root Logo" 
                width={32} 
                height={32}
                className="rounded-lg"
              />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">Mindz Root</span>
          </div>

          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Button asChild variant="outline">
              <Link href="/auth">Sign In</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  )
}