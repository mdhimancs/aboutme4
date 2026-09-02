import React, { useState } from 'react';
import { 
  X, ShieldCheck, TrendingUp, CheckCircle, Award, Share2, Check, 
  ArrowRight, Layers, FileText, Sparkles, Zap, Cpu, GitMerge, Scale, Lock, AlertTriangle 
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ExecutiveCaseStudy } from '../types';

interface CaseStudyModalProps {
  caseStudy: ExecutiveCaseStudy | null;
  onClose: () => void;
  theme?: string;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ caseStudy, onClose, theme = 'apple-dark' }) => {
  const isLight = theme === 'apple-light';
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'briefing' | 'star'>('briefing');

  if (!caseStudy) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'Enterprise IAM & Zero Trust':
        return {
          icon: <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />,
          badgeClass: isLight ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-blue-500/10 border-blue-500/20 text-blue-400',
          titleAccent: isLight ? 'text-blue-600' : 'text-blue-400',
        };
      case 'AI Security & Governance':
        return {
          icon: <Sparkles className="w-3.5 h-3.5 text-purple-500" />,
          badgeClass: isLight ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-purple-500/10 border-purple-500/20 text-purple-400',
          titleAccent: isLight ? 'text-purple-600' : 'text-purple-400',
        };
      case 'Threat Defense & SOC':
        return {
          icon: <Zap className="w-3.5 h-3.5 text-amber-500" />,
          badgeClass: isLight ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-amber-500/10 border-amber-500/20 text-amber-400',
          titleAccent: isLight ? 'text-amber-600' : 'text-amber-400',
        };
      case 'Cloud & Identity Security':
        return {
          icon: <Cpu className="w-3.5 h-3.5 text-cyan-500" />,
          badgeClass: isLight ? 'bg-cyan-50 border-cyan-200 text-cyan-700' : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
          titleAccent: isLight ? 'text-cyan-600' : 'text-cyan-400',
        };
      case 'M&A & Enterprise Modernization':
        return {
          icon: <GitMerge className="w-3.5 h-3.5 text-emerald-500" />,
          badgeClass: isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
          titleAccent: isLight ? 'text-emerald-600' : 'text-emerald-400',
        };
      case 'Board Governance & Crisis Command':
        return {
          icon: <Scale className="w-3.5 h-3.5 text-rose-500" />,
          badgeClass: isLight ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-rose-500/10 border-rose-500/20 text-rose-400',
          titleAccent: isLight ? 'text-rose-600' : 'text-rose-400',
        };
      default:
        return {
          icon: <Lock className="w-3.5 h-3.5 text-blue-500" />,
          badgeClass: isLight ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-blue-500/10 border-blue-500/20 text-blue-400',
          titleAccent: isLight ? 'text-blue-600' : 'text-blue-400',
        };
    }
  };

  const catTheme = getCategoryTheme(caseStudy.category);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className={`relative w-full max-w-4xl border rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col ${
        isLight ? 'bg-[#ffffff] border-zinc-200 text-zinc-900' : 'bg-[#0a0a0c] border-white/10 text-white'
      }`}>
        {/* Modal Top Bar */}
        <div className={`flex items-center justify-between px-6 py-4 border-b backdrop-blur-md shrink-0 ${
          isLight ? 'border-zinc-200 bg-zinc-50/80' : 'border-white/10 bg-black/40'
        }`}>
          <div className="flex items-center space-x-2 text-xs font-semibold">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${catTheme.badgeClass}`}>
              {catTheme.icon}
              <span>{caseStudy.category}</span>
            </span>
            <span className="text-zinc-400">•</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
              caseStudy.status === 'Enterprise Standard' || caseStudy.status === 'Operational'
                ? isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-emerald-950/40 border-emerald-800/60 text-emerald-400'
                : isLight ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-blue-950/40 border-blue-800/60 text-blue-400'
            }`}>
              {caseStudy.status}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className={`p-2 rounded-full transition-colors ${
                isLight ? 'text-zinc-500 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200' : 'text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10'
              }`}
              title="Copy link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${
                isLight ? 'text-zinc-500 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200' : 'text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
          {/* Header & Scale Badge */}
          <div className="space-y-3">
            <div className={`text-[11px] font-mono font-bold tracking-wide uppercase ${catTheme.titleAccent}`}>
              Enterprise Defense Briefing & Program Transformation
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
              {caseStudy.title}
            </h1>
            <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
              {caseStudy.subtitle}
            </p>

            {/* Enterprise Scale Banner */}
            <div className={`text-xs font-mono flex items-center gap-2.5 pt-1 ${
              isLight ? 'text-zinc-700' : 'text-zinc-300'
            }`}>
              <ShieldCheck className="w-4 h-4 text-indigo-500 shrink-0" />
              <span><strong>Operational Scale:</strong> {caseStudy.businessScale}</span>
            </div>
          </div>

          {/* Key Impact Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2 border-y border-zinc-100 dark:border-white/5">
            {caseStudy.impactMetrics.map((metric, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-xl sm:text-2xl font-black text-blue-500 tracking-tight">
                  {metric.value}
                </div>
                <div className={`text-xs font-bold ${isLight ? 'text-zinc-800' : 'text-zinc-200'}`}>
                  {metric.label}
                </div>
                {metric.desc && (
                  <div className={`text-[10.5px] leading-snug ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    {metric.desc}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tab Selector: Full Briefing vs Structured STAR Breakdown */}
          <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-white/10 pb-2">
            <button
              onClick={() => setActiveTab('briefing')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'briefing'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : isLight ? 'text-zinc-600 hover:bg-zinc-100' : 'text-zinc-400 hover:bg-white/5'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Full Architectural Briefing</span>
            </button>
            <button
              onClick={() => setActiveTab('star')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'star'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : isLight ? 'text-zinc-600 hover:bg-zinc-100' : 'text-zinc-400 hover:bg-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Executive STAR Breakdown</span>
            </button>
          </div>

          {/* Tab 1: Full Briefing Markdown */}
          {activeTab === 'briefing' && caseStudy.fullBriefingMarkdown && (
            <div className={`prose max-w-none text-xs sm:text-sm leading-relaxed space-y-4 ${
              isLight 
                ? 'prose-zinc text-zinc-700 prose-headings:text-zinc-900 prose-code:text-blue-600 prose-pre:bg-zinc-900 prose-pre:text-zinc-100' 
                : 'prose-invert text-zinc-300 prose-headings:text-white prose-code:text-blue-400 prose-pre:bg-black/70 prose-pre:border prose-pre:border-white/10 prose-pre:text-zinc-200'
            }`}>
              <ReactMarkdown>{caseStudy.fullBriefingMarkdown}</ReactMarkdown>
            </div>
          )}

          {/* Tab 2: STAR Framework Breakdown */}
          {activeTab === 'star' && (
            <div className="space-y-4">
              {/* Situation / Challenge */}
              <div className={`p-4 rounded-2xl border ${
                isLight ? 'bg-red-50/40 border-red-200/70' : 'bg-red-950/10 border-red-900/30'
              }`}>
                <div className="text-xs font-bold uppercase tracking-wider text-red-500 mb-1.5 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span>1. Situation & Enterprise Risk Exposure</span>
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                  {caseStudy.challenge}
                </p>
              </div>

              {/* Task & Executive Strategy */}
              <div className={`p-4 rounded-2xl border ${
                isLight ? 'bg-blue-50/40 border-blue-200/70' : 'bg-blue-950/10 border-blue-900/30'
              }`}>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-500 mb-2 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span>2. Task & Strategic Transformation Pillars</span>
                </div>
                <ul className="space-y-2">
                  {caseStudy.strategy.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                      <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span className={isLight ? 'text-zinc-700' : 'text-zinc-300'}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action / Architecture Highlights */}
              <div className={`p-4 rounded-2xl border ${
                isLight ? 'bg-indigo-50/40 border-indigo-200/70' : 'bg-indigo-950/10 border-indigo-900/30'
              }`}>
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-500 mb-2 flex items-center gap-1.5">
                  <ArrowRight className="w-4 h-4 text-indigo-500" />
                  <span>3. Action & Core Architecture Highlights</span>
                </div>
                <ul className="space-y-2">
                  {caseStudy.architectureHighlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                      <ArrowRight className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <span className={isLight ? 'text-zinc-700' : 'text-zinc-300'}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Results & Business Outcomes */}
              <div className={`p-4 rounded-2xl border ${
                isLight ? 'bg-emerald-50/40 border-emerald-200/70' : 'bg-emerald-950/10 border-emerald-900/30'
              }`}>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-1.5 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span>4. Measurable Business Outcome & Financial ROI</span>
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed mb-2 ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                  {caseStudy.businessOutcome}
                </p>
                <div className={`text-xs font-semibold p-2.5 rounded-xl border ${
                  isLight ? 'bg-emerald-100/50 border-emerald-300 text-emerald-900' : 'bg-emerald-900/30 border-emerald-700/50 text-emerald-300'
                }`}>
                  <strong>Financial & Audit Impact:</strong> {caseStudy.financialAndAuditRoi}
                </div>
              </div>
            </div>
          )}

          {/* Leadership Role Box */}
          <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
            isLight ? 'bg-zinc-100/80 border-zinc-200 text-zinc-800' : 'bg-white/5 border-white/10 text-zinc-200'
          }`}>
            <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-500">Executive Leadership Role</div>
              <div className="text-xs sm:text-sm">{caseStudy.leadershipRole}</div>
            </div>
          </div>

          {/* Tags Footer */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-200 dark:border-white/10">
            {caseStudy.tags.map((tag, idx) => (
              <span
                key={idx}
                className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg border ${
                  isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-700' : 'bg-white/5 border-white/10 text-zinc-300'
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
