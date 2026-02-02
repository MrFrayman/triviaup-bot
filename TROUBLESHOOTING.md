# TriviaBot Not Responding - Quick Fix

## The Most Common Issue: Message Content Intent

**99% of the time, if the bot doesn't respond, it's because Message Content Intent is NOT enabled.**

### How to Enable Message Content Intent

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click your TriviaBot application
3. Go to the **"Bot"** tab in the left sidebar
4. Scroll down to **"GATEWAY INTENTS"** section
5. **Toggle ON** the "Message Content Intent" switch
6. Click **"Save Changes"**
7. Wait a few seconds for the change to take effect

### Why is This Required?

- Discord requires bots to explicitly request access to read message content
- TriviaBot uses **prefix-based commands** (e.g., `trivia play`), not slash commands
- Without Message Content Intent, the bot cannot read message text to recognize commands

## Checklist

- [ ] Message Content Intent is **ENABLED** in Discord Developer Portal
- [ ] Bot is invited to your server
- [ ] Bot has "Send Messages" permission in the channel
- [ ] You're typing the correct prefix + command (e.g., `trivia help`)
- [ ] Bot token is correct in Railway environment variables

## Testing the Bot

1. Make sure Message Content Intent is enabled (see above)
2. Type in Discord: `trivia help`
3. Bot should respond with help information

If still not working:

### Option A: Run Diagnostic (Local Testing)

```bash
export BOT_TOKEN="your_bot_token_here"
node diagnose.js
```

This will verify:
- Token is valid
- Message Content Intent is enabled
- Bot can connect to Discord

### Option B: Enable Debug Mode in Railway

1. In Railway dashboard, add environment variable: `DEBUG=true`
2. Restart the bot
3. Check logs for message events

## Command Format

Remember: **This bot uses PREFIX commands, NOT slash commands**

```
✅ Correct:    trivia help
✅ Correct:    trivia play
✅ Correct:    trivia categories

❌ Wrong:      /trivia help
❌ Wrong:      /trivia play
```

## If It Still Doesn't Work

1. Check the Railway deployment logs for errors
2. Verify bot is actually in your Discord server
3. Try inviting bot to a new test server
4. Make sure you didn't accidentally mute the bot in Discord

## Quick Re-invite Link

Replace `YOUR_CLIENT_ID` with your bot's Application ID:

```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot
```

The `permissions=8` gives "Administrator" permission (easiest for testing).
