const Sequelize = require('sequelize');
const { db } = require('../db-connect');

export default db.define('t_user', {
  uuid: {
    type: Sequelize.STRING(36),
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  departmentUuid: Sequelize.STRING(36), // 科室uuid
  role: Sequelize.BIGINT(3), // 权限
  isCancel: Sequelize.STRING(32), // 是否注销
  isTotalVerify: Sequelize.STRING(32), // 是否整体审核通过
  phone: Sequelize.STRING(32),
  password: Sequelize.STRING(32),
  name: Sequelize.STRING(32), // 姓名
  userName: Sequelize.STRING(32), // 用户名
  department: Sequelize.STRING(32) // 科室
});
