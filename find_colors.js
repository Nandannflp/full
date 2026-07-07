const fs = require('fs');
const file = 'src/components/landing/services.tsx';
let content = fs.readFileSync(file, 'utf8');

// I will just replace the exact known colors from the Services data array and any GSAP styles.
// #6366f1, #8b5cf6, #3b82f6, #06b6d4, #10b981, #f59e0b, #ec4899, #f43f5e
// Actually, in services.tsx we had an array of 12 services with hardcoded colors.
// I should just change all of them to use var(--color-primary), var(--color-secondary), var(--color-accent) alternatively.
// Let's first search for all # colors in services.tsx.
const matches = content.match(/#[0-9a-fA-F]{6}/g);
const uniqueMatches = [...new Set(matches)];
console.log(uniqueMatches);
