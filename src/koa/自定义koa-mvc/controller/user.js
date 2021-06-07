module.exports =app=>({
  user: async (ctx) =>{
    ctx.body =await app.$service.user.getName()
  },
  detail: async (ctx) =>{
    ctx.body ="用户详情"
  }
})
