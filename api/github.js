export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { username = 'h4yme' } = req.query;

  try {
    const response = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }
    const html = await response.text();
    
    // Parse total
    const totalMatch = html.match(/<h2[^>]*>\s*([\d,]+)\s*contributions/i);
    const total = totalMatch ? parseInt(totalMatch[1].replace(/,/g, '')) : 0;
    
    // Parse days
    const matches = [...html.matchAll(/<td[^>]*data-date="([^"]+)"[^>]*data-level="([^"]+)"[^>]*>/g)];
    const days = matches.map(m => ({ date: m[1], intensity: m[2] }));
    
    // Sort chronologically
    days.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    res.status(200).json({ total, contributions: days });
  } catch (error) {
    console.error('API Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch GitHub data' });
  }
}
