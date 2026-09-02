const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// The main div class contains getThemeClass()
// e.g. <div className={`h-screen w-screen overflow-hidden transition-colors duration-500 ${getThemeClass()} ${font === 'mono' ? 'font-mono' : 'font-sans'}`}>

content = content.replace(
  "className={`h-screen w-screen overflow-hidden transition-colors duration-500 ${getThemeClass()} ${font === 'mono' ? 'font-mono' : 'font-sans'}`}",
  "className={`h-screen w-screen overflow-hidden transition-colors duration-500 theme-${theme} ${getThemeClass()} ${font === 'mono' ? 'font-mono' : 'font-sans'}`}"
);

fs.writeFileSync('src/App.tsx', content);
console.log("Patched App.tsx root div class");
