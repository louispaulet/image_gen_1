import React, { useRef, useState } from 'react';

export default function Home() {
  const [token, setToken] = useState('');
  const [files, setFiles] = useState([]);
  const [systemPrompt, setSystemPrompt] = useState(
    'Generate a portrait orientation image. Use the reference image as a packshot reference, and update it with the user request below.  '
  );
  const [userPrompt, setUserPrompt] = useState('');
  const [resultImg, setResultImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const handleFiles = (selected) => {
    const arr = Array.from(selected).filter((file) =>
      file.type.startsWith('image/')
    );
    setFiles((prev) => [...prev, ...arr]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFiles(e.dataTransfer.files);
  };

  const handleRemove = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleGenerate = async () => {
    setResultImg(null);
    if (!token.trim()) {
      alert('Please enter your API token');
      return;
    }
    if (files.length === 0) {
      alert('Please add reference images');
      return;
    }
    setLoading(true);
    try {
      const { default: OpenAI, toFile } = await import('https://esm.sh/openai');
      const openai = new OpenAI({ apiKey: token.trim(), dangerouslyAllowBrowser: true });
      const fileRefs = await Promise.all(
        files.map((file) => toFile(file, null, { type: file.type }))
      );
      const prompt = systemPrompt + (userPrompt ? ' ' + userPrompt : '');
      const rsp = await openai.images.edit({
        model: 'gpt-image-1',
        image: fileRefs,
        prompt,
      });
      const b64 = rsp.data[0].b64_json;
      setResultImg('data:image/png;base64,' + b64);
    } catch (err) {
      console.error(err);
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Image Editor Prototype
      </h1>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          OpenAI API Token:
          <input
            type="password"
            placeholder="sk-..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </label>
      </div>
      <div
        onClick={() => fileInputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        style={{
          border: '2px dashed #ccc',
          padding: '1rem',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: '#fafafa',
        }}
      >
        Drop reference images here or click to select.
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = null;
          }}
        />
      </div>
      <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap' }}>
        {files.map((file, idx) => (
          <div
            key={idx}
            style={{
              position: 'relative',
              display: 'inline-block',
              margin: '0.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            }}
          >
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '0.5rem' }}
            />
            <button
              onClick={() => handleRemove(idx)}
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
        ))}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <label>
          System Prompt:
          <textarea
            rows={2}
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </label>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <label>
          User Prompt:
          <input
            type="text"
            placeholder="Describe your image request..."
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </label>
      </div>
      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>
      <div style={{ marginTop: '2rem' }}>
        {resultImg && <img src={resultImg} alt="Generated result" style={{ maxWidth: '100%' }} />}
      </div>
    </div>
  );
}
