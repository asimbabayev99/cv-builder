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
}

export default function TemplateWrapper({
  templateName,
  showBorder = true
}: TemplateWrapperProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot | null>(null);
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
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
