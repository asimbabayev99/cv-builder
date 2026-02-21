const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 300,
    args: ['--start-maximized']
  });
  const context = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  const page = await context.newPage();

  try {
    // Step 1: Go to templates page
    console.log('Step 1: Opening templates page...');
    await page.goto('http://localhost:3000/templates');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    // Step 2: Hover on first template and click Use Template
    console.log('Step 2: Selecting template...');
    const templateCard = page.locator('.group').first();
    await templateCard.hover();
    await page.waitForTimeout(800);

    // Click "Use Template" button
    await page.locator('button:has-text("Use Template")').first().click();
    await page.waitForTimeout(2000);

    // Step 3: Handle sign in if needed
    if (page.url().includes('/auth/signin')) {
      console.log('Step 3: Signing in...');
      await page.fill('input[name="email"]', 'testuser@example.com');
      await page.fill('input[name="password"]', 'Test123456');
      await page.click('button[type="submit"]');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(3000);
    }

    // Step 4: Now on builder - fill personal info
    console.log('Step 4: Filling personal info...');
    await page.waitForTimeout(2000);

    // Take screenshot of builder
    await page.screenshot({ path: '/tmp/builder-step1.png', fullPage: true });
    console.log('Screenshot saved: /tmp/builder-step1.png');

    // Try to fill form fields by looking for input elements
    const inputs = await page.locator('input[type="text"], input[type="email"], input[type="tel"]').all();
    console.log(`Found ${inputs.length} input fields`);

    // Fill first name if visible
    const firstNameInput = page.locator('input').filter({ hasText: /first/i }).or(page.locator('input[placeholder*="first" i]')).or(page.locator('input').nth(0));

    // Let's try finding inputs by their order in the form
    try {
      // Personal info form - fill fields
      await page.locator('input').nth(0).fill('Emily');
      await page.waitForTimeout(300);
      await page.locator('input').nth(1).fill('Johnson');
      await page.waitForTimeout(300);
      await page.locator('input').nth(2).fill('Software Architect');
      await page.waitForTimeout(300);
      await page.locator('input').nth(3).fill('emily.johnson@techcorp.com');
      await page.waitForTimeout(300);
      await page.locator('input').nth(4).fill('+1 (415) 555-0198');
      await page.waitForTimeout(300);
      await page.locator('input').nth(5).fill('Seattle');
      await page.waitForTimeout(300);
      await page.locator('input').nth(6).fill('United States');
      await page.waitForTimeout(300);
    } catch (e) {
      console.log('Error filling some fields:', e.message);
    }

    // Fill summary/textarea if exists
    try {
      const textarea = page.locator('textarea').first();
      await textarea.fill('Experienced Software Architect with 10+ years designing scalable distributed systems. Expert in cloud-native architectures, microservices, and DevOps practices. Led engineering teams to deliver high-impact projects for Fortune 500 clients.');
      await page.waitForTimeout(500);
    } catch (e) {
      console.log('No textarea found');
    }

    await page.waitForTimeout(1000);
    await page.screenshot({ path: '/tmp/builder-filled.png', fullPage: true });
    console.log('Screenshot saved: /tmp/builder-filled.png');

    // Step 5: Click Save & Continue
    console.log('Step 5: Saving and continuing...');
    try {
      await page.click('button:has-text("Save")');
      await page.waitForTimeout(2000);
    } catch (e) {
      console.log('Save button not found');
    }

    // Step 6: Check the preview panel on the right
    console.log('Step 6: Preview should show on the right side...');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/tmp/builder-with-preview.png', fullPage: true });
    console.log('Screenshot saved: /tmp/builder-with-preview.png');

    // Keep browser open
    console.log('\n=== Browser is open for you to interact ===');
    console.log('You can:');
    console.log('  - Continue filling the CV');
    console.log('  - Click PDF/Word download buttons in the preview');
    console.log('  - Navigate through sections');
    console.log('\nBrowser will close in 2 minutes or press Ctrl+C');

    await page.waitForTimeout(120000);

  } catch (error) {
    console.error('Error:', error.message);
    await page.screenshot({ path: '/tmp/builder-error.png', fullPage: true });
  }

  await browser.close();
})();
