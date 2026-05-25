import React from 'react';
import { StarFilled } from './Icons.jsx';

const STATS = [
  { value: '50+',   label: 'Lenders' },
  { value: '₹420Cr', label: 'Recovered' },
  { value: '12M+',  label: 'Borrowers Reached' },
  { value: '4.8',   label: 'Avg. CSAT' },
];

const LOGOS = [
  { mark: 'NB',  name: 'NorthBank' },
  { mark: 'AC',  name: 'ApexCredit' },
  { mark: 'VL',  name: 'VistaLend' },
  { mark: 'TF',  name: 'TrueFin' },
  { mark: 'MN',  name: 'MeridianNBFC' },
  { mark: 'KP',  name: 'KredPay' },
];

const TESTIMONIALS = [
  {
    body:
      'Recovery rates lifted 14% in the first vintage and our agents finally have a single view of every borrower. The compliance trail is the cleanest we have ever shipped.',
    initials: 'AK',
    name: 'Anika Kapoor',
    role: 'Head of Collections, NorthBank',
  },
  {
    body:
      'The AI voice agents handle the first 3 attempts so our team only steps in for the conversations that need a human. Onboarding took 19 days end-to-end.',
    initials: 'RM',
    name: 'Rohan Mehta',
    role: 'VP Operations, ApexCredit',
  },
  {
    body:
      "We replaced four vendors with one platform. Dashboards refresh in real time and the RBI fair-practice guardrails are baked into every workflow — no spreadsheets, no audit panic.",
    initials: 'SD',
    name: 'Sneha Desai',
    role: 'COO, VistaLend',
  },
];

export default function Customers() {
  return (
    <section className="section section--ivory gold-hairline" id="customers">
      <div className="wrap">

        <div className="section-head">
          <span className="badge reveal"><span className="spark" />Customers</span>
          <h2 className="reveal" data-d="1">
            Trusted by India's <span className="gold">leading lenders</span>
          </h2>
          <span className="underline reveal" data-d="2" />
          <p className="reveal" data-d="2">
            From digital-first NBFCs to large private banks — teams use Debt Recovery to lift
            collection rates while staying audit-ready.
          </p>
        </div>

        <div className="customers-stats">
          {STATS.map((s, i) => (
            <div className="customer-stat reveal" data-d={(i % 4) + 1} key={s.label}>
              <b>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <div className="logos-strip reveal" data-d="2">
          <div className="logos-label">Used by teams at</div>
          <div className="logos-grid">
            {LOGOS.map((l) => (
              <div className="logo-item" key={l.name}>
                <span className="mark">{l.mark}</span>
                <span className="name">{l.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <article className="testimonial-card reveal" data-d={i + 1} key={t.name}>
              <div className="testimonial-stars" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, k) => (
                  <StarFilled key={k} />
                ))}
              </div>
              <p>{t.body}</p>
              <div className="testimonial-meta">
                <div className="testimonial-avatar" aria-hidden="true">{t.initials}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
