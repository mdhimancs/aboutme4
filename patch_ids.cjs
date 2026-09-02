const fs = require('fs');

let projectsContent = fs.readFileSync('src/components/Projects.tsx', 'utf8');
projectsContent = projectsContent.replace('<section className="min-h-screen', '<section id="projects" className="min-h-screen');
fs.writeFileSync('src/components/Projects.tsx', projectsContent);

let beyondContent = fs.readFileSync('src/components/BeyondKeyboard.tsx', 'utf8');
beyondContent = beyondContent.replace('<section className="min-h-screen', '<section id="beyond" className="min-h-screen');
fs.writeFileSync('src/components/BeyondKeyboard.tsx', beyondContent);

console.log("Added IDs to components");
