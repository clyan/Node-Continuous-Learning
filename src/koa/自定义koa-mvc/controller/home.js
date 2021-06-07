module.exports =app=>({
    index: async (ctx) =>{
      const a=await app.$service.index.getList()
      ctx.body = a
    },
    detail: async (ctx) =>{
      ctx.body ="首页详情"
    }
})
