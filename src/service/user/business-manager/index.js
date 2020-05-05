import staffBasic from '../../../db/models/staff-basic';
import staffProject from '../../../db/models/staff-project';
import staffPatent from '../../../db/models/staff-patent';
import staffCopyright from '../../../db/models/staff-copyright';
import staffAward from '../../../db/models/staff-award';
import staffThesis from '../../../db/models/staff-thesis';
import user from '../../../db/models/t-user';
import staffStatus from '../../../db/models/staff-status';

import { db } from '../../../db/db-connect';

// uuid
import uuid from 'uuid';

// 工具
import xlsx from 'node-xlsx';

// oss
import client from '../../../util/oss';

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
        [Op.or]: [
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
  updateVerifyBasicStatus: ({
    userUuid,
    verifyRemarks,
    isVerify,
    verifyUserUuid,
    verifyTime,
  }) =>
    staffBasic.update(
      {
        verifyRemarks,
        isVerify,
        verifyUserUuid,
        verifyTime,
      },
      { where: { userUuid }, raw: true }
    ),

  /**
   * 统计员设置员工项目信息通过状态
   */
  updateVerifyProjectStatus: ({
    uuid,
    verifyRemarks,
    isVerify,
    verifyUserUuid,
    verifyTime,
  }) =>
    staffProject.update(
      {
        verifyRemarks,
        isVerify,
        verifyUserUuid,
        verifyTime,
      },
      { where: { uuid }, raw: true }
    ),

  /**
   * 统计员设置员工专利信息通过状态
   */
  updateVerifyPatentStatus: ({
    uuid,
    verifyRemarks,
    isVerify,
    verifyUserUuid,
    verifyTime,
  }) =>
    staffPatent.update(
      {
        verifyRemarks,
        isVerify,
        verifyUserUuid,
        verifyTime,
      },
      { where: { uuid }, raw: true }
    ),

  /**
   * 统计员设置员工软件著作权信息通过状态
   */
  updateVerifyCopyrightStatus: ({
    uuid,
    verifyRemarks,
    isVerify,
    verifyUserUuid,
    verifyTime,
  }) =>
    staffCopyright.update(
      {
        verifyRemarks,
        isVerify,
        verifyUserUuid,
        verifyTime,
      },
      { where: { uuid }, raw: true }
    ),
  /**
   * 统计员设置员工获奖信息通过状态
   */
  updateVerifyAwardStatus: ({
    uuid,
    verifyRemarks,
    isVerify,
    verifyUserUuid,
    verifyTime,
  }) =>
    staffAward.update(
      {
        verifyRemarks,
        isVerify,
        verifyUserUuid,
        verifyTime,
      },
      { where: { uuid }, raw: true }
    ),

  /**
   * 统计员设置员工论文/专著信息通过状态
   */
  updateVerifyThesisStatus: ({
    uuid,
    verifyRemarks,
    isVerify,
    verifyUserUuid,
    verifyTime,
  }) =>
    staffThesis.update(
      {
        verifyRemarks,
        isVerify,
        verifyUserUuid,
        verifyTime,
      },
      { where: { uuid }, raw: true }
    ),

  /**
   * 完成审核
   */
  finishBusinessManagerVerify: async ({ userUuid }) => {
    try {
      const [
        basicVerifyStatus,
        projectVerifyStatus,
        patentVerifyStatus,
        copyrightVerifyStatus,
        awardVerifyStatus,
        thesisVerifyStatus,
      ] = await Promise.all([
        staffBasic.findOne({
          attributes: ['isVerify'],
          where: { userUuid },
          raw: true,
        }),
        staffProject.findAll({
          attributes: ['isVerify'],
          where: { userUuid },
          raw: true,
        }),
        staffPatent.findAll({
          attributes: ['isVerify'],
          where: { userUuid },
          raw: true,
        }),
        staffCopyright.findAll({
          attributes: ['isVerify'],
          where: { userUuid },
          raw: true,
        }),
        staffAward.findAll({
          attributes: ['isVerify'],
          where: { userUuid },
          raw: true,
        }),
        staffThesis.findAll({
          attributes: ['isVerify'],
          where: { userUuid },
          raw: true,
        }),
      ]);

      const projectVerifyStatusList = projectVerifyStatus?.map(
        (item) => item.isVerify
      );
      const patentVerifyStatusList = patentVerifyStatus?.map(
        (item) => item.isVerify
      );
      const copyrightVerifyStatusList = copyrightVerifyStatus?.map(
        (item) => item.isVerify
      );
      const awardVerifyStatusList = awardVerifyStatus?.map(
        (item) => item.isVerify
      );
      const thesisVerifyStatusList = thesisVerifyStatus?.map(
        (item) => item.isVerify
      );
      const basicVerifyStatusList = basicVerifyStatus?.isVerify;

      let projectVerifyStatusFinished = true,
        patentVerifyStatusFinished = true,
        copyrightVerifyStatusFinished = true,
        awardVerifyStatusFinished = true,
        thesisVerifyStatusFinished = true,
        basicVerifyStatusFinished = true;

      for (let projectVerifyItem of projectVerifyStatusList) {
        if (projectVerifyItem !== '核实通过') {
          projectVerifyStatusFinished = false;
          break;
        }
      }

      for (let patentVerifyItem of patentVerifyStatusList) {
        if (patentVerifyItem !== '核实通过') {
          patentVerifyStatusFinished = false;
          break;
        }
      }

      for (let copyrightVerifyItem of copyrightVerifyStatusList) {
        if (copyrightVerifyItem !== '核实通过') {
          copyrightVerifyStatusFinished = false;
          break;
        }
      }

      for (let awardVerifyItem of awardVerifyStatusList) {
        if (awardVerifyItem !== '核实通过') {
          awardVerifyStatusFinished = false;
          break;
        }
      }

      for (let thesisVerifyItem of thesisVerifyStatusList) {
        if (thesisVerifyItem !== '核实通过') {
          thesisVerifyStatusFinished = false;
          break;
        }
      }

      if (basicVerifyStatusList !== '核实通过') {
        basicVerifyStatusFinished = false;
      }

      if (
        !(
          projectVerifyStatusFinished &&
          patentVerifyStatusFinished &&
          copyrightVerifyStatusFinished &&
          awardVerifyStatusFinished &&
          thesisVerifyStatusFinished &&
          basicVerifyStatusFinished
        )
      ) {
        throw error;
      }

      return await user.update(
        {
          verifyStatus: '核实通过',
          verifyTime: new Date(),
        },
        { where: { uuid: userUuid }, raw: true }
      );
    } catch (error) {
      throw error;
    }
  },

  /**
   * 导出所有人填写信息表
   */
  getStaffWriteStatusList: async () => {
    const _data = await staffStatus.findAll({
      attributes: [
        'userName',
        'name',
        'basicWriteStatus',
        'projectWriteStatus',
        'patentWriteStatus',
        'copyrightWriteStatus',
        'awardWriteStatus',
        'thesisWriteStatus',
        'verifyStatus',
      ],
      where: {
        isCancel: '未注销',
      },
      raw: true,
    });

    let data = []; // 其实最后就是把这个数组写入excel
    let title = [
      '账号',
      '姓名',
      '基本信息',
      '项目',
      '专利',
      '软件著作权',
      '奖项',
      '论文/专著',
      '是否提交',
    ]; //这是第一行 俗称列名
    data.push(title); // 添加完列名 下面就是添加真正的内容了
    _data.forEach((element) => {
      let arrInner = [];
      arrInner.push(element.userName);
      arrInner.push(element.name);
      arrInner.push(element.basicWriteStatus);
      arrInner.push(element.projectWriteStatus);
      arrInner.push(element.patentWriteStatus);
      arrInner.push(element.copyrightWriteStatus);
      arrInner.push(element.awardWriteStatus);
      arrInner.push(element.thesisWriteStatus);
      arrInner.push(element.verifyStatus !== '未提交' ? '已提交' : '未提交');
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
      fileUrl = `temp/exportAll/${fileUuid}.xlsx`;

    // 上传文件
    await client.put(fileUrl, buffer);

    return await client.signatureUrl(fileUrl);
  },

  /**
   * 导出所有人填写信息表
   */
  getStaffWriteStatusListByName: async (name) => {
    const _data = await staffStatus.findAll({
      attributes: [
        'userName',
        'name',
        'basicWriteStatus',
        'projectWriteStatus',
        'patentWriteStatus',
        'copyrightWriteStatus',
        'awardWriteStatus',
        'thesisWriteStatus',
        'verifyStatus',
      ],
      where: {
        [Op.or]: [
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
        isCancel: '未注销',
      },
      raw: true,
    });

    let data = []; // 其实最后就是把这个数组写入excel
    let title = [
      '账号',
      '姓名',
      '基本信息',
      '项目',
      '专利',
      '软件著作权',
      '奖项',
      '论文/专著',
      '是否提交',
    ]; //这是第一行 俗称列名
    data.push(title); // 添加完列名 下面就是添加真正的内容了
    _data.forEach((element) => {
      let arrInner = [];
      arrInner.push(element.userName);
      arrInner.push(element.name);
      arrInner.push(element.basicWriteStatus);
      arrInner.push(element.projectWriteStatus);
      arrInner.push(element.patentWriteStatus);
      arrInner.push(element.copyrightWriteStatus);
      arrInner.push(element.awardWriteStatus);
      arrInner.push(element.thesisWriteStatus);
      arrInner.push(element.verifyStatus !== '未提交' ? '已提交' : '未提交');
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
      fileUrl = `temp/exportAll/${fileUuid}.xlsx`;

    // 上传文件
    await client.put(fileUrl, buffer);

    return await client.signatureUrl(fileUrl);
  },

  /**
   * 导出所有人填写信息表
   */
  getStaffWriteStatusListByVerifyStatus: async (verifyStatus) => {
    const _data = await staffStatus.findAll({
      attributes: [
        'userName',
        'name',
        'basicWriteStatus',
        'projectWriteStatus',
        'patentWriteStatus',
        'copyrightWriteStatus',
        'awardWriteStatus',
        'thesisWriteStatus',
        'verifyStatus',
      ],
      where: { verifyStatus, isCancel: '未注销' },
      raw: true,
    });

    let data = []; // 其实最后就是把这个数组写入excel
    let title = [
      '账号',
      '姓名',
      '基本信息',
      '项目',
      '专利',
      '软件著作权',
      '奖项',
      '论文/专著',
      '是否提交',
    ]; //这是第一行 俗称列名
    data.push(title); // 添加完列名 下面就是添加真正的内容了
    _data.forEach((element) => {
      let arrInner = [];
      arrInner.push(element.userName);
      arrInner.push(element.name);
      arrInner.push(element.basicWriteStatus);
      arrInner.push(element.projectWriteStatus);
      arrInner.push(element.patentWriteStatus);
      arrInner.push(element.copyrightWriteStatus);
      arrInner.push(element.awardWriteStatus);
      arrInner.push(element.thesisWriteStatus);
      arrInner.push(element.verifyStatus !== '未提交' ? '已提交' : '未提交');
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
      fileUrl = `temp/exportAll/${fileUuid}.xlsx`;

    // 上传文件
    await client.put(fileUrl, buffer);

    return await client.signatureUrl(fileUrl);
  },
};
