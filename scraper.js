const { chromium } = require('playwright-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

// Add stealth plugin
chromium.use(StealthPlugin());

async function scrapeTemplates() {
  console.log('Launching browser in stealth mode...');

  const browser = await chromium.launch({
    headless: false,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu'
    ]
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 },
    locale: 'en-GB'
  });

  const page = await context.newPage();

  try {
    console.log('Navigating to page...');
    await page.goto('https://www.myperfectcv.co.uk/build-cv/choose-template', {
      waitUntil: 'networkidle',
      timeout: 60000
    });

    // Wait for page to fully load
    await page.waitForTimeout(3000);

    // Handle cookie consent if present
    try {
      const cookieButton = await page.$('button[id*="accept"], button[class*="accept"], .cookie-accept, #onetrust-accept-btn-handler');
      if (cookieButton) {
        await cookieButton.click();
        await page.waitForTimeout(1000);
      }
    } catch (e) {
      console.log('No cookie banner found or already dismissed');
    }

    // Take screenshot of initial page
    await page.screenshot({ path: 'screenshots/initial-page.png', fullPage: true });

    // Click on "All" tab
    console.log('Looking for "All" tab...');
    const allTab = await page.$('text="All"');
    if (allTab) {
      await allTab.click();
      console.log('Clicked "All" tab');
      await page.waitForTimeout(2000);
    }

    // Scroll down slowly to load all templates
    console.log('Scrolling to load all templates...');
    let previousHeight = 0;
    let currentHeight = await page.evaluate(() => document.body.scrollHeight);

    while (previousHeight !== currentHeight) {
      previousHeight = currentHeight;
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(500);
      currentHeight = await page.evaluate(() => document.body.scrollHeight);
    }

    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);

    // Extract page HTML and CSS
    console.log('Extracting HTML structure...');
    const pageHTML = await page.content();
    fs.writeFileSync('extracted/page.html', pageHTML);

    // Extract all stylesheets
    console.log('Extracting stylesheets...');
    const stylesheets = await page.evaluate(() => {
      const sheets = [];
      for (const sheet of document.styleSheets) {
        try {
          if (sheet.href) {
            sheets.push({ type: 'external', href: sheet.href });
          } else {
            const rules = [];
            for (const rule of sheet.cssRules) {
              rules.push(rule.cssText);
            }
            sheets.push({ type: 'inline', css: rules.join('\n') });
          }
        } catch (e) {
          if (sheet.href) {
            sheets.push({ type: 'external', href: sheet.href, error: 'CORS restricted' });
          }
        }
      }
      return sheets;
    });
    fs.writeFileSync('extracted/stylesheets.json', JSON.stringify(stylesheets, null, 2));

    // Extract template cards
    console.log('Extracting template information...');
    const templates = await page.evaluate(() => {
      const templateCards = document.querySelectorAll('[class*="template"], [class*="Template"], [data-template], .template-card, .cv-template');
      const data = [];

      templateCards.forEach((card, index) => {
        data.push({
          index,
          outerHTML: card.outerHTML,
          className: card.className,
          id: card.id,
          dataset: { ...card.dataset },
          computedStyles: window.getComputedStyle(card).cssText
        });
      });

      return data;
    });
    fs.writeFileSync('extracted/templates.json', JSON.stringify(templates, null, 2));

    // Find and extract main template container
    console.log('Extracting main container structure...');
    const mainContainer = await page.evaluate(() => {
      // Find the main content area
      const selectors = [
        '[class*="template-grid"]',
        '[class*="templateGrid"]',
        '[class*="templates-container"]',
        '[class*="gallery"]',
        'main',
        '[role="main"]'
      ];

      for (const selector of selectors) {
        const el = document.querySelector(selector);
        if (el) {
          return {
            selector,
            outerHTML: el.outerHTML,
            className: el.className
          };
        }
      }
      return null;
    });

    if (mainContainer) {
      fs.writeFileSync('extracted/main-container.html', mainContainer.outerHTML);
      fs.writeFileSync('extracted/main-container-info.json', JSON.stringify(mainContainer, null, 2));
    }

    // Hover over first template to see preview button
    console.log('Finding template cards for hover interaction...');

    const templateCardSelector = await page.evaluate(() => {
      // Find clickable template elements
      const possibleSelectors = [
        '[class*="template-item"]',
        '[class*="templateItem"]',
        '[class*="template-card"]',
        '[class*="templateCard"]',
        '[class*="cv-card"]',
        '[class*="cvCard"]',
        '[data-testid*="template"]',
        '.template',
        '[class*="skin"]',
        '[class*="Skin"]'
      ];

      for (const selector of possibleSelectors) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          return { selector, count: elements.length };
        }
      }

      // Try to find by looking for image containers
      const imgContainers = document.querySelectorAll('img[src*="template"], img[src*="cv"], img[src*="resume"]');
      if (imgContainers.length > 0) {
        return { selector: 'img-containers', count: imgContainers.length };
      }

      return null;
    });

    console.log('Template card selector:', templateCardSelector);
    fs.writeFileSync('extracted/template-selector.json', JSON.stringify(templateCardSelector, null, 2));

    // Get all images on the page
    console.log('Extracting all images...');
    const images = await page.evaluate(() => {
      const imgs = document.querySelectorAll('img');
      return Array.from(imgs).map(img => ({
        src: img.src,
        alt: img.alt,
        className: img.className,
        width: img.width,
        height: img.height
      }));
    });
    fs.writeFileSync('extracted/images.json', JSON.stringify(images, null, 2));

    // Try to find and interact with template preview
    console.log('Looking for template preview interaction...');

    // Find elements that might be template cards
    const cardElements = await page.$$('[class*="template"], [class*="Template"], [class*="skin"], [class*="Skin"], [class*="card"], [class*="Card"]');
    console.log(`Found ${cardElements.length} potential template elements`);

    // Hover on first few elements to find the one with preview button
    for (let i = 0; i < Math.min(10, cardElements.length); i++) {
      try {
        await cardElements[i].hover();
        await page.waitForTimeout(500);

        // Check if preview button appeared
        const previewButton = await page.$('text="Preview template"');
        if (previewButton) {
          console.log(`Found preview button on element ${i}`);

          // Take screenshot with hover state
          await page.screenshot({ path: `screenshots/template-hover-${i}.png` });

          // Click preview button
          await previewButton.click();
          await page.waitForTimeout(2000);

          // Extract popup content
          const popupHTML = await page.evaluate(() => {
            const popup = document.querySelector('[class*="modal"], [class*="Modal"], [class*="popup"], [class*="Popup"], [class*="dialog"], [role="dialog"]');
            if (popup) {
              return {
                outerHTML: popup.outerHTML,
                className: popup.className
              };
            }
            return null;
          });

          if (popupHTML) {
            fs.writeFileSync('extracted/popup.html', popupHTML.outerHTML);
            fs.writeFileSync('extracted/popup-info.json', JSON.stringify(popupHTML, null, 2));
            await page.screenshot({ path: 'screenshots/popup.png', fullPage: true });
          }

          // Close popup
          const closeButton = await page.$('[class*="close"], [aria-label="Close"], button:has-text("Close"), [class*="Close"]');
          if (closeButton) {
            await closeButton.click();
            await page.waitForTimeout(500);
          } else {
            await page.keyboard.press('Escape');
            await page.waitForTimeout(500);
          }

          break;
        }
      } catch (e) {
        console.log(`Error on element ${i}:`, e.message);
      }
    }

    // Extract full body HTML with all loaded content
    console.log('Extracting full page content...');
    const fullHTML = await page.content();
    fs.writeFileSync('extracted/full-page.html', fullHTML);

    // Extract all CSS rules
    console.log('Extracting computed styles...');
    const allStyles = await page.evaluate(() => {
      const getAllCSS = () => {
        const css = [];
        for (const sheet of document.styleSheets) {
          try {
            for (const rule of sheet.cssRules) {
              css.push(rule.cssText);
            }
          } catch (e) {
            // CORS restricted
          }
        }
        return css;
      };
      return getAllCSS();
    });
    fs.writeFileSync('extracted/all-styles.css', allStyles.join('\n\n'));

    // Wait for user to see the browser (for debugging)
    console.log('\nScraping complete. Keeping browser open for 30 seconds for inspection...');
    console.log('Check the extracted/ folder for all scraped content.');
    await page.waitForTimeout(30000);

  } catch (error) {
    console.error('Error:', error);
    await page.screenshot({ path: 'screenshots/error.png', fullPage: true });
  } finally {
    await browser.close();
  }
}

// Create directories
fs.mkdirSync('extracted', { recursive: true });
fs.mkdirSync('screenshots', { recursive: true });

scrapeTemplates();
