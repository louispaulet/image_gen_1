import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">About ImageGen</h1>

      <p className="text-lg leading-relaxed mb-6">
        ImageGen is a sophisticated web application that leverages the power of OpenAI's cutting-edge artificial intelligence models to generate and edit images based on user prompts and reference images.
        It is designed to empower creators, designers, and enthusiasts to effortlessly produce unique and high-quality visuals.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Core Features 🚀</h2>
      <table className="w-full mb-8 border border-gray-300 rounded text-left text-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Feature</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr className="even:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">🖼️ AI-Powered Image Generation</td>
            <td className="border border-gray-300 px-4 py-2">Generate images from detailed textual prompts using OpenAI's advanced image generation models.</td>
          </tr>
          <tr className="even:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">🖌️ Image Editing with References</td>
            <td className="border border-gray-300 px-4 py-2">Upload reference images to guide the AI in editing and enhancing visuals while maintaining key elements.</td>
          </tr>
          <tr className="even:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">💾 Prompt Presets</td>
            <td className="border border-gray-300 px-4 py-2">Save and load custom prompt presets to streamline your creative workflow and reuse favorite configurations.</td>
          </tr>
          <tr className="even:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">💡 Creative Prompt Suggestions</td>
            <td className="border border-gray-300 px-4 py-2">Utilize AI-generated prompt suggestions based on themes to inspire and enhance your image requests.</td>
          </tr>
          <tr className="even:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">🔑 API Key Management</td>
            <td className="border border-gray-300 px-4 py-2">Securely manage your OpenAI API key by loading from a file or manual input, ensuring seamless integration.</td>
          </tr>
          <tr className="even:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">📥 Downloadable Results</td>
            <td className="border border-gray-300 px-4 py-2">Easily download generated images in PNG format for use in your projects or sharing.</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-2xl font-semibold mb-4">Technology Stack ⚙️</h2>
      <p className="text-lg leading-relaxed mb-4">
        ImageGen is built with modern web technologies to provide a responsive and user-friendly experience:
      </p>
      <table className="w-full mb-8 border border-gray-300 rounded text-left text-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Technology</th>
            <th className="border border-gray-300 px-4 py-2">Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr className="even:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">⚛️ React</td>
            <td className="border border-gray-300 px-4 py-2">For building a dynamic and component-based user interface.</td>
          </tr>
          <tr className="even:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">🎨 Tailwind CSS</td>
            <td className="border border-gray-300 px-4 py-2">For utility-first styling and responsive design.</td>
          </tr>
          <tr className="even:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">🤖 OpenAI SDK</td>
            <td className="border border-gray-300 px-4 py-2">To interact with OpenAI's image generation and chat completion APIs directly from the browser.</td>
          </tr>
          <tr className="even:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">💻 JavaScript (ES6+)</td>
            <td className="border border-gray-300 px-4 py-2">For modern scripting and asynchronous API handling.</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-2xl font-semibold mb-4">User Experience ✨</h2>
      <p className="text-lg leading-relaxed mb-4">
        The application offers an intuitive interface where users can:
      </p>
      <div className="space-y-4 mb-8 text-lg">
        <p>🔐 Input or load their OpenAI API key securely.</p>
        <p>🖼️ Upload one or multiple reference images to guide image editing.</p>
        <p>✍️ Compose and edit system and user prompts to customize image generation.</p>
        <p>💾 Save and load prompt presets for efficient reuse.</p>
        <p>💡 Generate creative prompt suggestions to spark inspiration.</p>
        <p>📥 View generated images instantly and download them for further use.</p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">About the Developer</h2>
      <p className="text-lg leading-relaxed">
        This project was developed to showcase the capabilities of AI-driven image generation and to provide a practical tool for creative professionals and hobbyists alike.
        It demonstrates seamless integration of AI APIs with modern frontend technologies to deliver a powerful yet accessible user experience.
      </p>
    </div>
  );
};

export default About;
