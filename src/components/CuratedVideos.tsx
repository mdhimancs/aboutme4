import React, { useState } from 'react';
import { Play, ExternalLink, Search, Film, Sparkles } from 'lucide-react';
import { CURATED_VIDEOS, CuratedVideo } from '../data/curatedVideos';

interface CuratedVideosProps {
  theme?: string;
}

export const CuratedVideos: React.FC<CuratedVideosProps> = ({ theme = 'apple-dark' }) => {
  const isLight = theme === 'apple-light';
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Cybersecurity', 'Architecture', 'Science', 'Technology', 'Behaviour', 'Invention', 'Reality'];

  const filteredVideos = CURATED_VIDEOS.filter(video => {
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.professor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`h-full w-full flex flex-col px-4 sm:px-8 lg:px-16 py-12 sm:py-16 overflow-y-auto ${isLight ? 'bg-white text-zinc-900' : 'bg-[#000000] text-white'}`}>
      <div className="w-full max-w-7xl mx-auto flex flex-col flex-1 min-h-0">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-8 shrink-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20">
            <Film className="w-3.5 h-3.5" />
            <span>Curated Lectures & Masterclasses</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
            Curated Videos & Masterclasses
          </h2>
          <p className={`max-w-2xl mx-auto text-xs sm:text-sm ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
            A hand-picked collection of foundational lectures, keynote masterclasses, and documentaries spanning cybersecurity, computer science, physics, and human behavior.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 shrink-0">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search lectures, professors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm transition-colors backdrop-blur-md border ${
                isLight 
                  ? 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none' 
                  : 'bg-white/[0.03] border-white/10 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none'
              }`}
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-1.5 justify-center md:justify-end w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                    : isLight
                      ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                      : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {filteredVideos.map((video) => (
            <a
              key={video.id}
              href={video.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                isLight 
                  ? 'bg-zinc-50/80 border-zinc-200 hover:border-blue-500/50 hover:bg-white hover:shadow-blue-500/5' 
                  : 'bg-white/[0.02] border-white/10 hover:border-blue-500/50 hover:bg-white/[0.04] hover:shadow-blue-500/10'
              }`}
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Institution & Category Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-black/70 text-blue-400 backdrop-blur-md border border-white/10">
                    {video.institution}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-white/10 text-white backdrop-blur-md border border-white/10">
                    {video.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5 space-y-3 justify-between">
                <div className="space-y-1.5">
                  <h3 className={`text-base font-bold tracking-tight line-clamp-1 transition-colors ${
                    isLight ? 'text-zinc-900 group-hover:text-blue-600' : 'text-white group-hover:text-blue-400'
                  }`}>
                    {video.title}
                  </h3>
                  <p className={`text-xs font-semibold ${isLight ? 'text-blue-600' : 'text-blue-400'}`}>
                    {video.professor}
                  </p>
                  <p className={`text-xs line-clamp-2 leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    {video.description}
                  </p>
                </div>

                <div className="pt-3 border-t flex items-center justify-between text-xs font-medium text-zinc-400 border-zinc-200 dark:border-white/10">
                  <span className="group-hover:text-blue-500 transition-colors">Watch Lecture / Masterclass</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-blue-500" />
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
};
