const User = require('./user')
const utils = require('../../utils/db2obj')

User.addUser({
    FirstName:'qian2',
    LastName:'liu',
    City:'chongqing',
    Address:'nqjy'
}).then(rs => {
    return utils.toOBJ(rs)
}).then(rs => {
    console.log(rs)
})