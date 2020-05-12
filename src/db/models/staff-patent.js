const Sequelize = require('sequelize');
const { db } = require('../db-connect');

export default db.define('staff_patent', {
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
  score: Sequelize.FLOAT(5, 2), // 得分
  reviewUserUuid: Sequelize.STRING(36), // 对其进行评分的评审员的uuid
  reviewTime: Sequelize.DATE, // 评审时间
  lastWriteTime: Sequelize.DATE, // 上次填写时间
  currentWriteTime: Sequelize.DATE, // 最新填写时间
  patentType: Sequelize.STRING(32), // 专利类型
  patentName: Sequelize.STRING(32), // 专利名称
  patentCode: Sequelize.STRING(32), // 授权号
  patentNation: Sequelize.STRING(32) // 授权国家
});
