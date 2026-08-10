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
    const response = await fetch(`https://github-contributions.vercel.app/api/v1/${username}`);
    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('API Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch GitHub data' });
  }
}
