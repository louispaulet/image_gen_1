import React from 'react';
import ImageTile from './ImageTile';

export default function ImageTilePage() {
  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Image Tiling Tool</h1>
      <p className="mb-8 text-lg text-gray-700">
        This tool allows you to upload an image and create a tiled version of it in an n x n matrix.
        You can preview the tiled image and download it as a single image file.
      </p>
      <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
        <ImageTile />
      </div>
    </div>
  );
}
