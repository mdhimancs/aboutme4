const fs = require('fs');
const content = fs.readFileSync('src/data/portfolioData.ts', 'utf8');

const combinedAchievements = [
  // Original 4 points
  "Architected enterprise Zero Trust and cloud-native IAM strategy across hybrid multi-region environments protecting mission-critical institutional banking systems.",
  "Spearheaded identity federation, OAuth 2.0 / OIDC, FIDO2 / WebAuthn passwordless authentication, and Tier-0 PAM credential isolation.",
  "Directed architectural governance for privileged access vaults (CyberArk), JIT entitlement engines, and fine-grained authorization (ABAC/RBAC).",
  "Formulated AI threat mitigation, data protection posture, and regulatory compliance standards (SOC 2, ISO 27001, PCI-DSS, NIST).",
  
  // New 9 points aligned and added
  "Led global programs in AI Security, strengthening AI risk management, responsible adoption, security controls and regulatory readiness aligned to NIST AI-RMF.",
  "Modernized Authentication and Authorization platforms adopting OAuth 2.0, OIDC, SAML, JWT, SSO and MFA, achieving 99.9% platform availability while reducing security debt and strengthening secure-by-design architecture.",
  "Led 100% Zero Trust and Identity Security transformation spanning IAM, PAM, IGA, JML, birthright access, JIT access, federation, RBAC/ABAC/PBAC, access certification and segregation of duties across hybrid and multi-cloud environments.",
  "Implemented enterprise security and technology architecture across AWS, Azure, IAM, PAM, CNAPP, CSPM, CASB, SASE, DNS and PKI, achieving container resilience, risk mitigation and meeting regulatory requirements.",
  "Advanced AI-led workflows in SIEM, SOAR/XSOAR, EDR, NDR, MDR, XDR and UEBA, effectively processing 2B+ security events per quarter and increasing detection, correlation, response and operational efficiency.",
  "Improved global SOC, Cyber Threat Intelligence, Threat Hunting, Incident Response and Cyber Resilience programs, aligned with NIST CSF and MITRE ATT&CK, strengthening proactive detection, 100% containment and recovery.",
  "Implemented secure SDLC in engineering pipelines and workflow across Cloud, Network, Application, Data, Endpoint and Identity, embedding OWASP Secure SDLC, SAST, DAST, SCA, API and container security.",
  "Established executive cyber-risk governance through security metrics, KRIs, vulnerability remediation, audits, security-debt management and executive reporting in partnership with Engineering, Risk and Compliance teams.",
  "Led 30+ global engineers and strategic technology partners/MSSPs, overseeing 24×7 security operations and driving resilience, service quality, cost efficiency and continuous improvement."
];

// Let's find gs-svp and its achievements array.
const startMarker = 'id: "gs-svp"';
const startIndex = content.indexOf(startMarker);
if (startIndex === -1) {
    console.error("gs-svp not found");
    process.exit(1);
}

const achievementsStart = content.indexOf('achievements: [', startIndex);
const achievementsEnd = content.indexOf('],', achievementsStart);

const updatedContent = content.substring(0, achievementsStart) + 
  'achievements: [\n      "' + combinedAchievements.join('",\n      "') + '"\n    ]' + 
  content.substring(achievementsEnd + 1);

fs.writeFileSync('src/data/portfolioData.ts', updatedContent, 'utf8');
console.log("Updated combined achievements successfully");
