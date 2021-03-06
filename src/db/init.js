require('@babel/register')({
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '12.13.1',
        },
      },
    ],
  ],
  plugins: ['@babel/plugin-proposal-optional-chaining'],
});

const user = require('./models/t-user').default;
const department = require('./models/t-department').default;
const staffStatus = require('./models/staff-status').default;
require('./models/staff-award').default;
require('./models/staff-basic').default;
require('./models/staff-copyright').default;
require('./models/staff-patent').default;
require('./models/staff-project').default;
require('./models/staff-thesis').default;
const sysTimeSet = require('./models/sys-time-set').default;
const sequelize = require('./db-connect');

Promise.all([
  // 先创建所有数据表
  sequelize.db.sync({
    force: true,
  }),
])
  .then(() =>
    // 开始创建数据
    Promise.all([
      user.create({
        uuid: 'admin',
        userName: 'admin',
        role: 1,
        isCancel: '未注销',
        phone: '18351923820',
        name: '超级管理员',
        password: '21232f297a57a5a743894a0e4a801fc3',
        defaultPassword: 'e10adc3949ba59abbe56e057f20f883e',
        department: '综合管理科',
        departmentUuid: 'zongheguanli',
      }),
      user.create({
        uuid: 'woshiyigeyuangong',
        userName: 'yuangong',
        role: 15,
        isCancel: '未注销',
        phone: '18351923820',
        name: '员工1',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        department: '战略研究科',
        departmentUuid: 'zhanlueyanjiuke',
        verifyStatus: '未提交',
      }),
      user.create({
        uuid: 'woshiyigetongji',
        userName: 'tongji',
        role: 10,
        isCancel: '未注销',
        phone: '18351923820',
        name: '统计1',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        department: '综合管理科',
        departmentUuid: 'zongheguanli',
      }),
      user.create({
        uuid: 'woshiyigepingshen',
        userName: 'pingshen',
        role: 5,
        isCancel: '未注销',
        phone: '18351923820',
        name: '评审1',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        department: '综合管理科',
        departmentUuid: 'zongheguanli',
      }),
      staffStatus.create({
        uuid: 'woshiyigeyuangong',
        userName: 'yuangong',
        name: '员工1',
        verifyStatus: '未提交',
        isCancel: '未注销',
      }),
      department.create({
        uuid: 'zhanlueyanjiuke',
        name: '战略研究科',
      }),
      department.create({
        uuid: 'zongheguanli',
        name: '综合管理科',
      }),
      department.create({
        uuid: 'caiwuke',
        name: '财务科',
      }),
      sysTimeSet.create({
        uuid: 'yuangong',
        sysSwitch: 1,
        timeSwitch: 0,
        userRole: 15,
      }),
      sysTimeSet.create({
        uuid: 'tongji',
        sysSwitch: 0,
        timeSwitch: 0,
        userRole: 10,
      }),
      sysTimeSet.create({
        uuid: 'pingshen',
        sysSwitch: 0,
        timeSwitch: 0,
        userRole: 5,
      }),
    ])
  )
  .then(() => {
    console.log('===数据库初始化成功===');
  })
  .catch((err) => {
    console.error('数据库初始化出错啦', err);
  });
