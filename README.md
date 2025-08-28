# PFP Masquerade

🎭 Morph any PFP or meme into the style of another collection (Azuki, Milady, Goblin, Punk-ish, etc.). High‑quality, pseudonymous, NFT-native.

## 🎯 Project Overview

PFP Masquerade allows users to transform their profile pictures or memes into the style of popular NFT collections while maintaining the original character's identity. Built for the crypto-native community with a focus on quality and pseudonymity.

## ⚡️ Tech Stack

- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS + ShadCN UI
- **Backend**: Next.js API routes
- **AI**: SDXL + IP-Adapter / ControlNet via Replicate API
- **Optional**: Real-ESRGAN upscaling, cloud storage

## 🧪 Features (MVP)

- ✅ Choose from curated base images or upload your own
- ✅ Select target style from popular NFT collections
- ✅ Generate high-quality style-morphed images (1024px)
- ✅ Share/Download results with social integration
- ✅ Rate limiting and abuse prevention
- ✅ Mobile-responsive design

## 🎮 User Flow

1. **Landing**: Quick explainer + "Masquerade Now" CTA
2. **Step 1**: Choose base image (curated gallery + upload option)
3. **Step 2**: Select target style (Azuki-ish, Milady-ish, etc.)
4. **Generate**: Progress indicator with fun microcopy
5. **Result**: Download/Share options + "Try another"

## 🧱 Style Presets

- **Azuki-ish**: Anime clean lines, glossy jacket, katana vibes
- **Milady-ish**: Lo-fi vaporwave, pastel, retro web feel
- **Goblin-ish**: Grimy, textured, cursed greens
- **Punk-ish**: Pixel/blocky, hard outlines
- **Anime Noir**: Black/red, harsh shadows

## 🔧 Environment Setup

```bash
cp .env.example .env.local
```

Required environment variables:
- `REPLICATE_API_TOKEN`: Your Replicate API key
- `RATE_LIMIT_WINDOW`: Rate limiting window (default: 86400)
- `RATE_LIMIT_MAX`: Max requests per window (default: 5)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📁 Project Structure

```
/app
  /(marketing)/page.tsx         # Landing page
  /studio/page.tsx              # Main app UI
  /api/masquerade/route.ts      # Generation API
/components
  /ui/*                         # ShadCN components
  ImagePicker.tsx
  StylePicker.tsx
  ResultCard.tsx
/lib
  replicate.ts                  # API client
  rate-limit.ts                 # Rate limiting
  styles.ts                     # Style presets
/public
  /styles/azuki/*.jpg
  /styles/milady/*.jpg
  /styles/goblin/*.jpg
```

## 💰 Cost Management

- SDXL + adapters: ~$0.03-0.05 per image
- Daily cap via `MAX_DAILY_CREDITS` environment variable
- Rate limiting per IP address

## 🗺 Roadmap

- [ ] Public gallery with voting
- [ ] Mint on Zora integration
- [ ] Style mixing capabilities
- [ ] Twitter bot integration
- [ ] Wallet connect for NFT imports

---

Built for the **#30DaysAIChallenge** 🚀 