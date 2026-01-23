const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '../public/templates');
const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.html') && !f.includes('-modal'));

files.forEach(file => {
  const filePath = path.join(templatesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Extract all style tags content
  const styleMatches = content.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || [];
  const styles = styleMatches.join('\n');

  // Find the document div - it starts with class="document
  const docStartMatch = content.match(/<div[^>]*class="document[^"]*"[^>]*>/i);

  if (!docStartMatch) {
    console.log(`Could not find document div in ${file}, skipping...`);
    return;
  }

  const docStartIndex = content.indexOf(docStartMatch[0]);

  // Find the matching closing tag by counting divs
  let depth = 0;
  let endIndex = docStartIndex;
  let inTag = false;
  let tagStart = 0;

  for (let i = docStartIndex; i < content.length; i++) {
    if (content[i] === '<') {
      tagStart = i;
      inTag = true;
    } else if (content[i] === '>' && inTag) {
      const tag = content.substring(tagStart, i + 1);
      if (tag.match(/^<div/i) && !tag.match(/\/>$/)) {
        depth++;
      } else if (tag.match(/^<\/div>/i)) {
        depth--;
        if (depth === 0) {
          endIndex = i + 1;
          break;
        }
      }
      inTag = false;
    }
  }

  let documentContent = content.substring(docStartIndex, endIndex);

  // Remove the inline transform scale style
  documentContent = documentContent.replace(/style="[^"]*transform:\s*scale\([^)]+\)[^"]*"/gi, '');

  // Also remove any remaining style attribute that might have the scale
  documentContent = documentContent.replace(/style="transform:[^"]*"/gi, '');

  const cleanHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CV Template</title>
  <link href="https://fonts.googleapis.com/css?family=Allura|Dancing+Script|Dynalight|Mrs+Saint+Delafield|Fira+Sans|PT+Sans|Saira|Blinker|PT+Sans+Caption|Bodoni+MT|Oswald|Source+Sans+Pro" rel="stylesheet">
  <link rel="stylesheet" href="/css/all.min.css">
  <link rel="stylesheet" href="/css/main-1.0.0.380.css">
  ${styles}
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #fff;
    }
    .document {
      transform: none !important;
    }
  </style>
</head>
<body>
${documentContent}
</body>
</html>`;

  fs.writeFileSync(filePath, cleanHtml, 'utf8');
  console.log(`Cleaned ${file}`);
});

console.log('Done!');
