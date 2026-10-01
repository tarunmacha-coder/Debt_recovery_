/**
 * Netlify Forms helpers shared by the Book a Demo and Job Application forms.
 *
 * Netlify detects forms at build time from the static skeleton in
 * public/__forms.html. Submissions are posted to that file's path (not "/",
 * which the SPA redirect rewrites) as urlencoded data with a `form-name` field.
 * Submissions are stored in the Netlify dashboard — there is no public
 * endpoint that serves them back.
 */

export const FORMS_ENDPOINT = '/__forms.html';

/* Older versions of these forms kept a copy of every submission in the
   visitor's browser. Clear those copies — the data never belonged there. */
export function clearLegacyLocalCopies() {
  try {
    localStorage.removeItem('demo_submissions');
    localStorage.removeItem('job_applications');
  } catch { /* storage unavailable — nothing to clear */ }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns { field: message } for every invalid field (empty object when valid). */
export function validate(values, requiredFields) {
  const errors = {};
  requiredFields.forEach((f) => {
    if (!String(values[f] || '').trim()) errors[f] = 'required';
  });
  if (!errors.email && values.email && !EMAIL_RE.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!errors.phone && values.phone) {
    const digits = values.phone.replace(/\D/g, '');
    if (!/^[+\d\s().-]+$/.test(values.phone.trim()) || digits.length < 7 || digits.length > 15) {
      errors.phone = 'Please enter a valid phone number.';
    }
  }
  return errors;
}

/** One message for the feedback box: missing fields first, then the first format problem. */
export function errorSummary(errors) {
  const messages = Object.values(errors).filter(Boolean);
  if (messages.includes('required')) return 'Please fill in all required fields.';
  return messages[0] || '';
}

/** Posts the fields to Netlify Forms. Resolves on a 2xx response, rejects otherwise. */
export async function submitNetlifyForm(formName, fields) {
  const body = new URLSearchParams({ 'form-name': formName, ...fields }).toString();
  const res = await fetch(FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!res.ok) throw new Error(`Form submission failed (${res.status})`);
}
