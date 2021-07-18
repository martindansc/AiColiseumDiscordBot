const { joinChallange, leaveChallange} = require('../functions/joinChallange');

module.exports = {
    name: 'ijoin',
    description: 'Interaction that adds yourself to a competition',
    args: ['Competition to join'],
    private: true,
    execute: async (button, args) => {
        let competition = args[0];

        await button.reply.defer();

        if(!button.clicker.member) await button.clicker.fetch();
        if(competition == 'leave') {
            await leaveChallange(button.clicker.member, button.guild);
            await sendDm(button.clicker.user, `You have been removed from all your competitions. From now on, you won't receive notifications.`);
        }
        else {
            await joinChallange(button.clicker.member, button.guild, competition);
            await sendDm(button.clicker.user, `You have been added to **${competition}** competition.`);
        }

    }
};