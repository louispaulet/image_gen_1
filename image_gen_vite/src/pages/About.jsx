import React from 'react';

export default function About() {
  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>About ImageGen</h1>
      <p style={{ marginBottom: '1rem' }}>
        ImageGen is a React application that allows you to edit images using OpenAI's image editing API.
      </p>
      <p>
        This app demonstrates how to integrate OpenAI's image editing capabilities with a user-friendly interface, including drag-and-drop image upload, prompt customization, and image generation.
      </p>
    </div>
  );
}
