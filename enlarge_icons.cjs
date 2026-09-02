const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

content = content.replace('<Github className="w-4 h-4 flex-shrink-0" />', '<Github className="w-5 h-5 flex-shrink-0" />');
content = content.replace('<Linkedin className="w-4 h-4 text-blue-500 flex-shrink-0" />', '<Linkedin className="w-5 h-5 text-blue-500 flex-shrink-0" />');
content = content.replace('<Mail className="w-4 h-4 text-red-500 flex-shrink-0" />', '<Mail className="w-5 h-5 text-red-500 flex-shrink-0" />');

fs.writeFileSync('src/components/Navbar.tsx', content);
console.log('Icons enlarged.');
