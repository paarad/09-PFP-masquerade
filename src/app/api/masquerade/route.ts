import { NextRequest, NextResponse } from "next/server"
import { generateMasquerade } from "@/lib/replicate"
import { getStyleById } from "@/lib/styles"
import { rateLimit, getClientIP } from "@/lib/rate-limit"

interface MasqueradeRequest {
  baseImage: string
  styleId: string
  strength?: number
  upscale?: boolean
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request)
    const rateLimitResult = rateLimit(clientIP)
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: "Rate limit exceeded", 
          resetTime: rateLimitResult.resetTime,
          remaining: rateLimitResult.remaining 
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
          }
        }
      )
    }

    // Parse request body
    const body: MasqueradeRequest = await request.json()
    const { baseImage, styleId, strength = 0.8, upscale = false } = body

    // Validate inputs
    if (!baseImage || !styleId) {
      return NextResponse.json(
        { error: "Missing required fields: baseImage and styleId" },
        { status: 400 }
      )
    }

    // Get style configuration
    const style = getStyleById(styleId)
    if (!style) {
      return NextResponse.json(
        { error: "Invalid style ID" },
        { status: 400 }
      )
    }

    // Validate base image (check if it's a valid data URL or URL)
    if (!baseImage.startsWith('data:image/') && !baseImage.startsWith('http')) {
      return NextResponse.json(
        { error: "Invalid image format. Must be data URL or valid image URL" },
        { status: 400 }
      )
    }

    // Validate strength parameter
    if (strength < 0 || strength > 1) {
      return NextResponse.json(
        { error: "Strength must be between 0 and 1" },
        { status: 400 }
      )
    }

    // Check if we have the required environment variables
    if (!process.env.REPLICATE_API_TOKEN) {
      console.error("REPLICATE_API_TOKEN not configured")
      return NextResponse.json(
        { error: "Service configuration error" },
        { status: 500 }
      )
    }

    // Generate the masqueraded image
    const result = await generateMasquerade({
      baseImage,
      stylePrompt: style.prompt,
      negativePrompt: style.negativePrompt,
      strength,
      upscale: process.env.ENABLE_UPSCALE === 'true' ? upscale : false,
    })

    // Return success response with rate limit headers
    return NextResponse.json(
      { 
        success: true, 
        result,
        style: {
          id: style.id,
          name: style.name,
          description: style.description,
        }
      },
      {
        headers: {
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
        }
      }
    )

  } catch (error) {
    console.error("Masquerade API error:", error)
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes("NSFW")) {
        return NextResponse.json(
          { error: "Content not allowed. Please try a different image." },
          { status: 400 }
        )
      }
      
      if (error.message.includes("quota") || error.message.includes("limit")) {
        return NextResponse.json(
          { error: "Service temporarily unavailable. Please try again later." },
          { status: 503 }
        )
      }
    }

    return NextResponse.json(
      { error: "Failed to generate image. Please try again." },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "PFP Masquerade API",
    version: "1.0.0",
    endpoints: {
      POST: "/api/masquerade - Generate masqueraded image"
    }
  })
} 