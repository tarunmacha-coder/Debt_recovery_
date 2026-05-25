import React from 'react';

/*
 * PDF requirement #5 / #9:
 * Replaces the removed black section with the Samarthya-style differentiator block.
 * Cream background, black + gold heading, 4 cards with gold left-border.
 */
const ITEMS = [
  {
    title: 'Technology Enabled Debt Recovery',
    body: 'Our proprietary bots and analytics give you faster innovation, deeper customisation, and complete control without third-party dependency.',
  },
  {
    title: 'Full RBI & DPDP Compliance',
    body: "We strictly adhere to RBI regulations and India's data protection standards at every step. Every interaction and process is fully compliant — ensuring zero regulatory risk for your business.",
  },
  {
    title: 'Blended Model = Higher Recovery',
    body: 'We combine automation with human expertise — bots drive scale, while experts handle complexity. This ensures every account is managed effectively, maximising recovery outcomes.',
  },
  {
    title: 'Real-Time Client Visibility',
    body: 'Access a powerful, real-time dashboard with complete visibility into performance. Track recovery progress, agent activity, and portfolio health — anytime, anywhere.',
  },
];

export default function WhyChoose() {
  return (
    <section className="section section--cream gold-hairline" id="why-choose">
      <div className="wrap">

        <div className="section-head">
          <span className="badge reveal"><span className="spark" />Our Differentiators</span>
          <h2 className="reveal" data-d="1">
            Why Choose <span className="gold">Samarthya</span>
          </h2>
          <span className="underline reveal" data-d="2" />
        </div>

        <div className="why-grid">
          {ITEMS.map(({ title, body }, i) => (
            <article className="why-card reveal" data-d={i + 1} key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
