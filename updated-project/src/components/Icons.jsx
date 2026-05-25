import React from 'react';

/**
 * Centralised SVG icon library. Each icon is a functional component
 * so consumers can pass standard SVG props (className, width, height, etc).
 */

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export const Phone = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8 10a16 16 0 0 0 6 6l1.36-1.36a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z" />
  </svg>
);

export const Chart = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M3 3v18h18" />
    <path d="M7 14l4-4 4 4 5-5" />
  </svg>
);

export const Card = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="3" y="6" width="18" height="13" rx="2" />
    <path d="M3 10h18" />
    <path d="M8 15h3" />
  </svg>
);

export const Layers = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

export const Shield = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export const EyeOff = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M17.94 17.94A10 10 0 0 1 12 20c-7 0-11-8-11-8a18 18 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9 9 0 0 1 12 4c7 0 11 8 11 8a18 18 0 0 1-2.16 3.19" />
    <path d="M14.12 14.12A3 3 0 1 1 9.88 9.88" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export const ArrowRight = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={2.4} {...p}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

export const Menu = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={2} {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

export const Clock = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

export const TrendUp = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M14 7h7v7" />
  </svg>
);

export const FileText = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

export const Users = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
  </svg>
);

export const Bolt = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export const Calendar = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export const Star = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <polygon points="12 2 15 8.5 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 9 8.5 12 2" />
  </svg>
);

export const LinkedIn = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Logo = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={2.2} {...p}>
    <path d="M2 12h4l3-9 4 18 3-9h6" />
  </svg>
);

/* Timeline step icons */
export const Bell = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={1.6} {...p}>
    <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3Z" />
    <path d="M8 17a4 4 0 0 0 8 0" />
  </svg>
);

export const Mic = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={1.6} {...p}>
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <path d="M12 19v3" />
  </svg>
);

export const UsersGroup = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={1.6} {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const Dollar = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={1.6} {...p}>
    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
    <path d="M12 6v2m0 8v2" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

export const CheckSquare = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={1.6} {...p}>
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

export const ChevronRight = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={2.2} {...p}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export const Check = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={1.9} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
