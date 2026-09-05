import React, { useState } from 'react';
import { 
  Archive as ArchiveIcon, 
  ExternalLink, 
  Star, 
  Calendar, 
  Filter, 
  Terminal, 
  Github, 
  Linkedin, 
  Mail, 
  ArrowUp,
  FileCheck,
  Shield,
  Download,
  Award,
  Layers,
  FileText,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Lock,
  Unlock,
  KeyRound,
  Printer,
  Target,
  TrendingUp,
  BarChart3,
  Clock,
  Briefcase,
  Cpu
} from 'lucide-react';
import { ARCHIVE_ITEMS, PERSONAL_INFO } from '../data/portfolioData';
import { useHoverScroll } from '../lib/utils';
import { trackAssetInteraction } from '../lib/analytics';
import { useAuth } from '../context/AuthContext';

interface ArchiveProps {
  theme?: string;
  onOpenContact?: () => void;
  onScrollToTop?: () => void;
}

interface ExecutiveBlueprint {
  id: string;
  title: string;
  category: string;
  regulatoryStandard: string;
  description: string;
  executiveTakeaway: string;
  coreComponents: string[];
  version: string;
}

const EXECUTIVE_BLUEPRINTS: ExecutiveBlueprint[] = [
  {
    id: 'bp-ztmm',
    title: 'Enterprise Zero Trust Maturity & Implementation Matrix',
    category: 'Architecture Blueprint',
    regulatoryStandard: 'NIST SP 800-207 • CISA ZTMM v2.0',
    description: 'A 5-pillar architectural roadmap defining phased migration from perimeter-based firewalls to continuous identity-verified micro-perimeters and Just-In-Time (JIT) ephemeral access.',
    executiveTakeaway: 'Eliminates 92% of standing administrative attack surfaces and provides verifiable artifact tracking for regulatory audit boards.',
    coreComponents: [
      'Continuous Signal Evaluation (Device Health + Behavior)',
      'Just-In-Time (JIT) Ephemeral Credential Broker',
      'mTLS Workload Attestation via Identity Federation',
      'Automated Policy-as-Code CI/CD Guardrails'
    ],
    version: 'v4.2 (Production Ready)'
  },
  {
    id: 'bp-sec-8k',
    title: 'Materiality Determination Protocol',
    category: 'GRC & Legal Runbook',
    regulatoryStandard: 'SEC Item 1.05 • Form 8-K / 10-K Compliance',
    description: 'Cross-functional executive protocol synchronizing the CISO, General Counsel, CFO, and Investor Relations to determine financial and operational materiality within 96 hours of an incident.',
    executiveTakeaway: 'Ensures strict federal regulatory compliance, shielding the Board of Directors and C-suite from disclosure enforcement penalties.',
    coreComponents: [
      'Quantitative Materiality Thresholds (> $5M Loss / > 50K Records)',
      'Cross-Functional Executive Escrow & Sign-off Workflows',
      'Law Enforcement Delay Protocol (DOJ Exemption Workflow)',
      'Pre-Drafted SEC 8-K Item 1.05 Safe Harbor Disclosures'
    ],
    version: 'v3.1 (Board Standard)'
  },
  {
    id: 'bp-identity-fabric',
    title: 'Enterprise Identity Fabric & Zero Trust Architecture',
    category: 'Identity Security',
    regulatoryStandard: 'NIST SP 800-207 (Zero Trust)',
    description: 'A unified identity architecture consolidating workforce, consumer, and machine identities into a single trust boundary.',
    executiveTakeaway: 'Eliminates perimeter silos and establishes identity as the primary security control plane for multi-cloud enterprise ecosystems.',
    coreComponents: [
      'Universal SSO & MFA (FIDO2/WebAuthn)',
      'Just-In-Time (JIT) Privileged Access',
      'Continuous Adaptive Authentication',
      'Identity Threat Detection & Response (ITDR)'
    ],
    version: 'v4.0 (ZT Blueprint)'
  },
  {
    id: 'bp-adr-ciso',
    title: 'CISO Enterprise Architecture Decision Record (ADR) Framework',
    category: 'Engineering Governance',
    regulatoryStandard: 'ISO/IEC 42010 • TOGAF Security Architecture',
    description: 'Standardized template and governance cadence for capturing architectural pivots, cryptographic trade-offs, and compliance impact across distributed engineering teams.',
    executiveTakeaway: 'Accelerates technical approval velocity from 3 weeks to 48 hours while maintaining immutable audit trails for external examiners.',
    coreComponents: [
      'Context & Problem Statement with Business Justification',
      'Fiduciary & Security Drivers vs. Performance Benchmarks',
      'Evaluated Options with Quantitative Pros/Cons',
      'Cryptographic Compliance Sign-off & Audit Signature'
    ],
    version: 'v5.0 (Enterprise Template)'
  }
];

export interface AspirationalRoadmap {
  id: string;
  title: string;
  category: string;
  targetHorizon: string;
  targetRole: string;
  badge: string;
  status: string;
  executiveSummary: string;
  fiduciaryImpact: string;
  phases: {
    phase: string;
    title: string;
    items: string[];
  }[];
  keyDeliverables: string[];
}

export interface StrategicPlaybook {
  id: string;
  title: string;
  category: string;
  badge: string;
  executiveSummary: string;
  sections: {
    heading: string;
    items: {
      label: string;
      description: string;
    }[];
  }[];
  implementationOutcome: string;
}

const STRATEGIC_PLAYBOOKS: StrategicPlaybook[] = [
  {
    id: 'pb-analytics-deployment',
    title: 'Deployment Guide: Executive Analytics & Access Governance',
    category: 'Operational Intelligence',
    badge: 'Confidential Playbook',
    executiveSummary: 'Step-by-step roadmap for instrumenting the portal with institutional tracking and multi-tier access control to protect intellectual property while measuring engagement.',
    sections: [
      {
        heading: 'I. Analytics Instrumentation (Tracking)',
        items: [
          { label: 'Google Analytics 4 (GA4)', description: 'Initialize global measurement ID for real-time traffic maps and referral attribution.' },
          { label: 'Event Triggering', description: 'Instrument "Inspect Blueprint" and "Dossier Print" buttons to track high-value candidate interest.' },
          { label: 'Firmographic Enrichment', description: 'Integrate IP-to-Company APIs to identify which specific investment firms or banks are viewing your roadmaps.' }
        ]
      },
      {
        heading: 'II. Traffic Governance (Filtering)',
        items: [
          { label: 'Server-Side Logging', description: 'Enable middleware to log every request (IP, Path, Time) directly to the server console for auditability.' },
          { label: 'Geofencing Restrictions', description: 'Add logic to server.ts to restrict traffic from non-target jurisdictions or high-risk IP ranges.' },
          { label: 'Bot/Scraper Shield', description: 'Implement rate limiting to prevent automated scraping of proprietary strategic architectures.' }
        ]
      },
      {
        heading: 'III. Executive Access Control (Gating)',
        items: [
          { label: 'The "Executive Vault" Gate', description: 'Wrap the Aspirational Roadmaps in a simple "Access Code" challenge (e.g., a 6-digit PIN provided to search partners).' },
          { label: 'JWT-Based Sessions', description: 'Implement JSON Web Tokens for time-bound access, ensuring links shared in emails expire after 72 hours.' },
          { label: 'Dynamic IP Blacklisting', description: 'Create a dynamic "Deny List" that can be updated in real-time to block specific intrusive individuals.' }
        ]
      }
    ],
    implementationOutcome: 'Provides a secure, audit-ready portal that identifies specific institutional interest while maintaining absolute control over who views your strategic playbooks.'
  }
];

const ASPIRATIONAL_ROADMAPS: AspirationalRoadmap[] = [
  {
    id: 'asp-first-90-days',
    title: 'First 90 Days: CISO Executive Transition Playbook',
    category: 'Executive Transition',
    targetHorizon: 'Days 1–90 Command Cadence',
    targetRole: 'CISO / Deputy CISO / VP Security Architecture',
    badge: 'Boardroom Readiness',
    status: 'Strategic Blueprint',
    executiveSummary: 'Structured executive operational blueprint ensuring rapid institutional assimilation, crown-jewel risk triage, and immediate alignment of cybersecurity investments with firmwide commercial velocity.',
    fiduciaryImpact: 'Eliminates supervisory and operational exposure during executive transition, achieves immediate visibility over Tier-0 attack surfaces, and delivers an audit-defensible 3-year modernization roadmap to the Board.',
    phases: [
      {
        phase: 'Days 1–30',
        title: 'Discovery & Risk Triage',
        items: [
          'Crown-jewel asset mapping & Tier-0 active directory risk assessment',
          'Supervisory regulatory audit posture review (Fed, PRA, SEC Form 8-K)',
          'Architecture Review Board (ARB) governance baseline & cadence',
          'Initial PASTA & FAIR™ quantitative risk modeling calibration'
        ]
      },
      {
        phase: 'Days 31–60',
        title: 'Governance & Zero Trust Acceleration',
        items: [
          'Elimination of standing admin credentials via ephemeral JIT PAM',
          'Establish enterprise Generative AI guardrails & prompt DLP policies',
          'Cloud Security Posture Management (CSPM) drift remediation across accounts',
          'Security champions network activation across engineering pods'
        ]
      },
      {
        phase: 'Days 61–90',
        title: 'Target Operating Model & Board Alignment',
        items: [
          'Finalize CISO Target Operating Model (TOM) & 3-year investment plan',
          'Institute Board Audit & Risk Committee reporting dashboard',
          'Implement automated continuous compliance telemetry',
          'Align security budget allocation with business unit revenue drivers'
        ]
      }
    ],
    keyDeliverables: [
      'Crown-Jewel Risk Register & Tier-0 Remediation Plan',
      'Target Operating Model (TOM) & 3-Year Cyber Roadmap',
      'Board & Audit Committee Quarterly Cyber Risk Dashboard',
      'SEC 4-Day Materiality Determination Operational Protocol'
    ]
  },
  {
    id: 'asp-board-brief',
    title: '1-Page Board Executive Brief (Institutional Dossier)',
    category: 'Board Governance',
    targetHorizon: 'Executive Briefing & Search Review',
    targetRole: 'Board Nomination & Search Committees',
    badge: 'C-Suite Dossier',
    status: 'Print & PDF Ready',
    executiveSummary: 'Condensed, high-density printable executive dossier designed for Board of Directors, Audit Committees, and executive search partners (Spencer Stuart, Heidrick & Struggles, Egon Zehnder) requiring a comprehensive 90-second evaluation of candidate caliber.',
    fiduciaryImpact: 'Delivers immediate executive search transparency, validating a 14-year Goldman Sachs institutional tenure, $18.5M program stewardship, and 100% clean regulatory examination record across Tier-1 financial jurisdictions.',
    phases: [
      {
        phase: 'Pedigree',
        title: '14-Year Goldman Sachs Institutional Record',
        items: [
          'Progression from Analyst to Senior Vice President / Global Engineering Lead',
          'Global leadership directing 30+ distributed engineers across NY, London, Bengaluru',
          'Stewardship of firmwide Zero Trust identity architecture across 5M+ identities',
          'Sub-90-minute quarantine protocol during critical zero-day crisis command'
        ]
      },
      {
        phase: 'Capabilities',
        title: '6 Strategic CyberTech Pillars',
        items: [
          'Executive Strategy & Board Governance ($18.5M portfolio modernization)',
          'Enterprise Identity Fabric & Modern Federation (OAuth 2.0 / OIDC / FIDO2)',
          'Zero Trust Architecture & Privileged Defense (NIST SP 800-207 / CyberArk)',
          'AI Governance, Prompt Defense & DSPM (NIST AI RMF / OWASP LLM Top 10)'
        ]
      },
      {
        phase: 'Fiduciary',
        title: 'Verified Governance & Metric Proof',
        items: [
          '100% clean supervisory examination record (US Fed, UK PRA, SEC, FINRA)',
          'Granted US Patent No. 11,222,333 B2 (Cryptographic Session Binding)',
          'Keyless OIDC federation eliminating static secrets across 4,500+ cloud accounts',
          'Zero security breaches or material regulatory fines throughout career tenure'
        ]
      }
    ],
    keyDeliverables: [
      '1-Page Print-Ready CISO Executive Summary Dossier',
      'Supervisory Regulatory Compliance Attestation Matrix',
      'Institutional Program Scale & Budget Stewardship Verification',
      'Direct Fiduciary Contact & Verification Channels'
    ]
  },
  {
    id: 'asp-board-dashboard',
    title: 'Board & Audit Committee Cyber Risk Dashboard',
    category: 'Risk Economics',
    targetHorizon: 'Continuous Fiduciary Assurance',
    targetRole: 'Board Audit & Risk Committee',
    badge: 'Risk Quantification',
    status: 'FAIR™ Calibrated',
    executiveSummary: 'Interactive executive risk governance framework translating low-level technical vulnerabilities into quantitative financial exposure (FAIR™ model) and actionable supervisory compliance assurance for non-technical directors.',
    fiduciaryImpact: 'Transforms cybersecurity from an opaque cost center into a quantifiable fiduciary risk discipline, empowering directors to make defensible capital allocation decisions with 95% statistical confidence intervals.',
    phases: [
      {
        phase: 'Quantification',
        title: 'FAIR™ Financial Risk Exposure Modeling',
        items: [
          'Translates attack scenarios into probable Annual Loss Expectancy (ALE)',
          'Identifies top 5 enterprise cyber exposure scenarios by dollar variance',
          'Models risk reduction ROI per $1M invested in defensive controls',
          'Calculates Value-at-Risk (VaR) for multi-cloud and third-party dependencies'
        ]
      },
      {
        phase: 'Maturity',
        title: 'NIST SP 800-207 Zero Trust Maturity Index',
        items: [
          'Identity & Credential Health: 98% (Phishing-resistant FIDO2 adoption)',
          'Workload & Micro-segmentation: 94% (Enclave isolation verified)',
          'Data Security Posture (DSPM): 95% (Tokenized MNPI / PII in transit)',
          'Privileged Access Elimination: 95% (Zero standing administrative rights)'
        ]
      },
      {
        phase: 'Assurance',
        title: 'Supervisory Examination Assurance',
        items: [
          'Continuous automated compliance telemetry for SOX 404 & ISO 27001',
          'SEC Item 1.05 4-business-day materiality determination workflow ready',
          'Vendor & third-party supply chain risk scoring with continuous monitoring',
          'Board reporting dashboard updated weekly for quarterly committee review'
        ]
      }
    ],
    keyDeliverables: [
      'Executive Board Cyber Risk Presentation Deck Template',
      'Quantitative FAIR™ Cyber Risk Model with Monte Carlo Simulation',
      'Zero Trust Multi-Pillar Maturity Scorecard (CISA / NIST)',
      'Quarterly Audit Committee Compliance Attestation Package'
    ]
  },
  {
    id: 'asp-ai-governance',
    title: 'Enterprise AI & GenAI Governance Policy Framework',
    category: 'Emerging Tech Governance',
    targetHorizon: 'Next-Gen Defensive Frontier',
    targetRole: 'Enterprise Architecture & CISO',
    badge: 'AI Security (NIST AI RMF)',
    status: 'NIST & ISO 42001 Ready',
    executiveSummary: 'Comprehensive enterprise policy and architectural reference model establishing real-time guardrails for commercial LLMs and autonomous agent workflows without stifling institutional innovation.',
    fiduciaryImpact: 'Safeguards firmwide intellectual property and material non-public information (MNPI) from unauthorized ingestion while maintaining compliance with EU AI Act, NIST AI RMF 1.0, and ISO/IEC 42001 standards.',
    phases: [
      {
        phase: 'Guardrails',
        title: 'Real-Time Prompt DLP & Tokenization Gateway',
        items: [
          'Bidirectional inspection intercepting prompts before transmission to external LLMs',
          'Automated tokenization and masking of PII, financial MNPI, and proprietary source code',
          'Reversible de-tokenization for sanctioned internal models under isolated VPC boundaries',
          'Latency-optimized gateway routing (<15ms overhead per transaction)'
        ]
      },
      {
        phase: 'Classification',
        title: 'NIST AI RMF 1.0 & ISO 42001 Risk Tiering',
        items: [
          'Tier-1 (Autonomous Financial Decisioning): Strict sandboxing & human-in-the-loop',
          'Tier-2 (Internal Analytical Assist): Ephemeral context windows & access auditing',
          'Tier-3 (Public Knowledge Retrieval): Read-only grounding & rate-limited queries',
          'Continuous drift detection and adversarial jailbreak vulnerability scoring'
        ]
      },
      {
        phase: 'Threat Defense',
        title: 'OWASP Top 10 for LLMs Threat Defense',
        items: [
          'Prompt injection mitigations via structural semantic firewalls',
          'Training data poisoning detection for internal fine-tuning pipelines',
          'Shadow AI discovery identifying unsanctioned employee tool adoption',
          'Enterprise agentic access control via OAuth 2.0 scoped workload identities'
        ]
      }
    ],
    keyDeliverables: [
      'Enterprise GenAI Acceptable Use Policy & Board Charter',
      'AI Security Gateway Reference Architecture Blueprint',
      'NIST AI RMF 1.0 / ISO 42001 Risk Classification Matrix',
      'OWASP LLM Top 10 Automated Defensive Testing Runbook'
    ]
  }
];

export const Archive: React.FC<ArchiveProps> = ({ 
  theme = 'apple-dark', 
  onOpenContact, 
  onScrollToTop 
}) => {
  const isLight = theme === 'apple-light';
  const { 
    gateItem, 
    user, 
    isAdmin, 
    isAuthorized, 
    currentUserEntry,
    isItemLocked, 
    isSectionLocked, 
    toggleSectionLock, 
    toggleItemLock 
  } = useAuth();

  const isSectionGated = isSectionLocked('archive');

  const [activeTab, setActiveTab] = useState<'blueprints' | 'aspirational' | 'playbooks' | 'archive'>('aspirational');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedBlueprint, setSelectedBlueprint] = useState<ExecutiveBlueprint | null>(null);
  const [selectedAspirational, setSelectedAspirational] = useState<AspirationalRoadmap | null>(null);
  const [selectedPlaybook, setSelectedPlaybook] = useState<StrategicPlaybook | null>(null);

  const typeScroll = useHoverScroll();
  const yearScroll = useHoverScroll();

  const types = ['All', 'Aspirational', 'Playbook', 'Patent', 'Open Source', 'Keynote', 'Paper', 'Legacy Project'];
  const years = ['All', '2026', '2025', '2024', '2023'];

  const filteredArchive = ARCHIVE_ITEMS.filter((item) => {
    const matchesType = selectedType === 'All' || item.type === selectedType;
    const matchesYear = selectedYear === 'All' || item.year.toString() === selectedYear;
    return matchesType && matchesYear;
  });

  // Transparent lock: managed via PasswordGate wrapper

  return (
    <section 
      id="archive" 
      className={`relative overflow-hidden min-h-screen lg:h-screen w-full flex flex-col justify-between py-3 sm:py-4 pb-3 sm:pb-4 lg:pb-5 px-6 sm:px-10 lg:px-14 max-w-6xl mx-auto border-t ${
        isLight ? 'border-zinc-200 bg-[#fcfcfd]' : 'border-white/10 bg-[#000000]'
      }`}
    >
      {/* Background Aura Effects */}
      <div 
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[320px] sm:h-[450px] rounded-full blur-[90px] sm:blur-[130px] pointer-events-none transition-all duration-700 ${
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

      <div className="relative flex-1 flex flex-col justify-center min-h-0">
        
        {/* Section Header */}
        <div className="relative w-full space-y-1 mb-3 shrink-0 text-center">
          {/* Luminous aura behind heading */}
          <div 
            className={`absolute -top-3 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-24 sm:h-28 rounded-full blur-2xl pointer-events-none transition-all ${
              isLight 
                ? 'bg-gradient-to-r from-blue-400/25 via-sky-300/20 to-indigo-300/20 opacity-80' 
                : 'bg-gradient-to-r from-blue-500/30 via-cyan-400/20 to-indigo-500/25 opacity-90'
            }`} 
          />

          <div className={`relative inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20 backdrop-blur-md ${
            isLight ? 'shadow-sm' : 'shadow-[0_0_12px_rgba(59,130,246,0.15)]'
          }`}>
            <Award className="w-3 h-3 text-blue-500" />
            <span>Defensibility, Patents & Standardized Blueprints</span>
          </div>
          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3">
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight transition-all text-center ${
              isLight 
                ? 'text-zinc-900 drop-shadow-[0_2px_16px_rgba(59,130,246,0.22)]' 
                : 'text-white drop-shadow-[0_0_24px_rgba(96,165,250,0.40)]'
            }`}>
              Archives & Executive Blueprints
            </h2>
            <div className="inline-flex items-center gap-2">
              <button 
                type="button"
                onClick={() => gateItem('sec-archive', 'archive', 'Archive Vaults & Executive Blueprints', () => {})}
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                  isSectionGated 
                    ? (isLight ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-amber-500/10 text-amber-400 border-amber-500/20')
                    : (isLight ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20')
                }`}
              >
                {isSectionGated ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                <span>{isSectionGated ? 'Locked Section' : 'Public Access'}</span>
              </button>
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => toggleSectionLock('archive')}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border transition-colors cursor-pointer ${
                    isLight 
                      ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-300' 
                      : 'bg-white/5 hover:bg-white/10 text-zinc-300 border-white/10'
                  }`}
                  title="Toggle archive section lock"
                >
                  <span>{isSectionGated ? 'Unlock Section' : 'Lock Section'}</span>
                </button>
              )}
            </div>
          </div>
          <p className={`relative max-w-3xl mx-auto text-xs sm:text-sm ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
            Granted intellectual property, institutional reference architectures, and standardized CISO operational blueprints.
          </p>

          {/* Persistent Firebase Auth Locking Notice */}
          <div className="max-w-4xl mx-auto pt-1">
            {!isAuthorized ? (
              <div className={`p-2 sm:p-2.5 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs transition-all ${
                isLight ? 'bg-amber-50/90 border-amber-200 text-amber-950' : 'bg-amber-950/20 border-amber-500/30 text-amber-200'
              }`}>
                <div className="flex items-center gap-2 text-left">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-[11px] block">
                      {isSectionGated ? 'Section Gated by Default' : 'Granular Resource Protection Active'}
                    </span>
                    <span className="text-[10px] opacity-80 block">
                      Each article and vault can be locked independently or granted specific individual clearance.
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => gateItem('sec-archive', 'archive', 'Archive Vaults & Blueprints', () => {})}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-[11px] shadow transition-all cursor-pointer"
                >
                  <Lock className="w-3 h-3" />
                  <span>Authenticate & Request Access</span>
                </button>
              </div>
            ) : (
              <div className={`p-2 rounded-xl border flex items-center justify-between gap-2 text-xs transition-all ${
                isLight ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950' : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
              }`}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-[11px]">
                    <strong>Authenticated ({user?.email}):</strong> {
                      isAdmin 
                        ? 'Admin Clearance — Full control over individual locks & allowlists.'
                        : currentUserEntry?.scope === 'specific'
                          ? `Specific Clearance — Granted access to ${currentUserEntry.allowedItems?.length || 0} designated item(s).`
                          : 'Global Clearance — Authorized for all archives, patents & blueprints.'
                    }
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => gateItem('sec-archive', 'archive', 'Security Hub', () => {})}
                  className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase font-bold hover:bg-emerald-500/20 transition-colors cursor-pointer"
                >
                  {isAdmin ? 'Manage Security' : 'View Clearance'}
                </button>
              </div>
            )}
          </div>

          {/* Primary View Switcher */}
          <div className="flex flex-wrap items-center justify-center pt-1.5 gap-1.5">
            <button
              onClick={() => setActiveTab('blueprints')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                activeTab === 'blueprints'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : isLight
                    ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <FileCheck className="w-3 h-3" />
              <span>Blueprints (4)</span>
            </button>
            <button
              onClick={() => setActiveTab('aspirational')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                activeTab === 'aspirational'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/25'
                  : isLight
                    ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Aspirational (4)</span>
            </button>
            <button
              onClick={() => setActiveTab('playbooks')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                activeTab === 'playbooks'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/25'
                  : isLight
                    ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Cpu className="w-3 h-3 text-emerald-400" />
              <span>Playbooks (1)</span>
            </button>
            <button
              onClick={() => setActiveTab('archive')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                activeTab === 'archive'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : isLight
                    ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <ArchiveIcon className="w-3 h-3" />
              <span>Vaults ({ARCHIVE_ITEMS.length})</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Standardized Executive Blueprints */}
        {activeTab === 'blueprints' && (
          <div className="relative w-full">
            <div className="overflow-y-auto min-h-0 max-h-[360px] sm:max-h-[385px] lg:max-h-[405px] pr-1 pb-14 space-y-3 scrollbar-thin animate-in fade-in duration-300">
              {/* Blueprints Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {EXECUTIVE_BLUEPRINTS.map((bp) => {
                  const locked = isItemLocked(bp.id, 'archive');
                  const hasSpecificClearance = currentUserEntry?.scope === 'specific' && currentUserEntry.allowedItems?.includes(bp.id);

                  return (
                    <div
                      key={bp.id}
                      onClick={() => {
                        gateItem(bp.id, 'archive', bp.title, () => {
                          setSelectedBlueprint(bp);
                          trackAssetInteraction(bp.id, bp.title, 'Executive Blueprint');
                        });
                      }}
                      className={`p-3.5 rounded-2xl border flex flex-col justify-between transition-all cursor-pointer hover:border-blue-500/40 ${
                        isLight 
                          ? 'bg-white border-zinc-200 shadow-xs hover:shadow-md' 
                          : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                              isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-700' : 'bg-white/5 border-white/10 text-zinc-300'
                            }`}>
                              {bp.category}
                            </span>
                            {hasSpecificClearance && (
                              <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[8px] font-bold border uppercase tracking-wider ${
                                isLight ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-purple-500/15 border-purple-500/30 text-purple-300'
                              }`}>
                                <KeyRound className="w-2.5 h-2.5 text-purple-400" />
                                <span>Clearance Granted</span>
                              </span>
                            )}
                            {locked && !hasSpecificClearance && (
                              <span className="inline-flex items-center gap-1 text-[9px] font-mono text-amber-500 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">
                                <Lock className="w-2.5 h-2.5" /> Locked
                              </span>
                            )}
                            {isAdmin && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleItemLock(bp.id, 'archive');
                                }}
                                className="p-1 rounded bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                                title={locked ? 'Unlock this blueprint' : 'Lock this blueprint'}
                              >
                                {locked ? <Lock className="w-2.5 h-2.5 text-amber-400" /> : <Unlock className="w-2.5 h-2.5 text-emerald-400" />}
                              </button>
                            )}
                          </div>
                          <span className="text-[10px] font-mono text-blue-500 font-semibold">{bp.regulatoryStandard}</span>
                        </div>

                        <h4 className={`text-xs sm:text-sm font-bold tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                          {bp.title}
                        </h4>

                        <p className={`text-[11px] leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                          {bp.description}
                        </p>

                        <div className={`p-2 rounded-xl text-[10.5px] border ${
                          isLight ? 'bg-blue-50/70 border-blue-100 text-zinc-800' : 'bg-white/[0.03] border-white/5 text-zinc-300'
                        }`}>
                          <strong className="text-blue-500 font-bold block mb-0.5">Executive Outcome:</strong>
                          {bp.executiveTakeaway}
                        </div>
                      </div>

                      <div className={`pt-2.5 mt-2.5 border-t space-y-2 ${isLight ? 'border-zinc-100' : 'border-white/5'}`}>
                        <div className="space-y-1">
                          <span className={`text-[8.5px] font-semibold uppercase tracking-wider ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}>
                            Core Governance Components
                          </span>
                          <div className="grid grid-cols-2 gap-1">
                            {bp.coreComponents.map((comp, i) => (
                              <div key={i} className="flex items-center gap-1 text-[9.5px] text-zinc-600 dark:text-zinc-400">
                                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                                <span className="truncate">{comp}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1 text-[10px]">
                          <span className="text-zinc-400 font-mono">{bp.version}</span>
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              gateItem(bp.id, 'archive', bp.title, () => {
                                setSelectedBlueprint(bp);
                                trackAssetInteraction(bp.id, bp.title, 'Executive Blueprint');
                              });
                            }}
                            className={`flex items-center gap-1 font-semibold hover:underline cursor-pointer ${
                              locked && !hasSpecificClearance ? 'text-amber-500 hover:text-amber-400' : 'text-blue-600 dark:text-blue-400'
                            }`}
                          >
                            {locked && !hasSpecificClearance ? (
                              <>
                                <Lock className="w-3 h-3" />
                                <span>Unlock Blueprint</span>
                              </>
                            ) : (
                              <>
                                <span>Inspect Executive Blueprint</span>
                                <ChevronRight className="w-3 h-3" />
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Gradient Fade Overlay */}
            <div 
              className={`pointer-events-none absolute bottom-0 left-0 right-0 h-20 sm:h-24 bg-gradient-to-t ${
                isLight 
                  ? 'from-[#fcfcfd] via-[#fcfcfd]/90 to-transparent' 
                  : 'from-[#000000] via-[#000000]/90 to-transparent'
              } z-20`} 
            />
          </div>
        )}

        {/* Tab 2: Aspirational Horizons & Strategic Playbooks */}
        {activeTab === 'aspirational' && (
          <div className="relative w-full">
            <div className="overflow-y-auto min-h-0 max-h-[360px] sm:max-h-[385px] lg:max-h-[405px] pr-1 pb-14 space-y-3 scrollbar-thin animate-in fade-in duration-300">
              {/* Executive Horizon Spotlight Banner */}
              {(() => {
                const horizonLocked = isItemLocked('asp-boardroom-sim', 'archive');
                const horizonClearance = currentUserEntry?.scope === 'specific' && currentUserEntry.allowedItems?.includes('asp-boardroom-sim');

                return (
                  <div 
                    onClick={() => {
                      gateItem('asp-boardroom-sim', 'archive', 'Executive Horizons & Strategic Governance Roadmaps', () => {});
                    }}
                    className={`p-3.5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer transition-all ${
                      isLight ? 'bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-sky-50/90 border-blue-200 shadow-2xs' : 'bg-gradient-to-r from-blue-950/30 via-indigo-950/20 to-zinc-900 border-blue-800/40 text-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-600/20 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">
                            CISO & dyCISO Strategic Horizons
                          </span>
                          <span className="text-[11px] font-mono font-bold text-zinc-700 dark:text-zinc-300">
                            Board & Search Committee Dossier
                          </span>
                          {horizonClearance && (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[8px] font-bold border uppercase tracking-wider bg-purple-500/15 border-purple-500/30 text-purple-300">
                              <KeyRound className="w-2.5 h-2.5 text-purple-400" /> Clearance Granted
                            </span>
                          )}
                          {horizonLocked && !horizonClearance && (
                            <span className="inline-flex items-center gap-1 text-[9px] font-mono text-amber-500 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">
                              <Lock className="w-2.5 h-2.5" /> Locked
                            </span>
                          )}
                          {isAdmin && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleItemLock('asp-boardroom-sim', 'archive');
                              }}
                              className="p-1 rounded bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                              title={horizonLocked ? 'Unlock item' : 'Lock item'}
                            >
                              {horizonLocked ? <Lock className="w-2.5 h-2.5 text-amber-400" /> : <Unlock className="w-2.5 h-2.5 text-emerald-400" />}
                            </button>
                          )}
                        </div>
                        <h4 className={`text-xs sm:text-sm font-bold mt-0.5 ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                          Executive Horizons & Strategic Governance Roadmaps
                        </h4>
                        <p className={`text-[11px] leading-relaxed max-w-2xl mt-0.5 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                          Forward-looking blueprints engineered for Board of Directors, Audit Committees, and executive search partners: Day-1 CISO command, 1-page boardroom dossier, FAIR™ risk economics, and Enterprise GenAI defense.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg border ${
                        isLight ? 'bg-white border-blue-300 text-blue-700' : 'bg-white/10 border-white/10 text-blue-300'
                      }`}>
                        {horizonLocked && !horizonClearance ? 'Clearance Required' : 'C-Suite Readiness'}
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* In the making Patent Spotlight Banner */}
              {(() => {
                const patentLocked = isItemLocked('patent-cryptographic-binding', 'archive');
                const patentClearance = currentUserEntry?.scope === 'specific' && currentUserEntry.allowedItems?.includes('patent-cryptographic-binding');

                return (
                  <div 
                    onClick={() => {
                      gateItem('patent-cryptographic-binding', 'archive', 'Method and Apparatus for Cryptographic Session Binding and Device Attestation™', () => {});
                    }}
                    className={`p-3.5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer transition-all ${
                      isLight ? 'bg-blue-50/90 border-blue-200 shadow-2xs' : 'bg-blue-950/20 border-blue-800/40 text-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-600/20 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">
                            In the making Patent
                          </span>
                          <span className="text-[11px] font-mono font-bold text-zinc-700 dark:text-zinc-300">
                            US Pat. No. 11,222,333 B2 ®
                          </span>
                          {patentClearance && (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[8px] font-bold border uppercase tracking-wider bg-purple-500/15 border-purple-500/30 text-purple-300">
                              <KeyRound className="w-2.5 h-2.5 text-purple-400" /> Clearance Granted
                            </span>
                          )}
                          {patentLocked && !patentClearance && (
                            <span className="inline-flex items-center gap-1 text-[9px] font-mono text-amber-500 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">
                              <Lock className="w-2.5 h-2.5" /> Locked
                            </span>
                          )}
                          {isAdmin && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleItemLock('patent-cryptographic-binding', 'archive');
                              }}
                              className="p-1 rounded bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                              title={patentLocked ? 'Unlock patent' : 'Lock patent'}
                            >
                              {patentLocked ? <Lock className="w-2.5 h-2.5 text-amber-400" /> : <Unlock className="w-2.5 h-2.5 text-emerald-400" />}
                            </button>
                          )}
                        </div>
                        <h4 className={`text-xs sm:text-sm font-bold mt-0.5 ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                          Method and Apparatus for Cryptographic Session Binding and Device Attestation™
                        </h4>
                        <p className={`text-[11px] leading-relaxed max-w-2xl mt-0.5 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                          Hardware-backed cryptographic assertion of device integrity and FIDO2 session binding during OAuth 2.0 / OIDC authorization code exchanges.
                        </p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg border shrink-0 ${
                      isLight ? 'bg-white border-blue-300 text-blue-700' : 'bg-white/10 border-white/10 text-blue-300'
                    }`}>
                      {patentLocked && !patentClearance ? 'Protected IP • Locked' : 'Protected IP & Defensibility'}
                    </span>
                  </div>
                );
              })()}

              {/* Aspirational Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {ASPIRATIONAL_ROADMAPS.map((item) => {
                  const locked = isItemLocked(item.id, 'archive');
                  const hasSpecificClearance = currentUserEntry?.scope === 'specific' && currentUserEntry.allowedItems?.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        gateItem(item.id, 'archive', item.title, () => {
                          setSelectedAspirational(item);
                          trackAssetInteraction(item.id, item.title, 'Aspirational Roadmap');
                        });
                      }}
                      className={`p-3.5 rounded-2xl border flex flex-col justify-between transition-all cursor-pointer hover:border-blue-500/40 ${
                        isLight 
                          ? 'bg-white border-zinc-200 shadow-xs hover:shadow-md' 
                          : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                              isLight ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                            }`}>
                              {item.category}
                            </span>
                            <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                              isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-600' : 'bg-white/5 border-white/10 text-zinc-400'
                            }`}>
                              {item.badge}
                            </span>
                            {hasSpecificClearance && (
                              <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[8px] font-bold border uppercase tracking-wider ${
                                isLight ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-purple-500/15 border-purple-500/30 text-purple-300'
                              }`}>
                                <KeyRound className="w-2.5 h-2.5 text-purple-400" />
                                <span>Clearance Granted</span>
                              </span>
                            )}
                            {locked && !hasSpecificClearance && (
                              <span className="inline-flex items-center gap-1 text-[9px] font-mono text-amber-500 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">
                                <Lock className="w-2.5 h-2.5" /> Locked
                              </span>
                            )}
                            {isAdmin && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleItemLock(item.id, 'archive');
                                }}
                                className="p-1 rounded bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                                title={locked ? 'Unlock roadmap' : 'Lock roadmap'}
                              >
                                {locked ? <Lock className="w-2.5 h-2.5 text-amber-400" /> : <Unlock className="w-2.5 h-2.5 text-emerald-400" />}
                              </button>
                            )}
                          </div>
                          <span className="text-[10px] font-mono text-blue-500 font-semibold">{item.targetHorizon}</span>
                        </div>

                        <div>
                          <h4 className={`text-xs sm:text-sm font-bold tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                            {item.title}
                          </h4>
                          <div className="text-[10px] text-zinc-500 font-medium mt-0.5 flex items-center gap-1">
                            <Briefcase className="w-3 h-3 text-zinc-400" />
                            <span>Target: {item.targetRole}</span>
                          </div>
                        </div>

                        <p className={`text-[11px] leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                          {item.executiveSummary}
                        </p>

                        <div className={`p-2 rounded-xl text-[10.5px] border ${
                          isLight ? 'bg-indigo-50/70 border-indigo-100 text-zinc-800' : 'bg-white/[0.03] border-white/5 text-zinc-300'
                        }`}>
                          <strong className="text-indigo-600 dark:text-indigo-400 font-bold block mb-0.5">Fiduciary Outcome:</strong>
                          {item.fiduciaryImpact}
                        </div>

                        <div className="space-y-1 pt-1">
                          <span className={`text-[8.5px] font-semibold uppercase tracking-wider ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}>
                            Execution Highlights & Control Pillars
                          </span>
                          <div className="space-y-1">
                            {item.phases.map((ph, pIdx) => (
                              <div key={pIdx} className="text-[10px] flex items-start gap-1.5">
                                <span className="font-bold text-blue-500 shrink-0 font-mono text-[9px] px-1 py-0.2 bg-blue-500/10 rounded">
                                  {ph.phase}:
                                </span>
                                <span className={`truncate ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                                  <strong>{ph.title}</strong> — {ph.items[0]}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className={`pt-2.5 mt-2.5 border-t space-y-2 ${isLight ? 'border-zinc-100' : 'border-white/5'}`}>
                        <div className="flex flex-wrap gap-1">
                          {item.keyDeliverables.slice(0, 3).map((del, dIdx) => (
                            <span key={dIdx} className={`text-[8.5px] px-1.5 py-0.5 rounded border ${
                              isLight ? 'bg-zinc-50 border-zinc-200 text-zinc-600' : 'bg-white/[0.03] border-white/5 text-zinc-400'
                            }`}>
                              ✓ {del}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-1 text-[10px]">
                          <span className="text-zinc-400 font-mono text-[9.5px]">{item.status}</span>
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              gateItem(item.id, 'archive', item.title, () => {
                                setSelectedAspirational(item);
                                trackAssetInteraction(item.id, item.title, 'Aspirational Roadmap');
                              });
                            }}
                            className={`flex items-center gap-1 font-semibold hover:underline cursor-pointer ${
                              locked && !hasSpecificClearance ? 'text-amber-500 hover:text-amber-400' : 'text-blue-600 dark:text-blue-400'
                            }`}
                          >
                            {locked && !hasSpecificClearance ? (
                              <>
                                <Lock className="w-3 h-3" />
                                <span>Unlock Strategic Blueprint</span>
                              </>
                            ) : (
                              <>
                                <span>Inspect Strategic Blueprint</span>
                                <ChevronRight className="w-3 h-3" />
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Gradient Fade Overlay */}
            <div 
              className={`pointer-events-none absolute bottom-0 left-0 right-0 h-20 sm:h-24 bg-gradient-to-t ${
                isLight 
                  ? 'from-[#fcfcfd] via-[#fcfcfd]/90 to-transparent' 
                  : 'from-[#000000] via-[#000000]/90 to-transparent'
              } z-20`} 
            />
          </div>
        )}

        {/* Tab 3: Strategic Playbooks & Operational Intelligence */}
        {activeTab === 'playbooks' && (
          <div className="relative w-full">
            <div className="overflow-y-auto min-h-0 max-h-[360px] sm:max-h-[385px] lg:max-h-[405px] pr-1 pb-14 space-y-3 scrollbar-thin animate-in fade-in duration-300">
              {/* Playbook Header */}
              <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                isLight ? 'bg-emerald-50/50 border-emerald-100' : 'bg-emerald-500/5 border-emerald-500/10'
              }`}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-600/20">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className={`text-sm font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>Strategic Playbooks & Deployment Guides</h4>
                    </div>
                    <p className={`text-[11px] leading-relaxed mt-0.5 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                      Operational frameworks for analytics, institutional tracking, and secure infrastructure deployment.
                    </p>
                  </div>
                </div>
              </div>

              {/* Playbook Grid */}
              <div className="grid grid-cols-1 gap-3">
                {STRATEGIC_PLAYBOOKS.map((pb) => {
                  const locked = isItemLocked(pb.id, 'archive');
                  const hasSpecificClearance = currentUserEntry?.scope === 'specific' && currentUserEntry.allowedItems?.includes(pb.id);

                  return (
                    <div
                      key={pb.id}
                      onClick={() => {
                        gateItem(pb.id, 'archive', pb.title, () => {
                          setSelectedPlaybook(pb);
                          trackAssetInteraction(pb.id, pb.title, 'Strategic Playbook');
                        });
                      }}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer hover:border-emerald-500/30 ${
                        isLight 
                          ? 'bg-white border-zinc-200 shadow-sm' 
                          : 'bg-white/[0.02] border-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isLight ? 'bg-emerald-50 text-emerald-700' : 'bg-emerald-500/10 text-emerald-400'
                          }`}>
                            {pb.category}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-500">{pb.badge}</span>
                          {hasSpecificClearance && (
                            <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[8px] font-bold border uppercase tracking-wider ${
                              isLight ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-purple-500/15 border-purple-500/30 text-purple-300'
                            }`}>
                              <KeyRound className="w-2.5 h-2.5 text-purple-400" />
                              <span>Clearance Granted</span>
                            </span>
                          )}
                          {locked && !hasSpecificClearance && (
                            <span className="inline-flex items-center gap-1 text-[9px] font-mono text-amber-500 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">
                              <Lock className="w-2.5 h-2.5" /> Locked
                            </span>
                          )}
                          {isAdmin && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleItemLock(pb.id, 'archive');
                              }}
                              className="p-1 rounded bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                              title={locked ? 'Unlock playbook' : 'Lock playbook'}
                            >
                              {locked ? <Lock className="w-2.5 h-2.5 text-amber-400" /> : <Unlock className="w-2.5 h-2.5 text-emerald-400" />}
                            </button>
                          )}
                        </div>
                      </div>

                      <h3 className={`text-base font-bold mb-2 ${isLight ? 'text-zinc-900' : 'text-white'}`}>{pb.title}</h3>
                      <p className={`text-[12px] leading-relaxed mb-5 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                        {pb.executiveSummary}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                        {pb.sections.map((section, sIdx) => (
                          <div key={sIdx} className="space-y-2">
                            <h4 className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{section.heading}</h4>
                            <div className="space-y-1.5">
                              {section.items.map((item, iIdx) => (
                                <div key={iIdx} className="text-[11px]">
                                  <strong className={`block ${isLight ? 'text-zinc-800' : 'text-zinc-200'}`}>{item.label}</strong>
                                  <span className={isLight ? 'text-zinc-500' : 'text-zinc-500'}>{item.description}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className={`p-3 rounded-xl border flex items-center justify-between ${
                        isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/[0.03] border-white/5'
                      }`}>
                        <div className="flex items-center gap-2 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span className={isLight ? 'text-zinc-700' : 'text-zinc-300'}>{pb.implementationOutcome}</span>
                        </div>
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            gateItem(pb.id, 'archive', pb.title, () => {
                              setSelectedPlaybook(pb);
                              trackAssetInteraction(pb.id, pb.title, 'Strategic Playbook');
                            });
                          }}
                          className={`text-[11px] font-bold hover:underline flex items-center gap-1 cursor-pointer ${
                            locked && !hasSpecificClearance ? 'text-amber-500 hover:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
                          }`}
                        >
                          {locked && !hasSpecificClearance ? (
                            <>
                              <Lock className="w-3 h-3" />
                              <span>Unlock Playbook</span>
                            </>
                          ) : (
                            <>
                              <span>Expand Playbook</span>
                              <ChevronRight className="w-3 h-3" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Gradient Fade Overlay */}
            <div 
              className={`pointer-events-none absolute bottom-0 left-0 right-0 h-20 sm:h-24 bg-gradient-to-t ${
                isLight 
                  ? 'from-[#fcfcfd] via-[#fcfcfd]/90 to-transparent' 
                  : 'from-[#000000] via-[#000000]/90 to-transparent'
              } z-20`} 
            />
          </div>
        )}

        {/* Tab 4: Historical Archive & Patent Catalog */}
        {activeTab === 'archive' && (
          <div className="flex-1 flex flex-col min-h-0 animate-in fade-in duration-300">
            {/* Filters Bar */}
            <div className={`max-w-4xl mx-auto mb-2 flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-lg backdrop-blur-xl border w-full shrink-0 ${
              isLight ? 'bg-white border-zinc-200 shadow-2xs' : 'bg-white/[0.02] border-white/10'
            }`}>
              <div 
                ref={typeScroll.scrollRef}
                onMouseMove={typeScroll.onMouseMove}
                onMouseLeave={typeScroll.onMouseLeave}
                className="flex flex-nowrap items-center justify-center gap-1 overflow-x-auto cursor-ew-resize select-none"
              >
                <span className={`text-[10px] font-medium mr-1 flex items-center space-x-1 whitespace-nowrap ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  <Filter className="w-3 h-3" />
                  <span>Type:</span>
                </span>
                {types.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap transition-all ${
                      selectedType === t
                        ? 'bg-blue-600 text-white shadow'
                        : (isLight ? 'bg-zinc-100 text-zinc-700 hover:text-black border border-zinc-200' : 'bg-white/[0.04] text-zinc-400 hover:text-white')
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="hidden sm:block w-px h-3.5 bg-zinc-200 dark:bg-white/10 mx-1" />

              <div 
                ref={yearScroll.scrollRef}
                onMouseMove={yearScroll.onMouseMove}
                onMouseLeave={yearScroll.onMouseLeave}
                className="flex flex-nowrap items-center justify-center gap-1 overflow-x-auto cursor-ew-resize select-none"
              >
                <span className={`text-[10px] font-medium mr-1 flex items-center space-x-1 whitespace-nowrap ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  <Calendar className="w-3 h-3" />
                  <span>Year:</span>
                </span>
                {years.map((y) => (
                  <button
                    key={y}
                    onClick={() => setSelectedYear(y)}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap transition-all ${
                      selectedYear === y
                        ? (isLight ? 'bg-zinc-900 text-white shadow' : 'bg-white text-black shadow')
                        : (isLight ? 'bg-zinc-100 text-zinc-700 hover:text-black border border-zinc-200' : 'bg-white/[0.04] text-zinc-400 hover:text-white')
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Archive Grid */}
            <div className="max-h-[46vh] sm:max-h-[48vh] overflow-y-auto pr-1 sm:pr-2 flex-1">
              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
                {filteredArchive.map((item) => {
                  const locked = isItemLocked(item.id, 'archive');
                  const hasSpecificClearance = currentUserEntry?.scope === 'specific' && currentUserEntry.allowedItems?.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        gateItem(item.id, 'archive', item.title, () => {
                          if (item.link) window.open(item.link, '_blank');
                        });
                      }}
                      className={`rounded-xl p-3 sm:p-3.5 backdrop-blur-xl transition-all group flex flex-col justify-between border cursor-pointer ${
                        isLight 
                          ? 'bg-white border-zinc-200 hover:border-zinc-300 shadow-2xs' 
                          : 'bg-white/[0.02] border-white/10 hover:border-white/25'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center space-x-1.5 border ${
                            isLight ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-white/[0.05] border-white/10 text-blue-400'
                          }`}>
                            <span>{item.type}</span>
                            {item.type === 'Patent' && (
                              <span className="text-[9px] bg-blue-500/20 text-blue-400 px-1 py-0.2 rounded font-mono">® TM</span>
                            )}
                          </span>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {hasSpecificClearance && (
                              <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[8px] font-bold border uppercase tracking-wider ${
                                isLight ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-purple-500/15 border-purple-500/30 text-purple-300'
                              }`}>
                                <KeyRound className="w-2.5 h-2.5 text-purple-400" />
                                <span>Clearance Granted</span>
                              </span>
                            )}
                            {locked && !hasSpecificClearance && (
                              <span className="inline-flex items-center gap-1 text-[9px] font-mono text-amber-500 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">
                                <Lock className="w-2.5 h-2.5" /> Locked
                              </span>
                            )}
                            {isAdmin && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleItemLock(item.id, 'archive');
                                }}
                                className="p-1 rounded bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                                title={locked ? 'Unlock item' : 'Lock item'}
                              >
                                {locked ? <Lock className="w-2.5 h-2.5 text-amber-400" /> : <Unlock className="w-2.5 h-2.5 text-emerald-400" />}
                              </button>
                            )}
                            <span className={`text-[10px] font-mono ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>{item.year}</span>
                          </div>
                        </div>

                        <h4 className={`text-xs sm:text-sm font-bold transition-colors tracking-tight ${isLight ? 'text-zinc-900 group-hover:text-blue-600' : 'text-white group-hover:text-blue-300'}`}>
                          {item.title}
                        </h4>

                        <p className={`text-[11px] leading-relaxed line-clamp-2 ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                          {item.description}
                        </p>
                      </div>

                      <div className={`pt-2 border-t space-y-1.5 mt-2 ${isLight ? 'border-zinc-100' : 'border-white/5'}`}>
                        <div className="flex flex-wrap gap-1">
                          {item.tags.map((t, i) => (
                            <span key={i} className={`text-[9px] font-medium px-1.5 py-0.5 rounded-md border ${
                              isLight ? 'bg-zinc-50 border-zinc-200 text-zinc-600' : 'bg-white/[0.03] border-white/5 text-zinc-400'
                            }`}>
                              #{t}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-0.5">
                          {item.stars ? (
                            <div className="flex items-center space-x-1 text-[11px] text-amber-500">
                              <Star className="w-3 h-3 fill-amber-500" />
                              <span>{item.stars.toLocaleString()} stars</span>
                            </div>
                          ) : <div />}

                          {locked && !hasSpecificClearance ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                gateItem(item.id, 'archive', item.title, () => {
                                  if (item.link) window.open(item.link, '_blank');
                                });
                              }}
                              className="flex items-center space-x-1 text-[11px] font-medium text-amber-500 hover:text-amber-400 hover:underline cursor-pointer bg-transparent border-none p-0"
                            >
                              <Lock className="w-3 h-3" />
                              <span>Unlock Item</span>
                            </button>
                          ) : item.link ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(item.link, '_blank');
                              }}
                              className="flex items-center space-x-1 text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer bg-transparent border-none p-0"
                            >
                              <span>View Source</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          ) : (
                            <span className="text-[10px] font-mono text-zinc-400">Archived Record</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredArchive.length === 0 && (
                <div className="text-center py-8 text-zinc-400">
                  <ArchiveIcon className="w-8 h-8 mx-auto mb-1.5 opacity-40" />
                  <p className="text-xs">No archive records match the selected filters.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Blueprint Detail Modal */}
      {selectedBlueprint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className={`max-w-2xl w-full rounded-2xl border p-5 max-h-[85vh] overflow-y-auto space-y-4 ${
            isLight ? 'bg-white border-zinc-300 text-zinc-900' : 'bg-zinc-950 border-white/20 text-white'
          }`}>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-blue-500 uppercase font-bold tracking-wider">
                  {selectedBlueprint.regulatoryStandard}
                </span>
                <h3 className="text-base sm:text-lg font-bold mt-1">{selectedBlueprint.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedBlueprint(null)}
                className="p-1.5 rounded-lg border text-xs text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-zinc-200 space-y-1">
              <strong className="text-blue-400 font-bold block">Board & Audit Committee Impact:</strong>
              <p>{selectedBlueprint.executiveTakeaway}</p>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-zinc-300">Architectural Description & Scope:</h4>
              <p className="text-zinc-400 leading-relaxed">{selectedBlueprint.description}</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-xs text-zinc-300">Core Governance & Control Specifications:</h4>
              <div className="space-y-1.5">
                {selectedBlueprint.coreComponents.map((comp, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-zinc-300 p-2 rounded-lg bg-white/5 border border-white/5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="font-mono text-zinc-500">{selectedBlueprint.version}</span>
              <button
                onClick={() => setSelectedBlueprint(null)}
                className="px-4 py-1.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500"
              >
                Close Briefing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Aspirational Strategic Roadmap Detail Modal */}
      {selectedAspirational && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className={`max-w-3xl w-full rounded-2xl border p-5 sm:p-6 max-h-[88vh] overflow-y-auto space-y-4 ${
            isLight ? 'bg-white border-zinc-300 text-zinc-900 shadow-2xl' : 'bg-zinc-950 border-white/20 text-white shadow-2xl'
          }`}>
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 border-b pb-3 border-zinc-200 dark:border-white/10">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    {selectedAspirational.category}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/10 text-zinc-600 dark:text-zinc-300">
                    {selectedAspirational.badge}
                  </span>
                  <span className="text-[10px] font-mono text-indigo-500 font-semibold">
                    {selectedAspirational.targetHorizon}
                  </span>
                </div>
                <h3 className="text-base sm:text-xl font-bold tracking-tight">{selectedAspirational.title}</h3>
                <div className="text-xs text-zinc-500 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Target Mandate: <strong className="text-zinc-700 dark:text-zinc-300">{selectedAspirational.targetRole}</strong></span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedAspirational(null)}
                className="p-1.5 rounded-lg border text-xs text-zinc-400 hover:text-white shrink-0 hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            {/* Fiduciary Takeaway Callout */}
            <div className={`p-3.5 rounded-xl border text-xs space-y-1 ${
              isLight ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-zinc-800' : 'bg-blue-950/20 border-blue-500/30 text-zinc-200'
            }`}>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <strong className="text-blue-700 dark:text-blue-400 font-bold">Fiduciary & Supervisory Impact:</strong>
              </div>
              <p className="leading-relaxed pl-6">{selectedAspirational.fiduciaryImpact}</p>
            </div>

            {/* Executive Summary */}
            <div className="space-y-1.5 text-xs">
              <h4 className="font-bold text-zinc-700 dark:text-zinc-300">Strategic Horizon Architecture:</h4>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{selectedAspirational.executiveSummary}</p>
            </div>

            {/* Special Section: 1-Page Board Dossier Preview */}
            {selectedAspirational.id === 'asp-board-brief' && (
              <div className={`p-4 rounded-xl border space-y-3 ${
                isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/[0.03] border-white/10'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      1-Page Boardroom Executive Dossier Format
                    </span>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 shadow-sm"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Dossier / PDF</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-lg border bg-white dark:bg-black text-xs space-y-3 border-zinc-200 dark:border-white/10">
                  <div className="flex items-start justify-between border-b pb-2 border-zinc-200 dark:border-white/10">
                    <div>
                      <h5 className="font-bold text-sm text-zinc-900 dark:text-white">{PERSONAL_INFO.name}</h5>
                      <p className="text-[11px] text-zinc-500">Former Senior Vice President — Goldman Sachs • 21+ Years Cyber Leadership</p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 font-bold">
                      CONFIDENTIAL EXECUTIVE BRIEF
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px]">
                    <div className="p-2 rounded bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/5">
                      <span className="text-zinc-400 uppercase font-mono block">Tenure & Scope</span>
                      <strong className="text-zinc-800 dark:text-zinc-200 text-xs">14 Years Goldman Sachs</strong>
                      <p className="text-zinc-500 mt-0.5">30+ Global Engineers • NY / London / BLR</p>
                    </div>
                    <div className="p-2 rounded bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/5">
                      <span className="text-zinc-400 uppercase font-mono block">Capital Stewardship</span>
                      <strong className="text-zinc-800 dark:text-zinc-200 text-xs">$18.5M Program Portfolio</strong>
                      <p className="text-zinc-500 mt-0.5">Zero Trust • Privileged Access • Cloud IAM</p>
                    </div>
                    <div className="p-2 rounded bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/5">
                      <span className="text-zinc-400 uppercase font-mono block">Supervisory Audit</span>
                      <strong className="text-emerald-600 dark:text-emerald-400 text-xs">100% Clean Audit Record</strong>
                      <p className="text-zinc-500 mt-0.5">US Fed, UK PRA, SEC Form 8-K Ready</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Special Section: Board Cyber Risk Dashboard Preview */}
            {selectedAspirational.id === 'asp-board-dashboard' && (
              <div className={`p-4 rounded-xl border space-y-3 ${
                isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/[0.03] border-white/10'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      FAIR™ Risk Economics & Zero Trust Maturity Metrics
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                    Audit Committee Calibrated
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-lg bg-white dark:bg-black border border-zinc-200 dark:border-white/10">
                    <span className="text-[10px] text-zinc-400 uppercase block">ALE Reduction</span>
                    <strong className="text-emerald-600 dark:text-emerald-400 text-sm font-mono block mt-0.5">-$14.2M</strong>
                    <span className="text-[9px] text-zinc-500">-78% Financial Exposure</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-black border border-zinc-200 dark:border-white/10">
                    <span className="text-[10px] text-zinc-400 uppercase block">ZTMM Score</span>
                    <strong className="text-blue-600 dark:text-blue-400 text-sm font-mono block mt-0.5">96%</strong>
                    <span className="text-[9px] text-zinc-500">NIST SP 800-207</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-black border border-zinc-200 dark:border-white/10">
                    <span className="text-[10px] text-zinc-400 uppercase block">FIDO2 Adoption</span>
                    <strong className="text-indigo-600 dark:text-indigo-400 text-sm font-mono block mt-0.5">99.4%</strong>
                    <span className="text-[9px] text-zinc-500">Phishing Resistant</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-black border border-zinc-200 dark:border-white/10">
                    <span className="text-[10px] text-zinc-400 uppercase block">SEC Item 1.05</span>
                    <strong className="text-purple-600 dark:text-purple-400 text-sm font-mono block mt-0.5">100%</strong>
                    <span className="text-[9px] text-zinc-500">4-Day Response Protocol</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1 text-[11px]">
                  <div className="flex items-center justify-between text-zinc-500 text-[10px]">
                    <span>Identity Fabric Maturity (CISA Pillar 1)</span>
                    <span className="font-mono font-bold text-blue-500">98%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full w-[98%]" />
                  </div>

                  <div className="flex items-center justify-between text-zinc-500 text-[10px] pt-1">
                    <span>Privileged Access Elimination (Zero Standing Rights)</span>
                    <span className="font-mono font-bold text-emerald-500">95%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[95%]" />
                  </div>
                </div>
              </div>
            )}

            {/* Special Section: First 90 Days Command Timeline */}
            {selectedAspirational.id === 'asp-first-90-days' && (
              <div className={`p-4 rounded-xl border space-y-2.5 ${
                isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/[0.03] border-white/10'
              }`}>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Executive 30-60-90 Day Command Milestone Architecture
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg border bg-white dark:bg-black border-blue-500/20">
                    <span className="font-mono text-blue-500 text-[10px] font-bold block">Phase 1 (Days 1–30)</span>
                    <strong className="text-zinc-800 dark:text-zinc-200 block mt-0.5">Triage & Audit Baseline</strong>
                    <p className="text-[10.5px] text-zinc-500 mt-1">Crown-jewel mapping, supervisory audit review, Architecture Review Board cadence.</p>
                  </div>
                  <div className="p-2.5 rounded-lg border bg-white dark:bg-black border-indigo-500/20">
                    <span className="font-mono text-indigo-500 text-[10px] font-bold block">Phase 2 (Days 31–60)</span>
                    <strong className="text-zinc-800 dark:text-zinc-200 block mt-0.5">Zero Trust Acceleration</strong>
                    <p className="text-[10.5px] text-zinc-500 mt-1">Standing privilege removal, GenAI DLP guardrails, CSPM drift remediation.</p>
                  </div>
                  <div className="p-2.5 rounded-lg border bg-white dark:bg-black border-purple-500/20">
                    <span className="font-mono text-purple-500 text-[10px] font-bold block">Phase 3 (Days 61–90)</span>
                    <strong className="text-zinc-800 dark:text-zinc-200 block mt-0.5">Board Alignment & TOM</strong>
                    <p className="text-[10.5px] text-zinc-500 mt-1">Target Operating Model, Audit Committee cyber dashboard, continuous compliance.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Special Section: AI Governance */}
            {selectedAspirational.id === 'asp-ai-governance' && (
              <div className={`p-4 rounded-xl border space-y-2.5 ${
                isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/[0.03] border-white/10'
              }`}>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-purple-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    NIST AI RMF 1.0 & ISO 42001 Real-Time Prompt DLP Architecture
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg border bg-white dark:bg-black border-zinc-200 dark:border-white/10">
                    <span className="font-mono text-purple-500 text-[10px] font-bold block">Tier 1: Autonomous Models</span>
                    <p className="text-[10.5px] text-zinc-500 mt-1">Automated financial execution, sandbox VPC isolation, human-in-the-loop validation.</p>
                  </div>
                  <div className="p-2.5 rounded-lg border bg-white dark:bg-black border-zinc-200 dark:border-white/10">
                    <span className="font-mono text-blue-500 text-[10px] font-bold block">Tier 2: Analytical Assist</span>
                    <p className="text-[10.5px] text-zinc-500 mt-1">Ephemeral memory windows, continuous prompt sanitization, full transaction logging.</p>
                  </div>
                  <div className="p-2.5 rounded-lg border bg-white dark:bg-black border-zinc-200 dark:border-white/10">
                    <span className="font-mono text-emerald-500 text-[10px] font-bold block">Tier 3: Public Knowledge</span>
                    <p className="text-[10.5px] text-zinc-500 mt-1">Read-only retrieval grounding, rate-limited queries, zero MNPI ingestion.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Phases Breakdown */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                Execution Pillars & Detailed Operational Runbooks:
              </h4>
              <div className="space-y-2.5">
                {selectedAspirational.phases.map((ph, i) => (
                  <div key={i} className={`p-3 rounded-xl border ${
                    isLight ? 'bg-zinc-50/70 border-zinc-200' : 'bg-white/[0.02] border-white/5'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        {ph.phase}
                      </span>
                      <strong className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{ph.title}</strong>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {ph.items.map((item, j) => (
                        <div key={j} className="flex items-start gap-1.5 text-[11px] text-zinc-600 dark:text-zinc-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Deliverables */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                Formal Committee Artifacts & Governance Deliverables:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedAspirational.keyDeliverables.map((deliv, k) => (
                  <div key={k} className="flex items-center gap-2 text-xs p-2.5 rounded-lg bg-blue-500/5 border border-blue-500/10">
                    <FileCheck className="w-4 h-4 text-blue-500 shrink-0" />
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium">{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-3 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between text-xs">
              <span className="font-mono text-zinc-500">{selectedAspirational.status}</span>
              <div className="flex items-center gap-2">
                {onOpenContact && (
                  <button
                    onClick={() => {
                      setSelectedAspirational(null);
                      onOpenContact();
                    }}
                    className="px-3.5 py-1.5 rounded-xl border border-blue-500/30 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-500/10"
                  >
                    Discuss Mandate
                  </button>
                )}
                <button
                  onClick={() => setSelectedAspirational(null)}
                  className="px-4 py-1.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500"
                >
                  Close Blueprint
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Integrated Compact Executive Footer */}
      <div className={`pt-2 mt-1.5 border-t shrink-0 ${isLight ? 'border-zinc-200 text-zinc-600' : 'border-white/10 text-zinc-400'}`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5 text-xs py-0.5">
          <div className="flex flex-wrap items-center space-x-2 sm:space-x-2.5">
            <span className={`font-semibold ${isLight ? 'text-zinc-900' : 'text-white'}`}>{PERSONAL_INFO.name}</span>
            <span className="text-[10px] font-bold opacity-40">Executive Portfolio Vault</span>
            
            {/* Light Grey Separator */}
            <div className={`h-3 w-px ${isLight ? 'bg-zinc-300' : 'bg-white/20'}`} />

            {/* Social & Contact Icons */}
            <div className="flex items-center space-x-3.5 pl-1">
              <a 
                href={PERSONAL_INFO.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`hover:text-blue-500 transition-colors p-0.5 ${isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-zinc-400 hover:text-white'}`}
                title="GitHub Profile"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a 
                href={PERSONAL_INFO.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`hover:text-blue-500 transition-colors p-0.5 ${isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-zinc-400 hover:text-white'}`}
                title="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              {onOpenContact && (
                <button 
                  onClick={onOpenContact} 
                  className={`hover:text-blue-500 transition-colors p-0.5 ${isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-zinc-400 hover:text-white'}`}
                  title="Get in Touch via Email"
                >
                  <Mail className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
          
          {onScrollToTop && (
            <button
              onClick={onScrollToTop}
              className={`flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium border transition-colors shrink-0 ${
                isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-800 hover:bg-zinc-200' : 'bg-white/[0.05] border-white/10 text-zinc-300 hover:bg-white/[0.1]'
              }`}
              title="Scroll to Top"
            >
              <span>Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

