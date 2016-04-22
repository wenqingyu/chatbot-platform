var express = require('express');
var router = express.Router();
var config = require('./../config.js');
var mediaIndex = require('./../config/media.js');
var request = require('request');

/* GET users listing. */
router.get('/', function(req, res, next) {

  /**
   * Todo: 在此之前，你跟前端交流一下怎么处理openid的问题
   * 写的比较乱，主要是表述一下我的意思， 里面有很多地方不太规范，麻烦你帮我改改
   */

  var openid = undefined;
  var user = undefined; // user info, retrive from wechat db by openid if any.
  var response = {};

  // OPENID
  if(req.query.openid || req.body.openid){
    openid = req.query.openid || req.body.openid;
  }

  // MSG
  var msg = req.query.msg || req.body.msg;
  if(msg && msg.trim()){
    msg = msg.trim();
  }else{
    return res.status(200).send({resMsg: "亲，你在说什么，我没听见！"});
  }

  // CHECK MEDIA KEYWORD
  var type = undefined;
  var resMedia = [];
  for(var media in mediaIndex){
    for(var i = 0; i < media.leng; i ++){
      console.log(media[i]);
      if(msg.indexOf(media[i] > -1)){
        type = media[0];
        // todo: push this type's media to user
        console.log("push: ", type);
        // 这里需要去implement一下随机提取音乐，电商，新闻等media的东西
        resMedia.push({image: "http://a.36krcnd.com/nil_class/553a33db-0c10-4f19-bc2c-967e58c76ade/00000.png!heading", title: "安卓之父Andy Rubin：要把互联网现实化", url: "http://36kr.com/p/5046123.html"})
      }
    }
  }
  response.media = resMedia;

  // 这里msg为中文时 有一点问题
  request('http://www.xiaodoubi.com/simsimiapi.php?msg='+msg, function (error, resp, body) {
    if (!error && resp.statusCode == 200) {
      console.log(body) // Show the HTML for the Google homepage.
      response.msg = body;
      return res.status(200).send(response);
    }else{
      return res.status(response.statusCode).send({error: error});
    }
  })
});

module.exports = router;
