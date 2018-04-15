(function() {
  module.exports = function(id, next) {

    var request = require('request');
    var cheerio = require('cheerio');
    var fs = require('fs');

    var uri = 'http://9gag.com/gag/' + id;

    var item = {
      title: null,
      points: null,
      commentCount: null,
      image: null,
      video: null,
      type: null
    };
  
    //request for the webpage
    request({
      uri: uri,
      method: 'GET'
      }, function(err, res, html) {

      if (err) {
        return next(err, null);  
      }
      
      var $ = cheerio.load(html);

      //console.log(html);
      
      if ($('body').attr('id') === 'page-404') {
        err.code = 404;
        err.message = 'Sorry, the page you are looking for doesn\'t exist';
        return next(err, null);
      }

      var a = $("meta[property='og:description']").attr("content").split(",")[0];

      if (a==='More memes'){
        item.type = 'image';
        item.image = $("meta[property='og:image']").attr("content");
      }else{
        item.type = 'video';
        item.video = 'https://img-9gag-fun.9cache.com/photo/'+id+'_460sv.mp4';
      }
      
      item.title = $("meta[property='og:title']").attr("content");
      item.points = $("meta[name='description']").attr("content").split("•")[0].trim();
      item.commentCount = $("meta[name='description']").attr("content").split("•")[1].split("-")[0].trim();

      return next(null, item);
      
    });

    
  }
}());