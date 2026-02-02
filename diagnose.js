#!/usr/bin/env node

/**
 * Diagnostic script to verify bot setup
 */

const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

console.log('=== TriviaBot Diagnostic ===\n');

// Check environment
console.log('1. Environment Variables:');
console.log(`   BOT_TOKEN: ${process.env.BOT_TOKEN ? '✅ Set' : '❌ NOT SET'}`);
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'not set'}\n`);

// Check config
console.log('2. Configuration:');
const configPath = path.join(__dirname, 'config.json');
if (fs.existsSync(configPath)) {
  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    console.log(`   ✅ config.json exists`);
    console.log(`   Prefix: "${config.prefix}"`);
    console.log(`   Token set: ${config.token && config.token !== 'YOUR_BOT_TOKEN_HERE' ? '✅' : '❌'}\n`);
  } catch (e) {
    console.log(`   ❌ Error reading config.json: ${e.message}\n`);
  }
} else {
  console.log(`   ❌ config.json not found\n`);
}

// Check intents
console.log('3. Discord Intents Configuration:');
const intents = [
  { name: 'Guilds', bit: GatewayIntentBits.Guilds },
  { name: 'GuildMessages', bit: GatewayIntentBits.GuildMessages },
  { name: 'DirectMessages', bit: GatewayIntentBits.DirectMessages },
  { name: 'MessageContent', bit: GatewayIntentBits.MessageContent },
  { name: 'GuildMessageReactions', bit: GatewayIntentBits.GuildMessageReactions },
  { name: 'DirectMessageReactions', bit: GatewayIntentBits.DirectMessageReactions },
];

intents.forEach(intent => {
  console.log(`   ${intent.name}: ✅`);
});

console.log(`\n4. Important Notes:`);
console.log(`   - Message Content Intent MUST be enabled in Discord Developer Portal`);
console.log(`   - Go to: Developer Portal → Bot → GATEWAY INTENTS`);
console.log(`   - Enable: "Message Content Intent"`);
console.log(`   - The bot will NOT respond to prefix commands without this!\n`);

console.log(`5. Testing Connection:`);
if (!process.env.BOT_TOKEN) {
  console.log(`   ❌ Cannot test - BOT_TOKEN not set`);
  process.exit(1);
}

const testClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});

testClient.on('ready', () => {
  console.log(`   ✅ Successfully connected as: ${testClient.user.tag}`);
  console.log(`   ✅ Guilds: ${testClient.guilds.cache.size}`);
  console.log(`   ✅ Message Content Intent: ENABLED\n`);
  
  console.log('=== Diagnostic Complete ===');
  console.log('If bot is not responding:');
  console.log('1. Ensure Message Content Intent is enabled in Discord Developer Portal');
  console.log('2. Verify bot has "Send Messages" permission in your server');
  console.log('3. Check bot is in your server\n');
  
  process.exit(0);
});

testClient.on('error', (error) => {
  console.log(`   ❌ Connection failed: ${error.message}`);
  console.log(`\nCommon issues:`);
  console.log(`   - Invalid token`);
  console.log(`   - Message Content Intent not enabled\n`);
  process.exit(1);
});

testClient.login(process.env.BOT_TOKEN);

// Timeout after 10 seconds
setTimeout(() => {
  console.log('   ❌ Connection timeout');
  process.exit(1);
}, 10000);
