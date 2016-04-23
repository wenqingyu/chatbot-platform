var express = require('express');
var router = express.Router();
var conf = require('./../config.js');
var request = require('request');
var MediaDao = require('../dao/mediaDao');
var mediadao = new MediaDao();
var co = require('co');

/* GET users listing. */
router.get('/sendMsg/add', function (req, res, next) {
    var openid = req.query.openid;
    var msg = req.query.msg;
    if (!msg) {
        return res.jsonp({ status: -1, msgbody: '亲，你在说什么，我没听见！' });
    }
    co(function* () { 
        var yieldList = [];
        //先过滤粉丝的信息，是否包含关键字，如果包含，则从数据库中取出相应数据
        for (var type in conf.media) {
            conf.media[type].forEach(function (keyWords) {
                if (msg.indexOf(keyWords) > -1) {
                    yieldList.push(mediadao.getMedia(type));
                }
            })
        }
        //包含关键字则回复Media
        if (yieldList.length > 0) {
            var data = yield yieldList;
            res.jsonp({ status: 200, msgbody: data });
        } else { 
            //取1-10的随机数
            var random = Math.round(Math.random() * 9 + 1);
            //  1/10的几率回复Media
            if (random == 1) {
                var data = yield mediadao.getMedia();
                res.jsonp({ status: 200, msgbody: data });
            } else {
                var data = yield ajaxBot(msg);
                res.jsonp({ status: 200, msgbody: data });
            }
        }
    }).catch((err)=> {
        console.error(err);
        res.jsonp({status:-1,msgbody:'自动回复出错;'})
    });
});

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
