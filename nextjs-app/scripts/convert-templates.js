#!/usr/bin/env node

/**
 * Converts HTML template files in public/templates/ to React TSX components
 * in components/templates/.
 *
 * Usage: node scripts/convert-templates.js
 */

const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = path.join(__dirname, '..', 'public', 'templates');
const OUTPUT_DIR = path.join(__dirname, '..', 'components', 'templates');

// ── Helpers ────────────────────────────────────────────────────────────────

function toPascalCase(str) {
  return str.replace(/(^|[-_])(\w)/g, (_, _sep, c) => c.toUpperCase());
}

// ── Style string → object literal ──────────────────────────────────────────

function convertInlineStyle(styleStr) {
  // Parse "color: red; font-size: 12px" → {{ color: 'red', fontSize: '12px' }}
  const pairs = [];
  const parts = styleStr.split(';').map(s => s.trim()).filter(Boolean);
  for (const part of parts) {
    const colonIdx = part.indexOf(':');
    if (colonIdx === -1) continue;
    const prop = part.slice(0, colonIdx).trim();
    const val = part.slice(colonIdx + 1).trim();
    // Convert CSS prop to camelCase
    const camelProp = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    // Escape single quotes inside val, wrap in single quotes
    const escapedVal = val.replace(/'/g, "\\'");
    pairs.push(`${camelProp}: '${escapedVal}'`);
  }
  // Return double braces for JSX style attribute: style={{ ... }}
  return `{{ ${pairs.join(', ')} }}`;
}

// ── SVG attribute map ──────────────────────────────────────────────────────

const SVG_ATTR_MAP = {
  'fill-rule': 'fillRule',
  'clip-rule': 'clipRule',
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'fill-opacity': 'fillOpacity',
  'stroke-opacity': 'strokeOpacity',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'clip-path': 'clipPath',
  'font-size': 'fontSize',
  'font-family': 'fontFamily',
  'font-weight': 'fontWeight',
  'text-anchor': 'textAnchor',
  'text-decoration': 'textDecoration',
  'dominant-baseline': 'dominantBaseline',
  'alignment-baseline': 'alignmentBaseline',
  'baseline-shift': 'baselineShift',
  'stop-color': 'stopColor',
  'stop-opacity': 'stopOpacity',
  'color-interpolation': 'colorInterpolation',
  'color-interpolation-filters': 'colorInterpolationFilters',
  'flood-color': 'floodColor',
  'flood-opacity': 'floodOpacity',
  'lighting-color': 'lightingColor',
  'shape-rendering': 'shapeRendering',
  'image-rendering': 'imageRendering',
  'pointer-events': 'pointerEvents',
  'xlink:href': 'xlinkHref',
  'xml:space': 'xmlSpace',
  'xmlns:xlink': 'xmlnsXlink',
};

// HTML attributes that need renaming for React
const HTML_ATTR_MAP = {
  'class': 'className',
  'for': 'htmlFor',
  'tabindex': 'tabIndex',
  'colspan': 'colSpan',
  'rowspan': 'rowSpan',
  'maxlength': 'maxLength',
  'cellpadding': 'cellPadding',
  'cellspacing': 'cellSpacing',
  'readonly': 'readOnly',
  'crossorigin': 'crossOrigin',
  'autocomplete': 'autoComplete',
  'autofocus': 'autoFocus',
  'enctype': 'encType',
  'formaction': 'formAction',
  'novalidate': 'noValidate',
  'accesskey': 'accessKey',
  'contenteditable': 'contentEditable',
  'contextmenu': 'contextMenu',
  'spellcheck': 'spellCheck',
};

// Void (self-closing) HTML elements
const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr',
]);

// ── Extract <style> blocks ─────────────────────────────────────────────────

function extractStyles(html) {
  const styles = [];
  const withoutStyles = html.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (match, content) => {
    styles.push(content);
    return '';
  });
  return { styles, html: withoutStyles };
}

// ── Convert HTML body to JSX ───────────────────────────────────────────────

function convertHtmlToJsx(html) {
  let jsx = html;

  // 1. Convert comments: <!-- ... --> → {/* ... */}
  jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

  // 2. Handle self-closing void elements that aren't already self-closed
  //    Match <img ...> (not <img ... />) and convert to <img ... />
  for (const tag of VOID_ELEMENTS) {
    // Match opening void tags that are NOT already self-closing
    const re = new RegExp(`<(${tag})(\\s[^>]*)?\\/?>`, 'gi');
    jsx = jsx.replace(re, (match, tagName, attrs) => {
      attrs = attrs || '';
      // Remove trailing slash if present (we'll add our own)
      attrs = attrs.replace(/\s*\/\s*$/, '');
      return `<${tagName}${attrs} />`;
    });
  }

  // 3. Convert inline style="..." to style={{...}}
  //    We need to be careful not to match style tags or CSS
  //    convertInlineStyle returns {{ ... }} so we just use style={result}
  jsx = jsx.replace(/(\s)style="([^"]*)"/g, (match, prefix, styleVal) => {
    if (!styleVal.trim()) return `${prefix}style={{}}`;
    return `${prefix}style=${convertInlineStyle(styleVal)}`;
  });

  // 4. Rename HTML attributes
  for (const [htmlAttr, reactAttr] of Object.entries(HTML_ATTR_MAP)) {
    // Match as a whole-word attribute (preceded by space or tag-start, followed by =)
    const re = new RegExp(`(\\s)${htmlAttr}(=)`, 'g');
    jsx = jsx.replace(re, `$1${reactAttr}$2`);
    // Also handle boolean attributes without values: e.g., tabindex=""
    const reBool = new RegExp(`(\\s)${htmlAttr}(?=\\s|>|\\/)`, 'g');
    jsx = jsx.replace(reBool, `$1${reactAttr}`);
  }

  // 5. Rename SVG attributes
  for (const [svgAttr, reactAttr] of Object.entries(SVG_ATTR_MAP)) {
    const escaped = svgAttr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(\\s)${escaped}(=)`, 'g');
    jsx = jsx.replace(re, `$1${reactAttr}$2`);
  }

  // 6. Convert draggable="false" → draggable={false} and draggable="true" → draggable={true}
  jsx = jsx.replace(/draggable="false"/g, 'draggable={false}');
  jsx = jsx.replace(/draggable="true"/g, 'draggable={true}');

  // 7. Handle tabIndex="" (empty string) → tabIndex={0}
  jsx = jsx.replace(/tabIndex=""/g, 'tabIndex={0}');
  // Convert numeric tabIndex
  jsx = jsx.replace(/tabIndex="(\d+)"/g, 'tabIndex={$1}');

  // 8. Fix data-testid values with backtick template syntax: {`...`} → plain string
  //    e.g. data-testid="{`embd-78pIea6`}" → data-testid="embd-78pIea6"
  jsx = jsx.replace(/="\{`([^`]*)`\}"/g, '="$1"');

  return jsx;
}

// ── Escape backticks and ${} in CSS for template literals ──────────────────

function escapeCssForTemplateLiteral(css) {
  return css.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

// ── Main conversion ────────────────────────────────────────────────────────

function convertTemplate(filename) {
  const filePath = path.join(TEMPLATES_DIR, filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const baseName = path.basename(filename, '.html');
  const componentName = 'Template' + toPascalCase(baseName);

  // Extract styles
  const { styles, html: bodyHtml } = extractStyles(raw);

  // Convert body HTML to JSX
  const jsxBody = convertHtmlToJsx(bodyHtml);

  // Build the style string — combine all style blocks
  const combinedCss = styles.join('\n');
  const escapedCss = escapeCssForTemplateLiteral(combinedCss);

  // Build component
  const component = `/* eslint-disable */
// @ts-nocheck
export default function ${componentName}() {
  return (
    <>
      <style>{\`${escapedCss}\`}</style>
      ${jsxBody.trim()}
    </>
  );
}
`;

  return { baseName, componentName, component };
}

// ── Run ────────────────────────────────────────────────────────────────────

function main() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const files = fs.readdirSync(TEMPLATES_DIR).filter(f => f.endsWith('.html'));
  const registry = [];

  console.log(`Converting ${files.length} templates...\n`);

  for (const file of files) {
    try {
      const { baseName, componentName, component } = convertTemplate(file);
      const outPath = path.join(OUTPUT_DIR, `${baseName}.tsx`);
      fs.writeFileSync(outPath, component, 'utf-8');
      registry.push({ baseName, componentName });
      console.log(`  ✓ ${file} → ${baseName}.tsx (${componentName})`);
    } catch (err) {
      console.error(`  ✗ ${file}: ${err.message}`);
    }
  }

  // Generate index.ts registry
  const imports = registry
    .map(r => `import ${r.componentName} from './${r.baseName}';`)
    .join('\n');

  const entries = registry
    .map(r => `  '${r.baseName}': ${r.componentName},`)
    .join('\n');

  const indexContent = `import { ComponentType } from 'react';

${imports}

export const TEMPLATE_COMPONENTS: Record<string, ComponentType> = {
${entries}
};
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), indexContent, 'utf-8');
  console.log(`\n  ✓ index.ts (registry with ${registry.length} templates)`);
  console.log(`\nDone! ${registry.length} templates converted.`);
}

main();
