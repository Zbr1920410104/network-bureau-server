import department from '../../../db/models/t-department';
import timeSet from '../../../db/models/sys-time-set';
import user from '../../../db/models/t-user';
import staffStatus from '../../../db/models/staff-status';
import staffBasic from '../../../db/models/staff-basic';
import staffProject from '../../../db/models/staff-project';
import staffPatent from '../../../db/models/staff-patent';
import staffCopyright from '../../../db/models/staff-copyright';
import staffAward from '../../../db/models/staff-award';
import staffThesis from '../../../db/models/staff-thesis';

import Sequelize from 'sequelize';
const Op = Sequelize.Op,
  { or } = Sequelize.Op;

// uuid
import uuid from 'uuid';

// 加密
import md5 from 'md5';

import { MANAGER_PAGE_SIZE } from '../../../config/system-config';

// 工具类
import roleToText from '../../../util/role-to-text';
import xlsx from 'node-xlsx';
import CustomError from '../../../util/custom-error';
import webToken from '../../../util/token';

// oss
import client from '../../../util/oss';

export default {
  /**
   * 查询科室(通过名字)
   */
  selectDepartmentByName: (name) =>
    department.findOne({
      attributes: ['uuid', 'name'],
      where: { name },
      raw: true,
    }),
  /**
   * 查询科室
   */
  quaryDepartmentByPage: async (page) => {
    const result = await department.findAndCountAll({
      attributes: ['uuid', 'name'],
      limit: MANAGER_PAGE_SIZE,
      offset: (page - 1) * MANAGER_PAGE_SIZE,
      raw: true,
    });
    return {
      departmentList: result.rows,
      total: result.count,
      pageSize: MANAGER_PAGE_SIZE,
    };
  },
  /**
   * 添加科室
   */
  insertDepartment: (name) =>
    department.create(
      {
        uuid: uuid.v1(),
        name,
      },
      { raw: true }
    ),
  /**
   * 删除科室
   */
  deleteDepartment: (uuid) =>
    department.destroy({
      where: { uuid },
      raw: true,
    }),
  /**
   * 保存统计管理员系统时间
   */
  updateBusinessManagerTime: ({
    startTime,
    endTime,
    sysSwitch,
    timeSwitch,
  }) => {
    if (sysSwitch && timeSwitch && startTime > endTime) {
      throw new CustomError('开始时间不得早于截止时间');
    } else if (sysSwitch && timeSwitch && new Date(endTime) < new Date()) {
      throw new CustomError('截止时间不得早于当前时间');
    } else {
      return timeSet.update(
        {
          sysSwitch,
          timeSwitch,
          startTime,
          endTime,
        },
        { where: { userRole: 10 }, raw: true }
      );
    }
  },
  /**
   * 创建统计管理员系统时间
   */
  insertBusinessManagerTime: ({
    startTime,
    endTime,
    sysSwitch,
    timeSwitch,
  }) => {
    if (sysSwitch && timeSwitch && startTime > endTime) {
      throw new CustomError('开始时间不得早于截止时间');
    } else if (sysSwitch && timeSwitch && new Date(endTime) < new Date()) {
      throw new CustomError('截止时间不得早于当前时间');
    } else {
      return timeSet.create(
        {
          uuid: uuid.v1(),
          sysSwitch,
          timeSwitch,
          startTime,
          endTime,
          userRole: 10,
        },
        { raw: true }
      );
    }
  },
  /**
   * 查询统计管理员系统时间
   */
  selectBusinessManagerTime: () =>
    timeSet.findOne({
      attributes: ['startTime', 'endTime', 'sysSwitch', 'timeSwitch'],
      where: { userRole: 10 },
      raw: true,
    }),
  /**
   * 保存评审管理员系统时间
   */
  updateReviewManagerTime: ({ startTime, endTime, sysSwitch, timeSwitch }) => {
    if (sysSwitch && timeSwitch && startTime > endTime) {
      throw new CustomError('开始时间不得早于截止时间');
    } else if (sysSwitch && timeSwitch && new Date(endTime) < new Date()) {
      throw new CustomError('截止时间不得早于当前时间');
    } else {
      return timeSet.update(
        {
          sysSwitch,
          timeSwitch,
          startTime,
          endTime,
        },
        { where: { userRole: 5 }, raw: true }
      );
    }
  },
  /**
   * 创建评审管理员系统时间
   */
  insertReviewManagerTime: ({ startTime, endTime, sysSwitch, timeSwitch }) => {
    if (sysSwitch && timeSwitch && startTime > endTime) {
      throw new CustomError('开始时间不得早于截止时间');
    } else if (sysSwitch && timeSwitch && new Date(endTime) < new Date()) {
      throw new CustomError('截止时间不得早于当前时间');
    } else {
      return timeSet.create(
        {
          uuid: uuid.v1(),
          sysSwitch,
          timeSwitch,
          startTime,
          endTime,
          userRole: 5,
        },
        { raw: true }
      );
    }
  },
  /**
   * 查询评审管理员系统时间
   */
  selectReviewManagerTime: () =>
    timeSet.findOne({
      attributes: ['startTime', 'endTime', 'sysSwitch', 'timeSwitch'],
      where: { userRole: 5 },
      raw: true,
    }),
  /**
   * 保存普通员工系统时间
   */
  updateStaffTime: ({ startTime, endTime, sysSwitch, timeSwitch }) => {
    if (sysSwitch && timeSwitch && startTime > endTime) {
      throw new CustomError('开始时间不得早于截止时间');
    } else if (sysSwitch && timeSwitch && new Date(endTime) < new Date()) {
      throw new CustomError('截止时间不得早于当前时间');
    } else {
      return timeSet.update(
        {
          startTime,
          endTime,
          sysSwitch,
          timeSwitch,
        },
        { where: { userRole: 15 }, raw: true }
      );
    }
  },
  /**
   * 创建普通员工系统时间
   */
  insertStaffTime: ({ startTime, endTime, sysSwitch, timeSwitch }) => {
    if (sysSwitch && timeSwitch && startTime > endTime) {
      throw new CustomError('开始时间不得早于截止时间');
    } else if (sysSwitch && timeSwitch && new Date(endTime) < new Date()) {
      throw new CustomError('截止时间不得早于当前时间');
    } else {
      return timeSet.create(
        {
          uuid: uuid.v1(),
          startTime,
          endTime,
          sysSwitch,
          timeSwitch,
          userRole: 15,
        },
        { raw: true }
      );
    }
  },
  /**
   * 查询普通员工系统时间
   */
  selectStaffTime: () =>
    timeSet.findOne({
      attributes: ['startTime', 'endTime', 'sysSwitch', 'timeSwitch'],
      where: { userRole: 15 },
      raw: true,
    }),
  /**
   * 查询账户信息
   */
  quaryAccount: () =>
    user.findAll({
      attributes: [
        'uuid',
        'role',
        'isCancel',
        'phone',
        'password',
        'name',
        'userName',
        'department',
      ],
      raw: true,
      order: [['role'], ['name']],
    }),
  /**
   * 查询账户信息通过权限
   */
  quaryAccountByRole: (role) =>
    user.findAll({
      attributes: [
        'uuid',
        'role',
        'isCancel',
        'phone',
        'password',
        'name',
        'userName',
        'department',
      ],
      where: { role },
      raw: true,
    }),
  /**
   * 查询账户信息通过用户名
   */
  queryAccountByName: (name) =>
    user.findAll({
      attributes: [
        'uuid',
        'role',
        'isCancel',
        'phone',
        'password',
        'name',
        'userName',
        'department',
      ],
      where: {
        [or]: [
          {
            name: {
              [Op.like]: `%${name}%`,
            },
          },
          {
            userName: {
              [Op.like]: `%${name}%`,
            },
          },
        ],
      },
      raw: true,
    }),
  /**
   * 添加用户
   */
  insertAccount: async ({
    phone,
    name,
    role,
    department,
    userName,
    verifyStatus,
    departmentUuid,
  }) => {
    const userUuid = uuid.v1();
    const { defaultPassword } = await user.findOne({
      where: { role: 1 },
      attributes: ['defaultPassword'],
      raw: true,
    });
    if (role === 15) {
      return await Promise.all([
        user.create(
          {
            uuid: userUuid,
            phone,
            name,
            role,
            department,
            userName,
            verifyStatus,
            departmentUuid,
            isCancel: '未注销',
            password: defaultPassword,
          },
          { raw: true }
        ),
        staffStatus.create(
          {
            uuid: userUuid,
            name,
            userName,
            verifyStatus,
            isCancel: '未注销',
          },
          { raw: true }
        ),
      ]);
    } else {
      return await user.create(
        {
          uuid: userUuid,
          phone,
          name,
          role,
          department,
          userName,
          departmentUuid,
          isCancel: '未注销',
          password: defaultPassword,
        },
        { raw: true }
      );
    }
  },
  /**
   * 查询科室
   */
  quaryDepartment: () =>
    department.findAll({
      attributes: ['name'],
      raw: true,
    }),
  /**
   * 查询科室uuid
   */
  selectDepartmentUuidByName: ({ name }) =>
    department.findOne({
      attributes: ['uuid'],
      where: { name },
      raw: true,
    }),
  /**
   * 根据账号查询用户
   */
  selectUserByUserName: (userName) =>
    user.findOne({
      where: { userName },
      raw: true,
    }),
  /**
   * 管理员重置密码
   */
  updatePassword: async (uuid) => {
    const { defaultPassword } = await user.findOne({
      where: { role: 1 },
      attributes: ['defaultPassword'],
      raw: true,
    });

    return await user.update(
      {
        password: defaultPassword,
      },
      { where: { uuid }, raw: true }
    );
  },

  /**
   * 管理员修改默认密码
   */
  updateDefaultPassword: async ({ oldPassword, newPassword }) => {
    const { defaultPassword } = await user.findOne({
      where: { role: 1 },
      attributes: ['defaultPassword'],
      raw: true,
    });

    if (defaultPassword !== md5(oldPassword)) {
      throw new CustomError('原默认密码输入错误!');
    } else {
      await user.update(
        {
          defaultPassword: md5(newPassword),
        },
        { where: { role: 1 }, raw: true }
      );

      const defaultUser = await user.findAll({
        where: { password: md5(oldPassword) },
        attributes: ['uuid'],
        raw: true,
      });

      const uuidList = defaultUser.map((item) => item.uuid);

      return await user.update(
        {
          password: md5(newPassword),
        },
        { where: { uuid: uuidList }, raw: true }
      );
    }
  },
  /**
   * 管理员注销账号
   */
  updatAccountCancel: async (uuid) => {
    await Promise.all([
      user.destroy({ where: { uuid }, raw: true }),
      staffStatus.destroy({ where: { uuid }, raw: true }),
      staffBasic.destroy({ where: { userUuid: uuid }, raw: true }),
      staffProject.destroy({ where: { userUuid: uuid }, raw: true }),
      staffPatent.destroy({ where: { userUuid: uuid }, raw: true }),
      staffAward.destroy({ where: { userUuid: uuid }, raw: true }),
      staffCopyright.destroy({ where: { userUuid: uuid }, raw: true }),
      staffThesis.destroy({ where: { userUuid: uuid }, raw: true }),
    ]);
  },
  /**
   * 修改用户
   */
  updateAccount: async ({
    phone,
    name,
    role,
    department,
    userName,
    departmentUuid,
  }) => {
    return await Promise.all([
      user.update(
        {
          phone,
          name,
          department,
          departmentUuid,
        },
        { where: { userName: userName, role: role }, raw: true }
      ),
      staffStatus.update(
        {
          name,
        },
        { where: { userName: userName }, raw: true }
      ),
    ]);
  },
  /**
   * 查询用户信息通过uuid
   */
  selectAccountByUuid: (uuid) =>
    user.findOne({
      attributes: ['role', 'phone', 'name', 'userName', 'department'],
      where: { uuid },
      raw: true,
    }),

  /**
   * 导出所有人信息表
   */
  accountExportAllStaffInfoExcel: async () => {
    const _data = await user.findAll({
      attributes: [
        'userName',
        'name',
        'phone',
        'role',
        'isCancel',
        'department',
      ],
      raw: true,
    });

    let data = [];
    let title = ['账号', '姓名', '电话', '权限', '状态', '部门'];
    data.push(title);
    _data.forEach((element) => {
      let arrInner = [];
      arrInner.push(element.userName);
      arrInner.push(element.name);
      arrInner.push(element.phone);
      arrInner.push(roleToText(element.role));
      arrInner.push(element.isCancel);
      arrInner.push(element.department);
      data.push(arrInner); //data中添加的要是数组，可以将对象的值分解添加进数组，例如：['1','name','上海']
    });

    let buffer = xlsx.build([
      {
        name: 'sheet1',
        data: data,
      },
    ]);

    // 上传到oss
    const fileUuid = uuid.v1(),
      fileUrl = `temp/adminExportAll/${fileUuid}.xlsx`;

    // 上传文件
    await client.put(fileUrl, buffer);

    return await client.signatureUrl(fileUrl);
  },
};
