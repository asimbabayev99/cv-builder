const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 200
  });
  const context = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  const page = await context.newPage();

  try {
    // Step 1: Go to sign in page
    console.log('Step 1: Going to sign in...');
    await page.goto('http://localhost:3000/auth/signin');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await page.screenshot({ path: '/tmp/step1-signin.png' });
    console.log('Screenshot: /tmp/step1-signin.png');

    // Step 2: Fill sign in form
    console.log('Step 2: Filling credentials...');
    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.fill('input[name="password"]', 'Test123456');
    await page.waitForTimeout(500);

    await page.screenshot({ path: '/tmp/step2-filled.png' });

    // Step 3: Submit form
    console.log('Step 3: Submitting...');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
    await page.waitForLoadState('networkidle');

    await page.screenshot({ path: '/tmp/step3-afterlogin.png' });
    console.log('Current URL:', page.url());

    // Step 4: Go to templates
    console.log('Step 4: Going to templates...');
    await page.goto('http://localhost:3000/templates');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    await page.screenshot({ path: '/tmp/step4-templates.png' });
    console.log('Screenshot: /tmp/step4-templates.png');

    // Step 5: Click on a template
    console.log('Step 5: Selecting template...');
    const templateCard = page.locator('.group').first();
    await templateCard.hover();
    await page.waitForTimeout(500);

    // Find and click "Use Template"
    const useTemplateBtn = page.locator('button:has-text("Use Template")').first();
    await useTemplateBtn.click();
    await page.waitForTimeout(3000);
    await page.waitForLoadState('networkidle');

    await page.screenshot({ path: '/tmp/step5-builder.png' });
    console.log('Screenshot: /tmp/step5-builder.png');
    console.log('Current URL:', page.url());

    // Step 6: Fill the form if on builder page
    if (page.url().includes('/builder')) {
      console.log('Step 6: On builder page! Filling form...');

      // Wait for form to load
      await page.waitForTimeout(2000);

      // Get all text inputs
      const allInputs = page.locator('input:visible');
      const inputCount = await allInputs.count();
      console.log(`Found ${inputCount} visible inputs`);

      // Fill inputs by index
      const formData = [
        'Sarah', 'Williams', 'Product Manager',
        'sarah.w@company.com', '+1-555-123-4567',
        'Austin', 'USA'
      ];

      for (let i = 0; i < Math.min(inputCount, formData.length); i++) {
        try {
          await allInputs.nth(i).fill(formData[i]);
          await page.waitForTimeout(200);
        } catch (e) {
          console.log(`Could not fill input ${i}`);
        }
      }

      // Fill textarea (summary)
      try {
        await page.locator('textarea').first().fill(
          'Dynamic Product Manager with 7+ years leading cross-functional teams. ' +
          'Proven track record of launching successful products generating $10M+ revenue. ' +
          'Expert in Agile methodologies and data-driven decision making.'
        );
      } catch (e) {
        console.log('No textarea found');
      }

      await page.waitForTimeout(1000);
      await page.screenshot({ path: '/tmp/step6-form-filled.png', fullPage: true });
      console.log('Screenshot: /tmp/step6-form-filled.png');

      // Click Save
      console.log('Step 7: Saving...');
      try {
        await page.click('button:has-text("Save")');
        await page.waitForTimeout(2000);
        await page.screenshot({ path: '/tmp/step7-saved.png', fullPage: true });
        console.log('Screenshot: /tmp/step7-saved.png');
      } catch (e) {
        console.log('Could not click save:', e.message);
      }
    }

    console.log('\n=== Done! Browser open for 2 minutes ===');
    console.log('You can now:');
    console.log('  - See the live preview on the right');
    console.log('  - Click PDF or DOCX download buttons');
    console.log('  - Continue editing the resume');

    await page.waitForTimeout(120000);

  } catch (error) {
    console.error('Error:', error.message);
    await page.screenshot({ path: '/tmp/error.png' });
  }

  await browser.close();
})();
