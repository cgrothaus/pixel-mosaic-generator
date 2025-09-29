import React, { forwardRef } from 'react';
import { Cell } from '../types';

interface CanvasProps {
  cells: Cell[];
  width: number;
  height: number;
}

const Canvas = forwardRef<SVGSVGElement, CanvasProps>(({ cells, width, height }, ref) => {
  const strokeWidth = 0.025;
  // Add a small padding to the viewBox to ensure strokes at the edges are not cut off
  const padding = strokeWidth / 2 + 0.01; 

  return (
    <div className="w-full h-full max-w-[85vh] max-h-[85vh] aspect-square flex items-center justify-center">
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`${-padding} ${-padding} ${width + padding * 2} ${height + padding * 2}`}
            className="w-full h-full shadow-lg rounded-lg bg-white dark:bg-gray-800"
            shapeRendering="crispEdges"
        >
            <g>
            {cells.map((cell, index) => (
                <rect
                key={index}
                x={cell.x}
                y={cell.y}
                width="1"
                height="1"
                fill={cell.color}
                stroke="var(--pixel-border-color)"
                strokeWidth={strokeWidth}
                />
            ))}
            </g>
        </svg>
    </div>
  );
});

Canvas.displayName = 'Canvas';

export default Canvas;