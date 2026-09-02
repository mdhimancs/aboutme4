const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

const containerStart = '{/* Desktop Top Right Floating Bar */}';
const startIndex = content.indexOf(containerStart);
if (startIndex === -1) {
  console.log("Could not find Desktop Top Right Floating Bar");
  process.exit(1);
}

const shieldStart = '{/* Security Shield / Cyber Defense Grid */}';
const themeStart = '{/* Theme Options */}';
const containerEnd = '      {/* Mobile Top Header */}';

const shieldIndex = content.indexOf(shieldStart, startIndex);
const themeIndex = content.indexOf(themeStart, startIndex);
const endIndex = content.indexOf(containerEnd, startIndex);

if (shieldIndex === -1 || themeIndex === -1 || endIndex === -1) {
  console.log("Could not find components to swap");
  process.exit(1);
}

// We know Shield comes before Theme right now
const shieldBlock = content.substring(shieldIndex, themeIndex);
// Theme block goes until the end of the flex container, which is right before Mobile Top Header
// Specifically, it ends with `      </div>\n` before the Mobile Top Header
const endDivIndex = content.lastIndexOf('</div>', endIndex);
// Wait, to be safe, I'll just extract using substrings based on exact known layout.

let beforeShield = content.substring(0, shieldIndex);
let shieldContent = content.substring(shieldIndex, themeIndex);
let themeContent = content.substring(themeIndex, endDivIndex); // everything up to the closing div of the flex container

// The closing div of the flex container is right before the Mobile Top Header. Let's find the closing tag safely:
// Let's just swap them by replacing the middle part.

let newSection = themeContent + shieldContent;

// Fix the indentation or just swap them directly.
const newContent = beforeShield + newSection + content.substring(endDivIndex);
fs.writeFileSync('src/components/Navbar.tsx', newContent);
console.log("Swapped Theme and Shield");
