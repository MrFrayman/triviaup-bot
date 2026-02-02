#!/usr/bin/env node

/**
 * Initialize config from environment variables
 * Run this before starting the bot
 */

const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'config.json');

// Always create/update config.json from environment variables
console.log('Initializing config from environment variables...');

// Start with defaults
const config = {
  token: process.env.BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE',
  prefix: process.env.PREFIX || 'trivia ',
  "shard-count": process.env.DISCORD_SHARD_COUNT || 'auto',
  "debug-mode": process.env.DEBUG === 'true' || false,
  databaseURL: process.env.DATABASE_URL || 'https://opentdb.com',
  status: process.env.STATUS || "Playing trivia! Use 'trivia play'",
  "use-reactions": false,
  "hangman-mode": false,
  "hangman-hints": true,
  "hide-difficulty": false,
  "auto-delete-msgs": false,
  "auto-delete-msgs-timer": 15000,
  "auto-delete-answers": true,
  "auto-delete-answers-timer": 0,
  "round-length": 15000,
  "round-timeout": 4000,
  "round-end-warnings-disabled": false,
  "rounds-end-after": 2,
  "use-fixed-rounds": false,
  "rounds-fixed-number": 15,
  "disable-score-display": false,
  "score-value": { "easy": 100, "medium": 200, "hard": 300 },
  "score-multiplier-max": 0,
  "command-whitelist": [],
  "accept-first-answer-only": false,
  "reveal-answers": true,
  "categories-in-channel": false,
  "allow-eval": true,
  "disable-admin-commands": false,
  "disable-version-check": false,
  "allow-bots": false,
  "database-merge": false,
  "database-cache-size": 32,
  "database-allow-long-answers": false,
  "stat-file": "./stats.json",
  "stat-guild-recording": false,
  "embed-color": "006CFF",
  "channel-whitelist": [],
  "config-commands-enabled": false,
  "additional-packages": [],
  "additional-packages-root": [],
  "debug-log": false,
  "debug-database-flush": false,
  "display-ascii-logo": false,
  "fallback-mode": false,
  "fallback-silent": false
};

// Try to merge with existing config.json if it exists
if (fs.existsSync(configPath)) {
  try {
    const existingConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    Object.assign(config, existingConfig);
    // But always override with env vars
    config.token = process.env.BOT_TOKEN || config.token;
    config.prefix = process.env.PREFIX || config.prefix;
    config["debug-mode"] = process.env.DEBUG === 'true' ? true : config["debug-mode"];
  } catch (e) {
    console.warn('Could not read existing config.json, using generated config');
  }
}

// Write config
fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
console.log('✓ config.json ready');

// Check for required BOT_TOKEN
if (!process.env.BOT_TOKEN) {
  console.error('❌ ERROR: BOT_TOKEN environment variable is not set!');
  console.error('Please set the BOT_TOKEN variable in Railway.');
  console.error('\nTo add a variable in Railway:');
  console.error('1. Go to your project dashboard');
  console.error('2. Click "Variables"');
  console.error('3. Add BOT_TOKEN with your Discord bot token');
  process.exit(1);
}

console.log('✓ BOT_TOKEN is set');

// Start the bot
require('./index.js');
