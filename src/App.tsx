/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExecutiveBio } from './components/ExecutiveBio';
import { CoreCompetencies } from './components/CoreCompetencies';
import { CareerJourney } from './components/CareerJourney';
import { TechnicalBlog } from './components/TechnicalBlog';
import { OffKeyboard } from './components/OffKeyboard';
import { Archive } from './components/Archive';
import { Projects } from './components/Projects';
import { Philosophy } from './components/Philosophy';
import { ContactModal } from './components/ContactModal';
import { GateModal } from './components/GateModal';
import { InterfaceOptionsModal, ThemeMode, AccentColor, FontStyle } from './components/InterfaceOptionsModal';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

const SECTIONS = ['overview', 'bio', 'competencies', 'career', 'projects', 'blog', 'offkeyboard', 'philosophy', 'archive'] as const;
type SectionId = typeof SECTIONS[number];

const SECTION_LABELS: Record<SectionId, string> = {
  overview: 'Overview',
  bio: 'Executive Bio',
  competencies: 'Competencies',
  career: 'Career',
  projects: 'Case Studies',
  blog: 'Publications',
  offkeyboard: 'Off Keyboard',
  philosophy: 'Philosophy',
  archive: 'Archives & Patents'
};

interface SnapSectionProps {
  id: SectionId;
  children: React.ReactNode;
}

const SnapSection: React.FC<SnapSectionProps> = ({ id, children }) => {
  return (
    <div id={id} className="snap-section w-full">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [interfaceModalOpen, setInterfaceModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('overview');

  const [theme, setTheme] = useState<ThemeMode>('apple-light');
  const [accent, setAccent] = useState<AccentColor>('blue');
  const [font, setFont] = useState<FontStyle>('inter');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('executive_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarCollapsed(prev => {
      const next = !prev;
      try {
        localStorage.setItem('executive_sidebar_collapsed', String(next));
      } catch {}
      return next;
    });
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);

  const activeIndex = Math.max(0, SECTIONS.indexOf(activeSection));

  // Navigate to target section smoothly
  const navigateToSection = useCallback((sectionId: SectionId) => {
    const el = document.getElementById(sectionId);
    if (el && containerRef.current) {
      isTransitioningRef.current = true;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 700);
    }
  }, []);

  const navigateToIndex = useCallback((index: number) => {
    if (index >= 0 && index < SECTIONS.length) {
      navigateToSection(SECTIONS[index]);
    }
  }, [navigateToSection]);

  const handleNextPage = useCallback(() => {
    if (activeIndex < SECTIONS.length - 1) {
      navigateToIndex(activeIndex + 1);
    }
  }, [activeIndex, navigateToIndex]);

  const handlePrevPage = useCallback(() => {
    if (activeIndex > 0) {
      navigateToIndex(activeIndex - 1);
    }
  }, [activeIndex, navigateToIndex]);

  // Sync active section based on scroll position in scroll container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isTransitioningRef.current) return;
      const scrollPosition = container.scrollTop + container.clientHeight / 2;

      for (const section of SECTIONS) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Wheel interception for discrete page-down / page-up navigation stops
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Use a ref to store the last scroll time to prevent rapid-fire switching
    let lastScrollTime = 0;
    const SCROLL_COOLDOWN = 600; // ms

    const handleWheel = (e: WheelEvent) => {
      // Don't intercept if modifier keys are pressed or modals are open
      if (e.ctrlKey || e.metaKey || e.altKey || contactOpen || interfaceModalOpen) return;

      const now = Date.now();
      if (now - lastScrollTime < SCROLL_COOLDOWN) {
        if (isTransitioningRef.current) e.preventDefault();
        return;
      }

      // Check if event originated inside a scrollable sub-element or an interactive control
      const target = e.target as HTMLElement | null;
      if (target?.tagName === 'INPUT' || target?.tagName === 'SELECT' || target?.closest('.no-scroll-hijack')) {
        return;
      }

      const scrollableChild = target?.closest('.overflow-y-auto, .overflow-auto') as HTMLElement | null;

      if (scrollableChild) {
        const { scrollTop, scrollHeight, clientHeight } = scrollableChild;
        const isScrollingDown = e.deltaY > 0;
        const isScrollingUp = e.deltaY < 0;

        // If inner element can scroll further in that direction, let it scroll naturally
        if (isScrollingDown && scrollTop + clientHeight < scrollHeight - 5) {
          return;
        }
        if (isScrollingUp && scrollTop > 5) {
          return;
        }
      }

      // If already animating, prevent standard jump
      if (isTransitioningRef.current) {
        e.preventDefault();
        return;
      }

      // Threshold check for wheel intensity - lowered to 15 for better sensitivity
      if (Math.abs(e.deltaY) > 15) {
        e.preventDefault();
        lastScrollTime = now;
        if (e.deltaY > 0) {
          handleNextPage();
        } else {
          handlePrevPage();
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    // Also listen on the document to capture scroll events even when mouse is over sidebar or other non-container areas
    document.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
      document.removeEventListener('wheel', handleWheel);
    };
  }, [handleNextPage, handlePrevPage]);

  // Keyboard navigation for page-down / page-up / arrow keys / space
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea, or if modals are open
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.isContentEditable ||
        contactOpen ||
        interfaceModalOpen
      ) {
        return;
      }

      if (e.key === 'PageDown' || e.key === 'ArrowDown' || (e.key === ' ' && !e.shiftKey)) {
        // Special check: if Alt is held, allow browser default behaviors if any
        if (e.altKey) return;
        
        e.preventDefault();
        handleNextPage();
      } else if (e.key === 'PageUp' || e.key === 'ArrowUp' || (e.key === ' ' && e.shiftKey)) {
        if (e.altKey) return;
        
        e.preventDefault();
        handlePrevPage();
      } else if (e.key === 'Home') {
        e.preventDefault();
        navigateToIndex(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        navigateToIndex(SECTIONS.length - 1);
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'b' || e.key === 'B')) {
        e.preventDefault();
        handleToggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextPage, handlePrevPage, navigateToIndex, handleToggleSidebar]);

  // Security: Content protection (anti-copy, anti-save, anti-drag, context menu suppression)
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === 'INPUT' || 
        target?.tagName === 'TEXTAREA' || 
        target?.isContentEditable ||
        target?.closest('.allow-context-menu')
      ) {
        return;
      }
      e.preventDefault();
    };

    // Prevent unauthorized copying/cutting of DOM text
    const handleCopy = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === 'INPUT' || 
        target?.tagName === 'TEXTAREA' || 
        target?.isContentEditable ||
        target?.closest('.allow-copy')
      ) {
        return;
      }
      e.preventDefault();
    };

    const handleCut = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === 'INPUT' || 
        target?.tagName === 'TEXTAREA' || 
        target?.isContentEditable
      ) {
        return;
      }
      e.preventDefault();
    };

    // Prevent dragging images, links, or text out of the window
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('.allow-drag')) {
        return;
      }
      e.preventDefault();
    };

    // Intercept Save (Ctrl+S / Cmd+S) and View Source (Ctrl+U / Cmd+U) shortcuts
    const handleSaveShortcuts = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S' || e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCut);
    document.addEventListener('dragstart', handleDragStart);
    window.addEventListener('keydown', handleSaveShortcuts);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCut);
      document.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('keydown', handleSaveShortcuts);
    };
  }, []);

  // Touch swipe support for mobile stops
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartYRef.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartYRef.current - touchEndY;

    // Check if swipe distance is significant (> 45px)
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handleNextPage();
      } else {
        handlePrevPage();
      }
    }
    touchStartYRef.current = null;
  };

  // Compute theme background & text styles
  const getThemeClass = () => {
    switch (theme) {
      case 'apple-light':
        return 'bg-[#fcfcfd] text-black';
      case 'obsidian':
        return 'bg-[#06030d] text-[#e2d9fc]';
      case 'terminal':
        return 'bg-black text-[#00ff66] font-mono';
      case 'apple-dark':
      default:
        return 'bg-[#000000] text-[#f5f5f7]';
    }
  };

  const isLight = theme === 'apple-light';

  return (
    <div className={`h-screen w-screen overflow-hidden transition-colors duration-500 theme-${theme} ${getThemeClass()} ${font === 'mono' ? 'font-mono' : 'font-sans'}`}>
      <Navbar
        onOpenContact={() => setContactOpen(true)}
        onOpenInterfaceOptions={() => setInterfaceModalOpen(true)}
        activeSection={activeSection}
        theme={theme}
        onNavigate={(id) => navigateToSection(id as SectionId)}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={handleToggleSidebar}
      />
      
      {/* Main Snap Scroll Container */}
      <div 
        ref={containerRef}
        id="main-scroll-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`${
          isSidebarCollapsed ? 'md:ml-[72px]' : 'md:ml-[270px]'
        } h-screen overflow-y-auto scroll-container select-text transition-[margin] duration-300 ease-in-out`}
      >
        <main className="w-full">
          {/* Stop 1: Overview */}
          <SnapSection id="overview">
            <Hero 
              onOpenContact={() => setContactOpen(true)} 
              onExploreBlog={() => navigateToSection('blog')} 
              theme={theme} 
            />
          </SnapSection>

          {/* Stop 2: Executive Bio */}
          <SnapSection id="bio">
            <ExecutiveBio 
              theme={theme} 
              onNextPage={handleNextPage}
            />
          </SnapSection>

          {/* Stop 3: Core Technical Competencies */}
          <SnapSection id="competencies">
            <CoreCompetencies 
              theme={theme} 
            />
          </SnapSection>

          {/* Stop 4: Career Journey */}
          <SnapSection id="career">
            <CareerJourney 
              theme={theme} 
            />
          </SnapSection>

          {/* Stop 5: Case Studies (Projects) */}
          <SnapSection id="projects">
            <Projects 
              theme={theme} 
            />
          </SnapSection>
          
          {/* Stop 6: Technical Blog */}
          <SnapSection id="blog">
            <TechnicalBlog 
              theme={theme} 
            />
          </SnapSection>

          {/* Stop 7: Off Keyboard */}
          <SnapSection id="offkeyboard">
            <OffKeyboard 
              theme={theme} 
            />
          </SnapSection>

          {/* Stop 8: Philosophy */}
          <SnapSection id="philosophy">
            <Philosophy 
              theme={theme} 
            />
          </SnapSection>
          
          {/* Stop 9: Archives & Patents + Integrated Footer */}
          <SnapSection id="archive">
            <Archive 
              theme={theme} 
              onOpenContact={() => setContactOpen(true)}
              onScrollToTop={() => navigateToIndex(0)}
            />
          </SnapSection>
        </main>
      </div>

      {/* Floating Page Stop Navigation Controller & Indicator */}
      <div className="fixed bottom-3 sm:bottom-3.5 right-3.5 sm:right-4 z-40 flex items-center">
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-xl border shadow-xl transition-all ${
          isLight ? 'bg-white/90 border-zinc-200 text-zinc-900 shadow-zinc-200/50' : 'bg-zinc-950/80 border-white/15 text-white shadow-black/80'
        }`}>
          {/* Stop Dots */}
          <div className="hidden sm:flex items-center gap-1 px-0.5">
            {SECTIONS.map((sec, idx) => (
              <button
                key={sec}
                onClick={() => navigateToIndex(idx)}
                title={`Jump to ${SECTION_LABELS[sec]}`}
                className={`transition-all rounded-full ${
                  activeSection === sec
                    ? 'w-3.5 h-1.5 bg-blue-500'
                    : `w-1.5 h-1.5 ${isLight ? 'bg-zinc-300 hover:bg-zinc-500' : 'bg-white/25 hover:bg-white/50'}`
                }`}
              />
            ))}
          </div>

          <div className={`hidden sm:block h-3 w-[1px] ${isLight ? 'bg-zinc-200' : 'bg-white/15'}`} />

          {/* Current Stop Number */}
          <div className="flex items-center gap-1 text-xs font-semibold px-0.5">
            <span className="font-mono text-blue-500 tabular-nums">{activeIndex + 1}</span>
            <span className="text-[10px] opacity-40">/</span>
            <span className="text-[10px] opacity-60 font-mono">{SECTIONS.length}</span>
          </div>

          {/* Page Up / Page Down Action Buttons */}
          <div className="flex items-center gap-0.5 pl-0.5">
            <button
              onClick={handlePrevPage}
              disabled={activeIndex === 0}
              title="Page Up / Previous Stop (↑ or PgUp)"
              className={`p-0.5 rounded-full border transition-all ${
                activeIndex === 0
                  ? 'opacity-30 cursor-not-allowed border-transparent'
                  : (isLight ? 'hover:bg-zinc-100 border-zinc-200 active:scale-95' : 'hover:bg-white/10 border-white/10 active:scale-95')
              }`}
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNextPage}
              disabled={activeIndex === SECTIONS.length - 1}
              title="Page Down / Next Stop (↓ or PgDn)"
              className={`p-0.5 rounded-full border transition-all ${
                activeIndex === SECTIONS.length - 1
                  ? 'opacity-30 cursor-not-allowed border-transparent'
                  : (isLight ? 'hover:bg-zinc-100 border-zinc-200 active:scale-95' : 'hover:bg-white/10 border-white/10 active:scale-95')
              }`}
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <ContactModal theme={theme} isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <GateModal />
      <InterfaceOptionsModal
        isOpen={interfaceModalOpen}
        onClose={() => setInterfaceModalOpen(false)}
        currentTheme={theme}
        onThemeChange={setTheme}
        currentAccent={accent}
        onAccentChange={setAccent}
        currentFont={font}
        onFontChange={setFont}
      />
    </div>
  );
}
