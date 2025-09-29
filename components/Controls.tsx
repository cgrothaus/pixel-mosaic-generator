
import React from 'react';
import { PatternType, PaletteName } from '../types';
import { PATTERN_OPTIONS, PALETTE_OPTIONS, COLOR_PALETTES } from '../constants';
import Slider from './Slider';
import Select from './Select';
import Button from './Button';

interface ControlsProps {
  width: number;
  setWidth: (value: number) => void;
  height: number;
  setHeight: (value: number) => void;
  patternType: PatternType;
  setPatternType: (value: PatternType) => void;
  paletteName: PaletteName;
  setPaletteName: (value: PaletteName) => void;
  startColorOffset: number;
  onRegenerate: () => void;
  onChangeStartColor: () => void;
  onExportSVG: () => void;
  onExportPNG: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  width, setWidth, height, setHeight,
  patternType, setPatternType, paletteName, setPaletteName,
  startColorOffset, onRegenerate, onChangeStartColor, onExportSVG, onExportPNG
}) => {
  const currentStartColor = COLOR_PALETTES[paletteName][startColorOffset];
  return (
    <aside className="w-full md:w-80 lg:w-96 bg-white dark:bg-gray-800 p-6 shadow-lg md:shadow-none overflow-y-auto">
      <div className="space-y-8">
        <header>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pixel Mosaic Generator</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Create unique geometric patterns.</p>
        </header>

        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Grid Settings</h2>
            <div className="space-y-4">
              <Slider label="Width" value={width} onChange={setWidth} min={10} max={100} />
              <Slider label="Height" value={height} onChange={setHeight} min={10} max={100} />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Pattern</h2>
            <div className="space-y-4">
              <Select
                label="Pattern Type"
                value={patternType}
                onChange={(e) => setPatternType(e.target.value as PatternType)}
                options={PATTERN_OPTIONS}
              />
              <Select
                label="Color Palette"
                value={paletteName}
                onChange={(e) => setPaletteName(e.target.value as PaletteName)}
                options={PALETTE_OPTIONS}
              />
              <Button onClick={onChangeStartColor} fullWidth variant="secondary">
                <div className="flex items-center justify-center space-x-2">
                  <span>Change start color</span>
                  <div
                    className="w-4 h-4 border border-gray-400 dark:border-gray-500"
                    style={{ backgroundColor: currentStartColor }}
                  />
                </div>
              </Button>
            </div>
          </section>
        </div>

        <section className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-3">
            <Button onClick={onExportPNG} fullWidth variant="secondary">
              Save as PNG
            </Button>
            <Button onClick={onExportSVG} fullWidth variant="secondary">
              Save as SVG
            </Button>
          </div>
        </section>
      </div>
    </aside>
  );
};

export default Controls;
