const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /const SECTION_LABELS: Record<SectionId, string> = \{[\s\S]*?\};/;
const replacement = `const SECTION_LABELS: Record<SectionId, string> = {
  overview: 'Overview',
  bio: 'Executive Bio',
  competencies: 'Core Competencies',
  projects: 'Key Projects',
  career: 'Career Journey',
  blog: 'Technical Blog',
  beyond: 'Beyond the Keyboard',
  archive: 'Archives & Patents'
};`;

content = content.replace(regex, replacement);
fs.writeFileSync('src/App.tsx', content);
