# FGV Palm Industries — Treasury Month-End Balance Dashboard

A fast, cloud-connected Treasury Management dashboard for **FGV Palm Industries Sdn. Bhd.** to track month-end bank balances, calculate auto-reversals, and sync with SAP data.

Built with **HTML5/Vanilla JS**, **Netlify Serverless Functions**, and **Turso (libSQL/SQLite)** with **$0/month hosting & database cost**.

---

## 🚀 Key Features

* **🔒 Password-Protected Gate**: Access secured with password `#Treasury26` before rendering any financial data.
* **💾 Cloud Persistence with Turso**: All edits, resets, and SAP pasted balances are stored permanently in a serverless Turso SQLite database.
* **⚡ 100% Zero-Cost Architecture**: Runs on the Free tier of Netlify + Free tier of Turso (9GB storage, 1B reads/month).
* **📋 SAP Integration**: Paste multi-line raw tabular data from SAP; auto-matches by 4-digit Business Area (BA) code or sequential row order.
* **📊 Auto-Reversal Calculation**:
  $$\text{Reversal} = \begin{cases} 0 & \text{if balance } \le 10,000 \\ \lceil\frac{\text{balance} - 10,000}{1,000}\rceil \times 1,000 & \text{if balance } > 10,000 \end{cases}$$
* **🖨️ Export PDF Ready**: Clean print styling with corporate headers and signature endorsement boxes.
* **📅 Historical Reporting**: Balances are recorded per reporting period (`YYYY-MM-DD`).

---

## 🛠️ Step 1: Create Your Free Turso Database (2 Minutes)

1. Sign up for free at **[turso.tech](https://turso.tech)**.
2. Install the Turso CLI (optional, or use the web dashboard):
   ```bash
   # Windows PowerShell
   irm https://get.tur.so/install.ps1 | iex
   ```
3. Login and create a database:
   ```bash
   turso auth signup
   turso db create fpi-treasury
   ```
4. Retrieve your Database URL and Auth Token:
   ```bash
   turso db show fpi-treasury --url
   # Output: libsql://fpi-treasury-yourusername.turso.io

   turso db tokens create fpi-treasury
   # Output: eyJhbGciOiJFZERTQ... (long JWT token)
   ```

---

## 🌐 Step 2: Deploy to Netlify ($0 Free)

### Option A: Via GitHub (Recommended)
1. Push this folder to a GitHub repository.
2. Go to **[Netlify](https://app.netlify.com)** and click **"Add new site" > "Import an existing project"**.
3. Select your GitHub repository.
4. Netlify will automatically detect the settings from `netlify.toml`:
   * **Publish directory**: `public`
   * **Functions directory**: `netlify/functions`
5. Click **"Site configuration" > "Environment variables"** and add:
   * `TURSO_DATABASE_URL`: Your `libsql://...` database URL.
   * `TURSO_AUTH_TOKEN`: Your Turso JWT auth token.
   * `APP_PASSWORD`: `#Treasury26` (or any custom password).
6. Click **Deploy**. Your live URL (e.g. `https://fpi-treasury.netlify.app`) is active immediately!

### Option B: Via Netlify CLI
```bash
# In this directory
npm install -g netlify-cli
npm install

# Login to Netlify
netlify login

# Deploy directly
netlify deploy --prod
```

---

## 💻 Local Testing & Development

You can run the app locally with full serverless functions:

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file and fill in your Turso credentials
copy .env.example .env

# 3. Start local development server
npx netlify dev
```
Open [http://localhost:8888](http://localhost:8888) in your browser.

> **Note**: Even without configuring Turso credentials, the dashboard will open in **Demo/Local Mode** so you can preview the interface and test formulas immediately.

---

## 📁 File Structure

```text
fpitreasury/
├── netlify.toml                        # Netlify configuration & API rewrites
├── package.json                        # Dependencies (@libsql/client)
├── .env.example                        # Template for environment variables
├── netlify/
│   └── functions/
│       ├── auth.js                     # Password verification & session handler
│       ├── balances.js                 # Turso auto-migration, GET & POST
│       └── defaultProjects.js          # Master data for 71 FGV projects
├── public/
│   ├── index.html                      # Modern dashboard & login gate UI
│   ├── style.css                       # Responsive layout & print stylesheet
│   └── app.js                          # State management, SAP parser & calculations
└── README.md                           # Documentation
```
