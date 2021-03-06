var express = require('express');
var router = express.Router();
var MediaDao = require('../dao/mediaDao');
var mediadao = new MediaDao();
var moment = require('moment');

/* 资源入库 */
router.post('/add', function (req, res, next) {
    var items = req.body.items;
    items.forEach((item)=>{item.createtime = moment().format('YYYY-MM-DD HH:mm:ss')});
    mediadao.insertMedia(items)
        .then(function () {
            res.jsonp({ status: 200, msgbody: '插入成功' })
        })
        .catch(function (err) {
            console.error('插入资源失败:' + err);
            res.jsonp({ status: -1, msgbody: err });
        })
});

module.exports = router;
