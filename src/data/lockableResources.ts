import { EXECUTIVE_CASE_STUDIES } from './caseStudiesData';
import { BLOG_POSTS, ARCHIVE_ITEMS } from './portfolioData';

export type SectionLockId = 'case-studies' | 'publications' | 'archives';

export interface LockableSection {
  id: SectionLockId;
  name: string;
  description: string;
  count: number;
}

export interface LockableItem {
  id: string;
  title: string;
  section: SectionLockId;
  category: string;
  badge?: string;
  summary?: string;
}

export const LOCKABLE_SECTIONS: LockableSection[] = [
  {
    id: 'case-studies',
    name: 'Case Studies',
    description: 'Executive transformation programs, architecture briefings, and defense case studies',
    count: 6
  },
  {
    id: 'publications',
    name: 'Publications',
    description: 'Technical whitepapers, research articles, and regulatory governance publications',
    count: BLOG_POSTS.length
  },
  {
    id: 'archives',
    name: 'Archives & Patents',
    description: 'Executive blueprints, aspirational roadmaps, strategic playbooks, and patent catalog',
    count: 4 + 6 + 5 + ARCHIVE_ITEMS.length
  }
];

// Additional archive items defined directly in Archive.tsx
const ARCHIVE_BLUEPRINTS = [
  { id: 'bp-ztmm', title: 'Enterprise Zero Trust Maturity & Implementation Matrix', category: 'Executive Blueprint' },
  { id: 'bp-rag-guardrails', title: 'GenAI Enterprise RAG Security & Data Leakage Guardrail Topology', category: 'Executive Blueprint' },
  { id: 'bp-sec-8k', title: 'SEC Item 1.05 & 8-K Material Incident Command Blueprint', category: 'Executive Blueprint' },
  { id: 'bp-cloud-pam', title: 'Multi-Cloud Ephemeral PAM & Workload Identity Federation Architecture', category: 'Executive Blueprint' },
  { id: 'bp-adr-ciso', title: 'CISO Enterprise Architecture Decision Record (ADR) Framework', category: 'Executive Blueprint' },
];

const ARCHIVE_ASPIRATIONAL = [
  { id: 'horizon-ciso', title: 'CISO & dyCISO Strategic Horizons (2026–2028)', category: 'Strategic Horizon' },
  { id: 'patent-session-binding', title: 'Autonomous Continuous Identity Verification & Dynamic Risk-Based Session Binding', category: 'Patent in the Making' },
  { id: 'ar-ciso-2027', title: 'Zero Standing Privilege (ZSP) Enterprise Fabric', category: 'Aspirational Roadmap' },
  { id: 'ar-nhi-federation', title: 'AI Agent & Non-Human Identity (NHI) Cryptographic Governance', category: 'Aspirational Roadmap' },
  { id: 'ar-crypto-quantum', title: 'Post-Quantum Cryptography (PQC) Migration Roadmap', category: 'Aspirational Roadmap' },
  { id: 'ar-board-risk-exchange', title: 'Board Cyber Risk Quantification & SEC 8-K Real-Time Telemetry', category: 'Aspirational Roadmap' },
];

const ARCHIVE_PLAYBOOKS = [
  { id: 'pb-analytics-deployment', title: 'Deployment Guide: Executive Analytics & Access Governance', category: 'Strategic Playbook' },
  { id: 'pb-fair-quant-risk', title: 'FAIR™ Quantitative Risk Analysis & Capital Allocation Playbook', category: 'Strategic Playbook' },
  { id: 'pb-sox404-iam-automation', title: 'SOX 404 Automated Identity Governance & JML Reconciliation Playbook', category: 'Strategic Playbook' },
  { id: 'pb-cloud-workload-attestation', title: 'Multi-Cloud Cryptographic SPIFFE/SPIRE Attestation Playbook', category: 'Strategic Playbook' },
  { id: 'pb-ma-carveout-day1', title: 'Enterprise M&A Cyber Due Diligence & Day-1 Network Carve-Out Runbook', category: 'Strategic Playbook' },
];

/**
 * Returns all lockable items across the entire portfolio
 */
export function getAllLockableResources(): LockableItem[] {
  const list: LockableItem[] = [];

  // 1. Case Studies
  for (const cs of EXECUTIVE_CASE_STUDIES) {
    list.push({
      id: cs.id,
      title: cs.title,
      section: 'case-studies',
      category: cs.category,
      badge: 'Case Study',
      summary: cs.subtitle
    });
  }

  // 2. Publications
  for (const post of BLOG_POSTS) {
    list.push({
      id: post.id,
      title: post.title,
      section: 'publications',
      category: post.category,
      badge: post.featured ? 'Flagship Whitepaper' : 'Article',
      summary: post.excerpt
    });
  }

  // 3. Archives - Blueprints
  for (const bp of ARCHIVE_BLUEPRINTS) {
    list.push({
      id: bp.id,
      title: bp.title,
      section: 'archives',
      category: bp.category,
      badge: 'Blueprint'
    });
  }

  // 4. Archives - Aspirational
  for (const ar of ARCHIVE_ASPIRATIONAL) {
    list.push({
      id: ar.id,
      title: ar.title,
      section: 'archives',
      category: ar.category,
      badge: 'Roadmap'
    });
  }

  // 5. Archives - Playbooks
  for (const pb of ARCHIVE_PLAYBOOKS) {
    list.push({
      id: pb.id,
      title: pb.title,
      section: 'archives',
      category: pb.category,
      badge: 'Playbook'
    });
  }

  // 6. Archives - Historical & Patents
  for (const arc of ARCHIVE_ITEMS) {
    list.push({
      id: arc.id,
      title: arc.title,
      section: 'archives',
      category: arc.type,
      badge: arc.type,
      summary: arc.description
    });
  }

  return list;
}

/**
 * Find a resource by its identifier
 */
export function getResourceById(id: string): LockableItem | undefined {
  return getAllLockableResources().find(item => item.id === id);
}
