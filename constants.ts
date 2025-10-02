
import { PatternType, PaletteName } from './types';

export const COLOR_PALETTES: Record<PaletteName, string[]> = {
  [PaletteName.RAINBOW]: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#38bdf8', '#3b82f6', '#8b5cf6', '#ec4899'],
  [PaletteName.RAINBOW_EXTENDED]: ['#ef4444', '#f87171', '#fb923c', '#fbbf24', '#fde047', '#84cc16', '#4ade80', '#34d399', '#22d3ee', '#60a5fa', '#818cf8', '#a78bfa', '#c084fc', '#e879f9', '#f472b6'],
  [PaletteName.GRAYSCALE]: ['#111827', '#374151', '#6b7280', '#9ca3af', '#d1d5db', '#f3f4f6'],
  [PaletteName.SUNSET]: ['#f97316', '#f59e0b', '#ef4444', '#dc2626', '#991b1b', '#4a044e'],
  [PaletteName.FOREST]: ['#166534', '#15803d', '#16a34a', '#a3e635', '#4d7c0f', '#3f6212'],
};

export const PATTERN_OPTIONS: { value: PatternType; label: string }[] = [
  { value: PatternType.CONCENTRIC_DIAMONDS, label: 'Concentric Diamonds' },
  { value: PatternType.CONCENTRIC_SQUARES, label: 'Concentric Squares' },
  { value: PatternType.CORNER_DIAMONDS, label: 'Corner Diamonds' },
  { value: PatternType.DIAMOND_PARQUET, label: 'Diamond Parquet' },
  { value: PatternType.DIAGONAL_STRIPES, label: 'Diagonal Stripes' },
  { value: PatternType.SYMMETRIC_CROSS, label: 'Symmetric Cross' },
  { value: PatternType.SPIRAL, label: 'Spiral' },
  { value: PatternType.HEART, label: 'Heart' },
  { value: PatternType.RANDOM, label: 'Random' },
];

export const PALETTE_OPTIONS: { value: PaletteName; label: string }[] = [
  { value: PaletteName.RAINBOW, label: 'Rainbow' },
  { value: PaletteName.RAINBOW_EXTENDED, label: 'Rainbow Extended' },
  { value: PaletteName.GRAYSCALE, label: 'Grayscale' },
  { value: PaletteName.SUNSET, label: 'Sunset' },
  { value: PaletteName.FOREST, label: 'Forest' },
];
