import React, { useState, useRef, useEffect } from 'react';

export default function ImageTile() {
  const [imageSrc, setImageSrc] = useState(null);
  const [tileCount, setTileCount] = useState(3);
  const [error, setError] = useState('');
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  // Handle image upload
  function handleImageUpload(event) {
    setError('');
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  // Draw tiled image on canvas
  useEffect(() => {
    if (!imageSrc) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;

    function drawTiles() {
      const tileN = Math.max(1, Math.min(20, parseInt(tileCount) || 3)); // limit tile count between 1 and 20
      const tileWidth = img.width;
      const tileHeight = img.height;
      canvas.width = tileWidth * tileN;
      canvas.height = tileHeight * tileN;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < tileN; y++) {
        for (let x = 0; x < tileN; x++) {
          ctx.drawImage(img, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
        }
      }
    }

    if (img.complete) {
      drawTiles();
    } else {
      img.onload = drawTiles;
    }
  }, [imageSrc, tileCount]);

  // Download the canvas image
  function handleDownload() {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'tiled-image.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">Image Tiler</h2>
      <p className="mb-6 text-gray-700">
        Upload an image, choose the number of tiles (n), and see the image repeated in an n x n grid.
        You can download the resulting tiled image.
      </p>
      <div className="mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
          "
        />
      </div>
      <div className="mb-6 flex items-center">
        <label htmlFor="tileCount" className="mr-4 text-gray-700 font-medium">Number of tiles (n):</label>
        <input
          id="tileCount"
          type="number"
          min="1"
          max="20"
          value={tileCount}
          onChange={(e) => setTileCount(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {error && <p className="text-red-600 mb-6">{error}</p>}
      {imageSrc && (
        <div className="mb-6 overflow-auto border border-gray-300 rounded-md p-3 shadow-inner">
          <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto' }} />
          <img ref={imageRef} src={imageSrc} alt="source" style={{ display: 'none' }} />
        </div>
      )}
      {imageSrc && (
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Download Tiled Image
        </button>
      )}
    </div>
  );
}
