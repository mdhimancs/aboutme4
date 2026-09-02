const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

const oldCode = `<a
              href="#overview"
              onClick={(e) => handleLinkClick(e, 'overview')}
              className="flex items-center space-x-3 group pl-1 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-400 via-indigo-400 to-blue-300 flex items-center justify-center text-white shadow-md shadow-blue-400/25 flex-shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform">
                {/* Thin, razor-sharp Crossed Swords / Spears behind Shield */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-90">
                  <Swords className="w-7 h-7 text-white transform scale-110" strokeWidth={1} />
                </div>
                {/* Bigger Security Shield in foreground */}
                <Shield className="w-6 h-6 text-white relative z-10 drop-shadow-sm fill-white/20" strokeWidth={2} />
              </div>
              <div>
                <span className={\`text-lg font-sans font-bold tracking-tight block \${isLight ? 'text-zinc-900' : 'text-white'}\`}>
                  {PERSONAL_INFO.name}
                </span>
                <span className="text-[11px] text-blue-500 font-semibold tracking-wide">Cybersecurity & IAM • Data & AI</span>
              </div>
            </a>`;

const newCode = `<a
              href="#overview"
              onClick={(e) => handleLinkClick(e, 'overview')}
              className="flex flex-col space-y-1.5 group pl-1 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-400 via-indigo-400 to-blue-300 flex items-center justify-center text-white shadow-md shadow-blue-400/25 flex-shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform">
                  {/* Thin, razor-sharp Crossed Swords / Spears behind Shield */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-90">
                    <Swords className="w-7 h-7 text-white transform scale-110" strokeWidth={1} />
                  </div>
                  {/* Bigger Security Shield in foreground */}
                  <Shield className="w-6 h-6 text-white relative z-10 drop-shadow-sm fill-white/20" strokeWidth={2} />
                </div>
                <span className={\`text-lg font-sans font-bold tracking-tight block \${isLight ? 'text-zinc-900' : 'text-white'}\`}>
                  {PERSONAL_INFO.name}
                </span>
              </div>
              <span className="text-[11px] text-blue-500 font-semibold tracking-wide">Cybersecurity & IAM • Data & AI</span>
            </a>`;

content = content.replace(oldCode, newCode);
fs.writeFileSync('src/components/Navbar.tsx', content);
console.log('Fixed name layout.');
