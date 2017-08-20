"user strict";
const _ = require('lodash')
function queue() {
    this.queueList = []
}
queue.prototype = {
    outqueue() {
        if (this.queueList.length) {
            return this.queueList.shift()
        } else {
            return false
        }
    },
    async pushqueue(obj) {
        return await new Promise((resolve, reject) => {
            if (typeof obj.cb != 'function') {
                obj.cb = function (rs) {
                    resolve(rs)
                }
                this.queueList.push(obj)
                if (this.queueList.length === 1) {
                    this.execqueue()
                }
            } else {
                this.queueList.push(obj)
                if (this.queueList.length === 1) {
                    this.execqueue()
                }
                resolve()
            }
        })
    },
    execqueue() {
        if (this.queueList.length >= 1) {
            this.runqueue(this.queueList[0]).then(rs => {
                this.outqueue()
                this.execqueue()
            })
        } else {
            return
        }
    },
    async runqueue(obj) {
        if (obj && obj.func && obj.args && obj.args.length && isFunction(obj.func)) {
            if (obj.context) {
                let result
                try {
                    result = await obj.func.apply(obj.context, obj.args)
                }catch(e){
                    console.error(e)
                }
                if (isFunction(obj.cb)) {
                    obj.cb(result)
                }
                return
            } else {
                async function _cb() {
                    let result
                    try {
                        result = await obj.func.apply(this, obj.args)
                    } catch (e) {
                        console.error(e)
                    }
                    if (isFunction(obj.cb)) {
                        obj.cb(result)
                    }
                    return
                }
                await _cb()
                return
            }
        } else {
            throw 'item of queue must be a legal object'
        }
    },
    getLength() {
        return this.queueList.length
    }
}
function isFunction(obj) {
    return typeof obj == 'function'
}
function errorHandle(obj) {

}

module.exports = new queue()
