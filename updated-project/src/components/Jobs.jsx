import React from 'react';
import { JOBS } from '../data/jobs.js';
import JobCard from './JobCard.jsx';
import { Star, ArrowRight } from './Icons.jsx';

export default function Jobs() {
  return (
    <section className="section section--cream gold-hairline" id="jobs">
      <div className="wrap">

        <div className="section-head">
          <span className="badge reveal"><span className="spark" />Careers</span>
          <h2 className="reveal" data-d="1">
            Build with us — <span className="gold">open roles</span>
          </h2>
          <span className="underline reveal" data-d="2" />
          <p className="reveal" data-d="2">
            Join a team building the future of ethical, AI-powered debt recovery for India's lenders.
          </p>
        </div>

        <div className="jobs-grid">
          {JOBS.map((job, i) => (
            <JobCard job={job} delay={i + 1} key={job.id} />
          ))}
        </div>

        <div className="job-empty reveal" data-d="3" style={{ marginTop: 22 }}>
          <div className="ico">
            <Star style={{ width: 24, height: 24, stroke: 'var(--gold-bright)' }} />
          </div>
          <h3>More roles coming soon</h3>
          <p>
            Don't see your role? We're always interested in exceptional people. Reach out and
            tell us what you'd build here.
          </p>
          <a href="#contact">
            Get in touch
            <ArrowRight width={14} height={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
