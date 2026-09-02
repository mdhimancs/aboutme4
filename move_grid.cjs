const fs = require('fs');

// 1. Remove from Navbar
let navContent = fs.readFileSync('src/components/Navbar.tsx', 'utf8');
const gridCode = `      {/* Security Shield / Cyber Defense Grid */}
        <div className={\`flex items-center space-x-3 p-1.5 pr-4 rounded-full border shadow-sm backdrop-blur-md transition-all \${
          isLight 
             ? 'bg-white/90 border-zinc-200 text-zinc-900 hover:bg-white' 
             : 'bg-[#0a0a0c]/90 border-white/10 text-white hover:bg-white/[0.04]'
        }\`}>
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-400 via-indigo-400 to-blue-300 flex items-center justify-center text-white shadow-md shadow-blue-400/20 relative flex-shrink-0">
            <Shield className="w-3.5 h-3.5 relative z-10 drop-shadow-sm fill-white/20" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-90">
              <Swords className="w-3 h-3 text-white" strokeWidth={1} />
            </div>
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-bold tracking-tight truncate">
              Cyber Defense Grid
            </div>
            <div className="text-[9px] font-mono text-emerald-500 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Active</span>
            </div>
          </div>
        </div>`;

if (navContent.includes(gridCode)) {
    navContent = navContent.replace(gridCode, '');
    fs.writeFileSync('src/components/Navbar.tsx', navContent);
    console.log('Removed from Navbar');
} else {
    console.log('Grid not found in Navbar with exact match. Trying regex.');
    const regex = /\{\/\* Security Shield \/ Cyber Defense Grid \*\/\}[\s\S]*?<\/div>[\s]*<\/div>[\s]*<\/div>/;
    if (regex.test(navContent)) {
        navContent = navContent.replace(regex, '');
        fs.writeFileSync('src/components/Navbar.tsx', navContent);
        console.log('Removed from Navbar using regex');
    } else {
        console.log('Failed to find Grid in Navbar.');
    }
}
