
const triggerDownload = (href: string, filename: string) => {
  const link = document.createElement('a');
  link.href = href;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportSVG = (svgElement: SVGSVGElement, filename: string) => {
  const svgData = new XMLSerializer().serializeToString(svgElement);
  const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  triggerDownload(url, filename);
  URL.revokeObjectURL(url);
};

export const exportPNG = (
  svgElement: SVGSVGElement,
  width: number,
  height: number,
  filename: string
) => {
  const svgData = new XMLSerializer().serializeToString(svgElement);
  const svgDataBase64 = btoa(svgData);
  const svgDataUrl = `data:image/svg+xml;base64,${svgDataBase64}`;

  const img = new Image();

  img.onload = () => {
    const canvas = document.createElement('canvas');
    const EXPORT_SIZE = 2000;
    const scale = EXPORT_SIZE / Math.max(width, height);
    
    canvas.width = width * scale;
    canvas.height = height * scale;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.imageSmoothingEnabled = false; // Preserve sharp pixel edges
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        triggerDownload(url, filename);
        URL.revokeObjectURL(url);
      }
    }, 'image/png');
  };

  img.src = svgDataUrl;
};
