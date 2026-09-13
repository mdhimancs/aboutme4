import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight, 
  Lock, 
  Unlock, 
  KeyRound, 
  CheckCircle,
  FileText,
  Building2,
  Cpu
} from 'lucide-react';
import { motion } from 'motion/react';
import { ExecutiveCaseStudy } from '../types';
import { StarsCounter } from './StarsCounter';

interface CaseStudySliderProps {
  caseStudies: ExecutiveCaseStudy[];
  isLight: boolean;
  onOpenStudy: (cs: ExecutiveCaseStudy) => void;
  isItemLocked: (itemId: string, sectionId: string) => boolean;
  isAdmin: boolean;
  currentUserEntry: any;
  toggleItemLock: (itemId: string, sectionId: string) => void;
  getCategoryConfig: (category: string) => {
    icon: React.ReactNode;
    lightBg: string;
    darkBg: string;
    textColor: string;
    dotColor: string;
    hoverBorder: string;
    accentBorder: string;
    badgeText: string;
  };
}

export const CaseStudySlider: React.FC<CaseStudySliderProps> = ({
  caseStudies,
  isLight,
  onOpenStudy,
  isItemLocked,
  isAdmin,
  currentUserEntry,
  toggleItemLock,
  getCategoryConfig,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  // Clamp current index if case studies count changes
  useEffect(() => {
    if (currentIndex >= caseStudies.length && caseStudies.length > 0) {
      setCurrentIndex(caseStudies.length - 1);
    }
  }, [caseStudies.length, currentIndex]);

  const scrollToSlide = useCallback((index: number) => {
    if (index < 0 || index >= caseStudies.length) return;
    setCurrentIndex(index);
    isScrollingRef.current = true;

    const el = document.getElementById(`case-study-slide-${index}`);
    if (el && containerRef.current) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 450);
  }, [caseStudies.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      scrollToSlide(currentIndex - 1);
    }
  }, [currentIndex, scrollToSlide]);

  const handleNext = useCallback(() => {
    if (currentIndex < caseStudies.length - 1) {
      scrollToSlide(currentIndex + 1);
    }
  }, [currentIndex, caseStudies.length, scrollToSlide]);

  // Sync index on manual drag / swipe
  const handleScroll = useCallback(() => {
    if (isScrollingRef.current || !containerRef.current || caseStudies.length === 0) return;
    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;
    
    // Find closest slide center
    let closestIdx = 0;
    let minDistance = Infinity;

    for (let i = 0; i < caseStudies.length; i++) {
      const slide = document.getElementById(`case-study-slide-${i}`);
      if (slide) {
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        const viewportCenter = scrollLeft + containerWidth / 2;
        const distance = Math.abs(slideCenter - viewportCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = i;
        }
      }
    }

    if (closestIdx !== currentIndex) {
      setCurrentIndex(closestIdx);
    }
  }, [caseStudies.length, currentIndex]);

  // Keyboard navigation when user is focused on slider
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  if (caseStudies.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-2 mb-6 select-none" id="case-study-slider-deck">
      {/* Main Horizontal Carousel Viewport with Floating Nav Controls */}
      <div className="relative w-full group/slider">
        {/* Floating Left Prev Button */}
        {currentIndex > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            className={`absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center backdrop-blur-xl transition-all shadow-lg hover:scale-110 cursor-pointer ${
              isLight 
                ? 'bg-white/95 text-zinc-800 border-zinc-300 hover:bg-white hover:border-blue-400 shadow-zinc-300/50' 
                : 'bg-zinc-950/90 text-white border-white/20 hover:border-blue-500 shadow-black/60'
            }`}
            title="Previous Case Study"
            aria-label="Previous Case Study"
          >
            <ChevronLeft className="w-5 h-5 text-blue-500" />
          </button>
        )}

        {/* Floating Right Next Button */}
        {currentIndex < caseStudies.length - 1 && (
          <button
            type="button"
            onClick={handleNext}
            className={`absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center backdrop-blur-xl transition-all shadow-lg hover:scale-110 cursor-pointer ${
              isLight 
                ? 'bg-white/95 text-zinc-800 border-zinc-300 hover:bg-white hover:border-blue-400 shadow-zinc-300/50' 
                : 'bg-zinc-950/90 text-white border-white/20 hover:border-blue-500 shadow-black/60'
            }`}
            title="Next Case Study"
            aria-label="Next Case Study"
          >
            <ChevronRight className="w-5 h-5 text-blue-500" />
          </button>
        )}

        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="w-full flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 pt-1 px-0.5 scrollbar-none"
        >
        {caseStudies.map((cs, index) => {
          const isSelected = index === currentIndex;
          const config = getCategoryConfig(cs.category);
          const locked = isItemLocked(cs.id, 'case-studies');
          const hasSpecificClearance = 
            currentUserEntry?.scope === 'specific' && 
            currentUserEntry.allowedItems?.includes(cs.id);

          return (
            <motion.div
              key={cs.id}
              id={`case-study-slide-${index}`}
              onClick={() => {
                if (!isSelected) {
                  scrollToSlide(index);
                }
              }}
              className={`w-[75vw] sm:w-[340px] lg:w-[380px] shrink-0 snap-center rounded-xl sm:rounded-2xl border transition-all duration-300 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? isLight
                    ? 'bg-white/98 border-blue-500/60 shadow-xl ring-1 ring-blue-500/20'
                    : 'bg-zinc-950/90 border-blue-500/50 shadow-2xl ring-1 ring-blue-500/30'
                  : isLight
                    ? 'bg-white/70 border-zinc-200/80 opacity-70 hover:opacity-95 cursor-pointer shadow-xs scale-[0.985]'
                    : 'bg-zinc-950/60 border-white/10 opacity-60 hover:opacity-90 cursor-pointer shadow-md scale-[0.985]'
              }`}
            >
              {/* Top Ambient Glow */}
              <div 
                className={`absolute top-0 left-0 right-0 h-1 z-20 transition-opacity duration-300 ${
                  isSelected ? 'opacity-100' : 'opacity-0'
                } bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500`}
              />

              {/* Cover Image */}
              {cs.imageUrl && (
                <div className="relative w-full h-24 sm:h-28 shrink-0 border-b border-zinc-200/50 dark:border-white/10 overflow-hidden">
                  <img src={cs.imageUrl} alt={cs.imageAlt || cs.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  
                  {/* Floating Metadata on Image */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1">
                      <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono uppercase font-bold bg-black/50 text-white backdrop-blur-md border border-white/20">
                        {config.icon}
                        <span className="truncate max-w-[100px]">{cs.category}</span>
                      </div>
                      <span className="hidden xs:inline-flex px-1.5 py-0.5 rounded text-[8px] font-mono font-semibold bg-black/50 text-emerald-400 backdrop-blur-md border border-white/20">
                        {cs.status}
                      </span>
                    </div>
                    {locked && !hasSpecificClearance && (
                      <span className="p-0.5 rounded bg-amber-500/80 text-white backdrop-blur-md">
                        <Lock className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Inner Content Padding */}
              <div className="p-3 sm:p-4 flex flex-col gap-2.5">
                {/* Title & Subtitle */}
                <div>
                  <h3 className={`text-base sm:text-lg font-bold tracking-tight leading-snug transition-colors line-clamp-2 ${
                    isLight ? 'text-zinc-900' : 'text-white'
                  }`}>
                    {cs.title}
                  </h3>
                  <p className={`text-[11px] sm:text-[12px] font-medium leading-relaxed mt-0.5 line-clamp-2 ${
                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                  }`}>
                    {cs.subtitle}
                  </p>
                </div>

                {/* Impact Metrics 2x2 Grid */}
                <div className="grid grid-cols-2 gap-1.5">
                  {cs.impactMetrics.slice(0, 4).map((metric, mIdx) => (
                    <div 
                      key={mIdx} 
                      className={`px-2 py-1.5 rounded-lg border space-y-0.5 ${
                        isLight 
                          ? 'bg-zinc-50/80 border-zinc-200/80' 
                          : 'bg-white/[0.03] border-white/5'
                      }`}
                    >
                      <div className="text-sm font-black text-blue-500 tracking-tight">
                        {metric.value}
                      </div>
                      <div className={`text-[9.5px] sm:text-[10px] font-bold leading-tight line-clamp-1 ${
                        isLight ? 'text-zinc-800' : 'text-zinc-200'
                      }`}>
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Slide Bottom Action Tray */}
                <div className="pt-2 border-t border-zinc-200/80 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[9.5px] font-mono text-zinc-500 dark:text-zinc-400">
                    <Building2 className="w-3 h-3 text-blue-500" />
                    <span className="font-semibold truncate max-w-[100px]">{cs.businessScale}</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenStudy(cs);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10.5px] font-bold bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all cursor-pointer shadow-sm"
                  >
                    {locked ? <Lock className="w-2.5 h-2.5 text-amber-500" /> : <FileText className="w-2.5 h-2.5" />}
                    <span>Dossier</span>
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>

      {/* Sleek Minimal Pagination Indicators */}
      <div className="flex items-center justify-center gap-1.5 pt-1">
        {caseStudies.map((cs, idx) => {
          const isCurrent = idx === currentIndex;
          return (
            <button
              key={cs.id}
              type="button"
              onClick={() => scrollToSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                isCurrent
                  ? 'w-6 bg-blue-500 shadow-xs shadow-blue-500/50'
                  : isLight
                    ? 'w-1.5 bg-zinc-300 hover:bg-zinc-400'
                    : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
              title={`Jump to Program ${idx + 1}: ${cs.title}`}
              aria-label={`Jump to Program ${idx + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
};
