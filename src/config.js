const env = require('dotenv');
env.config();

module.exports = {
    token: process.env.TOKEN,
    prefix: '!',
    defaultCooldown: 10,
    honeypotChannelId: process.env.HONEYPOT_CHANNEL_ID,
    honeypotWindowMinutes: parseInt(process.env.HONEYPOT_WINDOW_MINUTES) || 5
};
