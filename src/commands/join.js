const { joinChallange } = require('../functions/joinChallange');

module.exports = {
    name: 'join',
    description: 'Adds you to a competition',
    args: ['Competition to join'],
    execute: async (message, args) => {
        await joinChallange(message.member, message.guild, args[0]);
    }
};