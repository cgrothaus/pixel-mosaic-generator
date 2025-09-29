import { useMemo } from 'react';
import { PatternType, PaletteName, Cell } from '../types';
import { COLOR_PALETTES } from '../constants';

interface MosaicGeneratorProps {
  width: number;
  height: number;
  patternType: PatternType;
  paletteName: PaletteName;
  seed: number;
  startColorOffset: number;
}

export const useMosaicGenerator = ({
  width,
  height,
  patternType,
  paletteName,
  seed,
  startColorOffset,
}: MosaicGeneratorProps): Cell[] => {
  const cells = useMemo(() => {
    const newCells: Cell[] = [];
    const palette = COLOR_PALETTES[paletteName];
    const centerX = (width - 1) / 2;
    const centerY = (height - 1) / 2;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let colorIndex = 0;

        switch (patternType) {
          case PatternType.CONCENTRIC_DIAMONDS: {
            const distance = Math.abs(x - centerX) + Math.abs(y - centerY);
            // The user-provided image shows this pattern starting with purple (index 6 in the default rainbow palette) at the center.
            // Adding an offset to match the reference image.
            const offset = palette.length > 2 ? palette.length - 2 : 0;
            colorIndex = (Math.floor(distance) + offset + startColorOffset) % palette.length;
            break;
          }
          case PatternType.DIAGONAL_STRIPES: {
            const value = x + y;
            colorIndex = (value + startColorOffset) % palette.length;
            break;
          }
          case PatternType.SYMMETRIC_CROSS: {
            const distX = Math.abs(x - centerX);
            const distY = Math.abs(y - centerY);
            const value = Math.min(distX, distY);
            colorIndex = (Math.floor(value) + startColorOffset) % palette.length;
            break;
          }
          case PatternType.RANDOM: {
            // Simple pseudo-random using seed to be deterministic
            const randomValue = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
            colorIndex = (Math.floor(Math.abs(randomValue) * palette.length) + startColorOffset) % palette.length;
            break;
          }
        }

        newCells.push({ x, y, color: palette[colorIndex] });
      }
    }
    return newCells;
  }, [width, height, patternType, paletteName, seed, startColorOffset]);

  return cells;
};
