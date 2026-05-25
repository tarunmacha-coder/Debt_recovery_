import React from 'react';
import { Calendar, ArrowRight } from './Icons.jsx';

export default function JobCard({ job, delay = 1 }) {
  return (
    <article className="job-card reveal" data-d={delay}>
      <div className="job-tags">
        {job.tags.map((t) => (
          <span className="job-tag" key={t}>{t}</span>
        ))}
      </div>

      <h3>{job.title}</h3>

      <div className="job-exp">
        <Calendar width={14} height={14} style={{ stroke: 'var(--gold-bright)' }} />
        {job.experience}
      </div>

      <p style={{ fontSize: 14, color: 'var(--ink-soft)' }}>{job.summary}</p>

      <h4 className="job-section-title">Responsibilities</h4>
      <ul className="job-list">
        {job.responsibilities.map((r) => <li key={r}>{r}</li>)}
      </ul>

      <h4 className="job-section-title">Skills Required</h4>
      <div className="job-skills">
        {job.skills.map((s) => (
          <span className="job-skill" key={s}>{s}</span>
        ))}
      </div>

      {/* PDF requirement #6: Apply Now / Submit Resume CTAs */}
      <div className="job-cta">
        <a href="#contact" className="btn btn-primary">
          Apply Now
          <ArrowRight width={14} height={14} />
        </a>
        <a href="#contact" className="btn btn-outline">Submit Resume</a>
      </div>
    </article>
  );
}
