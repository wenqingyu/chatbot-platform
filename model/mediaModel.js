//定义表结构Model
module.exports = function (db, cb) {
    //define方法的第一个参数为表名
    db.define('media', {
        id: { type: 'serial', key: true } , //主键
        image: String,
        title: String,
        description: String,
        url: String,
        type: String,
        createtime: Date
    });
    return cb();
}