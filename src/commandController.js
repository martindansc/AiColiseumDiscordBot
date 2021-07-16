const fs = require('fs');
const Config = require('./config');
const Discord = require('discord.js');

class CommandController {
    
    constructor() {
        this.commands = new Discord.Collection();
        const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            this.commands.set(command.name, command);
        }
    }
    
    checkMessageIsCommand(message) {
        return message.content.startsWith(Config.prefix) && !message.author.bot;
    }
    
    checkMessageDm(message) {
        return message.channel.type === 'dm';
    }
    
    checkCorrectArgs(command, args, message) {
        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}!`;
    
            if (command.usage) {
                reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }
    
            message.channel.send(reply);
            return false;
        }
        
        return true;
    }
    
    getCommand(message) {
        let args = message.content.slice(Config.prefix.length).trim().split(/ +/);
        let commandName = args.shift().toLowerCase();
        return {commandName, args};
    }

    execute(message) {
        if (!this.checkMessageIsCommand(message) || this.checkMessageDm(message)) return;

        const {commandName, args} = this.getCommand(message);

        if(!this.commands.has(commandName)) return;

        const command = this.commands.get(commandName);

        const correctArgs = this.checkCorrectArgs(command, args, message);
        if(!correctArgs) return;

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
    }
}

module.exports = CommandController;