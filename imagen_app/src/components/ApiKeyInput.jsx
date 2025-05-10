import React from 'react';
import CheckApiKeyButton from './CheckApiKeyButton';

function ApiKeyInput({ apiKey, setApiKey, apiKeySource, setApiKeySource, setLoading, loading }) {
  // Helper function to censor half of the API key characters
  function censorApiKey(key) {
    if (!key) return '';
    const len = key.length;
    const visible_len = 40
    const visiblePart = key.slice(0, visible_len);
    const censoredPart = '*'.repeat(len - visible_len);
    return visiblePart + censoredPart;
  }

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-2 text-gray-800">OpenAI API Key Source</label>
      <div className="flex items-center space-x-6 mb-4">
        <label className="inline-flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="apiKeySource"
            value="file"
            checked={apiKeySource === 'file'}
            onChange={() => setApiKeySource('file')}
            className="form-radio h-5 w-5 text-blue-600"
          />
          <span className="text-gray-700">Load from text file</span>
        </label>
        <label className="inline-flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="apiKeySource"
            value="manual"
            checked={apiKeySource === 'manual'}
            onChange={() => setApiKeySource('manual')}
            className="form-radio h-5 w-5 text-blue-600"
          />
          <span className="text-gray-700">Enter manually</span>
        </label>
        <CheckApiKeyButton apiKey={apiKey} setLoading={setLoading} loading={loading} />
      </div>
      {apiKeySource === 'manual' && (
        <input
          id="api-key"
          type="text"
          placeholder="sk-..."
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
      {apiKeySource === 'file' && (
        <input
          id="api-key-file"
          type="text"
          value={censorApiKey(apiKey)}
          readOnly
          className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-100"
        />
      )}
    </div>
  );
}

export default ApiKeyInput;
