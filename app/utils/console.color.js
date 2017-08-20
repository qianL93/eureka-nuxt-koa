const _ = require('lodash')
const chalk = require('chalk');
const _console = {
    error:console.error,
    warn:console.warn,
    info:console.info,
}
console._console = _console
// try{
//     throw 'this is a error'
// }catch(e){
//     console.error(e)
// }
console.error = function(){
    let args = []
    _.each(arguments,(item) => {
        item = color(item,'red')
        args.push(item)
    })
    _console.error.apply(this,args)
}

console.warn = function(){
    let args = []
    _.each(arguments,(item) => {
        item = color(item,'yellow')
        args.push(item)
    })
    _console.warn.apply(this,args)
}

console.info = function(){
    let args = []
    _.each(arguments,(item) => {
        item = color(item,'green')
        args.push(item)
    })
    _console.info.apply(this,args)
}

// try{
//     throw 'this is a error'
// }catch(e){
//     console.error(e)
// }
function color(item,color){
    item && item.message? item.message = chalk[color](item.message) : item = chalk[color](item)
    return item
}