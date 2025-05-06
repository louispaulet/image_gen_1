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
        content: `Create a detailed and creative image generation prompt for an AI model based on the theme: "${theme}". The prompt should inspire vivid and imaginative images. You have to use 100 words max, in a singular prompt. Please only answer the prompt.`
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

  return (
    <div className="border border-gray-300 rounded p-4 mt-8 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">Suggestion Component</h2>
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
      <button
        onClick={generatePrompt}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Prompt'}
      </button>
      {generatedPrompt && (
        <div className="mt-4 p-3 border border-gray-400 rounded bg-gray-50 whitespace-pre-wrap select-all cursor-text">
          {generatedPrompt}
        </div>
      )}
    </div>
  );
}

export default Suggestion;
