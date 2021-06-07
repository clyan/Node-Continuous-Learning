const Router = require('koa-router')
const router = new Router()

router.get("/", async (ctx) => {
    const list = [...ctx.state.vipCourses]
    list.sort((a,b)=> (a.sort - b.sort))
    await ctx.render('index',{
        showVideo:true,
        list:list
    })
});
module.exports = router

