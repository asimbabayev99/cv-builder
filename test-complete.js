const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 150
  });
  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 },
    acceptDownloads: true
  });
  const page = await context.newPage();

  try {
    // Step 1: Sign in
    console.log('=== Step 1: Signing in ===');
    await page.goto('http://localhost:3000/auth/signin');
    await page.waitForLoadState('networkidle');
    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.fill('input[name="password"]', 'Test123456');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2500);
    console.log('Signed in! URL:', page.url());

    // Step 2: Go to templates and select one
    console.log('\n=== Step 2: Selecting template ===');
    await page.goto('http://localhost:3000/templates');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    // Click on second template for variety
    const templates = page.locator('.group');
    await templates.nth(1).hover();
    await page.waitForTimeout(500);
    await page.locator('button:has-text("Use Template")').first().click();
    await page.waitForTimeout(3000);
    console.log('Template selected! URL:', page.url());

    // Step 3: Fill Personal Info
    console.log('\n=== Step 3: Filling Personal Info ===');
    await page.waitForTimeout(1500);

    const inputs = page.locator('input:visible');
    const inputCount = await inputs.count();
    console.log(`Found ${inputCount} inputs`);

    // Fill form fields
    await inputs.nth(0).fill('Michael');
    await inputs.nth(1).fill('Chen');
    await inputs.nth(2).fill('Senior Data Scientist');
    await inputs.nth(3).fill('michael.chen@datatech.io');
    await inputs.nth(4).fill('+1 (650) 555-0142');
    await inputs.nth(5).fill('United States');
    await inputs.nth(6).fill('San Jose');

    // Fill summary
    await page.locator('textarea').first().fill(
      'Senior Data Scientist with 8+ years of experience in machine learning, ' +
      'statistical analysis, and big data technologies. Led data science teams at ' +
      'Fortune 500 companies. Published researcher with expertise in NLP and computer vision.'
    );

    await page.waitForTimeout(1000);
    await page.screenshot({ path: '/tmp/test-personal-info.png' });
    console.log('Personal info filled');

    // Save and continue
    await page.click('button:has-text("Save")');
    await page.waitForTimeout(2000);

    // Step 4: Add Education
    console.log('\n=== Step 4: Adding Education ===');
    await page.click('text=Add Education Entry');
    await page.waitForTimeout(1000);

    const eduInputs = page.locator('input:visible');
    await eduInputs.nth(0).fill('Stanford University');
    await eduInputs.nth(1).fill('Ph.D.');
    await eduInputs.nth(2).fill('Computer Science');
    await eduInputs.nth(3).fill('2015-09');
    await eduInputs.nth(4).fill('2019-05');

    await page.waitForTimeout(500);
    await page.click('button:has-text("Save")');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/tmp/test-education.png' });
    console.log('Education added');

    // Step 5: Add Work Experience
    console.log('\n=== Step 5: Adding Work Experience ===');
    await page.click('text=Add Experience Entry');
    await page.waitForTimeout(1000);

    const expInputs = page.locator('input:visible');
    await expInputs.nth(0).fill('Senior Data Scientist');
    await expInputs.nth(1).fill('Google');
    await expInputs.nth(2).fill('Mountain View, CA');
    await expInputs.nth(3).fill('2019-06');

    // Check "currently working"
    try {
      await page.locator('input[type="checkbox"]').first().check();
    } catch (e) {}

    // Add description
    try {
      await page.locator('textarea').first().fill(
        '• Lead ML team of 12 engineers developing recommendation systems\n' +
        '• Increased model accuracy by 35% using novel deep learning architectures\n' +
        '• Deployed models serving 100M+ daily predictions'
      );
    } catch (e) {}

    await page.waitForTimeout(500);
    await page.click('button:has-text("Save")');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/tmp/test-experience.png' });
    console.log('Experience added');

    // Step 6: Add Skills
    console.log('\n=== Step 6: Adding Skills ===');
    const skills = ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'AWS', 'Spark'];
    for (const skill of skills) {
      try {
        await page.click('text=Add');
        await page.waitForTimeout(300);
        const skillInput = page.locator('input:visible').last();
        await skillInput.fill(skill);
        await page.waitForTimeout(200);
      } catch (e) {
        break;
      }
    }
    await page.click('button:has-text("Save")');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/tmp/test-skills.png' });
    console.log('Skills added');

    // Step 7: Take final screenshot with preview
    console.log('\n=== Step 7: Final Preview ===');
    await page.goto(page.url().split('?')[0] + '/personal');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/tmp/test-final-preview.png', fullPage: true });
    console.log('Final screenshot saved');

    // Step 8: Download PDF
    console.log('\n=== Step 8: Downloading PDF ===');
    const downloadPromise = page.waitForEvent('download');
    await page.locator('button[title="Download PDF"]').click();
    const download = await downloadPromise;
    await download.saveAs('/tmp/browser-test-resume.pdf');
    console.log('PDF downloaded to /tmp/browser-test-resume.pdf');

    await page.screenshot({ path: '/tmp/test-download-complete.png' });

    console.log('\n========================================');
    console.log('TEST COMPLETE!');
    console.log('Screenshots saved to /tmp/test-*.png');
    console.log('PDF saved to /tmp/browser-test-resume.pdf');
    console.log('========================================');
    console.log('\nBrowser stays open for 60 seconds...');

    await page.waitForTimeout(60000);

  } catch (error) {
    console.error('\nError:', error.message);
    await page.screenshot({ path: '/tmp/test-error.png' });
    console.log('Error screenshot saved to /tmp/test-error.png');
  }

  await browser.close();
})();
