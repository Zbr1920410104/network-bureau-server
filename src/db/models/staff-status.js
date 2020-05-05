const Sequelize = require('sequelize');
const { db } = require('../db-connect');

export default db.define('staff_status', {
  uuid: {
    type: Sequelize.STRING(36),
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: Sequelize.STRING(32), // 姓名
  userName: Sequelize.STRING(32), // 用户名
  verifyStatus: Sequelize.STRING(32), // 核实状态(未提交/待核实/核实不通过/核实通过)
  isCancel: Sequelize.STRING(32), // 是否注销
  // 填写状态
  basicWriteStatus: Sequelize.STRING(32), // 基本信息填写状态
  projectWriteStatus: Sequelize.STRING(32), // 项目填写状态
  patentWriteStatus: Sequelize.STRING(32), // 专利填写状态
  copyrightWriteStatus: Sequelize.STRING(32), // 软件著作权填写状态
  awardWriteStatus: Sequelize.STRING(32), // 奖项填写状态
  thesisWriteStatus: Sequelize.STRING(32), // 论文/专著填写状态
  // 核实状态
  basicVerifyStatus: Sequelize.STRING(32), // 基本信息核实状态
  basicVerifyRemarks: Sequelize.TEXT, // 统计员回退备注
  isBasicVerify: Sequelize.STRING(32), // 是否通过核实
  basicVerifyUserUuid: Sequelize.STRING(36), // 对其进行核实的统计员的uuid

  projectVerifyStatus: Sequelize.STRING(32), // 项目核实状态
  projectVerifyRemarks: Sequelize.TEXT, // 统计员回退备注
  isProjectVerify: Sequelize.STRING(32), // 是否通过核实
  projectVerifyUserUuid: Sequelize.STRING(36), // 对其进行核实的统计员的uuid

  patentVerifyStatus: Sequelize.STRING(32), // 专利核实状态
  patentVerifyRemarks: Sequelize.TEXT, // 统计员回退备注
  isPatentVerify: Sequelize.STRING(32), // 是否通过核实
  patentVerifyUserUuid: Sequelize.STRING(36), // 对其进行核实的统计员的uuid

  copyrightVerifyStatus: Sequelize.STRING(32), // 软件著作权核实状态
  copyrightVerifyRemarks: Sequelize.TEXT, // 统计员回退备注
  isCopyrightVerify: Sequelize.STRING(32), // 是否通过核实
  copyrightVerifyUserUuid: Sequelize.STRING(36), // 对其进行核实的统计员的uuid

  awardVerifyStatus: Sequelize.STRING(32), // 奖项核实状态
  awardVerifyRemarks: Sequelize.TEXT, // 统计员回退备注
  isAwardVerify: Sequelize.STRING(32), // 是否通过核实
  awardVerifyUserUuid: Sequelize.STRING(36), // 对其进行核实的统计员的uuid

  thesisVerifyStatus: Sequelize.STRING(32), // 论文/专著核实状态
  thesisVerifyRemarks: Sequelize.TEXT, // 统计员回退备注
  isThesisVerify: Sequelize.STRING(32), // 是否通过核实
  thesisVerifyUserUuid: Sequelize.STRING(36), // 对其进行核实的统计员的uuid
});
