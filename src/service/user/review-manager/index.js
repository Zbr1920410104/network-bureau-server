import user from '../../../db/models/t-user';
import staffBasic from '../../../db/models/staff-basic';

import Sequelize from 'sequelize';
const Op = Sequelize.Op;

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
   * 查询账户信息
   */
  queryStaffReviewInfo: () =>
    user.findAll({
      attributes: [
        'uuid',
        'phone',
        'name',
        'reviewTime',
        'currentWriteTime',
        'department',
        'totalScore',
        'verifyStatus',
      ],
      where: { role: 15, isCancel: '未注销' },
      raw: true,
    }),
  /**
   * 评审管理员查询基本信息
   */
  selectReviewManagerBasic: ({ userUuid }) =>
    staffBasic.findOne({
      attributes: [
        'name',
        'idNumber',
        'sex',
        'nation',
        'nativePlace',
        'politicalAffiliation',
        'department',
        'officePhone',
        'phone',
        'education',
        'graduateSchool',
        'major',
        'duty',
        'workTime',
        'professionTitle',
        'getTime',
        'researchDirection',
        'studyExperience',
        'workExperience',
      ],
      where: { userUuid },
      raw: true,
    }),

  /**
   * 查询账户信息通过姓名
   */
  queryStaffReviewInfoByName: (name) =>
    user.findAll({
      attributes: [
        'uuid',
        'phone',
        'name',
        'totalScore',
        'reviewTime',
        'currentWriteTime',
        'department',
        'verifyStatus',
      ],
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
        role: 15,
        isCancel: '未注销',
      },
      raw: true,
    }),

  /**
   * 查询账户信息通过核实状态
   */
  queryStaffReviewInfoByReviewStatus: async (reviewStatus) => {
    if (reviewStatus === '已评分') {
      return await user.findAll({
        attributes: [
          'uuid',
          'phone',
          'name',
          'totalScore',
          'currentWriteTime',
          'department',
          'verifyStatus',
        ],
        where: { totalScore: { [Op.ne]: null }, role: 15, isCancel: '未注销' },
        raw: true,
      });
    } else {
      return await user.findAll({
        attributes: [
          'uuid',
          'phone',
          'name',
          'totalScore',
          'currentWriteTime',
          'department',
          'verifyStatus',
        ],
        where: { totalScore: null, role: 15, isCancel: '未注销' },
        raw: true,
      });
    }
  },
};
