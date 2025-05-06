import React, { useState } from 'react';
import OpenAI from 'openai';

function Suggestion({ apiKey }) {
  const [theme, setTheme] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const generatePrompt = async () => {
    if (!apiKey.trim()) {
      alert('Please enter your OpenAI API key');
      return;
    }
    if (!theme.trim()) {
      alert('Please enter a theme');
      return;
    }
    setLoading(true);
    setGeneratedPrompt('');
    try {
      const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
      const systemMessage = {
        role: 'system',
        content: 'You are a helpful assistant that creates creative image generation prompts. You have 150 tokens to answer.'
      };
      const userMessage = {
        role: 'user',
        content: `Create a detailed and creative image generation prompt for openai dall-e-3 model based on the theme: "${theme}". The prompt should inspire vivid and imaginative images. You have to use 100 words max, in a singular prompt. Please only answer the prompt.`
      };
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [systemMessage, userMessage],
        max_tokens: 150,
        temperature: 0.8,
      });
      const promptText = response.choices[0].message.content.trim();
      setGeneratedPrompt(promptText);
    } catch (error) {
      console.error(error);
      alert('Error generating prompt: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const clearFields = () => {
    setTheme('');
    setGeneratedPrompt('');
  };

  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    if (generatedPrompt) {
      navigator.clipboard.writeText(generatedPrompt).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
      }).catch((err) => {
        alert('Failed to copy prompt: ' + err);
      });
    }
  };

  return (
    <>
      {copySuccess && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2 z-50 animate-fade-in-out">
          Prompt copied to clipboard!
        </div>
      )}
      <div className="border border-gray-300 rounded p-4 mt-8 max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-2">Let chatGPT suggest a prompt</h2>
        <label htmlFor="theme-input" className="block font-medium mb-1">
          Enter a theme:
        </label>
        <input
          id="theme-input"
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="Enter theme here"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
        />
        <div className="flex space-x-2 mb-3">
          <button
            onClick={generatePrompt}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Prompt'}
          </button>
          <button
            onClick={clearFields}
            disabled={loading}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
            title="Clear input and output"
          >
            Clear Section
          </button>
          <button
            onClick={copyToClipboard}
            disabled={!generatedPrompt}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 flex items-center space-x-1"
            title="Copy prompt to clipboard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16h8M8 12h8m-6 8h6a2 2 0 002-2v-6a2 2 0 00-2-2h-6a2 2 0 00-2 2v6a2 2 0 002 2zM8 8V6a2 2 0 012-2h6a2 2 0 012 2v2" />
            </svg>
            <span>Copy</span>
          </button>
        </div>
        {generatedPrompt && (
          <div className="mt-4 p-3 border border-gray-400 rounded bg-gray-50 whitespace-pre-wrap select-all cursor-text">
            {generatedPrompt}
          </div>
        )}
      </div>
    </>
  );
}

export default Suggestion;
