const Koa = require("koa");
const http = require("http");
const hbs = require('koa-hbs')
const bodyParser = require('koa-bodyparser')
const app = new Koa({proxy:true});
const mongoose = require('./models/mongoose')
const getVip = require('./middleware/get-vip')

//... static
app.use(getVip)
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*")
  await next()
})
app.use(bodyParser())
// 响应时间输出中间件
app.use(async (ctx, next) => {
    await next();  // 获取响应头，印证执行顺序  
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

//错误处理
//错误处理中间件
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

app.use(hbs.middleware({
    viewPath: __dirname + '/views', //视图根目录    
    defaultLayout: 'layout', //默认布局页面
    partialsPath: __dirname + '/views/partials', //注册partial目录
    disableCache: true//开发阶段不缓存
}));


const static = require('koa-static')
app.use(static(__dirname + '/public'))

const index = require('./routers/index')
const users = require('./routers/user')
const api = require('./routers/gantt')
app.use(index.routes())
app.use(users.routes())
app.use(api.routes())
//开始监听端口，等同于//http.createServer(app.callback()).listen(3000);
app.listen(3000);
