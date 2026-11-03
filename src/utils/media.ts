export interface ParsedMedia {
  type: 'youtube' | 'drive' | 'direct_video' | 'image' | 'unknown';
  embedUrl: string;
  directUrl: string;
  thumbnailUrl?: string;
  providerLabel: string;
}

/**
 * Extracts YouTube Video ID from various URL formats
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const cleanUrl = url.trim();
  
  // Standard watch URL: youtube.com/watch?v=ID
  const watchMatch = cleanUrl.match(/(?:youtube\.com\/(?:watch\?.*v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})/i);
  if (watchMatch && watchMatch[1]) {
    return watchMatch[1];
  }

  // Short URL or path: youtu.be/ID
  const shortMatch = cleanUrl.match(/youtu\.be\/([\w-]{11})/i);
  if (shortMatch && shortMatch[1]) {
    return shortMatch[1];
  }

  return null;
}

/**
 * Extracts Google Drive File ID from various URL formats
 */
export function extractGoogleDriveId(url: string): string | null {
  if (!url) return null;
  const cleanUrl = url.trim();

  // drive.google.com/file/d/FILE_ID/...
  const fileMatch = cleanUrl.match(/drive\.google\.com\/file\/d\/([\w-]+)/i);
  if (fileMatch && fileMatch[1]) {
    return fileMatch[1];
  }

  // drive.google.com/open?id=FILE_ID or uc?id=FILE_ID
  const queryMatch = cleanUrl.match(/drive\.google\.com\/(?:open|uc)\?.*id=([\w-]+)/i);
  if (queryMatch && queryMatch[1]) {
    return queryMatch[1];
  }

  return null;
}

/**
 * Parses any media URL into embeddable format with metadata
 */
export function parseEmbedMediaUrl(url: string, forceType?: 'video' | 'foto'): ParsedMedia {
  if (!url || typeof url !== 'string') {
    return {
      type: 'unknown',
      embedUrl: '',
      directUrl: '',
      providerLabel: 'Enlace Directo'
    };
  }

  const cleanUrl = url.trim();

  // 1. YouTube
  const youtubeId = extractYouTubeId(cleanUrl);
  if (youtubeId) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`,
      directUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
      thumbnailUrl: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
      providerLabel: 'YouTube'
    };
  }

  // 2. Google Drive
  const driveId = extractGoogleDriveId(cleanUrl);
  if (driveId) {
    if (forceType === 'foto') {
      return {
        type: 'image',
        embedUrl: `https://lh3.googleusercontent.com/d/${driveId}`,
        directUrl: `https://drive.google.com/file/d/${driveId}/view`,
        thumbnailUrl: `https://lh3.googleusercontent.com/d/${driveId}`,
        providerLabel: 'Google Drive (Imagen)'
      };
    }
    return {
      type: 'drive',
      embedUrl: `https://drive.google.com/file/d/${driveId}/preview`,
      directUrl: `https://drive.google.com/file/d/${driveId}/view`,
      thumbnailUrl: `https://lh3.googleusercontent.com/d/${driveId}`,
      providerLabel: 'Google Drive'
    };
  }

  // 3. Direct Images (Unsplash, direct jpg/png/webp, SVG, data URL)
  const isImage = forceType === 'foto' || 
    /\.(jpeg|jpg|gif|png|webp|svg)($|\?)/i.test(cleanUrl) || 
    cleanUrl.startsWith('data:image/') ||
    cleanUrl.includes('images.unsplash.com') ||
    cleanUrl.includes('imgur.com');

  if (isImage) {
    return {
      type: 'image',
      embedUrl: cleanUrl,
      directUrl: cleanUrl,
      thumbnailUrl: cleanUrl,
      providerLabel: 'Imagen'
    };
  }

  // 4. Direct Videos (MP4, WebM)
  const isDirectVideo = /\.(mp4|webm|ogg)($|\?)/i.test(cleanUrl);
  if (isDirectVideo) {
    return {
      type: 'direct_video',
      embedUrl: cleanUrl,
      directUrl: cleanUrl,
      providerLabel: 'Video MP4/Directo'
    };
  }

  // Fallback
  return {
    type: 'unknown',
    embedUrl: cleanUrl,
    directUrl: cleanUrl,
    providerLabel: 'Enlace Web'
  };
}
