const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

const desktopSpanOld = "className={`text-lg font-sans font-bold tracking-tight block ${isLight ? 'text-zinc-900' : 'text-white'}`}";
const desktopSpanNew = "className={`text-lg font-sans font-bold tracking-tight block ${isLight ? 'text-zinc-900 drop-shadow-[0_2px_10px_rgba(0,0,0,0.15)]' : 'text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.25)]'}`}";

const mobileSpanOld = "className=\"font-semibold text-xs sm:text-sm truncate\"";
const mobileSpanNew = "className={`font-semibold text-xs sm:text-sm truncate ${isLight ? 'drop-shadow-[0_1px_5px_rgba(0,0,0,0.1)]' : 'drop-shadow-[0_1px_6px_rgba(255,255,255,0.2)]'}`}";

content = content.replace(desktopSpanOld, desktopSpanNew);
content = content.replace(mobileSpanOld, mobileSpanNew);

fs.writeFileSync('src/components/Navbar.tsx', content);
console.log('Shadow added.');
