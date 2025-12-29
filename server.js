import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = 3001;

// ESM fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

const TOKEN_FILE = path.join(__dirname, 'instagram_token.json');

// Initialize token file if it doesn't exist
const initializeToken = async () => {
  try {
    await fs.access(TOKEN_FILE);
  } catch {
    if (process.env.VITE_INSTAGRAM_ACCESS_TOKEN) {
      await fs.writeFile(TOKEN_FILE, JSON.stringify({
        access_token: process.env.VITE_INSTAGRAM_ACCESS_TOKEN,
        last_updated: Date.now()
      }));
      console.log('Initialized token file from .env');
    } else {
      console.warn('No VITE_INSTAGRAM_ACCESS_TOKEN found in .env');
    }
  }
};

// Helper to get current token
const getToken = async () => {
  try {
    const data = await fs.readFile(TOKEN_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};

// Helper to save new token
const saveToken = async (newToken) => {
  await fs.writeFile(TOKEN_FILE, JSON.stringify({
    access_token: newToken,
    last_updated: Date.now()
  }));
  console.log('Token refreshed and saved.');
};

// Cache storage
let cache = {
  data: null,
  timestamp: 0
};

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

app.get('/api/instagram', async (req, res) => {
  try {
    // 1. Check Cache
    const now = Date.now();
    if (cache.data && (now - cache.timestamp < CACHE_DURATION)) {
      console.log('Serving from cache');
      return res.json({ data: cache.data });
    }

    // 2. Get Token
    let tokenData = await getToken();
    if (!tokenData) {
      return res.status(500).json({ error: 'No access token available' });
    }

    // 3. Check Token Expiry & Refresh if needed (Refresh if older than 24 hours)
    // Note: Long-lived tokens last 60 days. We refresh every week to be safe.
    const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
    if (now - tokenData.last_updated > ONE_WEEK) {
      try {
        console.log('Refreshing token...');
        const refreshResponse = await axios.get(`https://graph.instagram.com/refresh_access_token`, {
          params: {
            grant_type: 'ig_refresh_token',
            access_token: tokenData.access_token
          }
        });
        
        const newToken = refreshResponse.data.access_token;
        await saveToken(newToken);
        tokenData.access_token = newToken; // Update local var for immediate use
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError.response?.data || refreshError.message);
        // Continue with old token if refresh fails, it might still be valid
      }
    }

    // 4. Fetch Data from Instagram
    console.log('Fetching from Instagram API...');
    const response = await axios.get(`https://graph.instagram.com/me/media`, {
      params: {
        fields: 'id,caption,media_type,media_url,permalink,thumbnail_url',
        access_token: tokenData.access_token,
        limit: 12
      }
    });

    // 5. Update Cache
    cache.data = response.data.data;
    cache.timestamp = now;

    res.json({ data: cache.data });

  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch Instagram posts' });
  }
});

// Start server
initializeToken().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
