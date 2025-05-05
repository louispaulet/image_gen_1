import React from 'react';
import { NavLink } from 'react-router-dom';

const linkStyle = {
  marginRight: '1rem',
  textDecoration: 'none',
  color: '#007acc',
};

const activeStyle = {
  fontWeight: 'bold',
  textDecoration: 'underline',
};

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', marginBottom: '1rem' }}>
      <NavLink to="/" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)} end>
        Home
      </NavLink>
      <NavLink to="/about" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
        About
      </NavLink>
    </nav>
  );
}
