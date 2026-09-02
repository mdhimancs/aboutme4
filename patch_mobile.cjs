const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

const target2 = "className={`p-1.5 rounded-full border ${isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-700' : 'bg-white/5 border-white/10 text-zinc-300'}`}";
const replacement2 = "className={`p-1.5 transition-colors ${isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-zinc-400 hover:text-white'}`}";

if (content.includes(target2)) {
  content = content.replace(target2, replacement2);
  fs.writeFileSync('src/components/Navbar.tsx', content);
  console.log('Patched mobile button 1');
} else {
  console.log('Not found 2');
}

