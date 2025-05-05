import React from 'react';

export default function ImageThumbnail({ file, onRemove }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block', margin: '0.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}>
      <img
        src={URL.createObjectURL(file)}
        alt={file.name}
        style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '0.5rem' }}
      />
      <button
        onClick={onRemove}
        aria-label="Remove image"
        style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
          backgroundColor: 'rgba(255, 0, 0, 0.8)',
          border: 'none',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          color: 'white',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        ×
      </button>
    </div>
  );
}
