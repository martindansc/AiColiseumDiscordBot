// Require dependencies
const Discord = require('discord.js');
const client  = new Discord.Client();
require('discord-buttons')(client);
const Config = require('./config');
const CommandController = require('./commandController');

// Init bot
client.commands = new CommandController();
client.login(Config.token);
client.on('ready', () => {
  console.info(`Logged in as ${client .user.tag}!`);
});

// Bind events
client.on('message', message => {
	client.commands.execute(message);
});

client.on('clickMenu', (button) => {
  client.commands.executeButton(button);
});

client.on('clickButton', (button) => {
  client.commands.executeButton(button);
});