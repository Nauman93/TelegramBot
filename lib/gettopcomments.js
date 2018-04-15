(function() {
  module.exports = function(id, next) {

    var request = require('request');
    var cheerio = require('cheerio');

    var API = 'http://api.9gag.com'
    var COMMENT_CDN = 'http://comment-cdn.9gag.com'
    var APP_ID = 'a_dd8f2b7d304a10edaf6f29517ea0ca4100a43d1b';

    /*

    var item = {
      title: null,
      points: null,
      commentCount: null,
      image: null,
      video: null,
      type: null
    };
  
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

    */
    
  }
}());