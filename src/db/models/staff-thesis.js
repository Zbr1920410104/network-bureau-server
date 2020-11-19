const Sequelize = require('sequelize');
const { db } = require('../db-connect');

export default db.define('staff_thesis', {
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
  thesisTitle: Sequelize.STRING(32), // 标题
  thesisJournal: Sequelize.STRING(32), // 发表期刊名称
  thesisTime: Sequelize.DATE, // 发表时间
  thesisGrade: Sequelize.STRING(32), // 期刊级别
  thesisCode: Sequelize.STRING(32), // 论文索引号
  thesisFirstAuthor: Sequelize.STRING(32), // 第一作者
  thesisAuthorSequence: Sequelize.STRING(32), // 提交人作者次序
  firstUrl: Sequelize.TEXT, // 第一个url
  secondUrl: Sequelize.TEXT, // 第二个url
  thirdUrl: Sequelize.TEXT, // 第三个url
});
