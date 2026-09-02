const fs = require('fs');
let content = fs.readFileSync('src/index.css', 'utf8');

const overrides = `
/* Obsidian Theme Overrides */
.theme-obsidian .bg-\\[\\#000000\\]\\/80,
.theme-obsidian .bg-\\[\\#000000\\]\\/90 {
  background-color: rgba(6, 3, 13, 0.8) !important;
}
.theme-obsidian .bg-\\[\\#0a0a0c\\] {
  background-color: #0b071a !important;
}
.theme-obsidian .border-white\\/10 {
  border-color: rgba(168, 85, 247, 0.2) !important;
}
.theme-obsidian .text-white,
.theme-obsidian .text-zinc-300 {
  color: #e2d9fc !important;
}
.theme-obsidian .text-zinc-400,
.theme-obsidian .text-zinc-500 {
  color: #a78bfa !important;
}
.theme-obsidian .text-blue-500,
.theme-obsidian .text-blue-400,
.theme-obsidian .text-blue-600 {
  color: #c084fc !important;
}
.theme-obsidian .bg-blue-500,
.theme-obsidian .bg-blue-600 {
  background-color: #9333ea !important;
}
.theme-obsidian .bg-blue-50\\/90 {
  background-color: rgba(147, 51, 234, 0.1) !important;
}
.theme-obsidian .bg-blue-500\\/10 {
  background-color: rgba(147, 51, 234, 0.1) !important;
}
.theme-obsidian .from-blue-600 {
  --tw-gradient-from: #9333ea var(--tw-gradient-from-position) !important;
}
.theme-obsidian .to-indigo-500 {
  --tw-gradient-to: #c084fc var(--tw-gradient-to-position) !important;
}

/* Terminal Theme Overrides */
.theme-terminal .bg-\\[\\#000000\\]\\/80,
.theme-terminal .bg-\\[\\#000000\\]\\/90 {
  background-color: rgba(0, 0, 0, 0.8) !important;
}
.theme-terminal .bg-\\[\\#0a0a0c\\] {
  background-color: #050505 !important;
}
.theme-terminal .border-white\\/10 {
  border-color: rgba(16, 185, 129, 0.4) !important;
}
.theme-terminal .text-white,
.theme-terminal .text-zinc-100,
.theme-terminal .text-zinc-200,
.theme-terminal .text-zinc-300 {
  color: #34d399 !important;
}
.theme-terminal .text-zinc-400,
.theme-terminal .text-zinc-500 {
  color: #059669 !important;
}
.theme-terminal .text-blue-500,
.theme-terminal .text-blue-400,
.theme-terminal .text-blue-600 {
  color: #10b981 !important;
}
.theme-terminal .bg-blue-500,
.theme-terminal .bg-blue-600 {
  background-color: #059669 !important;
}
.theme-terminal .bg-white\\/5,
.theme-terminal .bg-white\\/10 {
  background-color: rgba(16, 185, 129, 0.05) !important;
}
.theme-terminal .bg-blue-50\\/90,
.theme-terminal .bg-blue-500\\/10 {
  background-color: rgba(16, 185, 129, 0.1) !important;
}
.theme-terminal .from-blue-600 {
  --tw-gradient-from: #059669 var(--tw-gradient-from-position) !important;
}
.theme-terminal .to-indigo-500 {
  --tw-gradient-to: #34d399 var(--tw-gradient-to-position) !important;
}
`;

if (!content.includes('/* Obsidian Theme Overrides */')) {
  fs.writeFileSync('src/index.css', content + '\n' + overrides);
  console.log("Appended theme overrides to index.css");
} else {
  console.log("Overrides already exist");
}
