const fs = require('fs');
const Config = require('./config');
const Discord = require('discord.js');

class CommandController {
    
    constructor() {
        this.commands = new Discord.Collection();
        const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            this.commands.set(command.name.toLowerCase(), command);
        }

        const interactionFiles = fs.readdirSync('./src/interactions').filter(file => file.endsWith('.js'));
        for (const file of interactionFiles) {
            const command = require(`./interactions/${file}`);
            this.commands.set(command.name.toLowerCase(), command);
        }
    }
    
    checkMessageIsCommand(message) {
        return message.content.startsWith(Config.prefix) && !message.author.bot;
    }
    
    checkMessageDm(message) {
        return message.channel.type === 'dm';
    }
    
    getCommand(message) {
        const args = message.content.slice(Config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        return {commandName, args};
    }

    getCommandButton(button) {
        const args = button.id.slice(Config.prefix.length).trim().split(/ +/);

        const commandName = args.shift().toLowerCase();
        if(button.values) args = args.append(button.values);
        return {commandName, args};
    }

    async execute(message) {
        if (!this.checkMessageIsCommand(message) || this.checkMessageDm(message)) return;

        const {commandName, args} = this.getCommand(message);

        if(!this.commands.has(commandName)) return;

        const command = this.commands.get(commandName);

        try {
            await command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to execute that command!');
        }
    }

    async executeButton(button) {
        const {commandName, args} = this.getCommandButton(button);
        
        const command = this.commands.get(commandName);
        try {
            await command.execute(button, args);
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to execute that command!');
        }
    }
}

module.exports = CommandController;