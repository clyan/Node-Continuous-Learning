const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const schedule = require('node-schedule')
const Sequelize = require('sequelize')

//读取目录
function load(dir, cb) {
  const url = path.resolve('.', dir)
  const files = fs.readdirSync(url)
  files.forEach(filename => {
    filename = filename.replace('.js', '')
    const file = require(url + '/' + filename)
    cb(filename, file)
  })
}

//初始路由
function initRouter(app) {
  const router = new Router();
  //读取routes目录，
  load("routes", (filename, routes) => {
    const prefix = filename === "index" ? "" : `/${filename}`;
    routes = typeof routes === 'function' ? routes(app) : routes
    //遍历当前文件的所有key,
    Object.keys(routes).forEach(key => {
      /*获取请求方式和请求地址*/
      const [method, path] = key.split(" ");

      console.log(`正在映射地址：${method.toLocaleUpperCase()} ${prefix}${path}`);
      //router做出响应
      router[method](prefix + path, routes[key])
    });
  });
  return router;
}

function initController(app) {
  const controllers = {};
  // 读取控制器目录  
  load("controller", (filename, controller) => {
    // 添加路由    
    controllers[filename] = controller(app);
  });
  return controllers;
}

function initService(app) {
  const services = {};
  // 读取控制器目录
  load("service", (filename, service) => {
    // 添加路由
    services[filename] = service(app);
  });
  return services;
}

function initSchedule() {
  const schedules = {};
  // 读取控制器目录
  load("schedule", (filename, scheduleConfig) => {
    schedule.scheduleJob(scheduleConfig.interval, scheduleConfig.handler)
  });
}

function initConfig(app) {
  const schedules = {};
  console.log(typeof app)
  // 读取控制器目录
  load("config", (filename, conf) => {
    if (conf.db) {
      /*      Object.defineProperty(app,"$db",{
              value:new Sequelize(conf.db)
            })*/
      app.$db = new Sequelize(conf.db)
      app.$model = {}
      load("model", (filename, {schema, options}) => {
        app.$model[filename] = app.$db.define(filename, schema, options)
      });
      app.$db.sync({force: true})
    }

    if (conf.middleware) {
      conf.middleware.forEach(mid => {
        const midPath = path.resolve('.', "middleware", mid);
        app.$app.use(require(midPath));
      });
    }

  });
}

// kkb.js this.$service = initService();
module.exports = {initRouter, initController, initService, initSchedule, initConfig};

/*测试*/
//load('routes',(filename)=>{console.log(filename)})
