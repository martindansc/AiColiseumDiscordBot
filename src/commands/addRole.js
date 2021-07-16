const { addRoleToUser } = require('../helper/rolesFunctions');

module.exports = {
    name: 'join',
    description: 'Adds you to a competition',
    args: ['Competition to join'],
    execute: (message, args) => {
        const competition = args[0];
        if(competition !== 'AiChallange' && competition !== 'AiColiseum') {
            message.reply('Invalid competition choose between "AiChallange" or "AiColiseum"');
        }

        addRoleToUser(message, competition);
    }
};