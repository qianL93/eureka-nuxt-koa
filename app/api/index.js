const router = require('koa-router')()

router.get('/dd', async (ctx, next) => {
  let model = {
    a: 'render'
  }
  ctx.body = model
})

router.get('/hello', async (ctx, next) => {
  let model = {
    a: 'render'
  }
  ctx.body = model
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
