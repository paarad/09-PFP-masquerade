"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { stylePresets } from "@/lib/styles"

interface GenerationState {
  step: 'select-base' | 'select-style' | 'generating' | 'result'
  baseImage: string | null
  selectedStyle: string | null
  result: string | null
  isLoading: boolean
  error: string | null
}

export default function Studio() {
  const [state, setState] = useState<GenerationState>({
    step: 'select-base',
    baseImage: null,
    selectedStyle: null,
    result: null,
    isLoading: false,
    error: null
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file size (limit to 4MB)
      if (file.size > 4 * 1024 * 1024) {
        setState(prev => ({ ...prev, error: "File size must be less than 4MB" }))
        return
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        setState(prev => ({ ...prev, error: "Please select a valid image file" }))
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string
        setState(prev => ({
          ...prev,
          baseImage: dataUrl,
          step: 'select-style',
          error: null
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleStyleSelect = (styleId: string) => {
    setState(prev => ({
      ...prev,
      selectedStyle: styleId,
      step: 'generating'
    }))
    generateMasquerade(styleId)
  }

  const generateMasquerade = async (styleId: string) => {
    if (!state.baseImage) return

    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await fetch('/api/masquerade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          baseImage: state.baseImage,
          styleId,
          strength: 0.8,
          upscale: false
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image')
      }

      setState(prev => ({
        ...prev,
        result: Array.isArray(data.result) ? data.result[0] : data.result,
        step: 'result',
        isLoading: false
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to generate image',
        isLoading: false,
        step: 'select-style'
      }))
    }
  }

  const resetToStart = () => {
    setState({
      step: 'select-base',
      baseImage: null,
      selectedStyle: null,
      result: null,
      isLoading: false,
      error: null
    })
  }

  const downloadImage = () => {
    if (!state.result) return
    
    const link = document.createElement('a')
    link.href = state.result
    link.download = `masquerade-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const shareToTwitter = () => {
    const text = "Just created this masqueraded PFP with PFP Masquerade! 🎭 #PFPMasquerade #NFT #AI"
    const url = window.location.origin
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, '_blank')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/">
          <Button variant="ghost" className="text-white hover:bg-white/10">
            ← Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white">🎭 Masquerade Studio</h1>
        <div /> {/* Spacer for center alignment */}
      </div>

      {/* Error Display */}
      {state.error && (
        <Card className="bg-red-900/20 border-red-500/50 mb-6">
          <CardContent className="p-4">
            <p className="text-red-400">{state.error}</p>
          </CardContent>
        </Card>
      )}

      {/* Step 1: Select Base Image */}
      {state.step === 'select-base' && (
        <Card className="bg-slate-800/50 border-purple-500/20 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-white text-center">
              Step 1: Choose Your Base Image
            </CardTitle>
            <CardDescription className="text-gray-400 text-center">
              Upload your PFP or select from curated examples
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-purple-500/50 rounded-lg p-8 text-center hover:border-purple-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="text-purple-400 text-4xl mb-4">📸</div>
                <h3 className="text-white font-semibold mb-2">Upload Your Image</h3>
                <p className="text-gray-400 text-sm">
                  Click to select or drag & drop<br />
                  Supports JPG, PNG, WebP (max 4MB)
                </p>
              </label>
            </div>

            {/* Curated Examples - Coming Soon */}
            <div className="text-center">
              <p className="text-gray-500 text-sm">
                🚧 Curated gallery coming soon! For now, upload your own image.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Select Style */}
      {state.step === 'select-style' && state.baseImage && (
        <div className="max-w-4xl mx-auto">
          <Card className="bg-slate-800/50 border-purple-500/20 mb-6">
            <CardHeader>
              <CardTitle className="text-white text-center">
                Step 2: Choose Target Style
              </CardTitle>
              <CardDescription className="text-gray-400 text-center">
                Select which collection style you want to morph into
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Preview Base Image */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={state.baseImage}
                alt="Base image"
                className="w-32 h-32 object-cover rounded-lg border-2 border-purple-500/50"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={resetToStart}
                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 p-0"
              >
                ×
              </Button>
            </div>
          </div>

          {/* Style Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stylePresets.map((style) => (
              <Card
                key={style.id}
                className="bg-slate-800/50 border-purple-500/20 hover:border-purple-500 transition-colors cursor-pointer"
                onClick={() => handleStyleSelect(style.id)}
              >
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">{style.icon}</div>
                  <CardTitle className="text-white text-lg">{style.name}</CardTitle>
                  <CardDescription className="text-gray-400 text-sm">
                    {style.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Generating */}
      {state.step === 'generating' && state.isLoading && (
        <Card className="bg-slate-800/50 border-purple-500/20 max-w-2xl mx-auto">
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h3 className="text-white font-semibold mb-2">Crafting Your Masquerade...</h3>
            <p className="text-gray-400 text-sm">
              The AI is working its magic ✨ This usually takes 10-15 seconds.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Result */}
      {state.step === 'result' && state.result && state.baseImage && (
        <div className="max-w-4xl mx-auto">
          <Card className="bg-slate-800/50 border-purple-500/20 mb-6">
            <CardHeader>
              <CardTitle className="text-white text-center">
                🎉 Your Masquerade is Ready!
              </CardTitle>
              <CardDescription className="text-gray-400 text-center">
                Before and after transformation
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Before/After Comparison */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <h3 className="text-white font-semibold mb-4">Before</h3>
              <img
                src={state.baseImage}
                alt="Original"
                className="w-full max-w-sm mx-auto rounded-lg border-2 border-gray-500"
              />
            </div>
            <div className="text-center">
              <h3 className="text-white font-semibold mb-4">After</h3>
              <img
                src={state.result}
                alt="Masqueraded"
                className="w-full max-w-sm mx-auto rounded-lg border-2 border-purple-500 neon-border"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              variant="masquerade"
              size="lg"
              onClick={downloadImage}
              className="px-8"
            >
              📥 Download
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={shareToTwitter}
              className="px-8 border-blue-500 text-blue-300 hover:bg-blue-500/10"
            >
              🐦 Share on X
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={resetToStart}
              className="px-8"
            >
              🎭 Try Another
            </Button>
          </div>
        </div>
      )}
    </div>
  )
} 