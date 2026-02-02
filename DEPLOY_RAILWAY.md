# Railway Deployment Guide for TriviaBot

## Quick Deploy to Railway

### Prerequisites
- A Railway account (https://railway.app)
- A Discord Bot token
- A GitHub repository with the TriviaBot code

### Step-by-Step Deployment

#### 1. Connect Your GitHub Repository to Railway
1. Go to [Railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway to access your GitHub account
5. Select the TriviaBot repository

#### 2. Configure Environment Variables
After connecting your repository, Railway will automatically detect the project. Add the following environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `BOT_TOKEN` | Your Discord Bot token | ✅ Yes |
| `PREFIX` | Bot prefix (default: `trivia `) | ❌ No |
| `DEBUG` | Enable debug mode (true/false) | ❌ No |
| `DISCORD_SHARD_COUNT` | Number of shards for the bot | ❌ No |
| `DATABASE_URL` | Custom database URL | ❌ No |

**The environment variables automatically override settings in config.json.**

**To add environment variables:**
1. Go to your Railway project
2. Click on the service (should auto-name based on repo)
3. Go to "Variables" tab
4. Add each variable and its value

Example:
```
BOT_TOKEN = xoxb-123456789...
PREFIX = trivia 
DEBUG = false
```

#### 3. Configure bot settings
1. Rename `config.example.json` to `config.json`
2. Update with your bot token and settings
3. Commit and push to GitHub

```json
{
  "token": "YOUR_DISCORD_BOT_TOKEN",
  "prefix": "trivia ",
  "no-commands": false,
  "status": "Playing trivia! Use 'trivia play'",
  "debug": false
}
```

#### 4. Deploy
- Railway automatically deploys when you push to your repository
- View deployment logs in the Railway dashboard
- Check the "Logs" tab for errors

### Environment Variable Reference

**Required:**
- `BOT_TOKEN` - Your Discord Bot Token (get from [Discord Developer Portal](https://discord.com/developers/applications))

**Optional:**
- `DISCORD_SHARD_COUNT` - Number of shards for the bot (default: auto)
- `DISCORD_MAX_CONCURRENCY` - Max concurrency (default: 1)
- `DEBUG` - Enable debug mode (true/false)

### Connecting Your Database

#### Using Railway PostgreSQL Plugin (Optional)
1. In your Railway project, click "Add Plugin"
2. Select "PostgreSQL"
3. Railway will automatically create `DATABASE_URL`
4. The bot will use it automatically

### Monitoring

**View Logs:**
- Dashboard → Your Project → Logs tab
- Monitor for errors and connection issues

**Check Bot Status:**
- Invite your bot to a test Discord server
- Run `trivia help` to verify it's working

### Troubleshooting

**Bot doesn't respond to commands (no slash commands):**
- This bot uses **prefix commands**, not slash commands
- Commands format: `trivia play`, `trivia help`, `trivia categories`, `trivia stop`
- Check that "Message Content Intent" is **enabled** in Discord Developer Portal
- Make sure the prefix is correct in your config (default: `trivia `)
- Verify bot has "Send Messages" permission in the channel

**Bot doesn't respond:**
- Check bot token is correct in environment variables
- Verify bot has permissions in Discord server (Send Messages, Read Messages, Message Content Intent)
- Check logs for errors

**Deployment fails:**
- Review Railway logs for detailed error messages
- Ensure package.json has correct format
- Verify all dependencies are listed

**Bot goes offline:**
- Check Railway resource usage (CPU/Memory)
- Railway may restart service if out of resources
- Upgrade plan if needed

### Scaling

Railway provides different pricing tiers. For TriviaBot:
- **Free tier**: Good for testing and small servers
- **Pro tier**: Better for production with higher uptime

To scale:
1. Go to Railway project settings
2. Choose appropriate plan
3. Allocate resources as needed

### Update Bot Code

1. Make changes to your GitHub repository
2. Commit and push: `git push origin main`
3. Railway automatically redeploys
4. Check logs to verify deployment

### Rolling Back

If deployment fails:
1. Go to Deployments tab in Railway
2. Click on a previous successful deployment
3. Click "Redeploy" to rollback

### Cost Estimation

Railroad's free tier includes:
- 500 GB-hours per month (sufficient for bot running 24/7)
- Monitor usage in project settings

### Support

For issues with:
- **TriviaBot**: Check [GitHub Issues](https://github.com/LakeYS/Discord-Trivia-Bot/issues)
- **Railway**: Visit [Railway Docs](https://docs.railway.app)

### Getting Your Bot Token & Enabling Intents

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create New Application (or select existing)
3. Go to "Bot" section
4. Click "Add Bot"
5. Under TOKEN section, click "Copy"
6. Keep this token secret and use in Railway environment variables

**IMPORTANT - Enable Message Content Intent:**
1. In Developer Portal, go to your Bot's settings
2. Scroll down to "GATEWAY INTENTS"
3. **Enable** "Message Content Intent" (required for prefix commands)
4. Save changes

This is required because TriviaBot uses prefix-based commands like `trivia play`, not slash commands.

### Inviting Your Bot to a Server

Use this URL format:
```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot
```

Replace `YOUR_CLIENT_ID` with your Application ID from the Developer Portal.
