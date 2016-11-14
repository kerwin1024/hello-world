//以后的路径就是相对于baeURl
var baseUrl = '';   //默认原样
exports.map = function(name){
    return baseUrl + name;
};