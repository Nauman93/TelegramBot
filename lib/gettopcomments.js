(function() {
  module.exports = function(id, next) {

    var request = require('request');
    var cheerio = require('cheerio');

    //var API = 'http://api.9gag.com'    
    var APP_ID = 'a_dd8f2b7d304a10edaf6f29517ea0ca4100a43d1b';
    var url = 'http://9gag.com/gag/' + id;
    //number of comments
    var count = 2;
    //level of comments replies
    var level = 1;
    var uri = 'https://comment-cdn.9gag.com/v1/cacheable/comment-list.json?appId='+APP_ID+'&url='+url+'&count='+count+'&level='+level+'&order=score&mentionMapping=true'

    //example of uri: 'https://comment-cdn.9gag.com/v1/cacheable/comment-list.json?appId=a_dd8f2b7d304a10edaf6f29517ea0ca4100a43d1b&url=http://9gag.com/gag/azX536B&count=2&level=1&order=score'

    console.log(uri);

    request({
      uri: uri,
      method: 'GET'
      }, function(err, res, json) {

      if (err) {
        return next(err, null);  
      }
      /*
      JSON.parse(html, function(k, v) {
          console.log(k[0]);
        
      });  
      */

    });

    
    
  }
}());