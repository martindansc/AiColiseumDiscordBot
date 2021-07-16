// Require dependencies
const Discord = require('discord.js');
const client  = new Discord.Client();
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
