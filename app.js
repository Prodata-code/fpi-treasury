/**
 * FGV Palm Industries Sdn. Bhd.
 * Treasury Management Unified Portal (Daily Cashflow + Month-End Balance)
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
const lessItems2859 = ["Transfer to 564212106476","SSC (VENDOR)","FGVC","GAJI","KWSP","SOCSO","SOCSO EIS","LHDN","Bayaran Praktikal","BONUS","KWSP BONUS","LHDN BONUS","GAJI PBH","KWSP PBH","SOCSO PBH","SOCSO EIS PBH","LHDN PBH","BONUS PBH","LOAN MBB & OTHERS","TABUNG HAJI","ASB","ZAKAT","HR","STAFF","CAPEX","Interco","Prodata","MPOB","CJN SABAH","ETIQA/Insurans","CA & ADV Bonus","KWSP CA & ADV BON","LHDN CA & ADV BON","Bayaran SD","Bayaran SD PBH","Pembayaran Praktikal","Yayasan","SST","Petronas","Cess Sabah","WIP","Cukai Tanah","PM Care","Interco FGV Transport","Tax 5th YA2026","FPX","HR-Loan Rumah"];
const lessItems6476 = ["Transfer to 564098512859","SSC (VENDOR)","GAJI","KWSP","SOCSO","SOCSO EIS","LHDN","Bayaran Praktikal","BONUS","KWSP BONUS","LHDN BONUS","LOAN MBB & OTHERS","TABUNG HAJI","ASB","ZAKAT","HR","STAFF","CAPEX","Interco","FPX"];
const addItems2859 = ["Receive from 564212106476", "Receive from FGVC (IFP fund)", "PUMP BACK"];
const addItems6476 = ["Receive from 564098512859", "Receive from FGVC (IFP fund)", "PUMP BACK"];
const defaultInvest = [
  { inst: "KAF", date: "2024-02-11", maturity: "", rate: "3.02", from: "Sukuk+tolling", bal: "", amt: "0" },
  { inst: "MBB", date: "", maturity: "", rate: "", from: "", bal: "", amt: "0" },
  { inst: "MBSB (Long-Term)", date: "", maturity: "", rate: "3.60", from: "Tolling", bal: "15,000,000.00", amt: "15,000,000.00" }
];

const outgoingDefaultCategories = ["GAJI","KWSP","SOCSO","SOCSO EIS","LHDN","Bayaran Praktikal","BONUS","GAJI PBH","KWSP PBH","SOCSO PBH","SOCSO EIS PBH","LHDN PBH","BONUS PBH","LHDN BONUS","KWSP BONUS","KWSP BONUS PBH","LOAN MBB & OTHERS","TABUNG HAJI","ASB","ZAKAT","KWSP CA & ADV BON","LHDN CA & ADV BON","Yayasan","PETRONAS","Tax Sarawak","Cess Sabah","MPOB","HR"];

// ================= GLOBAL STATE =================

let projectsData = [];
let currentPortalModule = 'daily-cashflow'; // Default to Tab 1 (Daily Cashflow)
let dailyAutoSaveTimer = null;
let monthEndAutoSaveTimer = null;
let isRestoringDaily = false;
let hasUnsavedChanges = false;
let lastDailySyncAt = null;
let lastDailySyncDate = null;
let lastMonthEndSyncAt = null;
let lastMonthEndSyncPeriod = null;
let isDailyDirty = false;
let isSavingDaily = false;
let isSavingMonthEnd = false;
let isSyncChecking = false;
let liveSyncTimer = null;
const LIVE_SYNC_INTERVAL_MS = 4000;

async function tursoPipeline(requests) {
  const res = await fetch(TURSO_CONFIG.url, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + TURSO_CONFIG.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      requests: [...requests, { type: 'close' }]
    })
  });
  if (!res.ok) return null;
  return res.json();
}

function isUserEditingInModule(moduleId) {
  const active = document.activeElement;
  if (!active || !active.closest('#' + moduleId)) return false;
  const tag = active.tagName;
  return (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') && active.id !== 'daily-report-date' && active.id !== 'search-input';
}

// ================= GENERAL HELPERS =================

function fmt(num) {
  const n = parseFloat(num) || 0;
  return n.toLocaleString('en-MY', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function parseVal(val) {
  if (typeof val === 'number') return isNaN(val) ? 0 : val;
  if (!val) return 0;
  const cleaned = String(val).replace(/,/g, '').trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

function parseDate(s) {
  if (!s) return null;
  if (s.includes('-')) {
    const p = s.split('-');
    if (p.length === 3) return new Date(+p[0], +p[1] - 1, +p[2]);
  } else if (s.includes('/')) {
    const p = s.split('/');
    if (p.length === 3) return new Date(+p[2], +p[1] - 1, +p[0]);
  }
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

function calcReversal(balance) {
  const bal = Number(balance) || 0;
  if (bal <= 10000) return 0;
  return Math.ceil((bal - 10000) / 1000) * 1000;
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function openPrintDocument(printContent, iframeId = 'portal-print-iframe') {
  const printWindow = window.open('', '_blank', 'width=950,height=750');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 250);
    return;
  }

  let iframe = document.getElementById(iframeId);
  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.id = iframeId;
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);
  }
  iframe.contentWindow.document.open();
  iframe.contentWindow.document.write(printContent);
  iframe.contentWindow.document.close();
  setTimeout(() => {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  }, 250);
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;
  toastMsg.textContent = message;
  toast.className = 'toast ' + type + ' show';
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
  
  switchPortalModule('daily-cashflow'); // Default to Tab 1 (Daily Cashflow)
  buildDailyTables();
  fetchBalances();
  fetchDailyCashflowFromTurso();
  startLiveSync();
}

function handleLogout() {
  stopLiveSync();
  lastDailySyncAt = null;
  lastDailySyncDate = null;
  lastMonthEndSyncAt = null;
  lastMonthEndSyncPeriod = null;
  isDailyDirty = false;
  hasUnsavedChanges = false;
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
  const isDaily = mod === 'daily-cashflow';

  const dailySec = document.getElementById('module-daily-cashflow');
  const monthSec = document.getElementById('module-month-end');
  if (dailySec) dailySec.style.display = isDaily ? 'block' : 'none';
  if (monthSec) monthSec.style.display = isDaily ? 'none' : 'block';

  const btnDaily = document.getElementById('nav-btn-daily');
  const btnMonth = document.getElementById('nav-btn-monthend');
  if (btnDaily) btnDaily.className = 'portal-nav-tab ' + (isDaily ? 'active' : '');
  if (btnMonth) btnMonth.className = 'portal-nav-tab ' + (!isDaily ? 'active' : '');

  const titleEl = document.getElementById('portal-header-title');
  if (titleEl) {
    titleEl.textContent = isDaily 
      ? 'Daily Cash Status & Treasury Operations'
      : 'Project Month-End Balance Dashboard';
  }

  if ((isDaily && lastDailySyncDate) || (!isDaily && lastMonthEndSyncPeriod)) {
    runLiveSyncCheck();
  }
}

// ================= MODULE 1: MONTH-END BALANCE LOGIC =================

function getSelectedPeriod() {
  const m = document.getElementById('period-month')?.value || '06';
  const y = document.getElementById('period-year')?.value || '2026';
  const lastDay = new Date(parseInt(y, 10), parseInt(m, 10), 0).getDate();
  const dayStr = String(lastDay).padStart(2, '0');
  return y + '-' + m + '-' + dayStr;
}

function getPeriodPrefix() {
  const m = document.getElementById('period-month')?.value || '06';
  const y = document.getElementById('period-year')?.value || '2026';
  return y + '-' + m;
}

function getPeriodDisplayLabel() {
  const mNames = ["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"];
  const m = document.getElementById('period-month')?.value || '06';
  const y = document.getElementById('period-year')?.value || '2026';
  const mIdx = Math.max(0, Math.min(11, parseInt(m, 10) - 1));
  return mNames[mIdx] + ' ' + y;
}

function updatePeriodDisplay(period) {
  const label = getPeriodDisplayLabel();
  const el = document.getElementById('period-display-text');
  if (el) el.textContent = 'FGV Palm Industries Sdn. Bhd.';
  const printEl = document.getElementById('print-period-text');
  if (printEl) printEl.textContent = 'Reporting Month: ' + label + ' (As at ' + period + ')';
}

function changePeriod() {
  clearTimeout(monthEndAutoSaveTimer);
  const period = getSelectedPeriod();
  const pickerEl = document.getElementById('period-picker');
  if (pickerEl) pickerEl.value = period;
  fetchBalances();
}

async function fetchBalances(isSilentSync = false) {
  const period = getSelectedPeriod();
  const periodPrefix = getPeriodPrefix();
  if (!isSilentSync) {
    hasUnsavedChanges = false;
    updatePeriodDisplay(period);
  }

  const tursoDot = document.getElementById('turso-dot');
  const tursoText = document.getElementById('turso-text');

  // Direct Turso pipeline
  try {
    const query = `
      SELECT p.bil, p.projek, p.hse, p.acc, p.gl, p.ba, b.balance
      FROM projects p
      LEFT JOIN balances b ON p.ba = b.ba AND (b.period = ? OR b.period LIKE ?)
      ORDER BY p.bil ASC;
    `;
    const periodArgs = [
      { type: 'text', value: period },
      { type: 'text', value: periodPrefix + '%' }
    ];
    const json = await tursoPipeline([
      { type: 'execute', stmt: { sql: query, args: periodArgs } },
      { type: 'execute', stmt: { sql: 'SELECT MAX(updated_at) FROM balances WHERE period = ? OR period LIKE ?;', args: periodArgs } }
    ]);

    if (json) {
      if (getSelectedPeriod() !== period) return;
      if (isSilentSync && (hasUnsavedChanges || isSavingMonthEnd || isUserEditingInModule('module-month-end'))) return;

      const rows = json.results?.[0]?.response?.result?.rows;
      const maxUpdatedAt = json.results?.[1]?.response?.result?.rows?.[0]?.[0]?.value ?? null;
      if (Array.isArray(rows) && rows.length > 0) {
        let hasCustomBalance = false;
        projectsData = rows.map(r => {
          const val = r[6].value;
          if (val !== null && val !== undefined) hasCustomBalance = true;
          return {
            bil: Number(r[0].value),
            projek: String(r[1].value),
            hse: String(r[2].value || ''),
            acc: String(r[3].value || ''),
            gl: String(r[4].value || ''),
            ba: String(r[5].value),
            balance: val !== null && val !== undefined ? Number(val) : 0
          };
        });

        lastMonthEndSyncPeriod = period;
        lastMonthEndSyncAt = maxUpdatedAt;
        hasUnsavedChanges = false;

        if (tursoDot) tursoDot.className = 'status-dot';
        if (tursoText) {
          tursoText.textContent = hasCustomBalance 
            ? 'Turso Database (Rekod Sedia Ada)' 
            : 'Turso Database (Bulan Baharu - Sedia Dimasukkan)';
        }
        renderTable();
        if (isSilentSync) {
          showToast('🔄 Baki Month-End dikemas kini daripada sesi lain.');
        }
        return;
      }
    }
  } catch (err) {
    console.warn('Turso query error:', err);
  }

  if (isSilentSync) return;

  // Fallback to default
  projectsData = JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
  if (tursoDot) tursoDot.className = 'status-dot offline';
  if (tursoText) tursoText.textContent = 'Default Template';
  renderTable();
}

function triggerMonthEndAutoSave(delayMs = 1200) {
  hasUnsavedChanges = true;
  clearTimeout(monthEndAutoSaveTimer);
  const saveBtn = document.getElementById('save-btn');
  if (saveBtn) {
    saveBtn.textContent = '⏳ Menyimpan ke Database dalam 1s...';
    saveBtn.style.backgroundColor = '#f59e0b';
  }
  monthEndAutoSaveTimer = setTimeout(async () => {
    await saveToTurso(true);
  }, delayMs);
}

async function saveToTurso(isAutoSave = false) {
  clearTimeout(monthEndAutoSaveTimer);
  isSavingMonthEnd = true;
  const period = getSelectedPeriod();
  const periodPrefix = getPeriodPrefix();
  const saveBtn = document.getElementById('save-btn');
  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.textContent = isAutoSave ? '⏳ Auto-saving ke Turso...' : 'Menyimpan ke Database...';
    saveBtn.style.backgroundColor = isAutoSave ? '#2563eb' : '';
  }

  const items = projectsData.map(p => ({
    ba: p.ba,
    balance: Number(p.balance) || 0
  }));

  try {
    const periodArgs = [
      { type: 'text', value: period },
      { type: 'text', value: periodPrefix + '%' }
    ];

    // 1. Check if records already exist for this month
    const checkJson = await tursoPipeline([{
      type: 'execute',
      stmt: {
        sql: 'SELECT COUNT(*) as count FROM balances WHERE period = ? OR period LIKE ?;',
        args: periodArgs
      }
    }]);

    let isUpdate = false;
    if (checkJson) {
      const count = Number(checkJson.results?.[0]?.response?.result?.rows?.[0]?.[0]?.value || 0);
      if (count > 0) isUpdate = true;
    }

    const requests = [];

    // 2. If updating an existing month, archive the old records to balances_history
    if (isUpdate) {
      requests.push({
        type: 'execute',
        stmt: {
          sql: `INSERT INTO balances_history (period, ba, balance, archived_at)
                SELECT period, ba, balance, datetime('now')
                FROM balances
                WHERE period = ? OR period LIKE ?;`,
          args: periodArgs
        }
      });
    }

    // 3. Upsert current items into balances with millisecond timestamp
    items.forEach(item => {
      requests.push({
        type: 'execute',
        stmt: {
          sql: `INSERT INTO balances (period, ba, balance, updated_at) 
                VALUES (?, ?, ?, strftime('%Y-%m-%d %H:%M:%f', 'now'))
                ON CONFLICT(period, ba) DO UPDATE SET
                  balance = excluded.balance,
                  updated_at = excluded.updated_at;`,
          args: [
            { type: 'text', value: period },
            { type: 'text', value: String(item.ba) },
            { type: 'float', value: Number(item.balance) || 0 }
          ]
        }
      });
    });

    const syncStmtIdx = requests.length;
    requests.push({
      type: 'execute',
      stmt: {
        sql: 'SELECT MAX(updated_at) FROM balances WHERE period = ? OR period LIKE ?;',
        args: periodArgs
      }
    });

    const json = await tursoPipeline(requests);

    if (json) {
      lastMonthEndSyncPeriod = period;
      lastMonthEndSyncAt = json.results?.[syncStmtIdx]?.response?.result?.rows?.[0]?.[0]?.value ?? null;
      hasUnsavedChanges = false;
      const nowTime = new Date().toLocaleTimeString('en-GB');
      if (saveBtn) {
        saveBtn.textContent = isAutoSave ? '✅ Disimpan (' + nowTime + ')' : '✅ Berjaya Disimpan!';
        saveBtn.style.backgroundColor = '#059669';
      }
      if (!isAutoSave) {
        const msg = isUpdate 
          ? `Kemas kini bagi ${getPeriodDisplayLabel()} disimpan! Rekod lama telah diarkibkan ke Sejarah (History).`
          : `Senarai baru bagi ${getPeriodDisplayLabel()} berjaya dimasukkan ke database!`;
        showToast(msg);
      }
      setTimeout(() => {
        if (saveBtn) {
          saveBtn.disabled = false;
          saveBtn.textContent = '💾 Save to Database';
          saveBtn.style.backgroundColor = '';
        }
      }, 2500);
      return;
    }
  } catch (err) {
    if (!isAutoSave) {
      showToast('Gagal simpan ke database: ' + err.message, 'error');
    }
  } finally {
    isSavingMonthEnd = false;
  }

  if (saveBtn) {
    saveBtn.disabled = false;
    saveBtn.textContent = '💾 Save to Database';
    saveBtn.style.backgroundColor = '';
  }
}

// ================= VERSION HISTORY VIEWER =================

async function openHistoryModal() {
  const modal = document.getElementById('history-modal');
  const desc = document.getElementById('history-modal-desc');
  const loading = document.getElementById('history-loading');
  const container = document.getElementById('history-list-container');
  const tbody = document.getElementById('history-table-body');

  if (!modal) return;
  modal.classList.remove('hidden');
  desc.textContent = 'Senarai rekod sejarah (history) yang disimpan sebelum ini bagi ' + getPeriodDisplayLabel() + '.';
  loading.style.display = 'block';
  container.style.display = 'none';
  tbody.innerHTML = '';

  const period = getSelectedPeriod();
  const periodPrefix = getPeriodPrefix();

  try {
    const res = await fetch(TURSO_CONFIG.url, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + TURSO_CONFIG.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        requests: [
          {
            type: 'execute',
            stmt: {
              sql: 'SELECT archived_at, COUNT(*) as count FROM balances_history WHERE period = ? OR period LIKE ? GROUP BY archived_at ORDER BY archived_at DESC;',
              args: [
                { type: 'text', value: period },
                { type: 'text', value: periodPrefix + '%' }
              ]
            }
          },
          { type: 'close' }
        ]
      })
    });

    if (res.ok) {
      const json = await res.json();
      const rows = json.results?.[0]?.response?.result?.rows || [];
      loading.style.display = 'none';
      container.style.display = 'block';

      if (rows.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:var(--gray-500);padding:1.5rem;">Tiada sejarah kemas kini untuk bulan ini (ini adalah senarai aktif/pertama).</td></tr>';
      } else {
        rows.forEach(r => {
          const timestamp = r[0].value;
          const count = r[1].value;
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td style="font-weight:600;color:var(--gray-800);padding:8px 12px;">${timestamp}</td>
            <td style="text-align:right;padding:8px 12px;">${count} projek</td>
            <td style="text-align:center;padding:8px 12px;">
              <button class="btn btn-outline" style="padding:0.25rem 0.6rem;font-size:0.75rem;border-color:#4f46e5;color:#4f46e5;" onclick="restoreHistoricalSnapshot('${timestamp}')">Pulihkan</button>
            </td>
          `;
          tbody.appendChild(tr);
        });
      }
    }
  } catch (err) {
    loading.textContent = 'Gagal memuatkan rekod sejarah: ' + err.message;
  }
}

function closeHistoryModal() {
  const modal = document.getElementById('history-modal');
  if (modal) modal.classList.add('hidden');
}

async function restoreHistoricalSnapshot(archivedAt) {
  if (!confirm(`Adakah anda pasti mahu memulihkan rekod dari sejarah ${archivedAt}?`)) return;
  const period = getSelectedPeriod();
  const periodPrefix = getPeriodPrefix();

  try {
    const res = await fetch(TURSO_CONFIG.url, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + TURSO_CONFIG.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        requests: [
          {
            type: 'execute',
            stmt: {
              sql: 'SELECT ba, balance FROM balances_history WHERE (period = ? OR period LIKE ?) AND archived_at = ?;',
              args: [
                { type: 'text', value: period },
                { type: 'text', value: periodPrefix + '%' },
                { type: 'text', value: archivedAt }
              ]
            }
          },
          { type: 'close' }
        ]
      })
    });

    if (res.ok) {
      const json = await res.json();
      const rows = json.results?.[0]?.response?.result?.rows || [];
      const map = {};
      rows.forEach(r => { map[r[0].value] = Number(r[1].value); });

      projectsData.forEach(p => {
        if (map[p.ba] !== undefined) {
          p.balance = map[p.ba];
        }
      });
      hasUnsavedChanges = true;
      renderTable();
      closeHistoryModal();
      showToast(`Sejarah ${archivedAt} dipulihkan! Sila klik Simpan untuk mengekalkannya.`);
    }
  } catch (err) {
    showToast('Gagal memulihkan sejarah: ' + err.message, 'error');
  }
}

// ================= RENDER MONTH-END TABLE =================

function renderTable() {
  const tbody = document.getElementById('table-body');
  if (!tbody) return;
  const search = (document.getElementById('search-input')?.value || '').trim().toLowerCase();

  const sorted = [...projectsData].sort((a, b) => (parseInt(a.ba, 10) || Infinity) - (parseInt(b.ba, 10) || Infinity));

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

  const kpiBal = document.getElementById('kpi-total-balance');
  const kpiRev = document.getElementById('kpi-total-reversal');
  const kpiFin = document.getElementById('kpi-total-final');
  const kpiCnt = document.getElementById('kpi-threshold-count');
  if (kpiBal) kpiBal.textContent = 'RM ' + fmt(totalBal);
  if (kpiRev) kpiRev.textContent = 'RM ' + fmt(totalRev);
  if (kpiFin) kpiFin.textContent = 'RM ' + fmt(totalFin);
  if (kpiCnt) kpiCnt.textContent = warnCount + ' / ' + projectsData.length;

  const fBal = document.getElementById('footer-total-balance');
  const fRev = document.getElementById('footer-total-reversal');
  const fFin = document.getElementById('footer-total-final');
  if (fBal) fBal.textContent = 'RM ' + fmt(totalBal);
  if (fRev) fRev.textContent = 'RM ' + fmt(totalRev);
  if (fFin) fFin.textContent = 'RM ' + fmt(totalFin);
}

function onBalanceChange(input) {
  const ba = input.dataset.ba;
  const numVal = parseVal(input.value);
  const target = projectsData.find(p => p.ba === ba);
  if (target) {
    target.balance = numVal;
    renderTable();
    triggerMonthEndAutoSave(1200);
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
  triggerMonthEndAutoSave(300);
  showToast('Semua baki projek dikosongkan kepada 0.');
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
    const sorted = [...projectsData].sort((a, b) => (parseInt(a.ba, 10) || 0) - (parseInt(b.ba, 10) || 0));
    let count = 0;
    lines.forEach((line, i) => {
      const val = parseFloat(line.replace(/[^0-9.\-]/g, ''));
      if (!isNaN(val) && i < sorted.length) {
        sorted[i].balance = val;
        count++;
      }
    });
    showToast(`Updated ${count} projects sequentially.`);
  }

  closePasteModal();
  renderTable();
  triggerMonthEndAutoSave(500);
}

function formatPeriodDDMMYYYY(period) {
  const parts = String(period || '').split('-');
  return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : String(period || '');
}

function buildMonthEndPrintHtml() {
  const formattedPeriod = formatPeriodDDMMYYYY(getSelectedPeriod());
  const search = (document.getElementById('search-input')?.value || '').trim().toLowerCase();

  const sorted = [...projectsData].sort((a, b) => (parseInt(a.ba, 10) || Infinity) - (parseInt(b.ba, 10) || Infinity));
  const visibleData = search
    ? sorted.filter(row =>
        String(row.projek || '').toLowerCase().includes(search) ||
        String(row.ba || '').toLowerCase().includes(search) ||
        String(row.acc || '').toLowerCase().includes(search) ||
        String(row.hse || '').toLowerCase().includes(search)
      )
    : sorted;

  let totalBal = 0;
  let totalRev = 0;
  let totalFin = 0;

  const rowsHtml = visibleData.map((row, idx) => {
    const balance = Number(row.balance) || 0;
    const reversal = calcReversal(balance);
    const finalBal = balance - reversal;
    totalBal += balance;
    totalRev += reversal;
    totalFin += finalBal;

    const isWarn = balance > 10000;
    const endBalStyle = isWarn ? 'color: #dc2626; font-weight: 600;' : '';
    const revStyle = isWarn ? 'color: #dc2626;' : 'color: #374151;';

    return `
      <tr${isWarn ? ' class="warn-row"' : ''}>
        <td>${idx + 1}</td>
        <td>${escapeHtml(row.projek)}</td>
        <td>${escapeHtml(row.hse)}</td>
        <td>${escapeHtml(row.acc)}</td>
        <td>${escapeHtml(row.gl)}</td>
        <td>${escapeHtml(row.ba)}</td>
        <td class="right" style="${endBalStyle}">${fmt(balance)}</td>
        <td class="right" style="${revStyle}">${fmt(reversal)}</td>
        <td class="right" style="color: #047857; font-weight: 600;">${fmt(finalBal)}</td>
      </tr>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Project Month-End Balance Dashboard - ${escapeHtml(formattedPeriod)}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'DM Sans', 'Segoe UI', Arial, sans-serif;
      color: #1f2937;
      padding: 24px;
      background: #ffffff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    header {
      background-color: #1e3a5f;
      color: #ffffff;
      padding: 20px 24px;
      border-radius: 8px;
      margin-bottom: 24px;
    }
    header h1 { font-size: 20px; font-weight: 700; margin-bottom: 4px; }
    header p { font-size: 13px; opacity: 0.9; }
    table { width: 100%; border-collapse: collapse; font-size: 11px; }
    thead { display: table-header-group; }
    tfoot { display: table-row-group; }
    th {
      background-color: #1e3a5f;
      color: #ffffff;
      font-weight: 600;
      padding: 10px 6px;
      text-align: left;
    }
    th.right, td.right { text-align: right; }
    td { padding: 8px 6px; border-bottom: 1px solid #e5e7eb; }
    tr { page-break-inside: avoid; break-inside: avoid; }
    tr:nth-child(even) { background-color: #f9fafb; }
    tr.warn-row { background-color: #fef2f2 !important; }
    .totals-row { background-color: #f3f4f6 !important; font-weight: 700; border-top: 2px solid #d1d5db; }
    .signatures {
      margin-top: 60px;
      display: flex;
      justify-content: space-between;
      page-break-inside: avoid;
      break-inside: avoid;
      font-size: 11px;
    }
    .sig-box { width: 220px; text-align: center; }
    .sig-line { border-bottom: 1px solid #374151; height: 48px; margin-bottom: 8px; }
    .sig-label { font-weight: 600; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>
  <header>
    <h1>Project Month-End Balance Dashboard</h1>
    <p>FGV Palm Industries Sdn. Bhd. — Period: ${escapeHtml(formattedPeriod)}</p>
  </header>
  <table>
    <thead>
      <tr>
        <th>No.</th>
        <th>Project</th>
        <th>House Bank</th>
        <th>Account Bank</th>
        <th>GL</th>
        <th>BA</th>
        <th class="right">End Balance</th>
        <th class="right">Auto Reversal</th>
        <th class="right">Final Balance</th>
      </tr>
    </thead>
    <tbody>${rowsHtml}</tbody>
    <tfoot>
      <tr class="totals-row">
        <td colspan="6" class="right">TOTAL</td>
        <td class="right">${fmt(totalBal)}</td>
        <td class="right" style="color: #dc2626;">${fmt(totalRev)}</td>
        <td class="right" style="color: #047857;">${fmt(totalFin)}</td>
      </tr>
    </tfoot>
  </table>
  <div class="signatures">
    <div class="sig-box"><div class="sig-line"></div><div class="sig-label">Prepared by,</div></div>
    <div class="sig-box"><div class="sig-line"></div><div class="sig-label">Verified by,</div></div>
    <div class="sig-box"><div class="sig-line"></div><div class="sig-label">FGV Palm Industries Sdn Bhd</div></div>
  </div>
</body>
</html>`;
}

function triggerPrint() {
  openPrintDocument(buildMonthEndPrintHtml(), 'month-end-print-iframe');
}

// ================= MODULE 2: DAILY CASHFLOW LOGIC =================

let currentDailyTab = 1;

function switchDailyTab(tabIdx) {
  currentDailyTab = tabIdx;
  [1, 2, 3].forEach(i => {
    const page = document.getElementById('daily-page-' + i);
    if (page) page.style.display = tabIdx === i ? 'block' : 'none';
  });
  [1, 2, 3].forEach(i => {
    const btn = document.getElementById('daily-tab-btn-' + i);
    if (btn) btn.className = 'daily-sub-tab ' + (tabIdx === i ? 'active' : '');
  });
}


function changeDailyDateOffset(days) {
  const dateInput = document.getElementById('daily-report-date');
  if (!dateInput) return;
  const curVal = dateInput.value || new Date().toISOString().split('T')[0];
  const parts = curVal.split('-');
  const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  d.setDate(d.getDate() + days);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  dateInput.value = `${yyyy}-${mm}-${dd}`;
  onDailyDateChange();
}

function setDailyDateToday() {
  const dateInput = document.getElementById('daily-report-date');
  if (!dateInput) return;
  dateInput.value = new Date().toISOString().split('T')[0];
  onDailyDateChange();
}

function updateDailyBadge(status, dateStr) {
  const badge = document.getElementById('daily-record-badge');
  if (!badge) return;
  if (status === 'checking') {
    badge.className = 'record-badge checking';
    badge.innerHTML = '<span class="record-badge-dot"></span><span>Menyemak database (' + (dateStr || '') + ')...</span>';
  } else if (status === 'found') {
    badge.className = 'record-badge found';
    badge.innerHTML = '<span class="record-badge-dot"></span><span>Turso: Rekod Sedia Ada (' + (dateStr || '') + ')</span>';
  } else if (status === 'clean') {
    badge.className = 'record-badge clean';
    badge.innerHTML = '<span class="record-badge-dot"></span><span>Tiada Rekod (' + (dateStr || '') + ') — Borang Bersih</span>';
  }
}

function resetDailyScreenToCleanState() {
  isRestoringDaily = true;
  try {
    ['2859', '6476'].forEach(prefix => {
      // 1. Reset top input (bank statement balance) to 0
      const topInp = document.querySelector('.acc-' + prefix + '-top-input');
      if (topInp) topInp.value = 0;

      // 2. Clear all dynamic maturity, add, and less rows
      document.querySelectorAll('.acc-' + prefix + '-maturity-input').forEach(i => i.closest('tr').remove());
      document.querySelectorAll('.acc-' + prefix + '-add-input').forEach(i => i.closest('tr').remove());
      document.querySelectorAll('.acc-' + prefix + '-less-input').forEach(i => i.closest('tr').remove());

      // 3. Reset placement rows to exactly one row with 0
      document.querySelectorAll('.acc-' + prefix + '-place-input').forEach(i => i.closest('tr').remove());
      const addBtnRow = document.getElementById(prefix + '-add-placement-row');
      if (addBtnRow) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td style="padding:6px 10px;"><span>Placement</span></td>
          <td class="text-right" style="padding:6px 10px;"><input type="number" class="row-input acc-${prefix}-place-input" value="0" step="0.01" style="width:100%;"></td>
          <td class="text-center"><button class="text-red-500 font-bold" onclick="removePlacementRow(this)">✕</button></td>
        `;
        addBtnRow.parentNode.insertBefore(tr, addBtnRow);
      }

      // 4. Reset investment rows to default seed
      const invBody = document.getElementById('invest-body-' + prefix);
      if (invBody) {
        invBody.innerHTML = '';
        defaultInvest.forEach(r => createInvestRow(prefix, r));
      }
    });

    // 5. Reset outgoing table back to defaults with 0 and empty dates
    const outBody = document.getElementById('outgoing-body');
    if (outBody) {
      outBody.innerHTML = '';
      outgoingDefaultCategories.forEach(label => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${label}</td>
          <td class="text-right"><input type="number" class="row-input out-input" value="0" step="0.01"></td>
          <td class="text-right"><input type="date" class="row-input" value=""></td>
        `;
        outBody.appendChild(tr);
      });
      const totalTr = document.createElement('tr');
      totalTr.className = 'section-total';
      totalTr.innerHTML = '<td>Total Outgoing</td><td class="text-right" id="out-total">0.00</td><td></td>';
      outBody.appendChild(totalTr);
    }
    recalcDaily();
  } finally {
    isRestoringDaily = false;
  }
}

function buildDailyTables() {
  const wasRestoring = isRestoringDaily;
  isRestoringDaily = true;
  try {
    buildAccountTables('2859', lessItems2859, addItems2859);
    buildAccountTables('6476', lessItems6476, addItems6476);
    buildOutgoingTable();

    // Seed default investments if empty
    ['2859', '6476'].forEach(prefix => {
      const body = document.getElementById('invest-body-' + prefix);
      if (body && body.children.length === 0) {
        defaultInvest.forEach(r => createInvestRow(prefix, r));
      }
    });

    recalcDaily();
  } finally {
    isRestoringDaily = wasRestoring;
  }
}

function buildAccountTables(prefix, lessList, addList) {
  const s1 = document.getElementById('cash-body-' + prefix + '-s1');
  const s2 = document.getElementById('cash-body-' + prefix + '-s2');
  const s3 = document.getElementById('cash-body-' + prefix + '-s3');

  if (!s1 || s1.children.length > 0) return;

  // S1: Bank Position
  s1.innerHTML = `
    <tr>
      <td>Bank Statement Balance</td>
      <td class="text-right"><input type="number" class="row-input acc-${prefix}-top-input" value="0" step="0.01"></td>
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
        <input type="number" class="row-input acc-${prefix}-place-input" value="0" step="0.01" style="width:100%;">
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
  const sel = document.getElementById(prefix + '-maturity-select');
  insertMaturityRow(prefix, sel.value, false);
}
function addCustomMaturityItem(prefix) { insertMaturityRow(prefix, '', true); }

function insertMaturityRow(prefix, label, isCustom) {
  const marker = document.getElementById(prefix + '-maturity-marker');
  const tr = document.createElement('tr');
  const nameCell = isCustom 
    ? '<td style="padding-left:24px"><input type="text" class="row-input" style="width:180px;" placeholder="Custom name"></td>'
    : '<td style="padding-left:24px">' + label + '</td>';
  tr.innerHTML = `
    ${nameCell}
    <td class="text-right"><input type="number" class="row-input acc-${prefix}-maturity-input" value="0" step="0.01"></td>
    <td class="text-center"><button class="text-red-500 font-bold" onclick="this.closest('tr').remove();recalcDaily();">✕</button></td>
  `;
  marker.parentNode.insertBefore(tr, marker);
  recalcDaily();
}

function addAddFromDropdown(prefix) {
  const sel = document.getElementById(prefix + '-add-select');
  insertAddRow(prefix, sel.value, false);
}
function addCustomAddItem(prefix) { insertAddRow(prefix, '', true); }

function insertAddRow(prefix, label, isCustom) {
  const marker = document.getElementById(prefix + '-add-marker');
  const tr = document.createElement('tr');
  const nameCell = isCustom 
    ? '<td style="padding-left:24px"><input type="text" class="row-input" style="width:180px;" placeholder="Custom name"></td>'
    : '<td style="padding-left:24px">' + label + '</td>';

  const isTransferSync = (prefix === '2859' && label === 'Receive from 564212106476') || (prefix === '6476' && label === 'Receive from 564098512859');
  const inputCell = isTransferSync 
    ? `<td class="text-right"><input type="text" class="row-input acc-${prefix}-add-input" value="0" readonly style="background:#f3f4f6;cursor:not-allowed;" data-sync="transfer"></td>`
    : `<td class="text-right"><input type="number" class="row-input acc-${prefix}-add-input" value="0" step="0.01"></td>`;

  tr.innerHTML = `
    ${nameCell}
    ${inputCell}
    <td class="text-center"><button class="text-red-500 font-bold" onclick="this.closest('tr').remove();recalcDaily();">✕</button></td>
  `;
  marker.parentNode.insertBefore(tr, marker);
  recalcDaily();
}

function addLessFromDropdown(prefix) {
  const sel = document.getElementById(prefix + '-less-select');
  insertLessRow(prefix, sel.value, false);
}
function addCustomLessItem(prefix) { insertLessRow(prefix, '', true); }

function insertLessRow(prefix, label, isCustom) {
  const totalRow = document.getElementById(prefix + '-total-deductions-row');
  const tr = document.createElement('tr');
  const nameCell = isCustom 
    ? '<td style="padding-left:24px"><input type="text" class="row-input" style="width:180px;" placeholder="Custom name"></td>'
    : '<td style="padding-left:24px">' + escapeHtml(label) + '</td>';
  tr.innerHTML = `
    ${nameCell}
    <td class="text-right"><input type="number" class="row-input acc-${prefix}-less-input" value="0" step="0.01"></td>
    <td class="text-center"><button class="text-red-500 font-bold" onclick="this.closest('tr').remove();recalcDaily();">✕</button></td>
  `;
  totalRow.parentNode.insertBefore(tr, totalRow);
  recalcDaily();
  return tr;
}

function addPlacementRow(prefix) {
  const addBtnRow = document.getElementById(prefix + '-add-placement-row');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td style="padding:6px 10px;"><span>Placement</span></td>
    <td class="text-right" style="padding:6px 10px;"><input type="number" class="row-input acc-${prefix}-place-input" value="0" step="0.01" style="width:100%;"></td>
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
  const body = document.getElementById('invest-body-' + prefix);
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
    const d1 = parseDate(d1Str);
    const d2 = parseDate(d2Str);
    if (d1 && d2) {
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

// Cross-account transfer sync (MBB 2859 <-> MBB 6476)
function syncAddItemsAcrossTabs() {
  let transferTo6476Input = null;
  let receiveFrom2859Input = null;
  let transferTo2859Input = null;
  let receiveFrom6476Input = null;

  // 2859 Deductions
  document.querySelectorAll('#cash-body-2859-s2 tr').forEach(row => {
    const label = getRowLabel(row);
    const input = row.querySelector('.acc-2859-less-input');
    if (label === 'Transfer to 564212106476' && input) transferTo6476Input = input;
  });

  // 6476 Additions
  document.querySelectorAll('#cash-body-6476-s1 tr').forEach(row => {
    const label = getRowLabel(row);
    const input = row.querySelector('.acc-6476-add-input');
    if (label === 'Receive from 564098512859' && input) receiveFrom2859Input = input;
  });

  // 6476 Deductions
  document.querySelectorAll('#cash-body-6476-s2 tr').forEach(row => {
    const label = getRowLabel(row);
    const input = row.querySelector('.acc-6476-less-input');
    if (label === 'Transfer to 564098512859' && input) transferTo2859Input = input;
  });

  // 2859 Additions
  document.querySelectorAll('#cash-body-2859-s1 tr').forEach(row => {
    const label = getRowLabel(row);
    const input = row.querySelector('.acc-2859-add-input');
    if (label === 'Receive from 564212106476' && input) receiveFrom6476Input = input;
  });

  if (receiveFrom2859Input) {
    receiveFrom2859Input.value = transferTo6476Input ? (parseVal(transferTo6476Input.value) || 0) : 0;
  }
  if (receiveFrom6476Input) {
    receiveFrom6476Input.value = transferTo2859Input ? (parseVal(transferTo2859Input.value) || 0) : 0;
  }
}

// Outgoing payment sync to MBB 2859 Deductions
function syncOutgoingToAccount() {
  const outBody = document.getElementById('outgoing-body');
  if (!outBody) return;
  const outMap = new Map();
  outBody.querySelectorAll('tr').forEach(row => {
    const label = getRowLabel(row);
    const input = row.querySelector('.out-input');
    if (label && input) {
      outMap.set(label, parseVal(input.value));
    }
  });

  document.querySelectorAll('#cash-body-2859-s2 tr').forEach(row => {
    const label = getRowLabel(row);
    if (label && outMap.has(label)) {
      const amountInput = row.querySelector('.acc-2859-less-input');
      if (amountInput) {
        const val = outMap.get(label);
        amountInput.value = val > 0 ? val : 0;
        amountInput.setAttribute('readonly', 'readonly');
        amountInput.style.backgroundColor = '#f3f4f6';
        amountInput.style.cursor = 'not-allowed';
      }
    }
  });
}

function recalcDaily() {
  syncOutgoingToAccount();
  syncAddItemsAcrossTabs();

  ['2859', '6476'].forEach(prefix => {
    // Recalc investments
    const invBody = document.getElementById('invest-body-' + prefix);
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

  if (!isRestoringDaily) {
    triggerDailyAutoSave(1200);
  }
}

function recalcAccountSection(prefix) {
  const topInp = document.querySelector('.acc-' + prefix + '-top-input');
  const topBal = parseVal(topInp?.value || 0);

  const matInps = [...document.querySelectorAll('.acc-' + prefix + '-maturity-input')].map(i => parseVal(i.value));
  const matTot = matInps.reduce((a, b) => a + b, 0);

  const addInps = [...document.querySelectorAll('.acc-' + prefix + '-add-input')].map(i => parseVal(i.value));
  const addTot = addInps.reduce((a, b) => a + b, 0);

  const avail = topBal + matTot + addTot;
  const availEl = document.getElementById(prefix + '-avail-balance');
  if (availEl) availEl.textContent = fmt(avail);

  const lessInps = [...document.querySelectorAll('.acc-' + prefix + '-less-input')].map(i => parseVal(i.value));
  const deductTot = lessInps.reduce((a, b) => a + b, 0);
  const deductEl = document.getElementById(prefix + '-total-deductions');
  if (deductEl) deductEl.textContent = fmt(deductTot);

  const balPlace = avail - deductTot;
  const balPlaceEl = document.getElementById(prefix + '-bal-placement');
  if (balPlaceEl) balPlaceEl.textContent = fmt(balPlace);

  const placeInps = [...document.querySelectorAll('.acc-' + prefix + '-place-input')].map(i => parseVal(i.value));
  const placeTot = placeInps.reduce((a, b) => a + b, 0);

  const netBal = balPlace - placeTot;
  const netEl = document.getElementById(prefix + '-net-balance');
  if (netEl) {
    netEl.textContent = fmt(netBal);
    netEl.style.color = netBal < 0 ? '#ef4444' : '#059669';
  }

  // Update Executive Hero KPI Cards
  const heroAvail = document.getElementById('hero-avail-' + prefix);
  if (heroAvail) heroAvail.textContent = 'RM ' + fmt(avail);

  const heroDeduct = document.getElementById('hero-deduct-' + prefix);
  if (heroDeduct) heroDeduct.textContent = 'RM ' + fmt(deductTot);

  const heroNet = document.getElementById('hero-net-' + prefix);
  if (heroNet) {
    heroNet.textContent = 'RM ' + fmt(netBal);
    if (netBal >= 0) {
      heroNet.classList.remove('text-rose');
      heroNet.classList.add('text-emerald');
    } else {
      heroNet.classList.remove('text-emerald');
      heroNet.classList.add('text-rose');
    }
  }
}

function find2859DeductionRow(label) {
  const target = String(label || '').trim().toLowerCase();
  if (!target) return null;
  let found = null;
  document.querySelectorAll('#cash-body-2859-s2 tr').forEach(tr => {
    if (!found && tr.querySelector('.acc-2859-less-input') && getRowLabel(tr).toLowerCase() === target) {
      found = tr;
    }
  });
  return found;
}

function getReserved2859Labels() {
  const reserved = new Set();
  document.querySelectorAll('#cash-body-2859-s2 tr').forEach(tr => {
    const inp = tr.querySelector('.acc-2859-less-input');
    const lbl = getRowLabel(tr).toLowerCase();
    if (inp && lbl && parseVal(inp.value) > 0) {
      reserved.add(lbl);
    }
  });
  return reserved;
}

function checkUpcomingPayments() {
  const banner = document.getElementById('reminder-banner');
  const list = document.getElementById('reminder-list');
  const dateStr = document.getElementById('daily-report-date')?.value;
  if (!banner || !list || !dateStr) return;

  const curDate = parseDate(dateStr);
  if (!curDate) return;

  const reservedLabels = getReserved2859Labels();
  const dueItems = [];
  document.querySelectorAll('#outgoing-body tr:not(.section-total)').forEach(tr => {
    const cells = tr.querySelectorAll('td');
    if (cells.length >= 3) {
      const label = getRowLabel(tr);
      const amt = parseVal(cells[1].querySelector('input')?.value || 0);
      const dueStr = cells[2].querySelector('input')?.value;
      if (amt > 0 && dueStr && !reservedLabels.has(label.toLowerCase())) {
        const dueDate = parseDate(dueStr);
        if (dueDate) {
          const diffDays = Math.ceil((dueDate - curDate) / 864e5);
          if (diffDays >= 0 && diffDays <= 3) {
            dueItems.push({ label, amt, dueStr, diffDays });
          }
        }
      }
    }
  });

  if (dueItems.length === 0) {
    list.innerHTML = '';
    banner.style.display = 'none';
    return;
  }

  banner.style.display = 'block';
  list.innerHTML = dueItems.map(item => `
    <li>
      <span><strong>${escapeHtml(item.label)}</strong>: RM ${fmt(item.amt)} (Due in ${item.diffDays} day${item.diffDays === 1 ? '' : 's'} on ${escapeHtml(item.dueStr)})</span>
      <button type="button" class="add-btn btn-primary" style="padding:2px 8px;font-size:11px;" data-label="${escapeHtml(item.label)}" data-amt="${item.amt}" onclick="reserveOutgoing(this.dataset.label, parseFloat(this.dataset.amt) || 0)">Reserve in Deductions</button>
    </li>
  `).join('');
}

function reserveOutgoing(label, amt) {
  let targetRow = find2859DeductionRow(label);
  if (!targetRow) {
    targetRow = insertLessRow('2859', label, false);
  }
  const input = targetRow ? targetRow.querySelector('.acc-2859-less-input') : null;
  if (input) {
    input.value = amt;
  }
  recalcDaily();
  showToast(`Reserved ${label} (RM ${fmt(amt)}) in MBB 2859 deductions.`);
}

// ================= DAILY CASHFLOW TURSO SYNC (NO LOCALSTORAGE) =================

function serializeDailyState() {
  const report_date = document.getElementById('daily-report-date')?.value || new Date().toISOString().split('T')[0];
  const serializeAcc = (prefix) => {
    const topBal = parseVal(document.querySelector('.acc-' + prefix + '-top-input')?.value || 0);
    const maturity = [...document.querySelectorAll('.acc-' + prefix + '-maturity-input')].map(i => ({ label: getRowLabel(i.closest('tr')), val: parseVal(i.value) }));
    const add = [...document.querySelectorAll('.acc-' + prefix + '-add-input')].map(i => ({ label: getRowLabel(i.closest('tr')), val: parseVal(i.value) }));
    const less = [...document.querySelectorAll('.acc-' + prefix + '-less-input')].map(i => ({ label: getRowLabel(i.closest('tr')), val: parseVal(i.value) }));
    const place = [...document.querySelectorAll('.acc-' + prefix + '-place-input')].map(i => parseVal(i.value));
    const invest = [];
    document.querySelectorAll('#invest-body-' + prefix + ' tr').forEach(tr => {
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

function triggerDailyAutoSave(delayMs = 1200) {
  if (isRestoringDaily) return;
  isDailyDirty = true;
  const saveBtn = document.getElementById('daily-save-btn');
  if (saveBtn) {
    saveBtn.textContent = '⏳ Menyimpan ke Database Turso...';
    saveBtn.style.backgroundColor = '#f59e0b';
  }
  clearTimeout(dailyAutoSaveTimer);
  dailyAutoSaveTimer = setTimeout(async () => {
    await saveDailyCashflowToTurso(true);
  }, delayMs);
}

async function saveDailyCashflowToTurso(isAutoSave = false) {
  clearTimeout(dailyAutoSaveTimer);
  isSavingDaily = true;
  const saveBtn = document.getElementById('daily-save-btn');
  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.textContent = isAutoSave ? '⏳ Menyimpan ke Database Turso...' : 'Menyimpan Daily Cashflow...';
    saveBtn.style.backgroundColor = isAutoSave ? '#2563eb' : '';
  }

  let state;
  try {
    state = serializeDailyState();
  } catch (err) {
    console.error('Serialization error:', err);
    isSavingDaily = false;
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.textContent = '💾 Save Daily Cashflow to Database';
      saveBtn.style.backgroundColor = '';
    }
    return;
  }

  const dateStr = state.report_date;
  const jsonStr = JSON.stringify(state);

  // NOTE: DIRECT SAVE TO TURSO DATABASE ONLY - NO LOCALSTORAGE
  try {
    const json = await tursoPipeline([
      {
        type: 'execute',
        stmt: {
          sql: `INSERT INTO daily_cashflow (report_date, data_json, updated_at)
                VALUES (?, ?, strftime('%Y-%m-%d %H:%M:%f', 'now'))
                ON CONFLICT(report_date) DO UPDATE SET
                  data_json = excluded.data_json,
                  updated_at = excluded.updated_at;`,
          args: [
            { type: 'text', value: dateStr },
            { type: 'text', value: jsonStr }
          ]
        }
      },
      {
        type: 'execute',
        stmt: {
          sql: 'SELECT updated_at FROM daily_cashflow WHERE report_date = ?;',
          args: [{ type: 'text', value: dateStr }]
        }
      }
    ]);

    if (json) {
      lastDailySyncDate = dateStr;
      lastDailySyncAt = json.results?.[1]?.response?.result?.rows?.[0]?.[0]?.value ?? null;
      isDailyDirty = false;
      const nowTime = new Date().toLocaleTimeString('en-GB');
      updateDailyBadge('found', dateStr);
      if (saveBtn) {
        saveBtn.textContent = isAutoSave ? '✅ Disimpan ke Database (' + nowTime + ')' : '✅ Berjaya Disimpan (' + nowTime + ')!';
        saveBtn.style.backgroundColor = '#059669';
      }
      if (!isAutoSave) {
        showToast('Daily Cashflow bagi ' + dateStr + ' berjaya disimpan ke Database Turso!');
      }
      setTimeout(() => {
        if (saveBtn) {
          saveBtn.disabled = false;
          saveBtn.textContent = '💾 Save Daily Cashflow to Database';
          saveBtn.style.backgroundColor = '';
        }
      }, 2500);
      return;
    }
  } catch (err) {
    if (!isAutoSave) {
      showToast('Gagal simpan ke database: ' + err.message, 'error');
    }
  } finally {
    isSavingDaily = false;
  }

  if (saveBtn) {
    saveBtn.disabled = false;
    saveBtn.textContent = '💾 Save Daily Cashflow to Database';
    saveBtn.style.backgroundColor = '';
  }
}

async function fetchDailyCashflowFromTurso(isSilentSync = false) {
  const dateInput = document.getElementById('daily-report-date');
  const dateStr = dateInput?.value || new Date().toISOString().split('T')[0];

  if (!isSilentSync) {
    isDailyDirty = false;
    updateDailyBadge('checking', dateStr);
    buildDailyTables();
  }

  // DIRECT FETCH FROM TURSO DATABASE ONLY - NO LOCALSTORAGE
  try {
    const json = await tursoPipeline([{
      type: 'execute',
      stmt: {
        sql: 'SELECT data_json, updated_at FROM daily_cashflow WHERE report_date = ?;',
        args: [{ type: 'text', value: dateStr }]
      }
    }]);

    if (json) {
      const currentDateStr = document.getElementById('daily-report-date')?.value || new Date().toISOString().split('T')[0];
      if (currentDateStr !== dateStr) return;
      if (isSilentSync && (isDailyDirty || isSavingDaily || isUserEditingInModule('module-daily-cashflow'))) return;

      const row = json.results?.[0]?.response?.result?.rows?.[0];
      const val = row?.[0]?.value;
      const updatedAt = row?.[1]?.value ?? null;
      if (val) {
        restoreDailyState(JSON.parse(val));
        lastDailySyncDate = dateStr;
        lastDailySyncAt = updatedAt;
        isDailyDirty = false;
        updateDailyBadge('found', dateStr);
        if (isSilentSync) {
          showToast('🔄 Data Daily Cashflow dikemas kini daripada sesi lain.');
        }
        return;
      }

      const hadRemoteRecord = lastDailySyncDate === dateStr && lastDailySyncAt !== null;
      lastDailySyncDate = dateStr;
      lastDailySyncAt = null;
      isDailyDirty = false;
      if (!isSilentSync || hadRemoteRecord) {
        resetDailyScreenToCleanState();
        updateDailyBadge('clean', dateStr);
      }
      return;
    }
  } catch (err) {
    console.warn('Fetch daily from Turso error:', err);
  }

  if (isSilentSync) return;

  // If no record found in database for this date, reset all daily screen data cleanly to 0
  resetDailyScreenToCleanState();
  updateDailyBadge('clean', dateStr);
}

function restoreDailyState(state) {
  if (!state) return;
  isRestoringDaily = true;
  try {
    const restoreAcc = (prefix, accData) => {
      if (!accData) return;
      const topInp = document.querySelector('.acc-' + prefix + '-top-input');
      if (topInp) topInp.value = accData.topBal || 0;

      // Clear dynamic rows
      document.querySelectorAll('.acc-' + prefix + '-maturity-input').forEach(i => i.closest('tr').remove());
      document.querySelectorAll('.acc-' + prefix + '-add-input').forEach(i => i.closest('tr').remove());
      document.querySelectorAll('.acc-' + prefix + '-less-input').forEach(i => i.closest('tr').remove());

      if (Array.isArray(accData.maturity)) {
        accData.maturity.forEach(m => insertMaturityRow(prefix, m.label, false));
        const inps = document.querySelectorAll('.acc-' + prefix + '-maturity-input');
        accData.maturity.forEach((m, idx) => { if (inps[idx]) inps[idx].value = m.val || 0; });
      }

      if (Array.isArray(accData.add)) {
        accData.add.forEach(a => insertAddRow(prefix, a.label, false));
        const inps = document.querySelectorAll('.acc-' + prefix + '-add-input');
        accData.add.forEach((a, idx) => { if (inps[idx]) inps[idx].value = a.val || 0; });
      }

      if (Array.isArray(accData.less)) {
        accData.less.forEach(l => insertLessRow(prefix, l.label, false));
        const inps = document.querySelectorAll('.acc-' + prefix + '-less-input');
        accData.less.forEach((l, idx) => { if (inps[idx]) inps[idx].value = l.val || 0; });
      }

      if (Array.isArray(accData.place)) {
        const getPlaces = () => document.querySelectorAll('.acc-' + prefix + '-place-input');
        while (getPlaces().length < accData.place.length) {
          addPlacementRow(prefix);
        }
        while (getPlaces().length > accData.place.length && getPlaces().length > 0) {
          const list = getPlaces();
          list[list.length - 1].closest('tr').remove();
        }
        const currentPlaces = getPlaces();
        accData.place.forEach((val, idx) => { if (currentPlaces[idx]) currentPlaces[idx].value = val || 0; });
      }

      if (Array.isArray(accData.invest) && accData.invest.length > 0) {
        const invBody = document.getElementById('invest-body-' + prefix);
        if (invBody) invBody.innerHTML = '';
        accData.invest.forEach(r => createInvestRow(prefix, r));
      }
    };

    restoreAcc('2859', state.acc2859);
    restoreAcc('6476', state.acc6476);

    if (Array.isArray(state.outgoing)) {
      const outBody = document.getElementById('outgoing-body');
      if (outBody) {
        outBody.innerHTML = '';
        state.outgoing.forEach(r => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${r.label}</td>
            <td class="text-right"><input type="number" class="row-input out-input" value="${r.amt || 0}" step="0.01"></td>
            <td class="text-right"><input type="date" class="row-input" value="${r.date || ''}"></td>
          `;
          outBody.appendChild(tr);
        });
        const totalTr = document.createElement('tr');
        totalTr.className = 'section-total';
        totalTr.innerHTML = `<td>Total Outgoing</td><td class="text-right" id="out-total">0.00</td><td></td>`;
        outBody.appendChild(totalTr);
      }
    }

    recalcDaily();
  } finally {
    isRestoringDaily = false;
  }
}

function onDailyDateChange() {
  clearTimeout(dailyAutoSaveTimer);
  fetchDailyCashflowFromTurso();
}

function exportDailyPDF() {
  let tab = currentDailyTab || 1;
  const p1 = document.getElementById('daily-page-1');
  const p2 = document.getElementById('daily-page-2');
  const p3 = document.getElementById('daily-page-3');
  if (p1 && p1.style.display !== 'none') {
    tab = 1;
  } else if (p2 && p2.style.display !== 'none') {
    tab = 2;
  } else if (p3 && p3.style.display !== 'none') {
    tab = 3;
  }

  const reportDateRaw = document.getElementById('daily-report-date')?.value || new Date().toISOString().split('T')[0];
  const [year, month, day] = reportDateRaw.split('-');
  const reportDate = `${day}-${month}-${year}`;
  const companyName = "FGV PALM INDUSTRIES SDN BHD";
  const companyReg = "Company No.: 199501030378 (359584-V)";
  const divisionInfo = "Treasury Division";

  let printContent = '';

  if (tab === 1 || tab === 2) {
    const prefix = tab === 1 ? '2859' : '6476';
    const accountNo = tab === 1 ? '564098512859' : '564212106476';

    const availBal = parseVal(document.querySelector('.acc-' + prefix + '-top-input')?.value || '0');

    // Maturity rows
    const maturityInputs = [...document.querySelectorAll('.acc-' + prefix + '-maturity-input')];
    const maturityRows = maturityInputs.map(inp => ({
      label: getRowLabel(inp.closest('tr')),
      value: parseVal(inp.value)
    })).filter(r => r.value !== 0);

    // Add rows
    const addInputs = [...document.querySelectorAll('.acc-' + prefix + '-add-input')];
    const addRows = addInputs.map(inp => ({
      label: getRowLabel(inp.closest('tr')),
      value: parseVal(inp.value)
    })).filter(r => r.value !== 0);

    // Available balance
    const availBalance = parseVal(document.getElementById(prefix + '-avail-balance')?.textContent || '0');

    // Deductions / Less rows
    const lessInputs = [...document.querySelectorAll('.acc-' + prefix + '-less-input')];
    const lessRows = lessInputs.map(inp => ({
      label: getRowLabel(inp.closest('tr')),
      value: parseVal(inp.value)
    })).filter(r => r.value !== 0);

    // Total deductions
    const totalDeductions = parseVal(document.getElementById(prefix + '-total-deductions')?.textContent || '0');

    // Final position
    const balPlacement = parseVal(document.getElementById(prefix + '-bal-placement')?.textContent || '0');
    const placementInputs = [...document.querySelectorAll('.acc-' + prefix + '-place-input')];
    const placementRowsData = placementInputs.map(inp => parseVal(inp.value));
    const netBalance = parseVal(document.getElementById(prefix + '-net-balance')?.textContent || '0');

    // Investments
    const investRows = [];
    document.querySelectorAll('#invest-body-' + prefix + ' tr').forEach(tr => {
      const inputs = tr.querySelectorAll('input');
      const dayText = tr.querySelector('[data-field="day"]')?.textContent || '-';
      const profitText = tr.querySelector('[data-field="profit"]')?.textContent || '0.00';
      const totalText = tr.querySelector('[data-field="total"]')?.textContent || '0.00';
      if (inputs.length >= 7) {
        investRows.push({
          inst: inputs[0].value,
          date: inputs[1].value,
          maturity: inputs[2].value,
          day: dayText,
          rate: inputs[3].value,
          profit: profitText,
          from: inputs[4].value,
          bal: inputs[5].value,
          amt: inputs[6].value,
          total: totalText
        });
      }
    });

    printContent = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Daily Cash Status Report - MBB ${accountNo}</title><style>
      body { font-family: Arial, sans-serif; font-size: 10pt; margin: 24px 32px; color: #1a1a1a; }
      .print-header { text-align: center; margin-bottom: 24px; border-bottom: 2px solid #1e3a5f; padding-bottom: 12px; }
      .print-header h1 { font-size: 13pt; margin: 4px 0; color: #1e3a5f; font-weight: bold; }
      .print-header p { font-size: 9pt; margin: 2px 0; color: #475569; }
      .report-meta { font-size: 9pt; color: #475569; margin-bottom: 20px; }
      .section { margin-bottom: 24px; }
      .section-bar { padding: 4px 0 4px 8px; margin-bottom: 0; border-left: 3px solid #1e3a5f; }
      .section-bar h2 { font-size: 10pt; font-weight: 700; color: #1e3a5f; margin: 0; }
      table { width: 100%; border-collapse: collapse; }
      td { padding: 5px 12px; font-size: 9.5pt; border-bottom: 1px solid #e8ecf0; }
      td.amt { text-align: right; font-variant-numeric: tabular-nums; }
      tr.subtotal td { font-weight: 700; border-top: 1px solid #cbd5e1; border-bottom: 1px solid #cbd5e1; background: #f8fafc; }
      tr.final td { font-weight: 700; border-top: 2px solid #1e3a5f; background: #f0f7ff; font-size: 10pt; }
      tr.no-bold td { font-weight: 400; }
      .indent td:first-child { padding-left: 28px; }
      @media print { body { margin: 16px; } }
    </style></head><body>`;

    printContent += `<div class="print-header"><h1>${companyName}</h1><p>${companyReg}</p><p>${divisionInfo}</p></div>`;
    printContent += `<div class="report-meta"><strong>Daily Cash Status Report</strong> &nbsp;|&nbsp; Account: MBB ${accountNo} &nbsp;|&nbsp; Date: ${reportDate}</div>`;

    // Section 1: Bank Position
    printContent += `<div class="section"><div class="section-bar"><h2>Bank Position</h2></div><table>`;
    printContent += `<tr><td>Bank Statement Balance</td><td class="amt">${fmt(availBal)}</td></tr>`;
    maturityRows.forEach(r => {
      printContent += `<tr class="indent"><td>Maturity: ${r.label}</td><td class="amt">${fmt(r.value)}</td></tr>`;
    });
    addRows.forEach(r => {
      printContent += `<tr class="indent"><td>${r.label}</td><td class="amt">${fmt(r.value)}</td></tr>`;
    });
    printContent += `<tr class="subtotal no-bold"><td>Available Balance</td><td class="amt">${fmt(availBalance)}</td></tr>`;
    printContent += `</table></div>`;

    // Section 2: Deductions
    printContent += `<div class="section"><div class="section-bar"><h2>Deductions</h2></div><table>`;
    lessRows.forEach(r => {
      let label = r.label;
      if (label.startsWith('Transfer to')) label = `Transfer to Account ${label.replace('Transfer to ', '')}`;
      printContent += `<tr class="indent"><td>${label}</td><td class="amt">${fmt(r.value)}</td></tr>`;
    });
    printContent += `<tr class="subtotal no-bold"><td>Total Deductions</td><td class="amt">${fmt(totalDeductions)}</td></tr>`;
    printContent += `</table></div>`;

    // Section 3: Final Position
    printContent += `<div class="section"><div class="section-bar"><h2>Final Position</h2></div><table>`;
    printContent += `<tr class="subtotal no-bold"><td>Balance Available for Placement</td><td class="amt">${fmt(balPlacement)}</td></tr>`;
    placementRowsData.forEach(val => {
      printContent += `<tr><td style="padding-left: 20px;">Placement</td><td class="amt" style="font-weight: normal;">${fmt(val)}</td></tr>`;
    });
    printContent += `<tr class="final"><td>Net Balance</td><td class="amt">${fmt(netBalance)}</td></tr>`;
    printContent += `</table></div>`;

    // Section 4: Investment
    if (investRows.length > 0) {
      printContent += `<div class="section"><div class="section-bar"><h2>Investment</h2></div>`;
      printContent += `<table style="font-size: 8pt;"><thead><tr style="color:#64748b;font-weight:bold;border-bottom:1px solid #cbd5e1;"><th style="padding:4px;text-align:left;">Institution</th><th style="padding:4px;text-align:left;">Date</th><th style="padding:4px;text-align:left;">Maturity</th><th style="padding:4px;text-align:center;">Day</th><th style="padding:4px;text-align:right;">Rate%</th><th style="padding:4px;text-align:right;">Profit</th><th style="padding:4px;text-align:left;">From</th><th style="padding:4px;text-align:right;">Balance</th><th style="padding:4px;text-align:right;">Placement</th><th style="padding:4px;text-align:right;">Total (RM)</th></tr></thead><tbody>`;
      investRows.forEach(r => {
        const formattedAmt = parseVal(r.amt) > 0 ? fmt(parseVal(r.amt)) : (r.amt === '0' || r.amt === 0 ? '0.00' : r.amt);
        printContent += `<tr><td style="padding:4px;">${r.inst}</td><td style="padding:4px;">${r.date}</td><td style="padding:4px;">${r.maturity}</td><td style="padding:4px;text-align:center;">${r.day}</td><td style="padding:4px;text-align:right;">${r.rate}</td><td style="padding:4px;text-align:right;">${r.profit}</td><td style="padding:4px;">${r.from}</td><td style="padding:4px;text-align:right;">${r.bal}</td><td style="padding:4px;text-align:right;">${formattedAmt}</td><td style="padding:4px;text-align:right;">${r.total}</td></tr>`;
      });
      printContent += `</tbody></table></div>`;
    }

    printContent += '</body></html>';

  } else if (tab === 3) {
    printContent = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Expected Outgoing Payment - ${reportDate}</title><style>
      body { font-family: Arial, sans-serif; font-size: 10pt; margin: 24px 32px; color: #1a1a1a; }
      .print-header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #1e3a5f; padding-bottom: 12px; }
      .print-header h1 { font-size: 13pt; margin: 4px 0; color: #1e3a5f; font-weight: bold; }
      .print-header p { font-size: 9pt; margin: 2px 0; color: #475569; }
      table { width: 100%; border-collapse: collapse; }
      th { background: #1e3a5f; color: white; padding: 6px 8px; text-align: left; font-size: 9pt; }
      td { padding: 5px 8px; border-bottom: 1px solid #e8ecf0; font-size: 9.5pt; }
      .total-row { font-weight: 700; background: #f0f7ff; border-top: 2px solid #1e3a5f; }
      @media print { body { margin: 16px; } }
    </style></head><body>`;
    printContent += `<div class="print-header"><h1>${companyName}</h1><p>${companyReg}</p><p>${divisionInfo}</p></div>`;
    printContent += `<p style="font-weight:bold;margin-bottom:10px;font-size:9.5pt;color:#475569;">Expected Outgoing Payment &nbsp;|&nbsp; Date: ${reportDate}</p>`;
    printContent += '<table><thead><tr><th>Outgoing Payment</th><th style="text-align:right;">Amount (RM)</th><th style="text-align:right;">Due Date</th></tr></thead><tbody>';

    const outTable = document.getElementById('table-outgoing');
    if (outTable) {
      outTable.querySelectorAll('tbody tr').forEach(tr => {
        const cells = tr.querySelectorAll('td');
        if (cells.length < 2) return;
        const label = getRowLabel(tr);
        const input = cells[1].querySelector('input');
        const amount = input ? parseVal(input.value) : 0;
        const dateInp = cells[2] ? cells[2].querySelector('input') : null;
        const dueDate = dateInp ? dateInp.value : '';
        const isTotal = tr.classList.contains('section-total');
        if (isTotal) {
          printContent += `<tr class="total-row"><td>${label}</td><td style="text-align:right;">${fmt(amount)}</td><td></td></tr>`;
        } else if (amount !== 0 || dueDate) {
          printContent += `<tr><td>${label}</td><td style="text-align:right;">${fmt(amount)}</td><td style="text-align:right;">${dueDate}</td></tr>`;
        }
      });
    }
    printContent += '</tbody></table></body></html>';
  }

  openPrintDocument(printContent, 'daily-print-iframe');
}

// ================= LIVE AUTO-SYNC (SMART POLLING) =================

function isAnyModalOpen() {
  return ['history-modal', 'paste-modal', 'reset-modal'].some(id => {
    const el = document.getElementById(id);
    return el && !el.classList.contains('hidden');
  });
}

async function checkDailySyncUpdate() {
  if (isSavingDaily || isDailyDirty || isRestoringDaily || isUserEditingInModule('module-daily-cashflow')) return;
  const dateStr = document.getElementById('daily-report-date')?.value || new Date().toISOString().split('T')[0];
  if (lastDailySyncDate !== dateStr) return;

  const json = await tursoPipeline([{
    type: 'execute',
    stmt: {
      sql: 'SELECT updated_at FROM daily_cashflow WHERE report_date = ?;',
      args: [{ type: 'text', value: dateStr }]
    }
  }]);
  if (!json) return;

  const currentDateStr = document.getElementById('daily-report-date')?.value || new Date().toISOString().split('T')[0];
  if (currentDateStr !== dateStr || isSavingDaily || isDailyDirty || isUserEditingInModule('module-daily-cashflow')) return;

  const remoteUpdatedAt = json.results?.[0]?.response?.result?.rows?.[0]?.[0]?.value ?? null;
  if (remoteUpdatedAt !== lastDailySyncAt) {
    await fetchDailyCashflowFromTurso(true);
  }
}

async function checkMonthEndSyncUpdate() {
  if (isSavingMonthEnd || hasUnsavedChanges || isAnyModalOpen() || isUserEditingInModule('module-month-end')) return;
  const period = getSelectedPeriod();
  const periodPrefix = getPeriodPrefix();
  if (lastMonthEndSyncPeriod !== period) return;

  const json = await tursoPipeline([{
    type: 'execute',
    stmt: {
      sql: 'SELECT MAX(updated_at) FROM balances WHERE period = ? OR period LIKE ?;',
      args: [
        { type: 'text', value: period },
        { type: 'text', value: periodPrefix + '%' }
      ]
    }
  }]);
  if (!json) return;

  if (getSelectedPeriod() !== period || isSavingMonthEnd || hasUnsavedChanges || isAnyModalOpen() || isUserEditingInModule('module-month-end')) return;

  const remoteUpdatedAt = json.results?.[0]?.response?.result?.rows?.[0]?.[0]?.value ?? null;
  if (remoteUpdatedAt !== lastMonthEndSyncAt) {
    await fetchBalances(true);
  }
}

async function runLiveSyncCheck() {
  if (isSyncChecking) return;
  if (document.visibilityState !== 'visible') return;
  if (!sessionStorage.getItem('fpi_treasury_token')) return;

  isSyncChecking = true;
  try {
    if (currentPortalModule === 'daily-cashflow') {
      await checkDailySyncUpdate();
    } else if (currentPortalModule === 'month-end') {
      await checkMonthEndSyncUpdate();
    }
  } catch (err) {
    console.warn('Live sync check error:', err);
  } finally {
    isSyncChecking = false;
  }
}

function startLiveSync() {
  stopLiveSync();
  liveSyncTimer = setInterval(runLiveSyncCheck, LIVE_SYNC_INTERVAL_MS);
}

function stopLiveSync() {
  if (liveSyncTimer) {
    clearInterval(liveSyncTimer);
    liveSyncTimer = null;
  }
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && sessionStorage.getItem('fpi_treasury_token')) {
    runLiveSyncCheck();
  }
});

// Global Event Listeners for Daily Cashflow auto-recalc and auto-save
document.addEventListener('input', (e) => {
  if (e.target.closest('#module-daily-cashflow')) {
    recalcDaily();
  }
});

document.addEventListener('change', (e) => {
  if (e.target.closest('#module-daily-cashflow') && e.target.id !== 'daily-report-date') {
    recalcDaily();
  }
});

// Initial check on page load
window.addEventListener('DOMContentLoaded', () => {
  checkExistingAuth();
});
