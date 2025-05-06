import React, { useRef } from 'react';

function FileUploadArea({ files, setFiles, removeFileAtIndex }) {
  const fileInputRef = useRef(null);

  const handleFiles = (selectedFiles) => {
    const imageFiles = Array.from(selectedFiles).filter((file) =>
      file.type.startsWith('image/')
    );
    setFiles((prevFiles) => [...prevFiles, ...imageFiles]);
  };

  const onDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div
        id="drop-zone"
        onDrop={onDrop}
        onDragOver={onDragOver}
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
        className="border-2 border-dashed border-gray-400 rounded p-6 text-center cursor-pointer hover:bg-gray-100 transition"
      >
        Drop reference images here or click to select.
      </div>
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = null;
        }}
      />
      {files.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-4">
          {files.map((file, index) => (
            <div key={index} className="relative w-24 h-24 border rounded overflow-hidden">
              <img
                src={URL.createObjectURL(file)}
                alt={`upload-${index}`}
                className="object-cover w-full h-full"
              />
              <button
                onClick={() => removeFileAtIndex(index)}
                className="absolute top-0 right-0 bg-white bg-opacity-75 rounded-bl px-1 text-lg font-bold text-red-600 hover:text-red-800"
                aria-label="Remove image"
                type="button"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default FileUploadArea;
