import React, { useState, useRef } from 'react';
import OpenAI, { toFile } from 'openai';

function HomePage() {
  const [apiKey, setApiKey] = useState('');
  const [apiKeySource, setApiKeySource] = useState('file'); // 'file' or 'manual'
  const [files, setFiles] = useState([]);
  const [systemPrompt, setSystemPrompt] = useState(
    'Generate a portrait orientation image. Use the reference image as a packshot reference, and update it with the user request below.'
  );
  const [userPrompt, setUserPrompt] = useState('');
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  React.useEffect(() => {
    if (apiKeySource === 'file') {
      fetch('/key.txt')
        .then((res) => {
          if (!res.ok) throw new Error('Failed to load key.txt');
          return res.text();
        })
        .then((text) => setApiKey(text.trim()))
        .catch((err) => {
          console.error(err);
          setApiKey('');
        });
    } else {
      setApiKey('');
    }
  }, [apiKeySource]);

  const handleFiles = (selectedFiles) => {
    const imageFiles = Array.from(selectedFiles).filter((file) =>
      file.type.startsWith('image/')
    );
    setFiles((prevFiles) => [...prevFiles, ...imageFiles]);
  };

  const removeFileAtIndex = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const onDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const generateImage = async () => {
    if (!apiKey.trim()) {
      alert('Please enter your OpenAI API key');
      return;
    }
    if (files.length === 0) {
      alert('Please upload at least one reference image');
      return;
    }
    setLoading(true);
    setResultImage(null);
    try {
      const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
      const fileRefs = await Promise.all(
        files.map((file) => toFile(file, null, { type: file.type }))
      );
      const prompt = systemPrompt + (userPrompt ? ' ' + userPrompt : '');
      const response = await openai.images.edit({
        model: 'gpt-image-1',
        image: fileRefs,
        prompt,
      });
      const b64 = response.data[0].b64_json;
      setResultImage('data:image/png;base64,' + b64);
    } catch (error) {
      console.error(error);
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!resultImage) return;
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = 'generated_image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Image Generation Homepage</h1>

      <div className="mb-4">
        <label className="block font-semibold mb-1">OpenAI API Key Source</label>
        <div className="flex items-center space-x-4 mb-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="apiKeySource"
              value="file"
              checked={apiKeySource === 'file'}
              onChange={() => setApiKeySource('file')}
              className="form-radio"
            />
            <span className="ml-2">Load from text file</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="apiKeySource"
              value="manual"
              checked={apiKeySource === 'manual'}
              onChange={() => setApiKeySource('manual')}
              className="form-radio"
            />
            <span className="ml-2">Enter manually</span>
          </label>
        </div>
        {apiKeySource === 'manual' && (
          <input
            id="api-key"
            type="password"
            placeholder="sk-..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        )}
        {apiKeySource === 'file' && (
          <input
            id="api-key-file"
            type="text"
            value={apiKey}
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
          />
        )}
      </div>

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

      <div className="mt-6">
        <label className="block font-semibold mb-1" htmlFor="system-prompt">
          System Prompt
        </label>
        <textarea
          id="system-prompt"
          rows={3}
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
        />
      </div>

      <div className="mt-4">
        <label className="block font-semibold mb-1" htmlFor="user-prompt">
          User Prompt
        </label>
        <input
          id="user-prompt"
          type="text"
          placeholder="Describe your image request here..."
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={generateImage}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Image'}
        </button>
      </div>

      {resultImage && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Generated Image</h2>
          <img src={resultImage} alt="Generated" className="mx-auto max-w-full rounded shadow" />
          <div className="mt-4">
            <button
              onClick={downloadImage}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Download Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
