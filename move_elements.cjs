const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

// Find the start of the bottom section
const startComment = '{/* Bottom: Theme Options & Security Shield Crest */}';
const startIndex = content.indexOf(startComment);
if (startIndex === -1) {
  console.log("Could not find Bottom section");
  process.exit(1);
}

// Find the end of this div block.
// It ends just before </aside>
const asideEnd = content.indexOf('</aside>', startIndex);
if (asideEnd === -1) {
  console.log("Could not find </aside>");
  process.exit(1);
}

// Extract the block we're removing (just for reference/logging)
const removedBlock = content.substring(startIndex, asideEnd);

const newTopRightBlock = `
      {/* Desktop Top Right Floating Bar */}
      <div className="hidden md:flex fixed top-4 right-6 z-50 items-center gap-3">
        {/* Security Shield / Cyber Defense Grid */}
        <div className={\`flex items-center space-x-3 p-1.5 pr-4 rounded-full border shadow-sm backdrop-blur-md transition-all \${
          isLight 
            ? 'bg-white/90 border-zinc-200 text-zinc-900 hover:bg-white' 
            : 'bg-[#0a0a0c]/90 border-white/10 text-white hover:bg-white/[0.04]'
        }\`}>
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 relative flex-shrink-0">
            <Shield className="w-3.5 h-3.5" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
              <Swords className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-bold tracking-tight truncate">
              Cyber Defense Grid
            </div>
          </div>
        </div>

        {/* Theme Options */}
        <button
          onClick={onOpenInterfaceOptions}
          className={\`flex items-center space-x-2 py-1.5 px-4 rounded-full border shadow-sm backdrop-blur-md transition-all \${
            isLight 
              ? 'bg-white/90 border-zinc-200 text-zinc-700 hover:bg-zinc-50' 
              : 'bg-[#0a0a0c]/90 border-white/10 text-zinc-300 hover:bg-white/[0.04]'
          }\`}
          title="Theme & Interface Options"
        >
          <Sliders className="w-3.5 h-3.5 text-blue-500" />
          <span className="text-xs font-semibold">Theme</span>
        </button>
      </div>
`;

// Build new content
// We remove the section by not including `removedBlock`
// And we insert `newTopRightBlock` immediately after `</aside>`
const newContent = content.substring(0, startIndex) + 
  '      </aside>\n' + 
  newTopRightBlock + 
  content.substring(asideEnd + '</aside>'.length);

fs.writeFileSync('src/components/Navbar.tsx', newContent);
console.log("Successfully moved elements to top right");
