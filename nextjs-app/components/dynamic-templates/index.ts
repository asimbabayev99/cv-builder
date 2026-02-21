// Dynamic Template Exports
// These templates accept real data and support multilingual content

export { default as DynamicMli1 } from './mli1';
export { default as DynamicMli2 } from './mli2';
export { default as DynamicMli3 } from './mli3';
export { default as DynamicMli4 } from './mli4';
export { default as DynamicMli5 } from './mli5';
export { default as DynamicMli6 } from './mli6';
export { default as DynamicAta1 } from './ata1';
export { default as DynamicCba1 } from './cba1';
export { default as DynamicCba2 } from './cba2';
export { default as DynamicCna1 } from './cna1';
export { default as DynamicHra1 } from './hra1';
export { default as DynamicHra2 } from './hra2';
export { default as DynamicLca1 } from './lca1';
export { default as DynamicMca2 } from './mca2';
export { default as DynamicPca1 } from './pca1';
export { default as DynamicSma1 } from './sma1';
export { default as DynamicSma2 } from './sma2';
export { default as DynamicMla3 } from './mla3';
export { default as DynamicSli1 } from './sli1';
export { default as DynamicTma3 } from './tma3';
export { default as DynamicTma4 } from './tma4';
export { default as DynamicUpa1 } from './upa1';
export { default as DynamicUpa2 } from './upa2';
export { default as DynamicMla7 } from './mla7';
export { default as DynamicMlf1 } from './mlf1';
export { default as DynamicMls8 } from './mls8';
export { default as DynamicMls9 } from './mls9';
export { default as DynamicMlu4 } from './mlu4';
export { default as DynamicMlu6 } from './mlu6';
export { default as DynamicMlu7 } from './mlu7';
export { default as DynamicMlv4 } from './mlv4';
export { default as DynamicMna4 } from './mna4';
export { default as DynamicMpa5 } from './mpa5';
export { default as DynamicMta2 } from './mta2';
export { default as DynamicMta3 } from './mta3';
export { default as DynamicMlt6 } from './mlt6';

// Template registry for dynamic selection
import DynamicMli1 from './mli1';
import DynamicMli2 from './mli2';
import DynamicMli3 from './mli3';
import DynamicMli4 from './mli4';
import DynamicMli5 from './mli5';
import DynamicMli6 from './mli6';
import DynamicAta1 from './ata1';
import DynamicCba1 from './cba1';
import DynamicCba2 from './cba2';
import DynamicCna1 from './cna1';
import DynamicHra1 from './hra1';
import DynamicHra2 from './hra2';
import DynamicLca1 from './lca1';
import DynamicMca2 from './mca2';
import DynamicPca1 from './pca1';
import DynamicSma1 from './sma1';
import DynamicSma2 from './sma2';
import DynamicMla3 from './mla3';
import DynamicSli1 from './sli1';
import DynamicTma3 from './tma3';
import DynamicTma4 from './tma4';
import DynamicUpa1 from './upa1';
import DynamicUpa2 from './upa2';
import DynamicMla7 from './mla7';
import DynamicMlf1 from './mlf1';
import DynamicMls8 from './mls8';
import DynamicMls9 from './mls9';
import DynamicMlu4 from './mlu4';
import DynamicMlu6 from './mlu6';
import DynamicMlu7 from './mlu7';
import DynamicMlv4 from './mlv4';
import DynamicMna4 from './mna4';
import DynamicMpa5 from './mpa5';
import DynamicMta2 from './mta2';
import DynamicMta3 from './mta3';
import DynamicMlt6 from './mlt6';

import { DynamicTemplateProps } from '@/types/resume';

export type TemplateComponent = React.ComponentType<DynamicTemplateProps>;

export const templateRegistry: Record<string, TemplateComponent> = {
  mli1: DynamicMli1,
  mli2: DynamicMli2,
  mli3: DynamicMli3,
  mli4: DynamicMli4,
  mli5: DynamicMli5,
  mli6: DynamicMli6,
  ata1: DynamicAta1,
  cba1: DynamicCba1,
  cba2: DynamicCba2,
  cna1: DynamicCna1,
  hra1: DynamicHra1,
  hra2: DynamicHra2,
  lca1: DynamicLca1,
  mca2: DynamicMca2,
  pca1: DynamicPca1,
  sma1: DynamicSma1,
  sma2: DynamicSma2,
  mla3: DynamicMla3,
  sli1: DynamicSli1,
  tma3: DynamicTma3,
  tma4: DynamicTma4,
  upa1: DynamicUpa1,
  upa2: DynamicUpa2,
  mla7: DynamicMla7,
  mlf1: DynamicMlf1,
  mls8: DynamicMls8,
  mls9: DynamicMls9,
  mlu4: DynamicMlu4,
  mlu6: DynamicMlu6,
  mlu7: DynamicMlu7,
  mlv4: DynamicMlv4,
  mna4: DynamicMna4,
  mpa5: DynamicMpa5,
  mta2: DynamicMta2,
  mta3: DynamicMta3,
  mlt6: DynamicMlt6,
};

export const templateList = [
  { id: 'mli1', name: 'Milano 1', description: 'Two-column layout with dark sidebar' },
  { id: 'mli2', name: 'Milano 2', description: 'Two-column layout with blue accents' },
  { id: 'mli3', name: 'Milano 3', description: 'Three-section layout with centered name' },
  { id: 'mli4', name: 'Milano 4', description: 'Two-column layout with colored header' },
  { id: 'mli5', name: 'Milano 5', description: 'Two-column layout with sidebar contact icons' },
  { id: 'mli6', name: 'Milano 6', description: 'Bordered layout with photo and contact bar' },
  { id: 'ata1', name: 'Assertive', description: 'Classic single-column with dates on the left' },
  { id: 'cba1', name: 'Centered Bold', description: 'Centered header with bold accents' },
  { id: 'cba2', name: 'Classic Centered', description: 'Classic centered layout with decorative lines' },
  { id: 'cna1', name: 'Corporate Bold', description: 'Uppercase bold with thick top border' },
  { id: 'hra1', name: 'Harvard', description: 'Classic serif with dates column' },
  { id: 'hra2', name: 'Harvard Green', description: 'Georgia serif with dotted borders' },
  { id: 'lca1', name: 'Left Column', description: 'Century Gothic with golden accents' },
  { id: 'mca2', name: 'Modern Contact', description: 'Photo layout with contact icons' },
  { id: 'pca1', name: 'Professional Color', description: 'Bold header with accent background' },
  { id: 'sma1', name: 'Simple Modern', description: 'Clean, minimalist design' },
  { id: 'sma2', name: 'Simple Gray', description: 'Gray accent headers with centered name' },
  { id: 'mla3', name: 'Modern Gradient', description: 'Gradient sidebar with modern styling' },
  { id: 'sli1', name: 'Sleek Impact', description: 'Two-column with navy sidebar and coral accents' },
  { id: 'tma3', name: 'Traditional Modern', description: 'Classic layout with modern styling' },
  { id: 'tma4', name: 'Traditional Clean', description: 'Clean traditional design with gray headers' },
  { id: 'upa1', name: 'Urban Professional', description: 'Modern left sidebar with orange accent' },
  { id: 'upa2', name: 'Urban Classic', description: 'Left sidebar with teal accent' },
  { id: 'mla7', name: 'Modern Layout', description: 'Right sidebar with blue accent' },
  { id: 'mlf1', name: 'Modern Fresh', description: 'Light gray sidebar with orange accent' },
  { id: 'mls8', name: 'Modern Slim', description: 'Compact layout with indigo accents' },
  { id: 'mls9', name: 'Modern Stylish', description: 'Verdana font with blue monogram' },
  { id: 'mlu4', name: 'Modern Urban', description: 'Dark left sidebar with SVG icons' },
  { id: 'mlu6', name: 'Modern Urban Gray', description: 'Gray right sidebar layout' },
  { id: 'mlu7', name: 'Modern Urban Split', description: 'Two-column with border divider' },
  { id: 'mlv4', name: 'Modern Visual', description: 'Montserrat font with coral timeline dots' },
  { id: 'mna4', name: 'Modern Monogram', description: 'Century Gothic with SVG monogram' },
  { id: 'mpa5', name: 'Modern Purple', description: 'Roboto font with purple accents' },
  { id: 'mta2', name: 'Traditional Aligned', description: 'Century Gothic with right-aligned header' },
  { id: 'mta3', name: 'Traditional Icon', description: 'Times Roman with contact icons' },
  { id: 'mlt6', name: 'Modern Layout Split', description: 'Palatino with dark header and gray sidebar' },
];

export function getTemplate(templateId: string): TemplateComponent | null {
  return templateRegistry[templateId] || null;
}
