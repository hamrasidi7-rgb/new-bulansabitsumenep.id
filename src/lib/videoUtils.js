/**
 * Utilitas video multi-platform.
 * parseVideoUrl(url) → { platform, videoId, embedUrl, thumbnailUrl }
 *
 * Platform yang didukung: youtube | instagram | tiktok | facebook | unknown
 * Thumbnail otomatis hanya tersedia untuk YouTube.
 * IG, TikTok, Facebook: gunakan thumbnail_url dari DB atau placeholder.
 */

// ── Placeholder gambar saat thumbnail tidak tersedia ──────────────────────
// Ganti dengan path file di /public jika ingin placeholder bergambar
const PLACEHOLDER = {
  instagram: null,
  tiktok:    null,
  facebook:  null,
}

// ── Regex pengenal per platform ────────────────────────────────────────────

const RE_YOUTUBE = /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
const RE_INSTAGRAM = /instagram\.com\/(?:reel|p)\/([A-Za-z0-9_-]+)/
const RE_TIKTOK = /tiktok\.com\/@[^/]+\/video\/(\d+)|vm\.tiktok\.com\/([A-Za-z0-9]+)/
const RE_FACEBOOK = /(?:fb\.watch\/([A-Za-z0-9]+)|facebook\.com\/(?:watch\/?\?v=(\d+)|[^/]+\/videos\/(\d+)))/

/**
 * Ekstrak info embed dari URL video manapun.
 * @param {string} rawUrl - URL asli yang ditempel pengguna/admin
 * @returns {{ platform: string, videoId: string|null, embedUrl: string|null, thumbnailUrl: string|null }}
 */
export function parseVideoUrl(rawUrl = '') {
  const url = rawUrl.trim()

  // ── YouTube ───────────────────────────────────────────────────────────
  const ytMatch = url.match(RE_YOUTUBE)
  if (ytMatch) {
    const videoId = ytMatch[1]
    return {
      platform: 'youtube',
      videoId,
      embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    }
  }

  // ── Instagram ─────────────────────────────────────────────────────────
  const igMatch = url.match(RE_INSTAGRAM)
  if (igMatch) {
    // Bersihkan URL ke bentuk kanonik sebelum /embed
    const cleanUrl = url.split('?')[0].replace(/\/$/, '')
    return {
      platform: 'instagram',
      videoId: igMatch[1],
      embedUrl: `${cleanUrl}/embed/`,
      thumbnailUrl: PLACEHOLDER.instagram,
    }
  }

  // ── TikTok ────────────────────────────────────────────────────────────
  const ttMatch = url.match(RE_TIKTOK)
  if (ttMatch) {
    const videoId = ttMatch[1] || ttMatch[2] || null
    const embedUrl = videoId
      ? `https://www.tiktok.com/embed/v2/${videoId}`
      : null
    return {
      platform: 'tiktok',
      videoId,
      embedUrl,
      thumbnailUrl: PLACEHOLDER.tiktok,
    }
  }

  // ── Facebook ──────────────────────────────────────────────────────────
  const fbMatch = url.match(RE_FACEBOOK)
  if (fbMatch) {
    const videoId = fbMatch[1] || fbMatch[2] || fbMatch[3] || null
    // Facebook video plugin menggunakan URL asli sebagai parameter href
    const encodedHref = encodeURIComponent(url)
    return {
      platform: 'facebook',
      videoId,
      embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodedHref}&show_text=0`,
      thumbnailUrl: PLACEHOLDER.facebook,
    }
  }

  // ── Tidak dikenal ─────────────────────────────────────────────────────
  return { platform: 'unknown', videoId: null, embedUrl: null, thumbnailUrl: null }
}

/**
 * Label ramah untuk nama platform.
 */
export function platformLabel(platform) {
  return { youtube: 'YouTube', instagram: 'Instagram', tiktok: 'TikTok', facebook: 'Facebook' }[platform] ?? 'Video'
}

/**
 * Warna badge per platform (kelas Tailwind).
 */
export function platformBadgeClass(platform) {
  return {
    youtube:   'bg-red-600 text-white',
    instagram: 'bg-gradient-to-br from-purple-500 to-pink-500 text-white',
    tiktok:    'bg-black text-white',
    facebook:  'bg-blue-600 text-white',
  }[platform] ?? 'bg-gray-500 text-white'
}
