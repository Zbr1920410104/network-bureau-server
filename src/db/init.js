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
require('./models/staff-award').default;
require('./models/staff-basic').default;
require('./models/staff-copyright').default;
require('./models/staff-patent').default;
require('./models/staff-project').default;
require('./models/staff-thesis').default;
require('./models/sys-time-set').default;
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
        password: 'e10adc3949ba59abbe56e057f20f883e',
        department: '管理科',
        departmentUuid: 'guanlike',
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
        verifyStatus: '未填写完毕',
      }),
      user.create({
        uuid: 'woshiyigetongji',
        userName: 'tongji',
        role: 10,
        isCancel: '未注销',
        phone: '18351923820',
        name: '统计1',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        department: '统计科',
        departmentUuid: 'tongjike',
      }),
      user.create({
        uuid: 'woshiyigepingshen',
        userName: 'pingshen',
        role: 5,
        isCancel: '未注销',
        phone: '18351923820',
        name: '评审1',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        department: '评审科',
        departmentUuid: 'pingshenke',
      }),
      department.create({
        uuid: 'zhanlueyanjiuke',
        name: '战略研究科',
      }),
      department.create({
        uuid: 'tongjike',
        name: '统计科',
      }),
      department.create({
        uuid: 'pingshenke',
        name: '评审科',
      }),
    ])
  )
  .then(() => {
    console.log('===数据库初始化成功===');
  })
  .catch((err) => {
    console.error('数据库初始化出错啦', err);
  });
