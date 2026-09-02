const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

const thirdOld = `<div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 relative flex-shrink-0">
            <Shield className="w-3.5 h-3.5" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
              <Swords className="w-3 h-3 text-white" />
            </div>
          </div>`;

const thirdNew = `<div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-400 via-indigo-400 to-blue-300 flex items-center justify-center text-white shadow-md shadow-blue-400/20 relative flex-shrink-0">
            <Shield className="w-3.5 h-3.5 relative z-10 drop-shadow-sm fill-white/20" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-90">
              <Swords className="w-3 h-3 text-white" strokeWidth={1} />
            </div>
          </div>`;

if (content.includes(thirdOld)) {
  content = content.replace(thirdOld, thirdNew);
  fs.writeFileSync('src/components/Navbar.tsx', content);
  console.log("Third icon lightened");
} else {
  console.log("Third icon not found");
}
