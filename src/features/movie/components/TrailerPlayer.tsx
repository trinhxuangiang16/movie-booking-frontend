"use client";

import { useState } from "react";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  videoId: string;
  title?: string;
}

export default function TrailerPlayer({ videoId, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="absolute w-full aspect-video rounded-2xl overflow-hidden bg-black group">
      {!isPlaying && (
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={() => setIsPlaying(true)}
        >
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title || "video"}
            className="w-full h-full object-cover"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 hover:bg-white text-black rounded-full p-5 transition scale-90 group-hover:scale-100 shadow-lg">
              <Play className="w-8 h-8 fill-black" />
            </div>
          </div>
        </div>
      )}

      {/* Video iframe */}
      {isPlaying && (
        <iframe
          className="w-1/2"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1`}
          title={title || "YouTube video"}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      )}
    </div>
  );
}
