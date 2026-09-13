import React, { useState, useRef } from 'react';
import { Briefcase, Calendar, MapPin, ChevronRight, CheckCircle2, Award, ChevronDown, ChevronUp, Layers, Building2 } from 'lucide-react';
import { CAREER_MILESTONES } from '../data/portfolioData';
import { useHoverScroll } from '../lib/utils';

interface CareerJourneyProps {
  theme?: string;
}

export const CareerJourney: React.FC<CareerJourneyProps> = ({ theme = 'apple-dark' }) => {
  const isLight = theme === 'apple-light';
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(CAREER_MILESTONES[0]?.id || null);
  const [allExpanded, setAllExpanded] = useState<boolean>(false);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const { scrollRef: careerScrollRef, onMouseMove: careerOnMouseMove, onMouseLeave: careerOnMouseLeave } = useHoverScroll();

  const getMilestoneYear = (period: string) => {
    const years = period.match(/\d{4}/g);
    if (!years) return '';
    if (years.length === 1) return years[0];
    return `${years[0]}–${years[1]}`;
  };

  const careerGroups = [
    {
      company: 'Goldman Sachs',
      period: '2011–2025 · 14 Yrs',
      roles: [
        {
          value: 'gs-svp',
          role: 'Principal Architect | SVP',
          years: '2020–2025',
          shortLabel: 'Principal | SVP',
          milestoneId: 'gs-svp'
        },
        {
          value: 'gs-vp',
          role: 'Lead Architect | VP',
          years: '2016–2020',
          shortLabel: 'Lead Arch | VP',
          milestoneId: 'gs-vp'
        },
        {
          value: 'gs-sr-assoc',
          role: 'Tech Lead Architect | Sr. Assoc',
          years: '2013–2015',
          shortLabel: 'Tech Lead | Sr. Assoc',
          milestoneId: 'gs-sr-assoc'
        },
        {
          value: 'gs-tech-analyst',
          role: 'Sr. Staff Architect | Analyst/Assoc',
          years: '2011–2013',
          shortLabel: 'Sr. Staff | Analyst',
          milestoneId: 'gs-tech-analyst'
        }
      ]
    },
    {
      company: 'Computer Associates (Broadcom)',
      period: '2009–2011 · 2 Yrs',
      roles: [
        {
          value: 'ca-tech-sol',
          role: 'Technical Solutions Engineer',
          years: '2009–2011',
          shortLabel: 'CA (Broadcom)',
          milestoneId: 'ca-tech-sol'
        }
      ]
    },
    {
      company: 'Amrita Technologies',
      period: '2005–2009 · 4 Yrs',
      roles: [
        {
          value: 'amrita-tech-assoc',
          role: 'Technical Associate',
          years: '2005–2009',
          shortLabel: 'Amrita Tech',
          milestoneId: 'amrita-tech-assoc'
        }
      ]
    }
  ];

  const flatRoleOptions = [
    { value: 'All', shortLabel: 'All Roles', role: 'All Roles (2005–2025)', years: '2005–2025', milestoneId: 'gs-svp' },
    ...careerGroups.flatMap(g => g.roles)
  ];

  const filteredMilestones = CAREER_MILESTONES;

  const handleFilterChange = (filterVal: string) => {
    setSelectedFilter(filterVal);
    const targetOption = flatRoleOptions.find(o => o.value === filterVal);
    const targetId = targetOption ? targetOption.milestoneId : (filterVal === 'All' ? 'gs-svp' : filterVal);

    if (targetId) {
      setExpandedId(targetId);
      setTimeout(() => {
        const el = document.getElementById(`milestone-${targetId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 50);
    }
  };

  const toggleExpandAll = () => {
    if (allExpanded) {
      setAllExpanded(false);
      setExpandedId(null);
    } else {
      setAllExpanded(true);
      setExpandedId('all');
    }
  };

  return (
    <section 
      id="career" 
      className={`relative overflow-hidden min-h-screen w-full flex flex-col justify-start pt-3 sm:pt-4 pb-4 sm:pb-6 px-3 sm:px-6 lg:px-10 max-w-7xl mx-auto border-t transition-colors duration-300 ${
        isLight ? 'border-zinc-200 bg-[#fcfcfd]' : 'border-white/10 bg-[#000000]'
      }`}
    >
      {/* Background Ambient Glows */}
      <div 
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[300px] sm:h-[400px] rounded-full blur-[100px] sm:blur-[140px] pointer-events-none transition-all duration-700 ${
          isLight 
            ? 'bg-gradient-to-tr from-blue-400/15 via-indigo-300/12 to-sky-300/10' 
            : 'bg-gradient-to-tr from-blue-600/16 via-indigo-500/12 to-cyan-500/10'
        }`} 
      />
      <div 
        className={`absolute -bottom-24 -right-24 w-72 sm:w-80 h-72 sm:h-80 rounded-full blur-[80px] pointer-events-none ${
          isLight ? 'bg-indigo-300/10' : 'bg-blue-600/10'
        }`} 
      />

      {/* Section Header - Compact Padding */}
      <div className="relative text-left space-y-0.5 shrink-0 mb-2.5">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-0.5">
          <div className={`relative inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] sm:text-[11px] font-semibold tracking-wider uppercase border backdrop-blur-md ${
            isLight ? 'bg-blue-50/90 border-blue-200 text-blue-700 shadow-2xs' : 'bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.15)]'
          }`}>
            <Briefcase className="w-3 h-3 text-blue-500" />
            <span>21-Year Executive Progression</span>
          </div>

          {/* Quick Expand/Collapse Control */}
          <button
            onClick={toggleExpandAll}
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-medium border transition-all ${
              isLight 
                ? 'bg-white hover:bg-zinc-100 text-zinc-700 border-zinc-200 shadow-2xs' 
                : 'bg-white/5 hover:bg-white/10 text-zinc-300 border-white/10'
            }`}
          >
            {allExpanded ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-blue-500" />
                <span>Collapse All</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-blue-500" />
                <span>Expand All Details</span>
              </>
            )}
          </button>
        </div>

        <h2 
          className={`relative text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight transition-all leading-tight ${
          isLight 
            ? 'text-zinc-900 drop-shadow-[0_2px_16px_rgba(59,130,246,0.15)]' 
            : 'text-white drop-shadow-[0_0_24px_rgba(96,165,250,0.35)]'
        }`}>
          Career Journey & Milestones
        </h2>
        <p 
          className={`relative max-w-4xl text-[11px] sm:text-[12.5px] font-normal leading-normal ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}
        >
          Directing global cybersecurity, Zero Trust IAM, risk governance, and AI defense across leading Banking & Financial Services and Fortune 100 institutions.
        </p>
      </div>

      {/* CISO Executive Impact Rollup Bar - Ultra sleek compact layout */}
      <div 
        className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5 sm:gap-2 mb-3 shrink-0 w-full`}
      >
        <div className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
          isLight ? 'bg-white/90 border-zinc-200/90 shadow-2xs' : 'bg-white/[0.03] border-white/10'
        }`}>
          <div className="text-[10px] sm:text-[10.5px] font-bold text-amber-500 uppercase tracking-wider">Goldman Sachs Tenure</div>
          <div className={`text-[11.5px] sm:text-xs font-bold mt-0.5 ${isLight ? 'text-zinc-900' : 'text-white'}`}>14 Yrs · 4 Promotions</div>
          <div className="text-[9px] text-zinc-500 font-mono">Sr. Analyst ➔ VP ➔ SVP</div>
        </div>

        <div className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
          isLight ? 'bg-white/90 border-zinc-200/90 shadow-2xs' : 'bg-white/[0.03] border-white/10'
        }`}>
          <div className="text-[10px] sm:text-[10.5px] font-bold text-blue-500 uppercase tracking-wider">Leadership Scale</div>
          <div className={`text-[11.5px] sm:text-xs font-bold mt-0.5 ${isLight ? 'text-zinc-900' : 'text-white'}`}>30+ Global Engineers</div>
          <div className="text-[9px] text-zinc-500 font-mono">SecOps, SOC, IAM & GRC</div>
        </div>

        <div className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
          isLight ? 'bg-white/90 border-zinc-200/90 shadow-2xs' : 'bg-white/[0.03] border-white/10'
        }`}>
          <div className="text-[10px] sm:text-[10.5px] font-bold text-emerald-500 uppercase tracking-wider">Audit & Compliance</div>
          <div className={`text-[11.5px] sm:text-xs font-bold mt-0.5 ${isLight ? 'text-zinc-900' : 'text-white'}`}>100% Clean Attestations</div>
          <div className="text-[9px] text-zinc-500 font-mono">SOX 404, SOC 2 & ISO 27001</div>
        </div>

        <div className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
          isLight ? 'bg-white/90 border-zinc-200/90 shadow-2xs' : 'bg-white/[0.03] border-white/10'
        }`}>
          <div className="text-[10px] sm:text-[10.5px] font-bold text-indigo-500 uppercase tracking-wider">Transaction Defense</div>
          <div className={`text-[11.5px] sm:text-xs font-bold mt-0.5 ${isLight ? 'text-zinc-900' : 'text-white'}`}>$100B–$500B+ Flow</div>
          <div className="text-[9px] text-zinc-500 font-mono">$1T+ Tier-1 Clearing Scale</div>
        </div>

        <div className={`col-span-2 sm:col-span-1 py-1.5 px-2 rounded-lg border text-center transition-all ${
          isLight ? 'bg-white/90 border-zinc-200/90 shadow-2xs' : 'bg-white/[0.03] border-white/10'
        }`}>
          <div className="text-[10px] sm:text-[10.5px] font-bold text-purple-500 uppercase tracking-wider">Privilege Exposure</div>
          <div className={`text-[11.5px] sm:text-xs font-bold mt-0.5 ${isLight ? 'text-zinc-900' : 'text-white'}`}>-98.4% Zero Standing</div>
          <div className="text-[9px] text-zinc-500 font-mono">SailPoint + CyberArk JIT</div>
        </div>
      </div>

      {/* Filter and Controls Header (Mobile/Tablet horizontal scroller) */}
      <div className="lg:hidden flex items-center justify-start gap-1.5 mb-2.5 shrink-0 overflow-x-auto pb-0.5">
        <div 
          ref={careerScrollRef}
          onMouseMove={careerOnMouseMove}
          onMouseLeave={careerOnMouseLeave}
          className="flex flex-nowrap items-center justify-start gap-1.5 px-0.5 max-w-full overflow-x-auto select-none"
        >
          {flatRoleOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleFilterChange(opt.value)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-all border shrink-0 ${
                selectedFilter === opt.value
                  ? 'bg-blue-600 text-white border-blue-500 shadow-2xs'
                  : (isLight 
                      ? 'bg-white text-zinc-700 hover:text-zinc-900 border-zinc-200' 
                      : 'bg-white/5 text-zinc-400 hover:text-white border-white/10')
              }`}
            >
              {opt.shortLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Main Dual-Column Content: Milestones on Left (8 cols), Career Eras on Right (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-start flex-1 min-h-0">
        {/* Left Column: Timeline Milestone Cards */}
        <div 
          ref={listContainerRef}
          className="lg:col-span-8 space-y-3 max-h-[74vh] overflow-y-auto pr-1 sm:pr-2"
        >
          {/* Timeline Vertical Track with generous left margin for Year Box */}
          <div className={`relative border-l-2 ${isLight ? 'border-blue-300' : 'border-blue-500/40'} ml-[76px] sm:ml-[88px] space-y-3.5 py-0.5`}>
            {filteredMilestones.map((milestone) => {
              const isExpanded = allExpanded || expandedId === milestone.id || expandedId === 'all';
              const isSelected = selectedFilter === milestone.id;

              return (
                <div 
                  key={milestone.id} 
                  id={`milestone-${milestone.id}`}
                  className="relative group scroll-mt-4 pl-4 sm:pl-5"
                >
                  {/* Attractive Non-Truncated Year Badge Box on Left */}
                  <div className="absolute -left-[76px] sm:-left-[88px] top-1.5 w-[66px] sm:w-[78px] flex justify-end items-center pointer-events-none select-none">
                    <span className={`font-mono text-[9.5px] sm:text-[10.5px] font-bold tracking-tight px-1.5 sm:px-2 py-0.5 rounded-md border shadow-2xs whitespace-nowrap inline-flex items-center justify-center text-center transition-all ${
                      isExpanded || isSelected
                        ? (isLight ? 'bg-blue-600 text-white border-blue-600 shadow-xs' : 'bg-blue-500 text-white border-blue-400 shadow-sm') 
                        : (isLight ? 'bg-zinc-100 text-zinc-800 border-zinc-300 group-hover:border-zinc-400 group-hover:bg-zinc-200/90' : 'bg-zinc-800/95 text-zinc-200 border-zinc-700 group-hover:border-zinc-500 group-hover:bg-zinc-700/90')
                    }`}>
                      {getMilestoneYear(milestone.period)}
                    </span>
                  </div>

                  {/* Timeline Bullet Node */}
                  <div className={`absolute -left-[7px] top-2 w-3 h-3 rounded-full ${isLight ? 'bg-white' : 'bg-black'} border-2 transition-all duration-200 ${
                    isExpanded || isSelected
                      ? 'border-blue-500 bg-blue-500 scale-125 shadow-xs' 
                      : 'border-blue-500/70 group-hover:scale-125 group-hover:bg-blue-500'
                  }`} />

                  {/* Milestone Card - Compact Padding & Elegant Hierarchy */}
                  <div
                    onClick={() => {
                      if (allExpanded) {
                        setAllExpanded(false);
                        setExpandedId(isExpanded ? null : milestone.id);
                      } else {
                        setExpandedId(isExpanded ? null : milestone.id);
                      }
                    }}
                    className={`border rounded-xl p-3 sm:p-3.5 backdrop-blur-xl transition-all duration-200 cursor-pointer ${
                      isLight
                        ? (isExpanded 
                            ? 'border-blue-500 bg-white shadow-sm ring-1 ring-blue-500/20' 
                            : 'bg-white border-zinc-200/90 hover:border-zinc-300 shadow-2xs')
                        : (isExpanded 
                            ? 'border-blue-500/60 bg-white/[0.05] shadow-lg' 
                            : 'bg-white/[0.025] border-white/10 hover:border-white/20')
                    }`}
                  >
                    {/* Header: Role, Attractive Company Pill, and Right-Aligned Highlight */}
                    <div className="flex flex-col gap-1.5 mb-1.5">
                      <div className="min-w-0 w-full">
                        {/* Company Badge with Elevated Visual Aesthetic */}
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          {milestone.company === 'Goldman Sachs' ? (
                            <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md ${
                              isLight 
                                ? 'bg-gradient-to-r from-amber-100 to-amber-50 text-amber-900 border border-amber-300 shadow-2xs' 
                                : 'bg-gradient-to-r from-amber-500/20 to-amber-600/10 text-amber-300 border border-amber-500/40 shadow-xs'
                            }`}>
                              <Building2 className="w-3 h-3 text-amber-500 shrink-0" />
                              <span>Goldman Sachs</span>
                            </span>
                          ) : milestone.company.includes('Computer Associates') ? (
                            <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md ${
                              isLight 
                                ? 'bg-gradient-to-r from-sky-100 to-sky-50 text-sky-900 border border-sky-300 shadow-2xs' 
                                : 'bg-gradient-to-r from-sky-500/20 to-sky-600/10 text-sky-300 border border-sky-500/40 shadow-xs'
                            }`}>
                              <Building2 className="w-3 h-3 text-sky-500 shrink-0" />
                              <span>CA (Broadcom)</span>
                            </span>
                          ) : (
                            <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md ${
                              isLight 
                                ? 'bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-900 border border-emerald-300 shadow-2xs' 
                                : 'bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 text-emerald-300 border border-emerald-500/40 shadow-xs'
                            }`}>
                              <Building2 className="w-3 h-3 text-emerald-500 shrink-0" />
                              <span>Amrita Tech</span>
                            </span>
                          )}

                          {/* Location and Date Range Row */}
                          <div className={`text-[11px] font-medium ${isLight ? 'text-zinc-600' : 'text-zinc-400'} flex items-center gap-1.5`}>
                            <span className="inline-flex items-center gap-0.5">
                              <MapPin className="w-2.5 h-2.5 text-zinc-400 shrink-0" />
                              <span>{milestone.location}</span>
                            </span>
                            <span className="opacity-40">|</span>
                            <span className="inline-flex items-center gap-0.5">
                              <Calendar className="w-2.5 h-2.5 text-zinc-400 shrink-0" />
                              <span>{milestone.period}</span>
                            </span>
                          </div>
                        </div>

                        {/* Role Title */}
                        <h3 className={`text-[14px] sm:text-[15px] font-bold tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'} leading-snug`}>
                          {milestone.role}
                        </h3>
                      </div>

                      {/* Category Highlight Badges */}
                      <div className="flex flex-wrap items-center justify-start gap-1 w-full">
                        {milestone.category.split(',').map((catTag, cIdx) => (
                          <span 
                            key={cIdx}
                            className={`text-[9.5px] sm:text-[10px] font-medium px-2 py-0.5 rounded-md border whitespace-nowrap shadow-2xs inline-block ${
                              isLight ? 'bg-zinc-800 text-zinc-100 border-zinc-700' : 'bg-zinc-800/95 text-zinc-200 border-zinc-700'
                            }`}
                          >
                            {catTag.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Achievements (Highlights) */}
                    <div className="mb-2">
                      <ul className="space-y-1">
                        {milestone.achievements.map((ach, i) => (
                          <li key={i} className={`flex items-start space-x-1.5 text-xs sm:text-[12.5px] leading-relaxed ${isLight ? 'text-zinc-800' : 'text-zinc-200'}`}>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Executive Summary - Compact & Clear */}
                    <p className={`text-xs sm:text-[13px] leading-relaxed mb-1.5 ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                      {milestone.summary}
                    </p>

                    {/* Collapsible Tech Stack */}
                    {isExpanded && (
                      <div className={`space-y-2 pt-2 border-t ${isLight ? 'border-zinc-100' : 'border-white/10'} animate-in fade-in duration-300`}>
                        {/* Tech Stack Chips */}
                        <div className="pt-1">
                          <div className={`text-[9.5px] font-semibold uppercase tracking-wider mb-1 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                            Technology & Governance Frameworks:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {milestone.technologies.map((tech, tIdx) => (
                              <span
                                key={tIdx}
                                className={`text-[9px] font-medium px-1.5 py-0.5 rounded border ${
                                  isLight 
                                    ? 'bg-zinc-100 border-zinc-200 text-zinc-800' 
                                    : 'bg-white/[0.04] border-white/10 text-zinc-300'
                                }`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Expand/Collapse Footer Toggle */}
                    <div className="flex items-center justify-between pt-1.5 text-[11px] font-semibold text-blue-500 hover:text-blue-600 transition-colors">
                      <span>{isExpanded ? 'Collapse impact details' : 'Inspect leadership achievements & tech stack'}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Career Eras Selector (Desktop Sticky Panel) */}
        <div className="hidden lg:flex lg:col-span-4 flex-col gap-2 shrink-0">
          <div 
            className={`p-3 rounded-xl border sticky top-2 backdrop-blur-xl ${
              isLight ? 'bg-white/95 border-zinc-200 shadow-2xs' : 'bg-white/[0.025] border-white/10 shadow-lg'
            }`}
          >
            <div className="flex items-center justify-between mb-2 px-1">
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-500" />
                <h4 className={`text-[11.5px] font-bold uppercase tracking-wider ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                  Career Eras & Tiers
                </h4>
              </div>
              <span className={`text-[10px] font-mono font-medium ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                2005–2025
              </span>
            </div>

            <div className="flex flex-col space-y-1.5">
              {/* All Roles Overview Tab */}
              <button
                onClick={() => handleFilterChange('All')}
                className={`w-full px-2.5 py-1.5 text-xs font-semibold text-left transition-all group flex items-center justify-between rounded-lg border ${
                  selectedFilter === 'All'
                    ? (isLight ? 'text-blue-700 bg-blue-50 border-blue-200 font-bold shadow-2xs' : 'text-blue-300 bg-blue-500/10 border-blue-500/30 font-bold')
                    : (isLight ? 'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 border-transparent' : 'text-zinc-400 hover:text-white hover:bg-white/[0.03] border-transparent')
                }`}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    selectedFilter === 'All'
                      ? (isLight ? 'bg-blue-600' : 'bg-blue-400') 
                      : (isLight ? 'bg-zinc-300' : 'bg-white/20')
                  }`} />
                  <span className="truncate">All Executive Roles</span>
                </div>
                <span className={`text-[9.5px] font-mono shrink-0 ml-1.5 ${selectedFilter === 'All' ? (isLight ? 'text-blue-600' : 'text-blue-300') : 'text-zinc-400'}`}>
                  21 Yrs
                </span>
              </button>

              {/* Grouped Companies and Roles */}
              {careerGroups.map((group) => (
                <div key={group.company} className="space-y-0.5 pt-0.5">
                  {/* Company Header */}
                  <div className={`flex items-center justify-between px-2 py-0.5 text-[11.5px] font-bold border-t ${
                    isLight ? 'border-zinc-100 text-zinc-900' : 'border-white/5 text-zinc-100'
                  }`}>
                    <div className="flex items-center gap-1.5 truncate">
                      <Building2 className={`w-3 h-3 shrink-0 ${
                        group.company === 'Goldman Sachs' ? 'text-amber-500' : 'text-blue-500'
                      }`} />
                      <span className="truncate">{group.company}</span>
                    </div>
                    <span className={`text-[9.5px] font-mono shrink-0 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                      {group.period}
                    </span>
                  </div>

                  {/* Progressive Roles under Company */}
                  <div className="space-y-0.5 pl-1.5">
                    {group.roles.map((item) => {
                      const isActive = selectedFilter === item.value;
                      return (
                        <button
                          key={item.value}
                          onClick={() => handleFilterChange(item.value)}
                          className={`w-full px-2 py-1 text-left transition-all group flex items-center justify-between rounded-md border ${
                            isActive
                              ? (isLight ? 'text-blue-700 bg-blue-50/90 border-blue-200 font-bold shadow-2xs' : 'text-blue-300 bg-blue-500/15 border-blue-500/30 font-bold')
                              : (isLight ? 'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 border-transparent font-medium' : 'text-zinc-400 hover:text-white hover:bg-white/[0.02] border-transparent font-medium')
                          }`}
                        >
                          <div className="flex items-center gap-1.5 min-w-0 flex-1">
                            <div className={`w-1 h-1 rounded-full shrink-0 ${
                              isActive 
                                ? (isLight ? 'bg-blue-600' : 'bg-blue-400') 
                                : (isLight ? 'bg-zinc-300 group-hover:bg-zinc-400' : 'bg-white/20 group-hover:bg-white/40')
                            }`} />
                            <span className="truncate leading-tight text-[11.5px]">{item.role}</span>
                          </div>
                          <span className={`text-[9.5px] font-mono shrink-0 ml-1 ${
                            isActive ? (isLight ? 'text-blue-700 font-semibold' : 'text-blue-300 font-semibold') : 'text-zinc-400'
                          }`}>
                            {item.years}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
