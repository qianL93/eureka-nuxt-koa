const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        Id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        LastName: Sequelize.STRING,
        FirstName: Sequelize.STRING,
        Address: Sequelize.STRING,
        City: Sequelize.STRING,
    }, {
        timestamps: false,
        freezeTableName: true
    })
}