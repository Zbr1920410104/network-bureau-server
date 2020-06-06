const Sequelize = require('sequelize');
const { db } = require('../db-connect');

const staffBasic = require('./staff-basic').default;
const staffProject = require('./staff-project').default;
const staffPatent = require('./staff-patent').default;
const staffCopyright = require('./staff-copyright').default;
const staffAward = require('./staff-award').default;
const staffThesis = require('./staff-thesis').default;

const user = db.define('t_user', {
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
  defaultPassword: Sequelize.STRING(32), // 默认密码
  department: Sequelize.STRING(32), // 科室
  departmentUuid: Sequelize.STRING(36), // 科室uuid
  // 以下字段仅供普通员工使用
  verifyStatus: Sequelize.STRING(32), // 核实状态(未填写完毕/待核实/核实不通过/核实通过)
  verifyTime: Sequelize.DATE, // 最新核实时间
  reviewTime: Sequelize.DATE, // 评审时间
  projectScoreSum: Sequelize.DECIMAL(5, 2), // 项目总得分
  patentScoreSum: Sequelize.DECIMAL(5, 2), // 专利总得分
  copyrightScoreSum: Sequelize.DECIMAL(5, 2), // 软件著作权总得分
  awardScoreSum: Sequelize.DECIMAL(5, 2), // 奖项总得分
  thesisScoreSum: Sequelize.DECIMAL(5, 2), // 论文/专著总得分
  totalScore: Sequelize.DECIMAL(5, 2), // 总得分
  lastWriteTime: Sequelize.DATE, // 上次填写时间
  currentWriteTime: Sequelize.DATE, // 最新填写时间
});

user.hasOne(staffBasic, {
  foreignKey: 'userUuid',
  sourceKey: 'uuid',
  as: 'staffBasic',
});

user.hasMany(staffProject, {
  foreignKey: 'userUuid',
  sourceKey: 'uuid',
  as: 'staffProject',
});

user.hasMany(staffPatent, {
  foreignKey: 'userUuid',
  sourceKey: 'uuid',
  as: 'staffPatent',
});

user.hasMany(staffCopyright, {
  foreignKey: 'userUuid',
  sourceKey: 'uuid',
  as: 'staffCopyright',
});

user.hasMany(staffAward, {
  foreignKey: 'userUuid',
  sourceKey: 'uuid',
  as: 'staffAward',
});

user.hasMany(staffThesis, {
  foreignKey: 'userUuid',
  sourceKey: 'uuid',
  as: 'staffThesis',
});

export default user;
