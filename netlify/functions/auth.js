import crypto from 'node:crypto';

export async function handler(event) {
  // CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { password } = JSON.parse(event.body || '{}');
    const expectedPassword = process.env.APP_PASSWORD || '#Treasury26';

    if (!password || password !== expectedPassword) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ success: false, error: 'Invalid password. Please try again.' })
      };
    }

    // Generate a simple signature/token valid for 30 days
    const secret = process.env.SESSION_SECRET || expectedPassword;
    const timestamp = Date.now();
    const hash = crypto.createHmac('sha256', secret).update(`fpi-treasury-${timestamp}`).digest('hex');
    const token = `${timestamp}.${hash}`;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        token,
        message: 'Authenticated successfully'
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error: ' + err.message })
    };
  }
}
