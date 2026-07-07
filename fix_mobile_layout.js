const fs = require('fs');
const file = 'src/components/landing/services.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove hidden md:block
content = content.replace('className="hidden md:block"', 'className="block"');

// 2. Change h-screen flex container to flex-col md:flex-row
content = content.replace('className="h-screen relative flex bg-background overflow-hidden"', 'className="h-screen relative flex flex-col md:flex-row bg-background overflow-hidden"');

// 3. Left Panel layout
content = content.replace(/style=\{\{\s*width: "50%",\s*height: "100%",\s*position: "relative",\s*zIndex: 10,\s*padding: "5.5rem 3.5rem 4rem 4.5rem",\s*\}\}/, 'className="w-full h-[55%] md:w-1/2 md:h-full relative z-10 p-6 pt-16 md:p-16 md:pt-28 lg:pl-20"');

// 4. Left Panel inner div padding
content = content.replace(/padding: "5.5rem 3.5rem 4rem 4.5rem",/g, 'padding: "1rem",');

// 5. Right Panel layout
content = content.replace(/style=\{\{\s*width: "50%",\s*height: "100%",\s*position: "relative",\s*display: "flex",\s*alignItems: "center",\s*justifyContent: "center",\s*zIndex: 5,\s*\}\}/, 'className="w-full h-[45%] md:w-1/2 md:h-full relative flex items-center justify-center z-5 p-4"');

// 6. SVG max-height / width for mobile
content = content.replace(/maxWidth: "520px",\s*maxHeight: "520px",/, 'maxWidth: "100%", maxHeight: "100%",');

// 7. Change the orbit dots fill to match the theme
content = content.replace(/fill="rgba\(255,255,255,0.8\)"/g, 'fill="var(--color-secondary)"');
content = content.replace(/fill="rgba\(255,255,255,0.3\)"/g, 'fill="var(--color-accent)"');

// 8. Fix the title clamp size for mobile
content = content.replace(/text-\[clamp\(3\.5rem,5\.2vw,5\.8rem\)\]/g, 'text-[clamp(2.5rem,5.2vw,5.8rem)]');

fs.writeFileSync(file, content);
console.log('Layout and beads updated.');
