import React from 'react';
import { Logo, LinkedIn } from './Icons.jsx';

const PLATFORM  = ['AI Voice Agents', 'WhatsApp', 'Field Collections', 'Analytics', 'Compliance'];
const COMPANY   = ['About', 'Jobs', 'Press', 'Partners'];           // Contact removed (section removed)
const RESOURCES = ['Blog', 'Case Studies', 'Documentation', 'Security', 'Status'];
const LEGAL     = ['Privacy Policy', 'Terms of Service', 'RBI Compliance', 'Data Protection'];

function Column({ title, items }) {
  return (
    <div className="footer-col">
      <h4>{title}</h4>
      <ul>
        {items.map((it) => (
          <li key={it}><a href="#">{it}</a></li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">

        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="logo">
              <span className="logo-mark" aria-hidden="true">
                <Logo style={{ width: 20, height: 20, stroke: '#fff' }} />
              </span>
              {/* Brand name — fully black, no gold split */}
              <span className="logo-text">DEBT RECOVERY</span>
            </a>
            <p>
              AI-powered debt recovery infrastructure for banks, NBFCs and fintech lenders —
              ethical, scalable and compliant by design.
            </p>

            {/* Only LinkedIn icon */}
            <div className="footer-socials">
              <a href="#" aria-label="LinkedIn">
                <LinkedIn style={{ width: 16, height: 16, stroke: 'var(--ink-soft)' }} />
              </a>
            </div>
          </div>

          <Column title="Platform"  items={PLATFORM}  />
          <Column title="Company"   items={COMPANY}   />
          <Column title="Resources" items={RESOURCES} />
          <Column title="Legal"     items={LEGAL}     />
        </div>

        <div className="footer-bottom">
          <p>© 2026 Debt Recovery Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
