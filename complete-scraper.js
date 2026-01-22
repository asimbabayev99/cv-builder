const { chromium } = require('playwright-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');

chromium.use(StealthPlugin());

async function extractComplete() {
  console.log('Launching browser...');

  const browser = await chromium.launch({
    headless: false,
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox']
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 },
    locale: 'en-GB'
  });

  const page = await context.newPage();

  // Create directories
  const dirs = ['complete/templates', 'complete/previews', 'complete/css', 'complete/components', 'complete/screenshots'];
  dirs.forEach(dir => fs.mkdirSync(dir, { recursive: true }));

  try {
    console.log('Navigating...');
    await page.goto('https://www.myperfectcv.co.uk/build-cv/choose-template', {
      waitUntil: 'networkidle',
      timeout: 60000
    });
    await page.waitForTimeout(3000);

    // Accept cookies
    try {
      await page.click('#onetrust-accept-btn-handler', { timeout: 5000 });
      await page.waitForTimeout(1000);
    } catch (e) {}

    // Take initial screenshot
    await page.screenshot({ path: 'complete/screenshots/initial.png', fullPage: true });

    // Click "All" tab
    console.log('Clicking All tab...');
    await page.click('button:has-text("All")');
    await page.waitForTimeout(2000);

    // Scroll to load all templates
    console.log('Loading all templates...');
    for (let i = 0; i < 40; i++) {
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(200);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);

    // Extract page structure
    console.log('Extracting page structure...');
    const pageStructure = await page.evaluate(() => {
      const head = document.head.innerHTML;
      const bodyClasses = document.body.className;

      // Get all link tags for CSS
      const linkTags = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.outerHTML);

      // Get tabs HTML
      const tabs = document.querySelector('[role="tablist"]');
      const tabsParent = tabs ? tabs.closest('.container-fluid, .container, main') : null;

      return {
        head,
        bodyClasses,
        linkTags,
        tabsHTML: tabsParent ? tabsParent.outerHTML : (tabs ? tabs.outerHTML : '')
      };
    });

    fs.writeFileSync('complete/page-head.html', pageStructure.head);
    fs.writeFileSync('complete/link-tags.json', JSON.stringify(pageStructure.linkTags, null, 2));
    fs.writeFileSync('complete/body-classes.txt', pageStructure.bodyClasses);

    // Extract templates with detailed info
    console.log('Extracting templates...');
    const templates = await page.evaluate(() => {
      const cards = document.querySelectorAll('.skins-card-container');
      return Array.from(cards).map((card, i) => {
        // Get skin name from class or data attribute
        const innerCard = card.querySelector('.card');
        const skinDiv = card.querySelector('.svg-skin > div');
        const skinClass = skinDiv ? skinDiv.className : '';

        // Find the skin ID from style tag inside
        const styleTag = card.querySelector('style[id]');
        const styleId = styleTag ? styleTag.id : '';

        // Get data attributes
        const dataIndex = innerCard ? innerCard.getAttribute('data-index') : i;
        const dataSkinCategory = innerCard ? innerCard.getAttribute('data-skin-category') : '';

        // Extract skin name from CSS class
        const skinMatch = card.innerHTML.match(/\.skn-([a-z0-9]+)/);
        const skinName = skinMatch ? skinMatch[1] : `skin-${i}`;

        return {
          index: i,
          skinName,
          styleId,
          skinClass,
          dataIndex,
          dataSkinCategory,
          fullHTML: card.outerHTML
        };
      });
    });

    console.log(`Found ${templates.length} templates`);

    // Save each template
    templates.forEach((t, i) => {
      fs.writeFileSync(`complete/templates/${t.skinName}.html`, t.fullHTML);
    });

    // Save templates summary
    fs.writeFileSync('complete/templates-summary.json', JSON.stringify(
      templates.map(t => ({
        index: t.index,
        skinName: t.skinName,
        styleId: t.styleId,
        dataSkinCategory: t.dataSkinCategory
      })), null, 2
    ));

    // Extract previews with colors for each template
    console.log('Extracting preview popups with colors...');

    const allColors = [];
    const previewsData = [];

    for (let i = 0; i < templates.length; i++) {
      try {
        // Re-fetch card elements (DOM may have changed)
        const cardSelector = `.skins-card-container:nth-child(${i + 1})`;

        // Scroll card into view
        await page.evaluate((sel) => {
          const card = document.querySelectorAll('.skins-card-container')[sel];
          if (card) card.scrollIntoView({ block: 'center' });
        }, i);
        await page.waitForTimeout(300);

        // Hover on card
        const cards = await page.$$('.skins-card-container');
        if (cards[i]) {
          await cards[i].hover({ force: true });
          await page.waitForTimeout(500);

          // Click preview button
          const previewBtn = await page.$('button:has-text("Preview template")');
          if (previewBtn) {
            await previewBtn.click();
            await page.waitForTimeout(1500);

            // Extract modal data
            const modalData = await page.evaluate(() => {
              const modal = document.querySelector('[class*="ModalStyles"], [role="dialog"], .modal-preview-skin-container');
              if (!modal) return null;

              // Get template name
              const titleEl = modal.querySelector('.modal-head-text, [class*="title"], h2, h3');
              const templateName = titleEl ? titleEl.textContent.trim() : '';

              // Get all color options
              const colorInputs = modal.querySelectorAll('input[data-color]');
              const colors = Array.from(colorInputs).map(input => ({
                color: input.getAttribute('data-color'),
                label: input.getAttribute('data-label'),
                value: input.value,
                mainIndex: input.getAttribute('data-main-index'),
                itemId: input.getAttribute('data-item-id')
              }));

              // Get the preview SVG
              const previewSvg = modal.querySelector('.svg-skin');

              return {
                templateName,
                colors,
                modalHTML: modal.outerHTML,
                previewSvgHTML: previewSvg ? previewSvg.outerHTML : null
              };
            });

            if (modalData) {
              previewsData.push({
                index: i,
                skinName: templates[i].skinName,
                templateName: modalData.templateName,
                colors: modalData.colors
              });

              // Save modal HTML
              fs.writeFileSync(`complete/previews/${templates[i].skinName}-modal.html`, modalData.modalHTML);

              // Save preview SVG
              if (modalData.previewSvgHTML) {
                fs.writeFileSync(`complete/previews/${templates[i].skinName}-preview.svg`, modalData.previewSvgHTML);
              }

              // Collect all unique colors
              modalData.colors.forEach(c => {
                if (!allColors.find(ac => ac.color === c.color)) {
                  allColors.push(c);
                }
              });

              // Take screenshot
              await page.screenshot({ path: `complete/screenshots/preview-${templates[i].skinName}.png` });
            }

            // Close modal
            const closeBtn = await page.$('[class*="close-btn"], .modal-close, button[aria-label="Close"]');
            if (closeBtn) {
              await closeBtn.click();
            } else {
              await page.keyboard.press('Escape');
            }
            await page.waitForTimeout(500);
          }
        }

        console.log(`Processed template ${i + 1}/${templates.length}: ${templates[i].skinName}`);
      } catch (e) {
        console.log(`Error processing template ${i}: ${e.message}`);
        // Try to close any open modal
        try {
          await page.keyboard.press('Escape');
          await page.waitForTimeout(500);
        } catch (e2) {}
      }
    }

    // Save all previews data
    fs.writeFileSync('complete/previews-data.json', JSON.stringify(previewsData, null, 2));

    // Save all colors
    fs.writeFileSync('complete/all-colors.json', JSON.stringify(allColors, null, 2));

    // Download CSS files
    console.log('Downloading CSS files...');
    const cssUrls = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
        .map(link => link.href)
        .filter(href => href);
    });

    for (let i = 0; i < cssUrls.length; i++) {
      try {
        const response = await page.request.get(cssUrls[i]);
        const css = await response.text();
        const fileName = cssUrls[i].split('/').pop().split('?')[0] || `style-${i}.css`;
        fs.writeFileSync(`complete/css/${fileName}`, css);
        console.log(`Downloaded: ${fileName}`);
      } catch (e) {
        console.log(`Failed to download: ${cssUrls[i]}`);
      }
    }

    // Extract inline styles
    const inlineStyles = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('style'))
        .map(s => s.textContent)
        .join('\n\n/* === NEXT STYLE BLOCK === */\n\n');
    });
    fs.writeFileSync('complete/css/inline-styles.css', inlineStyles);

    // Save full page HTML
    const fullHTML = await page.content();
    fs.writeFileSync('complete/full-page.html', fullHTML);

    // Extract header
    const header = await page.$eval('header', el => el.outerHTML).catch(() => '');
    fs.writeFileSync('complete/components/header.html', header);

    // Extract tabs
    const tabsHTML = await page.evaluate(() => {
      const tabs = document.querySelector('[role="tablist"]');
      return tabs ? tabs.parentElement.outerHTML : '';
    });
    fs.writeFileSync('complete/components/tabs.html', tabsHTML);

    console.log('\nExtraction complete!');
    console.log(`Templates: ${templates.length}`);
    console.log(`Previews: ${previewsData.length}`);
    console.log(`Colors: ${allColors.length}`);

    await page.waitForTimeout(5000);

  } catch (error) {
    console.error('Error:', error);
    await page.screenshot({ path: 'complete/error.png' });
  } finally {
    await browser.close();
  }
}

extractComplete();
