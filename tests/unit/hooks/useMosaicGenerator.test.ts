import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useMosaicGenerator } from '@/hooks/useMosaicGenerator';
import { PatternType, PaletteName } from '@/types';
import { COLOR_PALETTES } from '@/constants';

describe('useMosaicGenerator', () => {
  const defaultProps = {
    width: 10,
    height: 10,
    patternType: PatternType.CONCENTRIC_DIAMONDS,
    paletteName: PaletteName.RAINBOW,
    seed: 42,
    startColorOffset: 0,
  };

  describe('Basis-Funktionalität', () => {
    it('generiert korrekte Anzahl Zellen (width × height)', () => {
      const { result } = renderHook(() => useMosaicGenerator(defaultProps));
      expect(result.current).toHaveLength(100); // 10 × 10

      const { result: result2 } = renderHook(() =>
        useMosaicGenerator({ ...defaultProps, width: 15, height: 20 })
      );
      expect(result2.current).toHaveLength(300); // 15 × 20
    });

    it('jede Zelle hat korrekte Struktur (x, y, color)', () => {
      const { result } = renderHook(() => useMosaicGenerator(defaultProps));

      result.current.forEach((cell) => {
        expect(cell).toHaveProperty('x');
        expect(cell).toHaveProperty('y');
        expect(cell).toHaveProperty('color');

        expect(typeof cell.x).toBe('number');
        expect(typeof cell.y).toBe('number');
        expect(typeof cell.color).toBe('string');

        expect(cell.x).toBeGreaterThanOrEqual(0);
        expect(cell.x).toBeLessThan(defaultProps.width);
        expect(cell.y).toBeGreaterThanOrEqual(0);
        expect(cell.y).toBeLessThan(defaultProps.height);
        expect(cell.color).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });

    it('verwendet Farben aus der gewählten Palette', () => {
      const { result } = renderHook(() => useMosaicGenerator(defaultProps));
      const palette = COLOR_PALETTES[PaletteName.RAINBOW];

      result.current.forEach((cell) => {
        expect(palette).toContain(cell.color);
      });
    });
  });

  describe('PatternType.CONCENTRIC_DIAMONDS', () => {
    it('ist deterministisch bei gleichen Inputs', () => {
      const props = { ...defaultProps, patternType: PatternType.CONCENTRIC_DIAMONDS };
      const { result: result1 } = renderHook(() => useMosaicGenerator(props));
      const { result: result2 } = renderHook(() => useMosaicGenerator(props));

      expect(result1.current).toEqual(result2.current);
    });

    it('ändert sich bei unterschiedlichen Dimensionen', () => {
      const { result: small } = renderHook(() =>
        useMosaicGenerator({ ...defaultProps, patternType: PatternType.CONCENTRIC_DIAMONDS, width: 5, height: 5 })
      );
      const { result: large } = renderHook(() =>
        useMosaicGenerator({ ...defaultProps, patternType: PatternType.CONCENTRIC_DIAMONDS, width: 10, height: 10 })
      );

      expect(small.current).not.toEqual(large.current);
      expect(small.current).toHaveLength(25);
      expect(large.current).toHaveLength(100);
    });

    it('verwendet Manhattan-Distanz vom Zentrum', () => {
      const props = { ...defaultProps, width: 5, height: 5, patternType: PatternType.CONCENTRIC_DIAMONDS };
      const { result } = renderHook(() => useMosaicGenerator(props));

      // Zentrum (2,2) sollte gleiche Farbe haben wie symmetrische Punkte
      const center = result.current.find(c => c.x === 2 && c.y === 2);
      const symmetric1 = result.current.find(c => c.x === 1 && c.y === 2);
      const symmetric2 = result.current.find(c => c.x === 3 && c.y === 2);
      const symmetric3 = result.current.find(c => c.x === 2 && c.y === 1);
      const symmetric4 = result.current.find(c => c.x === 2 && c.y === 3);

      expect(center).toBeDefined();
      // Alle Punkte mit Distanz 1 sollten dieselbe Farbe haben
      expect(symmetric1?.color).toBe(symmetric2?.color);
      expect(symmetric3?.color).toBe(symmetric4?.color);
      expect(symmetric1?.color).toBe(symmetric3?.color);
    });
  });

  describe('PatternType.CONCENTRIC_SQUARES', () => {
    it('ist deterministisch bei gleichen Inputs', () => {
      const props = { ...defaultProps, patternType: PatternType.CONCENTRIC_SQUARES };
      const { result: result1 } = renderHook(() => useMosaicGenerator(props));
      const { result: result2 } = renderHook(() => useMosaicGenerator(props));

      expect(result1.current).toEqual(result2.current);
    });

    it('verwendet Chebyshev-Distanz (max-Metrik)', () => {
      const props = { ...defaultProps, width: 5, height: 5, patternType: PatternType.CONCENTRIC_SQUARES };
      const { result } = renderHook(() => useMosaicGenerator(props));

      // Ecken sollten gleiche Farbe haben (gleiche max-Distanz vom Zentrum)
      const corner1 = result.current.find(c => c.x === 0 && c.y === 0);
      const corner2 = result.current.find(c => c.x === 4 && c.y === 0);
      const corner3 = result.current.find(c => c.x === 0 && c.y === 4);
      const corner4 = result.current.find(c => c.x === 4 && c.y === 4);

      expect(corner1?.color).toBe(corner2?.color);
      expect(corner2?.color).toBe(corner3?.color);
      expect(corner3?.color).toBe(corner4?.color);
    });
  });

  describe('PatternType.CORNER_DIAMONDS', () => {
    it('ist deterministisch bei gleichen Inputs', () => {
      const props = { ...defaultProps, patternType: PatternType.CORNER_DIAMONDS };
      const { result: result1 } = renderHook(() => useMosaicGenerator(props));
      const { result: result2 } = renderHook(() => useMosaicGenerator(props));

      expect(result1.current).toEqual(result2.current);
    });

    it('verwendet unterschiedliche Referenzpunkte in Quadranten', () => {
      const props = { ...defaultProps, width: 10, height: 10, patternType: PatternType.CORNER_DIAMONDS };
      const { result } = renderHook(() => useMosaicGenerator(props));

      // Teste, dass das Muster variiert (nicht alle Zellen haben dieselbe Farbe)
      const uniqueColors = new Set(result.current.map(c => c.color));
      expect(uniqueColors.size).toBeGreaterThan(1);

      // Pattern sollte vollständiges Grid haben
      expect(result.current).toHaveLength(100);
    });
  });

  describe('PatternType.DIAMOND_PARQUET', () => {
    it('ist deterministisch bei gleichen Inputs', () => {
      const props = { ...defaultProps, patternType: PatternType.DIAMOND_PARQUET };
      const { result: result1 } = renderHook(() => useMosaicGenerator(props));
      const { result: result2 } = renderHook(() => useMosaicGenerator(props));

      expect(result1.current).toEqual(result2.current);
    });

    it('erzeugt gekacheltes Muster', () => {
      const props = { ...defaultProps, width: 16, height: 16, patternType: PatternType.DIAMOND_PARQUET };
      const { result } = renderHook(() => useMosaicGenerator(props));

      // Gekachelte Muster sollten sich wiederholen
      expect(result.current).toHaveLength(256);
      const uniqueColors = new Set(result.current.map(c => c.color));
      expect(uniqueColors.size).toBeGreaterThan(1);
    });
  });

  describe('PatternType.DIAGONAL_STRIPES', () => {
    it('ist deterministisch bei gleichen Inputs', () => {
      const props = { ...defaultProps, patternType: PatternType.DIAGONAL_STRIPES };
      const { result: result1 } = renderHook(() => useMosaicGenerator(props));
      const { result: result2 } = renderHook(() => useMosaicGenerator(props));

      expect(result1.current).toEqual(result2.current);
    });

    it('Diagonalen haben gleiche Farbe (x + y konstant)', () => {
      const props = { ...defaultProps, width: 8, height: 8, patternType: PatternType.DIAGONAL_STRIPES };
      const { result } = renderHook(() => useMosaicGenerator(props));

      // Punkte auf derselben Diagonale (x+y=konstant) sollten gleiche Farbe haben
      const diagonal1 = result.current.filter(c => c.x + c.y === 5);
      const colors = new Set(diagonal1.map(c => c.color));
      expect(colors.size).toBe(1);

      const diagonal2 = result.current.filter(c => c.x + c.y === 7);
      const colors2 = new Set(diagonal2.map(c => c.color));
      expect(colors2.size).toBe(1);
    });
  });

  describe('PatternType.SYMMETRIC_CROSS', () => {
    it('ist deterministisch bei gleichen Inputs', () => {
      const props = { ...defaultProps, patternType: PatternType.SYMMETRIC_CROSS };
      const { result: result1 } = renderHook(() => useMosaicGenerator(props));
      const { result: result2 } = renderHook(() => useMosaicGenerator(props));

      expect(result1.current).toEqual(result2.current);
    });

    it('verwendet Minimum der Distanzen vom Zentrum', () => {
      const props = { ...defaultProps, width: 9, height: 9, patternType: PatternType.SYMMETRIC_CROSS };
      const { result } = renderHook(() => useMosaicGenerator(props));

      // Zentrum
      const center = result.current.find(c => c.x === 4 && c.y === 4);

      // Punkte mit gleicher min-Distanz sollten gleiche Farbe haben
      const minDist1_1 = result.current.find(c => c.x === 3 && c.y === 4);
      const minDist1_2 = result.current.find(c => c.x === 4 && c.y === 3);

      expect(minDist1_1?.color).toBe(minDist1_2?.color);
    });
  });

  describe('PatternType.SPIRAL', () => {
    it('ist deterministisch bei gleichen Inputs', () => {
      const props = { ...defaultProps, patternType: PatternType.SPIRAL };
      const { result: result1 } = renderHook(() => useMosaicGenerator(props));
      const { result: result2 } = renderHook(() => useMosaicGenerator(props));

      expect(result1.current).toEqual(result2.current);
    });

    it('erzeugt spiralförmiges Muster', () => {
      const props = { ...defaultProps, width: 20, height: 20, patternType: PatternType.SPIRAL };
      const { result } = renderHook(() => useMosaicGenerator(props));

      expect(result.current).toHaveLength(400);
      // Spirale sollte verschiedene Farben verwenden
      const uniqueColors = new Set(result.current.map(c => c.color));
      expect(uniqueColors.size).toBeGreaterThan(3);
    });
  });

  describe('PatternType.HEART', () => {
    it('ist deterministisch bei gleichen Inputs', () => {
      const props = { ...defaultProps, patternType: PatternType.HEART };
      const { result: result1 } = renderHook(() => useMosaicGenerator(props));
      const { result: result2 } = renderHook(() => useMosaicGenerator(props));

      expect(result1.current).toEqual(result2.current);
    });

    it('erzeugt herzförmiges Muster', () => {
      const props = { ...defaultProps, width: 29, height: 29, patternType: PatternType.HEART };
      const { result } = renderHook(() => useMosaicGenerator(props));

      expect(result.current).toHaveLength(841); // 29 × 29
      // Herz sollte verschiedene konzentrische Ebenen haben
      const uniqueColors = new Set(result.current.map(c => c.color));
      expect(uniqueColors.size).toBeGreaterThan(2);
    });
  });

  describe('PatternType.RANDOM', () => {
    it('ist deterministisch bei gleichem Seed', () => {
      const props = { ...defaultProps, patternType: PatternType.RANDOM, seed: 12345 };
      const { result: result1 } = renderHook(() => useMosaicGenerator(props));
      const { result: result2 } = renderHook(() => useMosaicGenerator(props));

      expect(result1.current).toEqual(result2.current);
    });

    it('unterschiedlicher Seed produziert unterschiedliches Pattern', () => {
      const seed1 = { ...defaultProps, patternType: PatternType.RANDOM, seed: 111 };
      const seed2 = { ...defaultProps, patternType: PatternType.RANDOM, seed: 222 };

      const { result: result1 } = renderHook(() => useMosaicGenerator(seed1));
      const { result: result2 } = renderHook(() => useMosaicGenerator(seed2));

      expect(result1.current).not.toEqual(result2.current);
    });

    it('verwendet alle Farben aus der Palette (bei genug Zellen)', () => {
      const props = { ...defaultProps, width: 50, height: 50, patternType: PatternType.RANDOM, seed: 42 };
      const { result } = renderHook(() => useMosaicGenerator(props));

      const palette = COLOR_PALETTES[PaletteName.RAINBOW];
      const usedColors = new Set(result.current.map(c => c.color));

      // Bei 2500 Zellen sollten alle 8 Farben verwendet werden
      expect(usedColors.size).toBe(palette.length);
    });
  });

  describe('startColorOffset', () => {
    it('rotiert Farben ohne Pattern-Änderung', () => {
      const base = { ...defaultProps, startColorOffset: 0, patternType: PatternType.CONCENTRIC_DIAMONDS };
      const offset = { ...defaultProps, startColorOffset: 2, patternType: PatternType.CONCENTRIC_DIAMONDS };

      const { result: baseResult } = renderHook(() => useMosaicGenerator(base));
      const { result: offsetResult } = renderHook(() => useMosaicGenerator(offset));

      // Gleiche Position sollte unterschiedliche Farbe haben
      expect(baseResult.current[0].color).not.toBe(offsetResult.current[0].color);

      // Aber die Struktur sollte gleich sein (x, y Positionen)
      expect(baseResult.current.map(c => ({ x: c.x, y: c.y }))).toEqual(
        offsetResult.current.map(c => ({ x: c.x, y: c.y }))
      );
    });

    it('funktioniert mit Modulo über Palette-Länge hinaus', () => {
      const { result } = renderHook(() =>
        useMosaicGenerator({ ...defaultProps, startColorOffset: 100 })
      );

      // Sollte nicht crashen, alle Farben sollten gültig sein
      const palette = COLOR_PALETTES[PaletteName.RAINBOW];
      result.current.forEach(cell => {
        expect(palette).toContain(cell.color);
      });
    });

    it('wirkt auf alle PatternTypes', () => {
      const patternTypes = [
        PatternType.CONCENTRIC_DIAMONDS,
        PatternType.CONCENTRIC_SQUARES,
        PatternType.DIAGONAL_STRIPES,
        PatternType.RANDOM,
      ];

      patternTypes.forEach(patternType => {
        const base = { ...defaultProps, patternType, startColorOffset: 0 };
        const offset = { ...defaultProps, patternType, startColorOffset: 3 };

        const { result: baseResult } = renderHook(() => useMosaicGenerator(base));
        const { result: offsetResult } = renderHook(() => useMosaicGenerator(offset));

        // Farben sollten unterschiedlich sein
        expect(baseResult.current[0].color).not.toBe(offsetResult.current[0].color);
      });
    });
  });

  describe('Palette-Wechsel', () => {
    it('verwendet unterschiedliche Farben bei Palette-Wechsel', () => {
      const rainbow = { ...defaultProps, paletteName: PaletteName.RAINBOW };
      const grayscale = { ...defaultProps, paletteName: PaletteName.GRAYSCALE };

      const { result: rainbowResult } = renderHook(() => useMosaicGenerator(rainbow));
      const { result: grayscaleResult } = renderHook(() => useMosaicGenerator(grayscale));

      // Farben sollten aus unterschiedlichen Paletten stammen
      const rainbowPalette = COLOR_PALETTES[PaletteName.RAINBOW];
      const grayscalePalette = COLOR_PALETTES[PaletteName.GRAYSCALE];

      rainbowResult.current.forEach(cell => {
        expect(rainbowPalette).toContain(cell.color);
      });

      grayscaleResult.current.forEach(cell => {
        expect(grayscalePalette).toContain(cell.color);
      });
    });

    it('alle Paletten funktionieren korrekt', () => {
      const palettes = [
        PaletteName.RAINBOW,
        PaletteName.RAINBOW_EXTENDED,
        PaletteName.GRAYSCALE,
        PaletteName.SUNSET,
        PaletteName.FOREST,
      ];

      palettes.forEach(paletteName => {
        const props = { ...defaultProps, paletteName };
        const { result } = renderHook(() => useMosaicGenerator(props));

        const palette = COLOR_PALETTES[paletteName];
        result.current.forEach(cell => {
          expect(palette).toContain(cell.color);
        });
      });
    });
  });

  describe('Memoization', () => {
    it('gibt gleiches Array-Objekt bei gleichen Props zurück', () => {
      const props = { ...defaultProps };
      const { result, rerender } = renderHook(() => useMosaicGenerator(props));

      const firstRender = result.current;
      rerender();
      const secondRender = result.current;

      // useMemo sollte dasselbe Objekt zurückgeben
      expect(firstRender).toBe(secondRender);
    });

    it('erstellt neues Array bei geänderten Props', () => {
      const { result, rerender } = renderHook(
        ({ width }) => useMosaicGenerator({ ...defaultProps, width }),
        { initialProps: { width: 10 } }
      );

      const firstRender = result.current;
      rerender({ width: 15 });
      const secondRender = result.current;

      // Sollte neues Array sein
      expect(firstRender).not.toBe(secondRender);
      expect(firstRender).toHaveLength(100);
      expect(secondRender).toHaveLength(150);
    });
  });
});
