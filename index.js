
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

bot.onText(expression, function(msg, match) {

var postId = match[0].split("/gag/")[1];

//call gettopcomments function given the id of the post
gag.getTopComments(postId, function (err, res){
	
});

//call getpost function given the id of the post
gag.getPost(postId, function (err, res) {
  // res = {
  //   title: ,
  //   points: ,
  //   commentCount: ,
  //   image:
  // }  
  //console.log(res);
  
	if (res.type==='image'){
		bot.sendPhoto(msg.chat.id, res.image); 

		

		bot.sendMessage(msg.chat.id, "Do you want me to save this?",{
			"reply_markup": {
				"keyboard": [["Yes", "No"]]
    		}
  		});

  		bot.on('message', (msg) => {
		var yesRes = "Yes";
		if (msg.text.indexOf(yesRes) === 0) {
    		download(res.image, res.title+'.jpg', function(){
  			//console.log('done');
			});;
		}
	});

  	} else if (res.type==='video'){
  		bot.sendVideo(msg.chat.id, res.video);

  		bot.sendMessage(msg.chat.id, "Do you want me to save this?",{
			"reply_markup": {
				"keyboard": [["Yes", "No"]]
    		}
  		});

  		bot.on('message', (msg) => {
		var yesRes = "Yes";
		if (msg.text.indexOf(yesRes) === 0) {
    		download(res.video, res.title+'.mp4', function(){
  				//console.log('done');
			});;
		}
	});
  	}
  
});
});

