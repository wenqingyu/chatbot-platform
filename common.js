/*
   公用方法
 * */

/*
 * 采用递归执行promise和generate
 * */
function run(generator) {
    function go(result) {
        if (result.done) return result.value;
        
        return result.value.then(function (value) {
            return go(generator.next(value));
        }, function (error) {
            return go(generator.throw(value));
        });
    }
    
    go(generator.next());
}
exports.run = run;