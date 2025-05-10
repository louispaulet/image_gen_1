import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DummyHomepage from './components/Homepage';
import About from './components/About';
import ImageTilePage from './components/ImageTilePage';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<DummyHomepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/image-tile" element={<ImageTilePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
