import user from '../../db/models/t-user';
import message from '../../db/models/t-message'

import uuid from 'uuid';

// 工具类
import CustomError from '../../util/custom-error';
import webToken from '../../util/token';

// oss
import client from '../../util/oss';
import { db } from '../../db/db-connect';
import sysTimeSet from '../../db/models/sys-time-set';

export default {
  /**
   * 根据账号查询姓名
   */
  selectUserName: async ({ userName }) => {
    return await user.findOne({
      attributes: ['name'],
      raw: true,
      where: { userName },
    });
  },
  /**
   * 根据uuid查询用户
   */
  selectUserByUuid: async (uuid) => {
    try {
      // 数据库中查询出头像的路径之后去oss获取当前url
      let userInfo = {};

      userInfo = await user.findOne({
        where: { uuid },
        attributes: [
          'uuid',
          'phone',
          'userName',
          'password',
          'name',
          'role',
          'department',
          'departmentUuid',
          'isCancel',
        ],
        raw: true,
      });

      if (!userInfo) {
        throw new CustomError('未查询到此用户');
      }

      return userInfo;
    } catch (error) {
      throw error;
    }
  },
  /**
   * 管理账号登录
   */
  getUserToken: async (userName, password) => {
    try {
      const userInfo = await user.findOne({
        where: { userName },
        attributes: [
          'uuid',
          'phone',
          'userName',
          'password',
          'name',
          'role',
          'department',
          'departmentUuid',
          'isCancel',
        ],
        raw: true,
      });

      if (!userInfo || userInfo.password !== password) {
        throw new CustomError('账号或密码错误');
      } else if (userInfo.isCancel === '已注销') {
        throw new CustomError('账号已注销');
      } else if (userInfo.role !== 1) {
        const sysTime = await sysTimeSet.findOne({
          attributes: ['startTime', 'endTime', 'sysSwitch', 'timeSwitch'],
          where: { userRole: userInfo.role },
          raw: true,
        });

        if (sysTime) {
          if (sysTime.sysSwitch && sysTime.timeSwitch) {
            const currentTime = new Date();

            const startTime = new Date(sysTime.startTime);
            const endTime = new Date(sysTime.endTime);

            if (
              currentTime.getTime() < startTime.getTime() ||
              currentTime.getTime() > endTime.getTime()
            ) {
              throw new CustomError('不在此用户系统开放时间内,无法登录!');
            }
          } else if (!sysTime.sysSwitch) {
            throw new CustomError('不在此用户系统开放时间内,无法登录!');
          }
        }
      }

      return {
        token: webToken.parseToken({
          uuid: userInfo.uuid,
          auth: 'user',
        }),
        userInfo,
      };
    } catch (error) {
      throw error;
    }
  },
  /**
   * 修改密码
   */
  updateUserPassword: ({ uuid, oldPassword, password }) =>
    user.update(
      {
        password,
      },
      { where: { uuid, password: oldPassword }, raw: true }
    ),
  /**
   * 查找默认密码
   */
  selectDefaultPassword: async () => {
    return await user.findOne({
      where: { role: 1 },
      attributes: ['defaultPassword'],
      raw: true,
    });
  },
  /**
    * 查找消息
    */
  queryMessage: () => {
    return message.findAll({
      raw: true,
    });
  },
  /**
  * 查找消息
  */
  deleteMessage: ({ uuid }) => {
    return message.destroy({
      where: { uuid }
    });
  },
  /**
* 查找消息
*/
  createMessage: async ({ userUuid, userName, messageItem }) => {
    return await message.create({
      uuid: uuid.v1(),
      userUuid,
      userName,
      message: messageItem
    });
  },
};
