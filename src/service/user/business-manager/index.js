import staffBasic from '../../../db/models/staff-basic';
import staffProject from '../../../db/models/staff-project';
import staffPatent from '../../../db/models/staff-patent';
import staffCopyright from '../../../db/models/staff-copyright';
import staffAward from '../../../db/models/staff-award';
import staffThesis from '../../../db/models/staff-thesis';
import user from '../../../db/models/t-user';

// uuid
import uuid from 'uuid';

// 加密
import md5 from 'md5';

import { MANAGER_PAGE_SIZE } from '../../../config/system-config';

// 工具类
import CustomError from '../../../util/custom-error';
import webToken from '../../../util/token';

import Sequelize from 'sequelize';
const Op = Sequelize.Op;

export default {
  /**
   * 统计管理员查询基本信息
   */
  selectBusinessManagerBasic: ({ userUuid }) =>
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
        'isVerify',
        'verifyRemarks',
      ],
      where: { userUuid },
      raw: true,
    }),

  /**
   * 查询账户信息
   */
  queryStaffVerifyInfo: () =>
    user.findAll({
      attributes: [
        'uuid',
        'phone',
        'name',
        'verifyStatus',
        'currentWriteTime',
        'department',
      ],
      where: { role: 15, isCancel: '未注销' },
      raw: true,
    }),

  /**
   * 查询账户信息通过姓名
   */
  queryStaffVerifyInfoByName: (name) =>
    user.findAll({
      attributes: [
        'uuid',
        'phone',
        'name',
        'verifyStatus',
        'currentWriteTime',
        'department',
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
  queryStaffVerifyInfoByVerifyStatus: (verifyStatus) =>
    user.findAll({
      attributes: [
        'uuid',
        'phone',
        'name',
        'verifyStatus',
        'currentWriteTime',
        'department',
      ],
      where: { verifyStatus, role: 15, isCancel: '未注销' },
      raw: true,
    }),

  /**
   * 查询员工填写项目信息
   */
  queryVerifyProjectList: ({ userUuid }) =>
    staffProject.findAll({
      attributes: [
        'uuid',
        'name',
        'type',
        'startTime',
        'endTime',
        'code',
        'resource',
        'funds',
        'controller',
        'participant',
        'content',
        'isVerify',
        'currentWriteTime',
        'verifyRemarks',
        'verifyTime',
      ],
      where: { userUuid },
      raw: true,
    }),

  /**
   * 查询员工填写专利信息
   */
  queryVerifyPatentList: ({ userUuid }) =>
    staffPatent.findAll({
      attributes: [
        'uuid',
        'patentType',
        'patentName',
        'patentCode',
        'patentNation',
        'isVerify',
        'currentWriteTime',
        'verifyRemarks',
        'verifyTime',
      ],
      where: { userUuid },
      raw: true,
    }),

  /**
   * 查询员工填写软件著作权信息
   */
  queryVerifyCopyrightList: ({ userUuid }) =>
    staffCopyright.findAll({
      attributes: [
        'uuid',
        'copyrightType',
        'copyrightName',
        'copyrightCode',
        'copyrightArrange',
        'isVerify',
        'currentWriteTime',
        'verifyRemarks',
        'verifyTime',
      ],
      where: { userUuid },
      raw: true,
    }),

  /**
   * 查询员工填写奖项信息
   */
  queryVerifyAwardList: ({ userUuid }) =>
    staffAward.findAll({
      attributes: [
        'uuid',
        'awardType',
        'awardName',
        'awardTime',
        'awardGrade',
        'awardDepartment',
        'isVerify',
        'currentWriteTime',
        'awardNameList',
        'verifyRemarks',
        'verifyTime',
        'url',
      ],
      where: { userUuid },
      raw: true,
    }),

  /**
   * 查询员工填写论文/专著信息
   */
  queryVerifyThesisList: ({ userUuid }) =>
    staffThesis.findAll({
      attributes: [
        'uuid',
        'thesisTitle',
        'thesisType',
        'thesisJournal',
        'thesisTime',
        'thesisGrade',
        'thesisCode',
        'thesisFirstAuthor',
        'thesisAuthorSequence',
        'isVerify',
        'currentWriteTime',
        'verifyRemarks',
        'verifyTime',
        'url',
      ],
      where: { userUuid },
      raw: true,
    }),

  /**
   * 统计员设置员工基本信息通过状态
   */
  updateVerifyBasicStatus: ({ userUuid, verifyRemarks, isVerify }) =>
    staffBasic.update(
      {
        verifyRemarks,
        isVerify,
      },
      { where: { userUuid }, raw: true }
    ),

  /**
   * 统计员设置员工项目信息通过状态
   */
  updateVerifyProjectStatus: ({ uuid, verifyRemarks, isVerify }) =>
    staffProject.update(
      {
        verifyRemarks,
        isVerify,
      },
      { where: { uuid }, raw: true }
    ),

  /**
   * 统计员设置员工专利信息通过状态
   */
  updateVerifyPatentStatus: ({ uuid, verifyRemarks, isVerify }) =>
    staffPatent.update(
      {
        verifyRemarks,
        isVerify,
      },
      { where: { uuid }, raw: true }
    ),

  /**
   * 统计员设置员工软件著作权信息通过状态
   */
  updateVerifyCopyrightStatus: ({ uuid, verifyRemarks, isVerify }) =>
    staffCopyright.update(
      {
        verifyRemarks,
        isVerify,
      },
      { where: { uuid }, raw: true }
    ),
  /**
   * 统计员设置员工获奖信息通过状态
   */
  updateVerifyAwardStatus: ({ uuid, verifyRemarks, isVerify }) =>
    staffAward.update(
      {
        verifyRemarks,
        isVerify,
      },
      { where: { uuid }, raw: true }
    ),

  /**
   * 统计员设置员工论文/专著信息通过状态
   */
  updateVerifyThesisStatus: ({ uuid, verifyRemarks, isVerify }) =>
    staffThesis.update(
      {
        verifyRemarks,
        isVerify,
      },
      { where: { uuid }, raw: true }
    ),
  
};
