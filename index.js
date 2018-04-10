const TelegramBot = require('node-telegram-bot-api');

const token = '555213521:AAHsCKoF_qmgbbRnvj2JAb8c7glBkv39XY4';

var gag = require('node-9gag');

const bot = new TelegramBot(token, {polling: true});

//regular expression for 9gag website with id
var expression = /https?:\/\/?9gag\.com\/gag\/([a-z]?[A-Z]?[0-9]?)*/gi;
var id = 


bot.onText(expression, function(msg, match) {

//bot.sendMessage(msg.chat.id, "aa");
gag.getItem(match[0], function (err, res) {
  // res = {
  //   title: ,
  //   points: ,
  //   commentCount: ,
  //   image:
  // }
  //console.log(res);
  //bot.sendPhoto(msg.chat.id, res.image);
  bot.sendVideo(msg.chat.id, res.image);
});




});
