const Sequelize = require("sequelize");
const { db } = require("../db-connect");

export default db.define("staff_status", {
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
  thesisWriteStatus: Sequelize.STRING(32), // 论文填写状态
  bookWriteStatus: Sequelize.STRING(32), // 专著填写状态
  scienceWriteStatus: Sequelize.STRING(32), // 科技成果转化填写状态
  // 核实状态
  basicVerifyStatus: Sequelize.STRING(32), // 基本信息核实状态
  projectVerifyStatus: Sequelize.STRING(32), // 项目核实状态
  patentVerifyStatus: Sequelize.STRING(32), // 专利核实状态
  copyrightVerifyStatus: Sequelize.STRING(32), // 软件著作权核实状态
  awardVerifyStatus: Sequelize.STRING(32), // 奖项核实状态
  thesisVerifyStatus: Sequelize.STRING(32), // 论文核实状态
  bookVerifyStatus: Sequelize.STRING(32), // 专著核实状态
  scienceVerifyStatus: Sequelize.STRING(32), // 科技成果转化核实状态
});
