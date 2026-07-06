// Require dependencies
const Discord = require('discord.js');
const client  = new Discord.Client();
require('discord-buttons')(client);
const Config = require('./config');
const CommandController = require('./commandController');
const Honeypot = require('./honeypot');

// Init bot
client.commands = new CommandController();
client.login(Config.token);

const honeypot = new Honeypot(client);

client.on('ready', () => {
  if (Config.honeypotChannelId) {
    console.info(`Honeypot active on channel ${Config.honeypotChannelId}, window: ${Config.honeypotWindowMinutes}min`);
  } else {
    console.info('Honeypot disabled (no HONEYPOT_CHANNEL_ID set)');
  }
  console.info(`Logged in as ${client.user.tag}!`);
});

// Bind events
client.on('message', message => {
  honeypot.handleMessage(message);
	client.commands.execute(message);
});

client.on('clickMenu', (button) => {
  client.commands.executeInteraction(button);
});

client.on('clickButton', (button) => {
  client.commands.executeInteraction(button);
});