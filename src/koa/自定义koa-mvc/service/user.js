const delay = (data, tick) => new Promise(resolve => {
  setTimeout(() => {
    resolve(data)
  }, tick)
})

// 可复用的服务 一个同步，一个异步
module.exports =  app=>({
  async getName() {
    const userInfo = await app.$model.user.findAll()
/*    console.log(JSON.stringify(userInfo))*/
    return userInfo
  },
  getAge() {
    return 20
  }
});
