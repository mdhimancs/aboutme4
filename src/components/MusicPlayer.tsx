import React, { useState } from 'react';
import { Music, X, Play, Pause } from 'lucide-react';

interface MusicPlayerProps {
  theme?: string;
  isMobile?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ theme = 'apple-light', isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const isLight = theme === 'apple-light' || theme === 'light';

  // Using the requested YouTube URL
  const videoId = 'QBbcl05Bx1U'; 

  return (
    <div className="relative z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full transition-colors ${
            isLight
              ? 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/70'
              : 'text-zinc-300 hover:text-white hover:bg-white/10'
          }`}
          title="Music Player"
        >
          <Music className="w-3.5 h-3.5 text-blue-500" />
          {!isMobile && <span className="text-[10px] font-bold">Music</span>}
        </button>
      ) : (
        <div className={`absolute top-8 right-0 p-2.5 rounded-2xl shadow-2xl w-[216px] border transition-all ${
          isLight
            ? 'bg-[#f4f4f6] border-zinc-300 text-zinc-900'
            : 'bg-zinc-900 border-zinc-800 text-white'
        }`}>
          <div className="flex justify-between items-center mb-1.5">
            <div className="flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-blue-500" />
              <span className={`text-xs font-semibold ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                Music Player
              </span>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className={`p-1 rounded-md transition-colors ${isLight ? 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/60' : 'text-zinc-400 hover:text-white hover:bg-white/10'}`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <iframe
            width="100%"
            height="130"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}`}
            title="Music Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg mb-1 shadow-inner"
          ></iframe>
        </div>
      )}
    </div>
  );
};

