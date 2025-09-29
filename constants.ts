
import { PatternType, PaletteName } from './types';

export const COLOR_PALETTES: Record<PaletteName, string[]> = {
  [PaletteName.RAINBOW]: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#38bdf8', '#3b82f6', '#8b5cf6', '#ec4899'],
  [PaletteName.GRAYSCALE]: ['#111827', '#374151', '#6b7280', '#9ca3af', '#d1d5db', '#f3f4f6'],
  [PaletteName.SUNSET]: ['#f97316', '#f59e0b', '#ef4444', '#dc2626', '#991b1b', '#4a044e'],
  [PaletteName.FOREST]: ['#166534', '#15803d', '#16a34a', '#a3e635', '#4d7c0f', '#3f6212'],
};

export const PATTERN_OPTIONS: { value: PatternType; label: string }[] = [
  { value: PatternType.CONCENTRIC_DIAMONDS, label: 'Concentric Diamonds' },
  { value: PatternType.DIAGONAL_STRIPES, label: 'Diagonal Stripes' },
  { value: PatternType.SYMMETRIC_CROSS, label: 'Symmetric Cross' },
  { value: PatternType.RANDOM, label: 'Random' },
];

export const PALETTE_OPTIONS: { value: PaletteName; label: string }[] = [
  { value: PaletteName.RAINBOW, label: 'Rainbow' },
  { value: PaletteName.GRAYSCALE, label: 'Grayscale' },
  { value: PaletteName.SUNSET, label: 'Sunset' },
  { value: PaletteName.FOREST, label: 'Forest' },
];
