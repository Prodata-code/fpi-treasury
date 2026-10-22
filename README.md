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

## 🛠️ Step 1: Turso Database Setup

1. Database is connected at:
   `libsql://fpi-treasury-makankari.aws-ap-northeast-1.turso.io`
2. Tables `projects` and `balances` are already created and pre-seeded with all 71 FGV Palm Industries project records.

---

## 🌐 Step 2: Testing & Production Deployment ($0 Free)

### 🧪 Option A: Instant Testing on GitHub Pages (Unlimited & Free)
1. In your GitHub repository, ensure **Settings > Pages** is set to:
   * **Source**: `Deploy from a branch`
   * **Branch**: `main`, Folder: `/ (root)`
2. Visit your live testing link:
   👉 **`https://prodata-code.github.io/fpi-treasury/`**
3. Test editing balances, pasting from SAP, and saving to Turso with zero build credit usage!

---

### 🚀 Option B: Production Deployment on Netlify (When Ready for Team)
1. Go to **[Netlify](https://app.netlify.com)** and click **"Add new site" > "Import an existing project"**.
2. Select your GitHub repository (`Prodata-code/fpi-treasury`).
3. Netlify automatically reads `netlify.toml` (`publish = "."` and `functions = "netlify/functions"`).
4. In **"Site configuration" > "Environment variables"**, add:
   * `TURSO_DATABASE_URL`: `libsql://fpi-treasury-makankari.aws-ap-northeast-1.turso.io`
   * `TURSO_AUTH_TOKEN`: Your Turso JWT auth token.
   * `APP_PASSWORD`: `#Treasury26`
5. Click **Deploy**. Your official production site is live!

---

## 💻 Local Testing & Development

You can run the app locally with full serverless functions:

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npx netlify dev
```
Open [http://localhost:8888](http://localhost:8888) in your browser.

---

## 📁 File Structure

```text
fpitreasury/
├── index.html                          # Modern dashboard & login gate UI (Root for GitHub Pages)
├── style.css                           # Responsive layout & print stylesheet
├── app.js                              # Hybrid state management, Turso sync & SAP parser
├── netlify.toml                        # Netlify configuration & API rewrites
├── package.json                        # Dependencies (@libsql/client)
├── .env                                # Local secrets (Turso URL & Token - Git ignored)
├── .env.example                        # Template for environment variables
├── netlify/
│   └── functions/
│       ├── auth.js                     # Password verification & session handler
│       ├── balances.js                 # Turso auto-migration, GET & POST
│       └── defaultProjects.js          # Master data for 71 FGV projects
└── README.md                           # Documentation
```
