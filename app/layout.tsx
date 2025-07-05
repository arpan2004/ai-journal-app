import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Mindz Root - AI-Powered Journal",
  description: "Organize your thoughts and ideas with AI-powered categorization",
  generator: 'v0.dev',
  icons: {
    icon: '/mindzroot-logo.png',
    shortcut: '/mindzroot-logo.png',
    apple: '/mindzroot-logo.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Mindz Root - AI-Powered Journal',
    description: 'Organize your thoughts and ideas with AI-powered categorization',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mindz Root - AI-Powered Journal',
    description: 'Organize your thoughts and ideas with AI-powered categorization',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/mindzroot-logo.png" type="image/png" />
        <link rel="shortcut icon" href="/mindzroot-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/mindzroot-logo.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
