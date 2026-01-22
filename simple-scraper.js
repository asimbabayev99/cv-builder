const { chromium } = require('playwright-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');

chromium.use(StealthPlugin());

async function scrape() {
  const browser = await chromium.launch({
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();
  fs.mkdirSync('data/previews', { recursive: true });
  fs.mkdirSync('data/css', { recursive: true });

  try {
    await page.goto('https://www.myperfectcv.co.uk/build-cv/choose-template', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000);

    // Accept cookies
    try { await page.click('#onetrust-accept-btn-handler', { timeout: 3000 }); } catch(e) {}
    await page.waitForTimeout(1000);

    // Click All tab
    await page.click('button:has-text("All")');
    await page.waitForTimeout(2000);

    // Scroll to load all
    for (let i = 0; i < 30; i++) {
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(150);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);

    // Extract all templates and their colors using JavaScript evaluation
    const templatesWithColors = await page.evaluate(() => {
      const results = [];
      const cards = document.querySelectorAll('.skins-card-container');

      cards.forEach((card, index) => {
        // Find skin name from CSS
        const skinMatch = card.innerHTML.match(/\.skn-([a-z0-9]+)/);
        const skinName = skinMatch ? skinMatch[1] : `skin-${index}`;

        // Get template HTML
        const templateHTML = card.outerHTML;

        // Find color inputs if they exist in the card
        const colorInputs = card.querySelectorAll('input[data-color]');
        const colors = Array.from(colorInputs).map(input => ({
          color: input.getAttribute('data-color'),
          label: input.getAttribute('data-label')
        }));

        results.push({
          index,
          skinName,
          colors,
          templateHTML
        });
      });

      return results;
    });

    console.log(`Found ${templatesWithColors.length} templates`);

    // Save templates
    templatesWithColors.forEach(t => {
      fs.writeFileSync(`data/previews/${t.skinName}.html`, t.templateHTML);
    });

    // Save summary with colors
    fs.writeFileSync('data/templates-with-colors.json', JSON.stringify(
      templatesWithColors.map(t => ({ index: t.index, skinName: t.skinName, colors: t.colors })), null, 2
    ));

    // Now open each preview modal using dispatchEvent to bypass overlay
    console.log('Extracting preview modals...');
    const previewsData = [];

    for (let i = 0; i < templatesWithColors.length; i++) {
      try {
        // Use JavaScript to click the preview button
        const modalOpened = await page.evaluate(async (idx) => {
          const cards = document.querySelectorAll('.skins-card-container');
          const card = cards[idx];
          if (!card) return false;

          // Scroll to card
          card.scrollIntoView({ block: 'center' });

          // Find and click the card or preview button
          const previewBtn = card.querySelector('button, [class*="preview"]');
          if (previewBtn) {
            previewBtn.click();
            return true;
          }

          // Try clicking the card itself
          card.click();
          return true;
        }, i);

        if (modalOpened) {
          await page.waitForTimeout(1500);

          // Extract modal data
          const modalData = await page.evaluate(() => {
            const modal = document.querySelector('[class*="ModalStyles"], [role="dialog"], .modal-preview-skin-container, [class*="modal"]');
            if (!modal || modal.style.display === 'none') return null;

            const titleEl = modal.querySelector('.modal-head-text, [class*="title"], h2');
            const templateName = titleEl ? titleEl.textContent.trim() : '';

            // Get all colors from modal
            const colorInputs = modal.querySelectorAll('input[data-color]');
            const colors = Array.from(colorInputs).map(input => ({
              color: input.getAttribute('data-color'),
              label: input.getAttribute('data-label'),
              mainIndex: input.getAttribute('data-main-index'),
              itemId: input.getAttribute('data-item-id')
            }));

            // Get preview SVG
            const previewSvg = modal.querySelector('.svg-skin');

            return {
              templateName,
              colors,
              modalHTML: modal.outerHTML,
              previewSvgHTML: previewSvg ? previewSvg.outerHTML : null
            };
          });

          if (modalData && modalData.colors.length > 0) {
            previewsData.push({
              index: i,
              skinName: templatesWithColors[i].skinName,
              ...modalData
            });

            fs.writeFileSync(`data/previews/${templatesWithColors[i].skinName}-modal.html`, modalData.modalHTML);
            if (modalData.previewSvgHTML) {
              fs.writeFileSync(`data/previews/${templatesWithColors[i].skinName}-preview.svg`, modalData.previewSvgHTML);
            }

            console.log(`✓ Template ${i}: ${templatesWithColors[i].skinName} - ${modalData.colors.length} colors`);
          }

          // Close modal
          await page.keyboard.press('Escape');
          await page.waitForTimeout(300);
        }
      } catch (e) {
        console.log(`Error template ${i}: ${e.message}`);
      }
    }

    // Save all previews data
    fs.writeFileSync('data/previews-data.json', JSON.stringify(previewsData, null, 2));

    // Collect all unique colors
    const allColors = [];
    previewsData.forEach(p => {
      p.colors.forEach(c => {
        if (!allColors.find(ac => ac.color === c.color)) {
          allColors.push(c);
        }
      });
    });
    fs.writeFileSync('data/all-colors.json', JSON.stringify(allColors, null, 2));

    // Download CSS
    const cssUrls = await page.evaluate(() =>
      Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.href)
    );

    for (let i = 0; i < cssUrls.length; i++) {
      try {
        const resp = await page.request.get(cssUrls[i]);
        const css = await resp.text();
        const name = cssUrls[i].split('/').pop().split('?')[0] || `style-${i}.css`;
        fs.writeFileSync(`data/css/${name}`, css);
      } catch (e) {}
    }

    // Inline styles
    const inline = await page.evaluate(() =>
      Array.from(document.querySelectorAll('style')).map(s => s.textContent).join('\n\n')
    );
    fs.writeFileSync('data/css/inline.css', inline);

    // Full page
    fs.writeFileSync('data/full-page.html', await page.content());

    console.log(`\nDone! Templates: ${templatesWithColors.length}, Previews with colors: ${previewsData.length}`);
    await page.waitForTimeout(5000);

  } catch (e) {
    console.error('Error:', e);
  } finally {
    await browser.close();
  }
}

scrape();
