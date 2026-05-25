import React from 'react';
import { ArrowRight } from './Icons.jsx';

export default function Contact() {
  return (
    <section className="section section--ivory gold-hairline" id="contact">
      <div className="wrap">
        <div className="section-head">
          <span className="badge reveal"><span className="spark" />Get Started</span>
          <h2 className="reveal" data-d="1">
            See <span className="gold">Debt Recovery</span> in action
          </h2>
          <span className="underline reveal" data-d="2" />
          <p className="reveal" data-d="2">
            Book a 30-minute walkthrough with our team. We'll show you exactly how our AI agents,
            omnichannel outreach and analytics fit into your stack.
          </p>
        </div>

        <div
          className="reveal"
          data-d="3"
          style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a href="mailto:hello@debtrecovery.example" className="btn btn-primary">
            Book Demo
            <ArrowRight width={14} height={14} />
          </a>
          <a href="mailto:hello@debtrecovery.example" className="btn btn-outline">Email us</a>
        </div>
      </div>
    </section>
  );
}
