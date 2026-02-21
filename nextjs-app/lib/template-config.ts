// Template configuration - defines which templates require certain fields

export interface TemplateConfig {
  requiresPhoto: boolean;
  name: string;
  color: string;
}

export const TEMPLATE_CONFIGS: Record<string, TemplateConfig> = {
  mli1: {
    requiresPhoto: true,
    name: 'MLI1',
    color: '#496267',
  },
  mli2: {
    requiresPhoto: false,
    name: 'MLI2',
    color: '#2a5978',
  },
  mli3: {
    requiresPhoto: false,
    name: 'MLI3',
    color: '#009bcc',
  },
  mli4: {
    requiresPhoto: false,
    name: 'MLI4',
    color: '#576d7b',
  },
  mli5: {
    requiresPhoto: false,
    name: 'MLI5',
    color: '#2c5a77',
  },
  mli6: {
    requiresPhoto: true,
    name: 'MLI6',
    color: '#0187de',
  },
  ata1: {
    requiresPhoto: true,
    name: 'ATA1',
    color: '#000000',
  },
  cba1: {
    requiresPhoto: true,
    name: 'CBA1',
    color: '#d76d76',
  },
  cba2: {
    requiresPhoto: false,
    name: 'CBA2',
    color: '#000000',
  },
  sma1: {
    requiresPhoto: false,
    name: 'SMA1',
    color: '#1A4771',
  },
  mla3: {
    requiresPhoto: true,
    name: 'MLA3',
    color: '#DF7866',
  },
  cna1: {
    requiresPhoto: false,
    name: 'CNA1',
    color: '#404041',
  },
  hra1: {
    requiresPhoto: false,
    name: 'HRA1',
    color: '#000000',
  },
  sma2: {
    requiresPhoto: false,
    name: 'SMA2',
    color: '#bcbfc3',
  },
  hra2: {
    requiresPhoto: false,
    name: 'HRA2',
    color: '#003300',
  },
  lca1: {
    requiresPhoto: false,
    name: 'LCA1',
    color: '#fcc74a',
  },
  mca2: {
    requiresPhoto: true,
    name: 'MCA2',
    color: '#000000',
  },
  pca1: {
    requiresPhoto: false,
    name: 'PCA1',
    color: '#1A4771',
  },
  sli1: {
    requiresPhoto: true,
    name: 'SLI1',
    color: '#355666',
  },
  tma3: {
    requiresPhoto: false,
    name: 'TMA3',
    color: '#000000',
  },
  tma4: {
    requiresPhoto: false,
    name: 'TMA4',
    color: '#727272',
  },
  upa1: {
    requiresPhoto: true,
    name: 'UPA1',
    color: '#ff793f',
  },
  upa2: {
    requiresPhoto: false,
    name: 'UPA2',
    color: '#1c8394',
  },
  mla7: {
    requiresPhoto: true,
    name: 'MLA7',
    color: '#4a90a4',
  },
  mlf1: {
    requiresPhoto: true,
    name: 'MLF1',
    color: '#ff7247',
  },
  mls8: {
    requiresPhoto: true,
    name: 'MLS8',
    color: '#696fb0',
  },
  mls9: {
    requiresPhoto: false,
    name: 'MLS9',
    color: '#102A73',
  },
  mlu4: {
    requiresPhoto: true,
    name: 'MLU4',
    color: '#2b2b2b',
  },
  mlu6: {
    requiresPhoto: true,
    name: 'MLU6',
    color: '#4a4a4a',
  },
  mlu7: {
    requiresPhoto: true,
    name: 'MLU7',
    color: '#4a4a4a',
  },
  mlv4: {
    requiresPhoto: true,
    name: 'MLV4',
    color: '#F98C79',
  },
  mna4: {
    requiresPhoto: false,
    name: 'MNA4',
    color: '#4a4a4a',
  },
  mpa5: {
    requiresPhoto: false,
    name: 'MPA5',
    color: '#663399',
  },
  mta2: {
    requiresPhoto: false,
    name: 'MTA2',
    color: '#000000',
  },
  mta3: {
    requiresPhoto: true,
    name: 'MTA3',
    color: '#000000',
  },
  mlt6: {
    requiresPhoto: false,
    name: 'MLT6',
    color: '#3c5769',
  },
};

export function templateRequiresPhoto(templateName: string | null | undefined): boolean {
  if (!templateName) return false;
  return TEMPLATE_CONFIGS[templateName]?.requiresPhoto ?? false;
}
