import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { ArrowRight } from './Icons.jsx';

const EMPTY = { name: '', email: '', phone: '', company: '', message: '' };
const LS_KEY = 'demo_submissions';

function saveToLocalStorage(entry) {
  const existing = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  existing.push(entry);
  localStorage.setItem(LS_KEY, JSON.stringify(existing));
  return existing;
}

function downloadExcel(rows) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(rows, {
    header: ['name', 'email', 'phone', 'company', 'message', 'submittedAt'],
  });
  ws['!cols'] = [
    { wch: 22 }, { wch: 28 }, { wch: 18 },
    { wch: 24 }, { wch: 36 }, { wch: 24 },
  ];
  XLSX.utils.book_append_sheet(wb, ws, 'Demo Requests');
  XLSX.writeFile(wb, 'demo-submissions.xlsx');
}

export default function DemoModal({ onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const entry = {
      ...form,
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    // Always save locally first as a backup
    const allRows = saveToLocalStorage(entry);

    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        // Backend saved to Excel on server
        setStatus('success');
        setForm(EMPTY);
      } else {
        throw new Error('Backend error');
      }
    } catch {
      // Backend unavailable — download Excel directly in browser
      downloadExcel(allRows);
      setStatus('success');
      setForm(EMPTY);
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

        <form className="apply-form" onSubmit={handleSubmit} noValidate>
          <div className="demo-form-row">
            <div className="demo-field">
              <label htmlFor="demo-name">Full Name <span className="demo-req">*</span></label>
              <input
                id="demo-name" name="name" type="text"
                placeholder="Your full name" required
                value={form.name} onChange={handleChange}
              />
            </div>
            <div className="demo-field">
              <label htmlFor="demo-email">Email Address <span className="demo-req">*</span></label>
              <input
                id="demo-email" name="email" type="email"
                placeholder="you@company.com" required
                value={form.email} onChange={handleChange}
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
              />
            </div>
            <div className="demo-field">
              <label htmlFor="demo-company">Company Name <span className="demo-req">*</span></label>
              <input
                id="demo-company" name="company" type="text"
                placeholder="Your organisation" required
                value={form.company} onChange={handleChange}
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
            <div className="demo-feedback demo-success">
              Thank you! Our team will reach out within 24 hours.
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
