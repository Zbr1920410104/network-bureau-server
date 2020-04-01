const Sequelize = require('sequelize');
const { db } = require('../db-connect');

export default db.define('staff_project', {
  uuid: {
    type: Sequelize.STRING(36),
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  userUuid: Sequelize.STRING(36), // 员工uuid
  verifyRemarks: Sequelize.TEXT, // 统计员回退备注
  isVerify: Sequelize.STRING(32), // 是否通过核实
  verifyUserUuid: Sequelize.STRING(36), // 对其进行核实的统计员的uuid
  verifyTime: Sequelize.DATE, // 核实时间
  reviewRemarks: Sequelize.TEXT, // 评审员回退备注
  score: Sequelize.STRING(32), // 得分
  reviewUserUuid: Sequelize.STRING(36), // 对其进行评分的评审员的uuid
  reviewTime: Sequelize.DATE, // 评审时间
  lastWriteTime: Sequelize.DATE, // 上次填写时间
  currentWriteTime: Sequelize.DATE, // 最新填写时间
  type: Sequelize.BIGINT(11), // 项目类型(1:主持,2:参与)
  name: Sequelize.STRING(32), // 项目名称
  time: Sequelize.DATE, // 项目起止时间
  code: Sequelize.STRING(32), // 项目编号
  resource: Sequelize.STRING(32), // 项目来源
  funds: Sequelize.STRING(32), // 项目经费(万元)
  participant: Sequelize.STRING(32), // 参与者名单
  content: Sequelize.TEXT, // 主要研究内容
});
