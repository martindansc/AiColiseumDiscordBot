const env = require('dotenv');
env.config();

module.exports = {
    token: process.env.TOKEN,
    prefix: '!'
};
