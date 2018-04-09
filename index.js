const TelegramBot = require('node-telegram-bot-api');

const token = '555213521:AAHsCKoF_qmgbbRnvj2JAb8c7glBkv39XY4';

const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
    
    
     
});