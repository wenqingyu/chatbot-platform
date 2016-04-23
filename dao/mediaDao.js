//数据操作层
module.exports = Media = function () { };

/**
 *  获取资源列表
 **/
Media.prototype.getMedia = function (type) {
    return new Promise(function (resolve, reject) {
        if (type) {
            db.driver.execQuery("SELECT * FROM media WHERE type = ? ORDER BY RAND() LIMIT 1", [type], function (err, media) {
                if (err) return reject(err);
                if (media && media.length > 0) {
                    resolve(media[0]);
                } else {
                    resolve();
                }
            })
        } else { 
            db.driver.execQuery("SELECT * FROM media ORDER BY RAND() LIMIT 1", function (err, media) {
                if (err) return reject(err);
                resolve(media);
            })
        }        
    })
}

/**
 * 插入资源
 **/
Media.prototype.insertMedia = function (item) {
    return new Promise(function (resolve, reject) {
        db.models['media'].create(item, function (err, item) {
            if (err) {
                reject(err);
                return;
            }
            resolve(item);
        })
    })
}