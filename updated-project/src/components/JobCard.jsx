import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Calendar, ArrowRight } from './Icons.jsx';

const EMPTY = { name: '', email: '', phone: '', message: '' };
const LS_KEY = 'job_applications';

function saveApplication(entry) {
  const existing = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  existing.push(entry);
  localStorage.setItem(LS_KEY, JSON.stringify(existing));
  return existing;
}

function downloadApplyExcel(rows) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(rows, {
    header: ['name', 'email', 'phone', 'position', 'message', 'appliedAt'],
  });
  ws['!cols'] = [
    { wch: 22 }, { wch: 28 }, { wch: 18 },
    { wch: 26 }, { wch: 36 }, { wch: 24 },
  ];
  XLSX.utils.book_append_sheet(wb, ws, 'Applications');
  XLSX.writeFile(wb, 'job-applications.xlsx');
}

function ApplyModal({ job, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const entry = {
      ...form,
      position: job.title,
      appliedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };
    const allRows = saveApplication(entry);

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, position: job.title }),
      });
      if (res.ok) {
        setStatus('success');
        setForm(EMPTY);
      } else {
        throw new Error('Backend error');
      }
    } catch {
      downloadApplyExcel(allRows);
      setStatus('success');
      setForm(EMPTY);
    }
  };

  return (
    <div className="article-overlay" role="dialog" aria-modal="true" aria-label={`Apply for ${job.title}`}>
      <div className="apply-modal">
        <button className="article-close" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="apply-modal-head">
          <div className="apply-job-tags">
            {job.tags.map((t) => (
              <span className="job-tag" key={t}>{t}</span>
            ))}
          </div>
          <h2>Apply for <span className="gold">{job.title}</span></h2>
          <p>Fill in your details below and our HR team will get back to you within 2 business days.</p>
        </div>

        <form className="apply-form" onSubmit={handleSubmit} noValidate>
          <div className="demo-form-row">
            <div className="demo-field">
              <label htmlFor={`apply-name-${job.id}`}>
                Full Name <span className="demo-req">*</span>
              </label>
              <input
                id={`apply-name-${job.id}`}
                name="name"
                type="text"
                placeholder="Your full name"
                required
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="demo-field">
              <label htmlFor={`apply-email-${job.id}`}>
                Email Address <span className="demo-req">*</span>
              </label>
              <input
                id={`apply-email-${job.id}`}
                name="email"
                type="email"
                placeholder="you@email.com"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="demo-field">
            <label htmlFor={`apply-phone-${job.id}`}>
              Phone Number <span className="demo-req">*</span>
            </label>
            <input
              id={`apply-phone-${job.id}`}
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
              required
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="demo-field">
            <label htmlFor={`apply-msg-${job.id}`}>Cover Letter / Message</label>
            <textarea
              id={`apply-msg-${job.id}`}
              name="message"
              rows={4}
              placeholder="Tell us about yourself and why you're a great fit…"
              value={form.message}
              onChange={handleChange}
            />
          </div>

          {status === 'success' && (
            <div className="demo-feedback demo-success">
              Application submitted! Our HR team will reach out within 2 business days.
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary demo-submit"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Submitting…' : 'Submit Application'}
            {status !== 'loading' && <ArrowRight width={14} height={14} />}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function JobCard({ job, delay = 1 }) {
  const [applyOpen, setApplyOpen] = useState(false);

  return (
    <>
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

        <div className="job-cta">
          <button className="btn btn-primary" onClick={() => setApplyOpen(true)}>
            Apply Now
            <ArrowRight width={14} height={14} />
          </button>
          <a
            href={`mailto:careers@debtrecovery.example?subject=Resume — ${encodeURIComponent(job.title)}`}
            className="btn btn-outline"
          >
            Submit Resume
          </a>
        </div>
      </article>

      {applyOpen && (
        <ApplyModal job={job} onClose={() => setApplyOpen(false)} />
      )}
    </>
  );
}
