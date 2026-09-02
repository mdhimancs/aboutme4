const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  '<span className="text-[10px] opacity-60 font-mono">06</span>',
  '<span className="text-[10px] opacity-60 font-mono">08</span>'
);

fs.writeFileSync('src/App.tsx', content);
console.log("Patched HUD tracker");
