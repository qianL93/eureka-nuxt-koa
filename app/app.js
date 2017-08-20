const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')


const autoRouter = require('./utils/autoRouter')
const path = require('path')

const nuxtRender = require('./utils/nuxtRender')

const filter = require('./utils/filter').middleware(path.join(__dirname,'filters'))

const Nuxt = require('nuxt').Nuxt
const Builder = require('nuxt').Builder
const nuxtconfig = require('../nuxt.config.js')
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(path.join(__dirname , '../static')))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


let nuxt = new Nuxt(nuxtconfig)

new Builder(nuxt).build()

app.use(async (ctx,next) => {
  let render = new nuxtRender(nuxt, ctx)
  ctx.nuxtRender = render.nuxtRender.bind(render)
  await next()
})

app.use(async (ctx,next) => {
  await next()
  if(ctx.status == 404){
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  }
})

//filter
app.use(filter.routes(), filter.allowedMethods())

// api routes
autoRouter(app,path.join(__dirname,'api'))


module.exports = app
