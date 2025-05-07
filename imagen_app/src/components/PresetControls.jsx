
import React from 'react';
import { FiSave, FiUpload } from 'react-icons/fi';

function PresetControls({
  presetName,
  setPresetName,
  savePreset,
  loadPresetFromFile,
  loadingPresets,
  availablePresets,
  loadPresetFromList,
}) {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Preset Controls</h2>
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0 bg-white shadow-md rounded-lg p-5">
        <input
          type="text"
          placeholder="Preset name"
          value={presetName}
          onChange={(e) => setPresetName(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-3 flex-grow text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <button
          onClick={savePreset}
          className="bg-yellow-500 text-white px-5 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50 transition"
          type="button"
          aria-label="Save Preset"
          title="Save Preset"
        >
          <FiSave size={20} />
        </button>
        <label
          htmlFor="load-preset-file"
          className="bg-blue-600 text-white px-5 py-2 rounded cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          aria-label="Load Preset File"
          title="Load Preset File"
        >
          <FiUpload size={20} />
        </label>
        <input
          id="load-preset-file"
          type="file"
          accept=".json"
          onChange={loadPresetFromFile}
          style={{ display: 'none' }}
        />
        {loadingPresets ? (
          <div className="text-gray-500 italic">Loading presets...</div>
        ) : (
          <select
            onChange={(e) => {
              if (e.target.value) loadPresetFromList(e.target.value);
            }}
            defaultValue=""
            className="border border-gray-300 rounded px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          >
            <option value="" disabled>
              Load Preset from List
            </option>
            {availablePresets.map((presetFile) => (
              <option key={presetFile} value={presetFile}>
                {presetFile.replace('.json', '')}
              </option>
            ))}
          </select>
        )}
      </div>
    </>
  );
}

export default PresetControls;
