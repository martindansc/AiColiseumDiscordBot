let info = `
Current competition: **AiColiseum 2022**

We are pleased to announce that AI Coliseum 2022 is starting on July 2nd at 10 am (GMT+2) and, as always, there will be more than € 1000 in prizes! We invite you to attend the game release and Challenge 8h at the Facultat de Matemàtiques i Estadística of the UPC. There will be free breakfast, lunch and snacks for all attendees. Find more information here.

If this is the first time you participate in this event, we encourage you to check the materials we provide in the web and the games used in previous editions. Also, you are more than welcome to join our Discord channel to stay in touch with our community and developers.
`;

module.exports = {
    name: 'info',
    description: 'Shows current relevant information',
    execute: (message) => {
        message.reply(info);
    }
};
