"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Eye, Clock, Loader2 } from "lucide-react";

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  duration: string;
  publishedAt: string;
  isShort: boolean;
}

interface YouTubeData {
  videos: YouTubeVideo[];
  shorts: YouTubeVideo[];
}

export default function YoutubeCarousel() {
  const [data, setData] = useState<YouTubeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "videos" | "shorts">("all");

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch("/api/youtube");
        if (!response.ok) throw new Error("Failed to fetch");
        const youtubeData = await response.json();
        setData(youtubeData);
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
        // Use fallback mock data
        setData({
          videos: getFallbackVideos(),
          shorts: getFallbackShorts(),
        });
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  // Get videos based on active tab
  const getCurrentVideos = (): YouTubeVideo[] => {
    if (!data) return [];
    
    switch (activeTab) {
      case "videos":
        return data.videos;
      case "shorts":
        return data.shorts;
      case "all":
      default:
        // Show all videos, shorts first then regular videos
        return [...data.shorts, ...data.videos];
    }
  };

  const currentVideos = getCurrentVideos();
  const hasVideos = data && data.videos.length > 0;
  const hasShorts = data && data.shorts.length > 0;

  return (
    <section id="youtube" className="py-12 md:py-24 bg-muted/50">
      <div className="container">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Videos en YouTube
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tutoriales y guías sobre desarrollo backend, bases de datos y mejores prácticas de programación.
          </p>
        </div>

        {/* Tabs para Videos y Shorts */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-8">
          <Button
            variant={activeTab === "all" ? "default" : "outline"}
            onClick={() => setActiveTab("all")}
            className="gap-2"
            size="sm"
          >
            <Play className="h-4 w-4" />
            <span className="hidden sm:inline">Todos</span>
          </Button>
          {hasVideos && (
            <Button
              variant={activeTab === "videos" ? "default" : "outline"}
              onClick={() => setActiveTab("videos")}
              className="gap-2"
              size="sm"
            >
              <Play className="h-4 w-4" />
              <span className="hidden sm:inline">Videos</span>
              <span className="text-xs bg-background/20 px-1.5 rounded">{data?.videos.length}</span>
            </Button>
          )}
          {hasShorts && (
            <Button
              variant={activeTab === "shorts" ? "default" : "outline"}
              onClick={() => setActiveTab("shorts")}
              className="gap-2"
              size="sm"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.77,10.32l-1.2-.5L18,9.06c1.84-.96,2.53-3.23,1.56-5.06s-3.24-2.53-5.07-1.56L6,6.94c-1.29.68-2.07,2.04-2,3.49.07,1.42.96,2.68,2.3,3.23l1.2.5L6,14.06c-1.84.96-2.53,3.23-1.56,5.06s3.24,2.53,5.07,1.56l8.5-4.5c1.29-.68,2.07-2.04,2-3.49C19.2,12.13,18.31,10.87,17.77,10.32z" />
              </svg>
              <span className="hidden sm:inline">Shorts</span>
              <span className="text-xs bg-background/20 px-1.5 rounded">{data?.shorts.length}</span>
            </Button>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Cargando videos...</span>
          </div>
        ) : data && currentVideos.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 mx-auto bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
              <Play className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Videos de @fmoutinhodev</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Configura tu API key de YouTube en las variables de entorno para mostrar tus videos aquí.
              </p>
            </div>
            <Button asChild className="bg-red-600 hover:bg-red-700 gap-2">
              <a
                href="https://youtube.com/@fmoutinhodev"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Visitar Canal
              </a>
            </Button>
          </div>
        ) : currentVideos.length > 0 ? (
          <>
            <Carousel
              opts={{
                align: "start",
                loop: currentVideos.length > 3,
              }}
              className="w-full max-w-5xl mx-auto"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {currentVideos.map((video, index) => {
                  // Determine if this specific item is a short based on original data
                  const isShortVideo = video.isShort;
                  
                  return (
                    <CarouselItem 
                      key={`${video.id}-${index}`} 
                      className={
                        isShortVideo 
                          ? "pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5" 
                          : "pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                      }
                    >
                      <div className="p-1 h-full">
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                          <div className={`relative ${isShortVideo ? "aspect-[9/16]" : "aspect-video"} bg-muted`}>
                            {video.thumbnail ? (
                              <Image
                                src={video.thumbnail}
                                alt={video.title}
                                fill
                                className="object-cover"
                                unoptimized // Allow external images
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10">
                                <Play className="h-12 w-12 text-primary" />
                              </div>
                            )}
                            {/* Play overlay */}
                            <a
                              href={`https://youtube.com/watch?v=${video.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 transition-colors group"
                            >
                              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Play className="h-6 w-6 text-white fill-white" />
                              </div>
                            </a>
                            {/* Duration badge */}
                            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                              {video.duration}
                            </div>
                            {/* Shorts badge */}
                            {isShortVideo && (
                              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-bold flex items-center gap-1">
                                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M17.77,10.32l-1.2-.5L18,9.06c1.84-.96,2.53-3.23,1.56-5.06s-3.24-2.53-5.07-1.56L6,6.94c-1.29.68-2.07,2.04-2,3.49.07,1.42.96,2.68,2.3,3.23l1.2.5L6,14.06c-1.84.96-2.53,3.23-1.56,5.06s3.24,2.53,5.07,1.56l8.5-4.5c1.29-.68,2.07-2.04,2-3.49C19.2,12.13,18.31,10.87,17.77,10.32z" />
                                </svg>
                                SHORT
                              </div>
                            )}
                          </div>
                          <CardContent className="p-3 flex-1 flex flex-col">
                            <h3 className="font-semibold text-sm line-clamp-2 mb-2 flex-1">
                              {video.title}
                            </h3>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                <span>{video.views}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{video.duration}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              {currentVideos.length > 3 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
            </Carousel>
          </>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No hay videos disponibles</p>
          </div>
        )}

        <div className="text-center mt-8">
          <Button variant="outline" size="lg" asChild>
            <a
              href="https://youtube.com/@fmoutinhodev"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              Ver canal completo
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function getFallbackVideos(): YouTubeVideo[] {
  return [];
}

function getFallbackShorts(): YouTubeVideo[] {
  return [];
}
