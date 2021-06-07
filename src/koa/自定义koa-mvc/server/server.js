const koa = require('koa')
const path = require('path')
const {initRouter,initController,initService,initSchedule,initConfig} =require('./lib/mvc-loader')
class Server {
  constructor(conf){
    this.$app = new koa(conf)
    //先加载配置
    initConfig(this)
    // 先初始化控制器，路由对它有依赖
    this.$service = new initService(this)
    this.$ctrl = new initController(this)
    this.$route = new initRouter(this)
    this.$app.use(this.$route.routes())
   /* initSchedule()*/
  }

  start(port){
    this.$app.listen(port,()=>{
      console.log(`访问http://localhost:${port}`)
    })
  }
}
module.exports = Server
