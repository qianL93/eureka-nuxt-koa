const fs = require('fs')
const path = require('path')
const router = require('koa-router')()
const _ = require('lodash')

function Filter(){
    this.filters = []
}
Filter.prototype = {
    addFilter(obj){
        if(!obj){
            return
        }
        if(typeof obj.path != 'string'){
            throw 'can not find a legal path'
        }
        if(typeof obj.filter != 'function'){
            throw 'can not find a filter function'
        }
        this.filters.push(obj)
    },
    getFilters(){
        return _.clone(this.filters)
    }
}

let filter = new Filter()

module.exports = {
    filter:filter,
    middleware:function (rootDir){
        readFilters(rootDir)
        let filters = filter.getFilters()
        for(filter of filters){
            router.get(filter.path, async (ctx, next) => {
                let model = await new Promise((resolve, reject) => {
                    try{
                        filter.filter(ctx,resolve)
                    }catch(e){
                        console.error(e)
                        resolve({})
                    }
                })
                ctx.req.model = model
                next()
            })
        }
        return router
    }
}

function readFilters(rootDir){
    function readFilter(dir) {
        fs
            .readdirSync(dir || '../filters')
            .filter(function (file) {
                if (fs.statSync(path.join(dir, file)).isFile()) {
                    return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js')
                } else {
                    readFilter(path.join(dir, file))
                }
            })
            .forEach(function (file) {
                try {
                    require(path.join(dir, file))
                } catch (e) {
                    console.error(e)
                }
            });
    }
    readFilter(rootDir)
}