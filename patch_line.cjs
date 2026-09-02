const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

const oldLine = `{/* Glowing Aura Divider Line */}
            <div className="h-[1.5px] w-full bg-gradient-to-r from-blue-500 via-indigo-500/60 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.8)] my-2.5 rounded-full" />`;

const newLine = `{/* Slim Divider Line */}
            <div className={\`h-px w-full my-2.5 \${isLight ? 'bg-zinc-200' : 'bg-white/10'}\`} />`;

// We want to replace the first occurrence (which is above GitHub)
if (content.includes(oldLine)) {
  content = content.replace(oldLine, newLine); // Only replaces the first one
  fs.writeFileSync('src/components/Navbar.tsx', content);
  console.log("Replaced first divider");
} else {
  console.log("Could not find divider");
}
