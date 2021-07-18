const { joinChallange, leaveChallange} = require('../functions/joinChallange');

module.exports = {
    name: 'join',
    description: 'Adds you to a competition',
    args: ['Competition to join'],
    execute: async (button, args) => {
        let competition = args[0];
        await button.reply.defer();

        if(!button.clicker.member) await button.clicker.fetch();
        if(competition == 'leave') {
            await leaveChallange(button.clicker.member, button.guild);
        }
        else {
            await joinChallange(button.clicker.member, button.guild, competition);
        }
    }
};