/**
 * Created by thomasyu on 4/21/16.
 */

module.exports = {
    corePath: "localhost:5000",
    dbString: 'mysql://root:123456@139.196.203.14/wechat?pool=true&debug=true',   //数据库连接字符串
    bot: 'http://www.xiaodoubi.com/simsimiapi.php?msg={0}',
    //资源
    media: {
        entertainment: ['entertainment', '音乐', 'music', '歌曲'],
        shopping: ['shopping', '商店', '购物', '东西', '买', '卖'],
        news: ['news', '阅读', '新闻', '潮流', '信息', '时尚']
    }
}
