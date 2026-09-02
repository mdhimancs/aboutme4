const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');
content = content.replace('<span>Navigation Stops</span>', '<span>Navigation</span>');
fs.writeFileSync('src/components/Navbar.tsx', content);
console.log("Renamed Navigation");
