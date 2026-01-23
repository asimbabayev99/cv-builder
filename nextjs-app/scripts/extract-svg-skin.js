const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '../public/templates');
const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(templatesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Find the svg-skin div
  const svgSkinMatch = content.match(/<div class="svg-skin\s*">/i);

  if (!svgSkinMatch) {
    console.log(`Could not find svg-skin div in ${file}, skipping...`);
    return;
  }

  const svgSkinStart = content.indexOf(svgSkinMatch[0]);

  // Find the matching closing tag by counting divs
  let depth = 0;
  let endIndex = svgSkinStart;
  let i = svgSkinStart;

  while (i < content.length) {
    if (content.substring(i, i + 4) === '<div') {
      depth++;
      i += 4;
    } else if (content.substring(i, i + 6) === '</div>') {
      depth--;
      if (depth === 0) {
        endIndex = i + 6;
        break;
      }
      i += 6;
    } else {
      i++;
    }
  }

  const svgSkinContent = content.substring(svgSkinStart, endIndex);

  fs.writeFileSync(filePath, svgSkinContent, 'utf8');
  console.log(`Extracted svg-skin from ${file}`);
});

console.log('Done!');
