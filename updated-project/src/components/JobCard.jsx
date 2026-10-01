import React, { useEffect, useRef, useState } from 'react';
import { Calendar, ArrowRight } from './Icons.jsx';
import { clearLegacyLocalCopies, errorSummary, submitNetlifyForm, validate } from './netlifyForms.js';

const EMPTY = { name: '', email: '', phone: '', message: '' };
const REQUIRED = ['name', 'email', 'phone'];

/* off-screen, not display:none — the honeypot has to look fillable to a bot */
const HONEYPOT_STYLE = { position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' };

function ApplyModal({ job, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [botField, setBotField] = useState('');
  const formRef = useRef(null);

  useEffect(clearLegacyLocalCopies, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (status === 'success' || status === 'error') setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const found = validate(form, REQUIRED);
    if (Object.keys(found).length) {
      setErrors(found);
      setErrorMsg(errorSummary(found));
      setStatus('error');
      const first = REQUIRED.find((f) => found[f]);
      formRef.current?.querySelector(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus('loading');
    try {
      await submitNetlifyForm('job-application', {
        'bot-field': botField,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        position: job.title,
        message: form.message.trim(),
      });
      setStatus('success');
      setForm(EMPTY);
    } catch {
      setErrorMsg('Sorry, we couldn’t submit your application. Please check your connection and try again.');
      setStatus('error');
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

        <form ref={formRef} className="apply-form" name="job-application" onSubmit={handleSubmit} noValidate>
          <p style={HONEYPOT_STYLE} aria-hidden="true">
            <label>
              Don’t fill this out if you’re human:{' '}
              <input name="bot-field" tabIndex={-1} autoComplete="off" value={botField} onChange={(e) => setBotField(e.target.value)} />
            </label>
          </p>
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
                aria-invalid={errors.name ? 'true' : undefined}
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
                aria-invalid={errors.email ? 'true' : undefined}
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
              aria-invalid={errors.phone ? 'true' : undefined}
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
            <div className="demo-feedback demo-success" role="status">
              Application submitted! Our HR team will reach out within 2 business days.
            </div>
          )}
          {status === 'error' && (
            <div className="demo-feedback demo-error" role="alert">
              {errorMsg}
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
