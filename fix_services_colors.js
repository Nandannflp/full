const fs = require('fs');
const file = 'src/components/landing/services.tsx';
let content = fs.readFileSync(file, 'utf8');

// The SERVICES array has objects with color and gb.
// We can replace the color property with the CSS variables.
const colors = ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-accent)'];
let i = 0;
content = content.replace(/color:\s*"(#[0-9a-fA-F]{6})"/g, function() {
    let c = colors[i % 3];
    i++;
    return color: "";
});

// Remove rgb completely from SERVICES array
content = content.replace(/rgb:\s*"[0-9,\s]+",?\n/g, "");

// Fix inline styles using rgba(, alpha)
content = content.replace(/rgba\(\$\\{svc\.rgb\\},\s*([0-9.]+)\)/g, 'color-mix(in srgb,  %, transparent)');

// Some other hardcoded #8B5CF6 or #06B6D4 in services.tsx (like in CTA or gradients)
content = content.replace(/#8B5CF6/g, 'var(--color-primary)');
content = content.replace(/#06B6D4/g, 'var(--color-secondary)');

fs.writeFileSync(file, content);
console.log('Services colors updated.');
