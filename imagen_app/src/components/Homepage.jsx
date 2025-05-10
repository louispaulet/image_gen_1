import React, { useState } from 'react';
import OpenAI, { toFile } from 'openai';
import ApiKeyInput from './ApiKeyInput';
import FileUploadArea from './FileUploadArea';
import PresetControls from './PresetControls';
import CheckApiKeyButton from './CheckApiKeyButton';
import Suggestion from './Suggestion';

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

  // New state for presets
  const [presetName, setPresetName] = useState('');
  const [availablePresets, setAvailablePresets] = useState([]);
  const [loadingPresets, setLoadingPresets] = useState(false);

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

  React.useEffect(() => {
    setLoadingPresets(true);
    fetch('/presets/presets.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load presets list');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setAvailablePresets(data);
        } else {
          setAvailablePresets([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setAvailablePresets([]);
      })
      .finally(() => setLoadingPresets(false));
  }, []);

  const savePreset = () => {
    if (!presetName.trim()) {
      alert('Please enter a preset name');
      return;
    }
    const presetData = {
      systemPrompt,
      userPrompt,
    };
    const jsonStr = JSON.stringify(presetData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = presetName.trim() + '.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const loadPresetFromFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.systemPrompt !== undefined && data.userPrompt !== undefined) {
          setSystemPrompt(data.systemPrompt);
          setUserPrompt(data.userPrompt);
        } else {
          alert('Invalid preset file format');
        }
      } catch (err) {
        alert('Error reading preset file: ' + err.message);
      }
    };
    reader.readAsText(file);
    event.target.value = null;
  };

  const loadPresetFromList = (filename) => {
    fetch('/presets/' + filename)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load preset file');
        return res.json();
      })
      .then((data) => {
        if (data.systemPrompt !== undefined && data.userPrompt !== undefined) {
          setSystemPrompt(data.systemPrompt);
          setUserPrompt(data.userPrompt);
        } else {
          alert('Invalid preset file format');
        }
      })
      .catch((err) => {
        alert('Error loading preset: ' + err.message);
      });
  };

  const removeFileAtIndex = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const generateImage = async () => {
    if (!apiKey.trim()) {
      alert('Please enter your OpenAI API key');
      return;
    }
    if (files.length === 0) {
      const proceed = window.confirm('No image references, are you sure?');
      if (!proceed) {
        return;
      }
    }
    setLoading(true);
    setResultImage(null);
    try {
      const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
      const prompt = systemPrompt + (userPrompt ? ' ' + userPrompt : '');
      if (files.length > 0) {
        const fileRefs = await Promise.all(
          files.map((file) => toFile(file, null, { type: file.type }))
        );
        const response = await openai.images.edit({
          model: 'gpt-image-1',
          image: fileRefs,
          prompt,
        });
        const b64 = response.data[0].b64_json;
        setResultImage('data:image/png;base64,' + b64);
      } else {
        const response = await openai.images.generate({
          model: 'gpt-image-1',
          prompt,
          size: '1024x1024',
          n: 1,
        });
        const b64 = response.data[0].b64_json;
        setResultImage('data:image/png;base64,' + b64);
      }
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
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">ImageGen: AI-Powered Image Generation</h1>
      <p className="text-left text-gray-700 mb-6 max-w-3xl mx-auto">
        &nbsp;&nbsp;&nbsp;&nbsp;GPT Image 1 is capable of generating seamless textures and images, perfect for creative projects and design workflows. Explore more in the <a href="#/image-tile" className="text-blue-600 hover:underline">Image Tiler</a> interface.
      </p>

      <div className="mb-6 p-6 bg-gray-50 rounded-lg shadow-inner">
        <ApiKeyInput
          apiKey={apiKey}
          setApiKey={setApiKey}
          apiKeySource={apiKeySource}
          setApiKeySource={setApiKeySource}
          setLoading={setLoading}
          loading={loading}
        />
      </div>

      <div className="mb-6 p-6 bg-gray-50 rounded-lg shadow-inner">
        <FileUploadArea files={files} setFiles={setFiles} removeFileAtIndex={removeFileAtIndex} />
      </div>

      <div className="mb-6 p-6 bg-gray-50 rounded-lg shadow-inner">
        <label className="block font-semibold mb-1 text-gray-700" htmlFor="system-prompt">
          System Prompt (AI Guidance)
        </label>
        <textarea
          id="system-prompt"
          rows={3}
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Instructions to guide the AI's image generation"
        />
      </div>

      <Suggestion apiKey={apiKey} />

      <div className="mt-4 mb-6 p-6 bg-gray-50 rounded-lg shadow-inner">
        <label className="block font-semibold mb-1 text-gray-700" htmlFor="user-prompt">
          User Prompt
        </label>
        <input
          id="user-prompt"
          type="text"
          placeholder="Describe your image request here..."
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6 p-6 bg-gray-50 rounded-lg shadow-inner">
        <PresetControls
          presetName={presetName}
          setPresetName={setPresetName}
          savePreset={savePreset}
          loadPresetFromFile={loadPresetFromFile}
          loadingPresets={loadingPresets}
          availablePresets={availablePresets}
          loadPresetFromList={loadPresetFromList}
        />
      </div>

      <div className="mt-6 text-center space-y-4">
        <button
          onClick={generateImage}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {loading ? 'Generating...' : 'Generate Image'}
        </button>
      </div>

      {resultImage && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Generated Image</h2>
          <img src={resultImage} alt="Generated" className="mx-auto max-w-full rounded-lg shadow-lg" />
          <div className="mt-4">
            <button
              onClick={downloadImage}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
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
