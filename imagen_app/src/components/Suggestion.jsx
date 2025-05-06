import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import OpenAI from 'openai';
import { HiOutlineClipboardCopy } from 'react-icons/hi';

function Suggestion({ apiKey }) {
  const [theme, setTheme] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const generatePrompt = useCallback(async () => {
    setErrorMessage('');
    if (!apiKey.trim()) {
      setErrorMessage('Please enter your OpenAI API key.');
      return;
    }
    if (!theme.trim()) {
      setErrorMessage('Please enter a theme.');
      return;
    }
    setLoading(true);
    setGeneratedPrompt('');
    try {
      const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
      const systemMessage = {
        role: 'system',
        content:
          'You are a helpful assistant that creates creative image generation prompts. You have 150 tokens to answer.',
      };
      const userMessage = {
        role: 'user',
        content: `Create a detailed and creative image generation prompt for openai dall-e-3 model based on the theme: "${theme}". The prompt should inspire vivid and imaginative images. You have to use 100 words max, in a singular prompt. Please only answer the prompt.`,
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
      setErrorMessage('Error generating prompt: ' + error.message);
    } finally {
      setLoading(false);
    }
  }, [apiKey, theme]);

  const clearFields = useCallback(() => {
    setTheme('');
    setGeneratedPrompt('');
    setErrorMessage('');
  }, []);

  const copyToClipboard = useCallback(() => {
    if (generatedPrompt) {
      navigator.clipboard
        .writeText(generatedPrompt)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 3000);
        })
        .catch((err) => {
          setErrorMessage('Failed to copy prompt: ' + err.message);
        });
    }
  }, [generatedPrompt]);

  return (
    <>
      {copySuccess && (
        <div
          role="alert"
          aria-live="assertive"
          className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2 z-50 animate-fade-in-out"
        >
          Prompt copied to clipboard!
        </div>
      )}
      <div className="border border-gray-300 rounded p-6 mt-8 max-w-xl mx-auto shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Let ChatGPT suggest a prompt</h2>
        <label htmlFor="theme-input" className="block font-medium mb-2">
          Enter a theme:
        </label>
        <input
          id="theme-input"
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="Enter theme here"
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-describedby="themeHelp"
        />
        {errorMessage && (
          <p id="themeHelp" className="text-red-600 mb-4" role="alert">
            {errorMessage}
          </p>
        )}
        <div className="flex space-x-4 mb-4 items-center">
          <button
            onClick={generatePrompt}
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-disabled={loading}
            aria-busy={loading}
          >
            {loading ? 'Generating...' : 'Generate Prompt'}
          </button>
          <button
            onClick={clearFields}
            disabled={loading}
            className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-400"
            title="Clear input and output"
            aria-disabled={loading}
          >
            Clear Section
          </button>
          <button
            onClick={copyToClipboard}
            disabled={!generatedPrompt}
            className="bg-green-600 text-white p-3 rounded hover:bg-green-700 disabled:opacity-50 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-400"
            title="Copy prompt to clipboard"
            aria-disabled={!generatedPrompt}
          >
            <HiOutlineClipboardCopy className="h-6 w-6" aria-hidden="true" />
            <span className="sr-only">Copy prompt to clipboard</span>
          </button>
        </div>
        {generatedPrompt && (
          <div
            className="mt-4 p-4 border border-gray-400 rounded bg-gray-50 whitespace-pre-wrap select-all cursor-text"
            tabIndex={0}
            aria-label="Generated prompt"
          >
            {generatedPrompt}
          </div>
        )}
      </div>
    </>
  );
}

Suggestion.propTypes = {
  apiKey: PropTypes.string.isRequired,
};

export default Suggestion;
