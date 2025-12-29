import axios from 'axios';

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const PROJECT_ID = process.env.VERCEL_PROJECT_ID;
const TEAM_ID = process.env.VERCEL_ORG_ID; // Optional, for teams

const api = axios.create({
  baseURL: 'https://api.vercel.com',
  headers: {
    Authorization: `Bearer ${VERCEL_TOKEN}`,
  },
  params: {
    teamId: TEAM_ID,
  },
});

async function main() {
  try {
    console.log('1. Fetching current environment variables from Vercel...');
    const envResponse = await api.get(`/v9/projects/${PROJECT_ID}/env`);
    
    const envVar = envResponse.data.envs.find(
      (e) => e.key === 'VITE_INSTAGRAM_ACCESS_TOKEN' && e.target.includes('production')
    );

    if (!envVar) {
      throw new Error('VITE_INSTAGRAM_ACCESS_TOKEN not found in Vercel Production Environment');
    }

    const currentToken = envVar.value;
    console.log('Current Token found (masked):', currentToken.substring(0, 10) + '...');

    console.log('2. Refreshing token with Instagram...');
    const refreshResponse = await axios.get('https://graph.instagram.com/refresh_access_token', {
      params: {
        grant_type: 'ig_refresh_token',
        access_token: currentToken,
      },
    });

    const newToken = refreshResponse.data.access_token;
    console.log('Token refreshed successfully!');

    console.log('3. Updating Vercel Environment Variable...');
    await api.patch(`/v9/projects/${PROJECT_ID}/env/${envVar.id}`, {
      value: newToken,
    });
    console.log('Vercel Env Var updated.');

    console.log('4. Triggering Redeploy to apply changes...');
    // To redeploy, we create a new deployment with the same configuration
    // Note: This is a simplified redeploy trigger. 
    // For a simpler approach, we can just update the env var and let the user know 
    // that the NEXT deployment will pick it up. 
    // However, to be fully automated, we should trigger a deploy.
    // Using the Vercel Deploy Hook is often safer/easier than the API for this specific step,
    // but let's try the API force build if possible, or just leave it.
    //
    // Actually, updating the Env Var DOES NOT automatically redeploy.
    // The safest way without complex API calls is to use a Deploy Hook URL.
    
    if (process.env.VERCEL_DEPLOY_HOOK_URL) {
        console.log('Triggering Deploy Hook...');
        await axios.post(process.env.VERCEL_DEPLOY_HOOK_URL);
        console.log('Redeploy triggered.');
    } else {
        console.log('Skipping redeploy (VERCEL_DEPLOY_HOOK_URL not provided).');
        console.log('IMPORTANT: The new token will only be used after the next deployment.');
    }

  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

main();
