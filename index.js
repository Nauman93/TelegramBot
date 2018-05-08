
const TelegramBot = require('node-telegram-bot-api');
var fs = require('fs');
var request = require('request');

const token = '555213521:AAHsCKoF_qmgbbRnvj2JAb8c7glBkv39XY4';

var gag = {};

gag.getTopComments = require('./lib/gettopcomments');
gag.getPost = require('./lib/getpost');


const bot = new TelegramBot(token, {polling: true});

//regular expression for 9gag website with id
var expression = /https?:\/\/?9gag\.com\/gag\/([a-z]?[A-Z]?[0-9]?)*/gi;


//download function that make a request for the image or video
var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
    //console.log('content-type:', res.headers['content-type']);
    //console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

//function that handle sending comments in order
var sendComments = function(bot, chatId, obj, index) {
  //console.log(obj);
  if (obj[index] != undefined){
    if (obj[index].text != null){
      //comment is only text
      if (obj[index].image === null && obj[index].video === null){
        bot.sendMessage(chatId, obj[index].text).then(() => {
          index+=1;
          sendComments(bot, chatId, obj, index);
        });        
      }
      //comment is text and image/video
      if(obj[index].image != null){
        bot.sendPhoto(chatId, obj[index].image, {caption: obj[index].text}).then(() => {
          index+=1;
          sendComments(bot, chatId, obj, index);
        });
      }else if (obj[index].video != null){
        bot.sendVideo(chatId, obj[index].video, {caption: obj[index].text}).then(() => {
          index+=1;
          sendComments(bot, chatId, obj, index);
        });
      }
      
    }else{
      //comment is image or video
      if (obj[index].image != null){
        bot.sendPhoto(chatId, obj[index].image).then(() => {
          index+=1;
          sendComments(bot, chatId, obj, index);
        });
      }else{
        bot.sendVideo(chatId, obj[index].video).then(() => {
          index+=1;
          sendComments(bot, chatId, obj, index);
        });
      }
    }
  }
}

bot.onText(expression, function(msg, match) {

  var postId = match[0].split("/gag/")[1];

  /*
  //call getpost function given the id of the post
  gag.getPost(postId, function (err, res) {

  	if (res.type==='image'){
  		bot.sendPhoto(msg.chat.id, res.image);

      //console.log(msg);

  		bot.sendMessage(msg.chat.id, "Do you want me to save this?",{
          reply_markup: {
            inline_keyboard: [
              [{
                  text: "Yes",
                  callback_data: "yes",
               },
               {
                  text: "No",
                  callback_data: "no",
               }]
            ]
          }
      });

    	bot.on('callback_query', (callbackQuery) => {
        var msg_response = callbackQuery.data;
        //console.log(callbackQuery.data);
        if (msg_response === 'yes'){
          download(res.image, res.title+'.jpg', function(){
              //console.log('done');
          });
          bot.answerCallbackQuery(callbackQuery.id).then(() => bot.sendMessage(msg.chat.id, "Image saved!"));
          bot.deleteMessage(callbackQuery.message.chat.id, callbackQuery.message.message_id);
        } else {
          bot.deleteMessage(callbackQuery.message.chat.id, callbackQuery.message.message_id);
        };
      });

    	} else if (res.type==='video'){
    		bot.sendVideo(msg.chat.id, res.video);

    		bot.sendMessage(msg.chat.id, "Do you want me to save this?",{
    			reply_markup: {
    				inline_keyboard: [
              [{
                  text: "Yes",
                  callback_data: "yes",
               },
               {
                  text: "No",
                  callback_data: "no",
               }]
            ]
        	}
    		});

        bot.on('callback_query', (callbackQuery) => {
          var msg_response = callbackQuery.data;
          //console.log(callbackQuery.data);
          if (msg_response === 'yes'){
            download(res.video, res.title+'.mp4', function(){
                //console.log('done');
            });
            bot.answerCallbackQuery(callbackQuery.id).then(() => bot.sendMessage(msg.chat.id, "Video saved!"));
            bot.deleteMessage(callbackQuery.message.chat.id, callbackQuery.message.message_id);
          } else {
            bot.deleteMessage(callbackQuery.message.chat.id, callbackQuery.message.message_id);
          };
        });
    	}
    
  });


  */


  //call gettopcomments function given the id of the post
  gag.getTopComments(postId, function (err, res){    
    
    bot.sendMessage(msg.chat.id, "Do you want to see the top comments?",{
          reply_markup: {
            inline_keyboard: [
              [{
                  text: "Yes",
                  callback_data: "yes",
               },
               {
                  text: "No",
                  callback_data: "no",
               }]
            ]
          }
    });

    //sendComments(bot, msg.chat.id, res, 0);

    bot.on('callback_query', (callbackQuery) => {
      var msg_response = callbackQuery.data;
      //console.log(callbackQuery.data);
      if (msg_response === 'yes'){
        bot.answerCallbackQuery(callbackQuery.id).then(() => sendComments(bot, msg.chat.id, res, 0));
        bot.deleteMessage(callbackQuery.message.chat.id, callbackQuery.message.message_id);
      } else {
        bot.deleteMessage(callbackQuery.message.chat.id, callbackQuery.message.message_id);
        };
    });

    

  });

});

