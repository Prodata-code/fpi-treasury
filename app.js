/**
 * FGV Palm Industries Sdn. Bhd.
 * Treasury Management Unified Portal (Month-End Balance + Daily Cashflow)
 * Powered by Turso SQLite (Direct HTTP Pipeline & Netlify Serverless)
 */

// ================= MASTER CONFIGURATION & DATASETS =================

const TURSO_CONFIG = {
  url: "https://fpi-treasury-makankari.aws-ap-northeast-1.turso.io/v2/pipeline",
  token: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3OTI2NTE4NzksImlkIjoiMDFhMTYyNjAtOTQwMS03MDhhLTkyYzEtYTkzODgyMmFmNDcyIiwia2lkIjoiX2lkMTNxcl9STjUwTWRzMUJkVkNvLVM1OWRQWm9zSmtSX1l6YVpUNmFiRSIsInJpZCI6ImYwZGQ3MGIzLTYxOGUtNDE1Ni1iNzk1LTBmZmUyNTU1MTgxYiJ9.d8_7HQyDqaibmVDJEoRwEZL33e9YetfRD4u5bIVSO5ZBUveCP7tyDWp6WX_1sJDnA0kfMOQjR1Sggz3PHZXVCw"
};

// 71 FGV Palm Industries Projects
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

// Daily Cashflow Categories
const lessItems2859 = ["Transfer to 564212106476","SSC (VENDOR)","FGVC","GAJI","KWSP","SOCSO","SOCSO EIS","LHDN","Bayaran Praktikal","BONUS","KWSP BONUS","LHDN BONUS","GAJI PBH","KWSP PBH","SOCSO PBH","SOCSO EIS PBH","LHDN PBH","BONUS PBH","LOAN MBB & OTHERS","TABUNG HAJI","ASB","ZAKAT","HR","STAFF","CAPEX","Interco","Prodata","MPOB","CJN SABAH","ETIQA/Insurans","CA & ADV Bonus","KWSP CA & ADV BON","LHDN CA & ADV BON","Bayaran SD","Bayaran SD PBH","Pembayaran Praktikal","CAPEX","Yayasan","SST","Petronas","Cess Sabah","WIP","Cukai Tanah","PM Care","Interco FGV Transport","Tax 5th YA2026","FPX","HR-Loan Rumah"];
const lessItems6476 = ["Transfer to 564098512859","SSC (VENDOR)","GAJI","KWSP","SOCSO","SOCSO EIS","LHDN","Bayaran Praktikal","BONUS","KWSP BONUS","LHDN BONUS","LOAN MBB & OTHERS","TABUNG HAJI","ASB","ZAKAT","HR","STAFF","CAPEX","Interco","FPX"];
const addItems2859 = ["Receive from 564212106476", "Receive from FGVC (IFP fund)", "PUMP BACK"];
const addItems6476 = ["Receive from 564098512859", "Receive from FGVC (IFP fund)", "PUMP BACK"];
const outgoingDefaultCategories = ["GAJI","KWSP","SOCSO","SOCSO EIS","LHDN","Bayaran Praktikal","BONUS","GAJI PBH","KWSP PBH","SOCSO PBH","SOCSO EIS PBH","LHDN PBH","BONUS PBH","LHDN BONUS","KWSP BONUS","KWSP BONUS PBH","LOAN MBB & OTHERS","TABUNG HAJI","ASB","ZAKAT","KWSP CA & ADV BON","LHDN CA & ADV BON","Yayasan","PETRONAS","Tax Sarawak","Cess Sabah","MPOB","HR"];

// State Variables
let currentPortalModule = 'month-end';
let currentDailyTab = 1;
let projectsData = JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
let hasUnsavedChanges = false;
let isRestoringDaily = false;

// ================= UTILITIES =================

function fmt(val) {
  const num = Number(val) || 0;
  return num.toLocaleString('en-MY', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function parseVal(v) {
  return parseFloat(String(v).replace(/,/g, '')) || 0;
}

function calcReversal(b) {
  if (b <= 10000) return 0;
  return Math.ceil((b - 10000) / 1000) * 1000;
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  toastMsg.textContent = message;
  toast.className = `toast ${type} show`;
  setTimeout(() => { toast.className = 'toast'; }, 4000);
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

  const resetBtn = () => {
    unlockBtn.disabled = false;
    unlockBtn.textContent = 'Unlock Portal';
  };

  const isStaticMode = window.location.hostname.includes('github.io') || window.location.protocol === 'file:';

  if (isStaticMode) {
    if (password === '#Treasury26') {
      sessionStorage.setItem('fpi_treasury_token', 'gh-pages-session');
      resetBtn();
      unlockPortal();
    } else {
      passwordInput.classList.add('error');
      lockError.textContent = "Incorrect password. Please try again.";
      lockError.style.display = 'block';
      resetBtn();
    }
    return;
  }

  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      sessionStorage.setItem('fpi_treasury_token', data.token);
      unlockPortal();
    } else {
      passwordInput.classList.add('error');
      lockError.textContent = data.error || 'Incorrect password.';
      lockError.style.display = 'block';
    }
  } catch (err) {
    if (password === '#Treasury26') {
      sessionStorage.setItem('fpi_treasury_token', 'offline-session');
      unlockPortal();
    } else {
      passwordInput.classList.add('error');
      lockError.textContent = 'Connection error. Please try again.';
      lockError.style.display = 'block';
    }
  } finally {
    resetBtn();
  }
}

function unlockPortal() {
  document.getElementById('lock-screen').style.display = 'none';
  document.getElementById('dashboard-app').style.display = 'block';
  
  // Set default dates
  const todayStr = new Date().toISOString().split('T')[0];
  const dailyDateInput = document.getElementById('daily-report-date');
  if (dailyDateInput && !dailyDateInput.value) {
    dailyDateInput.value = todayStr;
  }
  
  buildDailyTables();
  fetchBalances();
  fetchDailyCashflowFromTurso();
}

function handleLogout() {
  sessionStorage.removeItem('fpi_treasury_token');
  document.getElementById('dashboard-app').style.display = 'none';
  document.getElementById('lock-screen').style.display = 'flex';
  
  const passwordInput = document.getElementById('password-input');
  const unlockBtn = document.getElementById('unlock-btn');
  const lockError = document.getElementById('lock-error');

  if (passwordInput) {
    passwordInput.value = '';
    passwordInput.classList.remove('error');
    passwordInput.focus();
  }
  if (unlockBtn) {
    unlockBtn.disabled = false;
    unlockBtn.textContent = 'Unlock Portal';
  }
  if (lockError) {
    lockError.style.display = 'none';
  }
}

function checkExistingAuth() {
  const token = sessionStorage.getItem('fpi_treasury_token');
  if (token) {
    unlockPortal();
  }
}

// ================= PORTAL MODULE NAVIGATION =================

function switchPortalModule(mod) {
  currentPortalModule = mod;
  const isMonthEnd = mod === 'month-end';

  document.getElementById('module-month-end').style.display = isMonthEnd ? 'block' : 'none';
  document.getElementById('module-daily-cashflow').style.display = isMonthEnd ? 'none' : 'block';

  document.getElementById('nav-btn-monthend').className = `portal-nav-tab ${isMonthEnd ? 'active' : ''}`;
  document.getElementById('nav-btn-daily').className = `portal-nav-tab ${!isMonthEnd ? 'active' : ''}`;

  document.getElementById('portal-header-title').textContent = isMonthEnd 
    ? 'Project Month-End Balance Dashboard' 
    : 'Daily Cash Status & Treasury Operations';
}

// ================= MODULE 1: MONTH-END BALANCE LOGIC =================

async function fetchBalances() {
  const period = document.getElementById('period-picker').value || '2026-06-30';
  updatePeriodDisplay(period);

  const tursoBadge = document.getElementById('turso-status');
  const tursoDot = document.getElementById('turso-dot');
  const tursoText = document.getElementById('turso-text');

  // Try 1: Netlify serverless
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
        tursoText.textContent = 'Netlify (Database Live)';
        renderTable();
        return;
      }
    }
  } catch (_) {}

  // Try 2: Direct Turso pipeline (GitHub Pages Mode)
  try {
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
          { type: 'execute', stmt: { sql: query, args: [{ type: 'text', value: period }] } },
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
        tursoText.textContent = 'GitHub Pages (Database Live)';
        renderTable();
        return;
      }
    }
  } catch (err) {
    console.warn(err);
  }

  // Fallback
  projectsData = JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
  tursoDot.className = 'status-dot offline';
  tursoText.textContent = 'Local Cache Mode';
  renderTable();
}

async function saveToTurso() {
  const period = document.getElementById('period-picker').value || '2026-06-30';
  const saveBtn = document.getElementById('save-btn');
  saveBtn.disabled = true;
  saveBtn.textContent = 'Saving to Database...';

  const items = projectsData.map(p => ({
    ba: p.ba,
    balance: Number(p.balance) || 0
  }));

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
      hasUnsavedChanges = false;
      saveBtn.textContent = 'Saved to Database!';
      saveBtn.style.backgroundColor = '#059669';
      showToast('All 71 project balances successfully saved to database!');
      setTimeout(() => {
        saveBtn.disabled = false;
        saveBtn.textContent = '💾 Save to Database';
      }, 2500);
      return;
    }
  } catch (err) {
    showToast('Failed to save to database: ' + err.message, 'error');
  }

  saveBtn.disabled = false;
  saveBtn.textContent = '💾 Save to Database';
}

function updatePeriodDisplay(dateStr) {
  document.getElementById('period-display-text').textContent = 'FGV Palm Industries Sdn. Bhd.';
  document.getElementById('print-period-text').textContent = 'FGV Palm Industries Sdn. Bhd.';
}

function changePeriod() {
  const period = document.getElementById('period-picker').value;
  updatePeriodDisplay(period);
  fetchBalances();
}

function renderTable() {
  const tbody = document.getElementById('table-body');
  const search = (document.getElementById('search-input').value || '').trim().toLowerCase();

  const sorted = [...projectsData].sort((a, b) => (parseInt(a.ba) || Infinity) - (parseInt(b.ba) || Infinity));

  tbody.innerHTML = '';
  let totalBal = 0, totalRev = 0, totalFin = 0, warnCount = 0;

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
    renderTable();
    const saveBtn = document.getElementById('save-btn');
    saveBtn.textContent = '💾 Save to Database (Unsaved)';
    saveBtn.style.backgroundColor = '#e11d48';
  }
}

function filterTable() { renderTable(); }
function openPasteModal() { document.getElementById('paste-modal').classList.remove('hidden'); document.getElementById('paste-area').focus(); }
function closePasteModal() { document.getElementById('paste-modal').classList.add('hidden'); document.getElementById('paste-area').value = ''; }
function openResetModal() { document.getElementById('reset-modal').classList.remove('hidden'); }
function closeResetModal() { document.getElementById('reset-modal').classList.add('hidden'); }

function applyReset() {
  projectsData.forEach(p => { p.balance = 0; });
  closeResetModal();
  renderTable();
  const saveBtn = document.getElementById('save-btn');
  saveBtn.textContent = '💾 Save to Database (Unsaved)';
  saveBtn.style.backgroundColor = '#e11d48';
  showToast('All project balances cleared to 0.');
}

function applyPaste() {
  const raw = document.getElementById('paste-area').value;
  const lines = raw.split(/[\n\r]+/).map(s => s.trim()).filter(Boolean);
  if (lines.length === 0) { closePasteModal(); return; }

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
    let count = 0;
    projectsData.forEach(p => {
      if (parsedMap.has(p.ba)) {
        p.balance = parsedMap.get(p.ba);
        count++;
      }
    });
    showToast(`Updated ${count} projects by BA code.`);
  } else {
    const sorted = [...projectsData].sort((a, b) => (parseInt(a.ba) || 0) - (parseInt(b.ba) || 0));
    let count = 0;
    lines.forEach((line, i) => {
      const val = parseFloat(line.replace(/[^0-9.\-]/g, ''));
      if (!isNaN(val) && i < sorted.length) {
        sorted[i].balance = val;
        count++;
      }
    });
    showToast(`Updated ${count} balances sequentially.`);
  }

  closePasteModal();
  renderTable();
  const saveBtn = document.getElementById('save-btn');
  saveBtn.textContent = '💾 Save to Database (Unsaved)';
  saveBtn.style.backgroundColor = '#e11d48';
}

function triggerPrint() { window.print(); }

// ================= MODULE 2: DAILY CASHFLOW LOGIC =================

function switchDailyTab(tabIdx) {
  currentDailyTab = tabIdx;
  document.getElementById('daily-page-1').style.display = tabIdx === 1 ? 'block' : 'none';
  document.getElementById('daily-page-2').style.display = tabIdx === 2 ? 'block' : 'none';
  document.getElementById('daily-page-3').style.display = tabIdx === 3 ? 'block' : 'none';

  [1, 2, 3].forEach(i => {
    const btn = document.getElementById(`daily-tab-btn-${i}`);
    if (btn) btn.className = `daily-sub-tab ${tabIdx === i ? 'active' : ''}`;
  });
}

function buildDailyTables() {
  buildAccountTables('2859', lessItems2859, addItems2859);
  buildAccountTables('6476', lessItems6476, addItems6476);
  buildOutgoingTable();

  // Seed default investments if empty
  const defaultInvest = [
    { inst: "KAF", date: "2024-02-11", maturity: "", rate: "3.02", from: "Sukuk+tolling", bal: "", amt: "0" },
    { inst: "MBB", date: "", maturity: "", rate: "", from: "", bal: "", amt: "0" },
    { inst: "MBSB (Long-Term)", date: "", maturity: "", rate: "3.60", from: "Tolling", bal: "15,000,000.00", amt: "15,000,000.00" }
  ];
  ['2859', '6476'].forEach(prefix => {
    const body = document.getElementById(`invest-body-${prefix}`);
    if (body && body.children.length === 0) {
      defaultInvest.forEach(r => createInvestRow(prefix, r));
    }
  });

  document.addEventListener('input', (e) => {
    if (e.target.closest('#module-daily-cashflow')) {
      recalcDaily();
    }
  });
}

function buildAccountTables(prefix, lessList, addList) {
  const s1 = document.getElementById(`cash-body-${prefix}-s1`);
  const s2 = document.getElementById(`cash-body-${prefix}-s2`);
  const s3 = document.getElementById(`cash-body-${prefix}-s3`);

  if (!s1 || s1.children.length > 0) return;

  // S1: Bank Position
  s1.innerHTML = `
    <tr>
      <td>Bank Statement Balance</td>
      <td class="text-right"><input type="number" class="row-input ${prefix}-top-input" value="0" step="0.01"></td>
      <td></td>
    </tr>
    <tr>
      <td colspan="2">
        <div style="display:flex;gap:8px;align-items:center;">
          <span style="font-weight:600;font-size:12px;">Maturity from Investment:</span>
          <select class="less-dropdown" id="${prefix}-maturity-select">
            <option value="MBB">MBB</option>
            <option value="MBSB">MBSB</option>
            <option value="KAF">KAF</option>
          </select>
          <button class="add-btn btn-primary" onclick="addMaturityFromDropdown('${prefix}')">Add</button>
          <button class="add-btn btn-outline" onclick="addCustomMaturityItem('${prefix}')">+ Custom</button>
        </div>
      </td>
      <td></td>
    </tr>
    <tr id="${prefix}-maturity-marker" style="display:none;"></tr>
    <tr>
      <td colspan="2">
        <div style="display:flex;gap:8px;align-items:center;">
          <span style="font-weight:600;font-size:12px;">Add:</span>
          <select class="less-dropdown" id="${prefix}-add-select">
            ${addList.map(item => `<option value="${item}">${item}</option>`).join('')}
          </select>
          <button class="add-btn btn-primary" onclick="addAddFromDropdown('${prefix}')">Add</button>
          <button class="add-btn btn-outline" onclick="addCustomAddItem('${prefix}')">+ Custom</button>
        </div>
      </td>
      <td></td>
    </tr>
    <tr id="${prefix}-add-marker" style="display:none;"></tr>
    <tr class="section-total">
      <td>Available Balance</td>
      <td class="text-right" id="${prefix}-avail-balance">0.00</td>
      <td></td>
    </tr>
  `;

  // S2: Deductions
  s2.innerHTML = `
    <tr>
      <td colspan="2">
        <select class="less-dropdown" id="${prefix}-less-select">
          ${lessList.map(item => `<option value="${item}">${item}</option>`).join('')}
        </select>
        <button class="add-btn btn-primary" onclick="addLessFromDropdown('${prefix}')">Add</button>
        <button class="add-btn btn-outline" onclick="addCustomLessItem('${prefix}')">+ Custom</button>
      </td>
      <td></td>
    </tr>
    <tr class="section-total" id="${prefix}-total-deductions-row">
      <td>Total Deductions</td>
      <td class="text-right" id="${prefix}-total-deductions">0.00</td>
      <td></td>
    </tr>
  `;

  // S3: Final Position
  s3.innerHTML = `
    <tr class="section-total">
      <td>Balance Available for Placement</td>
      <td class="text-right" id="${prefix}-bal-placement">0.00</td>
      <td></td>
    </tr>
    <tr>
      <td style="padding:6px 10px;"><span>Placement</span></td>
      <td class="text-right" style="padding:6px 10px;">
        <input type="number" class="row-input ${prefix}-place-input" value="0" step="0.01" style="width:100%;">
      </td>
      <td class="text-center">
        <button class="text-red-500 font-bold" onclick="removePlacementRow(this)">✕</button>
      </td>
    </tr>
    <tr id="${prefix}-add-placement-row">
      <td colspan="3">
        <button class="add-btn btn-primary" onclick="addPlacementRow('${prefix}')">+ Add Placement</button>
      </td>
    </tr>
    <tr class="section-total">
      <td>NET BALANCE</td>
      <td class="text-right" id="${prefix}-net-balance">0.00</td>
      <td></td>
    </tr>
  `;
}

function buildOutgoingTable() {
  const body = document.getElementById('outgoing-body');
  if (!body || body.children.length > 0) return;
  body.innerHTML = '';
  outgoingDefaultCategories.forEach(label => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${label}</td>
      <td class="text-right"><input type="number" class="row-input out-input" value="0" step="0.01"></td>
      <td class="text-right"><input type="date" class="row-input"></td>
    `;
    body.appendChild(tr);
  });
  const totalTr = document.createElement('tr');
  totalTr.className = 'section-total';
  totalTr.innerHTML = `<td>Total Outgoing</td><td class="text-right" id="out-total">0.00</td><td></td>`;
  body.appendChild(totalTr);
}

function addMaturityFromDropdown(prefix) {
  const sel = document.getElementById(`${prefix}-maturity-select`);
  insertMaturityRow(prefix, sel.value, false);
}
function addCustomMaturityItem(prefix) { insertMaturityRow(prefix, '', true); }

function insertMaturityRow(prefix, label, isCustom) {
  const marker = document.getElementById(`${prefix}-maturity-marker`);
  const tr = document.createElement('tr');
  const nameCell = isCustom 
    ? `<td style="padding-left:24px"><input type="text" class="row-input" style="width:180px;" placeholder="Custom name"></td>` 
    : `<td style="padding-left:24px">${label}</td>`;
  tr.innerHTML = `
    ${nameCell}
    <td class="text-right"><input type="number" class="row-input ${prefix}-maturity-input" value="0" step="0.01"></td>
    <td class="text-center"><button class="text-red-500 font-bold" onclick="this.closest('tr').remove();recalcDaily();">✕</button></td>
  `;
  marker.parentNode.insertBefore(tr, marker);
  recalcDaily();
}

function addAddFromDropdown(prefix) {
  const sel = document.getElementById(`${prefix}-add-select`);
  insertAddRow(prefix, sel.value, false);
}
function addCustomAddItem(prefix) { insertAddRow(prefix, '', true); }

function insertAddRow(prefix, label, isCustom) {
  const marker = document.getElementById(`${prefix}-add-marker`);
  const tr = document.createElement('tr');
  const nameCell = isCustom 
    ? `<td style="padding-left:24px"><input type="text" class="row-input" style="width:180px;" placeholder="Custom name"></td>` 
    : `<td style="padding-left:24px">${label}</td>`;
  
  const isTransferSync = (prefix === '2859' && label === 'Receive from 564212106476') || (prefix === '6476' && label === 'Receive from 564098512859');
  const inputCell = isTransferSync 
    ? `<td class="text-right"><input type="text" class="row-input ${prefix}-add-input" value="0" readonly style="background:#f3f4f6;cursor:not-allowed;" data-sync="transfer"></td>`
    : `<td class="text-right"><input type="number" class="row-input ${prefix}-add-input" value="0" step="0.01"></td>`;

  tr.innerHTML = `
    ${nameCell}
    ${inputCell}
    <td class="text-center"><button class="text-red-500 font-bold" onclick="this.closest('tr').remove();recalcDaily();">✕</button></td>
  `;
  marker.parentNode.insertBefore(tr, marker);
  recalcDaily();
}

function addLessFromDropdown(prefix) {
  const sel = document.getElementById(`${prefix}-less-select`);
  insertLessRow(prefix, sel.value, false);
}
function addCustomLessItem(prefix) { insertLessRow(prefix, '', true); }

function insertLessRow(prefix, label, isCustom) {
  const totalRow = document.getElementById(`${prefix}-total-deductions-row`);
  const tr = document.createElement('tr');
  const nameCell = isCustom 
    ? `<td style="padding-left:24px"><input type="text" class="row-input" style="width:180px;" placeholder="Custom name"></td>` 
    : `<td style="padding-left:24px">${label}</td>`;
  tr.innerHTML = `
    ${nameCell}
    <td class="text-right"><input type="number" class="row-input ${prefix}-less-input" value="0" step="0.01"></td>
    <td class="text-center"><button class="text-red-500 font-bold" onclick="this.closest('tr').remove();recalcDaily();">✕</button></td>
  `;
  totalRow.parentNode.insertBefore(tr, totalRow);
  recalcDaily();
}

function addPlacementRow(prefix) {
  const addBtnRow = document.getElementById(`${prefix}-add-placement-row`);
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td style="padding:6px 10px;"><span>Placement</span></td>
    <td class="text-right" style="padding:6px 10px;"><input type="number" class="row-input ${prefix}-place-input" value="0" step="0.01" style="width:100%;"></td>
    <td class="text-center"><button class="text-red-500 font-bold" onclick="removePlacementRow(this)">✕</button></td>
  `;
  addBtnRow.parentNode.insertBefore(tr, addBtnRow);
  recalcDaily();
}

function removePlacementRow(btn) {
  btn.closest('tr').remove();
  recalcDaily();
}

function addInvestRow(prefix) {
  createInvestRow(prefix, { inst: '', date: '', maturity: '', rate: '', from: '', bal: '', amt: '0' });
}

function createInvestRow(prefix, r) {
  const body = document.getElementById(`invest-body-${prefix}`);
  if (!body) return;
  const idx = body.children.length;
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input class="row-input" style="width:90px;" value="${r.inst || ''}" data-idx="${idx}" data-field="inst"></td>
    <td><input type="date" class="row-input" style="width:125px;" value="${r.date || ''}" data-idx="${idx}" data-field="date"></td>
    <td><input type="date" class="row-input" style="width:125px;" value="${r.maturity || ''}" data-idx="${idx}" data-field="maturity"></td>
    <td class="text-center font-mono" data-idx="${idx}" data-field="day">-</td>
    <td><input class="row-input text-right" style="width:65px;" value="${r.rate || ''}" data-idx="${idx}" data-field="rate"></td>
    <td class="text-right font-mono" data-idx="${idx}" data-field="profit">0.00</td>
    <td><input class="row-input" style="width:110px;" value="${r.from || ''}" data-idx="${idx}" data-field="from"></td>
    <td><input class="row-input text-right" style="width:115px;" value="${r.bal || ''}" data-idx="${idx}" data-field="bal"></td>
    <td><input class="row-input text-right" style="width:115px;" value="${r.amt || '0'}" data-idx="${idx}" data-field="amt"></td>
    <td class="text-right font-bold text-emerald" data-idx="${idx}" data-field="total">0.00</td>
  `;
  body.appendChild(tr);
  calcSingleInvest(prefix, idx);
}

function calcSingleInvest(prefix, idx) {
  const g = (f) => document.querySelector(`#invest-body-${prefix} [data-idx="${idx}"][data-field="${f}"]`);
  const d1Str = g('date')?.value || '';
  const d2Str = g('maturity')?.value || '';
  const rate = parseFloat(g('rate')?.value || 0);
  const amt = parseVal(g('amt')?.value || '0');

  let day = 0, profit = 0;
  if (d1Str && d2Str) {
    const d1 = new Date(d1Str);
    const d2 = new Date(d2Str);
    if (!isNaN(d1) && !isNaN(d2)) {
      day = Math.floor((d2 - d1) / 864e5);
    }
  }
  if (amt > 0 && rate > 0 && day > 0) {
    profit = amt * (rate / 100) * (day / 365);
  }

  const dayEl = g('day'); if (dayEl) dayEl.textContent = day > 0 ? day : '-';
  const profEl = g('profit'); if (profEl) profEl.textContent = fmt(profit);
  const totEl = g('total'); if (totEl) totEl.textContent = fmt(profit + amt);
}

function addOutgoingItem() {
  const body = document.getElementById('outgoing-body');
  const totalRow = body.querySelector('.section-total');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="text" class="row-input" style="width:220px;" placeholder="Custom Outgoing Name"></td>
    <td class="text-right"><input type="number" class="row-input out-input" value="0" step="0.01"></td>
    <td class="text-right"><input type="date" class="row-input"></td>
  `;
  body.insertBefore(tr, totalRow);
  recalcDaily();
}

function getRowLabel(row) {
  const td = row.querySelector('td:first-child');
  if (!td) return '';
  const inp = td.querySelector('input');
  return inp ? inp.value.trim() : td.textContent.trim();
}

function recalcDaily() {
  if (isRestoringDaily) return;
  ['2859', '6476'].forEach(prefix => {
    // Recalc investments
    const invBody = document.getElementById(`invest-body-${prefix}`);
    if (invBody) {
      for (let i = 0; i < invBody.children.length; i++) {
        calcSingleInvest(prefix, i);
      }
    }
    recalcAccountSection(prefix);
  });

  // Outgoing total
  const outInputs = [...document.querySelectorAll('.out-input')].map(i => parseVal(i.value));
  const outTot = outInputs.reduce((a, b) => a + b, 0);
  const outTotEl = document.getElementById('out-total');
  if (outTotEl) outTotEl.textContent = fmt(outTot);

  checkUpcomingPayments();
}

function recalcAccountSection(prefix) {
  const topInp = document.querySelector(`.${prefix}-top-input`);
  const topBal = parseVal(topInp?.value || 0);

  const matInps = [...document.querySelectorAll(`.${prefix}-maturity-input`)].map(i => parseVal(i.value));
  const matTot = matInps.reduce((a, b) => a + b, 0);

  const addInps = [...document.querySelectorAll(`.${prefix}-add-input`)].map(i => parseVal(i.value));
  const addTot = addInps.reduce((a, b) => a + b, 0);

  const avail = topBal + matTot + addTot;
  const availEl = document.getElementById(`${prefix}-avail-balance`);
  if (availEl) availEl.textContent = fmt(avail);

  const lessInps = [...document.querySelectorAll(`.${prefix}-less-input`)].map(i => parseVal(i.value));
  const deductTot = lessInps.reduce((a, b) => a + b, 0);
  const deductEl = document.getElementById(`${prefix}-total-deductions`);
  if (deductEl) deductEl.textContent = fmt(deductTot);

  const balPlace = avail - deductTot;
  const balPlaceEl = document.getElementById(`${prefix}-bal-placement`);
  if (balPlaceEl) balPlaceEl.textContent = fmt(balPlace);

  const placeInps = [...document.querySelectorAll(`.${prefix}-place-input`)].map(i => parseVal(i.value));
  const placeTot = placeInps.reduce((a, b) => a + b, 0);

  const netBal = balPlace - placeTot;
  const netEl = document.getElementById(`${prefix}-net-balance`);
  if (netEl) netEl.textContent = fmt(netBal);
}

function checkUpcomingPayments() {
  const banner = document.getElementById('reminder-banner');
  const list = document.getElementById('reminder-list');
  const dateStr = document.getElementById('daily-report-date')?.value;
  if (!banner || !list || !dateStr) return;

  const today = new Date(dateStr);
  if (isNaN(today)) return;
  today.setHours(0, 0, 0, 0);

  const due = [];
  document.querySelectorAll('#outgoing-body tr:not(.section-total)').forEach(tr => {
    const cells = tr.querySelectorAll('td');
    if (cells.length >= 3) {
      const label = getRowLabel(tr);
      const amt = parseVal(cells[1].querySelector('input')?.value || 0);
      const pDateStr = cells[2].querySelector('input')?.value;
      if (pDateStr && amt > 0) {
        const pDate = new Date(pDateStr);
        pDate.setHours(0, 0, 0, 0);
        // Remind 1 to 3 days in advance (handling weekend)
        const diffDays = Math.round((pDate - today) / 864e5);
        if (diffDays >= 0 && diffDays <= 3) {
          due.push({ label, amt, pDateStr });
        }
      }
    }
  });

  if (due.length > 0) {
    list.innerHTML = '';
    due.forEach(d => {
      const li = document.createElement('li');
      li.className = 'reminder-item';
      li.innerHTML = `
        <span><strong>${d.label}</strong>: RM ${fmt(d.amt)} (Due: ${d.pDateStr})</span>
        <button class="add-btn btn-primary" onclick="reserveOutgoing('${d.label}', ${d.amt})">Reserve Now</button>
      `;
      list.appendChild(li);
    });
    banner.style.display = 'block';
  } else {
    banner.style.display = 'none';
  }
}

function reserveOutgoing(label, amt) {
  insertLessRow('2859', label, false);
  const lessInputs = document.querySelectorAll('.2859-less-input');
  if (lessInputs.length > 0) {
    lessInputs[lessInputs.length - 1].value = amt;
  }
  recalcDaily();
  showToast(`Reserved ${label} (RM ${fmt(amt)}) in MBB 2859 deductions.`);
}

// ================= DAILY CASHFLOW TURSO SYNC =================

function serializeDailyState() {
  const report_date = document.getElementById('daily-report-date')?.value || new Date().toISOString().split('T')[0];
  const serializeAcc = (prefix) => {
    const topBal = parseVal(document.querySelector(`.${prefix}-top-input`)?.value || 0);
    const maturity = [...document.querySelectorAll(`.${prefix}-maturity-input`)].map(i => ({ label: getRowLabel(i.closest('tr')), val: parseVal(i.value) }));
    const add = [...document.querySelectorAll(`.${prefix}-add-input`)].map(i => ({ label: getRowLabel(i.closest('tr')), val: parseVal(i.value) }));
    const less = [...document.querySelectorAll(`.${prefix}-less-input`)].map(i => ({ label: getRowLabel(i.closest('tr')), val: parseVal(i.value) }));
    const place = [...document.querySelectorAll(`.${prefix}-place-input`)].map(i => parseVal(i.value));
    const invest = [];
    document.querySelectorAll(`#invest-body-${prefix} tr`).forEach(tr => {
      const inps = tr.querySelectorAll('input');
      if (inps.length >= 7) {
        invest.push({ inst: inps[0].value, date: inps[1].value, maturity: inps[2].value, rate: inps[3].value, from: inps[4].value, bal: inps[5].value, amt: inps[6].value });
      }
    });
    return { topBal, maturity, add, less, place, invest };
  };

  const outgoing = [];
  document.querySelectorAll('#outgoing-body tr:not(.section-total)').forEach(tr => {
    const cells = tr.querySelectorAll('td');
    if (cells.length >= 3) {
      outgoing.push({
        label: getRowLabel(tr),
        amt: parseVal(cells[1].querySelector('input')?.value || 0),
        date: cells[2].querySelector('input')?.value || ''
      });
    }
  });

  return {
    report_date,
    acc2859: serializeAcc('2859'),
    acc6476: serializeAcc('6476'),
    outgoing
  };
}

async function saveDailyCashflowToTurso() {
  const saveBtn = document.getElementById('daily-save-btn');
  saveBtn.disabled = true;
  saveBtn.textContent = 'Saving Daily Cashflow...';

  const state = serializeDailyState();
  const dateStr = state.report_date;
  const jsonStr = JSON.stringify(state);

  // Cache locally
  localStorage.setItem(`fpi_daily_${dateStr}`, jsonStr);

  try {
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
              sql: `INSERT INTO daily_cashflow (report_date, data_json, updated_at)
                    VALUES (?, ?, datetime('now'))
                    ON CONFLICT(report_date) DO UPDATE SET
                      data_json = excluded.data_json,
                      updated_at = excluded.updated_at;`,
              args: [
                { type: 'text', value: dateStr },
                { type: 'text', value: jsonStr }
              ]
            }
          },
          { type: 'close' }
        ]
      })
    });

    if (res.ok) {
      saveBtn.textContent = 'Saved to Database!';
      saveBtn.style.backgroundColor = '#059669';
      showToast(`Daily Cashflow for ${dateStr} saved to database!`);
      setTimeout(() => {
        saveBtn.disabled = false;
        saveBtn.textContent = '💾 Save Daily Cashflow to Database';
      }, 2500);
      return;
    }
  } catch (err) {
    showToast('Failed to save to database: ' + err.message, 'error');
  }

  saveBtn.disabled = false;
  saveBtn.textContent = '💾 Save Daily Cashflow to Database';
}

async function fetchDailyCashflowFromTurso() {
  const dateInput = document.getElementById('daily-report-date');
  const dateStr = dateInput?.value || new Date().toISOString().split('T')[0];

  try {
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
              sql: `SELECT data_json FROM daily_cashflow WHERE report_date = ?;`,
              args: [{ type: 'text', value: dateStr }]
            }
          },
          { type: 'close' }
        ]
      })
    });

    if (res.ok) {
      const json = await res.json();
      const val = json.results?.[0]?.response?.result?.rows?.[0]?.[0]?.value;
      if (val) {
        restoreDailyState(JSON.parse(val));
        return;
      }
    }
  } catch (_) {}

  // Local cache fallback
  const cached = localStorage.getItem(`fpi_daily_${dateStr}`);
  if (cached) {
    restoreDailyState(JSON.parse(cached));
    return;
  }

  // If no record found for this date, reset to clean default tables
  buildDailyTables();
}

function restoreDailyState(state) {
  if (!state) return;
  isRestoringDaily = true;
  try {
    const restoreAcc = (prefix, accData) => {
      if (!accData) return;
      const topInp = document.querySelector(`.${prefix}-top-input`);
      if (topInp) topInp.value = accData.topBal || 0;

      // Clear dynamic rows
      document.querySelectorAll(`.${prefix}-maturity-input`).forEach(i => i.closest('tr').remove());
      document.querySelectorAll(`.${prefix}-add-input`).forEach(i => i.closest('tr').remove());
      document.querySelectorAll(`.${prefix}-less-input`).forEach(i => i.closest('tr').remove());

      (accData.maturity || []).forEach(m => {
        insertMaturityRow(prefix, m.label, false);
        const inps = document.querySelectorAll(`.${prefix}-maturity-input`);
        inps[inps.length - 1].value = m.val;
      });

      (accData.add || []).forEach(a => {
        insertAddRow(prefix, a.label, false);
        const inps = document.querySelectorAll(`.${prefix}-add-input`);
        inps[inps.length - 1].value = a.val;
      });

      (accData.less || []).forEach(l => {
        insertLessRow(prefix, l.label, false);
        const inps = document.querySelectorAll(`.${prefix}-less-input`);
        inps[inps.length - 1].value = l.val;
      });

      const placeInps = document.querySelectorAll(`.${prefix}-place-input`);
      (accData.place || [0]).forEach((val, idx) => {
        if (idx === 0 && placeInps[0]) {
          placeInps[0].value = val;
        } else if (idx > 0) {
          addPlacementRow(prefix);
          const currentPlaces = document.querySelectorAll(`.${prefix}-place-input`);
          currentPlaces[currentPlaces.length - 1].value = val;
        }
      });

      const invBody = document.getElementById(`invest-body-${prefix}`);
      if (invBody && Array.isArray(accData.invest) && accData.invest.length > 0) {
        invBody.innerHTML = '';
        accData.invest.forEach(r => createInvestRow(prefix, r));
      }
    };

    restoreAcc('2859', state.acc2859);
    restoreAcc('6476', state.acc6476);

    if (Array.isArray(state.outgoing)) {
      const outBody = document.getElementById('outgoing-body');
      if (outBody) {
        outBody.innerHTML = '';
        state.outgoing.forEach(row => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${row.label}</td>
            <td class="text-right"><input type="number" class="row-input out-input" value="${row.amt}" step="0.01"></td>
            <td class="text-right"><input type="date" class="row-input" value="${row.date}"></td>
          `;
          outBody.appendChild(tr);
        });
        const totalTr = document.createElement('tr');
        totalTr.className = 'section-total';
        totalTr.innerHTML = `<td>Total Outgoing</td><td class="text-right" id="out-total">0.00</td><td></td>`;
        outBody.appendChild(totalTr);
      }
    }

  } finally {
    isRestoringDaily = false;
    recalcDaily();
  }
}

function onDailyDateChange() {
  fetchDailyCashflowFromTurso();
}

function exportDailyPDF() {
  window.print();
}

// Initial check on page load
window.addEventListener('DOMContentLoaded', () => {
  checkExistingAuth();
});
