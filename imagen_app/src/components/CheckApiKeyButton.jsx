import React from 'react';
import OpenAI from 'openai';

function CheckApiKeyButton({ apiKey, setLoading, loading }) {
  const [status, setStatus] = React.useState(null); // 'success' | 'error' | null
  const [message, setMessage] = React.useState('');
  const [showPopin, setShowPopin] = React.useState(false);
  const timeoutRef = React.useRef(null);

  const checkApiKey = async () => {
    if (!apiKey.trim()) {
      setStatus('error');
      setMessage('Please enter your OpenAI API key');
      setShowPopin(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setShowPopin(false), 3000);
      return;
    }
    setLoading(true);
    try {
      const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
      const response = await openai.chat.completions.create({
        model: 'gpt-4.1-nano',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: 'Say hello to confirm the API key is valid.' }
        ],
      });
      setStatus('success');
      setMessage('API key is valid');
      setShowPopin(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setShowPopin(false), 3000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setMessage('API key validation failed: ' + error.message);
      setShowPopin(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setShowPopin(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        onClick={checkApiKey}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 disabled:opacity-50 flex items-center focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        {loading ? 'Checking...' : 'Check API Key'}
      </button>
      {status === 'success' && !loading && (
        <span className="ml-2 text-green-500 text-xl" aria-label="Success">
          ✓
        </span>
      )}
      {status === 'error' && !loading && (
        <span className="ml-2 text-red-500 text-xl" aria-label="Error">
          ✗
        </span>
      )}
      {showPopin && (
        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md opacity-90 animate-fadeOut shadow-lg">
          {message}
        </div>
      )}
      <style>{`
        @keyframes fadeOut {
          0% { opacity: 0.9; }
          80% { opacity: 0.9; }
          100% { opacity: 0; }
        }
        .animate-fadeOut {
          animation: fadeOut 3s forwards;
        }
      `}</style>
    </div>
  );
}

export default CheckApiKeyButton;
