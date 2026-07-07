const fs = require('fs');
const file = 'src/components/landing/hero.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/#38bdf8/g, 'var(--color-secondary)');
content = content.replace(/bg-\[\#38bdf8\]/g, 'bg-secondary');
content = content.replace(/text-\[\#38bdf8\]/g, 'text-secondary');
content = content.replace(/fill-\[\#38bdf8\]/g, 'fill-secondary');

content = content.replace(/#2563eb/g, 'var(--color-primary)');
content = content.replace(/bg-\[\#2563eb\]/g, 'bg-primary');
content = content.replace(/text-\[\#2563eb\]/g, 'text-primary');
content = content.replace(/to-\[\#2563eb\]/g, 'to-primary');

content = content.replace(/#3b82f6/g, 'var(--color-primary)');
content = content.replace(/bg-\[\#3b82f6\]/g, 'bg-primary');
content = content.replace(/text-\[\#3b82f6\]/g, 'text-primary');
content = content.replace(/to-\[\#3b82f6\]/g, 'to-primary');
content = content.replace(/border-\[\#3b82f6\]/g, 'border-primary');

content = content.replace(/#06b6d4/g, 'var(--color-accent)');
content = content.replace(/bg-\[\#06b6d4\]/g, 'bg-accent');
content = content.replace(/text-\[\#06b6d4\]/g, 'text-accent');
content = content.replace(/from-\[\#06b6d4\]/g, 'from-accent');

content = content.replace(/#22c55e/g, 'var(--color-accent)');
content = content.replace(/bg-\[\#22c55e\]/g, 'bg-accent');
content = content.replace(/text-\[\#22c55e\]/g, 'text-accent');
content = content.replace(/from-\[\#22c55e\]/g, 'from-accent');

// Clean up any double var(--color-...)
content = content.replace(/bg-\[var\(--color-[a-z]+\)\]/g, function(match) {
    if(match.includes('primary')) return 'bg-primary';
    if(match.includes('secondary')) return 'bg-secondary';
    if(match.includes('accent')) return 'bg-accent';
    return match;
});
content = content.replace(/text-\[var\(--color-[a-z]+\)\]/g, function(match) {
    if(match.includes('primary')) return 'text-primary';
    if(match.includes('secondary')) return 'text-secondary';
    if(match.includes('accent')) return 'text-accent';
    return match;
});
content = content.replace(/from-\[var\(--color-[a-z]+\)\]/g, function(match) {
    if(match.includes('primary')) return 'from-primary';
    if(match.includes('secondary')) return 'from-secondary';
    if(match.includes('accent')) return 'from-accent';
    return match;
});
content = content.replace(/to-\[var\(--color-[a-z]+\)\]/g, function(match) {
    if(match.includes('primary')) return 'to-primary';
    if(match.includes('secondary')) return 'to-secondary';
    if(match.includes('accent')) return 'to-accent';
    return match;
});
content = content.replace(/fill-\[var\(--color-[a-z]+\)\]/g, function(match) {
    if(match.includes('primary')) return 'fill-primary';
    if(match.includes('secondary')) return 'fill-secondary';
    if(match.includes('accent')) return 'fill-accent';
    return match;
});
content = content.replace(/border-\[var\(--color-[a-z]+\)\]/g, function(match) {
    if(match.includes('primary')) return 'border-primary';
    if(match.includes('secondary')) return 'border-secondary';
    if(match.includes('accent')) return 'border-accent';
    return match;
});

fs.writeFileSync(file, content);
console.log('Replacements completed.');
