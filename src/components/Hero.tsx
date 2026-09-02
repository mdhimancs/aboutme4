import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Sparkles, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenContact: () => void;
  onExploreBlog: () => void;
  theme?: string;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onExploreBlog, theme = 'apple-light' }) => {
  const isLight = theme === 'apple-light';

  return (
    <section 
      id="overview" 
      className={`relative min-h-screen lg:h-screen w-full flex flex-col justify-between py-3 sm:py-4 pb-3 sm:pb-4 lg:pb-5 px-6 sm:px-10 lg:px-14 max-w-5xl lg:max-w-6xl mx-auto overflow-hidden border-t ${
        isLight ? 'border-transparent bg-[#fcfcfd]' : 'border-transparent bg-[#000000]'
      }`}
    >
      {/* Background Aura Effects */}
      <div 
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[500px] rounded-full blur-[100px] sm:blur-[140px] pointer-events-none transition-all duration-700 ${
          isLight 
            ? 'bg-gradient-to-tr from-blue-400/18 via-indigo-300/14 to-sky-300/12' 
            : 'bg-gradient-to-tr from-blue-600/20 via-indigo-500/15 to-cyan-500/12'
        }`} 
      />
      <div 
        className={`absolute -bottom-24 -right-24 w-80 sm:w-96 h-80 sm:h-96 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none ${
          isLight ? 'bg-indigo-300/12' : 'bg-blue-600/15'
        }`} 
      />
      <div 
        className={`absolute -top-16 -left-16 w-72 sm:w-88 h-72 sm:h-88 rounded-full blur-[80px] sm:blur-[110px] pointer-events-none ${
          isLight ? 'bg-sky-300/12' : 'bg-indigo-600/12'
        }`} 
      />

      {/* 1. Static Executive Header */}
      <div className="relative flex items-center justify-start shrink-0 pt-1">
        {/* Subtle luminous aura behind header */}
        <div 
          className={`absolute -top-3 -left-2 sm:-left-4 w-72 sm:w-96 h-20 sm:h-24 rounded-full blur-2xl pointer-events-none transition-all ${
            isLight 
              ? 'bg-gradient-to-r from-blue-400/20 via-sky-300/15 to-indigo-300/15 opacity-80' 
              : 'bg-gradient-to-r from-blue-500/25 via-cyan-400/15 to-indigo-500/20 opacity-90'
          }`} 
        />

        <div className="flex items-center space-x-2">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border backdrop-blur-md ${
            isLight ? 'bg-blue-50/90 border-blue-200 text-blue-700 shadow-sm' : 'bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.15)]'
          }`}>
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-blue-500" />
            <span>Strategic Executive Overview</span>
          </div>
        </div>
      </div>

      {/* 2. Main Centered Content */}
      <div className="relative w-full mx-auto text-center space-y-4 sm:space-y-5 px-2 sm:px-4 my-auto shrink-0 py-2 sm:py-3">

        {/* Aura behind main headline */}
        <div 
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[340px] sm:w-[500px] h-28 sm:h-36 rounded-full blur-3xl pointer-events-none transition-all ${
            isLight 
              ? 'bg-gradient-to-r from-blue-400/25 via-sky-300/20 to-indigo-300/20 opacity-80' 
              : 'bg-gradient-to-r from-blue-500/30 via-cyan-400/20 to-indigo-500/25 opacity-90'
          }`} 
        />

        {/* Main Headline */}
        <div className="relative space-y-3 max-w-5xl mx-auto">
          <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.12] transition-all ${
            isLight 
              ? 'text-zinc-900 drop-shadow-[0_2px_18px_rgba(59,130,246,0.22)]' 
              : 'text-white drop-shadow-[0_0_28px_rgba(96,165,250,0.40)]'
          }`}>
            <span className="block">Enterprise Cyber Defense, <span className={`text-transparent bg-clip-text ${isLight ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-zinc-900' : 'bg-gradient-to-r from-blue-400 via-indigo-300 to-white'}`}>Zero Trust IAM</span></span>
            <span className="block mt-1 sm:mt-2">& AI Risk Resilience.</span>
          </h1>
          <p className={`w-full max-w-4xl mx-auto text-sm sm:text-base lg:text-lg font-normal leading-relaxed px-1 sm:px-2 ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
            {PERSONAL_INFO.tagline}
          </p>
        </div>

        {/* Executive Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
          <a
            href="#projects"
            className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] ${
              isLight ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20' : 'bg-white text-black hover:bg-zinc-200 shadow-white/10'
            }`}
          >
            <span>Strategic Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#career"
            className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md transition-all ${
              isLight ? 'bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-200 shadow-sm' : 'bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/10 hover:border-white/25'
            }`}
          >
            <span>21 Years- Leadership</span>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </a>

          <button
            onClick={onOpenContact}
            className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md transition-all ${
              isLight ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200' : 'bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 border border-white/10'
            }`}
          >
            <span>Schedule Leadership Briefing</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="pt-3 sm:pt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 w-full max-w-4xl mx-auto px-2">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className={`p-2.5 sm:p-3 rounded-xl backdrop-blur-sm transition-all group border flex flex-col justify-center items-center text-center ${
                isLight ? 'bg-white/90 border-zinc-200 shadow-sm hover:border-zinc-300' : 'bg-white/[0.02] border-white/[0.07] hover:border-white/20'
              }`}
            >
              <div className={`text-base sm:text-lg lg:text-xl font-bold tracking-tight transition-colors truncate w-full ${isLight ? 'text-zinc-900 group-hover:text-blue-600' : 'text-white group-hover:text-blue-400'}`}>
                {stat.value}
              </div>
              <div className={`text-[10px] sm:text-[10.5px] font-medium mt-0.5 leading-snug ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Executive Governance Footprint Line */}
        <div className="pt-1 flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-[11px] font-medium text-zinc-500">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Audit Committee Reporting & Zero Trust Quantification
          </span>
          <span className="hidden md:inline text-zinc-300 dark:text-zinc-700">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
            Multi-Million Dollar CapEx / OpEx Defense Stewardship
          </span>
          <span className="hidden md:inline text-zinc-300 dark:text-zinc-700">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
            Global SecOps (SOC), IAM & GRC Team Orchestration
          </span>
        </div>
      </div>

      {/* 3. Static Executive Footer */}
      <div className={`pt-2 mt-1.5 border-t shrink-0 ${isLight ? 'border-zinc-200 text-zinc-600' : 'border-white/10 text-zinc-400'}`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5 text-xs py-0.5">
          <div className="flex flex-wrap items-center space-x-2 sm:space-x-2.5">
            <span className={`font-semibold ${isLight ? 'text-zinc-900' : 'text-white'}`}>{PERSONAL_INFO.name}</span>
            <span className="text-[10px] opacity-40">Executive Portfolio Vault</span>
            
            {/* Light Grey Separator */}
            <div className={`h-3 w-px ${isLight ? 'bg-zinc-300' : 'bg-white/20'}`} />

            {/* Social & Contact Icons */}
            <div className="flex items-center space-x-2 pl-0.5">
              <a 
                href={PERSONAL_INFO.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`hover:text-blue-500 transition-colors ${isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-zinc-400 hover:text-white'}`}
                title="GitHub Profile"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a 
                href={PERSONAL_INFO.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`hover:text-blue-500 transition-colors ${isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-zinc-400 hover:text-white'}`}
                title="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <button 
                onClick={onOpenContact} 
                className={`hover:text-blue-500 transition-colors ${isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-zinc-400 hover:text-white'}`}
                title="Get in Touch via Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

