# Product Requirements Document (PRD): Pixel Mosaic Generator

Version: 1.0

Date: October 19, 2025

Author: AI Assistant & User


## 1. Introduction & Vision


### 1.1. Product Idea

The "Pixel Mosaic Generator" is a simple, web-based application that allows users to effortlessly create colorful, geometric patterns in pixel-art style. Inspired by hand-drawn marker patterns, the app offers a digital canvas for creativity and relaxation.


### 1.2. Target Audience

* **Creatives & Designers:** Looking for unique, procedurally generated backgrounds and patterns for their projects.
* **Hobby Artists:** Enjoy experimenting with colors and shapes without having to draw themselves.
* **Developers & Tech Enthusiasts:** Fascinated by generative art and algorithms.
* **Anyone seeking a relaxing, creative distraction.**


### 1.3. Goals & Success Metrics

* **Goal:** Create an intuitive tool that enables the creation of complex patterns with simple parameters.
* **Success Metrics:**
    * Number of patterns generated and exported.
    * Average time spent in the app.
    * Positive user feedback on ease of use.


## 2. Features & Functionality (Version 1.0 - Implemented)


### 2.1. Core Component: The Canvas

* The app displays a central, rectangular canvas divided into a grid of square cells (pixels).
* Each cell is rendered as an SVG rectangle with a defined color and fine border.
* The canvas is displayed in real-time and responsively adapts to different screen sizes.
* The canvas uses `shapeRendering="crispEdges"` for pixel-perfect display without anti-aliasing.


### 2.2. Adjustable Parameters (User Control)


#### 2.2.1. Grid Settings

* **Width:** The user can define the number of cells in width via a slider (10-100 cells).
* **Height:** The user can define the number of cells in height via a slider (10-100 cells).
* **Default:** The app starts with a 29x29 grid.


#### 2.2.2. Pattern Type (Algorithm)

The user can select from a dropdown menu various algorithms for pattern generation. The following **nine patterns** are implemented:

1. **Concentric Diamonds:** The pattern emerges from the center in the form of diamonds. Color is determined by Manhattan distance from the center point.

2. **Concentric Squares:** The pattern consists of concentric squares around the center point. Color is determined by Chebyshev distance.

3. **Corner Diamonds:** A symmetric pattern where each quadrant corner serves as the origin for diamond patterns.

4. **Diamond Parquet:** A tiled pattern with diamonds that creates a parquet effect.

5. **Diagonal Stripes:** The pattern consists of diagonal color bands. Color is determined by position on the diagonal.

6. **Symmetric Cross (Kaleidoscope):** The pattern emerges through symmetric calculation based on the minimum horizontal or vertical distance from the center point.

7. **Spiral:** A spiral-shaped pattern that combines angle and distance from the center to create a spiral effect.

8. **Heart:** A decorative pattern based on the mathematical heart equation, with concentric hearts growing outward.

9. **Random:** Each cell receives a pseudo-random color from the active palette (deterministic via seed).


#### 2.2.3. Color Palette

* **Palette Selection:** The user can choose from five predefined color palettes:
    * **Rainbow:** 8 colors - Red → Orange → Yellow → Green → Light Blue → Dark Blue → Purple → Pink.
    * **Rainbow Extended:** 15 colors - an extended version with more color gradations.
    * **Grayscale:** 6 grayscale values from dark to light.
    * **Sunset:** 6 warm colors - Orange, Gold, Red, Dark Red, Brown, Purple.
    * **Forest:** 6 shades of green from dark to light.

* **Change Start Color:** A "Change start color" button allows rotating the color palette to test different color starting points without changing the palette. The current start color is displayed as a small color box next to the button.


### 2.3. Interaction

* **Real-time Update:** Every change to a parameter (grid size, pattern type, palette, start color) leads to immediate regeneration and display of the pattern on the canvas.
* **Optimized Performance:** Pattern generation utilizes memoization techniques for efficient calculations and avoids unnecessary recomputations.
* **Seed-based Generation:** All patterns use a time-based seed for deterministic, reproducible results.


### 2.4. Export Function

Users can save their created works in two formats:

* **"Save as PNG":** Exports the current pattern as a high-resolution PNG image file (2000px maximum dimension). Pixels remain sharp through disabled image smoothing.

* **"Save as SVG":** Exports the pattern as a scalable vector graphic (SVG). This is ideal for designers as the image remains scalable without quality loss.

* **Smart Filenames:** Exported files receive automatic, descriptive names in the format: `mosaic-{pattern}-{width}x{height}.{ext}`.


### 2.5. Design & User Interface

* **Responsive Layout:**
    * Desktop: Sidebar with controls on the left, canvas on the right.
    * Mobile/Tablet: Full-width controls on top, canvas below.

* **Dark Mode Support:** Full support for light and dark themes with automatic adjustment of colors and borders.

* **Minimalist & Clean:** Clear structure with sections for Grid Settings, Pattern, and Export actions.

* **Intuitive Controls:**
    * Sliders for numeric values (width/height)
    * Dropdown menus for selection (pattern/palette)
    * Clearly labeled buttons for actions

* **Visual Feedback:** The current start color is displayed next to the "Change start color" button.


### 2.6. Technical Architecture

* **Architecture:** Component-based web application with declarative UI
* **Rendering:** SVG-based display for pixel-perfect, scalable output
* **State Management:** Centralized state management with reactive UI updates
* **Performance:** Memoization and efficient rendering strategies to avoid unnecessary computations
* **Modularity:** Reusable UI components (Button, Select, Slider) for consistent user interface
* **Browser-based:** Pure client-side processing without server dependencies


## 3. User Flow & UI/UX (Version 1.0)


### 3.1. Typical User Flow

1. User opens the website.
2. A default pattern (29x29, Concentric Diamonds, Rainbow palette) is immediately displayed.
3. User sees the canvas centrally and the controls in a sidebar (desktop) or on top (mobile).
4. User adjusts parameters:
    * Changes grid size via sliders
    * Selects a different pattern type from dropdown
    * Switches color palette
    * Rotates start color for variations
5. The canvas updates immediately with each change.
6. User is satisfied with the result and clicks "Save as PNG" or "Save as SVG".
7. Download starts automatically.


### 3.2. Design Principles (Implemented)

* **Minimalist:** The UI doesn't distract from the generated artwork.
* **Intuitive:** All controls are clearly labeled and self-explanatory.
* **Responsive:** Works on desktop, tablet, and (limited) mobile.
* **Performant:** Real-time updates even with large grids (up to 100x100).


## 4. Features for Version 2.0 (Planned)


### 4.1. Create Custom Color Palette

* **Custom Palette Editor:** An interface where users can define their own color palette:
    * Add/remove colors
    * Change color order (drag & drop)
    * Color picker for each color
    * Save and name palette
    * Manage saved palettes (load/delete)


### 4.2. Advanced Pattern Algorithms

* **Fractals:** Implementation of fractal patterns (e.g., Mandelbrot, Julia Sets)
* **Perlin Noise:** Organic, natural-looking patterns
* **Cellular Automata:** Game of Life-like patterns
* **Voronoi Diagrams:** Cellular structures


### 4.3. Animation

* **Parameter Animation:**
    * Animated transitions between different parameter values
    * Flowing pattern transitions (e.g., color palette rotation)
    * Export as animated GIF or video
* **Speed Control:** Slider for animation speed
* **Pause/Play Control:** Control over animation


### 4.4. Interactive Editing

* **Edit Individual Cells:**
    * Click on a cell opens a color picker
    * Manual color adjustment of individual pixels
    * Brush tool for drawing on the pattern
* **Eraser Tool:** Reset cells to background color
* **Undo/Redo Function:** History of manual changes


### 4.5. Save & Share

* **Preset System:**
    * Save favorite settings as named presets
    * Quick loading of saved configurations
    * Import/export presets as JSON

* **URL Sharing:**
    * Generation of a unique URL with all parameters encoded
    * Share a link that exactly reproduces a specific pattern
    * QR code generation for easy sharing

* **Social Media Integration:**
    * Direct share buttons for Twitter, Instagram, Pinterest
    * Optimized preview images


### 4.6. Extended Export Options

* **Resolution Control:** User-defined export resolution for PNG
* **Additional Formats:**
    * PDF export for print
    * WebP for optimized web use
    * TIFF for professional applications
* **Batch Export:** Export multiple variations simultaneously


### 4.7. Additional Improvements

* **Keyboard Shortcuts:** Quick access to frequent actions
* **Undo Button:** For accidental parameter changes
* **Favorites System:** Mark favorite patterns
* **Gallery View:** Overview of generated patterns in the session
* **Tutorial/Onboarding:** Interactive introduction for new users
* **Performance Optimizations:** Web Workers for large grids (>100x100)


## 5. Success Metrics (Updated)


### Version 1.0 (Achieved)

* ✅ Intuitive operation with minimal learning curve
* ✅ Real-time generation for immediate visual feedback
* ✅ High-quality exports in two formats (PNG/SVG)
* ✅ Responsive design for various devices
* ✅ 9 different pattern algorithms
* ✅ 5 predefined color palettes
* ✅ Dark Mode support


### Version 2.0 (Planned)

* Average time spent >5 minutes
* >50% of users export at least one pattern
* >20% of users create custom color palettes
* >30% of users share patterns via URL
* Positive user feedback (>4.5/5 stars)


## 6. Technical Requirements (Version 2.0)


### 6.1. Browser Compatibility

* Chrome/Edge (last 2 versions)
* Firefox (last 2 versions)
* Safari (last 2 versions)
* Mobile Safari/Chrome


### 6.2. Performance Goals

* Canvas rendering: <100ms for 100x100 grid
* PNG export: <2 seconds for 2000px output
* UI responsiveness: <16ms for parameter updates


### 6.3. Privacy & Storage

* **Local Storage:**
    * Custom palettes in LocalStorage
    * Presets in LocalStorage
    * No server-side storage of user data
* **URL Parameters:** All settings as URL parameters for sharing


## 7. Open Questions & Decisions


### For Version 2.0

1. **Custom Palette Storage:** LocalStorage or Cloud sync (with optional account)?
2. **Animation Format:** GIF, MP4, or WebM for export?
3. **Sharing Platform:** Own gallery page or just URL sharing?
4. **Monetization:** Free or premium features (e.g., high-res exports)?
5. **Performance Limits:** Maximum grid size for browser stability?


## 8. Appendix


### 8.1. Implemented Pattern Algorithms (Details)

This section describes the mathematical foundations and algorithms for each of the nine implemented patterns. All algorithms operate on a discrete grid with coordinates (x, y), where x ∈ [0, width-1] and y ∈ [0, height-1].


#### 8.1.1. Concentric Diamonds

**Concept:** Creates concentric diamond-shaped rings around the center point of the grid, where color is determined by distance from the center.

**Mathematical Foundation:**
- Center: `(centerX, centerY) = ((width-1)/2, (height-1)/2)`
- Manhattan distance (L₁ metric): `d(x,y) = |x - centerX| + |y - centerY|`
- This metric creates diamond-shaped isolines (all points with equal distance form a diamond)

**Color Assignment:**
```
offset = paletteLength - 2  // Offset for visually appealing start
colorIndex = (floor(distance) + offset + startColorOffset) mod paletteLength
```

**Pseudocode:**
```
FUNCTION concentricDiamonds(x, y, width, height, palette, startColorOffset):
    centerX = (width - 1) / 2
    centerY = (height - 1) / 2

    // Calculate Manhattan distance
    distance = abs(x - centerX) + abs(y - centerY)

    // Determine color index with offset
    offset = palette.length - 2
    colorIndex = (floor(distance) + offset + startColorOffset) mod palette.length

    RETURN palette[colorIndex]
```

**Properties:**
- Symmetry: 4-fold rotational symmetry (90°, 180°, 270°)
- Reflection: Symmetric across both diagonals and horizontal/vertical axes
- Distance growth: Linear with Manhattan distance


#### 8.1.2. Concentric Squares

**Concept:** Creates concentric square rings around the center point, similar to Concentric Diamonds but with right-angled corners.

**Mathematical Foundation:**
- Center: `(centerX, centerY) = ((width-1)/2, (height-1)/2)`
- Chebyshev distance (L∞ metric): `d(x,y) = max(|x - centerX|, |y - centerY|)`
- This metric creates square-shaped isolines

**Color Assignment:**
```
offset = paletteLength - 2
colorIndex = (floor(distance) + offset + startColorOffset) mod paletteLength
```

**Pseudocode:**
```
FUNCTION concentricSquares(x, y, width, height, palette, startColorOffset):
    centerX = (width - 1) / 2
    centerY = (height - 1) / 2

    // Calculate Chebyshev distance
    distanceX = abs(x - centerX)
    distanceY = abs(y - centerY)
    distance = max(distanceX, distanceY)

    // Determine color index with offset
    offset = palette.length - 2
    colorIndex = (floor(distance) + offset + startColorOffset) mod palette.length

    RETURN palette[colorIndex]
```

**Properties:**
- Symmetry: 4-fold rotational symmetry (90°, 180°, 270°)
- Right-angled corners in contrast to Concentric Diamonds
- Constant number of pixels per ring at edges


#### 8.1.3. Corner Diamonds

**Concept:** Divides the grid into four quadrants and calculates diamonds emanating from a specific corner for each quadrant, creating a symmetric, kaleidoscopic effect.

**Mathematical Foundation:**
- Quadrant division based on center `(centerX, centerY)`
- Manhattan distance to an assigned corner is calculated for each quadrant:
  - Quadrant I (x < centerX, y < centerY): Distance to upper right corner (width-1, 0)
  - Quadrant II (x ≥ centerX, y < centerY): Distance to upper left corner (0, 0)
  - Quadrant III (x < centerX, y ≥ centerY): Distance to lower right corner (width-1, height-1)
  - Quadrant IV (x ≥ centerX, y ≥ centerY): Distance to lower left corner (0, height-1)

**Pseudocode:**
```
FUNCTION cornerDiamonds(x, y, width, height, palette, startColorOffset):
    centerX = (width - 1) / 2
    centerY = (height - 1) / 2

    // Determine quadrant and calculate corresponding corner distance
    IF x < centerX AND y < centerY THEN
        // Upper left quadrant: Distance to upper right corner
        distance = abs(x - (width - 1)) + abs(y - 0)
    ELSE IF x >= centerX AND y < centerY THEN
        // Upper right quadrant: Distance to upper left corner
        distance = abs(x - 0) + abs(y - 0)
    ELSE IF x < centerX AND y >= centerY THEN
        // Lower left quadrant: Distance to lower right corner
        distance = abs(x - (width - 1)) + abs(y - (height - 1))
    ELSE
        // Lower right quadrant: Distance to lower left corner
        distance = abs(x - 0) + abs(y - (height - 1))

    offset = palette.length - 2
    colorIndex = (floor(distance) + offset + startColorOffset) mod palette.length

    RETURN palette[colorIndex]
```

**Properties:**
- Symmetry: 2-fold rotational symmetry (180°)
- Mirror symmetry across both diagonals
- Creates visually interesting intersection points along quadrant boundaries


#### 8.1.4. Diamond Parquet

**Concept:** Creates a tiled pattern with repeating diamond motifs, similar to parquet flooring. The pattern repeats periodically.

**Mathematical Foundation:**
- Tile size: `tileSize = paletteLength × 2` (one complete color cycle period)
- Shift by half tile size for parquet effect
- Modular arithmetic for periodicity
- Manhattan distance within each tile to tile center

**Pseudocode:**
```
FUNCTION diamondParquet(x, y, width, height, palette, startColorOffset):
    tileSize = palette.length * 2

    // Shift coordinates into tiled system
    shiftedX = (x + floor(tileSize / 2)) mod tileSize
    shiftedY = (y + floor(tileSize / 2)) mod tileSize

    // Center of tile
    tileCenterX = floor(tileSize / 2)
    tileCenterY = floor(tileSize / 2)

    // Manhattan distance within tile
    distance = abs(shiftedX - tileCenterX) + abs(shiftedY - tileCenterY)

    offset = palette.length - 2
    colorIndex = (floor(distance) + offset + startColorOffset) mod palette.length

    RETURN palette[colorIndex]
```

**Properties:**
- Periodicity: Pattern repeats every `tileSize` pixels in both directions
- Seamless tiling: Can be used as seamless texture
- Combines local symmetry (within a tile) with global repetition


#### 8.1.5. Diagonal Stripes

**Concept:** Creates parallel diagonal stripes running from top-left to bottom-right. All points on a diagonal have the same color.

**Mathematical Foundation:**
- Diagonal lines of constant sum: `x + y = constant`
- Points with the same `x + y` value lie on the same diagonal
- Simplest algorithm, purely additive

**Color Assignment:**
```
value = x + y
colorIndex = (value + startColorOffset) mod paletteLength
```

**Pseudocode:**
```
FUNCTION diagonalStripes(x, y, width, height, palette, startColorOffset):
    // Sum of coordinates determines diagonal
    value = x + y

    // Direct color assignment based on diagonal
    colorIndex = (value + startColorOffset) mod palette.length

    RETURN palette[colorIndex]
```

**Properties:**
- Linear progression: Color changes linearly along diagonal
- Direction: 45° angle (northeast to southwest)
- No symmetry, but clear directionality
- Very performant (only one addition)


#### 8.1.6. Symmetric Cross (Kaleidoscope)

**Concept:** Creates a cross-shaped pattern with high symmetry. Color is determined by the smaller of the two distances from center (horizontal or vertical).

**Mathematical Foundation:**
- Center: `(centerX, centerY) = ((width-1)/2, (height-1)/2)`
- Separate calculation of horizontal and vertical distances
- Minimum function: `d(x,y) = min(|x - centerX|, |y - centerY|)`
- Creates cross-shaped isolines

**Pseudocode:**
```
FUNCTION symmetricCross(x, y, width, height, palette, startColorOffset):
    centerX = (width - 1) / 2
    centerY = (height - 1) / 2

    // Calculate separate distances
    distanceX = abs(x - centerX)
    distanceY = abs(y - centerY)

    // Minimum of both distances
    value = min(distanceX, distanceY)

    colorIndex = (floor(value) + startColorOffset) mod palette.length

    RETURN palette[colorIndex]
```

**Properties:**
- Symmetry: 4-fold rotational symmetry (90°, 180°, 270°)
- Cross shape: Horizontal and vertical "arms" with same colors
- Mirror symmetry across both axes and diagonals
- Creates a plus-sign or cross pattern


#### 8.1.7. Spiral

**Concept:** Creates a spiral pattern by combining polar angle and radial distance from center.

**Mathematical Foundation:**
- Conversion from Cartesian to polar coordinates
- Center: `(centerX, centerY) = ((width-1)/2, (height-1)/2)`
- Polar coordinates:
  - `Δx = x - centerX`
  - `Δy = y - centerY`
  - `r = √(Δx² + Δy²)` (Euclidean distance)
  - `θ = atan2(Δy, Δx)` (angle, range: [-π, π])
- Spiral value: Combination of normalized angle and distance

**Color Assignment:**
```
normalizedAngle = (θ + π) / (2π)  // Normalized to [0, 1]
spiralValue = normalizedAngle × paletteLength + r × tightness
colorIndex = (floor(spiralValue) + startColorOffset) mod paletteLength
```

**Pseudocode:**
```
FUNCTION spiral(x, y, width, height, palette, startColorOffset):
    centerX = (width - 1) / 2
    centerY = (height - 1) / 2

    // Cartesian coordinates relative to center
    deltaX = x - centerX
    deltaY = y - centerY

    // Calculate polar coordinates
    angle = atan2(deltaY, deltaX)  // Range: [-π, π]
    distance = sqrt(deltaX * deltaX + deltaY * deltaY)

    // Normalize angle to [0, 1]
    normalizedAngle = (angle + π) / (2 * π)

    // Spiral value: angle determines base, distance adds "turns"
    tightness = 0.5  // Controls how tightly the spiral is wound
    spiralValue = normalizedAngle * palette.length + distance * tightness

    colorIndex = (floor(spiralValue) + startColorOffset) mod palette.length

    RETURN palette[colorIndex]
```

**Properties:**
- Rotation: Colors rotate around center
- Tightness parameter: Determines how quickly spiral grows outward
- Continuous transitions from center outward
- Radial symmetry in rotating sense
- Visually dynamic and flowing


#### 8.1.8. Heart

**Concept:** Creates a heart-shaped pattern based on the mathematical heart equation. The pattern consists of concentric hearts growing outward from the center.

**Mathematical Foundation:**
- Heart equation (implicit form): `(x² + y² - 1)³ - x² × y³ ≤ 0`
- Points inside this curve form a heart
- Normalization to grid coordinates through scaling
- Multiple scaling factors for concentric hearts

**Algorithm:**
1. Calculate coordinates relative to center
2. Invert Y-coordinate (mathematical convention: Y upward)
3. Test for different scaling levels which heart contains the point
4. Smallest containing heart scale determines color

**Pseudocode:**
```
FUNCTION heart(x, y, width, height, palette, startColorOffset):
    baseScale = min(width, height) / 12  // Base size of hearts
    centerX = (width - 1) / 2
    centerY = (height - 1) / 2

    // Coordinates relative to center (Y inverted)
    deltaXBase = x - centerX
    deltaYBase = -(y - centerY - 1) + baseScale * 0.3  // Slight vertical shift

    distance = palette.length  // Default: outside all hearts

    // Test different heart sizes (from small to large)
    FOR scaleStep = 0 TO palette.length * 2 - 1 DO
        currentScale = baseScale * (0.5 + scaleStep * 0.3)

        // Normalized coordinates for this heart size
        normX = deltaXBase / currentScale
        normY = deltaYBase / currentScale

        // Evaluate heart equation: (x² + y² - 1)³ - x² × y³
        sumSquares = normX * normX + normY * normY
        heartValue = pow(sumSquares - 1, 3) - normX * normX * pow(normY, 3)

        // If point lies inside this heart
        IF heartValue <= 0 THEN
            distance = scaleStep
            BREAK  // Smallest containing heart found

    colorIndex = (distance + startColorOffset) mod palette.length

    RETURN palette[colorIndex]
```

**Properties:**
- Symmetry: Mirror symmetry along vertical axis
- Concentric structure: Multiple heart shells from center outward
- Mathematically exact: Based on classic heart equation
- Visually appealing and recognizable as heart shape
- Complexity: Requires exponentiation and iterative testing


#### 8.1.9. Random (Pseudo-Random)

**Concept:** Creates an apparently random pattern where each cell receives a "random" color. Despite random appearance, the pattern is deterministic and reproducible through the seed.

**Mathematical Foundation:**
- Deterministic pseudo-random procedure
- Hash function based on coordinates and seed
- Uses sine function for uniform distribution
- Large prime numbers to avoid patterns

**Hash Function:**
```
hash(x, y, seed) = sin(x × 12.9898 + y × 78.233 + seed) × 43758.5453
```

The decimal places of this calculation appear random but are deterministic for given inputs.

**Pseudocode:**
```
FUNCTION random(x, y, width, height, palette, startColorOffset, seed):
    // Deterministic "random" calculation
    // Uses hash function with large prime numbers
    hashValue = sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453

    // Absolute value to avoid negative values
    positiveValue = abs(hashValue)

    // Extract decimal part (by floor of integer part)
    fractionalPart = positiveValue - floor(positiveValue)

    // Map to palette range
    paletteIndex = floor(fractionalPart * palette.length)

    // Combine with start color offset
    colorIndex = (paletteIndex + startColorOffset) mod palette.length

    RETURN palette[colorIndex]
```

**Properties:**
- Deterministic: Same inputs (x, y, seed) always produce same color
- Reproducible: By storing seed, pattern can be exactly recreated
- Uniform distribution: All colors appear approximately equally often
- No recognizable patterns: Visually appears as true randomness
- Seed dependency: Different seeds produce completely different patterns


### 8.1.10. Common Properties and Parameters

**All algorithms share the following parameters:**
- `width, height`: Grid dimensions
- `palette`: Array of colors (as hex strings or RGB values)
- `startColorOffset`: Rotation offset for color palette (0 to paletteLength-1)

**Color Palette Modulo:**
All algorithms use modular arithmetic (`mod paletteLength`) to ensure calculated color indices always remain in the valid range [0, paletteLength-1]. This enables:
- Seamless repetition for patterns extending beyond palette
- Functionality with palettes of any size
- Consistent behavior when changing palette

**Performance Considerations:**
- **Simplest algorithms** (descending): Diagonal Stripes > Concentric Diamonds/Squares > Symmetric Cross
- **Most complex algorithms**: Heart (iterative calculation), Spiral (trigonometry)
- **Optimization possibilities**: Pre-calculation of distances, lookup tables for trigonometric functions


### 8.2. Color Palettes (Hex Codes)

**Rainbow:** `#ef4444, #f97316, #eab308, #22c55e, #38bdf8, #3b82f6, #8b5cf6, #ec4899`

**Rainbow Extended:** `#ef4444, #f87171, #fb923c, #fbbf24, #fde047, #84cc16, #4ade80, #34d399, #22d3ee, #60a5fa, #818cf8, #a78bfa, #c084fc, #e879f9, #f472b6`

**Grayscale:** `#111827, #374151, #6b7280, #9ca3af, #d1d5db, #f3f4f6`

**Sunset:** `#f97316, #f59e0b, #ef4444, #dc2626, #991b1b, #4a044e`

**Forest:** `#166534, #15803d, #16a34a, #a3e635, #4d7c0f, #3f6212`
