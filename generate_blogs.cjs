const fs = require('fs');

const dateStart = new Date(2026, 7, 15); // August 15, 2026
const blogs = [];

const categories = {
  "Cybersecurity": [
    "Evolving Threat Landscape in 202X",
    "Building Resilience in Cybersecurity",
    "Automating Incident Response",
    "Threat Modeling for Modern Architectures"
  ],
  "IAM": [
    "Next-Gen IAM: Identity as the Perimeter",
    "Decentralized Identity and Verifiable Credentials",
    "Optimizing Identity Governance and Administration",
    "The Future of Access Management"
  ],
  "PAM": [
    "Securing Privileged Access in Multi-Cloud Environments",
    "Just-In-Time (JIT) PAM Architecture",
    "Mitigating Insider Threats with PAM",
    "Integrating PAM with DevOps Pipelines"
  ],
  "Zero Trust": [
    "Practical Guide to Zero Trust Architecture",
    "Implementing Micro-Segmentation",
    "Zero Trust Network Access (ZTNA) Deep Dive",
    "Continuous Authentication and Trust"
  ],
  "CASB": [
    "Controlling Shadow IT with CASB",
    "Securing SaaS Applications Using CASB",
    "CASB and Data Protection Policies",
    "Integrating CASB with Enterprise Firewalls"
  ],
  "CNAPP": [
    "The Rise of Cloud-Native Application Protection Platforms",
    "Unifying CSPM, CIEM, and CWPP into CNAPP",
    "Shift-Left Security with CNAPP",
    "Lifecycle Security for Cloud-Native Apps"
  ],
  "SASE": [
    "SASE: Converging Network and Security",
    "Architecting Secure Access Service Edge",
    "SD-WAN and Security: The SASE Journey",
    "Optimizing User Experience with SASE"
  ],
  "CSPM": [
    "Automating Cloud Security Posture Management",
    "Continuous Compliance in the Cloud",
    "Detecting Cloud Misconfigurations at Scale",
    "Multi-Cloud CSPM Strategies"
  ],
  "DLP": [
    "Modern Data Loss Prevention in a Borderless World",
    "Context-Aware DLP Policies",
    "Protecting Intellectual Property with Advanced DLP",
    "Endpoint vs. Network DLP"
  ],
  "AWS": [
    "Architecting Secure AWS Landing Zones",
    "Mastering AWS IAM Policies and Roles",
    "Securing Amazon EKS Clusters",
    "AWS Security Hub and GuardDuty Best Practices"
  ],
  "Containers": [
    "Container Security from Build to Runtime",
    "Hardening Kubernetes Architectures",
    "Secrets Management in Containerized Apps",
    "Runtime Threat Detection in Containers"
  ],
  "GCP": [
    "Google Cloud Platform Security Fundamentals",
    "BeyondCorp: Zero Trust on GCP",
    "Securing GCP Serverless Functions",
    "GCP Resource Hierarchy and IAM Constraints"
  ],
  "Azure": [
    "Azure Active Directory Security Best Practices",
    "Securing Azure Virtual Networks",
    "Microsoft Defender for Cloud Overview",
    "Azure Policy and Governance"
  ],
  "Data Science": [
    "Leveraging Data Science for Threat Detection",
    "Anomaly Detection Using Machine Learning",
    "Predictive Analytics in Cybersecurity",
    "Building Data Pipelines for Security Telemetry"
  ],
  "Artificial Intelligence": [
    "Generative AI in Cybersecurity Operations",
    "Securing AI and LLM Workloads",
    "Adversarial AI: Defending Against Smart Attacks",
    "AI-Driven SOC Automation"
  ]
};

const topicKeys = Object.keys(categories);

for (let i = 0; i < 96; i++) {
  const d = new Date(dateStart);
  d.setMonth(dateStart.getMonth() - i);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dateStr = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

  const topic = topicKeys[i % topicKeys.length];
  const titles = categories[topic];
  const title = titles[Math.floor(i / topicKeys.length) % titles.length] || `Mastering ${topic} in the Enterprise`;
  
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const excerpt = `A deep dive into ${topic} strategies, exploring how modern enterprises are tackling challenges in ${title.toLowerCase()}.`;
  
  const content = `
# ${title}

${topic} has become a cornerstone of modern technological infrastructure. In this comprehensive guide, we explore its evolution and practical implementation patterns tailored for large-scale enterprises.

## The Architecture of ${topic}
Implementing ${topic} effectively requires a combination of strong governance, automated tooling, and continuous monitoring. We must shift our perspective from legacy perimeter-based models to identity-centric and data-centric paradigms.

## Key Takeaways
1. **Automation:** Leveraging code-driven approaches.
2. **Resilience:** Ensuring highly available and fault-tolerant architectures.
3. **Continuous Monitoring:** Never assuming a static state of security.

> "The true measure of a robust ${topic} implementation is not just preventing incidents, but responding to them with precision and agility."

Explore our in-depth methodologies in the sections above to rethink your enterprise approach.
`.trim();

  const readTime = `${Math.floor(Math.random() * 8) + 5} min read`;
  
  const tags = [topic.replace(/ /g, ''), "Architecture", "EnterpriseSecurity"];
  
  const featured = i < 4; // feature the first 4 latest blogs
  
  const views = Math.floor(Math.random() * 20000) + 1000;
  const likes = Math.floor(Math.random() * 1500) + 100;

  blogs.push(`  {
    id: "bp-${96 - i}",
    title: "${title}",
    slug: "${slug}",
    excerpt: "${excerpt}",
    content: \`${content}\`,
    date: "${dateStr}",
    readTime: "${readTime}",
    category: "${topic}",
    tags: ${JSON.stringify(tags)},
    author: { name: "Munish Dhiman", role: "Architecting Cybersecurity & Identity Access Management", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
    featured: ${featured},
    views: ${views},
    likes: ${likes}
  }`);
}

const arrayStr = `export const BLOG_POSTS: BlogPost[] = [\n${blogs.join(',\n')}\n];`;

const fileContent = fs.readFileSync('src/data/portfolioData.ts', 'utf8');
const regex = /export const BLOG_POSTS: BlogPost\[\] = \[\s*[\s\S]*?\s*\];/;
const newContent = fileContent.replace(regex, arrayStr);

fs.writeFileSync('src/data/portfolioData.ts', newContent, 'utf8');
console.log("Replaced successfully!");
