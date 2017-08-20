function render(nuxt, ctx){
    this.nuxt = nuxt
    this.ctx = ctx
}
render.prototype = {
    async nuxtRender(view, data){
        this.ctx.req.model = data
        await this.nuxt.renderRoute(view, this.ctx).then(rs => {
            this.ctx.status = 200
            this.ctx.body = rs.html
            return rs
          }).catch(err => {
            console.error(err)
            this.ctx.status = 500
            this.ctx.body = err
            return {}
          })
    }
}
module.exports = render;