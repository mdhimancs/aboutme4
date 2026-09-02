import React from 'react';
import { Terminal, Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#000000] border-t border-white/10 text-zinc-400 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2 text-white font-semibold">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="text-lg font-medium text-white tracking-tight">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              {PERSONAL_INFO.bioShort}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/[0.04] hover:bg-white/10 text-zinc-300 hover:text-white rounded-full border border-white/10 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/[0.04] hover:bg-white/10 text-zinc-300 hover:text-white rounded-full border border-white/10 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={PERSONAL_INFO.twitter} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/[0.04] hover:bg-white/10 text-zinc-300 hover:text-white rounded-full border border-white/10 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <button onClick={onOpenContact} className="p-2.5 bg-white/[0.04] hover:bg-white/10 text-zinc-300 hover:text-white rounded-full border border-white/10 transition-colors">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">Navigation</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#overview" className="hover:text-white transition-colors">Overview</a></li>
              <li><a href="#bio" className="hover:text-white transition-colors">Bio</a></li>
              <li><a href="#competencies" className="hover:text-white transition-colors">Competencies</a></li>
              <li><a href="#career" className="hover:text-white transition-colors">Career</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">Tech Blog</a></li>
              <li><a href="#archive" className="hover:text-white transition-colors">Archive</a></li>
            </ul>
          </div>

          {/* Legal / Location */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">Location & Status</div>
            <div className="text-sm space-y-1">
              <div>{PERSONAL_INFO.location}</div>
              <div className="flex items-center space-x-2 text-emerald-400 pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium">Available for Advisory</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
            <div className="space-y-1 text-center md:text-left">
              <div className="text-[11px] text-zinc-400 leading-relaxed max-w-2xl">
                The insights shared across this platform represent personal architectural reflections and intellectual exploration. Ideas presented are not necessarily my own; thoughts are personal and subject to change. Any resemblances to other works are purely coincidental or inspirational. Intellectual Property and credits belong to their respective original owners. No infringement is intended; this content is for informational purposes only. Brevities are human.
              </div>
            </div>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1.5 text-zinc-400 hover:text-white bg-white/[0.04] px-4 py-2 rounded-full border border-white/10 transition-colors flex-shrink-0"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
