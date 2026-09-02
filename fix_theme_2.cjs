const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

const oldThemeBtn = `<button
          onClick={onOpenInterfaceOptions}
          className={\`flex items-center space-x-2 mr-3 transition-colors \${
            isLight 
              ? 'text-zinc-500 hover:text-zinc-900' 
              : 'text-zinc-400 hover:text-white'
          }\`}
          title="Theme & Interface Options"
        >
          <Sliders className="w-4 h-4 text-blue-500" />
          <span className="text-xs font-semibold uppercase tracking-wider">Theme</span>
        </button>`;

const newThemeBtn = `<button
          onClick={onOpenInterfaceOptions}
          className={\`flex items-center space-x-2 mr-4 transition-colors \${
            isLight 
              ? 'text-zinc-500 hover:text-zinc-900' 
              : 'text-zinc-400 hover:text-white'
          }\`}
          title="Theme & Interface Options"
        >
          <Sliders className="w-3.5 h-3.5 text-blue-500" />
          <span className="text-xs font-semibold">Theme</span>
        </button>`;

if (content.includes(oldThemeBtn)) {
    content = content.replace(oldThemeBtn, newThemeBtn);
    fs.writeFileSync('src/components/Navbar.tsx', content);
    console.log('Fixed theme button to standard text');
} else {
    console.log('Could not find first fix');
}
