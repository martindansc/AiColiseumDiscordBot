const fs = require('fs');
const Config = require('./config');
const Discord = require('discord.js');
const { sendDm } = require('./functions/reply');

/* Commands properties

name
description
args
cooldown

*/

class CommandController {
    
    constructor() {
        this.commands = new Discord.Collection();
        this.cooldowns = new Discord.Collection();
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
        const args = button.id.trim().split(/ +/);

        const commandName = args.shift().toLowerCase();
        if(button.values) args = args.append(button.values);
        return {commandName, args};
    }

    getCooldown(author, command) {
        if (!this.cooldowns.has(command.name)) {
            this.cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = this.cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || Config.defaultCooldown) * 1000;

        if (timestamps.has(author.id)) {
            const expirationTime = timestamps.get(author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return timeLeft;
            }
        }

        timestamps.set(author.id, now);
        setTimeout(() => timestamps.delete(author.id), cooldownAmount);

        return 0;
    }

    async execute(message) {
        if (!this.checkMessageIsCommand(message) || this.checkMessageDm(message)) return;

        const {commandName, args} = this.getCommand(message);
        if(!this.commands.has(commandName)) return;

        const command = this.commands.get(commandName);
        
        const cooldown = this.getCooldown(message.author, command);
        if(cooldown) {
            await sendDm(message.author, `Please wait ${cooldown.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            return;
        }

        try {
            await command.execute(message, args);
        } catch (error) {
            console.log(error);
            await sendDm(message.author, 'There was an error trying to execute that command! Please contact and administrator if it persists.');
            return;
        }
    }

    async executeInteraction(button) {
        const {commandName, args} = this.getCommandButton(button);
        
        const command = this.commands.get(commandName);
        if(!this.commands.has(commandName)) return;
        
        if(!button.clicker.member) await button.clicker.fetch();

        const cooldown = this.getCooldown(button.clicker.user, command);
        if(cooldown) {
            await sendDm(button.clicker.user, `Please wait ${cooldown.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            return;
        }

        try {
            await command.execute(button, args);
        } catch (error) {
            console.log(error);
            await sendDm(button.clicker.user, 'There was an error trying to execute that interaction! Please contact and administrator if it persists.');
        }
    }
}

module.exports = CommandController;