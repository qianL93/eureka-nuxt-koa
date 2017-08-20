"user strict";
const _ = require('lodash')
const queue = require('../app/utils/queue')


global.u = 0;
const func1 = function () {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            var o = u
            setTimeout(function () {
                console.log('func1', u)
                console.log(u == o)
                u++
                resolve(u)
            }, 100)
        }, 100)
    })
}

const func2 = function () {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            var o = u
            setTimeout(function () {
                console.log('func2', u)
                console.log(u == o)
                u++
                resolve(u)
            }, 200)
        }, 50)
    });
}
setTimeout(function () {
    queue.pushqueue({
        func: func1,
        args: [1],
    }).then(rs => {
        console.log(u)
    })
}, 0)
setTimeout(function () {
    queue.pushqueue({
        func: func2,
        args: [1]
    }).then(rs => {
        console.log(u)
    })
}, 0)

require('./sub_queue')