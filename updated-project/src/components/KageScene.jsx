import React from 'react';
import { KageLandingPage } from '../shaders/landing-pages/KageLandingPage.tsx';
import '../shaders/threeui.css';

export default function KageScene() {
  return (
    <div className="shader-frame" style={{ position: 'fixed', inset: 0, width: '100vw', height: '100dvh' }}>
      <KageLandingPage />
    </div>
  );
}
