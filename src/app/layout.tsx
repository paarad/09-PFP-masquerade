import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PFP Masquerade - Morph Any PFP Into Any Style",
  description: "Transform your PFP or meme into the style of popular NFT collections. High-quality, pseudonymous, NFT-native style transfers.",
  keywords: ["NFT", "PFP", "style transfer", "AI", "Azuki", "Milady", "crypto"],
  openGraph: {
    title: "PFP Masquerade",
    description: "Morph any PFP into the style of another collection",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PFP Masquerade",
    description: "Morph any PFP into the style of another collection",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
} 