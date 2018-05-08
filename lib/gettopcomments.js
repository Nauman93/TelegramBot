(function() {
  module.exports = function(id, next) {

    var request = require('request');
    var cheerio = require('cheerio');

    //var API = 'http://api.9gag.com'    
    var APP_ID = 'a_dd8f2b7d304a10edaf6f29517ea0ca4100a43d1b';
    var url = 'http://9gag.com/gag/' + id;
    //number of comments
    var count = 3;
    //level of comments replies
    var level = 1;
    var uri = 'https://comment-cdn.9gag.com/v1/cacheable/comment-list.json?appId='+APP_ID+'&url='+url+'&count='+count+'&level='+level+'&order=score&mentionMapping=true'

    //console.log(uri);

    var comments = [];

    request({
      uri: uri,
      method: 'GET'
      }, function(err, res, jsonString) {

      if (err) {
        return next(err, null);  
      }
      var json = JSON.parse(jsonString);

      //iterate though json object and return the comments
      for (var i=0; i<count; i++) {
      	//check the type of the comment
      	var type = json.payload.comments[i].type;
      	//comment contains only text
      	if (type === 'text'){
      		//set media as null
      		comments[i] = {text: (json.payload.comments[i].text), image:null, video:null};
      	}
      	//comment contains media (image/gif/video)
      	else if (type === 'userMedia'){
      		//this will check the media type
      		var mediaType = (json.payload.comments[i].media[0].sourceMeta.class);
      		//this will check if there's a text with the media
      		var mediaText = (json.payload.comments[i].mediaText);
      		//media is image
      		if (mediaType === 'STATIC'){ 
      			if (mediaText != ''){
      				//set media as url of the image in comment
      				comments[i] = {text: mediaText, image: (json.payload.comments[i].media[0].imageMetaByType.image.url), video:null};
      			}else
      				comments[i] = {text: null, image: (json.payload.comments[i].media[0].imageMetaByType.image.url), video:null};

      		}else if (mediaType === 'ANIMATED'){
      			if (mediaText != ''){
					//media is gif/video
					comments[i] = {text: mediaText, image:null, video: (json.payload.comments[i].media[0].imageMetaByType.video.url)};
      			}else
      				comments[i] = {text: null, image:null, video: (json.payload.comments[i].media[0].imageMetaByType.video.url)};
      		}
      	}
      }

      //console.log(comments);
      
      return next(null, comments);
    });

    
    
  }
}());