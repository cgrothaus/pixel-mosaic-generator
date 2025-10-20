
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
    <aside className="h-2/5 lg:h-auto overflow-y-auto space-y-4 sm:space-y-6 lg:w-[350px] flex-shrink-0">
      {/* Grid Settings Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Grid Settings
        </h2>
        <div className="space-y-4">
          <Slider label="Width" value={width} onChange={setWidth} min={10} max={100} />
          <Slider label="Height" value={height} onChange={setHeight} min={10} max={100} />
        </div>
      </div>

      {/* Pattern Selection Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Pattern
        </h2>
        <Select
          label="Pattern Type"
          value={patternType}
          onChange={(e) => setPatternType(e.target.value as PatternType)}
          options={PATTERN_OPTIONS}
        />
      </div>

      {/* Color Palette Selection Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Color Palette
        </h2>
        <Select
          label="Color Palette"
          value={paletteName}
          onChange={(e) => setPaletteName(e.target.value as PaletteName)}
          options={PALETTE_OPTIONS}
        />
        <div className="mt-4">
          <button
            onClick={onChangeStartColor}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#DEE1E5] hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-medium rounded-lg transition-colors duration-200"
          >
            <div
              className="w-6 h-6 rounded border-2 border-white shadow"
              style={{ backgroundColor: currentStartColor }}
            />
            <span>Change start color</span>
          </button>
        </div>
      </div>

      {/* Export Section Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Export
        </h2>
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={onExportSVG}
            className="flex-1 px-4 py-2 bg-[#DEE1E5] hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-medium rounded-lg transition-colors duration-200 text-sm sm:text-base"
          >
            Save as SVG
          </button>
          <button
            onClick={onExportPNG}
            className="flex-1 px-4 py-2 bg-[#DEE1E5] hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-medium rounded-lg transition-colors duration-200 text-sm sm:text-base"
          >
            Save as PNG
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Controls;
