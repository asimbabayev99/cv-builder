const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '../public/templates');
const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.html') && !f.includes('-modal'));

files.forEach(file => {
  const filePath = path.join(templatesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Check if it's already a complete HTML document
  if (content.trim().startsWith('<!DOCTYPE html>') || content.trim().startsWith('<html')) {
    console.log(`Skipping ${file} - already a complete HTML document`);
    return;
  }

  const wrappedHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CV Template</title>
  <link href="https://fonts.googleapis.com/css?family=Allura|Dancing+Script|Dynalight|Mrs+Saint+Delafield|Fira+Sans|PT+Sans|Saira|Blinker|PT+Sans+Caption|Bodoni+MT|Oswald|Source+Sans+Pro" rel="stylesheet">
  <link rel="stylesheet" href="/css/all.min.css">
  <link rel="stylesheet" href="/css/main-1.0.0.380.css">
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #fff;
    }
    .svg-skin {
      background: #fff;
    }
  </style>
</head>
<body>
  <div class="svg-skin">
    ${content}
  </div>
</body>
</html>`;

  fs.writeFileSync(filePath, wrappedHtml, 'utf8');
  console.log(`Wrapped ${file}`);
});

console.log('Done!');
