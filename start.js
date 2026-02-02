#!/usr/bin/env node

/**
 * Initialize config from environment variables
 * Run this before starting the bot
 */

const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'config.json');

// Check if config.json already exists
if (!fs.existsSync(configPath)) {
  console.log('config.json not found. Creating from environment variables...');
  
  // Read the example config
  const examplePath = path.join(__dirname, 'config.json');
  let baseConfig = {};
  
  // Try to read existing config.json as a template
  try {
    if (fs.existsSync(examplePath)) {
      baseConfig = JSON.parse(fs.readFileSync(examplePath, 'utf8'));
    }
  } catch (e) {
    console.warn('Could not read existing config.json, using defaults');
  }
  
  // Override with environment variables
  const config = {
    ...baseConfig,
    token: process.env.BOT_TOKEN || baseConfig.token || 'YOUR_BOT_TOKEN_HERE',
    prefix: process.env.PREFIX || baseConfig.prefix || 'trivia ',
    "shard-count": process.env.DISCORD_SHARD_COUNT || baseConfig["shard-count"] || 'auto',
    "debug-mode": process.env.DEBUG === 'true' || baseConfig["debug-mode"] || false,
    databaseURL: process.env.DATABASE_URL || baseConfig.databaseURL || 'https://opentdb.com',
    status: process.env.STATUS || baseConfig.status || "Playing trivia! Use 'trivia play'",
  };
  
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log('config.json created successfully');
} else {
  console.log('config.json found, loading...');
}

// Check for required BOT_TOKEN
if (!process.env.BOT_TOKEN && process.env.NODE_ENV === 'production') {
  console.error('ERROR: BOT_TOKEN environment variable is not set!');
  console.error('Please set the BOT_TOKEN variable in Railway.');
  process.exit(1);
}

// Start the bot
require('./index.js');
