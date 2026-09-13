import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Globe, 
  Sparkles, 
  Lock, 
  Unlock,
  ArrowUpRight, 
  Zap, 
  FileText, 
  Cpu, 
  Landmark, 
  GitMerge, 
  CheckCircle,
  KeyRound,
  Search,
  LayoutGrid,
  Columns2,
  Table as TableIcon,
  X,
  Layers,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EXECUTIVE_CASE_STUDIES } from '../data/caseStudiesData';
import { ExecutiveCaseStudy } from '../types';
import { CaseStudyModal } from './CaseStudyModal';
import { CaseStudySlider } from './CaseStudySlider';
import { useHoverScroll } from '../lib/utils';
import { trackAssetInteraction } from '../lib/analytics';
import { useAuth } from '../context/AuthContext';
import { StarsCounter } from './StarsCounter';

interface ProjectsProps {
  theme?: string;
}

type ViewMode = 'slider' | 'dossiers' | 'grid' | 'matrix';

const CATEGORIES = [
  { id: 'all', label: 'All Programs', count: 6 },
  { id: 'Enterprise IAM & Zero Trust', label: 'Enterprise IAM & Zero Trust', count: 1 },
  { id: 'AI Security & Governance', label: 'AI Security & Governance', count: 1 },
  { id: 'Threat Defense & SOC', label: 'Threat Defense & SOC', count: 1 },
  { id: 'Cloud & Identity Security', label: 'Cloud & Identity Security', count: 1 },
  { id: 'M&A & Enterprise Modernization', label: 'M&A & Enterprise Integration', count: 1 },
  { id: 'Board Governance & Crisis Command', label: 'Board Governance & SEC 8-K', count: 1 },
];

export const Projects: React.FC<ProjectsProps> = ({ theme = 'apple-dark' }) => {
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

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('slider');
  const [activeCaseStudy, setActiveCaseStudy] = useState<ExecutiveCaseStudy | null>(null);
  const { scrollRef, onMouseMove, onMouseLeave } = useHoverScroll();

  const isSectionGated = isSectionLocked('case-studies');

  // Filter case studies by category and search query
  const filteredCaseStudies = useMemo(() => {
    return EXECUTIVE_CASE_STUDIES.filter((cs) => {
      const matchesCategory = selectedCategory === 'all' || cs.category === selectedCategory;
      if (!matchesCategory) return false;
      
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase().trim();
      return (
        cs.title.toLowerCase().includes(query) ||
        cs.subtitle.toLowerCase().includes(query) ||
        cs.executiveImpact.toLowerCase().includes(query) ||
        cs.businessScale.toLowerCase().includes(query) ||
        cs.challenge.toLowerCase().includes(query) ||
        cs.tags.some(tag => tag.toLowerCase().includes(query)) ||
        cs.impactMetrics.some(m => m.label.toLowerCase().includes(query) || m.value.toLowerCase().includes(query))
      );
    });
  }, [selectedCategory, searchQuery]);

  const getCategoryConfig = (category: string) => {
    switch (category) {
      case 'Enterprise IAM & Zero Trust':
        return {
          icon: <ShieldCheck className="w-4 h-4 text-blue-500" />,
          lightBg: 'bg-blue-50 border-blue-200 text-blue-700',
          darkBg: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
          textColor: isLight ? 'text-blue-600' : 'text-blue-400',
          dotColor: 'bg-blue-500',
          hoverBorder: isLight ? 'hover:border-blue-400' : 'hover:border-blue-500/60',
          accentBorder: 'border-blue-500',
          badgeText: isLight ? 'text-blue-700 bg-blue-50/80 border-blue-200' : 'text-blue-400 bg-blue-500/10 border-blue-500/20'
        };
      case 'AI Security & Governance':
        return {
          icon: <Sparkles className="w-4 h-4 text-purple-500" />,
          lightBg: 'bg-purple-50 border-purple-200 text-purple-700',
          darkBg: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
          textColor: isLight ? 'text-purple-600' : 'text-purple-400',
          dotColor: 'bg-purple-500',
          hoverBorder: isLight ? 'hover:border-purple-400' : 'hover:border-purple-500/60',
          accentBorder: 'border-purple-500',
          badgeText: isLight ? 'text-purple-700 bg-purple-50/80 border-purple-200' : 'text-purple-400 bg-purple-500/10 border-purple-500/20'
        };
      case 'Threat Defense & SOC':
        return {
          icon: <Zap className="w-4 h-4 text-amber-500" />,
          lightBg: 'bg-amber-50 border-amber-200 text-amber-700',
          darkBg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
          textColor: isLight ? 'text-amber-600' : 'text-amber-400',
          dotColor: 'bg-amber-500',
          hoverBorder: isLight ? 'hover:border-amber-400' : 'hover:border-amber-500/60',
          accentBorder: 'border-amber-500',
          badgeText: isLight ? 'text-amber-700 bg-amber-50/80 border-amber-200' : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
        };
      case 'Cloud & Identity Security':
        return {
          icon: <Cpu className="w-4 h-4 text-cyan-500" />,
          lightBg: 'bg-cyan-50 border-cyan-200 text-cyan-700',
          darkBg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
          textColor: isLight ? 'text-cyan-600' : 'text-cyan-400',
          dotColor: 'bg-cyan-500',
          hoverBorder: isLight ? 'hover:border-cyan-400' : 'hover:border-cyan-500/60',
          accentBorder: 'border-cyan-500',
          badgeText: isLight ? 'text-cyan-700 bg-cyan-50/80 border-cyan-200' : 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
        };
      case 'M&A & Enterprise Modernization':
        return {
          icon: <GitMerge className="w-4 h-4 text-emerald-500" />,
          lightBg: 'bg-emerald-50 border-emerald-200 text-emerald-700',
          darkBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
          textColor: isLight ? 'text-emerald-600' : 'text-emerald-400',
          dotColor: 'bg-emerald-500',
          hoverBorder: isLight ? 'hover:border-emerald-400' : 'hover:border-emerald-500/60',
          accentBorder: 'border-emerald-500',
          badgeText: isLight ? 'text-emerald-700 bg-emerald-50/80 border-emerald-200' : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
        };
      case 'Board Governance & Crisis Command':
        return {
          icon: <Landmark className="w-4 h-4 text-indigo-500" />,
          lightBg: 'bg-indigo-50 border-indigo-200 text-indigo-700',
          darkBg: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
          textColor: isLight ? 'text-indigo-600' : 'text-indigo-400',
          dotColor: 'bg-indigo-500',
          hoverBorder: isLight ? 'hover:border-indigo-400' : 'hover:border-indigo-500/60',
          accentBorder: 'border-indigo-500',
          badgeText: isLight ? 'text-indigo-700 bg-indigo-50/80 border-indigo-200' : 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
        };
      default:
        return {
          icon: <Lock className="w-4 h-4 text-blue-500" />,
          lightBg: 'bg-blue-50 border-blue-200 text-blue-700',
          darkBg: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
          textColor: isLight ? 'text-blue-600' : 'text-blue-400',
          dotColor: 'bg-blue-500',
          hoverBorder: isLight ? 'hover:border-blue-400' : 'hover:border-blue-500/60',
          accentBorder: 'border-blue-500',
          badgeText: isLight ? 'text-blue-700 bg-blue-50/80 border-blue-200' : 'text-blue-400 bg-blue-500/10 border-blue-500/20'
        };
    }
  };

  const handleOpenStudy = (cs: ExecutiveCaseStudy) => {
    gateItem(cs.id, 'case-studies', cs.title, () => {
      setActiveCaseStudy(cs);
      trackAssetInteraction(cs.id, cs.title, 'Case Study');
    });
  };

  return (
    <section 
      id="projects" 
      className={`relative overflow-hidden min-h-screen w-full flex flex-col justify-center pt-8 sm:pt-10 pb-12 sm:pb-16 px-3.5 sm:px-6 lg:px-8 max-w-6xl lg:max-w-7xl mx-auto border-t transition-colors ${
        isLight ? 'border-zinc-200 bg-[#fcfcfd]' : 'border-white/10 bg-[#000000]'
      }`}
    >
      {/* Dynamic Background Aura */}
      <div 
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[340px] sm:h-[480px] rounded-full blur-[100px] sm:blur-[140px] pointer-events-none transition-all duration-700 ${
          isLight 
            ? 'bg-gradient-to-tr from-blue-400/15 via-indigo-300/12 to-cyan-300/10' 
            : 'bg-gradient-to-tr from-blue-600/18 via-indigo-500/14 to-cyan-500/10'
        }`} 
      />
      <div 
        className={`absolute -bottom-24 -right-24 w-80 sm:w-[420px] h-80 sm:h-[420px] rounded-full blur-[90px] sm:blur-[120px] pointer-events-none ${
          isLight ? 'bg-indigo-300/12' : 'bg-blue-600/14'
        }`} 
      />

      {/* Header Section */}
      <div className="relative w-full space-y-1 mb-5 sm:mb-6 shrink-0 text-left">
        {/* Luminous aura behind heading */}
        <div 
          className={`absolute -top-4 -left-3 sm:-left-5 w-80 sm:w-[480px] h-24 sm:h-30 rounded-full blur-2xl pointer-events-none transition-all ${
            isLight 
              ? 'bg-gradient-to-r from-blue-400/25 via-sky-300/20 to-indigo-300/20 opacity-80' 
              : 'bg-gradient-to-r from-blue-500/30 via-cyan-400/20 to-indigo-500/25 opacity-90'
          }`} 
        />

        <div className={`relative inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase border backdrop-blur-md mb-1 ${
          isLight ? 'bg-blue-50/90 border-blue-200 text-blue-700 shadow-xs' : 'bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-[0_0_14px_rgba(59,130,246,0.18)]'
        }`}>
          <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
          <span>Strategic Transformation Dossiers • Zero Trust & AI Security</span>
        </div>

        <div className="relative flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight transition-all ${
              isLight 
                ? 'text-zinc-900 drop-shadow-[0_2px_16px_rgba(59,130,246,0.18)]' 
                : 'text-white drop-shadow-[0_0_28px_rgba(96,165,250,0.40)]'
            }`}>
              Strategic Case Studies & Defense Programs
            </h2>
            
            {/* Clearance Pill */}
            <div className="inline-flex items-center gap-1.5">
              <span 
                onClick={isSectionGated ? () => setGateModalOpen(true) : undefined}
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                  isSectionGated ? 'cursor-pointer hover:opacity-85' : ''
                } ${
                isSectionGated
                  ? (isLight ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-amber-500/10 text-amber-400 border-amber-500/20')
                  : (isLight ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20')
              }`}>
                {isSectionGated ? <Lock className="w-3 h-3 text-amber-500" /> : <Unlock className="w-3 h-3 text-emerald-500" />}
                <span>{isSectionGated ? 'Request Clearance' : 'Executive Clearance'}</span>
              </span>

              {isAdmin && (
                <button
                  type="button"
                  onClick={() => toggleSectionLock('case-studies')}
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                    isLight 
                      ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-300' 
                      : 'bg-white/5 hover:bg-white/10 text-zinc-300 border-white/10'
                  }`}
                  title="Toggle section-wide lock"
                >
                  <span>{isSectionGated ? 'Unlock All' : 'Lock All'}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <p className={`relative max-w-3xl text-xs sm:text-[13px] font-normal leading-relaxed ${
          isLight ? 'text-zinc-600' : 'text-zinc-400'
        }`}>
          Battle-tested enterprise cybersecurity and IAM transformations delivering Zero Standing Privileges, autonomous SOC resilience, and zero audit weaknesses across Fortune 100 environments.
        </p>
      </div>

      {/* High-Tech Executive Command Dock: Category Pills, Search & View Switcher */}
      <div className="flex flex-col gap-2.5 mb-4 shrink-0">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
          {/* Executive Category Filter Strip */}
          <div 
            ref={scrollRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none flex-1 select-none"
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const config = cat.id !== 'all' ? getCategoryConfig(cat.id) : null;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? isLight
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25 ring-1 ring-blue-500'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_16px_rgba(59,130,246,0.35)] ring-1 ring-blue-400/40'
                      : isLight
                        ? 'bg-zinc-100/90 text-zinc-700 hover:bg-zinc-200/90 hover:text-zinc-950 border border-zinc-200/60'
                        : 'bg-white/[0.04] text-zinc-400 hover:bg-white/[0.08] hover:text-white border border-white/5'
                  }`}
                >
                  {config ? config.icon : <Layers className="w-3.5 h-3.5 text-blue-500" />}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Controls: Search Input & View Switcher */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Search Input */}
            <div className={`relative flex items-center rounded-xl border transition-all ${
              isLight 
                ? 'bg-white border-zinc-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20' 
                : 'bg-zinc-950/80 border-white/15 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20'
            }`}>
              <Search className="w-3.5 h-3.5 text-zinc-400 ml-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search program, tech, SOX..."
                className="w-36 sm:w-48 py-1.5 pl-2 pr-7 text-xs bg-transparent outline-none placeholder:text-zinc-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 text-zinc-400 hover:text-zinc-200"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className={`inline-flex items-center p-0.5 rounded-xl border ${
              isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-white/5 border-white/10'
            }`}>
              <button
                onClick={() => setViewMode('slider')}
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  viewMode === 'slider'
                    ? isLight ? 'bg-white text-blue-600 shadow-xs' : 'bg-white/15 text-white shadow-xs'
                    : isLight ? 'text-zinc-600 hover:text-zinc-950' : 'text-zinc-400 hover:text-white'
                }`}
                title="Slider View (Interactive Carousel)"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('dossiers')}
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  viewMode === 'dossiers'
                    ? isLight ? 'bg-white text-blue-600 shadow-xs' : 'bg-white/15 text-white shadow-xs'
                    : isLight ? 'text-zinc-600 hover:text-zinc-950' : 'text-zinc-400 hover:text-white'
                }`}
                title="Dossier View (Spacious & Detailed)"
              >
                <Columns2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  viewMode === 'grid'
                    ? isLight ? 'bg-white text-blue-600 shadow-xs' : 'bg-white/15 text-white shadow-xs'
                    : isLight ? 'text-zinc-600 hover:text-zinc-950' : 'text-zinc-400 hover:text-white'
                }`}
                title="Grid View (3-Column)"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('matrix')}
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  viewMode === 'matrix'
                    ? isLight ? 'bg-white text-blue-600 shadow-xs' : 'bg-white/15 text-white shadow-xs'
                    : isLight ? 'text-zinc-600 hover:text-zinc-950' : 'text-zinc-400 hover:text-white'
                }`}
                title="Board Matrix View (Comparison Table)"
              >
                <TableIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Search / Active Filter Indicator */}
        {(searchQuery || selectedCategory !== 'all') && (
          <div className="flex items-center justify-between text-xs text-zinc-500 pt-0.5">
            <span>
              Showing {filteredCaseStudies.length} of {EXECUTIVE_CASE_STUDIES.length} defense programs
              {searchQuery && <span> matching &ldquo;<span className="text-blue-500 font-semibold">{searchQuery}</span>&rdquo;</span>}
            </span>
            {(searchQuery || selectedCategory !== 'all') && (
              <button 
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="text-blue-500 hover:underline text-xs font-semibold"
              >
                Reset Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main Content Area: Slider, Dossiers, Grid, or Board Matrix */}
      {viewMode === 'slider' ? (
        <CaseStudySlider
          caseStudies={filteredCaseStudies}
          isLight={isLight}
          onOpenStudy={handleOpenStudy}
          isItemLocked={isItemLocked}
          isAdmin={isAdmin}
          currentUserEntry={currentUserEntry}
          toggleItemLock={toggleItemLock}
          getCategoryConfig={getCategoryConfig}
        />
      ) : viewMode === 'matrix' ? (
        /* Board Comparison Matrix View */
        <div className={`w-full overflow-x-auto rounded-2xl border mb-6 shadow-md backdrop-blur-xl ${
          isLight ? 'bg-white border-zinc-200' : 'bg-zinc-950/80 border-white/10'
        }`}>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className={`border-b text-[11px] font-mono uppercase tracking-wider ${
                isLight ? 'bg-zinc-100/90 text-zinc-700 border-zinc-200' : 'bg-white/5 text-zinc-400 border-white/10'
              }`}>
                <th className="py-3 px-4 font-bold">Program & Category</th>
                <th className="py-3 px-4 font-bold">Operational Footprint</th>
                <th className="py-3 px-4 font-bold">Strategic Mandate</th>
                <th className="py-3 px-4 font-bold">Hard ROI / Quantified Results</th>
                <th className="py-3 px-4 font-bold text-right">Defense Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/60 dark:divide-white/5">
              {filteredCaseStudies.map((cs) => {
                const config = getCategoryConfig(cs.category);
                const locked = isItemLocked(cs.id, 'case-studies');

                return (
                  <tr 
                    key={cs.id}
                    onClick={() => handleOpenStudy(cs)}
                    className={`group transition-colors cursor-pointer ${
                      isLight ? 'hover:bg-blue-50/50' : 'hover:bg-white/[0.04]'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-semibold">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg border shrink-0 ${isLight ? config.lightBg : config.darkBg}`}>
                          {config.icon}
                        </div>
                        <div>
                          <div className={`font-bold group-hover:text-blue-500 transition-colors ${
                            isLight ? 'text-zinc-900' : 'text-white'
                          }`}>
                            {cs.title}
                          </div>
                          <div className={`text-[10px] font-mono ${config.textColor}`}>
                            {cs.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-zinc-600 dark:text-zinc-300">
                      {cs.businessScale}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs text-zinc-600 dark:text-zinc-300">
                      <div className="line-clamp-2 leading-relaxed text-[11.5px]">
                        {cs.executiveImpact}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        {cs.impactMetrics.slice(0, 2).map((m, idx) => (
                          <div key={idx} className="space-y-0.5">
                            <span className="font-black text-blue-500 text-xs">{m.value}</span>
                            <span className="text-[10px] text-zinc-500 block leading-tight">{m.label}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button 
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          isLight 
                            ? 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white' 
                            : 'bg-blue-500/15 text-blue-400 hover:bg-blue-600 hover:text-white'
                        }`}
                      >
                        {locked ? <Lock className="w-3 h-3 text-amber-500" /> : <FileText className="w-3 h-3" />}
                        <span>Briefing</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* Card Grids: 2-Column Dossiers (Default) or 3-Column Grid */
        <div className={`grid gap-4 sm:gap-5 pb-6 ${
          viewMode === 'dossiers' 
            ? 'grid-cols-1 lg:grid-cols-2' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {filteredCaseStudies.map((cs) => {
            const config = getCategoryConfig(cs.category);
            const locked = isItemLocked(cs.id, 'case-studies');
            const hasSpecificClearance = currentUserEntry?.scope === 'specific' && currentUserEntry.allowedItems?.includes(cs.id);

            return (
              <motion.div
                key={cs.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => handleOpenStudy(cs)}
                className={`group relative flex flex-col justify-between px-3.5 py-4 sm:px-4 sm:py-4.5 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-xl ${
                  isLight
                    ? `bg-white border-zinc-200/90 ${config.hoverBorder} hover:shadow-xl shadow-xs`
                    : `bg-zinc-950/75 border-white/10 ${config.hoverBorder} hover:bg-zinc-900/80 shadow-lg hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]`
                }`}
              >
                {/* Top Subtle Ambient Indicator */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-blue-500 to-transparent`} />

                {/* Card Header: Icon, Category Badge & Status */}
                <div className="space-y-3 font-sans">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`p-2 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                        isLight ? config.lightBg : config.darkBg
                      }`}>
                        {config.icon}
                      </div>
                      <span className={`text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-bold truncate ${config.badgeText} px-2.5 py-0.5 rounded-full border`}>
                        {cs.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                      {hasSpecificClearance && (
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wider ${
                          isLight 
                            ? 'bg-purple-50 border-purple-200 text-purple-700' 
                            : 'bg-purple-500/15 border-purple-500/30 text-purple-300'
                        }`}>
                          <KeyRound className="w-3 h-3 text-purple-400" />
                          <span>Clearance</span>
                        </span>
                      )}

                      {locked && !hasSpecificClearance && (
                        <span 
                          className={`inline-flex items-center justify-center p-1 rounded-full border ${
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
                            toggleItemLock(cs.id, 'case-studies');
                          }}
                          className="p-1 rounded bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                          title={locked ? 'Unlock this article' : 'Lock this article'}
                        >
                          {locked ? <Lock className="w-2.5 h-2.5 text-amber-400" /> : <Unlock className="w-2.5 h-2.5 text-emerald-400" />}
                        </button>
                      )}

                      <span className={`px-2.5 py-0.5 rounded-full text-[9.5px] font-mono font-semibold border ${
                        cs.status === 'Enterprise Standard' || cs.status === 'Operational'
                          ? isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-emerald-950/50 border-emerald-700/60 text-emerald-400'
                          : isLight ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-blue-950/50 border-blue-700/60 text-blue-400'
                      }`}>
                        {cs.status}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <h4 className={`text-base sm:text-lg font-extrabold tracking-tight leading-snug group-hover:${config.textColor} transition-colors ${
                      isLight ? 'text-zinc-950' : 'text-white'
                    }`}>
                      {cs.title}
                    </h4>
                    <p className={`text-xs sm:text-[13px] leading-relaxed mt-1 line-clamp-2 ${
                      isLight ? 'text-zinc-600' : 'text-zinc-400'
                    }`}>
                      {cs.subtitle}
                    </p>
                  </div>

                  {/* Operational Scale & Scope Ribbon */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-mono border ${
                    isLight 
                      ? 'bg-zinc-100/90 border-zinc-200/80 text-zinc-800' 
                      : 'bg-white/[0.04] border-white/10 text-zinc-300'
                  }`}>
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span className="truncate"><strong>Scale:</strong> {cs.businessScale}</span>
                  </div>

                  {/* Executive Breakthrough Callout */}
                  <div className={`p-3 rounded-xl border-l-4 transition-colors ${
                    isLight 
                      ? 'bg-blue-50/60 border-blue-500 text-zinc-800' 
                      : 'bg-blue-500/10 border-blue-500 text-zinc-200'
                  }`}>
                    <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-blue-500 mb-0.5">
                      Executive Impact & Breakthrough
                    </div>
                    <p className="text-xs sm:text-[12.5px] leading-relaxed font-medium">
                      &ldquo;{cs.executiveImpact}&rdquo;
                    </p>
                  </div>

                  {/* Quantified Hard ROI Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-zinc-200/70 dark:border-white/10">
                    {cs.impactMetrics.slice(0, viewMode === 'dossiers' ? 4 : 2).map((metric, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-zinc-50/80 dark:bg-white/[0.02] border border-zinc-100 dark:border-white/5 space-y-0.5">
                        <div className="text-sm sm:text-base font-black text-blue-500 tracking-tight">{metric.value}</div>
                        <div className={`text-[10px] font-bold truncate leading-tight ${isLight ? 'text-zinc-800' : 'text-zinc-200'}`}>
                          {metric.label}
                        </div>
                        {viewMode === 'dossiers' && metric.desc && (
                          <div className="text-[9px] text-zinc-500 dark:text-zinc-400 line-clamp-1 leading-tight">
                            {metric.desc}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Footer: Tags & Executive Briefing Button */}
                <div className="pt-3 mt-4 border-t border-zinc-200/70 dark:border-white/10 flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5 max-w-[65%]">
                    {cs.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className={`text-[9.5px] px-2 py-0.5 rounded-md font-mono border ${
                          isLight ? 'bg-zinc-100 border-zinc-200/60 text-zinc-600' : 'bg-white/5 border-white/5 text-zinc-400'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <StarsCounter pageId={`project-${cs.id}`} isLight={isLight} compact />
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xs shadow-blue-500/25 transition-all group-hover:scale-102 cursor-pointer"
                    >
                      <span>Executive Dossier</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {filteredCaseStudies.length === 0 && (
        <div className="text-center py-16 text-zinc-400 space-y-3">
          <FileText className="w-12 h-12 mx-auto opacity-30 text-blue-500" />
          <h3 className="text-base font-bold text-zinc-300">No defense programs match your criteria</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Try adjusting your search terms or clearing the selected category filters.
          </p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Case Study Deep-Dive Modal */}
      <CaseStudyModal
        caseStudy={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
        theme={theme}
      />
    </section>
  );
};
