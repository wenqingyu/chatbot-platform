var express = require('express');
var router = express.Router();
var conf = require('./../config.js');
var mediaIndex = require('./../config/media.js');
var request = require('request');
var orm = require("orm");

/* GET users listing. */
router.post('/sendMsg/add', function (req, res, next) {
    var openid = req.body.openid;
    var msg = req.body.msg;
    if (!msg) {
        return res.jsonp({ status: -1, msgbody: '亲，你在说什么，我没听见！' });
    }
    //var type = req.body.type;
    //if (type) {
    //    return res.jsonp({ status: 200, msgbody: { image: "http://a.36krcnd.com/nil_class/553a33db-0c10-4f19-bc2c-967e58c76ade/00000.png!heading", title: "安卓之父Andy Rubin：要把互联网现实化", url: "http://36kr.com/p/5046123.html" } })
    //}
    common.run(responseMsg(openid, msg, res));





//var resMedia = [];
//for (var media in mediaIndex) {
//    for (var i = 0; i < media.leng; i++) {
//        console.log(media[i]);
//        if (msg.indexOf(media[i] > -1)) {
//            type = media[0];
//            // todo: push this type's media to user
//            console.log("push: ", type);
//            // 这里需要去implement一下随机提取音乐，电商，新闻等media的东西
//            resMedia.push({ image: "http://a.36krcnd.com/nil_class/553a33db-0c10-4f19-bc2c-967e58c76ade/00000.png!heading", title: "安卓之父Andy Rubin：要把互联网现实化", url: "http://36kr.com/p/5046123.html" })
//        }
//    }
//}
//response.media = resMedia;
});

/**
 *  回复粉丝消息
 **/
function* responseMsg(openid, msg, res) {
    try {
        var botMsg = yield ajaxBot(msg);
        res.jsonp({ status: 200, msgbody: botMsg })
    } catch (err) {
        console.error('回复粉丝消息错误:' + err);
        res.jsonp({ status: -1, msgbody: '回复粉丝消息错误' })
    }
}


/**
 * 请求机器人
 **/
function ajaxBot(msg) {
    return new Promise((resolve, reject) => {
        request(conf.bot.format(encodeURIComponent(msg)), (error, resp, body)=> {
            if (error) return reject(error);
            resolve(body);
        })
    })
}

module.exports = router;
