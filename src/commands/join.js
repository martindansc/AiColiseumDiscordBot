const { joinChallange } = require('../functions/joinChallange');

module.exports = {
    name: 'join',
    description: 'Adds youself to a competition',
    args: ['Competition to join (AIChallange / AIColiseum)'],
    execute: async (message, args) => {
        await joinChallange(message.member, message.guild, args[0]);
    }
};