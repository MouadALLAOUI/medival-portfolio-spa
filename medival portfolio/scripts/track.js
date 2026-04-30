import GET_ENV from "../env.js";

const env = GET_ENV();

/**
 * Track a page visit by sending data to your API.
 * @param {string} ip - Visitor IP
 * @param {string} agent - User agent
 * @param {string} page - Current page URL
 * @param {string} referrer - Referrer URL
 * @param {string} time - Timestamp
 */
async function TrackMe(ip, agent, page, referrer, time) {
  try {
    const response = await fetch(`${env.API_URL}/track.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': `${env.API_KEY}` // must match PHP exactly
      },
      body: JSON.stringify({ ip, agent, page, referrer, time })
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    console.log('✅ Tracking Response:', data);
  } catch (error) {
    console.error('❌ Tracking Error:', error);
  }
}

export default TrackMe;
