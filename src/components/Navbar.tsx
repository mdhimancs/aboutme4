import React, { useState } from 'react';
import { Menu, X, ArrowRight, Github, Linkedin, Mail, Sliders, Shield, Swords, Music, ChevronLeft, ChevronRight, Lock, Unlock, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { MusicPlayer } from './MusicPlayer';
import { UserTelemetry } from './UserTelemetry';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenContact: () => void;
  onOpenInterfaceOptions: () => void;
  activeSection: string;
  theme?: string;
  onNavigate?: (sectionId: string) => void;
  isSidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenContact, 
  onOpenInterfaceOptions, 
  activeSection, 
  theme = 'apple-light',
  onNavigate,
  isSidebarCollapsed = false,
  onToggleSidebar
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLight = theme === 'apple-light';
  const { user, isAuthorized, isAdmin, setGateModalOpen } = useAuth();

  const navLinks = [
    { id: 'overview', name: 'Overview', href: '#overview', num: '1' },
    { id: 'bio', name: 'Executive Bio', href: '#bio', num: '2' },
    { id: 'competencies', name: 'Competencies', href: '#competencies', num: '3' },
    { id: 'career', name: 'Career', href: '#career', num: '4' },
    { id: 'projects', name: 'Case Studies', href: '#projects', num: '5' },
    { id: 'blog', name: 'Publications', href: '#blog', num: '6' },
    { id: 'offkeyboard', name: 'Off Keyboard', href: '#offkeyboard', num: '7' },
    { id: 'philosophy', name: 'Philosophy', href: '#philosophy', num: '8' },
    { id: 'archive', name: 'Archives', href: '#archive', num: '9' },
  ];

  const handleLinkClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      {/* Desktop Left Sidebar */}
      <aside className={`hidden md:flex fixed top-0 left-0 bottom-0 z-50 flex-col py-6 lg:py-7 border-r backdrop-blur-2xl transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'w-[72px] px-2 items-center' : 'w-[270px] pl-8 pr-4'
      } ${
        isLight
          ? 'bg-white/90 border-zinc-200 text-zinc-900 shadow-sm'
          : 'bg-[#050507]/90 border-white/10 text-white shadow-2xl'
      }`}>
        {/* Top: Name & Collapse Button */}
        <div className="shrink-0 relative w-full">
          <div className={`flex items-center gap-1.5 w-full ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
            <a
              href="#overview"
              onClick={(e) => handleLinkClick(e, 'overview')}
              className={`flex items-center group cursor-pointer min-w-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 rounded-xl ${isSidebarCollapsed ? 'justify-center p-1' : 'space-x-2.5 flex-1'}`}
              title="Overview"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-400 via-indigo-400 to-blue-300 flex items-center justify-center text-white shadow-md shadow-blue-400/25 flex-shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform">
                {/* Thin, razor-sharp Crossed Swords / Spears behind Shield */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-90">
                  <Swords className="w-5 h-5 text-white transform scale-110" strokeWidth={1} />
                </div>
                {/* Bigger Security Shield in foreground */}
                <Shield className="w-4 h-4 text-white relative z-10 drop-shadow-sm fill-white/20" strokeWidth={2} />
              </div>
              {!isSidebarCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className={`text-[15px] font-sans font-bold tracking-tight block truncate ${isLight ? 'text-zinc-900 drop-shadow-[0_1px_6px_rgba(0,0,0,0.12)]' : 'text-white drop-shadow-[0_1px_8px_rgba(255,255,255,0.2)]'}`}>
                    {PERSONAL_INFO.name}
                  </span>
                  <span className="text-[10px] text-blue-500 font-semibold tracking-tight truncate leading-tight mt-0.5">
                    Cybersecurity & IAM • Data & AI
                  </span>
                </div>
              )}
            </a>
          </div>

          {/* Toggle Button on the Edge */}
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              title={isSidebarCollapsed ? "Expand sidebar (Ctrl+B)" : "Collapse sidebar (Ctrl+B)"}
              aria-label="Toggle sidebar"
              className={`absolute -right-3.5 top-[30vh] z-50 flex items-center justify-center w-7 h-7 rounded-full border shadow-sm transition-all duration-200 hover:scale-105 ${
                isLight
                  ? 'bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900'
                  : 'bg-[#18181b] border-zinc-700 text-zinc-400 hover:text-white'
              }`}
            >
              {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          )}

          {/* Slim Divider Line */}
          <div className={`h-px w-full mt-6 ${isLight ? 'bg-zinc-200' : 'bg-white/10'}`} />
        </div>

        {/* Center: Navigation Links & Social Icons vertically aligned to top */}
        <div className="flex-1 flex flex-col justify-start pt-6 pb-2 min-h-0 w-full overflow-y-auto">
          <nav className={`space-y-1.5 w-full ${isSidebarCollapsed ? 'flex flex-col items-center' : ''}`} aria-label="Main Navigation">
            {!isSidebarCollapsed && (
              <div className="text-[10px] font-semibold tracking-wider uppercase text-zinc-400 pl-4 pr-2.5 mb-2 flex items-center justify-between" aria-hidden="true">
                <span>Navigation</span>
              </div>
            )}
            <div className={`space-y-1 ${isSidebarCollapsed ? 'flex flex-col items-center w-full' : 'w-full'}`} role="menu">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    role="menuitem"
                    onClick={(e) => handleLinkClick(e, link.id)}
                    title={isSidebarCollapsed ? link.name : undefined}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        const next = document.querySelectorAll('[data-nav-link]')[index + 1] as HTMLElement;
                        if (next) next.focus();
                      } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        const prev = document.querySelectorAll('[data-nav-link]')[index - 1] as HTMLElement;
                        if (prev) prev.focus();
                      }
                    }}
                    data-nav-link
                    className={`flex items-center rounded-xl text-xs sm:text-[13px] font-medium transition-all duration-150 group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 ${
                      isSidebarCollapsed ? 'justify-center p-2 w-10' : 'justify-between pl-4 pr-2.5 py-1.5 w-full text-left'
                    } ${
                      isActive
                        ? isLight
                          ? 'bg-blue-50/90 text-blue-600 font-semibold shadow-xs'
                          : 'bg-white/10 text-white font-semibold shadow-xs'
                        : isLight
                          ? 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/90 focus-visible:bg-zinc-100/90'
                          : 'text-zinc-400 hover:text-white hover:bg-white/[0.06] focus-visible:bg-white/[0.06]'
                    }`}
                  >
                    {!isSidebarCollapsed ? (
                      <>
                        <span className="truncate">{link.name}</span>
                        {isActive && (
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] shrink-0 ml-1.5" aria-hidden="true" />
                        )}
                      </>
                    ) : (
                      <div className={`rounded-full transition-all duration-300 ${
                        isActive 
                          ? 'w-2 h-2 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]' 
                          : isLight ? 'w-1.5 h-1.5 bg-zinc-300 group-hover:bg-zinc-500' : 'w-1.5 h-1.5 bg-zinc-600 group-hover:bg-zinc-400'
                      }`} aria-hidden="true" />
                    )}
                  </a>
                );
              })}
            </div>
          </nav>

          {/* Social Links placed just below nav links */}
          <div className="mt-8 shrink-0 w-full">
            <div className={`flex flex-col space-y-1 w-full ${isSidebarCollapsed ? 'items-center' : ''}`} aria-label="Connect & Contact">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center rounded-xl text-xs font-medium transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 ${
                  isSidebarCollapsed ? 'justify-center p-2 w-10' : 'space-x-2.5 py-1.5 px-2.5 w-full'
                } ${
                  isLight ? 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/90 focus-visible:bg-zinc-100/90' : 'text-zinc-400 hover:text-white hover:bg-white/[0.06] focus-visible:bg-white/[0.06]'
                }`}
                title="GitHub Profile"
                aria-label="Visit GitHub Profile"
              >
                <Github className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                {!isSidebarCollapsed && <span>GitHub</span>}
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center rounded-xl text-xs font-medium transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 ${
                  isSidebarCollapsed ? 'justify-center p-2 w-10' : 'space-x-2.5 py-1.5 px-2.5 w-full'
                } ${
                  isLight ? 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/90 focus-visible:bg-zinc-100/90' : 'text-zinc-400 hover:text-white hover:bg-white/[0.06] focus-visible:bg-white/[0.06]'
                }`}
                title="LinkedIn Profile"
                aria-label="Visit LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4 text-blue-500 flex-shrink-0" aria-hidden="true" />
                {!isSidebarCollapsed && <span>LinkedIn</span>}
              </a>
              <button
                onClick={onOpenContact}
                className={`flex items-center rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 ${
                  isSidebarCollapsed ? 'justify-center p-2 w-10' : 'space-x-2.5 py-1.5 px-2.5 w-full text-left'
                } ${
                  isLight ? 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/90 focus-visible:bg-zinc-100/90' : 'text-zinc-400 hover:text-white hover:bg-white/[0.06] focus-visible:bg-white/[0.06]'
                }`}
                title="Get in Touch via Email"
                aria-label="Open contact form"
              >
                <Mail className="w-4 h-4 text-red-500 flex-shrink-0" aria-hidden="true" />
                {!isSidebarCollapsed && <span>Get in Touch</span>}
              </button>
              <button
                onClick={() => setGateModalOpen(true)}
                className={`flex items-center rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 ${
                  isSidebarCollapsed ? 'justify-center p-2 w-10' : 'space-x-2.5 py-1.5 px-2.5 w-full text-left'
                } ${
                  user && isAuthorized
                    ? (isLight ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100/80' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/15')
                    : (isLight ? 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/90 focus-visible:bg-zinc-100/90' : 'text-zinc-400 hover:text-white hover:bg-white/[0.06] focus-visible:bg-white/[0.06]')
                }`}
                title="Identity Clearance Portal"
                aria-label="Clearance Portal"
              >
                {user && isAuthorized ? (
                  <Unlock className="w-4 h-4 text-emerald-500 flex-shrink-0" aria-hidden="true" />
                ) : (
                  <Lock className="w-4 h-4 text-emerald-500 flex-shrink-0" aria-hidden="true" />
                )}
                {!isSidebarCollapsed && (
                  <span>{user && isAuthorized ? 'Clearance Verified' : 'Request Access'}</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom: Copyright & Status */}
        <div className="mt-auto shrink-0 space-y-2 pt-2 w-full">
          {!isSidebarCollapsed && (
            <>
              <div className={`h-px w-full ${isLight ? 'bg-zinc-200' : 'bg-white/10'}`} aria-hidden="true" />
              
              <div className="flex flex-col space-y-0.5 px-4 pb-1">
                <div className={`text-[10px] font-medium leading-normal ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  <span className="font-bold text-blue-500">{PERSONAL_INFO.name}</span> • © 2011 - 2026
                </div>
                <div className={`text-[9.5px] font-semibold flex items-center gap-1 leading-normal ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  <Shield className="w-2.5 h-2.5" aria-hidden="true" />
                  <span className="truncate">Registered Security Architect™</span>
                </div>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* Desktop Top Right Floating Bar */}
      <div className={`hidden md:flex fixed top-4 right-6 z-50 items-center gap-1.5 px-2 py-1 rounded-full border shadow-sm backdrop-blur-md transition-all ${
        isLight
          ? 'bg-[#f4f4f6]/95 border-zinc-300/90 text-zinc-800 shadow-xs'
          : 'bg-[#18181b]/95 border-zinc-700/80 text-zinc-200 shadow-md'
      }`}>
        {/* Theme Options */}
        <button
          onClick={onOpenInterfaceOptions}
          className={`flex items-center space-x-1 transition-colors px-1.5 py-0.5 rounded-full ${
            isLight 
              ? 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/70' 
              : 'text-zinc-300 hover:text-white hover:bg-white/10'
          }`}
          title="Theme & Interface Options"
        >
          <Sliders className="w-3 h-3 text-blue-500" />
          <span className="text-[9.5px] font-bold tracking-tight">Themes</span>
        </button>
        <div className={`w-[1px] h-3 ${isLight ? 'bg-zinc-300' : 'bg-white/20'}`} />
        <MusicPlayer theme={theme} />
        <div className={`w-[1px] h-3 ${isLight ? 'bg-zinc-300' : 'bg-white/20'}`} />
        <UserTelemetry theme={theme} />
        <div className={`w-[1px] h-3 ${isLight ? 'bg-zinc-300' : 'bg-white/20'}`} />
        <button
          onClick={() => setGateModalOpen(true)}
          className={`flex items-center space-x-1 transition-colors px-2 py-0.5 rounded-full cursor-pointer ${
            user && isAuthorized
              ? (isLight ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200' : 'bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 border border-emerald-500/30')
              : (isLight ? 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/70' : 'text-zinc-300 hover:text-white hover:bg-white/10')
          }`}
          title={user ? `Firebase Identity: ${user.email}` : "Firebase Authentication & Clearance"}
        >
          {user && isAuthorized ? (
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
          ) : (
            <Lock className="w-3 h-3 text-amber-500" />
          )}
          <span className="text-[9.5px] font-bold tracking-tight">
            {user ? (isAdmin ? 'Admin' : 'Verified') : 'Sign In'}
          </span>
        </button>
      </div>


      {/* Mobile Top Header */}
      <header className={`md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 backdrop-blur-xl border-b transition-all ${
        isLight ? 'bg-white/90 border-zinc-200 text-zinc-900' : 'bg-[#000000]/90 border-white/10 text-white'
      }`}>
        <a 
          href="#overview" 
          onClick={(e) => handleLinkClick(e, 'overview')}
          className="flex items-center space-x-2.5 pl-2"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-400 via-indigo-400 to-blue-300 flex items-center justify-center text-white shadow-md shadow-blue-400/25 flex-shrink-0 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-90">
              <Swords className="w-5 h-5 text-white transform scale-110" strokeWidth={1} />
            </div>
            <Shield className="w-4 h-4 text-white relative z-10 drop-shadow-sm fill-white/20" strokeWidth={2} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className={`font-semibold text-xs sm:text-sm truncate ${isLight ? 'drop-shadow-[0_1px_5px_rgba(0,0,0,0.1)]' : 'drop-shadow-[0_1px_6px_rgba(255,255,255,0.2)]'}`}>{PERSONAL_INFO.name}</span>
            <span className="text-[9px] text-blue-500 font-semibold tracking-tight truncate">Cybersecurity & IAM • Data & AI</span>
          </div>
        </a>

        <div className="flex items-center space-x-1.5">
          <button
            onClick={onOpenInterfaceOptions}
            className={`p-1.5 rounded-lg border transition-colors ${
              isLight 
                ? 'bg-[#f4f4f6] border-zinc-300 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/70' 
                : 'bg-[#18181b] border-zinc-700 text-zinc-300 hover:text-white'
            }`}
            title="Themes"
          >
            <Sliders className="w-3.5 h-3.5 text-blue-500" />
          </button>
          <div className={`p-0.5 rounded-lg border ${
            isLight ? 'bg-[#f4f4f6] border-zinc-300' : 'bg-[#18181b] border-zinc-700'
          }`}>
            <MusicPlayer theme={theme} isMobile={true} />
          </div>
          <UserTelemetry theme={theme} isMobile={true} />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-1.5 rounded-full border ${isLight ? 'bg-[#f4f4f6] border-zinc-300 text-zinc-700 hover:bg-zinc-200/70' : 'bg-white/5 border-white/10 text-zinc-300'}`}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden fixed inset-0 z-40 pt-16 px-6 backdrop-blur-2xl space-y-4 animate-in fade-in duration-200 ${
          isLight ? 'bg-white/95 text-zinc-900' : 'bg-[#0a0a0c]/95 text-white'
        }`}>
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleLinkClick(e, link.id);
                }}
                className={`flex items-center justify-between px-4 py-2 rounded-xl text-[17px] font-medium ${
                  activeSection === link.id
                    ? (isLight ? 'bg-blue-50 text-blue-600 font-semibold' : 'bg-white/10 text-white font-semibold')
                    : (isLight ? 'hover:bg-zinc-100 text-zinc-800' : 'hover:bg-white/5 text-zinc-200')
                }`}
              >
                <span>{link.name}</span>
                {activeSection === link.id && (
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                )}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-zinc-200 dark:border-white/10 space-y-3">
            
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setGateModalOpen(true);
              }}
              className={`w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-semibold cursor-pointer shadow-lg transition-all ${
                user && isAuthorized
                  ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                  : 'bg-zinc-800 text-white hover:bg-zinc-700 shadow-zinc-800/10'
              }`}
            >
              {user && isAuthorized ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              <span>{user && isAuthorized ? 'Clearance Verified' : 'Request Access'}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2.5 rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/30 cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
