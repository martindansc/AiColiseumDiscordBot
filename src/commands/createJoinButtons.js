const Config = require('../config');
const { has, userHasRole } = require('../functions/rolesFunctions');
const { MessageMenuOption, MessageMenu, MessageButton, MessageActionRow } = require('discord-buttons');

function joinList() {
    const option1 = new MessageMenuOption()
        .setLabel('AIChallange')
        .setEmoji('📚')
        .setValue('AIChallange')
        .setDescription('For middle and high school in Catalonia.');

    const option2 = new MessageMenuOption()
        .setLabel('AiColisuem')
        .setEmoji('🏆')
        .setValue('AiColisuem')
        .setDescription('Main competition open for everyone.');
    
    let select = new MessageMenu()
        .setID('ijoin')
        .setPlaceholder('Competition')
        .setMaxValues(1)
        .setMinValues(1)
        .addOption(option1)
        .addOption(option2);

    return {text: 'Choose a competition to join', buttons: select}
}

function joinButtons() {
    let button1 = new MessageButton()
        .setStyle("blurple")
        .setLabel('AIColiseum') 
        .setID('ijoin AIColiseum');

    let button2 = new MessageButton()
        .setStyle("green")
        .setLabel('AIChallange') 
        .setID('ijoin AIChallange');
    
    let button3 = new MessageButton()
        .setStyle("red")
        .setLabel('Leave all') 
        .setID('ijoin leave');

    let buttons = new MessageActionRow()
        .addComponents( button1, button2, button3);

    return {
        text: `
        **Click a button to join a competition**.
        When you join a competition you will get the discord roles associated to it,
        you will get access to some extra channels and get notified when there are  
        new events related to the competition. You can also leave if you want to stop 
        receive notifications.
        
        **AIChallange:** Competition for middle and high school students around Catalonia (only in catalan).
        **AIColiseum:** Main competition open to everyone.`,
        buttons
    };
}

module.exports = {
    name: 'createJoinButtons',
    description: 'Adds the competition buttons',
    private: true,
    permissions: async function(message) {
        return userHasRole(message.member, 'admin');
    },
    execute: async (message) => {
        const {text, buttons} = joinButtons(message);
        await message.delete();
        await message.channel.send(text, buttons);
    }
};