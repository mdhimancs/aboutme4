import React, { useState, useRef } from 'react';
import { Compass, Film, Sparkles, Shield, BookOpen, Music, Globe, Cpu, Search, Play, ExternalLink, Utensils, Plane, Trophy, Smile, Footprints, ChevronLeft, ChevronRight, Users, Heart } from 'lucide-react';
import { CURATED_VIDEOS } from '../data/curatedVideos';
import { useHoverScroll } from '../lib/utils';

interface OffKeyboardProps {
  theme?: string;
}

export const OffKeyboard: React.FC<OffKeyboardProps> = ({ theme = 'apple-dark' }) => {
  const isLight = theme === 'apple-light';
  const [activeTab, setActiveTab] = useState<'interests' | 'videos'>('interests');

  // Slider strip ref for categories
  const sliderRef = useRef<HTMLDivElement>(null);
  const { onMouseMove, onMouseLeave } = useHoverScroll(sliderRef);

  // Video state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const videoCategories = ['All', 'Cybersecurity', 'Architecture', 'Science', 'Technology', 'Behaviour', 'Invention', 'Reality'];

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.75;
      sliderRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const filteredVideos = CURATED_VIDEOS.filter(video => {
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.professor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const interestsList = [
    {
      title: "3k Steps a Day",
      category: "Wellness & Clarity",
      description: "Committed to a daily physical movement ritual of at least 3,000 steps. Walking serves as active meditation for debugging complex architectural dilemmas.",
      icon: <Footprints className="w-5 h-5 text-purple-500" />,
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=800&auto=format&fit=crop",
      highlights: ["Active Meditation", "Cardio Health", "Mind Clearing"]
    },
    {
      title: "Books & Literature",
      category: "Philosophy & Mind",
      description: "Avid reader of classical philosophy, speculative sci-fi, and technical memoirs. Books serve as our anchor to past wisdom and infinite futures.",
      icon: <BookOpen className="w-5 h-5 text-blue-500" />,
      image: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?q=80&w=800&auto=format&fit=crop",
      highlights: ["Stoic Philosophy", "Sci-Fi Epics", "Biographies"]
    },
    {
      title: "Cooking & Food",
      category: "Culinary Arts",
      description: "Experimenting with fusion recipes, precision slow-cooking, and aromatic spice pairings. Finding the same creative chemistry in the kitchen as in systems architecture.",
      icon: <Utensils className="w-5 h-5 text-amber-500" />,
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop",
      highlights: ["Flavor Profiles", "Precision Technique", "Global Cuisine"]
    },
    {
      title: "Football & Tactics",
      category: "Sport & Strategy",
      description: "Passionate follower of football (soccer) tactics, team synergy, high-pressing formations, and the mental resilience required in competitive matches.",
      icon: <Trophy className="w-5 h-5 text-rose-500" />,
      image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=800&auto=format&fit=crop",
      highlights: ["Match Tactics", "Team Synergy", "Strategic Discipline"]
    },
    {
      title: "Friends and Family",
      category: "Connection & Life",
      description: "Cherishing meaningful conversations, family bonds, and shared laughter. True resilience, grounding, and perspective stem from the genuine relationships nurtured off-screen.",
      icon: <Users className="w-5 h-5 text-rose-500" />,
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop",
      highlights: ["Shared Moments", "Lifelong Bonds", "Grounding & Perspective"]
    },
    {
      title: "Humor & Wit",
      category: "Perspective",
      description: "Believing that humor is the ultimate shock-absorber for life's complexities. Quick wit and self-awareness keep engineering rigorous yet lighthearted.",
      icon: <Smile className="w-5 h-5 text-yellow-500" />,
      image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop",
      highlights: ["Satire & Irony", "Joyful Resilience", "Sharp Wit"]
    },
    {
      title: "Music",
      category: "Acoustic Arts",
      description: "Appreciating modal jazz, ambient soundscapes, and classical compositions. Music provides deep cognitive focus, emotional resonance, and creative rhythm.",
      icon: <Music className="w-5 h-5 text-violet-500" />,
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
      highlights: ["Modal Jazz", "Ambient Synthesis", "Acoustic Resonance"]
    },
    {
      title: "Travel & Architecture",
      category: "Exploration",
      description: "Exploring architectural marvels, historic cities, and diverse cultures across the globe. Studying structural form and spatial design in person.",
      icon: <Plane className="w-5 h-5 text-emerald-500" />,
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop",
      highlights: ["Parametric Design", "Cultural Heritage", "Urban Exploration"]
    }
  ];

  return (
    <section 
      id="offkeyboard" 
      className={`relative overflow-hidden min-h-screen lg:h-screen w-full flex flex-col justify-center py-3 sm:py-4 lg:py-5 pb-8 sm:pb-12 lg:pb-14 px-6 sm:px-10 lg:px-14 max-w-5xl lg:max-w-6xl mx-auto border-t ${
        isLight ? 'border-zinc-200 bg-[#fcfcfd]' : 'border-white/10 bg-[#000000]'
      }`}
    >
      {/* Background Aura Effects */}
      <div 
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[850px] h-[320px] sm:h-[450px] rounded-full blur-[90px] sm:blur-[130px] pointer-events-none transition-all duration-700 ${
          isLight 
            ? 'bg-gradient-to-tr from-blue-400/15 via-indigo-300/12 to-sky-300/10' 
            : 'bg-gradient-to-tr from-blue-600/16 via-indigo-500/12 to-cyan-500/10'
        }`} 
      />
      <div 
        className={`absolute -bottom-20 -right-20 w-80 sm:w-96 h-80 sm:h-96 rounded-full blur-[80px] sm:blur-[110px] pointer-events-none ${
          isLight ? 'bg-indigo-300/10' : 'bg-blue-600/12'
        }`} 
      />
      <div 
        className={`absolute -top-12 -left-12 w-72 sm:w-80 h-72 sm:h-80 rounded-full blur-[70px] sm:blur-[100px] pointer-events-none ${
          isLight ? 'bg-sky-300/10' : 'bg-indigo-600/10'
        }`} 
      />

      <div className="relative w-full max-w-5xl lg:max-w-6xl mx-auto flex flex-col flex-1 min-h-0 justify-center space-y-2 sm:space-y-2.5">
        
        {/* Header & Sub-Navigation */}
        <div className="relative text-center space-y-1 mb-1.5 sm:mb-2 shrink-0">
          {/* Luminous aura behind heading */}
          <div 
            className={`absolute -top-3 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-20 sm:h-24 rounded-full blur-2xl pointer-events-none transition-all ${
              isLight 
                ? 'bg-gradient-to-r from-blue-400/25 via-sky-300/20 to-indigo-300/20 opacity-80' 
                : 'bg-gradient-to-r from-blue-500/30 via-cyan-400/20 to-indigo-500/25 opacity-90'
            }`} 
          />

          <div className={`relative inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[10.5px] font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20 backdrop-blur-md ${
            isLight ? 'shadow-sm' : 'shadow-[0_0_12px_rgba(59,130,246,0.15)]'
          }`}>
            <Compass className="w-3 h-3 text-blue-500" />
            <span>Intellectual Curiosity, Life & Pursuits</span>
          </div>
          <h2 className={`relative text-lg sm:text-2xl lg:text-3xl font-bold tracking-tight transition-all ${
            isLight 
              ? 'text-zinc-900 drop-shadow-[0_2px_16px_rgba(59,130,246,0.22)]' 
              : 'text-white drop-shadow-[0_0_24px_rgba(96,165,250,0.40)]'
          }`}>
            Off Keyboard: Interests & Pursuits
          </h2>

          {/* Sub-Tabs: Interests vs Curated Videos */}
          <div className="flex items-center justify-center pt-0.5 gap-2">
            <button
              onClick={() => setActiveTab('interests')}
              className={`flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-xl text-[10px] sm:text-[11px] font-semibold transition-all ${
                activeTab === 'interests'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : isLight
                    ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Compass className="w-3 h-3" />
              <span>Interests & Pursuits</span>
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-xl text-[10px] sm:text-[11px] font-semibold transition-all ${
                activeTab === 'videos'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : isLight
                    ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Film className="w-3 h-3" />
              <span>Curated Videos & Masterclasses</span>
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto min-h-0 pb-1 pr-0.5">
        {/* Tab Content: Interests */}
        {activeTab === 'interests' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 lg:gap-3 pb-1 animate-in fade-in duration-300">
            {interestsList.map((item, index) => (
              <div
                key={index}
                className={`group flex flex-col justify-between rounded-xl sm:rounded-2xl p-2.5 sm:p-3 border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                  isLight 
                    ? 'bg-zinc-50/90 border-zinc-200 hover:border-blue-500/50 hover:bg-white' 
                    : 'bg-white/[0.02] border-white/10 hover:border-blue-500/50 hover:bg-white/[0.04]'
                }`}
              >
                <div>
                  <div className="relative h-18 sm:h-20 lg:h-22 w-full rounded-lg sm:rounded-xl overflow-hidden mb-1.5 sm:mb-2 bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-xs">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80" />
                    
                    {/* Category & Icon overlay pill */}
                    <div className="absolute top-1.5 left-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] sm:text-[8.5px] font-semibold bg-black/75 text-white backdrop-blur-md border border-white/10 shadow-xs">
                      <span className="shrink-0">{React.cloneElement(item.icon, { className: "w-3 h-3" })}</span>
                      <span>{item.category}</span>
                    </div>
                  </div>

                  <h3 className={`text-[11px] sm:text-[12px] font-bold tracking-tight mb-0.5 line-clamp-1 group-hover:text-blue-500 transition-colors ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                    {item.title}
                  </h3>

                  <p className={`text-[9.5px] sm:text-[10px] lg:text-[10.5px] leading-tight sm:leading-snug mb-1.5 line-clamp-2 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    {item.description}
                  </p>
                </div>

                <div className="pt-1.5 border-t border-zinc-200/70 dark:border-white/10 flex items-center gap-1 flex-wrap">
                  {item.highlights.map((h, i) => (
                    <span
                      key={i}
                      className={`text-[7.5px] sm:text-[8px] lg:text-[8.5px] px-1.5 py-0.5 rounded font-medium border leading-none ${
                        isLight 
                          ? 'bg-blue-50/80 border-blue-100 text-blue-700' 
                          : 'bg-blue-500/10 border-blue-500/20 text-blue-300'
                      }`}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: Curated Videos with Slider Strip */}
        {activeTab === 'videos' && (
          <div className="flex flex-col flex-1 pb-2 animate-in fade-in duration-300 space-y-2">
            
            {/* Search & Slider Strip */}
            <div className="flex flex-col md:flex-row gap-2 items-center justify-between shrink-0">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search lectures, professors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full rounded-xl pl-8 pr-3 py-0.5 text-[11px] transition-colors backdrop-blur-md border ${
                    isLight 
                      ? 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none' 
                      : 'bg-white/[0.03] border-white/10 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none'
                  }`}
                />
              </div>

              {/* Slider Strip with Scroll Buttons */}
              <div className="relative flex items-center w-full md:w-auto max-w-xl">
                <button
                  onClick={() => scrollSlider('left')}
                  className={`absolute -left-2.5 z-10 p-0.5 rounded-full shadow-md border transition-all ${
                    isLight ? 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50' : 'bg-zinc-900 border-white/20 text-zinc-200 hover:bg-zinc-800'
                  }`}
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-3 h-3" />
                </button>

                <div 
                  ref={sliderRef}
                  onMouseMove={onMouseMove}
                  onMouseLeave={onMouseLeave}
                  className="flex items-center gap-1 overflow-x-auto scrollbar-none px-5 py-0.5 scroll-smooth max-w-full cursor-ew-resize select-none"
                >
                  {videoCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap transition-all shrink-0 ${
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

                <button
                  onClick={() => scrollSlider('right')}
                  className={`absolute -right-2.5 z-10 p-0.5 rounded-full shadow-md border transition-all ${
                    isLight ? 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50' : 'bg-zinc-900 border-white/20 text-zinc-200 hover:bg-zinc-800'
                  }`}
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Video Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {filteredVideos.map((video) => (
                <a
                  key={video.id}
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                    isLight 
                      ? 'bg-zinc-50/80 border-zinc-200 hover:border-blue-500/50 hover:bg-white' 
                      : 'bg-white/[0.02] border-white/10 hover:border-blue-500/50 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="relative h-16 sm:h-18 w-full overflow-hidden bg-zinc-900">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                      </div>
                    </div>

                    <div className="absolute top-1 left-1 flex items-center gap-1">
                      <span className="px-1 py-0.2 rounded text-[7px] font-bold tracking-wider uppercase bg-black/70 text-blue-400 backdrop-blur-md border border-white/10">
                        {video.institution}
                      </span>
                    </div>
                    <div className="absolute top-1 right-1">
                      <span className="px-1 py-0.2 rounded text-[7px] font-semibold bg-white/10 text-white backdrop-blur-md border border-white/10">
                        {video.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-2 space-y-0.5 justify-between">
                    <div className="space-y-0.5">
                      <h3 className={`text-[10px] font-bold tracking-tight line-clamp-1 transition-colors ${
                        isLight ? 'text-zinc-900 group-hover:text-blue-600' : 'text-white group-hover:text-blue-400'
                      }`}>
                        {video.title}
                      </h3>
                      <p className={`text-[8.5px] font-semibold ${isLight ? 'text-blue-600' : 'text-blue-400'}`}>
                        {video.professor}
                      </p>
                      <p className={`text-[8.5px] line-clamp-1 leading-snug ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                        {video.description}
                      </p>
                    </div>
 
                    <div className="pt-1 border-t flex items-center justify-between text-[8.5px] font-medium text-zinc-400 border-zinc-200 dark:border-white/10">
                      <span className="group-hover:text-blue-500 transition-colors">Watch Lecture</span>
                      <ExternalLink className="w-2.5 h-2.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-blue-500" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
        </div>

      </div>
    </section>
  );
};
