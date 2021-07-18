module.exports = {
    name: 'ping',
    description: 'Simple command for checking bot status',
    execute: (message) => {
        message.reply('pong');
    }
};