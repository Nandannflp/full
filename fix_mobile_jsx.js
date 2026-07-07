const fs = require('fs');
const file = 'src/components/landing/services.tsx';
let content = fs.readFileSync(file, 'utf8');

const mobileJsxStart = content.indexOf('{/* ─── MOBILE: Vertical service cards ──────────────────────────────── */}');
const mobileJsxEnd = content.indexOf('</div>\n    </div>\n  );\n}');

if (mobileJsxStart !== -1 && mobileJsxEnd !== -1) {
    content = content.slice(0, mobileJsxStart) + content.slice(mobileJsxEnd);
}

fs.writeFileSync(file, content);
console.log('Mobile JSX deleted.');
