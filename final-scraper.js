const { chromium } = require('playwright-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

chromium.use(StealthPlugin());

async function extractAllTemplates() {
  console.log('Launching browser in stealth mode...');

  const browser = await chromium.launch({
    headless: false,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox'
    ]
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 },
    locale: 'en-GB'
  });

  const page = await context.newPage();
  fs.mkdirSync('final/templates', { recursive: true });
  fs.mkdirSync('final/css', { recursive: true });
  fs.mkdirSync('final/previews', { recursive: true });
  fs.mkdirSync('final/components', { recursive: true });

  try {
    console.log('Navigating to page...');
    await page.goto('https://www.myperfectcv.co.uk/build-cv/choose-template', {
      waitUntil: 'networkidle',
      timeout: 60000
    });

    await page.waitForTimeout(3000);

    // Accept cookies
    try {
      const cookieBtn = await page.$('#onetrust-accept-btn-handler');
      if (cookieBtn) {
        await cookieBtn.click();
        await page.waitForTimeout(1000);
      }
    } catch (e) {}

    // Click "All" tab
    console.log('Clicking "All" tab...');
    await page.click('button:has-text("All")');
    await page.waitForTimeout(2000);

    // Scroll to load all
    console.log('Scrolling to load all templates...');
    for (let i = 0; i < 30; i++) {
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(200);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);

    // Extract template containers with correct selector
    console.log('Extracting templates...');
    const templatesData = await page.evaluate(() => {
      const containers = document.querySelectorAll('.skins-card-container');
      const templates = [];

      containers.forEach((container, index) => {
        const svg = container.querySelector('svg');
        const skinClasses = container.className;
        const dataAttrs = {};

        for (const attr of container.attributes) {
          if (attr.name.startsWith('data-')) {
            dataAttrs[attr.name] = attr.value;
          }
        }

        // Get parent container info
        const parent = container.parentElement;
        const parentClasses = parent ? parent.className : '';

        templates.push({
          index,
          className: skinClasses,
          parentClasses,
          dataAttrs,
          svgHTML: svg ? svg.outerHTML : null,
          fullHTML: container.outerHTML
        });
      });

      return templates;
    });

    console.log(`Found ${templatesData.length} template containers`);

    // Save each template
    templatesData.forEach((t, i) => {
      fs.writeFileSync(`final/templates/template-${i}.html`, t.fullHTML);
      if (t.svgHTML) {
        fs.writeFileSync(`final/templates/template-${i}.svg`, t.svgHTML);
      }
    });

    // Save templates summary
    fs.writeFileSync('final/templates-data.json', JSON.stringify(templatesData.map(t => ({
      index: t.index,
      className: t.className,
      parentClasses: t.parentClasses,
      dataAttrs: t.dataAttrs,
      hasSvg: !!t.svgHTML
    })), null, 2));

    // Extract unique SVG templates (some may be duplicates)
    console.log('Finding unique SVG templates...');
    const uniqueSvgs = await page.evaluate(() => {
      const svgs = document.querySelectorAll('.svg-skin');
      const unique = new Map();

      svgs.forEach((svg, i) => {
        // Get parent class to identify template type
        const parent = svg.closest('.skins-card-container');
        const templateId = parent ? parent.getAttribute('data-qa') || `svg-${i}` : `svg-${i}`;

        if (!unique.has(templateId)) {
          unique.set(templateId, {
            id: templateId,
            svgHTML: svg.outerHTML,
            classes: svg.className.baseVal || svg.getAttribute('class') || '',
            viewBox: svg.getAttribute('viewBox'),
            width: svg.getAttribute('width'),
            height: svg.getAttribute('height')
          });
        }
      });

      return Array.from(unique.values());
    });

    console.log(`Found ${uniqueSvgs.length} unique SVG templates`);
    uniqueSvgs.forEach((svg, i) => {
      fs.writeFileSync(`final/templates/unique-svg-${i}-${svg.id}.svg`, svg.svgHTML);
    });
    fs.writeFileSync('final/unique-svgs-data.json', JSON.stringify(uniqueSvgs.map(s => ({
      id: s.id,
      classes: s.classes,
      viewBox: s.viewBox
    })), null, 2));

    // Extract tabs section
    console.log('Extracting tabs...');
    const tabsHTML = await page.evaluate(() => {
      const tabsContainer = document.querySelector('[role="tablist"]');
      if (tabsContainer) {
        return tabsContainer.parentElement.outerHTML;
      }
      return null;
    });
    if (tabsHTML) {
      fs.writeFileSync('final/components/tabs.html', tabsHTML);
    }

    // Extract the main grid container structure
    console.log('Extracting grid structure...');
    const gridHTML = await page.evaluate(() => {
      const grid = document.querySelector('.container-fluid');
      if (grid) {
        // Get just the structural classes and first template
        const clone = grid.cloneNode(true);
        const containers = clone.querySelectorAll('.skins-card-container');
        // Keep only first 3 templates
        containers.forEach((c, i) => {
          if (i > 2) c.remove();
        });
        return clone.outerHTML;
      }
      return null;
    });
    if (gridHTML) {
      fs.writeFileSync('final/components/grid-structure.html', gridHTML);
    }

    // Now extract previews with colors for first few templates
    console.log('Extracting preview popups...');
    const skinCards = await page.$$('.skins-card-container');

    for (let i = 0; i < Math.min(5, skinCards.length); i++) {
      try {
        await skinCards[i].hover();
        await page.waitForTimeout(500);

        const previewBtn = await page.$('[data-testid*="preview"], button:has-text("Preview template")');
        if (previewBtn) {
          await previewBtn.click();
          await page.waitForTimeout(1500);

          // Extract popup data
          const popupData = await page.evaluate(() => {
            const modal = document.querySelector('[class*="ModalStyles"], [role="dialog"]');
            if (!modal) return null;

            // Get color palette
            const colorDivs = modal.querySelectorAll('[data-qa*="color"], [class*="color-"]');
            const colors = Array.from(colorDivs).map(c => {
              const style = window.getComputedStyle(c);
              return {
                backgroundColor: style.backgroundColor,
                className: c.className,
                dataQa: c.getAttribute('data-qa')
              };
            });

            // Get the large preview SVG
            const previewSvg = modal.querySelector('.svg-skin');

            // Get template name
            const titleEl = modal.querySelector('[class*="title"], h2, h3');
            const title = titleEl ? titleEl.textContent : '';

            return {
              modalHTML: modal.outerHTML,
              modalClasses: modal.className,
              colors,
              title,
              previewSvgHTML: previewSvg ? previewSvg.outerHTML : null
            };
          });

          if (popupData) {
            fs.writeFileSync(`final/previews/preview-${i}.html`, popupData.modalHTML);
            if (popupData.previewSvgHTML) {
              fs.writeFileSync(`final/previews/preview-${i}.svg`, popupData.previewSvgHTML);
            }
            fs.writeFileSync(`final/previews/preview-${i}-data.json`, JSON.stringify({
              colors: popupData.colors,
              title: popupData.title,
              modalClasses: popupData.modalClasses
            }, null, 2));
          }

          // Take screenshot
          await page.screenshot({ path: `final/previews/preview-${i}.png` });

          // Close modal
          await page.keyboard.press('Escape');
          await page.waitForTimeout(500);
        }
      } catch (e) {
        console.log(`Error with template ${i}:`, e.message);
      }
    }

    // Download CSS files
    console.log('Downloading CSS files...');
    const cssUrls = [
      'https://assets.myperfectcv.co.uk/build-cv/_next/static/css/74c61b83702de20d.css',
      'https://assets.myperfectcv.co.uk/build-cv/build/rwzv2/stylesheets/uk-jt-main/main-1.0.0.380.css',
      'https://assets.myperfectcv.co.uk/blobcontent/intl/css/fa6-subset/css/all.min.css',
      'https://assets.myperfectcv.co.uk/blob/common/consent-manager/cookie-consent-jt.css'
    ];

    for (let i = 0; i < cssUrls.length; i++) {
      try {
        const response = await page.request.get(cssUrls[i]);
        const css = await response.text();
        fs.writeFileSync(`final/css/style-${i}.css`, css);
        console.log(`Downloaded CSS ${i + 1}/${cssUrls.length}`);
      } catch (e) {
        console.log(`Failed to download CSS ${i}`);
      }
    }

    // Extract inline styles
    console.log('Extracting inline styles...');
    const inlineCSS = await page.evaluate(() => {
      const styles = document.querySelectorAll('style');
      return Array.from(styles).map(s => s.textContent).join('\n\n');
    });
    fs.writeFileSync('final/css/inline-styles.css', inlineCSS);

    // Get full page HTML for reference
    console.log('Saving full page HTML...');
    const fullHTML = await page.content();
    fs.writeFileSync('final/full-page.html', fullHTML);

    // Extract header and all structural elements
    console.log('Extracting header...');
    const headerHTML = await page.evaluate(() => {
      const header = document.querySelector('header');
      return header ? header.outerHTML : '';
    });
    fs.writeFileSync('final/components/header.html', headerHTML);

    console.log('\nExtraction complete!');
    console.log('Keeping browser open for 10 seconds...');
    await page.waitForTimeout(10000);

  } catch (error) {
    console.error('Error:', error);
    await page.screenshot({ path: 'final/error.png' });
  } finally {
    await browser.close();
  }
}

extractAllTemplates();
