import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Globe, 
  Sparkles, 
  Lock, 
  TrendingUp, 
  ArrowUpRight, 
  Zap, 
  FileText, 
  Cpu, 
  Scale, 
  GitMerge, 
  CheckCircle,
  Award
} from 'lucide-react';
import { motion } from 'motion/react';
import { EXECUTIVE_CASE_STUDIES } from '../data/caseStudiesData';
import { ExecutiveCaseStudy } from '../types';
import { CaseStudyModal } from './CaseStudyModal';
import { useHoverScroll } from '../lib/utils';

interface ProjectsProps {
  theme?: string;
}

const CATEGORIES = [
  { id: 'all', label: 'All Defense Case Studies' },
  { id: 'Enterprise IAM & Zero Trust', label: 'Enterprise IAM & Zero Trust' },
  { id: 'AI Security & Governance', label: 'AI Security & Governance' },
  { id: 'Threat Defense & SOC', label: 'Threat Defense & SOC' },
  { id: 'Cloud & Identity Security', label: 'Cloud & Identity Security' },
  { id: 'M&A & Enterprise Modernization', label: 'M&A & Enterprise Integration' },
  { id: 'Board Governance & Crisis Command', label: 'Board Governance & SEC 8-K' },
];

export const Projects: React.FC<ProjectsProps> = ({ theme = 'apple-dark' }) => {
  const isLight = theme === 'apple-light';
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeCaseStudy, setActiveCaseStudy] = useState<ExecutiveCaseStudy | null>(null);
  const { scrollRef, onMouseMove, onMouseLeave } = useHoverScroll();

  const filteredCaseStudies = EXECUTIVE_CASE_STUDIES.filter((cs) => {
    return selectedCategory === 'all' || cs.category === selectedCategory;
  });

  const getCategoryConfig = (category: string) => {
    switch (category) {
      case 'Enterprise IAM & Zero Trust':
        return {
          icon: <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />,
          lightBg: 'bg-blue-50 border-blue-200 text-blue-600',
          darkBg: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
          textColor: isLight ? 'text-blue-600' : 'text-blue-400',
          dotColor: 'bg-blue-500',
          hoverBorder: isLight ? 'hover:border-blue-500' : 'hover:border-blue-500/50',
          ctaText: isLight ? 'text-blue-600' : 'text-blue-400',
        };
      case 'AI Security & Governance':
        return {
          icon: <Sparkles className="w-3.5 h-3.5 text-purple-500" />,
          lightBg: 'bg-purple-50 border-purple-200 text-purple-600',
          darkBg: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
          textColor: isLight ? 'text-purple-600' : 'text-purple-400',
          dotColor: 'bg-purple-500',
          hoverBorder: isLight ? 'hover:border-purple-500' : 'hover:border-purple-500/50',
          ctaText: isLight ? 'text-purple-600' : 'text-purple-400',
        };
      case 'Threat Defense & SOC':
        return {
          icon: <Zap className="w-3.5 h-3.5 text-amber-500" />,
          lightBg: 'bg-amber-50 border-amber-200 text-amber-600',
          darkBg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
          textColor: isLight ? 'text-amber-600' : 'text-amber-400',
          dotColor: 'bg-amber-500',
          hoverBorder: isLight ? 'hover:border-amber-500' : 'hover:border-amber-500/50',
          ctaText: isLight ? 'text-amber-600' : 'text-amber-400',
        };
      case 'Cloud & Identity Security':
        return {
          icon: <Cpu className="w-3.5 h-3.5 text-cyan-500" />,
          lightBg: 'bg-cyan-50 border-cyan-200 text-cyan-600',
          darkBg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
          textColor: isLight ? 'text-cyan-600' : 'text-cyan-400',
          dotColor: 'bg-cyan-500',
          hoverBorder: isLight ? 'hover:border-cyan-500' : 'hover:border-cyan-500/50',
          ctaText: isLight ? 'text-cyan-600' : 'text-cyan-400',
        };
      case 'M&A & Enterprise Modernization':
        return {
          icon: <GitMerge className="w-3.5 h-3.5 text-emerald-500" />,
          lightBg: 'bg-emerald-50 border-emerald-200 text-emerald-600',
          darkBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
          textColor: isLight ? 'text-emerald-600' : 'text-emerald-400',
          dotColor: 'bg-emerald-500',
          hoverBorder: isLight ? 'hover:border-emerald-500' : 'hover:border-emerald-500/50',
          ctaText: isLight ? 'text-emerald-600' : 'text-emerald-400',
        };
      case 'Board Governance & Crisis Command':
        return {
          icon: <Scale className="w-3.5 h-3.5 text-rose-500" />,
          lightBg: 'bg-rose-50 border-rose-200 text-rose-600',
          darkBg: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
          textColor: isLight ? 'text-rose-600' : 'text-rose-400',
          dotColor: 'bg-rose-500',
          hoverBorder: isLight ? 'hover:border-rose-500' : 'hover:border-rose-500/50',
          ctaText: isLight ? 'text-rose-600' : 'text-rose-400',
        };
      default:
        return {
          icon: <Lock className="w-3.5 h-3.5 text-blue-500" />,
          lightBg: 'bg-blue-50 border-blue-200 text-blue-600',
          darkBg: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
          textColor: isLight ? 'text-blue-600' : 'text-blue-400',
          dotColor: 'bg-blue-500',
          hoverBorder: isLight ? 'hover:border-blue-500' : 'hover:border-blue-500/50',
          ctaText: isLight ? 'text-blue-600' : 'text-blue-400',
        };
    }
  };

  return (
    <section 
      id="projects" 
      className={`relative overflow-hidden min-h-screen w-full flex flex-col justify-center py-6 sm:py-8 pb-12 sm:pb-16 lg:pb-20 px-6 sm:px-10 lg:px-14 max-w-5xl lg:max-w-6xl mx-auto border-t ${
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
      <div className="relative w-full space-y-1 mb-3.5 sm:mb-4 shrink-0 text-left">
        {/* Luminous aura behind heading */}
        <div 
          className={`absolute -top-3 -left-2 sm:-left-4 w-72 sm:w-96 h-24 sm:h-28 rounded-full blur-2xl pointer-events-none transition-all ${
            isLight 
              ? 'bg-gradient-to-r from-blue-400/25 via-sky-300/20 to-indigo-300/20 opacity-80' 
              : 'bg-gradient-to-r from-blue-500/30 via-cyan-400/20 to-indigo-500/25 opacity-90'
          }`} 
        />

        <div className={`relative inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[10.5px] font-semibold tracking-wider uppercase backdrop-blur-md border ${
          isLight ? 'bg-blue-50/90 border-blue-200 text-blue-700 shadow-sm' : 'bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.15)]'
        }`}>
          <ShieldCheck className="w-3 h-3 text-blue-500" />
          <span>Executive Transformation Programs • CISO Case Studies</span>
        </div>
        <h3 className={`relative text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight transition-all ${
          isLight 
            ? 'text-zinc-900 drop-shadow-[0_2px_16px_rgba(59,130,246,0.22)]' 
            : 'text-white drop-shadow-[0_0_24px_rgba(96,165,250,0.40)]'
        }`}>
          Strategic Case Studies
        </h3>
        <p className={`relative max-w-3xl text-xs leading-normal break-words line-clamp-2 ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
          Enterprise cybersecurity and IAM transformations delivering Zero Standing Privileges, autonomous SOC resilience, and zero audit weaknesses.
        </p>
      </div>

      {/* Top Controls: Filter Pills */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5 mb-3.5 sm:mb-4 shrink-0">
        {/* Category Pills */}
        <div 
          ref={scrollRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none w-full cursor-ew-resize select-none"
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const config = cat.id !== 'all' ? getCategoryConfig(cat.id) : null;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs shadow-blue-500/20'
                    : isLight
                      ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                      : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {config && <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pb-4 sm:pb-6">
        {filteredCaseStudies.map((cs) => {
          const config = getCategoryConfig(cs.category);
          return (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => setActiveCaseStudy(cs)}
              className={`group relative flex flex-col justify-between p-3 sm:p-3.5 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                isLight
                  ? `bg-white border-zinc-200/80 ${config.hoverBorder} hover:shadow-lg shadow-2xs`
                  : `bg-zinc-950/60 border-white/10 ${config.hoverBorder} hover:bg-zinc-900/60 shadow-md`
              }`}
            >
              {/* Top Bar: Icon + Category on Left, Status on Right */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`p-1.5 rounded-lg border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                      isLight ? config.lightBg : config.darkBg
                    }`}>
                      {config.icon}
                    </div>
                    <span className={`text-[9.5px] font-mono uppercase tracking-wider font-semibold truncate ${config.textColor}`}>
                      {cs.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`px-2 py-0.2 rounded-full text-[8px] font-mono border ${
                      cs.status === 'Enterprise Standard' || cs.status === 'Operational'
                        ? isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-emerald-950/40 border-emerald-800/60 text-emerald-400'
                        : isLight ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-blue-950/40 border-blue-800/60 text-blue-400'
                    }`}>
                      {cs.status}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h4 className={`text-[11.5px] sm:text-[12.5px] font-bold leading-snug group-hover:${config.textColor} transition-colors line-clamp-2 break-words ${
                    isLight ? 'text-zinc-900' : 'text-white'
                  }`}>
                    {cs.title}
                  </h4>
                </div>

                {/* Subtitle / Challenge Snippet */}
                <p className={`text-[10px] leading-snug line-clamp-2 break-words ${
                  isLight ? 'text-zinc-600' : 'text-zinc-400'
                }`}>
                  {cs.subtitle}
                </p>

                {/* Operational Scale */}
                <div className={`text-[9.5px] font-mono flex items-center gap-1.5 pt-0.5 ${
                  isLight ? 'text-zinc-600' : 'text-zinc-400'
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span className="break-words leading-tight line-clamp-2">{cs.businessScale}</span>
                </div>

                {/* Top 2 Impact Metrics Highlight */}
                <div className="grid grid-cols-2 gap-3 pt-1.5 border-t border-zinc-100 dark:border-white/5">
                  {cs.impactMetrics.slice(0, 2).map((metric, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <div className="text-[11.5px] sm:text-[12.5px] font-black text-blue-500">{metric.value}</div>
                      <div className={`text-[8px] font-semibold break-words leading-tight line-clamp-2 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Footer: Tags & Briefing Trigger */}
              <div className="pt-2 mt-2.5 border-t border-zinc-200/70 dark:border-white/10 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {cs.tags.slice(0, 2).map((tag, idx) => (
                    <span
                      key={idx}
                      className={`text-[8px] px-1.5 py-0.2 rounded font-mono ${
                        isLight ? 'bg-zinc-100 text-zinc-600' : 'bg-white/5 text-zinc-400'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="inline-flex items-center gap-1 text-[10.5px] font-bold text-blue-500 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform whitespace-nowrap shrink-0">
                  <span>Executive Briefing</span>
                  <ArrowUpRight className="w-3 h-3 text-blue-500 dark:text-blue-400" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredCaseStudies.length === 0 && (
        <div className="text-center py-16 text-zinc-400">
          <FileText className="w-10 h-10 mx-auto mb-2 opacity-40" />
          <p className="text-sm">No defense case studies found in this category.</p>
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

