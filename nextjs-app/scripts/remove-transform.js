const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '../public/templates');
const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(templatesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove style="transform: scale(...)" from document div
  content = content.replace(/style="transform:\s*scale\([^)]+\);?"/gi, '');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed ${file}`);
});

console.log('Done!');
