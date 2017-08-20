const User = require('../defines/index').user
const queue = require('../../utils/queue/index')

const atomic = {
    async addUser(user) {
        return await User.create({
            LastName:user.LastName,
            FirstName:user.FirstName,
            Address:user.Address,
            City:user.City
        })
    }
}


module.exports = {
    async addUser(user) {
        let res = await queue.pushqueue({
            func: atomic.addUser,
            args: [user],
            context:this
        })
        return res
    }
}