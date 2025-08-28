export interface StylePreset {
  id: string
  name: string
  description: string
  prompt: string
  negativePrompt: string
  referenceImages: string[]
  icon: string
}

export const stylePresets: StylePreset[] = [
  {
    id: "azuki",
    name: "Azuki-ish",
    description: "Anime clean lines, glossy jacket, katana vibes",
    prompt: "anime style, clean lines, glossy jacket, katana aesthetic, detailed eyes, high quality, centered portrait",
    negativePrompt: "blurry, deformed, extra limbs, text, watermark, low quality, cropped",
    referenceImages: ["/styles/azuki/ref1.jpg", "/styles/azuki/ref2.jpg"],
    icon: "⚔️"
  },
  {
    id: "milady",
    name: "Milady-ish", 
    description: "Lo-fi vaporwave, pastel, retro web feel",
    prompt: "vaporwave aesthetic, pastel colors, retro web style, lo-fi, dreamy, soft lighting, centered portrait",
    negativePrompt: "harsh lighting, dark colors, realistic, blurry, deformed, extra limbs, text, watermark",
    referenceImages: ["/styles/milady/ref1.jpg", "/styles/milady/ref2.jpg"],
    icon: "🌈"
  },
  {
    id: "goblin",
    name: "Goblin-ish",
    description: "Grimy, textured, cursed greens",
    prompt: "goblin aesthetic, grimy texture, cursed energy, green tones, rough details, fantasy creature, centered portrait",
    negativePrompt: "clean, polished, bright colors, blurry, deformed, extra limbs, text, watermark",
    referenceImages: ["/styles/goblin/ref1.jpg", "/styles/goblin/ref2.jpg"],
    icon: "👺"
  },
  {
    id: "punk",
    name: "Punk-ish",
    description: "Pixel/blocky, hard outlines",
    prompt: "pixel art style, blocky features, hard outlines, retro gaming aesthetic, 8-bit inspired, centered portrait",
    negativePrompt: "smooth, realistic, high resolution, blurry, deformed, extra limbs, text, watermark",
    referenceImages: ["/styles/punk/ref1.jpg", "/styles/punk/ref2.jpg"],
    icon: "🎮"
  },
  {
    id: "anime-noir",
    name: "Anime Noir",
    description: "Black/red, harsh shadows",
    prompt: "anime noir style, black and red color scheme, harsh shadows, dramatic lighting, film noir aesthetic, centered portrait",
    negativePrompt: "bright colors, soft lighting, blurry, deformed, extra limbs, text, watermark",
    referenceImages: ["/styles/anime-noir/ref1.jpg", "/styles/anime-noir/ref2.jpg"],
    icon: "🌙"
  }
]

export const getStyleById = (id: string): StylePreset | undefined => {
  return stylePresets.find(style => style.id === id)
} 