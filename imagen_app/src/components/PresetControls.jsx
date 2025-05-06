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
    <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
      <input
        type="text"
        placeholder="Preset name"
        value={presetName}
        onChange={(e) => setPresetName(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 flex-grow"
      />
      <button
        onClick={savePreset}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        type="button"
      >
        Save Preset
      </button>
      <label
        htmlFor="load-preset-file"
        className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700"
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
        <div className="text-gray-500">Loading presets...</div>
      ) : (
        <select
          onChange={(e) => {
            if (e.target.value) loadPresetFromList(e.target.value);
          }}
          defaultValue=""
          className="border border-gray-300 rounded px-3 py-2"
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
