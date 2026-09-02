const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

// Replace Desktop icon
const desktopOld = `<div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25 flex-shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform">
                {/* Thin, razor-sharp Crossed Swords / Spears behind Shield */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-90">
                  <Swords className="w-7 h-7 text-blue-100 transform scale-110" strokeWidth={0.85} />
                </div>
                {/* Bigger Security Shield in foreground */}
                <Shield className="w-6 h-6 text-white relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] fill-slate-950/80" strokeWidth={2} />
              </div>`;

const desktopNew = `<div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-400 via-indigo-400 to-blue-300 flex items-center justify-center text-white shadow-md shadow-blue-400/25 flex-shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform">
                {/* Thin, razor-sharp Crossed Swords / Spears behind Shield */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-90">
                  <Swords className="w-7 h-7 text-white transform scale-110" strokeWidth={1} />
                </div>
                {/* Bigger Security Shield in foreground */}
                <Shield className="w-6 h-6 text-white relative z-10 drop-shadow-sm fill-white/20" strokeWidth={2} />
              </div>`;

// Replace Mobile icon
const mobileOld = `<div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25 flex-shrink-0 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-90">
              <Swords className="w-5 h-5 text-blue-100 transform scale-110" strokeWidth={0.85} />
            </div>
            <Shield className="w-4 h-4 text-white relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] fill-slate-950/80" strokeWidth={2} />
          </div>`;

const mobileNew = `<div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-400 via-indigo-400 to-blue-300 flex items-center justify-center text-white shadow-md shadow-blue-400/25 flex-shrink-0 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-90">
              <Swords className="w-5 h-5 text-white transform scale-110" strokeWidth={1} />
            </div>
            <Shield className="w-4 h-4 text-white relative z-10 drop-shadow-sm fill-white/20" strokeWidth={2} />
          </div>`;

content = content.replace(desktopOld, desktopNew);
content = content.replace(mobileOld, mobileNew);

fs.writeFileSync('src/components/Navbar.tsx', content);
console.log('Icon lightened successfully.');
