var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//加载配置项
var conf = require('./config.js');
var routes = require('./routes/index');
var users = require('./routes/users');
var msg = require('./routes/msg');
var addmedia = require('./routes/addmedia');
var orm = require("orm");
var app = express();
var fs = require('fs');
var Promise = require('bluebird');
global.common = require('./common.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('*', function (req, res, next) { 
    //解决跨域
    res.header("Access-Control-Allow-Origin", "*");
    next();
})
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/msg',msg);
app.use('/addmedia', addmedia);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

init();

/**
 *  初始化系统
 **/
function init() {
    //全局变量db保存数据库连接
    global.db = '';
    //2.连接数据库
    orm.connect(conf.dbString, function (err, db) {
        if (err) {
            console.error('创建数据库连接错误:' + err);
            return;
        }
        //全局保存数据库连接
        global.db = db;
        //遍历model文件夹,获取全部的model文件
        var modelList = fs.readdirSync('./model');
        //异步加载model
        Promise.map(modelList, function (model) {
            return loadModel(db, path.join(__dirname , 'model', model));
        }).then(function () {
            console.log('加载model成功');
        }).catch(function (err) {
            console.error(err);
        })
    });
}

/**
 *  加载model进内存
 **/
function loadModel(db, model) {
    return new Promise(function (resolve, reject) {
        db.load(model, function (err) {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }
            resolve();
        })
    })
}

String.prototype.format = function (args) {
    if (arguments.length > 0) {
        var result = this;
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                var reg = new RegExp("({" + key + "})", "g");
                result = result.replace(reg, args[key]);
            }
        } 
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] == undefined) {
                    return "";
                } 
                else {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
        return result;
    } 
    else {
        return this;
    }
}
module.exports = app;

