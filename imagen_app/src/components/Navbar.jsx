import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="text-xl font-bold">
              ImageGen
            </NavLink>
            <div className="hidden md:block ml-10 space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  (isActive ? 'bg-gray-900 ' : '') +
                  'hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium'
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  (isActive ? 'bg-gray-900 ' : '') +
                  'hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium'
                }
              >
                About
              </NavLink>
            </div>
          </div>
          <div className="md:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => {
                const menu = document.getElementById('mobile-menu');
                if (menu) {
                  menu.classList.toggle('hidden');
                }
              }}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              (isActive ? 'bg-gray-900 ' : '') +
              'block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              (isActive ? 'bg-gray-900 ' : '') +
              'block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700'
            }
          >
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
