/**
 * FGV Palm Industries Sdn. Bhd.
 * Treasury Month-End Balance Dashboard - Client Application
 */

let projectsData = [];
let hasUnsavedChanges = false;

// Format numbers as Malaysian Ringgit currency (e.g. 12,345.67)
function fmt(val) {
  const num = Number(val) || 0;
  return num.toLocaleString('en-MY', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Auto Reversal formula: if balance > 10,000, round up excess to nearest 1,000
function calcReversal(b) {
  if (b <= 10000) return 0;
  return Math.ceil((b - 10000) / 1000) * 1000;
}

// Show Toast Notification
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

  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    const data = await res.json();

    if (res.ok && data.success) {
      sessionStorage.setItem('fpi_treasury_token', data.token);
      document.getElementById('lock-screen').style.display = 'none';
      document.getElementById('dashboard-app').style.display = 'block';
      fetchBalances();
    } else {
      passwordInput.classList.add('error');
      lockError.textContent = data.error || 'Incorrect password. Please try again.';
      lockError.style.display = 'block';
    }
  } catch (err) {
    // If running completely offline or without /api/auth endpoint
    if (password === '#Treasury26') {
      sessionStorage.setItem('fpi_treasury_token', 'offline-session');
      document.getElementById('lock-screen').style.display = 'none';
      document.getElementById('dashboard-app').style.display = 'block';
      fetchBalances();
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

function handleLogout() {
  sessionStorage.removeItem('fpi_treasury_token');
  document.getElementById('dashboard-app').style.display = 'none';
  document.getElementById('lock-screen').style.display = 'flex';
  document.getElementById('password-input').value = '';
}

function checkExistingAuth() {
  const token = sessionStorage.getItem('fpi_treasury_token');
  if (token) {
    document.getElementById('lock-screen').style.display = 'none';
    document.getElementById('dashboard-app').style.display = 'block';
    fetchBalances();
  }
}

// ================= DATA FETCHING & TURSO SYNC =================

async function fetchBalances() {
  const period = document.getElementById('period-picker').value || '2026-06-30';
  updatePeriodDisplay(period);

  const tursoBadge = document.getElementById('turso-status');
  const tursoDot = document.getElementById('turso-dot');
  const tursoText = document.getElementById('turso-text');

  try {
    const token = sessionStorage.getItem('fpi_treasury_token');
    const res = await fetch(`/api/balances?period=${period}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const result = await res.json();

    if (result.success && Array.isArray(result.data)) {
      projectsData = result.data;

      if (result.isTursoConnected) {
        tursoDot.className = 'status-dot';
        tursoText.textContent = 'Turso Connected';
        tursoBadge.title = 'Live sync active with Turso cloud database';
      } else {
        tursoDot.className = 'status-dot offline';
        tursoText.textContent = 'Demo Mode (Local)';
        tursoBadge.title = result.warning || 'Turso environment variables not yet configured in Netlify.';
      }
    } else {
      throw new Error(result.error || 'Failed to load data');
    }
  } catch (err) {
    console.warn('Using local fallback data:', err);
    tursoDot.className = 'status-dot offline';
    tursoText.textContent = 'Offline Mode';
  }

  renderTable();
}

async function saveToTurso() {
  const period = document.getElementById('period-picker').value || '2026-06-30';
  const saveBtn = document.getElementById('save-btn');
  saveBtn.disabled = true;
  saveBtn.textContent = 'Saving to Turso...';

  const items = projectsData.map(p => ({
    ba: p.ba,
    balance: Number(p.balance) || 0
  }));

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
      hasUnsavedChanges = false;
      saveBtn.textContent = 'Saved to Turso!';
      saveBtn.style.backgroundColor = '#059669';
      showToast('All 71 project balances successfully saved to Turso database!');
      setTimeout(() => {
        saveBtn.disabled = false;
        saveBtn.textContent = '💾 Save to Turso';
      }, 2500);
    } else {
      throw new Error(result.error || 'Save failed');
    }
  } catch (err) {
    showToast('Failed to save to Turso: ' + err.message, 'error');
    saveBtn.disabled = false;
    saveBtn.textContent = '💾 Save to Turso';
  }
}

function markUnsaved() {
  hasUnsavedChanges = true;
  const saveBtn = document.getElementById('save-btn');
  saveBtn.textContent = '💾 Save to Turso (Unsaved changes)';
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

// ================= TABLE RENDERING & EDITING =================

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
    // Search filter across project name, BA, account, or house bank
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

  // Update Summary KPI Cards
  document.getElementById('kpi-total-balance').textContent = 'RM ' + fmt(totalBal);
  document.getElementById('kpi-total-reversal').textContent = 'RM ' + fmt(totalRev);
  document.getElementById('kpi-total-final').textContent = 'RM ' + fmt(totalFin);
  document.getElementById('kpi-threshold-count').textContent = `${warnCount} / ${projectsData.length}`;

  // Update Table Footers
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

  // Check if paste data contains 4-digit BA codes + numbers
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
    // Match directly by Business Area code
    let matchedCount = 0;
    projectsData.forEach(p => {
      if (parsedMap.has(p.ba)) {
        p.balance = parsedMap.get(p.ba);
        matchedCount++;
      }
    });
    showToast(`Matched and updated ${matchedCount} projects by BA code.`);
  } else {
    // Sequential matching in BA-sorted order
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

// Initial check on load
window.addEventListener('DOMContentLoaded', () => {
  checkExistingAuth();
});
