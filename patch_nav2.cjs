const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

const oldNavLinks = `const navLinks = [
    { id: 'overview', name: 'Overview', href: '#overview', num: '01' },
    { id: 'bio', name: 'Executive Bio', href: '#bio', num: '02' },
    { id: 'competencies', name: 'Core Competencies', href: '#competencies', num: '03' },
    { id: 'career', name: 'Career Journey', href: '#career', num: '04' },
    { id: 'blog', name: 'Technical Blog', href: '#blog', num: '05' },
    { id: 'archive', name: 'Archives', href: '#archive', num: '06' },
  ];`;

const newNavLinks = `const navLinks = [
    { id: 'overview', name: 'Overview', href: '#overview', num: '01' },
    { id: 'bio', name: 'Executive Bio', href: '#bio', num: '02' },
    { id: 'competencies', name: 'Core Competencies', href: '#competencies', num: '03' },
    { id: 'projects', name: 'Projects', href: '#projects', num: '04' },
    { id: 'career', name: 'Career Journey', href: '#career', num: '05' },
    { id: 'blog', name: 'Technical Blog', href: '#blog', num: '06' },
    { id: 'beyond', name: 'Beyond the Keyboard', href: '#beyond', num: '07' },
    { id: 'archive', name: 'Archives', href: '#archive', num: '08' },
  ];`;

content = content.replace(oldNavLinks, newNavLinks);

content = content.replace('<span>6 STOPS</span>', '<span>8 STOPS</span>');
content = content.replace('font-mono">6 STOPS', 'font-mono">8 STOPS'); // just in case

fs.writeFileSync('src/components/Navbar.tsx', content);
console.log("Patched Navbar.tsx for new links");
