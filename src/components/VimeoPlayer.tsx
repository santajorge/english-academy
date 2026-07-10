import React from 'react';

interface VimeoPlayerProps {
  videoId: string;
  title?: string;
}

export default function VimeoPlayer({ videoId, title = "Lección de thebee'sniz" }: VimeoPlayerProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border-4 border-indigo shadow-[8px_8px_0px_0px_rgba(71,80,154,1)] bg-night" style={{ paddingTop: '56.25%' }}>
      <iframe
        src={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479&dnt=1`}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
        title={title}
        className="absolute top-0 left-0 w-full h-full"
      ></iframe>
    </div>
  );
}
