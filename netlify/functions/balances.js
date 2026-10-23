import { createClient } from '@libsql/client';
import { DEFAULT_PROJECTS } from './defaultProjects.js';

let dbInitialized = false;

function getDbClient() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    return null;
  }

  return createClient({ url, authToken });
}

async function ensureTables(client) {
  if (dbInitialized) return;

  await client.batch([
    `CREATE TABLE IF NOT EXISTS projects (
      ba TEXT PRIMARY KEY,
      bil INTEGER,
      projek TEXT NOT NULL,
      hse TEXT,
      acc TEXT,
      gl TEXT,
      default_balance REAL DEFAULT 0
    );`,
    `CREATE TABLE IF NOT EXISTS balances (
      period TEXT NOT NULL,
      ba TEXT NOT NULL,
      balance REAL NOT NULL,
      updated_at TEXT DEFAULT (datetime('now')),
      PRIMARY KEY (period, ba),
      FOREIGN KEY (ba) REFERENCES projects (ba)
    );`,
    `CREATE TABLE IF NOT EXISTS daily_cashflow (
      report_date TEXT PRIMARY KEY,
      data_json TEXT NOT NULL,
      updated_at TEXT DEFAULT (datetime('now'))
    );`,
    `CREATE TABLE IF NOT EXISTS balances_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      period TEXT NOT NULL,
      ba TEXT NOT NULL,
      balance REAL NOT NULL,
      archived_at TEXT DEFAULT (datetime('now')),
      version INTEGER DEFAULT 1
    );`
  ]);

  // Check if projects table needs seeding
  const countRes = await client.execute('SELECT COUNT(*) as count FROM projects;');
  const count = Number(countRes.rows[0].count);

  if (count === 0) {
    const insertStatements = DEFAULT_PROJECTS.map(p => ({
      sql: `INSERT OR REPLACE INTO projects (ba, bil, projek, hse, acc, gl, default_balance)
            VALUES (?, ?, ?, ?, ?, ?, ?);`,
      args: [p.ba, p.bil, p.projek, p.hse, p.acc, p.gl, p.balance]
    }));
    await client.batch(insertStatements);
  }

  dbInitialized = true;
}

export async function handler(event) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers };
  }

  const client = getDbClient();

  // If Turso is not yet configured, return default projects in fallback mode
  if (!client) {
    if (event.httpMethod === 'GET') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          isTursoConnected: false,
          warning: 'Turso environment variables not configured. Displaying default template data.',
          data: DEFAULT_PROJECTS
        })
      };
    } else {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          isTursoConnected: false,
          warning: 'Turso credentials not configured. Changes saved in browser memory only.'
        })
      };
    }
  }

  try {
    await ensureTables(client);

    if (event.httpMethod === 'GET') {
      const period = event.queryStringParameters?.period || '2026-06-30';

      const query = `
        SELECT 
          p.bil, 
          p.projek, 
          p.hse, 
          p.acc, 
          p.gl, 
          p.ba, 
          COALESCE(b.balance, p.default_balance) AS balance,
          b.updated_at
        FROM projects p
        LEFT JOIN balances b ON p.ba = b.ba AND b.period = ?
        ORDER BY p.bil ASC;
      `;

      const result = await client.execute({ sql: query, args: [period] });
      const rows = result.rows.map(r => ({
        bil: Number(r.bil),
        projek: String(r.projek),
        hse: String(r.hse || ''),
        acc: String(r.acc || ''),
        gl: String(r.gl || ''),
        ba: String(r.ba),
        balance: Number(r.balance),
        updatedAt: r.updated_at
      }));

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          isTursoConnected: true,
          period,
          data: rows
        })
      };
    }

    if (event.httpMethod === 'POST') {
      const payload = JSON.parse(event.body || '{}');
      const period = payload.period || '2026-06-30';
      const items = payload.items || [];

      if (!Array.isArray(items) || items.length === 0) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, error: 'No items provided to update.' })
        };
      }

      const upsertStatements = items.map(item => ({
        sql: `INSERT INTO balances (period, ba, balance, updated_at)
              VALUES (?, ?, ?, datetime('now'))
              ON CONFLICT(period, ba) DO UPDATE SET
                balance = excluded.balance,
                updated_at = excluded.updated_at;`,
        args: [period, String(item.ba), Number(item.balance) || 0]
      }));

      // Execute batch in chunks of 50 to stay within libSQL payload sizes
      const chunkSize = 50;
      for (let i = 0; i < upsertStatements.length; i += chunkSize) {
        const chunk = upsertStatements.slice(i, i + chunkSize);
        await client.batch(chunk);
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          isTursoConnected: true,
          message: `Successfully saved ${items.length} project balances to Turso.`,
          period
        })
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Database error: ' + err.message
      })
    };
  }
}
