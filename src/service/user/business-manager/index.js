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
  updateVerifyBasicStatus: async ({
    userUuid,
    verifyRemarks,
    isVerify,
    verifyUserUuid,
    verifyTime,
  }) => {
    if (isVerify === '核实不通过') {
      await Promise.all([
        staffStatus.update(
          { verifyStatus: isVerify },
          { where: { uuid: userUuid }, raw: true }
        ),
        user.update(
          { verifyStatus: isVerify },
          { where: { uuid: userUuid }, raw: true }
        ),
      ]);
    }

    return await Promise.all([
      staffBasic.update(
        {
          verifyRemarks,
          isVerify,
          verifyUserUuid,
          verifyTime,
        },
        { where: { userUuid }, raw: true }
      ),
      staffStatus.update(
        { basicVerifyStatus: isVerify },
        { where: { uuid: userUuid }, raw: true }
      ),
    ]);
  },

  /**
   * 统计员设置员工项目信息通过状态
   */
  updateVerifyProjectStatus: async ({
    uuid,
    verifyRemarks,
    isVerify,
    verifyUserUuid,
    verifyTime,
    staffUuid,
  }) => {
    if (isVerify === '核实不通过') {
      return await Promise.all([
        staffProject.update(
          {
            verifyRemarks,
            isVerify,
            verifyUserUuid,
            verifyTime,
          },
          { where: { uuid }, raw: true }
        ),
        staffStatus.update(
          { projectVerifyStatus: isVerify, verifyStatus: isVerify },
          { where: { uuid: staffUuid }, raw: true }
        ),
        user.update(
          { verifyStatus: isVerify },
          { where: { uuid: staffUuid }, raw: true }
        ),
      ]);
    } else {
      await staffProject.update(
        {
          verifyRemarks,
          isVerify,
          verifyUserUuid,
          verifyTime,
        },
        { where: { uuid }, raw: true }
      );
      const staffProjectVerify = await staffProject.findAll({
        attributes: ['isVerify'],
        where: { userUuid: staffUuid },
        raw: true,
      });

      let projectVerifyList = staffProjectVerify.map((value) => value.isVerify);
      if (projectVerifyList.indexOf('核实不通过') !== -1) {
        return await staffStatus.update(
          { projectVerifyStatus: '核实不通过' },
          { where: { uuid: staffUuid }, raw: true }
        );
      } else if (projectVerifyList.indexOf('未核实') !== -1) {
        return await staffStatus.update(
          { projectVerifyStatus: '未核实' },
          { where: { uuid: staffUuid }, raw: true }
        );
      } else {
        return await staffStatus.update(
          { projectVerifyStatus: '核实通过' },
          { where: { uuid: staffUuid }, raw: true }
        );
      }
    }
  },

  /**
   * 统计员设置员工专利信息通过状态
   */
  updateVerifyPatentStatus: async ({
    uuid,
    verifyRemarks,
    isVerify,
    verifyUserUuid,
    verifyTime,
    staffUuid,
  }) => {
    if (isVerify === '核实不通过') {
      return await Promise.all([
        staffPatent.update(
          {
            verifyRemarks,
            isVerify,
            verifyUserUuid,
            verifyTime,
          },
          { where: { uuid }, raw: true }
        ),
        staffStatus.update(
          { patentVerifyStatus: isVerify, verifyStatus: isVerify },
          { where: { uuid: staffUuid }, raw: true }
        ),
        user.update(
          { verifyStatus: isVerify },
          { where: { uuid: staffUuid }, raw: true }
        ),
      ]);
    } else {
      await staffPatent.update(
        {
          verifyRemarks,
          isVerify,
          verifyUserUuid,
          verifyTime,
        },
        { where: { uuid }, raw: true }
      );
      const staffPatentVerify = await staffPatent.findAll({
        attributes: ['isVerify'],
        where: { userUuid: staffUuid },
        raw: true,
      });

      let patentVerifyList = staffPatentVerify.map((value) => value.isVerify);
      if (patentVerifyList.indexOf('核实不通过') !== -1) {
        return await staffStatus.update(
          { patentVerifyStatus: '核实不通过' },
          { where: { uuid: staffUuid }, raw: true }
        );
      } else if (patentVerifyList.indexOf('未核实') !== -1) {
        return await staffStatus.update(
          { patentVerifyStatus: '未核实' },
          { where: { uuid: staffUuid }, raw: true }
        );
      } else {
        return await staffStatus.update(
          { patentVerifyStatus: '核实通过' },
          { where: { uuid: staffUuid }, raw: true }
        );
      }
    }
  },
  /**
   * 统计员设置员工软件著作权信息通过状态
   */
  updateVerifyCopyrightStatus: async ({
    uuid,
    verifyRemarks,
    isVerify,
    verifyUserUuid,
    verifyTime,
    staffUuid,
  }) => {
    if (isVerify === '核实不通过') {
      return await Promise.all([
        staffCopyright.update(
          {
            verifyRemarks,
            isVerify,
            verifyUserUuid,
            verifyTime,
          },
          { where: { uuid }, raw: true }
        ),
        staffStatus.update(
          { copyrightVerifyStatus: isVerify, verifyStatus: isVerify },
          { where: { uuid: staffUuid }, raw: true }
        ),
        user.update(
          { verifyStatus: isVerify },
          { where: { uuid: staffUuid }, raw: true }
        ),
      ]);
    } else {
      await staffCopyright.update(
        {
          verifyRemarks,
          isVerify,
          verifyUserUuid,
          verifyTime,
        },
        { where: { uuid }, raw: true }
      );
      const staffCopyrightVerify = await staffCopyright.findAll({
        attributes: ['isVerify'],
        where: { userUuid: staffUuid },
        raw: true,
      });

      let copyrightVerifyList = staffCopyrightVerify.map(
        (value) => value.isVerify
      );
      if (copyrightVerifyList.indexOf('核实不通过') !== -1) {
        return await staffStatus.update(
          { copyrightVerifyStatus: '核实不通过' },
          { where: { uuid: staffUuid }, raw: true }
        );
      } else if (copyrightVerifyList.indexOf('未核实') !== -1) {
        return await staffStatus.update(
          { copyrightVerifyStatus: '未核实' },
          { where: { uuid: staffUuid }, raw: true }
        );
      } else {
        return await staffStatus.update(
          { copyrightVerifyStatus: '核实通过' },
          { where: { uuid: staffUuid }, raw: true }
        );
      }
    }
  },
  /**
   * 统计员设置员工获奖信息通过状态
   */
  updateVerifyAwardStatus: async ({
    uuid,
    verifyRemarks,
    isVerify,
    verifyUserUuid,
    verifyTime,
    staffUuid,
  }) => {
    if (isVerify === '核实不通过') {
      return await Promise.all([
        staffAward.update(
          {
            verifyRemarks,
            isVerify,
            verifyUserUuid,
            verifyTime,
          },
          { where: { uuid }, raw: true }
        ),
        staffStatus.update(
          { awardVerifyStatus: isVerify, verifyStatus: isVerify },
          { where: { uuid: staffUuid }, raw: true }
        ),
        user.update(
          { verifyStatus: isVerify },
          { where: { uuid: staffUuid }, raw: true }
        ),
      ]);
    } else {
      await staffAward.update(
        {
          verifyRemarks,
          isVerify,
          verifyUserUuid,
          verifyTime,
        },
        { where: { uuid }, raw: true }
      );
      const staffAwardVerify = await staffAward.findAll({
        attributes: ['isVerify'],
        where: { userUuid: staffUuid },
        raw: true,
      });

      let awardVerifyList = staffAwardVerify.map((value) => value.isVerify);
      if (awardVerifyList.indexOf('核实不通过') !== -1) {
        return await staffStatus.update(
          { awardVerifyStatus: '核实不通过' },
          { where: { uuid: staffUuid }, raw: true }
        );
      } else if (awardVerifyList.indexOf('未核实') !== -1) {
        return await staffStatus.update(
          { awardVerifyStatus: '未核实' },
          { where: { uuid: staffUuid }, raw: true }
        );
      } else {
        return await staffStatus.update(
          { awardVerifyStatus: '核实通过' },
          { where: { uuid: staffUuid }, raw: true }
        );
      }
    }
  },

  /**
   * 统计员设置员工论文/专著信息通过状态
   */
  updateVerifyThesisStatus: async ({
    uuid,
    verifyRemarks,
    isVerify,
    verifyUserUuid,
    verifyTime,
    staffUuid,
  }) => {
    if (isVerify === '核实不通过') {
      return await Promise.all([
        staffThesis.update(
          {
            verifyRemarks,
            isVerify,
            verifyUserUuid,
            verifyTime,
          },
          { where: { uuid }, raw: true }
        ),
        staffStatus.update(
          { thesisVerifyStatus: isVerify, verifyStatus: isVerify },
          { where: { uuid: staffUuid }, raw: true }
        ),
        user.update(
          { verifyStatus: isVerify },
          { where: { uuid: staffUuid }, raw: true }
        ),
      ]);
    } else {
      await staffThesis.update(
        {
          verifyRemarks,
          isVerify,
          verifyUserUuid,
          verifyTime,
        },
        { where: { uuid }, raw: true }
      );
      const staffThesisVerify = await staffThesis.findAll({
        attributes: ['isVerify'],
        where: { userUuid: staffUuid },
        raw: true,
      });

      let thesisVerifyList = staffThesisVerify.map((value) => value.isVerify);
      if (thesisVerifyList.indexOf('核实不通过') !== -1) {
        return await staffStatus.update(
          { thesisVerifyStatus: '核实不通过' },
          { where: { uuid: staffUuid }, raw: true }
        );
      } else if (thesisVerifyList.indexOf('未核实') !== -1) {
        return await staffStatus.update(
          { thesisVerifyStatus: '未核实' },
          { where: { uuid: staffUuid }, raw: true }
        );
      } else {
        return await staffStatus.update(
          { thesisVerifyStatus: '核实通过' },
          { where: { uuid: staffUuid }, raw: true }
        );
      }
    }
  },
  /**
   * 完成审核
   */
  finishBusinessManagerVerify: async ({ userUuid }) => {
    try {
      // const [
      //   basicVerifyStatus,
      //   projectVerifyStatus,
      //   patentVerifyStatus,
      //   copyrightVerifyStatus,
      //   awardVerifyStatus,
      //   thesisVerifyStatus,
      // ] = await Promise.all([
      //   staffBasic.findOne({
      //     attributes: ['isVerify'],
      //     where: { userUuid },
      //     raw: true,
      //   }),
      //   staffProject.findAll({
      //     attributes: ['isVerify'],
      //     where: { userUuid },
      //     raw: true,
      //   }),
      //   staffPatent.findAll({
      //     attributes: ['isVerify'],
      //     where: { userUuid },
      //     raw: true,
      //   }),
      //   staffCopyright.findAll({
      //     attributes: ['isVerify'],
      //     where: { userUuid },
      //     raw: true,
      //   }),
      //   staffAward.findAll({
      //     attributes: ['isVerify'],
      //     where: { userUuid },
      //     raw: true,
      //   }),
      //   staffThesis.findAll({
      //     attributes: ['isVerify'],
      //     where: { userUuid },
      //     raw: true,
      //   }),
      // ]);

      // const projectVerifyStatusList = projectVerifyStatus?.map(
      //   (item) => item.isVerify
      // );
      // const patentVerifyStatusList = patentVerifyStatus?.map(
      //   (item) => item.isVerify
      // );
      // const copyrightVerifyStatusList = copyrightVerifyStatus?.map(
      //   (item) => item.isVerify
      // );
      // const awardVerifyStatusList = awardVerifyStatus?.map(
      //   (item) => item.isVerify
      // );
      // const thesisVerifyStatusList = thesisVerifyStatus?.map(
      //   (item) => item.isVerify
      // );
      // const basicVerifyStatusList = basicVerifyStatus?.isVerify;

      // let projectVerifyStatusFinished = true,
      //   patentVerifyStatusFinished = true,
      //   copyrightVerifyStatusFinished = true,
      //   awardVerifyStatusFinished = true,
      //   thesisVerifyStatusFinished = true,
      //   basicVerifyStatusFinished = true;

      // for (let projectVerifyItem of projectVerifyStatusList) {
      //   if (projectVerifyItem !== '核实通过') {
      //     projectVerifyStatusFinished = false;
      //     break;
      //   }
      // }

      // for (let patentVerifyItem of patentVerifyStatusList) {
      //   if (patentVerifyItem !== '核实通过') {
      //     patentVerifyStatusFinished = false;
      //     break;
      //   }
      // }

      // for (let copyrightVerifyItem of copyrightVerifyStatusList) {
      //   if (copyrightVerifyItem !== '核实通过') {
      //     copyrightVerifyStatusFinished = false;
      //     break;
      //   }
      // }

      // for (let awardVerifyItem of awardVerifyStatusList) {
      //   if (awardVerifyItem !== '核实通过') {
      //     awardVerifyStatusFinished = false;
      //     break;
      //   }
      // }

      // for (let thesisVerifyItem of thesisVerifyStatusList) {
      //   if (thesisVerifyItem !== '核实通过') {
      //     thesisVerifyStatusFinished = false;
      //     break;
      //   }
      // }

      // if (basicVerifyStatusList !== '核实通过') {
      //   basicVerifyStatusFinished = false;
      // }

      // if (
      //   !(
      //     projectVerifyStatusFinished &&
      //     patentVerifyStatusFinished &&
      //     copyrightVerifyStatusFinished &&
      //     awardVerifyStatusFinished &&
      //     thesisVerifyStatusFinished &&
      //     basicVerifyStatusFinished
      //   )
      // ) {
      //   throw error;
      // }
      const staffVerifyStatus = await staffStatus.findAll({
        attributes: [
          'basicVerifyStatus',
          'projectVerifyStatus',
          'patentVerifyStatus',
          'copyrightVerifyStatus',
          'awardVerifyStatus',
          'thesisVerifyStatus',
        ],
        where: { uuid: userUuid },
        raw: true,
      });

      if (
        staffVerifyStatus.basicVerifyStatus === '未核实' &&
        staffVerifyStatus.basicVerifyStatus === '核实不通过' &&
        staffVerifyStatus.projectVerifyStatus === '未核实' &&
        staffVerifyStatus.projectVerifyStatus === '核实不通过' &&
        staffVerifyStatus.patentVerifyStatus === '未核实' &&
        staffVerifyStatus.patentVerifyStatus === '核实不通过' &&
        staffVerifyStatus.copyrightVerifyStatus === '未核实' &&
        staffVerifyStatus.copyrightVerifyStatus === '核实不通过' &&
        staffVerifyStatus.awardVerifyStatus === '未核实' &&
        staffVerifyStatus.awardVerifyStatus === '核实不通过' &&
        staffVerifyStatus.thesisVerifyStatus === '未核实' &&
        staffVerifyStatus.thesisVerifyStatus === '核实不通过'
      ) {
        throw error;
      }
      return await Promise.all([
        user.update(
          {
            verifyStatus: '核实通过',
            verifyTime: new Date(),
          },
          { where: { uuid: userUuid }, raw: true }
        ),
        staffStatus.update(
          {
            verifyStatus: '核实通过',
          },
          { where: { uuid: userUuid }, raw: true }
        ),
      ]);
    } catch (error) {
      throw error;
    }
  },

  /**
   * 导出所有人填写信息表
   */
  getStaffWriteStatusList: async ({ name, verifyStatus }) => {
    let _data;
    if (name) {
      _data = await staffStatus.findAll({
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
    } else if (verifyStatus) {
      _data = await staffStatus.findAll({
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
    } else {
      _data = await staffStatus.findAll({
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
    }

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
   * 导出所有人审核信息表
   */
  getStaffVerifyStatusList: async ({ name, verifyStatus }) => {
    let _data;
    if (name) {
      _data = await staffStatus.findAll({
        attributes: [
          'userName',
          'name',
          'basicVerifyStatus',
          'projectVerifyStatus',
          'patentVerifyStatus',
          'copyrightVerifyStatus',
          'awardVerifyStatus',
          'thesisVerifyStatus',
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
    } else if (verifyStatus) {
      _data = await staffStatus.findAll({
        attributes: [
          'userName',
          'name',
          'basicVerifyStatus',
          'projectVerifyStatus',
          'patentVerifyStatus',
          'copyrightVerifyStatus',
          'awardVerifyStatus',
          'thesisVerifyStatus',
          'verifyStatus',
        ],
        where: { verifyStatus, isCancel: '未注销' },
        raw: true,
      });
    } else {
      _data = await staffStatus.findAll({
        attributes: [
          'userName',
          'name',
          'basicVerifyStatus',
          'projectVerifyStatus',
          'patentVerifyStatus',
          'copyrightVerifyStatus',
          'awardVerifyStatus',
          'thesisVerifyStatus',
          'verifyStatus',
        ],
        where: {
          isCancel: '未注销',
        },
        raw: true,
      });
    }

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
      '核实状态',
    ]; //这是第一行 俗称列名
    data.push(title); // 添加完列名 下面就是添加真正的内容了
    _data.forEach((element) => {
      let arrInner = [];
      arrInner.push(element.userName);
      arrInner.push(element.name);
      arrInner.push(element.basicVerifyStatus);
      arrInner.push(element.projectVerifyStatus);
      arrInner.push(element.patentVerifyStatus);
      arrInner.push(element.copyrightVerifyStatus);
      arrInner.push(element.awardVerifyStatus);
      arrInner.push(element.thesisVerifyStatus);
      arrInner.push(element.verifyStatus);
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
