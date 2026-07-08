const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'src', 'components', 'landing');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace gradients
  content = content.replace(/from-rose-500 to-orange-500/g, 'from-primary to-accent');
  content = content.replace(/from-rose-500 via-orange-400 to-orange-500/g, 'from-primary via-secondary to-accent');
  content = content.replace(/from-rose-500\/0 to-orange-500\/0/g, 'from-primary/0 to-accent/0');
  content = content.replace(/from-rose-500\/20 to-orange-500\/20/g, 'from-primary/20 to-accent/20');
  
  // Specific cases
  content = content.replace(/from-orange-400 via-orange-500 to-orange-600/g, 'from-primary via-secondary to-accent');
  content = content.replace(/via-orange-400\/60/g, 'via-primary/60');
  content = content.replace(/via-orange-400\/40/g, 'via-primary/40');
  
  // Leftovers
  content = content.replace(/from-rose-500/g, 'from-primary');
  content = content.replace(/to-orange-500/g, 'to-accent');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
