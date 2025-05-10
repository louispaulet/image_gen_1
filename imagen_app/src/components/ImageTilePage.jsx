import React from 'react';
import ImageTile from './ImageTile';

export default function ImageTilePage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Image Tiling Tool</h1>
      <p className="mb-6 text-lg">
        This tool allows you to upload an image and create a tiled version of it in an n x n matrix.
        You can preview the tiled image and download it as a single image file.
      </p>
      <ImageTile />
    </div>
  );
}
