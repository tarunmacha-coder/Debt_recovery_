import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';
import './styles/timeline.css';

// Loaded only on /kage, so the main site never pulls in ThreeUI code or CSS.
const KageScene = lazy(() => import('./components/KageScene.jsx'));
const isKage = window.location.pathname.replace(/\/+$/, '') === '/kage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isKage ? (
      <Suspense fallback={null}>
        <KageScene />
      </Suspense>
    ) : (
      <App />
    )}
  </React.StrictMode>
);
