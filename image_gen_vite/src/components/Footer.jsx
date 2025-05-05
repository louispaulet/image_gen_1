import React from 'react';

export default function Footer() {
  return (
    <footer style={{ padding: '1rem', borderTop: '1px solid #ccc', marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
      &copy; {new Date().getFullYear()} ImageGen. All rights reserved.
    </footer>
  );
}
