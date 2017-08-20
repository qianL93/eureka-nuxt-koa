"user strict";
const _ = require('lodash')
const queue = require('../app/utils/queue')

const func1 = function () {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            var o = u
            setTimeout(function () {
                console.log('func3', u)
                console.log(u == o)
                u++
                resolve()
            }, 10)
        }, 100)
    })
}

const func2 = function () {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            var o = u
            setTimeout(function () {
                console.log('func4', u)
                console.log(u == o)
                u++
                resolve()
            }, 20)
        }, 20)
    });
}
setTimeout(function () {
    queue.pushqueue({
        func: func1,
        args: [1],
    })
}, 0);

setTimeout(function () {
    queue.pushqueue({
        func: func2,
        args: [1]
    })
}, 1000);
