interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

// Simple in-memory rate limiting (for production, use Redis or similar)
const store: RateLimitStore = {}

export interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Maximum requests per window
}

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  resetTime: number
}

export function rateLimit(
  identifier: string,
  config: RateLimitConfig = {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || "86400") * 1000, // 24 hours default
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX || "5"), // 5 requests default
  }
): RateLimitResult {
  const now = Date.now()
  const windowStart = now - config.windowMs

  // Clean up old entries
  Object.keys(store).forEach(key => {
    if (store[key].resetTime <= now) {
      delete store[key]
    }
  })

  // Get or create entry for this identifier
  if (!store[identifier] || store[identifier].resetTime <= now) {
    store[identifier] = {
      count: 0,
      resetTime: now + config.windowMs,
    }
  }

  const entry = store[identifier]
  const remaining = Math.max(0, config.maxRequests - entry.count)

  if (entry.count >= config.maxRequests) {
    return {
      success: false,
      limit: config.maxRequests,
      remaining: 0,
      resetTime: entry.resetTime,
    }
  }

  // Increment counter
  entry.count++

  return {
    success: true,
    limit: config.maxRequests,
    remaining: remaining - 1,
    resetTime: entry.resetTime,
  }
}

export function getClientIP(request: Request): string {
  // Get IP from various headers (for different deployment environments)
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")
  const cfConnectingIP = request.headers.get("cf-connecting-ip")

  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }

  if (realIP) {
    return realIP
  }

  if (cfConnectingIP) {
    return cfConnectingIP
  }

  return "unknown"
} 