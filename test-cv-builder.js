const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('1. Opening homepage...');
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000);

  console.log('2. Going to templates page...');
  await page.goto('http://localhost:3000/templates');
  await page.waitForTimeout(2000);

  console.log('3. Clicking on first template to preview...');
  // Hover over first template to see buttons
  const firstTemplate = page.locator('.group').first();
  await firstTemplate.hover();
  await page.waitForTimeout(1000);

  console.log('4. Clicking "Use Template"...');
  await page.click('text=Use Template');
  await page.waitForTimeout(2000);

  // Check if redirected to sign in
  if (page.url().includes('/auth/signin')) {
    console.log('5. Need to sign in first...');

    // Fill in sign in form
    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.fill('input[name="password"]', 'Test123456');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
  }

  console.log('6. Now on builder page...');
  await page.waitForTimeout(2000);

  // Fill personal info
  console.log('7. Filling personal info...');

  // Try to find and fill the form fields
  try {
    await page.fill('input[placeholder*="First"]', 'Jane');
    await page.fill('input[placeholder*="Last"]', 'Smith');
    await page.fill('input[placeholder*="title" i]', 'Full Stack Developer');
    await page.fill('input[placeholder*="email" i]', 'jane.smith@email.com');
    await page.fill('input[placeholder*="phone" i]', '+1 555 987 6543');
    await page.fill('input[placeholder*="city" i]', 'New York');
    await page.fill('input[placeholder*="country" i]', 'United States');
  } catch (e) {
    console.log('Some fields not found, continuing...');
  }

  await page.waitForTimeout(2000);

  // Click Save & Continue
  console.log('8. Clicking Save & Continue...');
  try {
    await page.click('text=Save & Continue');
    await page.waitForTimeout(2000);
  } catch (e) {
    console.log('Save button not found, trying next...');
  }

  // Take a screenshot
  console.log('9. Taking screenshot...');
  await page.screenshot({ path: '/tmp/cv-builder-screenshot.png', fullPage: true });
  console.log('Screenshot saved to /tmp/cv-builder-screenshot.png');

  console.log('10. Waiting for you to interact...');
  console.log('Press Ctrl+C to close the browser when done.');

  // Keep browser open for manual interaction
  await page.waitForTimeout(120000);

  await browser.close();
})();
