import React from 'react';
import { Layers, Shield, EyeOff } from './Icons.jsx';

/*
 * PDF requirements #4 & #5:
 *  - keep only 3 problem cards
 *  - the "Manual operations" and "Poor borrower experience" cards are removed
 *  - the "There's a better way" CTA card is removed
 *  - black section converted to cream luxury theme
 */
const PROBLEMS = [
  {
    Icon: Layers,
    title: 'Fragmented collections',
    body: 'Disconnected vendors, spreadsheets and channels create blind spots across the recovery lifecycle.',
  },
  {
    Icon: Shield,
    title: 'Compliance risk',
    body: 'Manual processes make RBI fair-practice adherence and audit trails nearly impossible to guarantee.',
  },
  {
    Icon: EyeOff,
    title: 'Low visibility',
    body: "No single source of truth means leadership can't see what's working or where money leaks.",
  },
];

export default function Problem() {
  return (
    <section className="section section--ivory gold-hairline" id="problem">
      <div className="wrap">

        <div className="section-head">
          <span className="badge reveal"><span className="spark" />The Problem</span>
          <h2 className="reveal" data-d="1">
            Collections is <span className="gold">broken</span> for modern lenders
          </h2>
          <span className="underline reveal" data-d="2" />
          <p className="reveal" data-d="2">
            Recovery teams are stretched thin across tools, vendors and channels — bleeding margin
            and risking compliance at every step.
          </p>
        </div>

        <div className="problem-grid">
          {PROBLEMS.map(({ Icon, title, body }, i) => (
            <article className="problem-card reveal" data-d={i + 1} key={title}>
              <div className="ico">
                <Icon style={{ width: 22, height: 22, stroke: 'var(--gold-bright)' }} />
              </div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
