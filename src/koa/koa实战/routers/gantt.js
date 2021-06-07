const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const router = new Router({prefix: '/api'})
const echarts = require('../public/mock/echarts.json')
router.post("/echarts",  ctx => {
   ctx.body =echarts
});

router.post("/echarts/update",  ctx => {

    const json =JSON.parse(JSON.stringify(echarts))
  /*console.log(JSON.stringify(json))*/
    json["data"]["satelliteTasks"][1]["task"][1]["taskName"] ="花里胡哨"
  ctx.body =JSON.parse(JSON.stringify(json))
    fs.writeFile(path.resolve(__dirname,'../public/mock/echarts.json'),JSON.stringify(json),(err)=>{
      if(err)
        console.log(err)
      console.log('写入成功')


    })

});
module.exports = router

