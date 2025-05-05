import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DummyHomepage from './components/DummyHomepage';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <DummyHomepage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
