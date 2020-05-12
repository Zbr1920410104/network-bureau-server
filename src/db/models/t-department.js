const Sequelize = require('sequelize');
const { db } = require('../db-connect');

export default db.define('t_department', {
  uuid: {
    type: Sequelize.STRING(36),
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  name: Sequelize.STRING(32) // 科室名
});
