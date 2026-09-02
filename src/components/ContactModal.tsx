import React, { useState } from 'react';
import { X, Send, CheckCircle2, Mail, MapPin, Linkedin, Github, Twitter, Copy, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

import { ThemeMode } from './InterfaceOptionsModal';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: ThemeMode;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, theme = 'apple-dark' }) => {
  const isLight = theme === 'apple-light';
  const isTerminal = theme === 'terminal';
  const isObsidian = theme === 'obsidian';
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cc, setCc] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Honeypot triggered
    if (!name || !email || !message) return;

    setIsSending(true);
    setError(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          cc,
          subject,
          message
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setName('');
        setEmail('');
        setCc('');
        setSubject('');
        setMessage('');
        onClose();
      }, 3500);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-200 ${isTerminal ? 'font-mono' : ''}`}>
      <div className={`relative w-full max-w-lg border rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 transition-colors duration-500 ${
        isLight 
          ? 'bg-white border-zinc-200 text-zinc-900' 
          : isObsidian
            ? 'bg-[#06030d] border-indigo-500/20 text-[#e2d9fc]'
            : isTerminal
              ? 'bg-black border-[#00ff66]/30 text-[#00ff66]'
              : 'bg-[#0a0a0c] border-white/10 text-white'
      }`}>
        <button
          onClick={onClose}
          className={`absolute top-6 right-6 p-2 rounded-full transition-colors ${
            isLight 
              ? 'text-zinc-400 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200' 
              : isTerminal
                ? 'text-[#00ff66]/60 hover:text-[#00ff66] bg-[#00ff66]/5 hover:bg-[#00ff66]/10'
                : 'text-zinc-400 hover:text-white bg-white/5'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-12 space-y-4 animate-in zoom-in-95 duration-300">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto border ${
              isTerminal 
                ? 'bg-[#00ff66]/10 border-[#00ff66]/30 text-[#00ff66]' 
                : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
            }`}>
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className={`text-2xl font-bold tracking-tight ${isLight ? 'text-zinc-900' : isTerminal ? 'text-[#00ff66]' : 'text-white'}`}>
              Message Sent Successfully
            </h3>
            <p className={`text-sm max-w-xs mx-auto ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
              Thank you for reaching out. {PERSONAL_INFO.name} will review your message and get back to you shortly.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className={`text-xs font-semibold uppercase tracking-widest ${isTerminal ? 'text-[#00ff66]' : 'text-blue-400'}`}>
                Get in Touch
              </span>
              <h3 className={`text-2xl font-extrabold tracking-tight ${isLight ? 'text-zinc-900' : isTerminal ? 'text-[#00ff66]' : 'text-white'}`}>
                Initiate Collaboration
              </h3>
              <p className={`text-xs sm:text-sm ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                Available for architecture advisory, staff engineering roles, and technical speaking engagements.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="honeypot"
                className="hidden"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
              />
              <div>
                <label className={`block text-xs font-medium mb-1.5 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Connor"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full border rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none ${
                    isLight 
                      ? 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-blue-500' 
                      : isTerminal
                        ? 'bg-black border-[#00ff66]/20 text-[#00ff66] placeholder-[#00ff66]/30 focus:border-[#00ff66]'
                        : 'bg-white/[0.03] border-white/10 text-white placeholder-zinc-600 focus:border-blue-500'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. munish.world@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full border rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none ${
                      isLight 
                        ? 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-blue-500' 
                        : isTerminal
                          ? 'bg-black border-[#00ff66]/20 text-[#00ff66] placeholder-[#00ff66]/30 focus:border-[#00ff66]'
                          : 'bg-white/[0.03] border-white/10 text-white placeholder-zinc-600 focus:border-blue-500'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>CC</label>
                  <input
                    type="email"
                    placeholder="Optional"
                    value={cc}
                    onChange={(e) => setCc(e.target.value)}
                    className={`w-full border rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none ${
                      isLight 
                        ? 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-blue-500' 
                        : isTerminal
                          ? 'bg-black border-[#00ff66]/20 text-[#00ff66] placeholder-[#00ff66]/30 focus:border-[#00ff66]'
                          : 'bg-white/[0.03] border-white/10 text-white placeholder-zinc-600 focus:border-blue-500'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1.5 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Strategic Advisory Inquiry"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={`w-full border rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none ${
                    isLight 
                      ? 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-blue-500' 
                      : isTerminal
                        ? 'bg-black border-[#00ff66]/20 text-[#00ff66] placeholder-[#00ff66]/30 focus:border-[#00ff66]'
                        : 'bg-white/[0.03] border-white/10 text-white placeholder-zinc-600 focus:border-blue-500'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1.5 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>Message / Inquiry</label>
                <textarea
                  required
                  rows={6}
                  placeholder="Describe project scope, timeline, or consultation needs..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`w-full border rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none resize-none ${
                    isLight 
                      ? 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-blue-500' 
                      : isTerminal
                        ? 'bg-black border-[#00ff66]/20 text-[#00ff66] placeholder-[#00ff66]/30 focus:border-[#00ff66]'
                        : 'bg-white/[0.03] border-white/10 text-white placeholder-zinc-600 focus:border-blue-500'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className={`w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all shadow-lg ${
                  isTerminal
                    ? 'bg-[#00ff66] text-black hover:bg-[#00ff66]/90 shadow-[#00ff66]/20'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                } ${isSending ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <span>{isSending ? 'Transmitting Securely...' : 'Send Secure Message'}</span>
                <Send className={`w-4 h-4 ${isSending ? 'animate-pulse' : ''}`} />
              </button>

              {error && (
                <div className={`p-3 border rounded-xl text-xs text-center animate-in fade-in slide-in-from-top-1 ${
                  isTerminal
                    ? 'bg-red-500/10 border-red-500/20 text-red-400'
                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                }`}>
                  {error}
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
