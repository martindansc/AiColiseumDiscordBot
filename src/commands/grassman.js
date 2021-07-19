let info = `
The legend says the maps made by this infamous knight were the worst nightmare any bot could face.
From having your opponent in your face before you realise, to labyrinthic maps no one could ever traverse,
full of aggressive neutral warriors and canon towers that shot you from all directions and
maps plenty of resources all along the path but just of one type and none of the others.
The legend says that if you stay around you can still find the infamous knight in these lands, 
you just need to pay attention and please, be cautious, you don't want to get trapped into one of his tricky... deadly maps.`;

module.exports = {
    name: 'grassman',
    description: 'Explains the mith of grassman, the infamous knight',
    execute: (message) => {
        message.reply(info);
    }
};