var express = require('express');
var router = express.Router();
var config = require('./../config.js');

/* GET users listing. */
router.get('/', function(req, res, next) {

  // send request to localhost:5000 core python server to get information
  // 每一个用户有一个自己的bot，每一次新的对话都会根据session创建一个新的bot
  // 如果一个小时不交谈，这个bot就会过期释放，以节约内存
  // Python 这边有三个接口：
  /*
   * /create?session=
   * /chat?session= &msg=
   * /getBotList
   */


  res.send('respond with a resource');
});

module.exports = router;
