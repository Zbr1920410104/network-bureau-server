import department from '../../../db/models/t-department';
import timeSet from '../../../db/models/sys-time-set';
import user from '../../../db/models/t-user';

// uuid
import uuid from 'uuid';

// 加密
import md5 from 'md5';

import { MANAGER_PAGE_SIZE } from '../../../config/system-config';

// 工具类
import CustomError from '../../../util/custom-error';
import webToken from '../../../util/token';

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
  updateBusinessManagerTime: ({ startTime, endTime }) =>
    timeSet.update(
      {
        startTime,
        endTime,
      },
      { where: { userRole: 10 }, raw: true }
    ),
  /**
   * 创建统计管理员系统时间
   */
  insertBusinessManagerTime: ({ startTime, endTime }) =>
    timeSet.create(
      {
        uuid: uuid.v1(),
        startTime,
        endTime,
        userRole: 10,
      },
      { raw: true }
    ),
  /**
   * 查询统计管理员系统时间
   */
  selectBusinessManagerTime: () =>
    timeSet.findOne({
      attributes: ['startTime', 'endTime'],
      where: { userRole: 10 },
      raw: true,
    }),
  /**
   * 保存评审管理员系统时间
   */
  updateReviewManagerTime: ({ startTime, endTime }) =>
    timeSet.update(
      {
        startTime,
        endTime,
      },
      { where: { userRole: 5 }, raw: true }
    ),
  /**
   * 创建评审管理员系统时间
   */
  insertReviewManagerTime: ({ startTime, endTime }) =>
    timeSet.create(
      {
        uuid: uuid.v1(),
        startTime,
        endTime,
        userRole: 5,
      },
      { raw: true }
    ),
  /**
   * 查询评审管理员系统时间
   */
  selectReviewManagerTime: () =>
    timeSet.findOne({
      attributes: ['startTime', 'endTime'],
      where: { userRole: 5 },
      raw: true,
    }),
  /**
   * 保存普通员工系统时间
   */
  updateStaffTime: ({ startTime, endTime }) =>
    timeSet.update(
      {
        startTime,
        endTime,
      },
      { where: { userRole: 15 }, raw: true }
    ),
  /**
   * 创建普通员工系统时间
   */
  insertStaffTime: ({ startTime, endTime }) =>
    timeSet.create(
      {
        uuid: uuid.v1(),
        startTime,
        endTime,
        userRole: 15,
      },
      { raw: true }
    ),
  /**
   * 查询普通员工系统时间
   */
  selectStaffTime: () =>
    timeSet.findOne({
      attributes: ['startTime', 'endTime'],
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
    }),
  /**
   * 添加用户
   */
  insertAccount: ({
    phone,
    name,
    role,
    department,
    userName,
    departmentUuid,
  }) =>
    user.create(
      {
        uuid: uuid.v1(),
        phone,
        name,
        role,
        department,
        userName,
        departmentUuid,
        isCancel: '未注销',
        password: md5('123456'),
      },
      { raw: true }
    ),
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
  updatePassword: (uuid) =>
    user.update(
      {
        password: md5('123456'),
      },
      { where: { uuid }, raw: true }
    ),
  /**
   * 管理员注销账号
   */
  updatAccountCancel: (uuid) =>
    user.update(
      {
        isCancel: '已注销',
      },
      { where: { uuid }, raw: true }
    ),
};
