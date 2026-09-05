import React, { useState } from 'react';
import { X, Palette, Layout, Type, Check, Sparkles } from 'lucide-react';

export type ThemeMode = 'apple-dark' | 'apple-light' | 'obsidian' | 'terminal';
export type AccentColor = 'blue' | 'emerald' | 'violet' | 'amber';
export type FontStyle = 'inter' | 'mono';

interface InterfaceOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  currentAccent: AccentColor;
  onAccentChange: (accent: AccentColor) => void;
  currentFont: FontStyle;
  onFontChange: (font: FontStyle) => void;
}

export const InterfaceOptionsModal: React.FC<InterfaceOptionsModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onThemeChange,
  currentAccent,
  onAccentChange,
  currentFont,
  onFontChange,
}) => {
  if (!isOpen) return null;

  const isLight = currentTheme === 'apple-light';

  const themes: { id: ThemeMode; name: string; desc: string; preview: string }[] = [
    { id: 'apple-light', name: 'Apple Studio Light', desc: 'Clean, high-contrast light mode with crisp typography', preview: 'bg-white border-zinc-300 text-zinc-900' },
    { id: 'apple-dark', name: 'Apple Midnight Dark', desc: 'Sleek frosted dark mode inspired by macOS Sequoia', preview: 'bg-[#000000] border-zinc-700 text-white' },
    { id: 'obsidian', name: 'Cyber Obsidian', desc: 'Deep violet gradient ambiance with glowing highlights', preview: 'bg-[#06030d] border-purple-500/40 text-purple-200' },
    { id: 'terminal', name: 'Hacker Terminal', desc: 'Monochrome matrix feel with high-contrast amber/green', preview: 'bg-black border-emerald-500/50 text-emerald-400' },
  ];

  const accents: { id: AccentColor; name: string; colorClass: string }[] = [
    { id: 'blue', name: 'Apple Blue', colorClass: 'bg-blue-500' },
    { id: 'emerald', name: 'Emerald Green', colorClass: 'bg-emerald-500' },
    { id: 'violet', name: 'Electric Violet', colorClass: 'bg-purple-500' },
    { id: 'amber', name: 'Solar Amber', colorClass: 'bg-amber-500' },
  ];

  const fonts: { id: FontStyle; name: string; desc: string }[] = [
    { id: 'inter', name: 'Inter (Sans-Serif)', desc: 'Modern, clean geometric proportions' },
    { id: 'mono', name: 'JetBrains (Monospace)', desc: 'Developer-first terminal aesthetic' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`relative w-full max-w-lg border rounded-2xl shadow-2xl overflow-hidden p-5 sm:p-6 space-y-4 transition-all ${
        isLight
          ? 'bg-[#f4f4f6] border-zinc-300 text-zinc-900'
          : 'bg-[#0a0a0c] border-white/10 text-white'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-blue-500/10 text-blue-500 rounded-lg">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className={`text-base sm:text-lg font-bold tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                Interface Customizer
              </h3>
              <p className={`text-[11px] ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                Tailor the portfolio appearance to your exact aesthetic preference.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-full transition-colors ${
              isLight ? 'text-zinc-600 hover:text-zinc-950 bg-zinc-200/80' : 'text-zinc-400 hover:text-white bg-white/5'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Themes */}
        <div className="space-y-2">
          <label className={`text-[11px] font-bold uppercase tracking-wider flex items-center space-x-1.5 ${
            isLight ? 'text-zinc-600' : 'text-zinc-400'
          }`}>
            <Layout className="w-3 h-3" />
            <span>Theme & Surface Mode</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {themes.map((t) => {
              const isSelected = currentTheme === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => onThemeChange(t.id)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? (isLight ? 'border-blue-600 bg-blue-50 shadow-xs' : 'border-blue-500 bg-blue-500/10 shadow-lg')
                      : (isLight ? 'border-zinc-200 bg-white hover:border-zinc-300' : 'border-white/10 bg-white/[0.02] hover:border-white/20')
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-xs font-semibold ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                      {t.name}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-500" />}
                  </div>
                  <p className={`text-[10.5px] leading-tight ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>{t.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Accent Colors */}
        <div className="space-y-2">
          <label className={`text-[11px] font-bold uppercase tracking-wider flex items-center space-x-1.5 ${
            isLight ? 'text-zinc-600' : 'text-zinc-400'
          }`}>
            <Sparkles className="w-3 h-3" />
            <span>Accent Color Palette</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {accents.map((acc) => {
              const isSelected = currentAccent === acc.id;
              return (
                <button
                  key={acc.id}
                  onClick={() => onAccentChange(acc.id)}
                  className={`p-2 rounded-lg border flex items-center space-x-1.5 transition-all ${
                    isSelected
                      ? (isLight ? 'border-zinc-800 bg-white shadow-xs' : 'border-white bg-white/10')
                      : (isLight ? 'border-zinc-200 bg-white hover:bg-zinc-100' : 'border-white/10 bg-white/[0.02] hover:bg-white/5')
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${acc.colorClass}`} />
                  <span className={`text-xs font-medium ${isLight ? 'text-zinc-900' : 'text-white'}`}>{acc.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Typography */}
        <div className="space-y-2">
          <label className={`text-[11px] font-bold uppercase tracking-wider flex items-center space-x-1.5 ${
            isLight ? 'text-zinc-600' : 'text-zinc-400'
          }`}>
            <Type className="w-3 h-3" />
            <span>Typography Mode</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {fonts.map((f) => {
              const isSelected = currentFont === f.id;
              return (
                <div
                  key={f.id}
                  onClick={() => onFontChange(f.id)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? (isLight ? 'border-blue-600 bg-blue-50' : 'border-blue-500 bg-blue-500/10')
                      : (isLight ? 'border-zinc-200 bg-white hover:border-zinc-300' : 'border-white/10 bg-white/[0.02] hover:border-white/20')
                  }`}
                >
                  <div className={`text-xs font-semibold ${isLight ? 'text-zinc-900' : 'text-white'}`}>{f.name}</div>
                  <div className={`text-[10.5px] mt-0.5 leading-tight ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>{f.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action */}
        <div className={`pt-2.5 border-t flex justify-end ${isLight ? 'border-zinc-200' : 'border-white/10'}`}>
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-md"
          >
            Apply Interface Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
