import React from 'react';
import { Compass, BookOpen, Cpu, Globe, Music, Sparkles, Shield, Heart, Lightbulb } from 'lucide-react';

interface InterestsProps {
  theme?: string;
}

export const Interests: React.FC<InterestsProps> = ({ theme = 'apple-dark' }) => {
  const isLight = theme === 'apple-light';

  const interestCards = [
    {
      title: "Quantum & Theoretical Physics",
      category: "Science & Reality",
      description: "Fascinated by quantum entanglement, cosmology, and the fundamental mathematical symmetry governing the universe. Exploring how quantum mechanics will reshape cryptographic primitives.",
      icon: <Sparkles className="w-6 h-6 text-purple-500" />,
      highlights: ["Quantum Cryptography", "General Relativity", "Cosmological Architecture"]
    },
    {
      title: "Advanced Security Research",
      category: "Cybersecurity",
      description: "Deep-dive research into zero-day threat vectors, post-quantum cryptography, AI-driven autonomous defense systems, and Zero Trust identity federation protocols.",
      icon: <Shield className="w-6 h-6 text-blue-500" />,
      highlights: ["Post-Quantum Readiness", "AI Threat Intelligence", "Zero Trust Paradigms"]
    },
    {
      title: "Classical Literature & Stoicism",
      category: "Philosophy & Mind",
      description: "Studying Marcus Aurelius, Seneca, and ancient Greek philosophy as an operating system for clarity, emotional resilience, and disciplined execution in high-stakes environments.",
      icon: <BookOpen className="w-6 h-6 text-amber-500" />,
      highlights: ["Stoic Discipline", "Existential Inquiry", "Leadership Ethics"]
    },
    {
      title: "Classical & Ambient Soundscapes",
      category: "Music & Art",
      description: "Appreciating orchestral compositions, modal jazz, and ambient electronic soundscapes that provide deep focus and creative inspiration during complex architectural design sessions.",
      icon: <Music className="w-6 h-6 text-rose-500" />,
      highlights: ["Orchestral Masterpieces", "Ambient Synthesis", "Acoustic Resonance"]
    },
    {
      title: "Global Travel & Architecture",
      category: "Exploration",
      description: "Exploring architectural landmarks across the globe—from ancient monolithic structures to ultra-modern parametric skyscrapers—studying structural integrity and design elegance.",
      icon: <Globe className="w-6 h-6 text-emerald-500" />,
      highlights: ["Parametric Design", "Structural Engineering", "Cultural Heritage"]
    },
    {
      title: "Artificial Intelligence & Cognition",
      category: "Technology",
      description: "Investigating the boundaries of machine intelligence, neural network architectures, LLM security guardrails, and the convergence of human and artificial cognition.",
      icon: <Cpu className="w-6 h-6 text-indigo-500" />,
      highlights: ["Cognitive Science", "LLM Security", "Autonomous Agents"]
    }
  ];

  return (
    <div className={`h-full w-full flex flex-col px-4 sm:px-8 lg:px-16 py-12 sm:py-16 overflow-y-auto ${isLight ? 'bg-white text-zinc-900' : 'bg-[#000000] text-white'}`}>
      <div className="w-full max-w-6xl mx-auto flex flex-col flex-1 min-h-0">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-10 shrink-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20">
            <Compass className="w-3.5 h-3.5" />
            <span>Passions & Intellectual Pursuits</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
            Interests & Explorations
          </h2>
          <p className={`max-w-2xl mx-auto text-xs sm:text-sm ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
            Beyond enterprise security architecture—exploring the intersections of science, philosophy, technology, and art that shape a well-rounded perspective.
          </p>
        </div>

        {/* Grid of Interests */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {interestCards.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                isLight 
                  ? 'bg-zinc-50/80 border-zinc-200 hover:border-blue-500/50 hover:bg-white hover:shadow-sm' 
                  : 'bg-white/[0.02] border-white/10 hover:border-blue-500/50 hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl border ${isLight ? 'bg-white border-zinc-200 shadow-sm' : 'bg-white/5 border-white/10'}`}>
                  {item.icon}
                </div>
                <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border ${
                  isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-700' : 'bg-white/5 border-white/10 text-zinc-300'
                }`}>
                  {item.category}
                </span>
              </div>

              <h3 className={`text-lg font-bold tracking-tight mb-2 ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                {item.title}
              </h3>

              <p className={`text-xs sm:text-sm leading-relaxed mb-6 flex-1 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                {item.description}
              </p>

              <div className="space-y-2 pt-4 border-t border-zinc-200 dark:border-white/10">
                <span className={`text-[10px] font-semibold tracking-wider uppercase ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  Key Focus Areas
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.highlights.map((h, i) => (
                    <span
                      key={i}
                      className={`text-[11px] px-2.5 py-1 rounded-lg font-medium border ${
                        isLight 
                          ? 'bg-blue-50/80 border-blue-100 text-blue-700' 
                          : 'bg-blue-500/10 border-blue-500/20 text-blue-300'
                      }`}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
