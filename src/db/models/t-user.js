const Sequelize = require('sequelize');
const { db } = require('../db-connect');

export default db.define('t_user', {
  uuid: {
    type: Sequelize.STRING(36),
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  role: Sequelize.BIGINT(3), // 权限
  name: Sequelize.STRING(32), // 姓名
  userName: Sequelize.STRING(32), // 用户名
  isCancel: Sequelize.STRING(32), // 是否注销
  phone: Sequelize.STRING(32),
  password: Sequelize.STRING(32),
  department: Sequelize.STRING(32), // 科室
  departmentUuid: Sequelize.STRING(36), // 科室uuid
  // 以下字段仅供普通员工使用
  verifyStatus: Sequelize.STRING(32), // 核实状态(未填写完毕/待核实/核实不通过/核实通过)
  verifyTime: Sequelize.DATE, // 最新核实时间
  reviewTime: Sequelize.DATE, // 评审时间
  totalScore: Sequelize.FLOAT(5, 2), // 总得分
  lastWriteTime: Sequelize.DATE, // 上次填写时间
  currentWriteTime: Sequelize.DATE, // 最新填写时间
});
