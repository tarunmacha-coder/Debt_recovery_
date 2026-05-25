import React from 'react';
import { Shield, Clock, TrendUp, FileText, Users, Bolt } from './Icons.jsx';

/*
 * PDF requirement #7:
 * The original section had a left-side "Recover more / Book a Demo" CTA block.
 * That promotional block is REMOVED. Only the 6 feature cards remain.
 * Section header now carries the original heading + subline.
 */
const FEATURES = [
  { Icon: Shield,   title: 'Ethical collections',     body: 'Borrower-first outreach that protects your brand and builds long-term trust.' },
  { Icon: Clock,    title: 'AI automation',           body: 'Resolve up to 70% of accounts with zero human effort, 24/7.' },
  { Icon: TrendUp,  title: 'High recovery rate',      body: 'Customers see 10–15% recovery uplift within the first vintage.' },
  { Icon: FileText, title: 'RBI-compliant workflows', body: 'Fair-practice guardrails and audit trails baked into every action.' },
  { Icon: Users,    title: 'Better retention',        body: 'Respectful resolution keeps good borrowers on your books.' },
  { Icon: Bolt,     title: 'Fast onboarding',         body: 'Go live in weeks, not quarters, with secure plug-and-play APIs.' },
];

export default function Features() {
  return (
    <section className="section section--ivory gold-hairline" id="features">
      <div className="wrap">

        <div className="section-head">
          <span className="badge reveal"><span className="spark" />Why Us</span>
          <h2 className="reveal" data-d="1">
            Recover more — without <span className="gold">compromising trust</span> or compliance
          </h2>
          <span className="underline reveal" data-d="2" />
          <p className="reveal" data-d="2">
            We pair frontier AI with deep collections expertise so you maximise recovery while
            treating every borrower with respect.
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map(({ Icon, title, body }, i) => (
            <article className="feature-card reveal" data-d={Math.floor(i / 2) + 1} key={title}>
              <div className="head">
                <div className="ico">
                  <Icon style={{ width: 16, height: 16, stroke: 'var(--gold-bright)' }} />
                </div>
                <h4>{title}</h4>
              </div>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
