import React from 'react';
import { BookOpen, Heart, Users, Sparkles, Shield, Quote } from 'lucide-react';

interface PhilosophyProps {
  theme?: string;
}

export const Philosophy: React.FC<PhilosophyProps> = ({ theme = 'apple-dark' }) => {
  const isLight = theme === 'apple-light' || theme === 'light';

  return (
    <section 
      id="philosophy" 
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

      <div className="relative w-full max-w-5xl mx-auto flex flex-col flex-1 min-h-0 justify-center space-y-4">
        
        {/* Header */}
        <div className="relative text-center space-y-1.5 shrink-0">
          {/* Luminous aura behind heading */}
          <div 
            className={`absolute -top-3 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-24 sm:h-28 rounded-full blur-2xl pointer-events-none transition-all ${
              isLight 
                ? 'bg-gradient-to-r from-blue-400/25 via-sky-300/20 to-indigo-300/20 opacity-80' 
                : 'bg-gradient-to-r from-blue-500/30 via-cyan-400/20 to-indigo-500/25 opacity-90'
            }`} 
          />

          <div className={`relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20 backdrop-blur-md ${
            isLight ? 'shadow-sm' : 'shadow-[0_0_12px_rgba(59,130,246,0.15)]'
          }`}>
            <Heart className="w-3.5 h-3.5 text-blue-500" />
            <span>Leadership Heritage & Gratitude</span>
          </div>
          <h2 className={`relative text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight transition-all ${
            isLight 
              ? 'text-zinc-900 drop-shadow-[0_2px_16px_rgba(59,130,246,0.22)]' 
              : 'text-white drop-shadow-[0_0_24px_rgba(96,165,250,0.40)]'
          }`}>
            Philosophy & Gratitude
          </h2>
          <p className={`relative max-w-3xl mx-auto text-xs sm:text-sm ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
            An executive journey grounded in intellectual humility, relentless curiosity, and profound gratitude to five generations of mentors, colleagues, and family.
          </p>
        </div>

        {/* Buddha Quote Banner */}
        <div className={`p-3.5 rounded-2xl border flex items-center gap-3 shrink-0 ${
          isLight ? 'bg-blue-50/70 border-blue-200 text-zinc-900' : 'bg-white/[0.03] border-white/10 text-zinc-100'
        }`}>
          <Quote className="w-5 h-5 text-blue-500 shrink-0 opacity-80" />
          <p className="text-xs sm:text-sm italic font-serif leading-relaxed">
            "Self-discovery through selfless pursuit of knowledge is the way to illumination." — <span className="font-semibold not-italic">Buddha</span>
          </p>
        </div>

        {/* 3 Refined Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 shrink-0">
          {/* Pillar 1 */}
          <div className={`p-3.5 rounded-2xl border flex flex-col justify-between ${
            isLight ? 'bg-white border-zinc-200 shadow-xs' : 'bg-white/[0.02] border-white/10'
          }`}>
            <div>
              <div className="flex items-center space-x-2 mb-1.5 text-blue-500">
                <div className="p-1.5 rounded-lg bg-blue-500/10">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className={`text-[11.5px] sm:text-[12.5px] font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                  Intellectual Foundation
                </h3>
              </div>
              <p className={`text-[11px] leading-relaxed font-serif italic ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                True wisdom lies in acknowledging our knowledge is but a drop in an infinite ocean. Inspired by Stoic equanimity and existential inquiry, growth thrives at the intersection of disciplined action and radical curiosity.
              </p>
            </div>
            <div className={`text-[10px] font-mono mt-2 pt-2 border-t ${isLight ? 'text-zinc-400 border-zinc-100' : 'text-zinc-500 border-white/5'}`}>
              Stoicism • Intellectual Humility
            </div>
          </div>
 
          {/* Pillar 2 */}
          <div className={`p-3.5 rounded-2xl border flex flex-col justify-between ${
            isLight ? 'bg-white border-zinc-200 shadow-xs' : 'bg-white/[0.02] border-white/10'
          }`}>
            <div>
              <div className="flex items-center space-x-2 mb-1.5 text-blue-500">
                <div className="p-1.5 rounded-lg bg-blue-500/10">
                  <Heart className="w-4 h-4" />
                </div>
                <h3 className={`text-[11.5px] sm:text-[12.5px] font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                  Five Generations
                </h3>
              </div>
              <p className={`text-[11px] leading-relaxed font-serif italic ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                Deepest gratitude to near and extended family—elders, young ones, and contemporaries spanning 5 overlapping generations for their enduring foundation, love, and companionship through all tides.
              </p>
            </div>
            <div className={`text-[10px] font-mono mt-2 pt-2 border-t ${isLight ? 'text-zinc-400 border-zinc-100' : 'text-zinc-500 border-white/5'}`}>
              Heritage • Unwavering Foundation
            </div>
          </div>
 
          {/* Pillar 3 */}
          <div className={`p-3.5 rounded-2xl border flex flex-col justify-between ${
            isLight ? 'bg-white border-zinc-200 shadow-xs' : 'bg-white/[0.02] border-white/10'
          }`}>
            <div>
              <div className="flex items-center space-x-2 mb-1.5 text-emerald-500">
                <div className="p-1.5 rounded-lg bg-emerald-500/10">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className={`text-[11.5px] sm:text-[12.5px] font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                  Mentors & Community
                </h3>
              </div>
              <p className={`text-[11px] leading-relaxed font-serif italic ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                Enduring appreciation to academic guides, institutional leaders at Goldman Sachs, and the global cybersecurity open-source research community whose collective brilliance illuminates the defense craft.
              </p>
            </div>
            <div className={`text-[10px] font-mono mt-3 pt-2 border-t ${isLight ? 'text-zinc-400 border-zinc-100' : 'text-zinc-500 border-white/5'}`}>
              Mentorship • Open Source Research
            </div>
          </div>
        </div>
 
        {/* Sign-off & Disclaimer */}
        <div className="space-y-3 pt-1 shrink-0">
          <div className="text-center space-y-0.5">
            <p className={`font-serif italic text-base sm:text-lg ${isLight ? 'text-zinc-900' : 'text-white'}`}>
              À la prochaine, Prenez soin de vous ... Au revoir !
            </p>
            <p className={`text-[11px] italic ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
              (Until next time, take care of yourself ... Goodbye!)
            </p>
          </div>
 
          <div className={`p-3 rounded-xl border ${isLight ? 'bg-zinc-100/70 border-zinc-200' : 'bg-white/[0.02] border-white/5'}`}>
            <h4 className={`text-[11px] font-semibold mb-0.5 ${isLight ? 'text-zinc-900' : 'text-zinc-200'}`}>Disclaimer</h4>
            <p className={`text-[9.5px] leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
              The insights shared across this platform represent personal architectural reflections and intellectual exploration. Ideas presented are not necessarily my own; thoughts are personal and subject to change. Any resemblances to other works are purely coincidental or inspirational. Intellectual Property and credits belong to their respective original owners. No infringement is intended; this content is for informational purposes only. Brevities are human.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

