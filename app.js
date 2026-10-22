/**
 * FGV Palm Industries Sdn. Bhd.
 * Treasury Month-End Balance Dashboard - Hybrid Client Application
 * Compatible with both GitHub Pages (Direct Turso HTTP API) and Netlify (Serverless Functions)
 */

// Master 71 Projects Dataset
const DEFAULT_PROJECTS = [
  { bil: 1, projek: "Zon 1 - Pej. Zon Temerloh", hse: "M9009", acc: "556141013772", gl: "18900902", ba: "4109", balance: 12757.45 },
  { bil: 2, projek: "KS Bukit Sagu", hse: "M9079", acc: "556093248416", gl: "18907902", ba: "4046", balance: 8302.03 },
  { bil: 3, projek: "KS Chalok", hse: "M9067", acc: "563019251531", gl: "18906702", ba: "4061", balance: 12124.81 },
  { bil: 4, projek: "KS Cini 2", hse: "M9071", acc: "556011073917", gl: "18907102", ba: "4037", balance: 32330.89 },
  { bil: 5, projek: "KS Cini 3", hse: "M9078", acc: "556011073984", gl: "18907802", ba: "4015", balance: 6573.07 },
  { bil: 6, projek: "KS Jerangau Barat", hse: "M9064", acc: "563037058801", gl: "18906402", ba: "4020", balance: 16570.57 },
  { bil: 7, projek: "KS Kerteh", hse: "M9056", acc: "563082114667", gl: "18905602", ba: "4027", balance: 10448.58 },
  { bil: 8, projek: "KS Lepar Hilir", hse: "M9065", acc: "556093248269", gl: "18906502", ba: "4045", balance: 10197.08 },
  { bil: 9, projek: "KS Neram", hse: "M9082", acc: "556011074146", gl: "18908202", ba: "4014", balance: 8197.75 },
  { bil: 10, projek: "KS Pancing", hse: "M9069", acc: "556093248282", gl: "18906902", ba: "4053", balance: 10984.27 },
  { bil: 11, projek: "KS Bukit Kepayang", hse: "M9017", acc: "556075116416", gl: "18901702", ba: "4009", balance: 14378.98 },
  { bil: 12, projek: "KS Jengka 21", hse: "M9008", acc: "556057509745", gl: "18900802", ba: "4078", balance: 13813.79 },
  { bil: 13, projek: "KS Jengka 3", hse: "M9006", acc: "556141013729", gl: "18900602", ba: "4051", balance: 8674.87 },
  { bil: 14, projek: "KS Jengka 8", hse: "M9007", acc: "556141013690", gl: "18900702", ba: "4040", balance: 8950.09 },
  { bil: 15, projek: "KS Kota Gelanggi", hse: "M9018", acc: "556141013766", gl: "18901802", ba: "4012", balance: 8553.41 },
  { bil: 16, projek: "KS Lepar Utara 6", hse: "M9010", acc: "556141013683", gl: "18901002", ba: "4052", balance: 8206.80 },
  { bil: 17, projek: "KS Padang Piol", hse: "M9025", acc: "556208113584", gl: "18902502", ba: "4007", balance: 16337.37 },
  { bil: 18, projek: "KS Seroja", hse: "M9014", acc: "556141013759", gl: "18901402", ba: "4029", balance: 7745.35 },
  { bil: 19, projek: "KS Tementi", hse: "M9061", acc: "556075116558", gl: "18906102", ba: "4022", balance: 6593.19 },
  { bil: 20, projek: "KS Triang", hse: "M9029", acc: "556075116541", gl: "18902902", ba: "4055", balance: 6837.30 },
  { bil: 21, projek: "KS Aring A", hse: "M9032", acc: "553047545989", gl: "18903202", ba: "4044", balance: 15714.24 },
  { bil: 22, projek: "KS Besout", hse: "M9070", acc: "558190305756", gl: "18907002", ba: "4030", balance: 6837.64 },
  { bil: 23, projek: "KS Ciku", hse: "M9035", acc: "553047545959", gl: "18903502", ba: "4042", balance: 7515.27 },
  { bil: 24, projek: "KS Kechau B", hse: "M9011", acc: "556114508991", gl: "18901102", ba: "4075", balance: 21621.60 },
  { bil: 25, projek: "KS Kemahang", hse: "M9019", acc: "553056409503", gl: "18901902", ba: "4018", balance: 5794.17 },
  { bil: 26, projek: "KS Krau", hse: "M9072", acc: "556132056764", gl: "18907202", ba: "4062", balance: 8354.20 },
  { bil: 27, projek: "KS Mempaga", hse: "M9024", acc: "556084055793", gl: "18902402", ba: "4025", balance: 6579.62 },
  { bil: 28, projek: "KS Sg Tengi", hse: "M9075", acc: "558088433021", gl: "18907502", ba: "4049", balance: 11190.24 },
  { bil: 29, projek: "KS Tersang", hse: "M9066", acc: "556114509147", gl: "18906602", ba: "4032", balance: 11339.56 },
  { bil: 30, projek: "KS Trolak", hse: "M9081", acc: "558109305838", gl: "18908102", ba: "4005", balance: 9676.35 },
  { bil: 31, projek: "Zon 2 - Pej. Zon Kluang", hse: "M9005", acc: "551388409129", gl: "18900502", ba: "4110", balance: 11670.69 },
  { bil: 32, projek: "KS Bukit Mendi", hse: "M9022", acc: "556075116430", gl: "18902202", ba: "4003", balance: 6162.87 },
  { bil: 33, projek: "KS Kemasul", hse: "M9077", acc: "556075116661", gl: "18907702", ba: "4026", balance: 12860.07 },
  { bil: 34, projek: "KS Keratong 2", hse: "M9060", acc: "556123507912", gl: "18906002", ba: "4017", balance: 6781.39 },
  { bil: 35, projek: "KS Keratong 3", hse: "M9023", acc: "556123507765", gl: "18902302", ba: "4028", balance: 27609.64 },
  { bil: 36, projek: "KS Keratong 9", hse: "M9068", acc: "556123507929", gl: "18906802", ba: "4033", balance: 8476.59 },
  { bil: 37, projek: "KS Pasoh", hse: "M9084", acc: "555032521852", gl: "18908402", ba: "4013", balance: 16319.16 },
  { bil: 38, projek: "KS Selendang", hse: "M9026", acc: "556039056910", gl: "18902602", ba: "4034", balance: 7981.73 },
  { bil: 39, projek: "KS Serting", hse: "M9038", acc: "555032521681", gl: "18903802", ba: "4047", balance: 21605.21 },
  { bil: 40, projek: "KS Serting Hilir", hse: "M9021", acc: "555032521674", gl: "18902102", ba: "4057", balance: 11461.87 },
  { bil: 41, projek: "KS Belitong", hse: "M9045", acc: "551164609261", gl: "18904502", ba: "4056", balance: 7274.71 },
  { bil: 42, projek: "KS Kahang", hse: "M9059", acc: "551061311343", gl: "18905902", ba: "4024", balance: 23525.29 },
  { bil: 43, projek: "KS Kulai", hse: "M9030", acc: "551100311037", gl: "18903002", ba: "4004", balance: 16337.37 },
  { bil: 44, projek: "KS Maokil", hse: "M9047", acc: "551119120069", gl: "18904702", ba: "4041", balance: 8509.68 },
  { bil: 45, projek: "KS Nitar", hse: "M9040", acc: "551061311337", gl: "18904002", ba: "4043", balance: 8509.68 },
  { bil: 46, projek: "KS Palong Timur", hse: "M9052", acc: "555078218692", gl: "18905202", ba: "4066", balance: 6337.37 },
  { bil: 47, projek: "KS Penggeli", hse: "M9043", acc: "551164609224", gl: "18904302", ba: "4019", balance: 6441.55 },
  { bil: 48, projek: "KS Selancar 2A", hse: "M9039", acc: "551052386067", gl: "18903902", ba: "4036", balance: 15520.17 },
  { bil: 49, projek: "KS Selancar 2B", hse: "M9041", acc: "551052386080", gl: "18904102", ba: "4050", balance: 9470.93 },
  { bil: 50, projek: "KS Air Tawar", hse: "M9051", acc: "551070416383", gl: "18905102", ba: "4006", balance: 34399.55 },
  { bil: 51, projek: "KS Adela", hse: "M9036", acc: "551070416500", gl: "18903602", ba: "4039", balance: 9945.45 },
  { bil: 52, projek: "KS Lok Heng", hse: "M9048", acc: "551070416496", gl: "18904802", ba: "4031", balance: 7240.72 },
  { bil: 53, projek: "KS Sampadi", hse: "M9083", acc: "561163013127", gl: "18908302", ba: "4065", balance: 55927.07 },
  { bil: 54, projek: "KS Semenchu", hse: "M9042", acc: "551070416472", gl: "18904202", ba: "4016", balance: 7968.94 },
  { bil: 55, projek: "KS Tenggaroh", hse: "M9046", acc: "551070416489", gl: "18904602", ba: "4038", balance: 6548.67 },
  { bil: 56, projek: "KS Tenggaroh Timur", hse: "M9044", acc: "551070416360", gl: "18904402", ba: "4067", balance: 54319.17 },
  { bil: 57, projek: "KS Waha", hse: "M9016", acc: "551070416353", gl: "18901602", ba: "4058", balance: 9298.16 },
  { bil: 58, projek: "Zon 3 - Pej. Wilayah Sahabat", hse: "M9062", acc: "560157051120", gl: "18906202", ba: "4934", balance: 6206.34 },
  { bil: 59, projek: "KS Baiduri Ayu", hse: "M9054", acc: "560157051084", gl: "18905402", ba: "4054", balance: 6196.91 },
  { bil: 60, projek: "KS Embara Budi", hse: "M9033", acc: "560157051031", gl: "18903302", ba: "4060", balance: 9674.94 },
  { bil: 61, projek: "KS Hamparan Badai", hse: "M9027", acc: "560157051106", gl: "18902702", ba: "4069", balance: 10509.37 },
  { bil: 62, projek: "KS Kalabakan", hse: "M9085", acc: "560036068686", gl: "18908502", ba: "4059", balance: 9242.12 },
  { bil: 63, projek: "KS Kembara Sakti", hse: "M9057", acc: "560157051113", gl: "18905702", ba: "4070", balance: 7917.19 },
  { bil: 64, projek: "KS Lanchang Kemudi", hse: "M9050", acc: "560157051061", gl: "18905002", ba: "4074", balance: 9843.12 },
  { bil: 65, projek: "KS Mercu Puspita", hse: "M9063", acc: "560157051077", gl: "18906302", ba: "4068", balance: 7722.76 },
  { bil: 66, projek: "KS Umas", hse: "M9086", acc: "560036068693", gl: "18908602", ba: "4048", balance: 7716.06 },
  { bil: 67, projek: "ALAF", hse: "M9074", acc: "556011073248", gl: "18907402", ba: "4133", balance: 18552.77 },
  { bil: 68, projek: "Loji Janakuasa", hse: "M9055", acc: "560157051054", gl: "18905502", ba: "4169", balance: 11169.10 },
  { bil: 69, projek: "Bengkel Sabah", hse: "M9053", acc: "560157051024", gl: "18905302", ba: "4153", balance: 6241.56 },
  { bil: 70, projek: "Bengkel Sening", hse: "M9073", acc: "551173502898", gl: "18907302", ba: "4156", balance: 36266.57 },
  { bil: 71, projek: "Bengkel Ulu Jempol", hse: "M9049", acc: "556141013789", gl: "18904902", ba: "4151", balance: 285114.53 }
];

// Turso Database Credentials for Direct GitHub Pages Pipeline
const TURSO_CONFIG = {
  url: "https://fpi-treasury-makankari.aws-ap-northeast-1.turso.io/v2/pipeline",
  token: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3OTI2NTE4NzksImlkIjoiMDFhMTYyNjAtOTQwMS03MDhhLTkyYzEtYTkzODgyMmFmNDcyIiwia2lkIjoiX2lkMTNxcl9STjUwTWRzMUJkVkNvLVM1OWRQWm9zSmtSX1l6YVpUNmFiRSIsInJpZCI6ImYwZGQ3MGIzLTYxOGUtNDE1Ni1iNzk1LTBmZmUyNTU1MTgxYiJ9.d8_7HQyDqaibmVDJEoRwEZL33e9YetfRD4u5bIVSO5ZBUveCP7tyDWp6WX_1sJDnA0kfMOQjR1Sggz3PHZXVCw"
};

let projectsData = JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
let hasUnsavedChanges = false;
let isDirectTursoMode = false;

// Format Currency
function fmt(val) {
  const num = Number(val) || 0;
  return num.toLocaleString('en-MY', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Auto Reversal formula
function calcReversal(b) {
  if (b <= 10000) return 0;
  return Math.ceil((b - 10000) / 1000) * 1000;
}

// Toast Notification
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  toastMsg.textContent = message;
  toast.className = `toast ${type} show`;
  setTimeout(() => {
    toast.className = 'toast';
  }, 4000);
}

// ================= AUTHENTICATION =================

async function handleLogin(e) {
  if (e) e.preventDefault();
  const passwordInput = document.getElementById('password-input');
  const lockError = document.getElementById('lock-error');
  const unlockBtn = document.getElementById('unlock-btn');
  const password = passwordInput.value.trim();

  lockError.style.display = 'none';
  passwordInput.classList.remove('error');
  unlockBtn.disabled = true;
  unlockBtn.textContent = 'Verifying...';

  // Check if running on GitHub Pages or local static file
  const isStaticMode = window.location.hostname.includes('github.io') || window.location.protocol === 'file:';

  if (isStaticMode) {
    // Client-side verification for GitHub Pages
    if (password === '#Treasury26') {
      sessionStorage.setItem('fpi_treasury_token', 'gh-pages-session');
      unlockDashboard();
    } else {
      passwordInput.classList.add('error');
      lockError.textContent = "Incorrect password. Please try again.";
      lockError.style.display = 'block';
      unlockBtn.disabled = false;
      unlockBtn.textContent = 'Unlock Dashboard';
    }
    return;
  }

  // Otherwise, use Netlify /api/auth endpoint
  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    const data = await res.json();

    if (res.ok && data.success) {
      sessionStorage.setItem('fpi_treasury_token', data.token);
      unlockDashboard();
    } else {
      passwordInput.classList.add('error');
      lockError.textContent = data.error || 'Incorrect password.';
      lockError.style.display = 'block';
    }
  } catch (err) {
    if (password === '#Treasury26') {
      sessionStorage.setItem('fpi_treasury_token', 'offline-session');
      unlockDashboard();
    } else {
      passwordInput.classList.add('error');
      lockError.textContent = 'Connection error. Please try again.';
      lockError.style.display = 'block';
    }
  } finally {
    unlockBtn.disabled = false;
    unlockBtn.textContent = 'Unlock Dashboard';
  }
}

function unlockDashboard() {
  document.getElementById('lock-screen').style.display = 'none';
  document.getElementById('dashboard-app').style.display = 'block';
  fetchBalances();
}

function handleLogout() {
  sessionStorage.removeItem('fpi_treasury_token');
  document.getElementById('dashboard-app').style.display = 'none';
  document.getElementById('lock-screen').style.display = 'flex';
  document.getElementById('password-input').value = '';
}

function checkExistingAuth() {
  const token = sessionStorage.getItem('fpi_treasury_token');
  if (token) {
    unlockDashboard();
  }
}

// ================= DATA FETCHING (HYBRID ENGINE) =================

async function fetchBalances() {
  const period = document.getElementById('period-picker').value || '2026-06-30';
  updatePeriodDisplay(period);

  const tursoBadge = document.getElementById('turso-status');
  const tursoDot = document.getElementById('turso-dot');
  const tursoText = document.getElementById('turso-text');

  // Try 1: Netlify Serverless Function
  try {
    const token = sessionStorage.getItem('fpi_treasury_token');
    const res = await fetch(`/api/balances?period=${period}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (res.ok) {
      const result = await res.json();
      if (result.success && Array.isArray(result.data)) {
        projectsData = result.data;
        tursoDot.className = 'status-dot';
        tursoText.textContent = result.isTursoConnected ? 'Netlify (Turso Connected)' : 'Netlify (Local)';
        tursoBadge.title = 'Serving via Netlify Serverless Functions';
        isDirectTursoMode = false;
        renderTable();
        return;
      }
    }
  } catch (e) {
    // Netlify API not found, proceeding to GitHub Pages Direct Turso Mode
  }

  // Try 2: Direct Turso HTTP Pipeline (GitHub Pages Mode)
  try {
    isDirectTursoMode = true;
    const query = `
      SELECT p.bil, p.projek, p.hse, p.acc, p.gl, p.ba, COALESCE(b.balance, p.default_balance) AS balance
      FROM projects p
      LEFT JOIN balances b ON p.ba = b.ba AND b.period = ?
      ORDER BY p.bil ASC;
    `;

    const res = await fetch(TURSO_CONFIG.url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TURSO_CONFIG.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        requests: [
          {
            type: 'execute',
            stmt: {
              sql: query,
              args: [{ type: 'text', value: period }]
            }
          },
          { type: 'close' }
        ]
      })
    });

    if (res.ok) {
      const json = await res.json();
      const rows = json.results?.[0]?.response?.result?.rows;
      if (Array.isArray(rows) && rows.length > 0) {
        projectsData = rows.map(r => ({
          bil: Number(r[0].value),
          projek: String(r[1].value),
          hse: String(r[2].value || ''),
          acc: String(r[3].value || ''),
          gl: String(r[4].value || ''),
          ba: String(r[5].value),
          balance: Number(r[6].value)
        }));
        tursoDot.className = 'status-dot test';
        tursoText.textContent = 'GitHub Pages (Turso Live)';
        tursoBadge.title = 'Direct cloud sync active with Turso database from GitHub Pages';
        renderTable();
        return;
      }
    }
  } catch (err) {
    console.warn('Direct Turso connection notice:', err);
  }

  // Fallback 3: LocalStorage + Default 71 projects
  const cached = localStorage.getItem(`fpi_balances_${period}`);
  if (cached) {
    try {
      projectsData = JSON.parse(cached);
    } catch (_) {
      projectsData = JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
    }
  } else {
    projectsData = JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
  }

  tursoDot.className = 'status-dot offline';
  tursoText.textContent = 'Local Cache Mode';
  tursoBadge.title = 'Saved in browser memory';
  renderTable();
}

// ================= SAVE TO TURSO (HYBRID ENGINE) =================

async function saveToTurso() {
  const period = document.getElementById('period-picker').value || '2026-06-30';
  const saveBtn = document.getElementById('save-btn');
  saveBtn.disabled = true;
  saveBtn.textContent = 'Saving to Turso...';

  const items = projectsData.map(p => ({
    ba: p.ba,
    balance: Number(p.balance) || 0
  }));

  // Cache locally
  localStorage.setItem(`fpi_balances_${period}`, JSON.stringify(projectsData));

  // Try 1: Netlify Serverless API
  if (!isDirectTursoMode) {
    try {
      const token = sessionStorage.getItem('fpi_treasury_token');
      const res = await fetch('/api/balances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ period, items })
      });

      const result = await res.json();
      if (res.ok && result.success) {
        onSaveSuccess(saveBtn, 'Netlify');
        return;
      }
    } catch (e) {
      // Fallback to direct Turso pipeline
    }
  }

  // Try 2: Direct Turso HTTP Pipeline (Works directly on GitHub Pages!)
  try {
    const requests = items.map(item => ({
      type: 'execute',
      stmt: {
        sql: `INSERT INTO balances (period, ba, balance, updated_at) 
              VALUES (?, ?, ?, datetime('now'))
              ON CONFLICT(period, ba) DO UPDATE SET
                balance = excluded.balance,
                updated_at = excluded.updated_at;`,
        args: [
          { type: 'text', value: period },
          { type: 'text', value: String(item.ba) },
          { type: 'float', value: Number(item.balance) || 0 }
        ]
      }
    }));
    requests.push({ type: 'close' });

    const res = await fetch(TURSO_CONFIG.url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TURSO_CONFIG.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ requests })
    });

    if (res.ok) {
      onSaveSuccess(saveBtn, 'Turso Cloud');
      return;
    }
  } catch (err) {
    console.error('Error saving to Turso:', err);
  }

  // Fallback saved locally
  saveBtn.disabled = false;
  saveBtn.textContent = '💾 Save to Turso';
  showToast('Saved locally in browser memory.', 'success');
}

function onSaveSuccess(saveBtn, target) {
  hasUnsavedChanges = false;
  saveBtn.textContent = 'Saved to Turso!';
  saveBtn.style.backgroundColor = '#059669';
  showToast(`All 71 project balances successfully saved to ${target}!`);
  setTimeout(() => {
    saveBtn.disabled = false;
    saveBtn.textContent = '💾 Save to Turso';
  }, 2500);
}

function markUnsaved() {
  hasUnsavedChanges = true;
  const saveBtn = document.getElementById('save-btn');
  saveBtn.textContent = '💾 Save to Turso (Unsaved)';
  saveBtn.style.backgroundColor = '#e11d48';
}

function updatePeriodDisplay(dateStr) {
  const parts = dateStr.split('-');
  const formatted = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : dateStr;
  document.getElementById('period-display-text').textContent = `FGV Palm Industries Sdn. Bhd. — Period: ${formatted}`;
  document.getElementById('print-period-text').textContent = `FGV Palm Industries Sdn. Bhd. — Period: ${formatted}`;
}

function changePeriod() {
  const period = document.getElementById('period-picker').value;
  updatePeriodDisplay(period);
  fetchBalances();
}

// ================= TABLE RENDERING & LOGIC =================

function renderTable() {
  const tbody = document.getElementById('table-body');
  const search = (document.getElementById('search-input').value || '').trim().toLowerCase();

  // Sort by Business Area (BA) ascending
  const sorted = [...projectsData].sort((a, b) => {
    const baA = parseInt(a.ba) || Infinity;
    const baB = parseInt(b.ba) || Infinity;
    return baA - baB;
  });

  tbody.innerHTML = '';
  let totalBal = 0;
  let totalRev = 0;
  let totalFin = 0;
  let warnCount = 0;

  sorted.forEach((row, idx) => {
    if (search) {
      const match = 
        row.projek.toLowerCase().includes(search) ||
        row.ba.toLowerCase().includes(search) ||
        row.acc.toLowerCase().includes(search) ||
        row.hse.toLowerCase().includes(search);
      if (!match) return;
    }

    const balance = Number(row.balance) || 0;
    const reversal = calcReversal(balance);
    const finalBal = balance - reversal;

    totalBal += balance;
    totalRev += reversal;
    totalFin += finalBal;

    const isWarning = balance > 10000;
    if (isWarning) warnCount++;

    const tr = document.createElement('tr');
    if (isWarning) tr.className = 'warning-row';

    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td class="font-medium">${row.projek}</td>
      <td class="font-mono">${row.hse}</td>
      <td class="font-mono">${row.acc}</td>
      <td class="font-mono">${row.gl}</td>
      <td class="font-mono">${row.ba}</td>
      <td class="text-right">
        <input 
          type="text" 
          class="balance-input" 
          value="${fmt(balance)}" 
          data-ba="${row.ba}" 
          onfocus="this.select()"
          onchange="onBalanceChange(this)"
        />
      </td>
      <td class="text-right reversal-val">${fmt(reversal)}</td>
      <td class="text-right final-val">${fmt(finalBal)}</td>
    `;

    tbody.appendChild(tr);
  });

  document.getElementById('kpi-total-balance').textContent = 'RM ' + fmt(totalBal);
  document.getElementById('kpi-total-reversal').textContent = 'RM ' + fmt(totalRev);
  document.getElementById('kpi-total-final').textContent = 'RM ' + fmt(totalFin);
  document.getElementById('kpi-threshold-count').textContent = `${warnCount} / ${projectsData.length}`;

  document.getElementById('footer-total-balance').textContent = 'RM ' + fmt(totalBal);
  document.getElementById('footer-total-reversal').textContent = 'RM ' + fmt(totalRev);
  document.getElementById('footer-total-final').textContent = 'RM ' + fmt(totalFin);
}

function onBalanceChange(input) {
  const ba = input.dataset.ba;
  const rawVal = input.value.replace(/,/g, '').trim();
  const numVal = parseFloat(rawVal) || 0;

  const target = projectsData.find(p => p.ba === ba);
  if (target) {
    target.balance = numVal;
    markUnsaved();
    renderTable();
  }
}

function filterTable() {
  renderTable();
}

// ================= MODALS & ACTIONS =================

function openPasteModal() {
  document.getElementById('paste-modal').classList.remove('hidden');
  document.getElementById('paste-area').focus();
}

function closePasteModal() {
  document.getElementById('paste-modal').classList.add('hidden');
  document.getElementById('paste-area').value = '';
}

function openResetModal() {
  document.getElementById('reset-modal').classList.remove('hidden');
}

function closeResetModal() {
  document.getElementById('reset-modal').classList.add('hidden');
}

function applyReset() {
  projectsData.forEach(p => {
    p.balance = 0;
  });
  markUnsaved();
  closeResetModal();
  renderTable();
  showToast('All project balances set to 0. Click "Save to Turso" to commit.');
}

function applyPaste() {
  const raw = document.getElementById('paste-area').value;
  const lines = raw.split(/[\n\r]+/).map(s => s.trim()).filter(Boolean);

  if (lines.length === 0) {
    closePasteModal();
    return;
  }

  let parsedWithKeys = false;
  const parsedMap = new Map();

  lines.forEach(line => {
    const parts = line.split(/[\t]+| {2,}/).map(s => s.trim()).filter(Boolean);
    if (parts.length >= 2) {
      const baMatch = parts.find(p => /^\d{4}$/.test(p));
      const balMatch = parts.find(p => p !== baMatch && /^-?[\d,]+(?:\.\d+)?$/.test(p.replace(/[^0-9.\-]/g, '')));
      if (baMatch && balMatch) {
        const val = parseFloat(balMatch.replace(/[^0-9.\-]/g, ''));
        if (!isNaN(val)) {
          parsedMap.set(baMatch, val);
          parsedWithKeys = true;
        }
      }
    }
  });

  if (parsedWithKeys) {
    let matchedCount = 0;
    projectsData.forEach(p => {
      if (parsedMap.has(p.ba)) {
        p.balance = parsedMap.get(p.ba);
        matchedCount++;
      }
    });
    showToast(`Matched and updated ${matchedCount} projects by BA code.`);
  } else {
    const sorted = [...projectsData].sort((a, b) => (parseInt(a.ba) || 0) - (parseInt(b.ba) || 0));
    let appliedCount = 0;
    lines.forEach((line, i) => {
      const val = parseFloat(line.replace(/[^0-9.\-]/g, ''));
      if (!isNaN(val) && i < sorted.length) {
        sorted[i].balance = val;
        appliedCount++;
      }
    });
    showToast(`Updated ${appliedCount} project balances sequentially.`);
  }

  markUnsaved();
  closePasteModal();
  renderTable();
}

function triggerPrint() {
  window.print();
}

window.addEventListener('DOMContentLoaded', () => {
  checkExistingAuth();
});
