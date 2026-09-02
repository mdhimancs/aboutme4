const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Imports
content = content.replace(
  "import { Archive } from './components/Archive';",
  "import { Archive } from './components/Archive';\nimport { Projects } from './components/Projects';\nimport { BeyondKeyboard } from './components/BeyondKeyboard';"
);

// Sections
content = content.replace(
  "const SECTIONS = ['overview', 'bio', 'competencies', 'career', 'blog', 'archive'] as const;",
  "const SECTIONS = ['overview', 'bio', 'competencies', 'projects', 'career', 'blog', 'beyond', 'archive'] as const;"
);

// SECTION_LABELS
content = content.replace(
  "  archive: 'Archives & Patents'\n};",
  "  projects: 'Key Projects',\n  career: 'Career Journey',\n  blog: 'Technical Blog',\n  beyond: 'Beyond the Keyboard',\n  archive: 'Archives & Patents'\n};"
);
// wait, the previous block was:
/*
const SECTION_LABELS: Record<SectionId, string> = {
  overview: 'Overview',
  bio: 'Executive Bio',
  competencies: 'Core Competencies',
  career: 'Career Journey',
  blog: 'Technical Blog',
  archive: 'Archives & Patents'
};
*/
// let's do it safely:
content = content.replace(
  "competencies: 'Core Competencies',",
  "competencies: 'Core Competencies',\n  projects: 'Key Projects',"
);
content = content.replace(
  "blog: 'Technical Blog',",
  "blog: 'Technical Blog',\n  beyond: 'Beyond the Keyboard',"
);

// Adding to DOM
const domTarget = "{/* Stop 4: Career Journey */}";
const newDOM = `{/* Stop 3.5: Projects */}
          <div className="snap-section">
            <Projects 
              theme={theme} 
            />
          </div>
          
          {/* Stop 4: Career Journey */}`;
content = content.replace(domTarget, newDOM);

const domTarget2 = "{/* Stop 6: Archives & Patents + Integrated Footer */}";
const newDOM2 = `{/* Stop 5.5: Beyond the Keyboard */}
          <div className="snap-section">
            <BeyondKeyboard 
              theme={theme} 
            />
          </div>
          
          {/* Stop 6: Archives & Patents + Integrated Footer */}`;
content = content.replace(domTarget2, newDOM2);

fs.writeFileSync('src/App.tsx', content);
console.log("Patched App.tsx for new sections");
