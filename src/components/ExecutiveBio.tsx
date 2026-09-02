import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Brain, 
  CheckCircle2, 
  Award, 
  BookOpen, 
  BadgeCheck, 
  Sparkles,
  DollarSign,
  Users,
  FileCheck,
  Scale,
  Building2,
  Cpu,
  Compass,
  Key
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useHoverScroll } from '../lib/utils';

interface ExecutiveBioProps {
  theme?: string;
  onNextPage?: () => void;
}

export const ExecutiveBio: React.FC<ExecutiveBioProps> = ({ theme = 'apple-light', onNextPage }) => {
  const isLight = theme === 'apple-light';
  const [activeBioTab, setActiveBioTab] = useState<'summary' | 'philosophy' | 'credentials'>('philosophy');
  const { scrollRef, onMouseMove, onMouseLeave } = useHoverScroll();

  return (
    <section 
      id="bio" 
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
      
      {/* 1. Section Header with Aura Glow */}
      <div className="relative text-left space-y-2 mb-4 sm:mb-5 shrink-0 px-4 sm:px-[6%]">
        {/* Subtle luminous aura behind the heading */}
        <div 
          className={`absolute -top-3 -left-2 sm:-left-4 w-72 sm:w-96 h-24 sm:h-28 rounded-full blur-2xl pointer-events-none transition-all ${
            isLight 
              ? 'bg-gradient-to-r from-blue-400/25 via-sky-300/20 to-indigo-300/20 opacity-80' 
              : 'bg-gradient-to-r from-blue-500/30 via-cyan-400/20 to-indigo-500/25 opacity-90'
          }`} 
        />

        <div className={`relative inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border backdrop-blur-md ${
          isLight ? 'bg-blue-50/90 border-blue-200 text-blue-700 shadow-sm' : 'bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.15)]'
        }`}>
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-blue-500" />
          <span>Executive Leadership & Defense Governance</span>
        </div>
        
        <h2 className={`relative text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight transition-all ${
          isLight 
            ? 'text-zinc-900 drop-shadow-[0_2px_16px_rgba(59,130,246,0.22)]' 
            : 'text-white drop-shadow-[0_0_24px_rgba(96,165,250,0.40)]'
        }`}>
          Executive Bio & Leadership
        </h2>
        
        <p className={`relative max-w-4xl text-[11px] sm:text-[13px] leading-relaxed truncate sm:overflow-visible ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
          21+ years directing enterprise Cybersecurity, Zero Trust IAM architecture, and enterprise risk governance.
        </p>
      </div>

      {/* 2. Full-Width Executive Dossier Card */}
      <div className={`rounded-3xl p-4 sm:p-5 lg:p-6 backdrop-blur-xl shadow-xl transition-all border shrink-0 w-full sm:w-[92%] lg:w-[88%] mx-auto ${
        isLight ? 'bg-white border-zinc-200 shadow-sm' : 'bg-white/[0.02] border-white/10 shadow-2xl'
      }`}>
        
        {/* Navigation Tabs Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pb-3 mb-3.5 border-b border-zinc-100 dark:border-white/5">
          <div className="flex items-center space-x-2.5">
            <div className={`w-2.5 h-2.5 rounded-full ${isLight ? 'bg-blue-600' : 'bg-blue-400'} animate-pulse`} />
            <span className={`text-xs sm:text-sm font-semibold tracking-wide uppercase ${isLight ? 'text-zinc-900' : 'text-white'}`}>
              Executive Dossier
            </span>
          </div>

          <div 
            ref={scrollRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className={`flex items-center justify-center gap-1 p-1 rounded-2xl border whitespace-nowrap overflow-x-auto cursor-ew-resize select-none ${
              isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-black/50 border-white/10'
            }`}
          >
            <button
              onClick={() => setActiveBioTab('philosophy')}
              className={`px-3.5 py-1.5 rounded-xl text-[11px] sm:text-[13px] font-medium whitespace-nowrap transition-all ${
                activeBioTab === 'philosophy'
                  ? (isLight ? 'bg-white text-zinc-900 shadow-sm font-semibold' : 'bg-white text-black shadow-sm font-semibold')
                  : (isLight ? 'text-zinc-600 hover:text-black' : 'text-zinc-400 hover:text-white')
              }`}
            >
              Executive philosophy
            </button>
            <button
              onClick={() => setActiveBioTab('summary')}
              className={`px-3.5 py-1.5 rounded-xl text-[11px] sm:text-[13px] font-medium whitespace-nowrap transition-all ${
                activeBioTab === 'summary'
                  ? (isLight ? 'bg-white text-zinc-900 shadow-sm font-semibold' : 'bg-white text-black shadow-sm font-semibold')
                  : (isLight ? 'text-zinc-600 hover:text-black' : 'text-zinc-400 hover:text-white')
              }`}
            >
              Leadership Pillars
            </button>
            <button
              onClick={() => setActiveBioTab('credentials')}
              className={`px-3.5 py-1.5 rounded-xl text-[11px] sm:text-[13px] font-medium whitespace-nowrap transition-all ${
                activeBioTab === 'credentials'
                  ? (isLight ? 'bg-white text-zinc-900 shadow-sm font-semibold' : 'bg-white text-black shadow-sm font-semibold')
                  : (isLight ? 'text-zinc-600 hover:text-black' : 'text-zinc-400 hover:text-white')
              }`}
            >
              Credentials & Governance
            </button>
          </div>
        </div>

        {/* Tab 1: Executive Summary & Leadership Pillars */}
        {activeBioTab === 'summary' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="space-y-1.5">
              <p className={`text-xs sm:text-sm lg:text-base font-medium leading-relaxed ${isLight ? 'text-zinc-900' : 'text-zinc-100'}`}>
                {PERSONAL_INFO.bioShort}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
              <div className={`p-2.5 rounded-2xl border transition-all ${
                isLight ? 'bg-zinc-50/80 border-zinc-200 hover:border-blue-300' : 'bg-white/[0.03] border-white/5 hover:border-white/15'
              }`}>
                <div className="flex items-center space-x-2 mb-0.5">
                  <Scale className="w-4 h-4 text-blue-500 shrink-0" />
                  <div className={`font-bold text-[11px] sm:text-[13px] truncate ${isLight ? 'text-zinc-900' : 'text-white'}`}>Executive Risk & GRC</div>
                </div>
                <div className={`text-[11px] leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                  Executive Risk Strategy, Audit Committee reporting, SOX 404 zero-deficiency governance, and Cyber Disclosure Readiness.
                </div>
              </div>

              <div className={`p-2.5 rounded-2xl border transition-all ${
                isLight ? 'bg-zinc-50/80 border-zinc-200 hover:border-indigo-300' : 'bg-white/[0.03] border-white/5 hover:border-white/15'
              }`}>
                <div className="flex items-center space-x-2 mb-0.5">
                  <Shield className="w-4 h-4 text-indigo-500 shrink-0" />
                  <div className={`font-bold text-[11px] sm:text-[13px] truncate ${isLight ? 'text-zinc-900' : 'text-white'}`}>Zero Trust Identity Fabric</div>
                </div>
                <div className={`text-[11px] leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                  Consolidating multi-forest Active Directory environments into SailPoint IGA, CyberArk PAM, and Identity Security workload federation.
                </div>
              </div>

              <div className={`p-2.5 rounded-2xl border transition-all ${
                isLight ? 'bg-zinc-50/80 border-zinc-200 hover:border-purple-300' : 'bg-white/[0.03] border-white/5 hover:border-white/15'
              }`}>
                <div className="flex items-center space-x-2 mb-0.5">
                  <Brain className="w-4 h-4 text-purple-500 shrink-0" />
                  <div className={`font-bold text-[11px] sm:text-[13px] truncate ${isLight ? 'text-zinc-900' : 'text-white'}`}>AI Threat Defense</div>
                </div>
                <div className={`text-[11px] leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                  Enterprise AI security reverse-proxies, real-time tokenization DLP, contextual RAG ACLs, and automated SOAR threat containment.
                </div>
              </div>

              <div className={`p-2.5 rounded-2xl border transition-all ${
                isLight ? 'bg-zinc-50/80 border-zinc-200 hover:border-emerald-300' : 'bg-white/[0.03] border-white/5 hover:border-white/15'
              }`}>
                <div className="flex items-center space-x-2 mb-0.5">
                  <Users className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div className={`font-bold text-[11px] sm:text-[13px] truncate ${isLight ? 'text-zinc-900' : 'text-white'}`}>Team & Budget Scale</div>
                </div>
                <div className={`text-[11px] leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                  Orchestrating 30+ security engineering, SOC, and IAM personnel; managing $18.5M CapEx/OpEx modernization and Tier-1 vendor governance.
                </div>
              </div>
            </div>

            {/* Goldman Sachs 14-Year Institutional Track Record */}
            <div className={`p-3 rounded-2xl border transition-all ${
              isLight ? 'bg-gradient-to-r from-amber-500/5 via-blue-500/5 to-transparent border-amber-200/80' : 'bg-gradient-to-r from-amber-500/10 via-blue-500/10 to-transparent border-amber-500/20'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-1.5 mb-2 border-b border-zinc-200/60 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Building2 className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className={`text-xs sm:text-sm font-bold tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                        Goldman Sachs Institutional Track Record
                      </h4>
                      <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${
                        isLight ? 'bg-amber-100 border-amber-200 text-amber-900' : 'bg-amber-500/20 border-amber-500/30 text-amber-300'
                      }`}>
                        14-Year Tenure · 2011–2025
                      </span>
                    </div>
                    <p className={`text-[10.5px] ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                      4 Progressive Executive Promotions across Global Investment Banking, Capital Markets & Enterprise Defense
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 shrink-0">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    Zero SOX 404 Deficiencies
                  </span>
                  <span>•</span>
                  <span>$18.5M Modernization</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                <div className={`p-2 rounded-xl border ${isLight ? 'bg-white/80 border-zinc-200/80' : 'bg-white/[0.02] border-white/5'}`}>
                  <div className="flex items-center justify-between text-[10px] font-semibold mb-0.5">
                    <span className="text-amber-500 font-bold">Sr. Vice President</span>
                    <span className="text-zinc-400 font-mono">2020–2025</span>
                  </div>
                  <div className={`text-[11px] font-bold ${isLight ? 'text-zinc-800' : 'text-zinc-200'}`}>
                    Principal Architect & CISO Track
                  </div>
                  <p className={`text-[9.5px] mt-1 leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    $18.5M budget, 30+ global engineers, 5M+ identities protected, -98.4% standing privileges, and sub-90m zero-day containment.
                  </p>
                </div>

                <div className={`p-2 rounded-xl border ${isLight ? 'bg-white/80 border-zinc-200/80' : 'bg-white/[0.02] border-white/5'}`}>
                  <div className="flex items-center justify-between text-[10px] font-semibold mb-0.5">
                    <span className="text-blue-500 font-bold">Vice President</span>
                    <span className="text-zinc-400 font-mono">2016–2020</span>
                  </div>
                  <div className={`text-[11px] font-bold ${isLight ? 'text-zinc-800' : 'text-zinc-200'}`}>
                    Lead Cybersecurity & IAM Architect
                  </div>
                  <p className={`text-[9.5px] mt-1 leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    Secured AWS/Azure hybrid perimeters, 2B+ events/quarter SIEM/SOAR pipelines, and cut lateral attack surfaces by 85%.
                  </p>
                </div>

                <div className={`p-2 rounded-xl border ${isLight ? 'bg-white/80 border-zinc-200/80' : 'bg-white/[0.02] border-white/5'}`}>
                  <div className="flex items-center justify-between text-[10px] font-semibold mb-0.5">
                    <span className="text-indigo-500 font-bold">Sr. Associate</span>
                    <span className="text-zinc-400 font-mono">2013–2015</span>
                  </div>
                  <div className={`text-[11px] font-bold ${isLight ? 'text-zinc-800' : 'text-zinc-200'}`}>
                    Tech Lead Cyber Defense & IR
                  </div>
                  <p className={`text-[9.5px] mt-1 leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    Directed 24/7 Incident Response Center, deployed enterprise DLP across 40k+ nodes, and led institutional FS-ISAC CTI.
                  </p>
                </div>

                <div className={`p-2 rounded-xl border ${isLight ? 'bg-white/80 border-zinc-200/80' : 'bg-white/[0.02] border-white/5'}`}>
                  <div className="flex items-center justify-between text-[10px] font-semibold mb-0.5">
                    <span className="text-purple-500 font-bold">Sr. Analyst / Assoc.</span>
                    <span className="text-zinc-400 font-mono">2011–2013</span>
                  </div>
                  <div className={`text-[11px] font-bold ${isLight ? 'text-zinc-800' : 'text-zinc-200'}`}>
                    Critical Infrastructure & HFT Security
                  </div>
                  <p className={`text-[9.5px] mt-1 leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    Protected $100B–$500B+ daily trading perimeters & $1T+ clearing scale, engineered 99.999% SLA BCP/DR, and executed STRIDE models.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Executive philosophy & Defense Doctrine */}
        {activeBioTab === 'philosophy' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-zinc-100 dark:border-white/5">
              <div>
                <h4 className={`text-xs sm:text-sm font-bold tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                  The 6 Axioms of Enterprise Cyber Defense & CISO Operating Doctrine
                </h4>
                <p className={`text-[11px] ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  Codified governance principles uniting executive fiduciary accountability with high-velocity engineering execution.
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-1.5">
                <span className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${
                  isLight ? 'bg-blue-50 border-blue-200 text-blue-800' : 'bg-blue-950/40 border-blue-800/40 text-blue-300'
                }`}>
                  Enterprise Security Charter
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {/* Axiom 1: Identity & ZSP */}
              <div className={`p-2.5 rounded-2xl border flex flex-col justify-between transition-all ${
                isLight ? 'bg-zinc-50/90 border-zinc-200 hover:border-blue-300 shadow-2xs' : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              }`}>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                      <Shield className="w-3.5 h-3.5 text-blue-500" />
                    </div>
                    <strong className={`text-[11px] font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>1. Identity is the Sole Perimeter</strong>
                  </div>
                  <p className={`text-[10px] leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                    Static administrative credentials are an unacceptable systemic risk. All elevated access must be ephemeral, Just-In-Time (JIT), cryptographically attested, and zero-standing (ZSP).
                  </p>
                </div>
                <div className={`text-[10px] font-mono mt-1 pt-1.5 border-t ${isLight ? 'text-zinc-500 border-zinc-200/60' : 'text-zinc-500 border-white/5'}`}>
                  Enforcement: SailPoint IGA + CyberArk PAM
                </div>
              </div>

              {/* Axiom 2: Adaptive Defense Doctrine */}
              <div className={`p-2.5 rounded-2xl border flex flex-col justify-between transition-all ${
                isLight ? 'bg-zinc-50/90 border-zinc-200 hover:border-emerald-300 shadow-2xs' : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              }`}>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <Scale className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <strong className={`text-[11px] font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>2. Defense-in-Depth Architecture</strong>
                  </div>
                  <p className={`text-[10px] leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                    Security must be layered across every layer of the tech stack—from network to endpoint to application. One control failure should never result in a complete breach.
                  </p>
                </div>
                <div className={`text-[10px] font-mono mt-1 pt-1.5 border-t ${isLight ? 'text-zinc-500 border-zinc-200/60' : 'text-zinc-500 border-white/5'}`}>
                  Enforcement: Micro-segmentation + WAF/NGFW
                </div>
              </div>

              {/* Axiom 3: Continuous Verification & Zero Trust */}
              <div className={`p-2.5 rounded-2xl border flex flex-col justify-between transition-all ${
                isLight ? 'bg-zinc-50/90 border-zinc-200 hover:border-indigo-300 shadow-2xs' : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              }`}>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-6 h-6 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                      <Lock className="w-3.5 h-3.5 text-indigo-500" />
                    </div>
                    <strong className={`text-[11px] font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>3. Continuous Verification</strong>
                  </div>
                  <p className={`text-[10px] leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                    Never trust, always verify every human identity, non-human workload (Identity), API call, and inter-service token across micro-segmented cloud boundaries.
                  </p>
                </div>
                <div className={`text-[10px] font-mono mt-1 pt-1.5 border-t ${isLight ? 'text-zinc-500 border-zinc-200/60' : 'text-zinc-500 border-white/5'}`}>
                  Enforcement: mTLS + Identity Federation
                </div>
              </div>

              {/* Axiom 4: Defensive AI Asymmetry */}
              <div className={`p-2.5 rounded-2xl border flex flex-col justify-between transition-all ${
                isLight ? 'bg-zinc-50/90 border-zinc-200 hover:border-purple-300 shadow-2xs' : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              }`}>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-6 h-6 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                      <Brain className="w-3.5 h-3.5 text-purple-500" />
                    </div>
                    <strong className={`text-[11px] font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>4. Defensive AI Asymmetry (AISP)</strong>
                  </div>
                  <p className={`text-[10px] leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                    Leverage machine intelligence to automate SOC containment and detect behavioral anomalies, while hardening enterprise LLM pipelines against prompt exfiltration.
                  </p>
                </div>
                <div className={`text-[10px] font-mono mt-1 pt-1.5 border-t ${isLight ? 'text-zinc-500 border-zinc-200/60' : 'text-zinc-500 border-white/5'}`}>
                  Enforcement: NIST AI RMF + Tokenization DLP
                </div>
              </div>

              {/* Axiom 5: High-Agency Culture & Guardrails */}
              <div className={`p-2.5 rounded-2xl border flex flex-col justify-between transition-all ${
                isLight ? 'bg-zinc-50/90 border-zinc-200 hover:border-amber-300 shadow-2xs' : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              }`}>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                    </div>
                    <strong className={`text-[11px] font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>5. Guardrails Over Gates</strong>
                  </div>
                  <p className={`text-[10px] leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                    Security leadership succeeds by empowering business velocity through intuitive developer guardrails and automated CI/CD security gates, paired with blameless post-mortems.
                  </p>
                </div>
                <div className={`text-[10px] font-mono mt-1 pt-1.5 border-t ${isLight ? 'text-zinc-500 border-zinc-200/60' : 'text-zinc-500 border-white/5'}`}>
                  Enforcement: Shift-Left Policy-as-Code
                </div>
              </div>

              {/* Axiom 6: Post-Quantum Cryptographic Agility */}
              <div className={`p-2.5 rounded-2xl border flex flex-col justify-between transition-all ${
                isLight ? 'bg-zinc-50/90 border-zinc-200 hover:border-rose-300 shadow-2xs' : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              }`}>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-6 h-6 rounded-lg bg-rose-500/10 flex items-center justify-center shrink-0">
                      <Key className="w-3.5 h-3.5 text-rose-500" />
                    </div>
                    <strong className={`text-[11px] font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>6. Post-Quantum Cryptographic Agility</strong>
                  </div>
                  <p className={`text-[10px] leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                    Future-proofing enterprise PKI and HSM key management against quantum decryption threats through algorithm agility, hybrid crypto transitions, and automated inventory.
                  </p>
                </div>
                <div className={`text-[10px] font-mono mt-1 pt-1.5 border-t ${isLight ? 'text-zinc-500 border-zinc-200/60' : 'text-zinc-500 border-white/5'}`}>
                  Enforcement: NIST PQC Standards + HSM Rotation
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Edu & Credentials & Governance */}
        {activeBioTab === 'credentials' && (
          <div className="space-y-3 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className={`p-3 rounded-2xl border flex items-start justify-between ${isLight ? 'bg-zinc-50/80 border-zinc-200' : 'bg-white/[0.03] border-white/5'}`}>
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-500/10 text-blue-500 mb-0.5">
                    <BookOpen className="w-3 h-3" />
                    <span>Postgraduate Degree</span>
                  </div>
                  <div className={`font-semibold text-[11px] sm:text-[13px] ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                    Masters of Computer Applications (Computer Science)
                  </div>
                  <div className={`text-[11px] ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>Central University of Jammu (NAAC A++) • 2002 – 2005</div>
                </div>
              </div>

              <div className={`p-3 rounded-2xl border flex items-start justify-between ${isLight ? 'bg-zinc-50/80 border-zinc-200' : 'bg-white/[0.03] border-white/5'}`}>
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-500/10 text-purple-500 mb-0.5">
                    <Brain className="w-3 h-3" />
                    <span>Advanced Specialization</span>
                  </div>
                  <div className={`font-semibold text-[11px] sm:text-[13px] ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                    Data Science & Machine Learning (Intermediate & Advanced)
                  </div>
                  <div className={`text-[11px] ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>IIT Madras • 2022 & 2023</div>
                </div>
              </div>

              <div className={`p-3 rounded-2xl border md:col-span-2 ${isLight ? 'bg-zinc-50/80 border-zinc-200' : 'bg-white/[0.03] border-white/5'}`}>
                <div className="space-y-2.5">
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
                      <span key={i} className={`px-2 py-1 text-[9px] sm:text-[10px] font-medium rounded-md border ${
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
    </section>
  );
};

