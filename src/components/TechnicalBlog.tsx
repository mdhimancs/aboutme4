import React, { useState } from 'react';
import { Search, BookOpen, ShieldCheck, Scale, Sparkles, Lock, Unlock, ArrowUpRight, FileText, KeyRound } from 'lucide-react';
import { BLOG_POSTS } from '../data/portfolioData';
import { BlogPost } from '../types';
import { BlogPostModal } from './BlogPostModal';
import { useHoverScroll } from '../lib/utils';
import { trackAssetInteraction } from '../lib/analytics';
import { useAuth } from '../context/AuthContext';
import { StarsCounter } from './StarsCounter';

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
  const { 
    gateItem, 
    user, 
    isAdmin, 
    isAuthorized, 
    currentUserEntry,
    isItemLocked, 
    isSectionLocked, 
    toggleSectionLock, 
    toggleItemLock,
    setGateModalOpen
  } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const { scrollRef, onMouseMove, onMouseLeave } = useHoverScroll();

  const isSectionGated = isSectionLocked('publications');

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
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <section 
      id="blog" 
      className={`relative overflow-hidden min-h-screen w-full flex flex-col justify-start pt-8 sm:pt-10 pb-10 sm:pb-14 lg:pb-16 px-6 sm:px-10 lg:px-14 max-w-6xl lg:max-w-7xl mx-auto border-t ${
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
      <div className="relative w-full space-y-0.5 mb-2 sm:mb-2.5 shrink-0 text-left">
        {/* Luminous aura behind heading */}
        <div 
          className={`absolute -top-3 -left-2 sm:-left-4 w-72 sm:w-96 h-24 sm:h-28 rounded-full blur-2xl pointer-events-none transition-all ${
            isLight 
              ? 'bg-gradient-to-r from-blue-400/25 via-sky-300/20 to-indigo-300/20 opacity-80' 
              : 'bg-gradient-to-r from-blue-500/30 via-cyan-400/20 to-indigo-500/25 opacity-90'
          }`} 
        />

        <div className={`relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase border backdrop-blur-md mb-1 ${
          isLight ? 'bg-blue-50/90 border-blue-200 text-blue-700 shadow-sm' : 'bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.15)]'
        }`}>
          <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
          <span>Enterprise Cyber Strategy & Risk Governance · WHITEPAPERS & Playbooks</span>
        </div>
        <div className="relative flex items-center gap-3">
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight transition-all ${
            isLight 
              ? 'text-zinc-900 drop-shadow-[0_2px_16px_rgba(59,130,246,0.22)]' 
              : 'text-white drop-shadow-[0_0_24px_rgba(96,165,250,0.40)]'
          }`}>
            Publications
          </h2>
          <div className="inline-flex items-center gap-2">
            <span 
              onClick={isSectionGated ? () => setGateModalOpen(true) : undefined}
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                isSectionGated ? 'cursor-pointer hover:opacity-85' : ''
              } ${
              isSectionGated 
                ? (isLight ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-amber-500/10 text-amber-400 border-amber-500/20')
                : (isLight ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20')
            }`}>
              {isSectionGated ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
              <span>{isSectionGated ? 'Request Access' : 'Public Access'}</span>
            </span>
            {isAdmin && (
              <button
                type="button"
                onClick={() => toggleSectionLock('publications')}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border transition-colors cursor-pointer ${
                  isLight 
                    ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-300' 
                    : 'bg-white/5 hover:bg-white/10 text-zinc-300 border-white/10'
                }`}
                title="Toggle publications section lock"
              >
                <span>{isSectionGated ? 'Unlock Section' : 'Lock Section'}</span>
              </button>
            )}
          </div>
        </div>
        <p 
          style={{ fontSize: '14px' }}
          className={`relative max-w-4xl text-[14px] font-normal leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}
        >
          Playbooks on Cyber Risk, Identity Architecture, AI Security and Regulatory Disclosure.
        </p>
      </div>

      {/* Featured CISO Executive Briefings Spotlight */}
      <div className="mb-2.5 sm:mb-3 w-full">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h4 className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${isLight ? 'text-zinc-800' : 'text-zinc-200'}`}>
              Featured Executive Briefings
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {executiveFlagshipPosts.map((post, index) => {
            const locked = isItemLocked(post.id, 'publications');
            const hasSpecificClearance = currentUserEntry?.scope === 'specific' && currentUserEntry.allowedItems?.includes(post.id);

            const cardStyle = index === 0
              ? { width: '340.989px', marginLeft: '10px' }
              : index === 1
              ? { width: '340px', marginLeft: '60px', paddingLeft: '15px' }
              : index === 2
              ? { width: '340px', marginLeft: '110px', paddingLeft: '17px' }
              : undefined;

            return (
              <div
                key={post.id}
                onClick={() => {
                  gateItem(post.id, 'publications', post.title, () => {
                    setActivePost(post);
                    trackAssetInteraction(post.id, post.title, 'Whitepaper');
                  });
                }}
                className={`group relative flex flex-col justify-between p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isLight
                    ? 'bg-white border-zinc-200/80 hover:border-blue-500 hover:shadow-lg shadow-sm'
                    : 'bg-zinc-950/60 border-white/10 hover:border-blue-400/50 hover:bg-zinc-900/60 shadow-lg'
                }`}
                style={cardStyle}
              >
                <div className="space-y-1.5 font-sans">
                  <div className="flex items-center justify-between text-[10px] font-semibold flex-wrap gap-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-full border ${
                        isLight 
                          ? 'bg-blue-50 border-blue-200 text-blue-700' 
                          : 'bg-blue-950/50 border-blue-800/60 text-blue-300'
                      }`}>
                        {post.category}
                      </span>
                      {hasSpecificClearance && (
                        <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[8px] font-bold border uppercase tracking-wider ${
                          isLight 
                            ? 'bg-purple-50 border-purple-200 text-purple-700' 
                            : 'bg-purple-500/15 border-purple-500/30 text-purple-300'
                        }`}>
                          <KeyRound className="w-2.5 h-2.5 text-purple-400" />
                          <span>Clearance Granted</span>
                        </span>
                      )}
                      {locked && !hasSpecificClearance && (
                        <span 
                          className={`inline-flex items-center justify-center p-1 rounded border ${
                            isLight 
                              ? 'bg-amber-50 border-amber-200 text-amber-700' 
                              : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                          }`}
                          title="Locked - Request Access"
                        >
                          <Lock className="w-3 h-3 text-amber-500" />
                        </span>
                      )}
                      {isAdmin && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleItemLock(post.id, 'publications');
                          }}
                          className="p-1 rounded bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                          title={locked ? 'Unlock this whitepaper' : 'Lock this whitepaper'}
                        >
                          {locked ? <Lock className="w-2.5 h-2.5 text-amber-400" /> : <Unlock className="w-2.5 h-2.5 text-emerald-400" />}
                        </button>
                      )}
                    </div>
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
                  <div className="flex items-center gap-3">
                    <StarsCounter pageId={`blog-${post.id}`} isLight={isLight} compact />
                    <div className="inline-flex items-center gap-1 font-semibold text-blue-500 group-hover:translate-x-0.5 transition-transform">
                      <span>Read</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Layout Content */}
      <div className="flex flex-col w-full flex-1 min-h-0 space-y-4">
        
        {/* Controls Bar: Category Pills & Search Input */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 shrink-0 pb-1" style={{ paddingBottom: '4px' }}>
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
              style={{ width: '150px', paddingLeft: '3px', paddingRight: '13px' }}
            />
          </div>
        </div>

        {/* Scrollable Timeline Publications with Fading Mask */}
        <div className="relative w-full">
          <div className="pl-2 sm:pl-3 pr-2 sm:pr-3 space-y-4 pb-12 max-h-[220px] sm:max-h-[235px] lg:max-h-[245px] overflow-y-auto scrollbar-thin">
            <div className="w-full">
              {Array.from(new Set(filteredPosts.map(p => new Date(p.date).getFullYear()))).sort((a, b) => b - a).map(year => (
                <div key={year} className="relative pb-4">
                  {/* Sticky Year Header - stays pinned on the left during scroll for that year */}
                  <div className={`sticky top-0 z-20 flex items-center gap-2 py-1 mb-2.5 backdrop-blur-md ${
                    isLight ? 'bg-white/90' : 'bg-zinc-950/90'
                  }`}>
                    <div className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border shadow-xs whitespace-nowrap shrink-0 ${
                      isLight ? 'bg-white border-blue-200 text-blue-900' : 'bg-zinc-900 border-blue-800/80 text-blue-300'
                    }`}>
                      {year}
                    </div>
                    <div className={`h-[1px] flex-1 ${isLight ? 'bg-gradient-to-r from-blue-300/80 via-blue-200/30 to-transparent' : 'bg-gradient-to-r from-blue-500/40 via-blue-400/10 to-transparent'}`} />
                  </div>

                  {/* Vertical Timeline Line and Post Items */}
                  <div className={`border-l-2 pl-4 sm:pl-5 space-y-2.5 ml-2 sm:ml-3 ${isLight ? 'border-sky-300/80' : 'border-blue-400/40'}`}>
                    {filteredPosts
                      .filter(p => new Date(p.date).getFullYear() === year)
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map(post => {
                      const dateObj = new Date(post.date);
                      const month = dateObj.toLocaleString('default', { month: 'short' });
                      const isExecutive = post.category === 'Executive Risk & GRC' || post.category === 'AI Security Governance';
                      const locked = isItemLocked(post.id, 'publications');
                      const hasSpecificClearance = currentUserEntry?.scope === 'specific' && currentUserEntry.allowedItems?.includes(post.id);

                      return (
                        <div 
                          key={post.id}
                          onClick={() => {
                            gateItem(post.id, 'publications', post.title, () => {
                              setActivePost(post);
                              trackAssetInteraction(post.id, post.title, 'Publication');
                            });
                          }}
                          className="relative flex items-center gap-2 cursor-pointer group"
                        >
                          {/* Timeline Dot */}
                          <div className={`absolute -left-[21px] sm:-left-[25px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors z-10 ${
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
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1 font-sans">
                              <div className="flex items-center gap-2 min-w-0 flex-1">
                                {hasSpecificClearance && (
                                  <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[8px] font-bold border uppercase tracking-wider shrink-0 ${
                                    isLight 
                                      ? 'bg-purple-50 border-purple-200 text-purple-700' 
                                      : 'bg-purple-500/15 border-purple-500/30 text-purple-300'
                                  }`}>
                                    <KeyRound className="w-2.5 h-2.5 text-purple-400" />
                                    <span>Clearance Granted</span>
                                  </span>
                                )}
                                {locked && !hasSpecificClearance && (
                                  <span 
                                    className={`inline-flex items-center justify-center p-1 rounded border shrink-0 ${
                                      isLight 
                                        ? 'bg-amber-50 border-amber-200 text-amber-700' 
                                        : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                                    }`}
                                    title="Locked - Request Access"
                                  >
                                    <Lock className="w-3 h-3 text-amber-500" />
                                  </span>
                                )}
                                {isAdmin && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleItemLock(post.id, 'publications');
                                    }}
                                    className="p-1 rounded bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                                    title={locked ? 'Unlock this whitepaper' : 'Lock this whitepaper'}
                                  >
                                    {locked ? <Lock className="w-2.5 h-2.5 text-amber-400" /> : <Unlock className="w-2.5 h-2.5 text-emerald-400" />}
                                  </button>
                                )}
                                <h4 className={`text-[11px] sm:text-[13px] font-bold transition-colors whitespace-nowrap truncate flex-1 min-w-0 ${isLight ? 'text-zinc-900 group-hover:text-blue-600' : 'text-white group-hover:text-blue-400'}`}>
                                  {post.title}
                                </h4>
                              </div>
                              <div className="flex items-center gap-2 shrink-0 ml-auto">
                                <span className={`text-[9px] uppercase tracking-wider font-bold shrink-0 px-2 py-0.5 rounded border ${
                                  isExecutive
                                    ? isLight ? 'bg-zinc-800 text-zinc-100 border-zinc-700' : 'bg-zinc-800/90 text-zinc-200 border-zinc-700'
                                    : isLight ? 'bg-zinc-100 text-zinc-700 border-zinc-200' : 'bg-white/10 text-zinc-300 border-white/10'
                                }`}>
                                  {post.category}
                                </span>
                                <div className="hidden sm:flex flex-wrap gap-1">
                                  {post.tags.slice(0, 2).map((tag, idx) => (
                                    <span key={idx} className={`text-[9px] px-1.5 py-0.5 rounded ${
                                      isLight ? 'bg-zinc-200/60 text-zinc-700' : 'bg-white/10 text-zinc-300'
                                    }`}>
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
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

      {/* Modal Reader */}
      <BlogPostModal post={activePost} onClose={() => setActivePost(null)} />
    </section>
  );
};

