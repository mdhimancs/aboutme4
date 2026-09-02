import React, { useState, useRef } from 'react';
import { Briefcase, Calendar, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CAREER_MILESTONES } from '../data/portfolioData';
import { useHoverScroll } from '../lib/utils';

interface CareerJourneyProps {
  theme?: string;
}

export const CareerJourney: React.FC<CareerJourneyProps> = ({ theme = 'apple-dark' }) => {
  const isLight = theme === 'apple-light';
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(CAREER_MILESTONES[0]?.id || null);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const { scrollRef: careerScrollRef, onMouseMove: careerOnMouseMove, onMouseLeave: careerOnMouseLeave } = useHoverScroll();

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
          role: 'Tech lead Architect | Sr. Assoc',
          years: '2013–2015',
          shortLabel: 'Tech Lead | Sr. Assoc',
          milestoneId: 'gs-sr-assoc'
        },
        {
          value: 'gs-tech-analyst',
          role: 'Sr. Staff Architect | Sr Analyst/Assoc.',
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

  return (
    <section 
      id="career" 
      className={`relative overflow-hidden min-h-screen lg:h-screen w-full flex flex-col justify-center py-4 sm:py-5 pb-10 sm:pb-14 lg:pb-16 px-6 sm:px-10 lg:px-14 max-w-[1240px] mx-auto border-t ${
        isLight ? 'border-zinc-200 bg-[#fcfcfd]' : 'border-white/10 bg-[#000000]'
      }`}
    >
      {/* Background Aura Effects */}
      <div 
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[320px] sm:h-[450px] rounded-full blur-[90px] sm:blur-[130px] pointer-events-none transition-all duration-700 ${
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
      <div className="relative text-center space-y-1.5 mb-2 sm:mb-3 shrink-0">
        {/* Luminous aura behind heading */}
        <div 
          className={`absolute -top-3 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-24 sm:h-28 rounded-full blur-2xl pointer-events-none transition-all ${
            isLight 
              ? 'bg-gradient-to-r from-blue-400/25 via-sky-300/20 to-indigo-300/20 opacity-80' 
              : 'bg-gradient-to-r from-blue-500/30 via-cyan-400/20 to-indigo-500/25 opacity-90'
          }`} 
        />

        <div className={`relative inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border mx-auto backdrop-blur-md ${
          isLight ? 'bg-blue-50/90 border-blue-200 text-blue-700 shadow-sm' : 'bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.15)]'
        }`}>
          <Briefcase className="w-3.5 h-3.5 text-blue-500" />
          <span>21-Year Executive Progression</span>
        </div>
        <h3 className={`relative text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight transition-all ${
          isLight 
            ? 'text-zinc-900 drop-shadow-[0_2px_16px_rgba(59,130,246,0.22)]' 
            : 'text-white drop-shadow-[0_0_24px_rgba(96,165,250,0.40)]'
        }`}>
          Career Journey & Milestones
        </h3>
        <p className={`relative max-w-5xl mx-auto text-xs sm:text-sm leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
          Directing global cybersecurity, Zero Trust IAM, risk governance, and AI defense across leading Banking and Financial Services and Fortune 100 institutions.
        </p>
      </div>

      {/* CISO Executive Impact Rollup Bar - Removed horizontal borders as requested */}
      <div className={`grid grid-cols-2 md:grid-cols-5 gap-0 mb-3 shrink-0 divide-x max-w-5xl mx-auto w-full ${isLight ? 'divide-zinc-200' : 'divide-white/10'}`}>
        <div className="py-1 px-2 text-left">
          <div className="text-[11px] font-bold text-amber-500 uppercase tracking-wider">Goldman Sachs Tenure</div>
          <div className={`text-xs font-bold mt-0.5 ${isLight ? 'text-zinc-900' : 'text-white'}`}>14 Yrs · 4 Promotions</div>
          <div className="text-[10px] text-zinc-500 mt-0.5 font-mono">Sr. Analyst ➔ VP ➔ SVP</div>
        </div>
        <div className="py-1 px-2 text-left">
          <div className="text-[11px] font-bold text-blue-500 uppercase tracking-wider">Leadership Scale</div>
          <div className={`text-xs font-bold mt-0.5 ${isLight ? 'text-zinc-900' : 'text-white'}`}>30+ Global Engineers</div>
          <div className="text-[10px] text-zinc-500 mt-0.5 font-mono">SecOps, SOC, IAM & GRC</div>
        </div>
        <div className="py-1 px-2 text-left">
          <div className="text-[11px] font-bold text-emerald-500 uppercase tracking-wider">Audit & Compliance</div>
          <div className={`text-xs font-bold mt-0.5 ${isLight ? 'text-zinc-900' : 'text-white'}`}>100% Clean Attestations</div>
          <div className="text-[10px] text-zinc-500 mt-0.5 font-mono">SOX 404, SOC 2 & ISO 27001</div>
        </div>
        <div className={`py-1 px-2 text-left ${isLight ? 'border-zinc-200' : 'border-white/10'}`}>
          <div className="text-[11px] font-bold text-indigo-500 uppercase tracking-wider">Transaction Defense</div>
          <div className={`text-xs font-bold mt-0.5 ${isLight ? 'text-zinc-900' : 'text-white'}`}>$100B–$500B+ Enclave Flow</div>
          <div className="text-[10px] text-zinc-500 mt-0.5 font-mono">$1T+ Tier-1 Clearing Scale</div>
        </div>
        <div className={`py-1 px-2 text-left ${isLight ? 'border-zinc-200' : 'border-white/10'}`}>
          <div className="text-[11px] font-bold text-purple-500 uppercase tracking-wider">Privilege Exposure</div>
          <div className={`text-xs font-bold mt-0.5 ${isLight ? 'text-zinc-900' : 'text-white'}`}>-98.4% Zero Standing</div>
          <div className="text-[10px] text-zinc-500 mt-0.5 font-mono">SailPoint + CyberArk JIT</div>
        </div>
      </div>

      {/* Filter and Controls Header (Mobile only) */}
      <div className="lg:hidden flex items-center justify-center gap-2 mb-3 sm:mb-4 shrink-0 relative">
        <div 
          ref={careerScrollRef}
          onMouseMove={careerOnMouseMove}
          onMouseLeave={careerOnMouseLeave}
          className="flex flex-nowrap items-center justify-start gap-1.5 sm:gap-2 px-1 max-w-full overflow-x-auto cursor-ew-resize select-none"
        >
          {flatRoleOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleFilterChange(opt.value)}
              className={`px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                selectedFilter === opt.value
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/20'
                  : (isLight 
                      ? 'bg-white text-zinc-600 hover:text-zinc-900 border-zinc-200' 
                      : 'bg-white/5 text-zinc-400 hover:text-white border-white/10')
              }`}
            >
              {opt.shortLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Main Dual-Column Content: Timeline on Left, Mini Map on Right or Left shifted */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch flex-1 min-h-0 pt-2 sm:pt-3">
        
        {/* Left Column: Role Selectors (Desktop only) */}
        <div className="hidden lg:flex lg:col-span-4 flex-col gap-2 shrink-0">
          <div className={`p-3 sm:p-3.5 rounded-2xl border h-fit ${isLight ? 'bg-white border-zinc-200 shadow-sm' : 'bg-white/[0.02] border-white/10'}`}>
            <h4 className={`text-[10px] font-bold uppercase tracking-wider mb-2 px-1 ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Career Eras
            </h4>

            <div className="flex flex-col space-y-2">
              {/* All Roles Overview Tab */}
              <button
                onClick={() => handleFilterChange('All')}
                className={`relative z-10 px-2.5 py-1.5 text-[11px] font-semibold text-left transition-all group flex items-center justify-between rounded-xl ${
                  selectedFilter === 'All'
                    ? (isLight ? 'text-blue-600 bg-blue-50/80 font-bold shadow-2xs' : 'text-blue-400 bg-white/[0.06] font-bold')
                    : (isLight ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50' : 'text-zinc-400 hover:text-white hover:bg-white/[0.02]')
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    selectedFilter === 'All'
                      ? (isLight ? 'bg-blue-600' : 'bg-blue-500') 
                      : (isLight ? 'bg-zinc-300' : 'bg-white/20')
                  }`} />
                  <span className="truncate">All Roles</span>
                </div>
                <span className={`text-[8.5px] font-mono shrink-0 ml-1.5 ${selectedFilter === 'All' ? (isLight ? 'text-blue-600' : 'text-blue-400') : 'text-zinc-400'}`}>
                  2005–2025
                </span>
              </button>

              {/* Grouped Companies and Roles */}
              {careerGroups.map((group) => (
                <div key={group.company} className="space-y-1 pt-1">
                  {/* Company Header */}
                  <div className={`flex items-center justify-between px-2 py-0.5 text-[10px] font-bold border-t ${
                    isLight ? 'border-zinc-100 text-zinc-800' : 'border-white/5 text-zinc-200'
                  }`}>
                    <div className="flex items-center gap-1.5 truncate">
                      <span className={`w-1 h-3 rounded-full ${group.company === 'Goldman Sachs' ? (isLight ? 'bg-amber-500' : 'bg-amber-400') : (isLight ? 'bg-blue-600' : 'bg-blue-500')}`} />
                      <span className="truncate">{group.company}</span>
                      {group.company === 'Goldman Sachs' && (
                        <span className={`text-[7.5px] font-semibold px-1 py-0.2 rounded ${
                          isLight ? 'bg-amber-100 text-amber-800' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          14-Yr Tenure · 4 Tiers
                        </span>
                      )}
                    </div>
                    <span className={`text-[8.5px] font-mono shrink-0 ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}>
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
                          className={`relative z-10 w-full px-2 py-1 text-left transition-all group flex items-center justify-between rounded-lg ${
                            isActive
                              ? (isLight ? 'text-blue-600 bg-blue-50/80 font-bold' : 'text-blue-400 bg-white/[0.06] font-bold')
                              : (isLight ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 font-medium' : 'text-zinc-400 hover:text-white hover:bg-white/[0.02] font-medium')
                          }`}
                        >
                          <div className="flex items-center gap-1.5 min-w-0 flex-1">
                            <div className={`w-1 h-1 rounded-full shrink-0 ${
                              isActive 
                                ? (isLight ? 'bg-blue-600' : 'bg-blue-500') 
                                : (isLight ? 'bg-zinc-300 group-hover:bg-zinc-400' : 'bg-white/20 group-hover:bg-white/40')
                            }`} />
                            <span className="truncate leading-tight text-[10px] sm:text-[10.5px]">{item.role}</span>
                          </div>
                          <span className={`text-[8.5px] font-mono shrink-0 ml-1.5 opacity-85 ${
                            isActive ? (isLight ? 'text-blue-600 font-semibold' : 'text-blue-300 font-semibold') : 'text-zinc-400'
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

        {/* Timeline Milestone Cards */}
        <div 
          ref={listContainerRef}
          className="lg:col-span-8 max-h-[65vh] sm:max-h-[75vh] overflow-y-auto pl-1 sm:pl-3 pr-1 sm:pr-3 space-y-4"
        >
          <div className={`relative border-l-2 ${isLight ? 'border-zinc-200' : 'border-white/10'} pl-4 sm:pl-6 space-y-5 py-1 ml-2 sm:ml-3`}>
            {filteredMilestones.map((milestone) => {
              const isExpanded = expandedId === milestone.id;
              return (
                <div 
                  key={milestone.id} 
                  id={`milestone-${milestone.id}`}
                  className="relative group scroll-mt-4"
                >
                  {/* Timeline Bullet */}
                  <div className={`absolute -left-[23px] sm:-left-[31px] top-2 w-3.5 h-3.5 rounded-full ${isLight ? 'bg-white' : 'bg-black'} border-2 ${
                    isExpanded ? 'border-blue-500 bg-blue-500 scale-125' : 'border-blue-500/70'
                  } group-hover:scale-125 group-hover:bg-blue-500 transition-all shadow-md`} />

                  <div
                    onClick={() => setExpandedId(isExpanded ? null : milestone.id)}
                    className={`border rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 backdrop-blur-xl transition-all cursor-pointer ${
                      isLight
                        ? (isExpanded ? 'border-blue-500 bg-white shadow-md ring-1 ring-blue-500/20' : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm')
                        : (isExpanded ? 'border-blue-500/50 bg-white/[0.04] shadow-xl' : 'bg-white/[0.02] border-white/10 hover:border-white/25')
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5 sm:mb-2">
                      <div>
                        <span className="text-[9.5px] sm:text-[10px] font-medium px-2 py-0.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full border border-blue-500/20 inline-block mb-1">
                          {milestone.category}
                        </span>
                        <h4 className={`text-sm sm:text-base font-bold tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                          {milestone.role}
                        </h4>
                        <div className={`text-[11px] sm:text-[13px] font-medium ${isLight ? 'text-zinc-700' : 'text-zinc-300'} mt-0.5`}>
                          {milestone.company}
                        </div>
                      </div>
                      <div className={`flex flex-col sm:items-end text-[11px] ${isLight ? 'text-zinc-600' : 'text-zinc-400'} space-y-0.5 shrink-0`}>
                        <div className={`flex items-center space-x-1 px-2 py-0.5 rounded-full border ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-white/[0.05] border-white/10'}`}>
                          <Calendar className="w-2.5 h-2.5 text-blue-500" />
                          <span className="text-[10px] font-medium">{milestone.period}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-zinc-500 text-[10px]">
                          <MapPin className="w-2.5 h-2.5 text-zinc-500" />
                          <span>{milestone.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className={`text-[11px] sm:text-[13px] mb-2.5 leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                      {milestone.summary}
                    </p>

                    {/* Key Achievements (Collapsible) */}
                    {isExpanded && (
                      <div className={`space-y-2.5 pt-2.5 border-t ${isLight ? 'border-zinc-100' : 'border-white/10'} animate-in fade-in duration-300`}>
                        <div className={`text-[10px] font-semibold uppercase tracking-wider ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                          Key Architectural, Fiduciary & Leadership Impact
                        </div>
                        <ul className="space-y-1.5">
                          {milestone.achievements.map((ach, i) => (
                            <li key={i} className={`flex items-start space-x-2 text-[11px] sm:text-[13px] ${isLight ? 'text-zinc-800' : 'text-zinc-300'}`}>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="pt-1.5 flex flex-wrap gap-1">
                          {milestone.technologies.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className={`text-[8.5px] sm:text-[9px] font-medium px-2 py-0.5 rounded border leading-tight ${
                                isLight ? 'bg-zinc-100/90 border-zinc-200 text-zinc-700' : 'bg-white/[0.04] border-white/10 text-zinc-300'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 text-xs font-medium text-blue-500">
                      <span>{isExpanded ? 'Collapse details' : 'Click to inspect achievements & tech stack'}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
