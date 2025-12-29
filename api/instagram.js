import axios from 'axios';

export default async function handler(req, res) {
  try {
    // 1. Get Token from Environment Variable
    // Note: In Vercel, you must add VITE_INSTAGRAM_ACCESS_TOKEN in the Project Settings > Environment Variables
    const token = process.env.VITE_INSTAGRAM_ACCESS_TOKEN;

    if (!token) {
      return res.status(500).json({ error: 'Instagram Access Token is not configured' });
    }

    // 2. Set Caching Headers (Server-Side Caching)
    // s-maxage=3600: Cache in Vercel's CDN for 1 hour
    // stale-while-revalidate=600: Serve stale content for up to 10 mins while fetching new data in background
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=600');

    // 3. Fetch Data from Instagram
    const response = await axios.get(`https://graph.instagram.com/me/media`, {
      params: {
        fields: 'id,caption,media_type,media_url,permalink,thumbnail_url',
        access_token: token,
        limit: 12
      }
    });

    // 4. Return Data
    res.status(200).json({ data: response.data.data });

  } catch (error) {
    console.error('Instagram API Error:', error.response?.data || error.message);
    
    // Handle Token Expiry specifically
    if (error.response?.data?.error?.code === 190) {
       return res.status(401).json({ error: 'Instagram Token Expired. Please refresh it in Vercel Dashboard.' });
    }

    res.status(500).json({ error: 'Failed to fetch Instagram posts' });
  }
}
