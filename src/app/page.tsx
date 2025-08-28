import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center space-y-8 mb-16">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          <span className="masquerade-gradient bg-clip-text text-transparent">
            PFP Masquerade
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          🎭 Morph any PFP or meme into the style of another collection
        </p>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Transform your profile picture into Azuki-ish, Milady-ish, Goblin-ish, or any other popular NFT collection style. 
          High-quality, pseudonymous, NFT-native.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/studio">
            <Button variant="masquerade" size="lg" className="text-lg px-8 py-4">
              🎭 Masquerade Now
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-purple-500 text-purple-300 hover:bg-purple-500/10">
            View Examples
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <Card className="bg-slate-800/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              ⚔️ Choose Style
            </CardTitle>
            <CardDescription className="text-gray-400">
              Pick from curated NFT collection styles like Azuki-ish, Milady-ish, and more
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              🖼️ High Quality
            </CardTitle>
            <CardDescription className="text-gray-400">
              SDXL-powered generation with optional 2× upscaling for crisp results
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              🔒 Pseudonymous
            </CardTitle>
            <CardDescription className="text-gray-400">
              No real face uploads required. Keep your identity private.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              ⚡ Fast Generation
            </CardTitle>
            <CardDescription className="text-gray-400">
              Typical generation time under 15 seconds
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              📱 Mobile Ready
            </CardTitle>
            <CardDescription className="text-gray-400">
              Works perfectly on desktop and mobile devices
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              🚀 Share Easy
            </CardTitle>
            <CardDescription className="text-gray-400">
              One-click sharing to X (Twitter) and direct download
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* How it Works */}
      <div className="text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          How It Works
        </h2>
        
        <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto">
              1
            </div>
            <h3 className="text-white font-semibold">Choose Base</h3>
            <p className="text-gray-400 text-sm">Pick from curated gallery or upload your own PFP</p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto">
              2
            </div>
            <h3 className="text-white font-semibold">Select Style</h3>
            <p className="text-gray-400 text-sm">Choose target collection style (Azuki-ish, etc.)</p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto">
              3
            </div>
            <h3 className="text-white font-semibold">Generate</h3>
            <p className="text-gray-400 text-sm">AI transforms your image with style transfer</p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto">
              4
            </div>
            <h3 className="text-white font-semibold">Share</h3>
            <p className="text-gray-400 text-sm">Download or share directly to social media</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 pt-8 border-t border-gray-700 text-center">
        <p className="text-gray-400">
          Built for the <span className="text-purple-400 font-semibold">#30DaysAIChallenge</span> 🚀
        </p>
      </footer>
    </div>
  )
} 