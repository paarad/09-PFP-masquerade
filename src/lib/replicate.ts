import Replicate from "replicate"

if (!process.env.REPLICATE_API_TOKEN) {
  throw new Error("REPLICATE_API_TOKEN is required")
}

export const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export interface MasqueradeParams {
  baseImage: string
  stylePrompt: string
  negativePrompt: string
  strength?: number
  guidanceScale?: number
  numInferenceSteps?: number
  upscale?: boolean
}

export async function generateMasquerade({
  baseImage,
  stylePrompt,
  negativePrompt,
  strength = 0.8,
  guidanceScale = 7.5,
  numInferenceSteps = 20,
  upscale = false
}: MasqueradeParams) {
  try {
    // Using SDXL with IP-Adapter for style transfer
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          image: baseImage,
          prompt: stylePrompt,
          negative_prompt: negativePrompt,
          num_inference_steps: numInferenceSteps,
          guidance_scale: guidanceScale,
          strength: strength,
          scheduler: "K_EULER",
          width: 1024,
          height: 1024,
        }
      }
    )

    if (upscale && Array.isArray(output) && output[0]) {
      // Optional upscaling with Real-ESRGAN
      const upscaledOutput = await replicate.run(
        "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b",
        {
          input: {
            image: output[0],
            scale: 2,
            face_enhance: false,
          }
        }
      )
      return upscaledOutput
    }

    return output
  } catch (error) {
    console.error("Replicate API error:", error)
    throw new Error("Failed to generate image")
  }
} 