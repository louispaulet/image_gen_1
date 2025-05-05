import React, { useRef, useState } from "react";

function App() {
  const [token, setToken] = useState("");
  const [files, setFiles] = useState([]);
  const [systemPrompt, setSystemPrompt] = useState(
    "Generate a portrait orientation image. Use the reference image as a packshot reference, and update it with the user request below.  "
  );
  const [userPrompt, setUserPrompt] = useState("");
  const [resultImg, setResultImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  // Handle file selection and drag-drop
  const handleFiles = (selected) => {
    const arr = Array.from(selected).filter((file) =>
      file.type.startsWith("image/")
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

  // OpenAI image edit call
  const handleGenerate = async () => {
    setResultImg(null);
    if (!token.trim()) {
      alert("Please enter your API token");
      return;
    }
    if (files.length === 0) {
      alert("Please add reference images");
      return;
    }
    setLoading(true);
    try {
      // Dynamically import OpenAI from esm.sh
      const { default: OpenAI, toFile } = await import(
        "https://esm.sh/openai?bundle"
      );
      const openai = new OpenAI({ apiKey: token.trim(), dangerouslyAllowBrowser: true });
      const fileRefs = await Promise.all(
        files.map((file) => toFile(file, null, { type: file.type }))
      );
      const prompt =
        systemPrompt + (userPrompt ? " " + userPrompt : "");
      const rsp = await openai.images.edit({
        model: "gpt-image-1",
        image: fileRefs,
        prompt,
      });
      const b64 = rsp.data[0].b64_json;
      setResultImg("data:image/png;base64," + b64);
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Image Editor Prototype</h1>
      <div className="mb-4">
        <label className="block font-medium mb-1">
          OpenAI API Token:
          <input
            type="password"
            className="border rounded px-2 py-1 w-full mt-1"
            placeholder="sk-..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
            style={{ width: 400, maxWidth: "100%" }}
          />
        </label>
      </div>
      <div
        className="border-2 border-dashed rounded p-4 text-center cursor-pointer transition-colors duration-150 hover:bg-gray-100"
        onClick={() => fileInputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        Drop reference images here or click to select.
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = null;
          }}
        />
      </div>
      {files.length > 0 && (
        <div className="flex gap-4 mt-4 flex-wrap" id="thumbnails">
          {files.map((file, idx) => (
            <div key={idx} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`thumb-${idx}`}
                className="w-24 h-24 object-cover rounded"
              />
              <button
                type="button"
                className="absolute top-0 right-0 bg-white bg-opacity-70 border-none rounded-full px-2 py-0.5 text-lg font-bold cursor-pointer"
                onClick={() => handleRemove(idx)}
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4">
        <label className="block font-medium mb-1">
          System Prompt:
          <textarea
            className="border rounded px-2 py-1 w-full mt-1"
            rows={2}
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
          />
        </label>
      </div>
      <div className="mt-4">
        <label className="block font-medium mb-1">
          User Prompt:
          <input
            type="text"
            className="border rounded px-2 py-1 w-full mt-1"
            placeholder="Describe your image request..."
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
          />
        </label>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded font-semibold disabled:opacity-50"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate"}
      </button>
      <div className="mt-8" id="result">
        {resultImg && (
          <img src={resultImg} alt="Generated result" className="max-w-full mt-4 rounded shadow" />
        )}
      </div>
      <div className="mt-8 text-sm text-gray-500">
        <p>
          <b>Security note:</b> Your API key is only used in your browser and never sent to any server except OpenAI.
        </p>
      </div>
    </div>
  );
}

export default App;
