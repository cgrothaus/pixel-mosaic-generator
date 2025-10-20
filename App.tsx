
import React, { useState, useCallback, useRef } from 'react';
import { PatternType, PaletteName } from './types';
import { useMosaicGenerator } from './hooks/useMosaicGenerator';
import { exportSVG, exportPNG } from './utils/exportUtils';
import { COLOR_PALETTES } from './constants';
import Canvas from './components/Canvas';
import Controls from './components/Controls';

const App: React.FC = () => {
  const [width, setWidth] = useState<number>(29);
  const [height, setHeight] = useState<number>(29);
  const [patternType, setPatternType] = useState<PatternType>(PatternType.CONCENTRIC_DIAMONDS);
  const [paletteName, setPaletteName] = useState<PaletteName>(PaletteName.RAINBOW);
  const [seed, setSeed] = useState<number>(() => Date.now());
  const [startColorOffset, setStartColorOffset] = useState<number>(0);

  const svgRef = useRef<SVGSVGElement>(null);

  const cells = useMosaicGenerator({ width, height, patternType, paletteName, seed, startColorOffset });

  const handleRegenerate = useCallback(() => {
    setSeed(Date.now());
  }, []);

  const handleChangeStartColor = useCallback(() => {
    const palette = COLOR_PALETTES[paletteName];
    setStartColorOffset((prev) => (prev + 1) % palette.length);
  }, [paletteName]);

  const handleExportSVG = useCallback(() => {
    if (svgRef.current) {
      exportSVG(svgRef.current, `mosaic-${patternType.toLowerCase()}-${width}x${height}.svg`);
    }
  }, [patternType, width, height]);

  const handleExportPNG = useCallback(() => {
    if (svgRef.current) {
      exportPNG(svgRef.current, width, height, `mosaic-${patternType.toLowerCase()}-${width}x${height}.png`);
    }
  }, [width, height, patternType]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 flex-shrink-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 shadow-sm transition-all duration-200">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Pixel Mosaic Generator
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">
          Create beautiful geometric patterns with simple controls
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col lg:flex-row gap-4 lg:gap-8 px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8 pt-4 sm:pt-6 lg:pt-8">
          <Controls
            width={width}
            setWidth={setWidth}
            height={height}
            setHeight={setHeight}
            patternType={patternType}
            setPatternType={setPatternType}
            paletteName={paletteName}
            setPaletteName={setPaletteName}
            startColorOffset={startColorOffset}
            onRegenerate={handleRegenerate}
            onChangeStartColor={handleChangeStartColor}
            onExportSVG={handleExportSVG}
            onExportPNG={handleExportPNG}
          />
          <div className="flex-1 overflow-auto bg-gray-200 dark:bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-700">
            <Canvas ref={svgRef} cells={cells} width={width} height={height} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
