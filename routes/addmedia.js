var express = require('express');
var router = express.Router();
var config = require('./../config.js');

/* GET users listing. */
router.get('/', function(req, res, next) {

    /**
     * Todo: 爬虫爬到的东西从这个接口推送到数据库里记录下来
     */


    res.send('respond with a resource');
});

module.exports = router;
