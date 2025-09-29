import React, { forwardRef } from 'react';
import { Cell } from '../types';

interface CanvasProps {
  cells: Cell[];
  width: number;
  height: number;
}

const Canvas = forwardRef<SVGSVGElement, CanvasProps>(({ cells, width, height }, ref) => {
  return (
    <div className="w-full h-full max-w-[85vh] max-h-[85vh] aspect-square flex items-center justify-center">
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`-0.5 -0.5 ${width} ${height}`}
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
                strokeWidth="0.025"
                />
            ))}
            </g>
        </svg>
    </div>
  );
});

Canvas.displayName = 'Canvas';

export default Canvas;