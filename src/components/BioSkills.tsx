import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Network, 
  Brain, 
  FileCheck, 
  Cpu, 
  CheckCircle2, 
  Award, 
  BookOpen, 
  BadgeCheck, 
  ChevronRight, 
  Sparkles,
  Layers,
  Server,
  Database
} from 'lucide-react';
import { PERSONAL_INFO, SKILL_CATEGORIES } from '../data/portfolioData';
import { useHoverScroll } from '../lib/utils';

interface BioSkillsProps {
  theme?: string;
}

export const BioSkills: React.FC<BioSkillsProps> = ({ theme = 'apple-dark' }) => {
  const isLight = theme === 'apple-light';
  const [activeBioTab, setActiveBioTab] = useState<'summary' | 'philosophy' | 'credentials'>('summary');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const { scrollRef, onMouseMove, onMouseLeave } = useHoverScroll();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <Shield className="w-5 h-5 text-blue-500" />;
      case 'Lock':
        return <Lock className="w-5 h-5 text-indigo-500" />;
      case 'Network':
        return <Network className="w-5 h-5 text-sky-500" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-emerald-500" />;
      case 'Brain':
        return <Brain className="w-5 h-5 text-purple-500" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-amber-500" />;
      case 'Server':
        return <Server className="w-5 h-5 text-indigo-400" />;
      case 'Database':
        return <Database className="w-5 h-5 text-purple-400" />;
      default:
        return <Layers className="w-5 h-5 text-blue-400" />;
    }
  };

  const filteredCategories = selectedFilter === 'all' 
    ? SKILL_CATEGORIES 
    : SKILL_CATEGORIES.filter(cat => cat.title.toLowerCase().includes(selectedFilter.toLowerCase()));

  return (
    <section id="bio" className={`pt-12 pb-20 px-4 sm:px-6 lg:px-8 w-full max-w-7xl lg:max-w-[1360px] mx-auto border-t ${isLight ? 'border-zinc-200' : 'border-white/10'}`}>
      
      {/* 1. Section Header */}
      <div className="text-center space-y-2.5 mb-7">
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${
          isLight ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
        }`}>
          <Sparkles className="w-3.5 h-3.5" />
          <span>Professional Profile & Architecture</span>
        </div>
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
          Bio & Technical Competencies
        </h2>
        <p className={`max-w-4xl mx-auto text-sm sm:text-base leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
          21+ years engineering enterprise Zero Trust IAM, hardened cryptographic perimeters, and executive security governance.
        </p>
      </div>

      {/* 2. Full-Width Executive Dossier Card */}
      <div className={`rounded-3xl p-4 sm:p-5 lg:p-6 backdrop-blur-xl shadow-xl transition-all border mb-12 ${
        isLight ? 'bg-white border-zinc-200 shadow-sm' : 'bg-white/[0.02] border-white/10 shadow-2xl'
      }`}>
        
        {/* Navigation Tabs Header */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pb-3 mb-3.5 border-b border-zinc-100 dark:border-white/5 relative">
          <div className="hidden lg:flex items-center space-x-2.5 absolute left-0">
            <div className={`w-2.5 h-2.5 rounded-full ${isLight ? 'bg-blue-600' : 'bg-blue-400'} animate-pulse`} />
            <span className={`text-xs sm:text-sm font-semibold tracking-wide uppercase ${isLight ? 'text-zinc-900' : 'text-white'}`}>
              Executive Dossier
            </span>
          </div>

          <div 
            ref={scrollRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className={`flex items-center justify-center gap-1 p-1 rounded-2xl border mx-auto whitespace-nowrap overflow-x-auto cursor-ew-resize select-none ${
              isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-black/50 border-white/10'
            }`}
          >
            <button
              onClick={() => setActiveBioTab('summary')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                activeBioTab === 'summary'
                  ? (isLight ? 'bg-white text-zinc-900 shadow-sm font-semibold' : 'bg-white text-black shadow-sm font-semibold')
                  : (isLight ? 'text-zinc-600 hover:text-black' : 'text-zinc-400 hover:text-white')
              }`}
            >
              Executive Summary
            </button>
            <button
              onClick={() => setActiveBioTab('philosophy')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                activeBioTab === 'philosophy'
                  ? (isLight ? 'bg-white text-zinc-900 shadow-sm font-semibold' : 'bg-white text-black shadow-sm font-semibold')
                  : (isLight ? 'text-zinc-600 hover:text-black' : 'text-zinc-400 hover:text-white')
              }`}
            >
              Leadership Philosophy
            </button>
            <button
              onClick={() => setActiveBioTab('credentials')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                activeBioTab === 'credentials'
                  ? (isLight ? 'bg-white text-zinc-900 shadow-sm font-semibold' : 'bg-white text-black shadow-sm font-semibold')
                  : (isLight ? 'text-zinc-600 hover:text-black' : 'text-zinc-400 hover:text-white')
              }`}
            >
              Edu & Credentials
            </button>
          </div>
        </div>

        {/* Tab 1: Executive Summary */}
        {activeBioTab === 'summary' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="space-y-2">
              <p className={`text-sm sm:text-base lg:text-lg font-medium leading-relaxed ${isLight ? 'text-zinc-900' : 'text-zinc-100'}`}>
                {PERSONAL_INFO.bioShort}
              </p>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                Over two decades of hands-on and strategic leadership across tier-1 financial institutions and global cloud enterprises. Proven track record modernizing legacy federations into cloud-native passwordless authentication, implementing least-privilege Zero Trust boundaries, and embedding AI-driven behavioral defense mechanisms across high-consequence production perimeters.
              </p>
            </div>

            {/* Strategic Highlight Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
              <div className={`p-4 rounded-2xl border transition-all ${
                isLight ? 'bg-zinc-50/80 border-zinc-200' : 'bg-white/[0.03] border-white/5 hover:border-white/15'
              }`}>
                <div className="flex items-center space-x-2 mb-1.5">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <div className={`font-bold text-xs sm:text-sm ${isLight ? 'text-zinc-900' : 'text-white'}`}>Enterprise Cybertechnology & IAM Scale</div>
                </div>
                <div className={`text-xs leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                  Architected federated IAM platforms serving 15M+ enterprise users with 99.999% SLA across multi-region hybrid clouds.
                </div>
              </div>

              <div className={`p-4 rounded-2xl border transition-all ${
                isLight ? 'bg-zinc-50/80 border-zinc-200' : 'bg-white/[0.03] border-white/5 hover:border-white/15'
              }`}>
                <div className="flex items-center space-x-2 mb-1.5">
                  <Brain className="w-4 h-4 text-purple-500" />
                  <div className={`font-bold text-xs sm:text-sm ${isLight ? 'text-zinc-900' : 'text-white'}`}>AI Threat Intelligence</div>
                </div>
                <div className={`text-xs leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                  Engineered automated SOAR workflows, real-time UEBA behavioral anomaly detection, and robust LLM guardrails.
                </div>
              </div>

              <div className={`p-4 rounded-2xl border transition-all ${
                isLight ? 'bg-zinc-50/80 border-zinc-200' : 'bg-white/[0.03] border-white/5 hover:border-white/15'
              }`}>
                <div className="flex items-center space-x-2 mb-1.5">
                  <Lock className="w-4 h-4 text-indigo-500" />
                  <div className={`font-bold text-xs sm:text-sm ${isLight ? 'text-zinc-900' : 'text-white'}`}>Zero Trust & PAM</div>
                </div>
                <div className={`text-xs leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                  Implemented Tier-0 credential isolation, JIT provisioning, and FIDO2 passwordless ecosystems cutting breach vectors by 94%.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Leadership Philosophy */}
        {activeBioTab === 'philosophy' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <p className={`text-sm sm:text-base font-semibold leading-snug ${isLight ? 'text-zinc-900' : 'text-white'}`}>
              Security is an enabler of business velocity, built on defense-in-depth, clear RFC architectures, and continuous verification.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className={`p-4 rounded-2xl border space-y-1.5 ${isLight ? 'bg-zinc-50/80 border-zinc-200' : 'bg-white/[0.03] border-white/5'}`}>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <strong className={`text-xs sm:text-sm ${isLight ? 'text-zinc-900' : 'text-white'}`}>Write the RFC First</strong>
                </div>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                  Architectural alignment prior to code execution prevents technical debt and aligns compliance, engineering, and product stakeholders.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border space-y-1.5 ${isLight ? 'bg-zinc-50/80 border-zinc-200' : 'bg-white/[0.03] border-white/5'}`}>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <strong className={`text-xs sm:text-sm ${isLight ? 'text-zinc-900' : 'text-white'}`}>Zero Trust by Default</strong>
                </div>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                  Never trust, always verify every identity, transaction, payload, and internal API call across all micro-perimeters.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border space-y-1.5 ${isLight ? 'bg-zinc-50/80 border-zinc-200' : 'bg-white/[0.03] border-white/5'}`}>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <strong className={`text-xs sm:text-sm ${isLight ? 'text-zinc-900' : 'text-white'}`}>Blameless Post-Mortems</strong>
                </div>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                  Treating anomalies and alerts as systemic learning opportunities to harden automated regression suites and policy gates.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border space-y-1.5 ${isLight ? 'bg-zinc-50/80 border-zinc-200' : 'bg-white/[0.03] border-white/5'}`}>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <strong className={`text-xs sm:text-sm ${isLight ? 'text-zinc-900' : 'text-white'}`}>Empower High-Agency Teams</strong>
                </div>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                  Security leadership succeeds by providing intuitive guardrails and self-service automation, not operational bottlenecks.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Edu & Credentials */}
        {activeBioTab === 'credentials' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className={`p-4 rounded-2xl border flex items-start justify-between ${isLight ? 'bg-zinc-50/80 border-zinc-200' : 'bg-white/[0.03] border-white/5'}`}>
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-500/10 text-blue-500 mb-0.5">
                    <BookOpen className="w-3 h-3" />
                    <span>Postgraduate Degree</span>
                  </div>
                  <div className={`font-semibold text-xs sm:text-sm ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                    Masters of Computer Applications (Computer Science)
                  </div>
                  <div className={`text-xs ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>Central University of Jammu (NAAC A++) • 2002 – 2005</div>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border flex items-start justify-between ${isLight ? 'bg-zinc-50/80 border-zinc-200' : 'bg-white/[0.03] border-white/5'}`}>
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-500/10 text-purple-500 mb-0.5">
                    <Brain className="w-3 h-3" />
                    <span>Advanced Specialization</span>
                  </div>
                  <div className={`font-semibold text-xs sm:text-sm ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                    Data Science & Machine Learning (Intermediate & Advanced)
                  </div>
                  <div className={`text-xs ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>IIT Madras • 2022 & 2023</div>
                </div>
              </div>
              
              <div className={`p-4 rounded-2xl border md:col-span-2 ${isLight ? 'bg-zinc-50/80 border-zinc-200' : 'bg-white/[0.03] border-white/5'}`}>
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-500">
                    <BadgeCheck className="w-3 h-3" />
                    <span>Industrial Trainings</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "CISSP",
                      "ISACA CISM",
                      "ISACA CRISC",
                      "ISACA CGEIT",
                      "ISACA CISA",
                      "ISACA CDPSE (Data Privacy)",
                      "ISO 42001 Lead Auditor (AI)",
                      "ISO 27001 Lead Auditor (ISMS)",
                      "ISO 22301 Lead Auditor (BCMS)",
                      "SC-100 Cybersecurity Architect Expert",
                      "SC-300 Identity & Access Administrator",
                      "AZ-500 Azure Security Engineer",
                      "AWS Certified Security – Specialty",
                      "AWS Certified Solutions Architect",
                      "CCSP (Cloud Security Professional)",
                      "TOGAF® Enterprise Architecture",
                      "NIST CSF 2.0 Lead Implementer",
                      "FAIR™ Quantitative Cyber Risk Analysis",
                      "MITRE ATT&CK (CTI & SOC Assessments)",
                      "CISO Executive Leadership Program",
                      "PMP® (Project Management Professional)"
                    ].map((cert, i) => (
                      <span key={i} className={`px-2 py-1 text-[10px] sm:text-[11px] font-medium rounded-md border ${
                        isLight ? 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300' : 'bg-white/5 border-white/10 text-zinc-300 hover:border-white/20'
                      }`}>
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 3. Subtle Horizontal Divider with Anchor Label */}
      <div id="competencies" className="relative my-10 scroll-mt-20">
        <div className={`h-[1px] w-full ${isLight ? 'bg-zinc-200' : 'bg-white/10'}`} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border shadow-sm ${
            isLight ? 'bg-white border-zinc-200 text-zinc-700' : 'bg-zinc-950 border-white/15 text-zinc-300'
          }`}>
            Defense-in-Depth • 6 CyberTech Domains
          </span>
        </div>
      </div>

      {/* 4. Core Technical Competencies Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div className="space-y-1 max-w-4xl">
          <h3 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
            Core Technical Competencies & Governance
          </h3>
          <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
            Enterprise architecture, Zero Trust identity fabric, cloud defense, and AI governance.
          </p>
        </div>
        <div className={`text-xs font-semibold px-3 py-1 rounded-full border self-start sm:self-auto shrink-0 ${
          isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-800' : 'bg-white/[0.05] border-white/10 text-zinc-300'
        }`}>
          6 Strategic Pillars
        </div>
      </div>

      {/* 5. Bento Grid: All 6 Core Competencies Boxes with Word-Wrap & Highest-to-Lowest Sorting */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredCategories.map((cat, idx) => {
          // Sort skills strictly descending by proficiency % (highest on top to lowest at bottom)
          const sortedSkills = [...cat.skills].sort((a, b) => b.level - a.level);

          return (
            <div
              key={idx}
              className={`rounded-2xl p-4 sm:p-5 backdrop-blur-xl transition-all group flex flex-col justify-between h-full border ${
                isLight 
                  ? 'bg-white border-zinc-200 shadow-sm hover:border-zinc-300 hover:shadow-md' 
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
              }`}
            >
              <div>
                {/* Card Header with Icon, Title (with word-wrap), and Pillar Badge */}
                <div className="flex items-start justify-between gap-2.5 mb-2">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className={`p-1.5 rounded-xl border shrink-0 mt-0.5 group-hover:scale-105 transition-transform ${
                      isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-white/[0.05] border-white/10'
                    }`}>
                      {getIcon(cat.iconName)}
                    </div>
                    <h4 className={`text-sm sm:text-base font-bold tracking-tight leading-snug break-words ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                      {cat.title}
                    </h4>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 mt-0.5 whitespace-nowrap ${
                    isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-700' : 'bg-white/[0.05] border-white/10 text-zinc-400'
                  }`}>
                    Pillar 0{idx + 1}
                  </span>
                </div>

                {/* Description with aligned best-fit height */}
                <p className={`text-xs mb-3 leading-relaxed break-words min-h-[36px] ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  {cat.description}
                </p>
              </div>

              {/* Skills List Sorted Highest % on Top to Lowest at Bottom */}
              <div className={`space-y-2 pt-2.5 border-t ${isLight ? 'border-zinc-100' : 'border-white/5'}`}>
                {sortedSkills.map((skill, sIdx) => (
                  <div key={sIdx} className="flex items-center justify-between gap-2 text-xs py-0.5">
                    <div className="flex items-center gap-1.5 flex-1 min-w-0 pr-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span 
                        title={skill.name}
                        className={`text-xs leading-snug truncate ${isLight ? 'text-zinc-800 font-medium' : 'text-zinc-300'}`}
                      >
                        {skill.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-auto">
                      <div className={`w-9 sm:w-11 h-1.5 rounded-full overflow-hidden shrink-0 ${isLight ? 'bg-zinc-200' : 'bg-white/10'}`}>
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 w-7 text-right tabular-nums shrink-0">
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

