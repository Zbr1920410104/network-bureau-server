const Sequelize = require('sequelize');
const { db } = require('../db-connect');

export default db.define('sys_time_set', {
  uuid: {
    type: Sequelize.STRING(36),
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  startTime: Sequelize.DATE,
  endTime: Sequelize.DATE,
  userRole: Sequelize.TEXT // 用户权限
});
