const Config = require('../config');

function showHelpCommand(command) {
    const data = [];

    if (!command) {
        return 'Not a valid command!';
    }

    data.push('');
    data.push(`**Command:** ${command.name}`);
    if (command.description) data.push(`**Description:** ${command.description}`);
    if (command.args) data.push(`**Usage:** \`${Config.prefix}${command.name} [${command.args.join('] [')}]\``);
    data.push(`**Cooldown:** ${command.cooldown || Config.defaultCooldown} second(s)`);

    return data;
}

function showGenericHelp(commands) {
    const data = [];

    data.push('Here\'s a list of all my commands:');
    data.push(commands.filter(command => !command.private).map(command => command.name).join(', '));
    data.push(`\nYou can send \`${Config.prefix}help [command name]\` to get information on a specific command!`);

    return data;
}


module.exports = {
	name: 'help',
	description: 'List all of my commands or information about a specific command.',
	args: ['command name'],
	cooldown: 1,
	execute(message, args) {
		const data = [];
		const { commands } = message.client.commands;

		if (!args.length) {
			const data = showGenericHelp(commands);
            message.channel.send(data, { split: true });
		}
        else {
            const name = args[0].toLowerCase();
            const command = commands.get(name);

            const data = showHelpCommand(command);
            message.channel.send(data, { split: true });
        }

        
	}
};