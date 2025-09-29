# Pixel Mosaic Generator - AI Coding Instructions

## Project Overview

A React-based web application that generates geometric patterns in pixel-art style. Users control grid dimensions, pattern algorithms, and color palettes to create exportable SVG/PNG mosaics.

## Architecture & Key Patterns

### Pattern Generation System

- **Core Logic**: `useMosaicGenerator` hook drives all pattern generation using mathematical algorithms
- **Pattern Types**: Four distinct algorithms in `PatternType` enum (concentric diamonds, diagonal stripes, symmetric cross, random)
- **Algorithm Implementation**: Each pattern uses coordinate-based math (Manhattan distance, min/max functions) for deterministic generation
- **Seeding**: Date-based seeds enable regeneration while maintaining reproducibility

### State Management Pattern

- **Centralized State**: All generation parameters live in `App.tsx` (width, height, pattern, palette, seed)
- **Props Drilling**: State flows down through Controls → individual input components
- **Callback Pattern**: Export functions use `useCallback` with dependencies for memoization

### Color Palette System

- **Palette Structure**: `COLOR_PALETTES` maps enum keys to hex color arrays in `constants.ts`
- **Modular Access**: Algorithms use `palette.length` for cycling, enabling dynamic palette sizes
- **Hex Format**: All colors stored as hex strings (`#ef4444` format)

## Component Architecture

### Canvas Component (`components/Canvas.tsx`)

- **SVG Rendering**: Uses viewBox coordinate system matching grid dimensions
- **Pixel-Perfect**: `shapeRendering="crispEdges"` prevents anti-aliasing
- **Stroke Handling**: Careful padding calculation prevents edge stroke clipping
- **Export Ready**: Forward ref enables direct SVG access for export functions

### Controls Layout (`components/Controls.tsx`)

- **Responsive Design**: Fixed sidebar on desktop, full-width on mobile
- **Section Grouping**: Grid settings, pattern selection, palette selection, actions
- **Component Composition**: Combines reusable Slider, Select, Button components

### Export System (`utils/exportUtils.ts`)

- **SVG Export**: Direct XML serialization of rendered SVG element
- **PNG Export**: Canvas-based conversion with configurable output resolution (2000px default)
- **Sharp Pixels**: `imageSmoothingEnabled = false` preserves pixel-art aesthetic
- **Browser Download**: Uses blob URLs and programmatic link clicking

## Development Workflow

### Build System

- **Vite + React**: Modern development with TypeScript support
- **Development**: `npm run dev` (port 3000, host 0.0.0.0)
- **CDN Dependencies**: Uses AI Studio CDN for React (check `index.html` importmap)
- **Tailwind CSS**: CDN-based styling with dark mode support

### Key File Relationships

1. `types.ts` → `constants.ts` → `useMosaicGenerator.ts` (data flow)
2. `App.tsx` → `Controls.tsx` → input components (UI hierarchy)
3. `Canvas.tsx` ← `useMosaicGenerator` ← `App.tsx` (render pipeline)
4. `exportUtils.ts` ← `App.tsx` (export functionality)

### Pattern Development

- **New Patterns**: Add to `PatternType` enum, implement in `useMosaicGenerator` switch statement
- **New Palettes**: Add to `PaletteName` enum and `COLOR_PALETTES` object
- **Algorithm Tips**: Use coordinate math relative to center points, leverage array length for cycling

### CSS Custom Properties

- **Theme Variables**: `--pixel-border-color` changes with dark mode
- **Tailwind Integration**: Standard Tailwind classes with CDN configuration

## Environment Setup

- **API Key**: Set `GEMINI_API_KEY` in `.env.local` (configured in vite.config.ts)
- **Port**: Development server runs on 3000
- **TypeScript**: Configured for modern React patterns with strict type checking

## Testing Patterns

- **Visual Testing**: Generate patterns with known seeds for consistent output
- **Export Testing**: Verify SVG structure and PNG dimensions
- **Responsive Testing**: Check mobile/desktop layout transitions
