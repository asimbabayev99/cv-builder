const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log('Starting PDF generation...');
  console.log('Make sure the Next.js app is running: npm run dev');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Set viewport to match template width (595px is A4 at 72 DPI)
  await page.setViewportSize({ width: 595, height: 842 });

  try {
    console.log('Loading template from http://localhost:3000/preview/mli1 ...');

    await page.goto('http://localhost:3000/preview/mli1', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Wait for fonts to load
    await page.waitForTimeout(2000);

    // Generate PDF
    const pdfPath = path.join(__dirname, 'mli1-resume.pdf');

    await page.pdf({
      path: pdfPath,
      width: '595px',
      height: '842px',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      scale: 1
    });

    console.log(`\n✅ PDF generated successfully!`);
    console.log(`📄 File: ${pdfPath}`);

    await browser.close();

    // Open the PDF (macOS)
    const { exec } = require('child_process');
    exec(`open "${pdfPath}"`, (error) => {
      if (error) {
        console.log('PDF saved. Open it manually:', pdfPath);
      }
    });

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\nMake sure the Next.js app is running:');
    console.log('  cd nextjs-app && npm run dev');
    await browser.close();
    process.exit(1);
  }
})();
