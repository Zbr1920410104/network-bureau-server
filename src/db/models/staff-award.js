const Sequelize = require('sequelize');
const { db } = require('../db-connect');

export default db.define('staff_award', {
  uuid: {
    type: Sequelize.STRING(36),
    primaryKey: true,
    allowNull: false,
    unique: true,
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
  awardType: Sequelize.STRING(32), // 奖项类型
  awardName: Sequelize.STRING(32), // 奖项名称
  awardTime: Sequelize.DATE, // 获奖时间
  awardGrade: Sequelize.STRING(32), // 奖项级别
  awardDepartment: Sequelize.STRING(32), // 颁奖部门
  awardNameList: Sequelize.STRING(32), // 获奖名单
  awardRank: Sequelize.STRING(32), // 获奖排位
  firstUrl: Sequelize.TEXT, // 第一个url
  secondUrl: Sequelize.TEXT, // 第二个url
  thirdUrl: Sequelize.TEXT, // 第三个url
});
