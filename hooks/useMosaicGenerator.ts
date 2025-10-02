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
          case PatternType.CONCENTRIC_SQUARES: {
            const distance = Math.max(Math.abs(x - centerX), Math.abs(y - centerY));
            const offset = palette.length > 2 ? palette.length - 2 : 0;
            colorIndex = (Math.floor(distance) + offset + startColorOffset) % palette.length;
            break;
          }
          case PatternType.CORNER_DIAMONDS: {
            // Swap triangular segments: each quadrant shows diamonds from opposite corner
            let distance;

            if (x < centerX && y < centerY) {
              // Upper left quadrant: show diamonds from upper right corner
              distance = Math.abs(x - (width - 1)) + Math.abs(y - 0);
            } else if (x >= centerX && y < centerY) {
              // Upper right quadrant: show diamonds from upper left corner
              distance = Math.abs(x - 0) + Math.abs(y - 0);
            } else if (x < centerX && y >= centerY) {
              // Lower left quadrant: show diamonds from lower right corner
              distance = Math.abs(x - (width - 1)) + Math.abs(y - (height - 1));
            } else {
              // Lower right quadrant: show diamonds from lower left corner
              distance = Math.abs(x - 0) + Math.abs(y - (height - 1));
            }

            const offset = palette.length > 2 ? palette.length - 2 : 0;
            colorIndex = (Math.floor(distance) + offset + startColorOffset) % palette.length;
            break;
          }
          case PatternType.DIAMOND_PARQUET: {
            // Create a tiled version where the corner of concentric diamonds is at center
            // Shift the pattern by half the tile size to create parquet effect
            const tileSize = palette.length * 2; // Size of one complete diamond cycle
            const shiftedX = (x + Math.floor(tileSize / 2)) % tileSize;
            const shiftedY = (y + Math.floor(tileSize / 2)) % tileSize;
            const tileCenterX = Math.floor(tileSize / 2);
            const tileCenterY = Math.floor(tileSize / 2);
            const distance = Math.abs(shiftedX - tileCenterX) + Math.abs(shiftedY - tileCenterY);
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
          case PatternType.SPIRAL: {
            // Calculate angle from center point
            const deltaX = x - centerX;
            const deltaY = y - centerY;
            const angle = Math.atan2(deltaY, deltaX);

            // Calculate distance from center
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            // Create spiral by combining angle and distance
            // Normalize angle to 0-2π range and scale by spiral tightness
            const normalizedAngle = (angle + Math.PI) / (2 * Math.PI);
            const spiralValue = normalizedAngle * palette.length + distance * 0.5;

            colorIndex = (Math.floor(spiralValue) + startColorOffset) % palette.length;
            break;
          }
          case PatternType.HEART: {
            // Heart shape using mathematical heart equation
            // Create concentric hearts that grow outward to fill the entire canvas
            const baseScale = Math.min(width, height) / 12; // Start with smaller hearts
            const normXBase = (x - centerX);
            const normYBase = -(y - centerY - 1) + baseScale * 0.3; // Flip Y, move down by 1 row, and shift slightly up for better centering

            let distance = palette.length; // Default to outermost color

            // Test multiple heart scales from small to large
            for (let scaleStep = 0; scaleStep < palette.length * 2; scaleStep++) {
              const currentScale = baseScale * (0.5 + scaleStep * 0.3); // Gradually increase scale
              const normX = normXBase / currentScale;
              const normY = normYBase / currentScale;

              // Heart equation: (x² + y² - 1)³ - x²y³ = 0
              const heartValue = Math.pow(normX * normX + normY * normY - 1, 3) - normX * normX * Math.pow(normY, 3);

              if (heartValue <= 0) {
                // Inside this heart scale - use this distance
                distance = scaleStep;
                break;
              }
            }

            colorIndex = (distance + startColorOffset) % palette.length;
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
