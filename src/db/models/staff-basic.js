const Sequelize = require('sequelize');
const { db } = require('../db-connect');

export default db.define('staff_basic', {
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
  lastWriteTime: Sequelize.DATE, // 上次填写时间
  currentWriteTime: Sequelize.DATE, // 最新填写时间
  name: Sequelize.STRING(32), // 姓名
  idNumber: Sequelize.STRING(32), // 身份证号
  sex: Sequelize.STRING(32), // 性别
  nation: Sequelize.STRING(32), // 民族
  nativePlace: Sequelize.STRING(32), // 籍贯
  politicalAffiliation: Sequelize.STRING(32), // 政治面貌
  department: Sequelize.STRING(32), // 科室
  officePhone: Sequelize.STRING(32), // 办公电话
  phone: Sequelize.STRING(32), // 手机号码
  education: Sequelize.STRING(32), // 学历
  degree: Sequelize.STRING(32), // 学位
  graduateSchool: Sequelize.STRING(32), // 毕业学校
  major: Sequelize.STRING(32), // 所学专业
  duty: Sequelize.STRING(32), // 职务
  workTime: Sequelize.DATE, // 参加工作时间
  professionTitle: Sequelize.STRING(32), // 职称
  getTime: Sequelize.DATE, // 获得时间
  researchDirection: Sequelize.STRING(32), // 研究方向
  studyExperience: Sequelize.TEXT, // 学习经历
  workExperience: Sequelize.TEXT, // 工作经历
  skills: Sequelize.TEXT, // 技能
  professionalPromotion: Sequelize.TEXT, // 职称晋升
  currentProfession: Sequelize.TEXT, // 现聘职称
});
