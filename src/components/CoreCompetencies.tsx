import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Network, 
  Brain, 
  FileCheck, 
  Cpu, 
  Layers,
  Server,
  Database,
  Sparkles
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

interface CoreCompetenciesProps {
  theme?: string;
}

export const CoreCompetencies: React.FC<CoreCompetenciesProps> = ({ theme = 'apple-dark' }) => {
  const isLight = theme === 'apple-light';
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <Shield className="w-3.5 h-3.5 text-blue-500" />;
      case 'Lock':
        return <Lock className="w-3.5 h-3.5 text-indigo-500" />;
      case 'Network':
        return <Network className="w-3.5 h-3.5 text-sky-500" />;
      case 'FileCheck':
        return <FileCheck className="w-3.5 h-3.5 text-emerald-500" />;
      case 'Brain':
        return <Brain className="w-3.5 h-3.5 text-purple-500" />;
      case 'Cpu':
        return <Cpu className="w-3.5 h-3.5 text-amber-500" />;
      case 'Server':
        return <Server className="w-3.5 h-3.5 text-indigo-400" />;
      case 'Database':
        return <Database className="w-3.5 h-3.5 text-purple-400" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-blue-400" />;
    }
  };

  const filteredCategories = selectedFilter === 'all' 
    ? SKILL_CATEGORIES 
    : SKILL_CATEGORIES.filter(cat => cat.title.toLowerCase().includes(selectedFilter.toLowerCase()));

  return (
    <section 
      id="competencies" 
      className={`relative overflow-hidden min-h-screen lg:h-screen w-full flex flex-col justify-center py-4 sm:py-5 pb-10 sm:pb-14 lg:pb-16 px-6 sm:px-10 lg:px-14 max-w-5xl lg:max-w-6xl mx-auto border-t ${
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

      {/* 1. Header with Badge & Aura */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 sm:mb-3.5 shrink-0">
        {/* Luminous aura behind heading */}
        <div 
          className={`absolute -top-3 -left-2 sm:-left-4 w-72 sm:w-96 h-24 sm:h-28 rounded-full blur-2xl pointer-events-none transition-all ${
            isLight 
              ? 'bg-gradient-to-r from-blue-400/25 via-sky-300/20 to-indigo-300/20 opacity-80' 
              : 'bg-gradient-to-r from-blue-500/30 via-cyan-400/20 to-indigo-500/25 opacity-90'
          }`} 
        />

        <div className="relative space-y-0.5 max-w-3xl">
          <div className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider border backdrop-blur-md ${
            isLight ? 'bg-blue-50/90 border-blue-200 text-blue-700 shadow-sm' : 'bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.15)]'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            <span>Defense-in-Depth Architecture</span>
          </div>
          <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight transition-all ${
            isLight 
              ? 'text-zinc-900 drop-shadow-[0_2px_16px_rgba(59,130,246,0.22)]' 
              : 'text-white drop-shadow-[0_0_24px_rgba(96,165,250,0.40)]'
          }`}>
            Core Competencies & Strategic Pillars
          </h2>
          <p className={`text-xs leading-tight ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
            Enterprise architecture, Zero Trust identity, cloud defense, and AI governance.
          </p>
        </div>
        <div className={`relative text-[11px] font-semibold px-3 py-0.5 rounded-full border self-start sm:self-auto shrink-0 ${
          isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-800' : 'bg-white/[0.05] border-white/10 text-zinc-300'
        }`}>
          6 Strategic Pillars
        </div>
      </div>

      {/* 2. Bento Grid: All 6 Core Competencies Boxes with further enhanced spacing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 shrink-0 w-full">
        {filteredCategories.map((cat, idx) => {
          // Sort skills strictly descending by proficiency % (highest on top to lowest at bottom)
          const sortedSkills = [...cat.skills].sort((a, b) => b.level - a.level);

          return (
            <div
              key={idx}
              className={`rounded-2xl p-3 sm:p-3.5 backdrop-blur-xl transition-all group flex flex-col justify-between h-full border ${
                isLight 
                  ? 'bg-white border-zinc-200 shadow-2xs hover:border-zinc-300 hover:shadow-xs' 
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
              }`}
            >
              <div>
                {/* Card Header with Icon, Title, and Pillar Badge */}
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-start gap-2 min-w-0">
                    <div className={`p-1.5 rounded-lg border shrink-0 mt-0.5 group-hover:scale-105 transition-transform ${
                      isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-white/[0.05] border-white/10'
                    }`}>
                      {getIcon(cat.iconName)}
                    </div>
                    <h3 className={`text-[12px] sm:text-[12.5px] font-bold tracking-tight leading-snug break-words ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                      {cat.title}
                    </h3>
                  </div>
                  <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border shrink-0 mt-0.5 whitespace-nowrap ${
                    isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-600' : 'bg-white/[0.05] border-white/10 text-zinc-400'
                  }`}>
                    Pillar {idx + 1}
                  </span>
                </div>
 
                {/* Description with aligned best-fit height */}
                <p className={`text-[10px] sm:text-[10.5px] mb-2 leading-relaxed break-words min-h-[28px] sm:min-h-[30px] ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  {cat.description}
                </p>
              </div>
 
              {/* Skills List Sorted Highest % on Top to Lowest at Bottom */}
              <div className={`space-y-1.5 pt-2 border-t ${isLight ? 'border-zinc-100' : 'border-white/5'}`}>
                {sortedSkills.map((skill, sIdx) => (
                  <div key={sIdx} className="flex items-center justify-between gap-1.5 text-xs py-0.5">
                    <div className="flex items-center gap-1.5 flex-1 min-w-0 pr-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span 
                        title={skill.name}
                        className={`text-[10.5px] leading-tight truncate ${isLight ? 'text-zinc-800 font-medium' : 'text-zinc-300'}`}
                      >
                        {skill.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-auto">
                      <div className={`w-8 sm:w-10 h-1.5 rounded-full overflow-hidden shrink-0 ${isLight ? 'bg-zinc-200' : 'bg-white/10'}`}>
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="text-[9.5px] font-semibold text-blue-600 dark:text-blue-400 w-6 text-right tabular-nums shrink-0">
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
