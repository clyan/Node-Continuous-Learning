module.exports =app=>({
  "get /": app.$ctrl.user.user,
  "get /detail": app.$ctrl.user.detail
})


