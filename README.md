# Pixel Mosaic Generator

A web-based application for creating colorful, geometric patterns in pixel-art style. Generate beautiful mosaics with mathematical algorithms, customizable color palettes, and export them as high-quality images.

## Features

- **9 Pattern Algorithms**: Concentric diamonds, concentric squares, corner diamonds, diamond parquet, diagonal stripes, symmetric cross, spiral, heart, and random patterns
- **5 Color Palettes**: Rainbow, Rainbow Extended, Grayscale, Sunset, and Forest
- **Customizable Grid**: Adjust width and height (10-100 cells) with real-time preview
- **Color Rotation**: Cycle through different color starting points
- **Export Options**: Save as high-resolution PNG (2000px) or scalable SVG
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark Mode Support**: Automatic theme adaptation

## Tech Stack

- React 19 with TypeScript
- Vite for fast development
- SVG rendering for pixel-perfect graphics
- Tailwind CSS (via CDN)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cgrothaus/pixel-mosaic-generator.git
   cd pixel-mosaic-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add your Gemini API key: `GEMINI_API_KEY=your_api_key_here`

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm run preview
```

## Usage

1. **Adjust Grid Size**: Use the width and height sliders to set your canvas dimensions
2. **Choose a Pattern**: Select from 9 different mathematical pattern algorithms
3. **Pick a Palette**: Choose from 5 predefined color palettes
4. **Rotate Colors**: Click "Change start color" to cycle through variations
5. **Export**: Save your creation as PNG or SVG

## Documentation

For detailed information about features, algorithms, and future roadmap, see [PRD v1.0 EN.md](PRD%20v1.0%20EN.md).

For technical architecture and development guidelines, see [AGENTS.md](AGENTS.md).

## License

MIT
