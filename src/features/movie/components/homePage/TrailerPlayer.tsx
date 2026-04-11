"use client";

import { useState } from "react";
import YouTube from "react-youtube";
import { set } from "zod";

export default function TrailerPlayer({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  const [loading, setLoading] = useState(true);
  const onReady = (event: {
    target: { setPlaybackQuality: (arg0: string) => void };
  }) => {
    event.target.setPlaybackQuality("hd1080");
    setLoading(false);
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10">
          <div className="animate-spin w-10 h-10 border-4 border-white/30 border-t-white rounded-full" />
        </div>
      )}
      <YouTube
        videoId={videoId}
        className="w-full h-full"
        iframeClassName="w-full h-full"
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            modestbranding: 1,
            rel: 0,
          },
        }}
        onReady={onReady}
      />
    </div>
  );
}
