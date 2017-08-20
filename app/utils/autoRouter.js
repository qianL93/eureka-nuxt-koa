const fs = require('fs')
const path = require('path')
const router = require('koa-router')()
const _ = require('lodash')
const chalk = require('chalk');

module.exports = function (app, rootDir) {
    function readRoutes(dir) {
        fs
            .readdirSync(dir || '../api')
            .filter(function (file) {
                if (fs.statSync(path.join(dir, file)).isFile()) {
                    return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js')
                } else {
                    readRoutes(path.join(dir, file))
                }
            })
            .forEach(function (file) {
                try {
                    let _router = require(path.join(dir, file))
                    if (_router instanceof router.constructor) {
                        app.use(_router.routes(), _router.allowedMethods())
                        _.each(_router.stack || [], (item) => {
                            if (item.path) {
                                if (Array.isArray(item.methods)) {
                                    console.log(`"${chalk.green(item.path)}" "[${item.methods.toString()}]"`)
                                } else {
                                    console.log(`"${chalk.green(item.path)}"`)
                                }
                            }
                        })
                    }
                } catch (e) {
                    console.error(e)
                }
            });
    }

    console.info(`api:`)
    readRoutes(rootDir)
    console.log(`\n`)
}