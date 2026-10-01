import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from './Icons.jsx';
import { clearLegacyLocalCopies, errorSummary, submitNetlifyForm, validate } from './netlifyForms.js';

const EMPTY = { name: '', email: '', phone: '', company: '', message: '' };
const REQUIRED = ['name', 'email', 'phone', 'company'];
const FIELD_ORDER = ['name', 'email', 'phone', 'company'];

/* off-screen, not display:none — the honeypot has to look fillable to a bot */
const HONEYPOT_STYLE = { position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' };

export default function DemoModal({ onClose }) {
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
      const first = FIELD_ORDER.find((f) => found[f]);
      formRef.current?.querySelector(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus('loading');
    try {
      await submitNetlifyForm('book-demo', {
        'bot-field': botField,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        company: form.company.trim(),
        message: form.message.trim(),
      });
      setStatus('success');
      setForm(EMPTY);
    } catch {
      setErrorMsg('Sorry, we couldn’t send your request. Please check your connection and try again.');
      setStatus('error');
    }
  };

  return (
    <div
      className="article-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Book a Demo"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="apply-modal demo-modal">
        <button className="article-close" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="apply-modal-head">
          <span className="badge" style={{ marginBottom: 14, display: 'inline-flex' }}>
            <span className="spark" />Get Started
          </span>
          <h2>Book a <span className="gold">Demo</span></h2>
          <p>
            Get a 30-minute walkthrough with our team. We'll show you exactly how our AI agents,
            omnichannel outreach and analytics fit your stack.
          </p>
        </div>

        <form ref={formRef} className="apply-form" name="book-demo" onSubmit={handleSubmit} noValidate>
          <p style={HONEYPOT_STYLE} aria-hidden="true">
            <label>
              Don’t fill this out if you’re human:{' '}
              <input name="bot-field" tabIndex={-1} autoComplete="off" value={botField} onChange={(e) => setBotField(e.target.value)} />
            </label>
          </p>
          <div className="demo-form-row">
            <div className="demo-field">
              <label htmlFor="demo-name">Full Name <span className="demo-req">*</span></label>
              <input
                id="demo-name" name="name" type="text"
                placeholder="Your full name" required
                value={form.name} onChange={handleChange}
                aria-invalid={errors.name ? 'true' : undefined}
              />
            </div>
            <div className="demo-field">
              <label htmlFor="demo-email">Email Address <span className="demo-req">*</span></label>
              <input
                id="demo-email" name="email" type="email"
                placeholder="you@company.com" required
                value={form.email} onChange={handleChange}
                aria-invalid={errors.email ? 'true' : undefined}
              />
            </div>
          </div>

          <div className="demo-form-row">
            <div className="demo-field">
              <label htmlFor="demo-phone">Phone Number <span className="demo-req">*</span></label>
              <input
                id="demo-phone" name="phone" type="tel"
                placeholder="+91 98765 43210" required
                value={form.phone} onChange={handleChange}
                aria-invalid={errors.phone ? 'true' : undefined}
              />
            </div>
            <div className="demo-field">
              <label htmlFor="demo-company">Company Name <span className="demo-req">*</span></label>
              <input
                id="demo-company" name="company" type="text"
                placeholder="Your organisation" required
                value={form.company} onChange={handleChange}
                aria-invalid={errors.company ? 'true' : undefined}
              />
            </div>
          </div>

          <div className="demo-field">
            <label htmlFor="demo-message">Message</label>
            <textarea
              id="demo-message" name="message" rows={4}
              placeholder="Tell us about your recovery challenges or anything you'd like us to know…"
              value={form.message} onChange={handleChange}
            />
          </div>

          {status === 'success' && (
            <div className="demo-feedback demo-success" role="status">
              Thank you! Our team will reach out within 24 hours.
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
            {status === 'loading' ? 'Sending…' : 'Book a Demo'}
            {status !== 'loading' && <ArrowRight width={14} height={14} />}
          </button>
        </form>
      </div>
    </div>
  );
}
