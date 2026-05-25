import React, { useState } from 'react';
import { Logo, Menu } from './Icons.jsx';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a href="#" className="logo" aria-label="Debt Recovery home">
          <span className="logo-mark" aria-hidden="true">
            <Logo style={{ width: 20, height: 20, stroke: '#fff' }} />
          </span>
          <span className="logo-text">
           <span className="logo-text">DEBT RECOVERY</span>
          </span>
        </a>

        <nav>
          <ul className={`nav-links${open ? ' open' : ''}`}>
            <li><a href="#platform" onClick={close}>Platform</a></li>
            <li><a href="#how" onClick={close}>How it works</a></li>
            <li><a href="#features" onClick={close}>Features</a></li>
            <li><a href="#customers" onClick={close}>Customers</a></li>
            <li><a href="#blog" onClick={close}>Blog</a></li>
            <li><a href="#jobs" onClick={close}>Jobs</a></li>
            <li><a href="#contact" onClick={close}>Contact</a></li>
          </ul>
        </nav>

        <div className="nav-cta">
          <button
            className="mobile-toggle"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
          >
            <Menu style={{ width: 20, height: 20, stroke: 'var(--ink)' }} />
          </button>
          <a href="#contact" className="btn btn-primary">Book Demo</a>
        </div>
      </div>
    </header>
  );
}
