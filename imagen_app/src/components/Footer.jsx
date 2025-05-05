import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} ImageGen. All rights reserved.</p>
        <p className="text-sm mt-2">
          Built with React and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
