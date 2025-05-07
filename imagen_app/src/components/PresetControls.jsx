import React from 'react';

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
        className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold px-5 py-3 rounded-md shadow-md hover:from-yellow-500 hover:to-yellow-700 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition"
        type="button"
      >
        Save Preset
      </button>
      <label
        htmlFor="load-preset-file"
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold px-5 py-3 rounded-md shadow-md cursor-pointer hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
      >
        Load Preset File
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
          className="border border-gray-300 rounded-md px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
  );
}

export default PresetControls;
