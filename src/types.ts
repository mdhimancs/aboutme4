export interface CareerMilestone {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  achievements: string[];
  technologies: string[];
  category: string;
  logo?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  featured?: boolean;
  views: number;
  likes: number;
}

export interface ArchiveItem {
  id: string;
  title: string;
  type: 'Paper' | 'Open Source' | 'Keynote' | 'Patent' | 'Legacy Project' | 'Aspirational';
  year: number;
  description: string;
  link?: string;
  stars?: number;
  tags: string[];
}

export interface ExecutiveCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  businessScale: string;
  executiveImpact: string;
  impactMetrics: { label: string; value: string; desc?: string }[];
  challenge: string;
  strategy: string[];
  architectureHighlights: string[];
  businessOutcome: string;
  financialAndAuditRoi: string;
  tags: string[];
  status: 'Operational' | 'Active' | 'Delivered' | 'Enterprise Standard';
  leadershipRole: string;
  fullBriefingMarkdown?: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: { name: string; level: number; highlight?: string }[];
}
