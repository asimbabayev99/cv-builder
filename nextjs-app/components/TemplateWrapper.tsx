'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './TemplateWrapper.module.css';
import { TEMPLATE_COMPONENTS } from './templates';

const A4_WIDTH = 595;
const A4_HEIGHT = 842;

interface TemplateWrapperProps {
  templateName: string;
  showBorder?: boolean;
  themeColor?: string;
}

// Common overrides shared by most templates
function commonOverrides(c: string): string {
  return `
    .inner-rating { background-color: ${c} !important; }
    .totl-expr { background-color: ${c} !important; }
    .sliced-rect .sliced-rect-tile.ratvfill { background-color: ${c} !important; }
  `;
}

// Per-template color override strategies
const TEMPLATE_COLOR_OVERRIDES: Record<string, (c: string) => string> = {
  // MLI1: colored left sidebar + name + right-box accents
  mli1: (c) => `
    ${commonOverrides(c)}
    .left-box { background-color: ${c} !important; }
    .name { color: ${c} !important; }
    .right-box .inner-rating { background-color: ${c} !important; }
    .left-box .inner-rating { background-color: #fff !important; }
    .left-box .sliced-rect .sliced-rect-tile.ratvfill { background-color: #fff !important; }
    .show-btn .btnlnk a:before { background: ${c} !important; }
  `,

  // MLI2: accent on name, sectiontitle, inner-rating, totl-expr
  mli2: (c) => `
    ${commonOverrides(c)}
    .name { color: ${c} !important; }
    .sectiontitle { color: ${c} !important; }
    .sectiontitle:after { background: ${c} !important; }
    .topsection:before { background: ${c} !important; opacity: .15 !important; }
    .topsection { border-color: ${c} !important; }
    .left-box .section, .right-box .section { border-color: ${c} !important; }
  `,

  // MLI3: accent on right-box overlay, sectiontitle border, totl-expr
  mli3: (c) => `
    ${commonOverrides(c)}
    .middlesection .right-box:before { background: ${c} !important; }
    .totl-expr:before { background-color: ${c} !important; }
    .sectiontitle { border-bottom-color: ${c} !important; }
  `,

  // MLI4: topsection background + left/right-box :before overlays
  mli4: (c) => `
    ${commonOverrides(c)}
    .topsection { background: ${c} !important; }
    .parentContainer .left-box:before { background: ${c} !important; }
    .parentContainer .right-box:before { background: ${c} !important; }
  `,

  // MLI5: left-box sectiontitle color + name color + right-box border
  mli5: (c) => `
    ${commonOverrides(c)}
    .name { color: ${c} !important; }
    .left-box .sectiontitle { color: ${c} !important; border-color: ${c} !important; }
    .left-box .section:first-child { border-bottom-color: ${c} !important; }
    .right-box { background-color: ${c} !important; }
    .right-box .sectiontitle { border-bottom-color: #fff !important; }
    .left-box .inner-rating { background-color: ${c} !important; }
    .adrs-field svg .fillclr { fill: ${c} !important; }
    .totl-expr { background-color: ${c} !important; }
  `,

  // MLI6: border, contact section bg, right-box border, innerRating, totl-expr
  mli6: (c) => `
    ${commonOverrides(c)}
    .skn-mli6 { border-color: ${c} !important; }
    .skn-mli6:not(.sortable-item):before { border-color: ${c} !important; }
    .skn-mli6 .sectionadrs { background: ${c} !important; }
    .skn-mli6 .sectionadrs .sortable-item .section { background: ${c} !important; }
    .skn-mli6 .resumeTitle { color: ${c} !important; }
    .skn-mli6 .parentContainer .right-box { border-color: ${c} !important; }
    .skn-mli6 .right-box .section .heading:before { border-color: ${c} !important; }
    .skn-mli6 .innerRating { background-color: ${c} !important; }
    .skn-mli6 .totl-expr { background-color: ${c} !important; }
    .skn-mli6.pict-pcsh-circle .paragraph .pictPic img { border-color: ${c} !important; }
    .skn-mli6.pict-pcsh-square .paragraph .pictPic img { border-color: ${c} !important; }
    .skn-mli6.pict-pcsh-bottomleft .paragraph .pictPic img { border-color: ${c} !important; }
    .skn-mli6.pict-pcsh-bottomright .paragraph .pictPic img { border-color: ${c} !important; }
    .skn-mli6.pict-pcsh-radius .paragraph .pictPic img { border-color: ${c} !important; }
  `,

  // MLA3: gradient background via :before + totl-expr
  mla3: (c) => `
    ${commonOverrides(c)}
    .skn-mla3:before { background: ${c} !important; }
  `,

  // MLA7: accent on firstsection :before/:after + sectiontitle + inner-rating
  mla7: (c) => `
    ${commonOverrides(c)}
    .sectiontitle { color: ${c} !important; }
    .firstsection:before { background: ${c} !important; }
    .firstsection:after { background: ${c} !important; }
  `,

  // MLF1: top border + heading :before + section border + name + icons + topshape
  mlf1: (c) => `
    ${commonOverrides(c)}
    .topsection { border-top-color: ${c} !important; }
    .heading:before { border-top-color: ${c} !important; background: ${c} !important; }
    .parentContainer .section { border-top-color: ${c} !important; }
    .name { color: ${c} !important; }
    .topshape { fill: ${c} !important; }
    .topshape polygon { fill: ${c} !important; }
    .iconRow svg path.rect { fill: ${c} !important; }
    .lang-sec.infobarsec .inner-rating { background-color: ${c} !important; }
  `,

  // MLS8: sectiontitle color + inner-rating + totl-expr
  mls8: (c) => `
    ${commonOverrides(c)}
    .sectiontitle { color: ${c} !important; }
  `,

  // MLS9: minimal
  mls9: (c) => commonOverrides(c),

  // MLT6: inner-rating + sliced tiles + left-box section borders
  mlt6: (c) => `
    ${commonOverrides(c)}
  `,

  // MLU4: left-box background + rating bars (icons stay static color)
  mlu4: (c) => `
    ${commonOverrides(c)}
    .left-box { background-color: ${c} !important; }
    .left-box .inner-rating { background-color: #fff !important; }
    .left-box .rating-bar:before { background-color: ${c} !important; }
    .right-box .inner-rating { background-color: ${c} !important; }
  `,

  // MLU6: inner-rating + ratingBar + totl-expr
  mlu6: (c) => `
    ${commonOverrides(c)}
    .ratingBar:before { background: ${c} !important; }
    .innerRating { background: ${c} !important; }
  `,

  // MLU7: name + sectiontitle + address + innerRating + totl-expr
  mlu7: (c) => `
    ${commonOverrides(c)}
    .skn-mlu7 .name { color: ${c} !important; }
    .skn-mlu7 .sectiontitle { color: ${c} !important; }
    .skn-mlu7 .resumeTitle { color: ${c} !important; }
    .skn-mlu7 .address { color: ${c} !important; }
    .skn-mlu7 .additional_lnk { color: ${c} !important; }
    .skn-mlu7 .innerRating { background-color: ${c} !important; }
    .skn-mlu7 .totl-expr { background-color: ${c} !important; }
  `,

  // MLV4: sectiontitle bg + inner-rating + sliced tiles
  mlv4: (c) => `
    ${commonOverrides(c)}
    .sectiontitle { background: ${c} !important; }
  `,

  // MNA4: sectiontitle + inner-rating + totl-expr
  mna4: (c) => `
    ${commonOverrides(c)}
    .sectiontitle { color: ${c} !important; }
  `,

  // MPA5: border-top on name + inner-rating + totl-expr
  mpa5: (c) => `
    ${commonOverrides(c)}
    .name { border-top-color: ${c} !important; }
  `,

  // MCA2: minimal — inner-rating + totl-expr + sliced tiles
  mca2: (c) => commonOverrides(c),

  // MTA2: minimal
  mta2: (c) => commonOverrides(c),

  // MTA3: minimal
  mta3: (c) => commonOverrides(c),

  // SLI1: inner-rating uses accent
  sli1: (c) => commonOverrides(c),

  // CBA1: inner-rating
  cba1: (c) => commonOverrides(c),

  // CBA2: name + sectiontitle + borders + inner-rating
  cba2: (c) => `
    ${commonOverrides(c)}
    .name { color: ${c} !important; }
    .sectiontitle { color: ${c} !important; }
    .lowerborder { border-color: ${c} !important; }
    .lowerborder2 { border-color: ${c} !important; }
    .heading:before { border-color: ${c} !important; }
  `,

  // CNA1: border-top on name + inner-rating + totl-expr
  cna1: (c) => `
    ${commonOverrides(c)}
    .name { border-top-color: ${c} !important; }
  `,

  // HRA1: inner-rating + totl-expr
  hra1: (c) => commonOverrides(c),

  // HRA2: sectiontitle + inner-rating + totl-expr
  hra2: (c) => `
    ${commonOverrides(c)}
    .sectiontitle { color: ${c} !important; }
    .name { color: ${c} !important; }
  `,

  // LCA1: border-bottom accent + inner-rating + totl-expr
  lca1: (c) => `
    ${commonOverrides(c)}
    .address:last-child { border-bottom-color: ${c} !important; }
  `,

  // PCA1: lowerborder + thinbottomborder + lgtBg:before + inner-rating + totl-expr
  pca1: (c) => `
    ${commonOverrides(c)}
    .lowerborder { border-bottom-color: ${c} !important; }
    .thinbottomborder { border-bottom-color: ${c} !important; }
    .lgtBg:before { background-color: ${c} !important; }
  `,

  // SMA1: inner-rating
  sma1: (c) => commonOverrides(c),

  // SMA2: inner-rating + totl-expr
  sma2: (c) => commonOverrides(c),

  // TMA3: inner-rating + totl-expr
  tma3: (c) => commonOverrides(c),

  // TMA4: sectiontitle color + inner-rating
  tma4: (c) => `
    ${commonOverrides(c)}
    .sectiontitle { color: ${c} !important; }
  `,

  // UPA1: inner-rating + totl-expr
  upa1: (c) => commonOverrides(c),

  // UPA2: inner-rating + totl-expr
  upa2: (c) => commonOverrides(c),

  // ATA1: fallback
  ata1: (c) => commonOverrides(c),
};

function buildThemeOverrideCSS(templateName: string, color: string): string {
  const builder = TEMPLATE_COLOR_OVERRIDES[templateName];
  return builder ? builder(color) : commonOverrides(color);
}

export default function TemplateWrapper({
  templateName,
  showBorder = true,
  themeColor,
}: TemplateWrapperProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot | null>(null);
  const mountRef = useRef<HTMLDivElement | null>(null);
  const themeStyleRef = useRef<HTMLStyleElement | null>(null);
  const [ready, setReady] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scale, setScale] = useState(1);

  const TemplateComponent = TEMPLATE_COMPONENTS[templateName];

  const updateScale = useCallback(() => {
    const host = hostRef.current;
    if (!host) return;
    const width = host.clientWidth;
    const newScale = width / A4_WIDTH;
    setScale(newScale);
    if (mountRef.current) {
      mountRef.current.style.transform = `scale(${newScale})`;
    }
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || shadowRootRef.current) return;

    const shadow = host.attachShadow({ mode: 'open' });
    shadowRootRef.current = shadow;

    // Load scoped CSS inside shadow DOM
    const link1 = document.createElement('link');
    link1.rel = 'stylesheet';
    link1.href = '/css/all.min.css';

    const link2 = document.createElement('link');
    link2.rel = 'stylesheet';
    link2.href = '/css/main-1.0.0.380.css';

    shadow.appendChild(link1);
    shadow.appendChild(link2);

    // Theme override style element (appended after CSS links so it wins)
    const themeStyle = document.createElement('style');
    shadow.appendChild(themeStyle);
    themeStyleRef.current = themeStyle;

    // Create mount point for React portal
    const mount = document.createElement('div');
    mount.style.width = `${A4_WIDTH}px`;
    mount.style.minHeight = `${A4_HEIGHT}px`;
    mount.style.transformOrigin = 'top left';
    mount.style.background = '#fff';
    shadow.appendChild(mount);
    mountRef.current = mount;

    setReady(true);
  }, []);

  // Update theme color override
  useEffect(() => {
    if (!themeStyleRef.current) return;
    themeStyleRef.current.textContent = themeColor
      ? buildThemeOverrideCSS(templateName, themeColor)
      : '';
  }, [themeColor, templateName]);

  useEffect(() => {
    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (hostRef.current) observer.observe(hostRef.current);
    return () => observer.disconnect();
  }, [updateScale]);

  if (!TemplateComponent) return null;

  return (
    <div
      ref={hostRef}
      className={`${styles.wrapper} ${showBorder ? styles.withBorder : ''}`}
      style={{
        width: '100%',
        aspectRatio: `${A4_WIDTH} / ${A4_HEIGHT}`,
      }}
    >
      {ready && mountRef.current && createPortal(
        <TemplateComponent />,
        mountRef.current
      )}
    </div>
  );
}
