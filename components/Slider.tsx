
import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const Slider: React.FC<SliderProps> = ({ label, value, onChange, min = 1, max = 100, step = 1 }) => {
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      // Clamp value between min and max
      const clampedValue = Math.max(min, Math.min(max, newValue));
      onChange(clampedValue);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div className="flex items-center gap-2 sm:gap-3">
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={handleNumberChange}
          className="w-16 sm:w-20 px-2 sm:px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base flex-shrink-0"
        />
        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
          cells
        </span>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          tabIndex={-1}
          className="flex-1 min-w-0 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 touch-manipulation"
        />
      </div>
    </div>
  );
};

export default Slider;
