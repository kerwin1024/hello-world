var express = require("express");
var router = express.Router();

/*GET home page*/
router.get('/', function (req, res, next) {
    //render(路由页面，上下文对象)
    res.render('index', {title: 'Express'});
});

module.exports=router;