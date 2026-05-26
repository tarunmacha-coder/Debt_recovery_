import React from 'react';
import { Phone, Chart, Card } from './Icons.jsx';

const STATS = [
  {
    Icon: Phone,
    title: 'AI Voice Agents',
    body: '1,284 calls handled today — 71% resolved without an agent.',
  },
  {
    Icon: Chart,
    title: 'Real-Time Analytics',
    body: 'Live dashboards — track recovery, agent performance and portfolio health.',
  },
  {
    Icon: Card,
    title: 'Payments Today',
    body: '\u20B94.2 Cr collected · +18% vs yesterday across all channels.',
  },
];

export default function Hero() {
  return (
    <section className="hero" id="platform">
      <div className="wrap">
        <div className="hero-inner">

          <span className="trust-line reveal">
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--gold-bright)',
                boxShadow: '0 0 10px var(--gold-glow), 0 0 4px var(--gold-light)',
              }}
            />
            Trusted by 50+ banks, NBFCs &amp; fintech lenders
          </span>

          <h1 className="reveal" data-d="1">
            AI-Powered Debt<br />
            <span className="gold">Recovery Infrastructure</span>
          </h1>

          <p className="hero-sub reveal" data-d="2">
            Recover more, ethically and at scale. One intelligent platform unifying AI voice agents,
            omnichannel outreach, field collections and real-time analytics — built for modern lenders.
          </p>

          {/* Only 3 key points kept — PDF requirement #3 */}
          <div className="hero-stats reveal" data-d="4">
            {STATS.map(({ Icon, title, body }) => (
              <div className="hero-stat" key={title}>
                <div className="ico">
                  <Icon style={{ width: 18, height: 18, stroke: 'var(--gold-deep)' }} />
                </div>
                <h4>{title}</h4>
                <p>{body}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
