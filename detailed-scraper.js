const { chromium } = require('playwright-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

chromium.use(StealthPlugin());

async function extractDetailedTemplates() {
  console.log('Launching browser in stealth mode...');

  const browser = await chromium.launch({
    headless: false,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-setuid-sandbox'
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

    await page.waitForTimeout(3000);

    // Handle cookies
    try {
      const cookieButton = await page.$('#onetrust-accept-btn-handler, button[id*="accept"]');
      if (cookieButton) {
        await cookieButton.click();
        await page.waitForTimeout(1000);
      }
    } catch (e) {}

    // Click on "All" tab
    console.log('Clicking "All" tab...');
    await page.click('text="All"');
    await page.waitForTimeout(2000);

    // Scroll to load all templates
    console.log('Loading all templates...');
    let prevHeight = 0;
    let currHeight = await page.evaluate(() => document.body.scrollHeight);
    while (prevHeight !== currHeight) {
      prevHeight = currHeight;
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(300);
      currHeight = await page.evaluate(() => document.body.scrollHeight);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);

    // Extract header structure
    console.log('Extracting header...');
    const headerData = await page.evaluate(() => {
      const header = document.querySelector('header, [class*="header"], [class*="Header"]');
      if (header) {
        return {
          outerHTML: header.outerHTML,
          className: header.className
        };
      }
      return null;
    });
    if (headerData) {
      fs.mkdirSync('detailed/components', { recursive: true });
      fs.writeFileSync('detailed/components/header.html', headerData.outerHTML);
    }

    // Extract tabs structure
    console.log('Extracting tabs...');
    const tabsData = await page.evaluate(() => {
      const tabs = document.querySelector('[class*="tab"], [role="tablist"]');
      if (tabs) {
        return {
          outerHTML: tabs.parentElement ? tabs.parentElement.outerHTML : tabs.outerHTML,
          className: tabs.className
        };
      }
      return null;
    });
    if (tabsData) {
      fs.writeFileSync('detailed/components/tabs.html', tabsData.outerHTML);
    }

    // Extract all template skins with detailed info
    console.log('Extracting template skins...');
    const templates = await page.evaluate(() => {
      const skinItems = document.querySelectorAll('[class*="skinItem"], [class*="skin-item"], .skin-item');
      const templateData = [];

      skinItems.forEach((item, index) => {
        // Get skin name/ID
        const skinId = item.getAttribute('data-skin-id') ||
                       item.getAttribute('data-template') ||
                       item.id ||
                       `template-${index}`;

        // Get the skin name from data attribute or text
        const nameEl = item.querySelector('[class*="name"], [class*="title"], .skin-name');
        const skinName = nameEl ? nameEl.textContent.trim() : skinId;

        // Get the SVG preview
        const svg = item.querySelector('svg');
        const svgContent = svg ? svg.outerHTML : null;

        // Get CSS classes
        const classList = Array.from(item.classList);

        // Get computed dimensions
        const rect = item.getBoundingClientRect();

        // Get all data attributes
        const dataAttrs = {};
        for (const attr of item.attributes) {
          if (attr.name.startsWith('data-')) {
            dataAttrs[attr.name] = attr.value;
          }
        }

        // Get the full HTML
        const fullHTML = item.outerHTML;

        // Get any nested elements
        const previewBtn = item.querySelector('[class*="preview"], button');
        const hasPreviewBtn = !!previewBtn;

        templateData.push({
          index,
          skinId,
          skinName,
          classList,
          dataAttrs,
          width: rect.width,
          height: rect.height,
          svgContent,
          fullHTML,
          hasPreviewBtn
        });
      });

      return templateData;
    });

    console.log(`Found ${templates.length} templates`);
    fs.mkdirSync('detailed/templates', { recursive: true });

    // Save each template individually
    templates.forEach((template, i) => {
      fs.writeFileSync(`detailed/templates/template-${i}.json`, JSON.stringify(template, null, 2));
      if (template.svgContent) {
        fs.writeFileSync(`detailed/templates/template-${i}.svg`, template.svgContent);
      }
      fs.writeFileSync(`detailed/templates/template-${i}.html`, template.fullHTML);
    });

    // Save summary
    fs.writeFileSync('detailed/templates-summary.json', JSON.stringify(
      templates.map(t => ({
        index: t.index,
        skinId: t.skinId,
        skinName: t.skinName,
        classList: t.classList,
        dataAttrs: t.dataAttrs
      })), null, 2
    ));

    // Extract popup/modal for each template type
    console.log('Extracting popup structures...');
    fs.mkdirSync('detailed/popups', { recursive: true });

    // Get first template and click preview
    const skinItems = await page.$$('[class*="skinItem"], [class*="skin-item"], .skin-item');

    if (skinItems.length > 0) {
      // Extract popup for first template
      await skinItems[0].hover();
      await page.waitForTimeout(500);

      const previewBtn = await page.$('text="Preview template"');
      if (previewBtn) {
        await previewBtn.click();
        await page.waitForTimeout(1500);

        // Extract popup structure
        const popupData = await page.evaluate(() => {
          const modal = document.querySelector('[class*="modal"], [class*="Modal"], [role="dialog"], [class*="preview-modal"]');
          if (!modal) return null;

          // Get all color options
          const colorOptions = modal.querySelectorAll('[class*="color"], [class*="Color"], [data-color]');
          const colors = Array.from(colorOptions).map(c => ({
            color: c.getAttribute('data-color') || c.style.backgroundColor ||
                   window.getComputedStyle(c).backgroundColor,
            className: c.className
          }));

          // Get the preview image/SVG
          const previewSvg = modal.querySelector('svg');
          const previewImg = modal.querySelector('img[class*="preview"]');

          return {
            modalHTML: modal.outerHTML,
            modalClasses: modal.className,
            colors,
            hasPreviewSvg: !!previewSvg,
            hasPreviewImg: !!previewImg,
            previewSvgHTML: previewSvg ? previewSvg.outerHTML : null
          };
        });

        if (popupData) {
          fs.writeFileSync('detailed/popups/modal-structure.html', popupData.modalHTML);
          fs.writeFileSync('detailed/popups/modal-data.json', JSON.stringify(popupData, null, 2));
          if (popupData.previewSvgHTML) {
            fs.writeFileSync('detailed/popups/preview-svg.svg', popupData.previewSvgHTML);
          }
        }

        // Close modal
        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);
      }
    }

    // Extract main content area structure
    console.log('Extracting main content structure...');
    const mainContent = await page.evaluate(() => {
      const main = document.querySelector('main, [role="main"], [class*="content"], [class*="Content"]');
      if (main) {
        // Get just the structure without all the template content
        const clone = main.cloneNode(true);
        // Remove all skin items except first few to reduce size
        const skins = clone.querySelectorAll('[class*="skinItem"]');
        skins.forEach((skin, i) => {
          if (i > 2) skin.remove();
        });
        return {
          structure: clone.outerHTML,
          className: main.className
        };
      }
      return null;
    });

    if (mainContent) {
      fs.writeFileSync('detailed/components/main-content-structure.html', mainContent.structure);
    }

    // Extract all unique CSS classes used
    console.log('Extracting CSS class mapping...');
    const cssClasses = await page.evaluate(() => {
      const allElements = document.querySelectorAll('*');
      const classMap = {};

      allElements.forEach(el => {
        if (el.className && typeof el.className === 'string') {
          el.className.split(' ').forEach(cls => {
            if (cls) {
              if (!classMap[cls]) {
                classMap[cls] = {
                  count: 0,
                  computedStyle: null,
                  tagNames: new Set()
                };
              }
              classMap[cls].count++;
              classMap[cls].tagNames.add(el.tagName);
            }
          });
        }
      });

      // Convert sets to arrays for JSON
      Object.keys(classMap).forEach(cls => {
        classMap[cls].tagNames = Array.from(classMap[cls].tagNames);
      });

      return classMap;
    });
    fs.writeFileSync('detailed/css-classes.json', JSON.stringify(cssClasses, null, 2));

    // Extract external CSS URLs
    console.log('Extracting CSS URLs...');
    const cssUrls = await page.evaluate(() => {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      return Array.from(links).map(link => link.href);
    });
    fs.writeFileSync('detailed/css-urls.json', JSON.stringify(cssUrls, null, 2));

    // Fetch and save external CSS
    console.log('Downloading external CSS files...');
    fs.mkdirSync('detailed/css', { recursive: true });

    for (let i = 0; i < cssUrls.length; i++) {
      try {
        const response = await page.request.get(cssUrls[i]);
        const cssContent = await response.text();
        fs.writeFileSync(`detailed/css/style-${i}.css`, cssContent);
        console.log(`Downloaded CSS ${i + 1}/${cssUrls.length}`);
      } catch (e) {
        console.log(`Failed to download CSS ${i}: ${e.message}`);
      }
    }

    // Extract inline styles
    console.log('Extracting inline styles...');
    const inlineStyles = await page.evaluate(() => {
      const styleTags = document.querySelectorAll('style');
      return Array.from(styleTags).map((style, i) => ({
        index: i,
        content: style.textContent
      }));
    });
    fs.writeFileSync('detailed/inline-styles.json', JSON.stringify(inlineStyles, null, 2));
    inlineStyles.forEach((style, i) => {
      fs.writeFileSync(`detailed/css/inline-${i}.css`, style.content);
    });

    // Extract footer
    console.log('Extracting footer...');
    const footerData = await page.evaluate(() => {
      const footer = document.querySelector('footer, [class*="footer"], [class*="Footer"]');
      if (footer) {
        return footer.outerHTML;
      }
      return null;
    });
    if (footerData) {
      fs.writeFileSync('detailed/components/footer.html', footerData);
    }

    // Get the full page structure
    console.log('Extracting full page structure...');
    const fullStructure = await page.evaluate(() => {
      return {
        doctype: '<!DOCTYPE html>',
        html: document.documentElement.outerHTML,
        head: document.head.innerHTML,
        bodyClasses: document.body.className
      };
    });
    fs.writeFileSync('detailed/page-structure.json', JSON.stringify(fullStructure, null, 2));

    console.log('\nExtraction complete!');
    console.log('Keeping browser open for 10 seconds...');
    await page.waitForTimeout(10000);

  } catch (error) {
    console.error('Error:', error);
    await page.screenshot({ path: 'detailed/error.png', fullPage: true });
  } finally {
    await browser.close();
  }
}

fs.mkdirSync('detailed', { recursive: true });
extractDetailedTemplates();
