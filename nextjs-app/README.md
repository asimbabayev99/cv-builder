# CV Builder - Next.js App

A React/Next.js implementation of the CV Template Chooser with template preview functionality.

## Features

- 36 professionally designed CV templates
- Template preview with color customization
- Responsive design
- Tab-based filtering (Popular / All)
- Modal preview with color palette

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd nextjs-app
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
nextjs-app/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page (Template Chooser)
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Header.tsx         # Header component
│   ├── Footer.tsx         # Footer component
│   ├── Tabs.tsx           # Tab navigation
│   ├── TemplateCard.tsx   # Individual template card
│   ├── TemplateGrid.tsx   # Grid of templates
│   ├── ColorPalette.tsx   # Color selection
│   └── PreviewModal.tsx   # Template preview modal
├── data/                  # Data files
│   ├── templates.ts       # Template metadata
│   └── colors.ts          # Color palette data
├── public/                # Static assets
│   ├── templates/         # Template HTML files
│   └── css/               # CSS files
└── scripts/               # Build scripts
    └── wrap-templates.js  # Script to wrap templates
```

## Templates

The app includes 36 CV templates:
- Milano (1-6)
- Modular (4, 6, 7)
- Cubic (1, 2)
- Malibu
- Horizon (1, 2)
- And many more...

## Color Customization

8 color groups with sub-colors:
- Aluminium, Bordeaux, Terracotta, Ochre
- Castleton, Smalt Blue, Ink Blue, Lead

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- CSS Modules
