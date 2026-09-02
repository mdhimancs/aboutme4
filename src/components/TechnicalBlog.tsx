import React, { useState } from 'react';
import { Search, BookOpen, ShieldCheck, Scale, Sparkles, Lock, ArrowUpRight, FileText } from 'lucide-react';
import { BLOG_POSTS } from '../data/portfolioData';
import { BlogPost } from '../types';
import { BlogPostModal } from './BlogPostModal';
import { useHoverScroll } from '../lib/utils';

interface TechnicalBlogProps {
  theme?: string;
}

const CATEGORIES = [
  { id: 'all', label: 'All Publications' },
  { id: 'Executive Risk & GRC', label: 'Executive Risk & GRC' },
  { id: 'engineering', label: 'Architects & Engineering' },
  { id: 'AI Security Governance', label: 'AI Security Governance' },
  { id: 'IAM & Zero Trust', label: 'IAM & Zero Trust' },
  { id: 'Cybersecurity', label: 'Cybersecurity' },
  { id: 'Cloud', label: 'Cloud Architecture' },
  { id: 'Data Science', label: 'Data Science' },
];

export const TechnicalBlog: React.FC<TechnicalBlogProps> = ({ theme = 'apple-light' }) => {
  const isLight = theme === 'apple-light';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const { scrollRef, onMouseMove, onMouseLeave } = useHoverScroll();

  // Top CISO executive flagship whitepapers
  const executiveFlagshipPosts = BLOG_POSTS.filter(p => 
    p.id === 'bp-2026-fair-model' || 
    p.id === 'bp-2025-sec-disclosure' || 
    p.id === 'bp-2025-genai-sec' || 
    p.id === 'bp-2025-nhi-identities'
  );

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (post.tags && post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesCategory = selectedCategory === 'all' || 
                            post.category.toLowerCase() === selectedCategory.toLowerCase() ||
                            (selectedCategory === 'engineering' && (['IAM & Zero Trust', 'AI Security Governance', 'Cloud'].includes(post.category) || post.tags.some(t => ['Identity Federation', 'Tokenization', 'FIDO2'].includes(t)))) ||
                            (selectedCategory === 'Cloud' && (post.category.toLowerCase().includes('cloud') || post.category === 'Azure')) ||
                            (selectedCategory === 'IAM & Zero Trust' && (post.category === 'IAM' || post.category === 'IAM & Zero Trust'));

    return matchesSearch && matchesCategory;
  });

  return (
    <section 
      id="blog" 
      className={`relative overflow-hidden min-h-screen w-full flex flex-col justify-start py-6 sm:py-8 pb-12 sm:pb-16 lg:pb-20 px-6 sm:px-10 lg:px-14 max-w-5xl lg:max-w-6xl mx-auto border-t ${
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

      {/* Section Header */}
      <div className="relative w-full space-y-2 mb-4 shrink-0 text-left">
        {/* Luminous aura behind heading */}
        <div 
          className={`absolute -top-3 -left-2 sm:-left-4 w-72 sm:w-96 h-24 sm:h-28 rounded-full blur-2xl pointer-events-none transition-all ${
            isLight 
              ? 'bg-gradient-to-r from-blue-400/25 via-sky-300/20 to-indigo-300/20 opacity-80' 
              : 'bg-gradient-to-r from-blue-500/30 via-cyan-400/20 to-indigo-500/25 opacity-90'
          }`} 
        />

        <div className={`relative inline-flex items-center gap-2 px-3 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase backdrop-blur-md border ${
          isLight ? 'bg-blue-50/90 border-blue-200 text-blue-700 shadow-sm' : 'bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.15)]'
        }`}>
          <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
          <span>Cyber Strategy • Enterprise Risk Governance • Whitepapers & Playbooks</span>
        </div>
        <h3 className={`relative text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight transition-all ${
          isLight 
            ? 'text-zinc-900 drop-shadow-[0_2px_16px_rgba(59,130,246,0.22)]' 
            : 'text-white drop-shadow-[0_0_24px_rgba(96,165,250,0.40)]'
        }`}>
          Publications
        </h3>
        <p className={`relative max-w-4xl text-xs sm:text-sm leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
          Playbooks on Cyber Risk, Identity Architecture, AI Security and Regulatory Disclosure.
        </p>
      </div>

      {/* Featured CISO Executive Briefings Spotlight */}
      <div className="mb-6 w-full">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h4 className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${isLight ? 'text-zinc-800' : 'text-zinc-200'}`}>
              Featured Executive Briefings
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {executiveFlagshipPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setActivePost(post)}
              className={`group relative flex flex-col justify-between p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                isLight
                  ? 'bg-white border-zinc-200/80 hover:border-blue-500 hover:shadow-lg shadow-sm'
                  : 'bg-zinc-950/60 border-white/10 hover:border-blue-400/50 hover:bg-zinc-900/60 shadow-lg'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-semibold">
                  <span className={`px-2 py-0.5 rounded-full border ${
                    isLight 
                      ? 'bg-blue-50 border-blue-200 text-blue-700' 
                      : 'bg-blue-950/50 border-blue-800/60 text-blue-300'
                  }`}>
                    {post.category}
                  </span>
                  <span className={isLight ? 'text-zinc-500' : 'text-zinc-400'}>{post.readTime}</span>
                </div>

                <h5 className={`text-[11px] sm:text-[13px] font-bold leading-snug group-hover:text-blue-500 transition-colors line-clamp-2 max-w-[90%] ${
                  isLight ? 'text-zinc-900' : 'text-white'
                }`}>
                  {post.title}
                </h5>

                <p className={`text-[10px] leading-relaxed line-clamp-3 ${
                  isLight ? 'text-zinc-600' : 'text-zinc-400'
                }`}>
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-zinc-200/60 dark:border-white/10 flex items-center justify-between text-[11px]">
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map((tag, idx) => (
                    <span key={idx} className={`text-[9px] px-1.5 py-0.5 rounded ${
                      isLight ? 'bg-zinc-100 text-zinc-600' : 'bg-white/5 text-zinc-400'
                    }`}>
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="inline-flex items-center gap-1 font-semibold text-blue-500 group-hover:translate-x-0.5 transition-transform">
                  <span>Read</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Layout Content */}
      <div className="flex flex-col w-full flex-1 min-h-0 space-y-4">
        
        {/* Controls Bar: Category Pills & Search Input */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 shrink-0 pb-2">
          {/* Category Filter Pills */}
          <div 
            ref={scrollRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="flex items-center gap-1.5 overflow-x-auto pb-1.5 lg:pb-0 scrollbar-none cursor-ew-resize select-none"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : isLight
                      ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                      : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-80 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by keyword, regulation, or architecture..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full rounded-xl pl-9 pr-4 py-1.5 text-xs transition-colors backdrop-blur-md border ${
                isLight 
                  ? 'bg-white border-zinc-200 text-zinc-900 placeholder-zinc-400 shadow-sm focus:border-blue-500 focus:outline-none' 
                  : 'bg-white/[0.03] border-white/10 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none shadow-inner'
              }`}
            />
          </div>
        </div>

        {/* Scrollable Timeline Publications with Fading Mask */}
        <div className="relative w-full">
          <div className="pl-6 sm:pl-8 pr-2 sm:pr-3 space-y-3 pb-12 max-h-[220px] sm:max-h-[235px] lg:max-h-[245px] overflow-y-auto scrollbar-thin">
            <div className="w-full">
              <div className={`border-l-2 space-y-6 pb-4 ${isLight ? 'border-zinc-200' : 'border-white/10'}`}>
                {Array.from(new Set(filteredPosts.map(p => new Date(p.date).getFullYear()))).sort((a, b) => b - a).map(year => (
                  <div key={year} className="relative pl-5 sm:pl-6">
                    {/* Year Marker */}
                    <div className={`absolute left-0 -translate-x-1/2 -top-1 px-3 py-0.5 rounded-full text-[11px] font-bold border shadow-sm whitespace-nowrap z-10 ${
                      isLight ? 'bg-white border-zinc-200 text-zinc-800' : 'bg-zinc-900 border-zinc-700 text-white'
                    }`}>
                      {year}
                    </div>
                    
                    <div className="space-y-2.5 pt-6 sm:pt-5">
                      {filteredPosts.filter(p => new Date(p.date).getFullYear() === year).map(post => {
                        const dateObj = new Date(post.date);
                        const month = dateObj.toLocaleString('default', { month: 'short' });
                        const isExecutive = post.category === 'Executive Risk & GRC' || post.category === 'AI Security Governance';

                        return (
                          <div 
                            key={post.id}
                            onClick={() => setActivePost(post)}
                            className="relative flex items-center gap-2 cursor-pointer group"
                          >
                            {/* Timeline Dot */}
                            <div className={`absolute -left-[25px] sm:-left-[29px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors z-10 ${
                              isExecutive 
                                ? 'bg-blue-500 border-blue-300' 
                                : isLight ? 'bg-white border-zinc-300 group-hover:border-blue-500' : 'bg-black border-zinc-600 group-hover:border-blue-400'
                            }`} />
                            
                            <div className={`w-8 shrink-0 text-[11px] font-semibold ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                              {month}
                            </div>
                            
                            <div className={`flex-1 rounded-xl px-4 py-2.5 border transition-all ${
                              isExecutive
                                ? isLight
                                  ? 'bg-blue-50/40 border-blue-200/80 hover:border-blue-400 hover:bg-white hover:shadow-md'
                                  : 'bg-blue-950/10 border-blue-900/30 hover:border-blue-500/40 hover:bg-blue-950/20'
                                : isLight 
                                  ? 'bg-zinc-50/70 border-zinc-200/60 hover:border-zinc-300 hover:bg-white hover:shadow-sm' 
                                  : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'
                            }`}>
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className={`text-[9px] uppercase tracking-wider font-bold shrink-0 px-2 py-0.5 rounded ${
                                    isExecutive
                                      ? isLight ? 'bg-blue-100 text-blue-800' : 'bg-blue-900/40 text-blue-300'
                                      : isLight ? 'bg-zinc-200/60 text-zinc-700' : 'bg-white/10 text-zinc-300'
                                  }`}>
                                    {post.category}
                                  </span>
                                  <h4 className={`text-[11px] sm:text-[13px] font-bold transition-colors max-w-[85%] lg:max-w-md ${isLight ? 'text-zinc-900 group-hover:text-blue-600' : 'text-white group-hover:text-blue-400'}`}>
                                    {post.title}
                                  </h4>
                                </div>
                                <span className="text-[10px] text-zinc-400 font-mono shrink-0">{post.readTime}</span>
                              </div>
                              <div className={`text-[11px] line-clamp-2 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                                {post.excerpt}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16 text-zinc-400">
                <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No publications found matching "{searchQuery}" under {selectedCategory}.</p>
              </div>
            )}
          </div>

          {/* Bottom Gradient Fade Overlay */}
          <div 
            className={`pointer-events-none absolute bottom-0 left-0 right-0 h-20 sm:h-24 bg-gradient-to-t ${
              isLight 
                ? 'from-[#fcfcfd] via-[#fcfcfd]/90 to-transparent' 
                : 'from-[#000000] via-[#000000]/90 to-transparent'
            } z-20`} 
          />
        </div>
      </div>

      {/* Modal Reader */}
      <BlogPostModal post={activePost} onClose={() => setActivePost(null)} />
    </section>
  );
};

