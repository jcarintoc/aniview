/**
 * Extracts YouTube video ID from various URL formats
 */
export const getYouTubeVideoId = (url: string | null): string | null => {
  if (!url) return null;

  // Handle embed URLs
  const embedMatch = url.match(/\/embed\/([^?]+)/);
  if (embedMatch) return embedMatch[1];

  // Handle watch URLs
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) return watchMatch[1];

  // Handle youtu.be URLs
  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) return shortMatch[1];

  return null;
};

/**
 * Constructs a YouTube embed URL with optimal parameters
 */
export const buildYouTubeEmbedUrl = (
  videoId: string | null,
  options?: {
    autoplay?: boolean;
    mute?: boolean;
    loop?: boolean;
    controls?: boolean;
    enablejsapi?: boolean;
  }
): string | null => {
  if (!videoId) return null;

  const {
    autoplay = true,
    mute = true,
    loop = true,
    controls = false,
    enablejsapi = true,
  } = options || {};

  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: mute ? "1" : "0",
    loop: loop ? "1" : "0",
    controls: controls ? "1" : "0",
    modestbranding: "1",
    rel: "0",
    showinfo: "0",
    iv_load_policy: "3",
    playsinline: "1",
    enablejsapi: enablejsapi ? "1" : "0",
  });

  // Add playlist parameter for looping
  if (loop) {
    params.set("playlist", videoId);
  }

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
};

/**
 * Processes embed URL from API (removes escaped slashes and extracts video ID)
 */
export const processApiEmbedUrl = (embedUrl: string | null): string | null => {
  if (!embedUrl) return null;

  // Remove escaped slashes
  const cleanUrl = embedUrl.replace(/\\/g, "");

  // Extract video ID
  const videoId = getYouTubeVideoId(cleanUrl);

  return videoId;
};

/**
 * Sends commands to YouTube iframe using postMessage API
 */
export const sendYouTubeCommand = (
  iframe: HTMLIFrameElement | null,
  command: "playVideo" | "pauseVideo" | "mute" | "unMute" | "stopVideo"
) => {
  if (!iframe || !iframe.contentWindow) return;

  iframe.contentWindow.postMessage(
    JSON.stringify({
      event: "command",
      func: command,
      args: [],
    }),
    "*"
  );
};
