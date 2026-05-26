const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'submissions.xlsx');
const HEADERS        = ['Name', 'Email', 'Phone', 'Company', 'Message', 'Submitted At'];
const APPLY_HEADERS  = ['Name', 'Email', 'Phone', 'Position', 'Cover Letter', 'Applied At'];
const APPLY_FILE     = path.join(__dirname, 'applications.xlsx');

app.use(cors());
app.use(express.json());

function loadOrCreate(filePath, sheetName, headers) {
  if (fs.existsSync(filePath)) {
    return XLSX.readFile(filePath);
  }
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([headers]);
  ws['!cols'] = headers.map(() => ({ wch: 28 }));
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  return wb;
}

function appendRow(wb, sheetName, headers, rowData) {
  const ws = wb.Sheets[sheetName];
  const ref = ws['!ref'] || 'A1';
  const range = XLSX.utils.decode_range(ref);
  const nextRow = range.e.r + 1;

  rowData.forEach((val, col) => {
    ws[XLSX.utils.encode_cell({ r: nextRow, c: col })] = { v: val, t: 's' };
  });

  ws['!ref'] = XLSX.utils.encode_range({
    s: { r: 0, c: 0 },
    e: { r: nextRow, c: headers.length - 1 },
  });
}

const now = () =>
  new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

/* ── POST /api/demo — save a new demo booking ── */
app.post('/api/demo', (req, res) => {
  const { name, email, phone, company, message } = req.body || {};
  if (!name || !email || !phone || !company) {
    return res.status(400).json({ error: 'name, email, phone and company are required' });
  }
  try {
    const wb = loadOrCreate(DATA_FILE, 'Demo Requests', HEADERS);
    appendRow(wb, 'Demo Requests', HEADERS, [
      String(name).trim(),
      String(email).trim(),
      String(phone).trim(),
      String(company).trim(),
      String(message || '').trim(),
      now(),
    ]);
    XLSX.writeFile(wb, DATA_FILE);
    return res.json({ success: true });
  } catch (err) {
    console.error('Demo save failed:', err);
    return res.status(500).json({ error: 'Failed to save submission' });
  }
});

/* ── GET /api/admin/submissions — download demo bookings ── */
app.get('/api/admin/submissions', (req, res) => {
  if (!fs.existsSync(DATA_FILE)) {
    return res.status(404).json({ error: 'No demo submissions yet' });
  }
  res.download(DATA_FILE, 'demo-submissions.xlsx');
});

/* ── POST /api/apply — save a job application ── */
app.post('/api/apply', (req, res) => {
  const { name, email, phone, position, message } = req.body || {};
  if (!name || !email || !phone || !position) {
    return res.status(400).json({ error: 'name, email, phone and position are required' });
  }
  try {
    const wb = loadOrCreate(APPLY_FILE, 'Applications', APPLY_HEADERS);
    appendRow(wb, 'Applications', APPLY_HEADERS, [
      String(name).trim(),
      String(email).trim(),
      String(phone).trim(),
      String(position).trim(),
      String(message || '').trim(),
      now(),
    ]);
    XLSX.writeFile(wb, APPLY_FILE);
    return res.json({ success: true });
  } catch (err) {
    console.error('Application save failed:', err);
    return res.status(500).json({ error: 'Failed to save application' });
  }
});

/* ── GET /api/admin/applications — download job applications ── */
app.get('/api/admin/applications', (req, res) => {
  if (!fs.existsSync(APPLY_FILE)) {
    return res.status(404).json({ error: 'No applications yet' });
  }
  res.download(APPLY_FILE, 'job-applications.xlsx');
});

app.listen(PORT, () => {
  console.log(`Backend running → http://localhost:${PORT}`);
  console.log(`Demo submissions → http://localhost:${PORT}/api/admin/submissions`);
  console.log(`Job applications → http://localhost:${PORT}/api/admin/applications`);
});
