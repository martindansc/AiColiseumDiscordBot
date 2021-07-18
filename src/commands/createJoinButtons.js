const Config = require('../config');
const { has } = require('../functions/rolesFunctions');
const { MessageMenuOption, MessageMenu, MessageButton, MessageButtonStyles, MessageActionRow } = require('discord-buttons');

function joinList() {
    const option1 = new MessageMenuOption()
        .setLabel('AiChallange')
        .setEmoji('📚')
        .setValue('AiChallange')
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
        .setLabel('AiColiseum') 
        .setID('ijoin AiColiseum');

    let button2 = new MessageButton()
        .setStyle("green")
        .setLabel('AiChallange') 
        .setID('ijoin AiChallange');
    
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
        you will get access to some extra channels and get notified when new events 
        related to the competition. You can also leave if you want to stop 
        reciving notifications.
        
        **AiChallange:** Competition for middle and high school students
        **AiColisuem:** Main competition open to everyone.`,
        buttons
    };
}

module.exports = {
    name: 'createJoinButtons',
    description: 'Adds the competition buttons',
    permissions: async function() {
        return 
    },
    execute: async (message) => {
        const {text, buttons} = joinButtons(message);
        await message.delete();
        await message.channel.send(text, buttons);
    }
};