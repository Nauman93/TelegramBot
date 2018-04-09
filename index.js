const TelegramBot = require('node-telegram-bot-api');

const token = '555213521:AAHsCKoF_qmgbbRnvj2JAb8c7glBkv39XY4';

const bot = new TelegramBot(token, {polling: true});

var expression = /https?:\/\/?9gag\.com\/gag\/([a-z]?[A-Z]?[0-9]?)*/gi;

bot.onText(expression, function(msg, match) {

//bot.sendMessage(msg.chat.id, "aa");
bot.sendPhoto(msg.chat.id, match[0]);

});
