import React from 'react';
import CheckApiKeyButton from './CheckApiKeyButton';

function ApiKeyInput({ apiKey, setApiKey, apiKeySource, setApiKeySource, setLoading, loading }) {
  return (
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
        <CheckApiKeyButton apiKey={apiKey} setLoading={setLoading} loading={loading} />
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
  );
}

export default ApiKeyInput;
