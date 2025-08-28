import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center space-y-8 mb-16">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            PFP Masquerade
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          🎭 Morph any PFP or meme into the style of another collection
        </p>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Transform your profile picture into Azuki-ish, Milady-ish, Goblin-ish, or any other popular NFT collection style. 
          High-quality, pseudonymous, NFT-native.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/studio">
            <Button size="lg" className="text-lg px-8 py-4">
              🎭 Masquerade Now
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="text-lg px-8 py-4">
            View Examples
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⚔️ Choose Style
            </CardTitle>
            <CardDescription>
              Pick from curated NFT collection styles like Azuki-ish, Milady-ish, and more
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🖼️ High Quality
            </CardTitle>
            <CardDescription>
              SDXL-powered generation with optional 2× upscaling for crisp results
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔒 Pseudonymous
            </CardTitle>
            <CardDescription>
              No real face uploads required. Keep your identity private.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⚡ Fast Generation
            </CardTitle>
            <CardDescription>
              Typical generation time under 15 seconds
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📱 Mobile Ready
            </CardTitle>
            <CardDescription>
              Works perfectly on desktop and mobile devices
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🚀 Share Easy
            </CardTitle>
            <CardDescription>
              One-click sharing to X (Twitter) and direct download
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* How it Works */}
      <div className="text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold">
          How It Works
        </h2>
        
        <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl mx-auto">
              1
            </div>
            <h3 className="font-semibold">Choose Base</h3>
            <p className="text-muted-foreground text-sm">Pick from curated gallery or upload your own PFP</p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl mx-auto">
              2
            </div>
            <h3 className="font-semibold">Select Style</h3>
            <p className="text-muted-foreground text-sm">Choose target collection style (Azuki-ish, etc.)</p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl mx-auto">
              3
            </div>
            <h3 className="font-semibold">Generate</h3>
            <p className="text-muted-foreground text-sm">AI transforms your image with style transfer</p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl mx-auto">
              4
            </div>
            <h3 className="font-semibold">Share</h3>
            <p className="text-muted-foreground text-sm">Download or share directly to social media</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 pt-8 border-t text-center">
        <p className="text-muted-foreground">
          Built for the <span className="font-semibold">#30DaysAIChallenge</span> 🚀
        </p>
      </footer>
    </div>
  )
} 