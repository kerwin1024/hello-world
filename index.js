//引入express框架
var express = require('express');
//实例化express
var app = express();
//引入body-parser解析表单
var bodyparser = require('body-parser');
//path
var path = require('path');
//设置站点图标
var favicon = require('serve-favicon');

//视图引擎、hbs
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
    extname: '.hbs',
    //辅助函数，给出静态资源链接
    helpers: {
        static: function (name) {
            return require('./lib/static.js').map(name);
        },
        section: function (name, options) {
            if (this._section) this._section = {};
            this._section[name] = options.fn(this);
            return null;
        }
    }
});
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');


//静态资源statis server
app.use(express.static(__dirname + '/public'));
//设置ico
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//自定义模块位置
var routers_index = require('./routes/index')
//端口号
app.set('port', process.env.PORT || 4002);

app.use(bodyparser());
//中间件（局部文件）
app.use(function (req, res, next) {
    if (!res.locals.partials) res.locals.partials = {};
    res.locals.partials.discountContext = {
        locations: [{product: 'book', price: '99.00'}]
    };
    next();
});
// 设置路由
app.use('/', routers_index);
//定制404页面
app.use(function (req, res) {
    res.status(404);
    res.render('errors/404', {layout: null});   //不使用布局
});
//定制500页面
app.use(function (req, res, err) {
    console.error(err.stack);
    res.status(500);
    res.render('errors/500', {layout: 'error', title: 'This pang with error layout'}); //使用指定布局
});
// listen
app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + "; press Ctrl+c to terminate.");
});


//map属性？use属性？中间件？