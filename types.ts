
export enum PatternType {
  CONCENTRIC_DIAMONDS = 'CONCENTRIC_DIAMONDS',
  DIAGONAL_STRIPES = 'DIAGONAL_STRIPES',
  SYMMETRIC_CROSS = 'SYMMETRIC_CROSS',
  RANDOM = 'RANDOM',
}

export enum PaletteName {
  RAINBOW = 'RAINBOW',
  GRAYSCALE = 'GRAYSCALE',
  SUNSET = 'SUNSET',
  FOREST = 'FOREST',
}

export interface Cell {
  x: number;
  y: number;
  color: string;
}
