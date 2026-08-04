import { NextResponse } from "next/server";

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  duration: string;
  publishedAt: string;
  isShort: boolean;
}

interface Thumbnail {
  url: string;
  width?: number;
  height?: number;
}

interface Thumbnails {
  default?: Thumbnail;
  high?: Thumbnail;
  maxres?: Thumbnail;
  medium?: Thumbnail;
  standard?: Thumbnail;
}

interface Snippet {
  title?: string;
  thumbnails?: Thumbnails;
  publishedAt?: string;
}

interface ContentDetails {
  videoId?: string;
  duration?: string;
}

interface Statistics {
  viewCount?: number;
  likeCount?: number;
}

interface VideoItem {
  id?: string;
  snippet?: Snippet;
  contentDetails?: ContentDetails;
  statistics?: Statistics;
}

interface PlaylistItem {
  contentDetails?: ContentDetails;
  snippet?: Snippet;
}

interface PlaylistResponse {
  items?: PlaylistItem[];
}

interface VideoDetailsResponse {
  items?: VideoItem[];
}

interface ChannelResponse {
  items?: Array<{
    contentDetails?: {
      relatedPlaylists?: {
        uploads?: string;
      };
    };
  }>;
}

// YouTube API key should be set in environment variables
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
// Tu canal de YouTube: @fmoutinhodev
// El CHANNEL_ID se puede obtener desde YouTube Studio > Configuración > Información del canal
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || "";

export async function GET() {
  // If no API key, return mock data for development
  if (!YOUTUBE_API_KEY) {
    return NextResponse.json({
      videos: getMockVideos(),
      shorts: getMockShorts(),
    });
  }

  try {
    // Fetch uploads playlist ID from channel
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!channelResponse.ok) {
      throw new Error("Failed to fetch channel data");
    }

    const channelData: ChannelResponse = await channelResponse.json();
    const uploadsPlaylistId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) {
      throw new Error("Could not find uploads playlist");
    }

    // Fetch videos from uploads playlist
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=20&key=${YOUTUBE_API_KEY}`
    );

    if (!videosResponse.ok) {
      throw new Error("Failed to fetch videos");
    }

    const videosData: PlaylistResponse = await videosResponse.json();
    
    if (!videosData.items || videosData.items.length === 0) {
      return NextResponse.json({
        videos: getMockVideos(),
        shorts: getMockShorts(),
      });
    }

    const videoIds = videosData.items
      .map((item) => item.contentDetails?.videoId)
      .filter((id): id is string => Boolean(id))
      .join(",");

    if (!videoIds) {
      return NextResponse.json({
        videos: getMockVideos(),
        shorts: getMockShorts(),
      });
    }

    // Fetch video details (views, duration)
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    );

    if (!detailsResponse.ok) {
      throw new Error("Failed to fetch video details");
    }

    const detailsData: VideoDetailsResponse = await detailsResponse.json();

    // Combine data
    const allVideos: YouTubeVideo[] = videosData.items.map((item) => {
      const videoId = item.contentDetails?.videoId || "";
      const details = detailsData.items?.find((d) => d.id === videoId);

      const duration = parseDuration(details?.contentDetails?.duration || "");
      // YouTube Shorts are typically ≤ 60 seconds, but we use a small buffer
      const isShort = duration.seconds > 0 && duration.seconds <= 60;

      return {
        id: videoId,
        title: item.snippet?.title || "Sin título",
        thumbnail: item.snippet?.thumbnails?.maxres?.url || 
                   item.snippet?.thumbnails?.high?.url || 
                   item.snippet?.thumbnails?.default?.url || "",
        views: formatViews(details?.statistics?.viewCount || 0),
        duration: duration.formatted,
        publishedAt: item.snippet?.publishedAt || "",
        isShort,
      };
    });

    // Separate videos and shorts
    const videos = allVideos.filter((v) => !v.isShort).slice(0, 10);
    const shorts = allVideos.filter((v) => v.isShort).slice(0, 6);

    return NextResponse.json({ videos, shorts });
  } catch (error) {
    console.error("YouTube API error:", error);
    // Return mock data as fallback
    return NextResponse.json({
      videos: getMockVideos(),
      shorts: getMockShorts(),
    });
  }
}

function parseDuration(duration: string): { seconds: number; formatted: string } {
  if (!duration) return { seconds: 0, formatted: "0:00" };

  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return { seconds: 0, formatted: "0:00" };

  const hours = parseInt(match[1] || "0");
  const minutes = parseInt(match[2] || "0");
  const seconds = parseInt(match[3] || "0");

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  if (hours > 0) {
    return {
      seconds: totalSeconds,
      formatted: `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
    };
  }
  return {
    seconds: totalSeconds,
    formatted: `${minutes}:${seconds.toString().padStart(2, "0")}`,
  };
}

function formatViews(views: number): string {
  if (!views) return "0";
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
}

function getMockVideos(): YouTubeVideo[] {
  return [];
}

function getMockShorts(): YouTubeVideo[] {
  return [];
}
