
import React, { useState, useCallback, useRef } from 'react';
import { PatternType, PaletteName } from './types';
import { useMosaicGenerator } from './hooks/useMosaicGenerator';
import { exportSVG, exportPNG } from './utils/exportUtils';
import Canvas from './components/Canvas';
import Controls from './components/Controls';

const App: React.FC = () => {
  const [width, setWidth] = useState<number>(29);
  const [height, setHeight] = useState<number>(29);
  const [patternType, setPatternType] = useState<PatternType>(PatternType.CONCENTRIC_DIAMONDS);
  const [paletteName, setPaletteName] = useState<PaletteName>(PaletteName.RAINBOW);
  const [seed, setSeed] = useState<number>(() => Date.now());

  const svgRef = useRef<SVGSVGElement>(null);

  const cells = useMosaicGenerator({ width, height, patternType, paletteName, seed });

  const handleRegenerate = useCallback(() => {
    setSeed(Date.now());
  }, []);

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
    <div className="min-h-screen font-sans text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
      <main className="flex flex-col md:flex-row h-screen">
        <Controls
          width={width}
          setWidth={setWidth}
          height={height}
          setHeight={setHeight}
          patternType={patternType}
          setPatternType={setPatternType}
          paletteName={paletteName}
          setPaletteName={setPaletteName}
          onRegenerate={handleRegenerate}
          onExportSVG={handleExportSVG}
          onExportPNG={handleExportPNG}
        />
        <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-gray-200 dark:bg-gray-900">
          <Canvas ref={svgRef} cells={cells} width={width} height={height} />
        </div>
      </main>
    </div>
  );
};

export default App;