export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  duration: string;
  publishedAt: string;
}

export const mockYoutubeVideos: YouTubeVideo[] = [
  {
    id: "abc123",
    title: "Java Spring Boot - Crear API REST desde Cero",
    thumbnail: "https://img.youtube.com/vi/abc123/maxresdefault.jpg",
    views: "125,430",
    duration: "45:30",
    publishedAt: "2024-01-15",
  },
  {
    id: "def456",
    title: "SQL para Principiantes - Tutorial Completo",
    thumbnail: "https://img.youtube.com/vi/def456/maxresdefault.jpg",
    views: "89,210",
    duration: "1:02:15",
    publishedAt: "2024-02-20",
  },
  {
    id: "ghi789",
    title: "Git y GitHub - Guía Definitiva para Developers",
    thumbnail: "https://img.youtube.com/vi/ghi789/maxresdefault.jpg",
    views: "67,890",
    duration: "38:45",
    publishedAt: "2024-03-10",
  },
  {
    id: "jkl012",
    title: "Microservicios con Spring Cloud",
    thumbnail: "https://img.youtube.com/vi/jkl012/maxresdefault.jpg",
    views: "54,320",
    duration: "52:10",
    publishedAt: "2024-04-05",
  },
  {
    id: "mno345",
    title: "Docker para Desarrolladores Java",
    thumbnail: "https://img.youtube.com/vi/mno345/maxresdefault.jpg",
    views: "43,150",
    duration: "41:20",
    publishedAt: "2024-05-12",
  },
];
