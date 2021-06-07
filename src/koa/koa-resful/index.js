const Koa = require("koa");
const app = new Koa();
const mongoose = require('./models/mongoose')
const getVip = require('./middleware/get-vip')

const session = require('koa-session')

// 跨域
var cors = require('koa2-cors');
app.use(cors());

// 签名key keys作用 用来对cookie进行签名
app.keys = ['some secret'];

// 配置项
const SESS_CONFIG = {
    key: 'kkb:sess', // cookie键名
    // maxAge: 86400000, // 有效期，默认一天
    // httpOnly: true, // 仅服务器修改
    // signed: true, // 签名cookie
};

// 为koa上下文扩展一些校验方法
const bouncer = require("koa-bouncer");
app.use(bouncer.middleware());

// 注册
app.use(session(SESS_CONFIG, app));

const bodyparser = require('koa-bodyparser')
app.use(bodyparser())

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        // 响应用户
        ctx.status = error.statusCode || error.status || 500;
        ctx.body = error.message;

        // 触发应用层级错误事件
        ctx.app.emit("error", error, ctx);
        console.log('捕获到错误：', error.message);
    }
});

// 静态服务
const static = require("koa-static");
app.use(static(__dirname + '/public'));

app.use(getVip)

// 响应时间输出中间件
app.use(async (ctx, next) => {
    await next();
    // 获取响应头，印证执行顺序
    const rt = ctx.response.get('X-Response-Time');
    console.log(`输出计时：${ctx.method} ${ctx.url} - ${rt}`);
});

// 响应时间统计中间件
app.use(async (ctx, next) => {
    const start = Date.now();
    console.log('开始计时');
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
    console.log('计时结束');
});

const hbs = require('koa-hbs')
const helpers = require('./utils/helpers')
app.use(hbs.middleware({
    viewPath: __dirname + '/views', //视图根目录
    defaultLayout: 'layout', //默认布局页面
    partialsPath: __dirname + '/views/partials', //注册partial目录
    disableCache: true //开发阶段不缓存
}));

const index = require('./routes/index');
const users = require('./routes/users');
const api = require('./routes/api');
app.use(index.routes());
app.use(users.routes());
app.use(require('./routes/students').routes())
app.use(api.routes());

app.on('error', (err, ctx) => {
    console.error(err);
    // console.log('没得事')
    // throw err
})

//开始监听端口，等同于http.createServer(app.callback()).listen(3000);
app.listen(3000);
