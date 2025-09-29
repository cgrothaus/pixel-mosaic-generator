
import { useMemo } from 'react';
import { PatternType, PaletteName, Cell } from '../types';
import { COLOR_PALETTES } from '../constants';

interface MosaicGeneratorProps {
  width: number;
  height: number;
  patternType: PatternType;
  paletteName: PaletteName;
  seed: number;
}

export const useMosaicGenerator = ({
  width,
  height,
  patternType,
  paletteName,
  seed,
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
            colorIndex = Math.floor(distance) % palette.length;
            break;
          }
          case PatternType.DIAGONAL_STRIPES: {
            const value = x + y;
            colorIndex = value % palette.length;
            break;
          }
          case PatternType.SYMMETRIC_CROSS: {
            const distX = Math.abs(x - centerX);
            const distY = Math.abs(y - centerY);
            const value = Math.min(distX, distY);
            colorIndex = Math.floor(value) % palette.length;
            break;
          }
          case PatternType.RANDOM: {
            // Simple pseudo-random using seed to be deterministic
            const randomValue = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
            colorIndex = Math.floor(Math.abs(randomValue) * palette.length) % palette.length;
            break;
          }
        }
        
        newCells.push({ x, y, color: palette[colorIndex] });
      }
    }
    return newCells;
  }, [width, height, patternType, paletteName, seed]);

  return cells;
};
