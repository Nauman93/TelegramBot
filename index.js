const TelegramBot = require('node-telegram-bot-api');

const token = '555213521:AAHsCKoF_qmgbbRnvj2JAb8c7glBkv39XY4';

var gag = require('node-9gag');

const bot = new TelegramBot(token, {polling: true});

//regular expression for 9gag website with id
var expression = /https?:\/\/?9gag\.com\/gag\/([a-z]?[A-Z]?[0-9]?)*/gi;


bot.onText(expression, function(msg, match) {

var postId = match[0].split("/gag/")[1];

gag.getItem(postId, function (err, res) {
  // res = {
  //   title: ,
  //   points: ,
  //   commentCount: ,
  //   image:
  // }  
  console.log(res);
  
  if (res.type==='image'){
  	bot.sendPhoto(msg.chat.id, res.image);
  }
  else if (res.type==='video'){
  	bot.sendVideo(msg.chat.id, res.video);
  }
  
});
});
