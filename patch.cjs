const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

const target = "className={`w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-xl text-xs font-medium border transition-colors ${\n                isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-700 hover:bg-zinc-200' : 'bg-white/[0.04] border-white/10 text-zinc-300 hover:bg-white/10'\n              }`}";

const replacement = "className={`w-full flex items-center justify-center space-x-2 py-2 px-3 text-xs font-medium transition-colors ${\n                isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-zinc-400 hover:text-white'\n              }`}";

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/components/Navbar.tsx', content);
  console.log('Patched desktop navbar');
} else {
  console.log('Target not found in desktop navbar');
}
