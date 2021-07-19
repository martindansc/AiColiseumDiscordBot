let info = `
The legend says the maps made by this infamous knight were the worst nightmare any bot could face. 
From having your oponent in your face before you realise, to laberintic maps no one could ever traverse,
full of agressive neutral warriorsa and canon towers that shot you from far distance everywere, 
maps plenty of resources all along the path but just of one type.
Says the legend that if you pay attention you can still find the infamous knight in this lands, you just need to pay attention
and please, be cautios, you don't want to get trapped into one of his tricky... deadly maps.`;

module.exports = {
    name: 'grassman',
    description: 'Explains the mith of grassman, the infamous knight',
    execute: (message) => {
        message.reply(info);
    }
};