const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 },
    acceptDownloads: true
  });
  const page = await context.newPage();

  try {
    // Sign in
    console.log('Signing in...');
    await page.goto('http://localhost:3000/auth/signin');
    await page.waitForLoadState('networkidle');
    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.fill('input[name="password"]', 'Test123456');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);

    // Go to builder with existing resume
    console.log('Opening builder...');
    await page.goto('http://localhost:3000/builder?id=7');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    await page.screenshot({ path: '/tmp/before-download.png' });
    console.log('Screenshot: /tmp/before-download.png');

    // Click PDF download button
    console.log('Clicking PDF download button...');
    const downloadPromise = page.waitForEvent('download', { timeout: 10000 });

    // Try different selectors for PDF button
    const pdfButton = page.locator('button[title="Download PDF"], button:has(span:text("picture_as_pdf"))').first();
    await pdfButton.click();

    const download = await downloadPromise;
    const path = '/tmp/downloaded-resume.pdf';
    await download.saveAs(path);

    console.log('\n✅ PDF DOWNLOADED SUCCESSFULLY!');
    console.log('Saved to:', path);

    // Verify file
    const fs = require('fs');
    const stats = fs.statSync(path);
    console.log('File size:', stats.size, 'bytes');

    // Open the PDF
    const { exec } = require('child_process');
    exec(`open ${path}`);
    console.log('Opening PDF...');

    await page.waitForTimeout(5000);

  } catch (error) {
    console.error('Error:', error.message);
    await page.screenshot({ path: '/tmp/download-error.png' });
  }

  await browser.close();
})();
