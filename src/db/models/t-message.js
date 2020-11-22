const Sequelize = require('sequelize');
const {
    db
} = require('../db-connect');

export default db.define('t_message', {
    uuid: {
        type: Sequelize.STRING(36),
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    userUuid: Sequelize.STRING(36), // 用户名
    userName: Sequelize.STRING(32), // 用户姓名
    message: Sequelize.TEXT, // 消息
});