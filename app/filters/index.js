const filter = require('../utils/filter').filter
filter.addFilter({
    path:'/',
    filter:function(ctx, next){
        next({
            a:'render filter'
        })
    }
})

filter.addFilter({
    path:'/test',
    filter:function(ctx, next){
        console.info('test')
        next({
            a:'render filter'
        })
    }
})