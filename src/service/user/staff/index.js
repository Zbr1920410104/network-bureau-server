import user from '../../../db/models/t-user';
import staffBasic from '../../../db/models/staff-basic';
import staffProject from '../../../db/models/staff-project';
import staffPatent from '../../../db/models/staff-patent';
import staffCopyright from '../../../db/models/staff-copyright';
import staffAward from '../../../db/models/staff-award';
import staffThesis from '../../../db/models/staff-thesis';
import staffStatus from '../../../db/models/staff-status';

import uuid from 'uuid';

// oss
import client from '../../../util/oss';
import { db } from '../../../db/db-connect';

// 工具类
import CustomError from '../../../util/custom-error';
import webToken from '../../../util/token';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

export default {
  /**
   * 查询评审管理员系统时间
   */
  selectLastWriteTimeByUuid: (userUuid) =>
    staffBasic.findOne({
      attributes: ['currentWriteTime'],
      where: { userUuid },
      raw: true,
    }),
  /**
   * 保存基本信息
   */
  insertStaffBasic: ({
    userUuid,
    currentWriteTime,
    isVerify,
    name,
    idNumber,
    sex,
    nation,
    nativePlace,
    politicalAffiliation,
    department,
    officePhone,
    phone,
    education,
    degree,
    graduateSchool,
    major,
    duty,
    workTime,
    professionTitle,
    getTime,
    researchDirection,
    studyExperience,
    workExperience,
  }) =>
    staffBasic.create(
      {
        uuid: uuid.v1(),
        userUuid,
        currentWriteTime,
        isVerify,
        name,
        idNumber,
        sex,
        nation,
        nativePlace,
        politicalAffiliation,
        department,
        officePhone,
        phone,
        education,
        degree,
        graduateSchool,
        major,
        duty,
        workTime,
        professionTitle,
        getTime,
        researchDirection,
        studyExperience,
        workExperience,
      },
      { raw: true }
    ),
  /**
   * 查询基本信息
   */
  selectStaffBasic: ({ userUuid }) =>
    staffBasic.findOne({
      attributes: [
        'isVerify',
        'verifyRemarks',
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
        'degree',
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
   * 修改基本信息
   */
  updateStaffBasic: ({
    userUuid,
    lastWriteTime,
    currentWriteTime,
    name,
    idNumber,
    sex,
    nation,
    nativePlace,
    politicalAffiliation,
    department,
    officePhone,
    phone,
    education,
    degree,
    graduateSchool,
    major,
    duty,
    workTime,
    professionTitle,
    getTime,
    researchDirection,
    studyExperience,
    workExperience,
  }) =>
    staffBasic.update(
      {
        lastWriteTime,
        currentWriteTime,
        name,
        idNumber,
        sex,
        nation,
        nativePlace,
        politicalAffiliation,
        department,
        officePhone,
        phone,
        education,
        degree,
        graduateSchool,
        major,
        duty,
        workTime,
        professionTitle,
        getTime,
        researchDirection,
        studyExperience,
        workExperience,
        isVerify: '未核实',
        verifyRemarks: '',
      },
      { where: { userUuid }, raw: true }
    ),
  /**
   * 查询员工填写信息
   */
  getStaffWriteInfo: async (userUuid) => {
    return await user.findAll({
      attributes: [
        'name',
        'department',
        'lastWriteTime',
        'currentWriteTime',
        'verifyStatus',
        'verifyTime',
        'totalScore',
        'projectScoreSum',
        'patentScoreSum',
        'copyrightScoreSum',
        'awardScoreSum',
        'thesisScoreSum',
      ],
      where: { uuid: userUuid },
      raw: true,
    });
  },

  /**
   * 新建一条项目信息
   */
  insertStaffProject: ({
    userUuid,
    currentWriteTime,
    isVerify,
    type,
    name,
    startTime,
    endTime,
    code,
    resource,
    funds,
    controller,
    participant,
    content,
  }) =>
    staffProject.create(
      {
        uuid: uuid.v1(),
        userUuid,
        currentWriteTime,
        isVerify,
        type,
        name,
        startTime,
        endTime,
        code,
        resource,
        funds,
        controller,
        participant,
        content,
      },
      { raw: true }
    ),

  /**
   * 查询员工填写项目
   */
  queryWriteProjectList: (userUuid) =>
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
        'score',
      ],
      where: { userUuid },
      raw: true,
    }),

  /**
   * 查询员工填写项目通过uuid
   */
  selectStaffProjectByUuid: ({ uuid }) =>
    staffProject.findOne({
      attributes: [
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
      ],
      where: { uuid },
      raw: true,
    }),

  /**
   * 查询项目上次修改时间
   */
  selectProjectLastWriteTimeByUuid: (uuid) =>
    staffProject.findOne({
      attributes: ['currentWriteTime'],
      where: { uuid },
      raw: true,
    }),

  /**
   * 修改项目信息
   */
  updateStaffProject: ({
    uuid,
    lastWriteTime,
    currentWriteTime,
    type,
    name,
    startTime,
    endTime,
    code,
    resource,
    funds,
    controller,
    participant,
    content,
  }) =>
    staffProject.update(
      {
        lastWriteTime,
        currentWriteTime,
        type,
        name,
        startTime,
        endTime,
        code,
        resource,
        funds,
        controller,
        participant,
        content,
        isVerify: '未核实',
        verifyRemarks: '',
      },
      { where: { uuid, isVerify: { [Op.ne]: '核实通过' } }, raw: true }
    ),

  /**
   * 删除项目
   */
  deleteProject: (uuid) =>
    staffProject.destroy({
      where: { uuid },
      raw: true,
    }),

  /**
   * 获取项目的信息
   */
  selectUploadProject: (uuid) =>
    staffProject.findOne({
      attributes: ['firstUrl', 'secondUrl', 'thirdUrl'],
      where: { uuid },
      raw: true,
    }),

  /**
   * 保存项目的信息
   */
  updateUploadProject: async ({ uuid, firstUrl, secondUrl, thirdUrl }) => {
    try {
      let firstProductionUrl = '',
        secondProductionUrl = '',
        thirdProductionUrl = '';

      // 将temp的文件copy到production中
      const [firstFilePosition] = firstUrl.split('/');

      if (firstFilePosition === 'temp') {
        const firstTempUrl = firstUrl;
        firstProductionUrl = firstUrl.replace('temp', 'production');

        const project = await staffProject.findOne({
          attributes: ['firstUrl'],
          where: { uuid },
          raw: true,
        });

        if (project?.firstUrl) {
          await client.delete(project.firstUrl);
        }

        await client.copy(firstProductionUrl, firstTempUrl);
      } else if (firstFilePosition === 'production') {
        firstProductionUrl = firstUrl;
      } else {
        throw new CustomError('oss文件路径错误');
      }

      if (secondUrl) {
        const [secondFilePosition] = secondUrl.split('/');
        if (secondFilePosition === 'temp') {
          const secondTempUrl = secondUrl;
          secondProductionUrl = secondUrl.replace('temp', 'production');

          const project = await staffProject.findOne({
            attributes: ['secondUrl'],
            where: { uuid },
            raw: true,
          });

          if (project?.secondUrl) {
            await client.delete(project.secondUrl);
          }

          await client.copy(secondProductionUrl, secondTempUrl);
        } else if (secondFilePosition === 'production') {
          secondProductionUrl = secondUrl;
        } else {
          throw new CustomError('oss文件路径错误');
        }
      }

      if (thirdUrl) {
        const [thirdFilePosition] = thirdUrl.split('/');
        if (thirdFilePosition === 'temp') {
          const thirdTempUrl = thirdUrl;
          thirdProductionUrl = thirdUrl.replace('temp', 'production');

          const project = await staffProject.findOne({
            attributes: ['thirdUrl'],
            where: { uuid },
            raw: true,
          });

          if (project?.thirdUrl) {
            await client.delete(project.thirdUrl);
          }

          await client.copy(thirdProductionUrl, thirdTempUrl);
        } else if (thirdFilePosition === 'production') {
          thirdProductionUrl = thirdUrl;
        } else {
          throw new CustomError('oss文件路径错误');
        }
      }

      const { currentWriteTime } = await staffProject.findOne({
        attributes: ['currentWriteTime'],
        where: { uuid },
        raw: true,
      });

      return await staffProject.update(
        {
          lastWriteTime: currentWriteTime,
          currentWriteTime: new Date(),
          firstUrl: firstProductionUrl,
          secondUrl: secondProductionUrl,
          thirdUrl: thirdProductionUrl,
        },
        { where: { uuid }, raw: true }
      );
    } catch (error) {
      throw error;
    }
  },

  /**
   * 新建一条专利信息
   */
  insertStaffPatent: ({
    userUuid,
    currentWriteTime,
    isVerify,
    patentType,
    patentName,
    patentCode,
    patentNation,
  }) =>
    staffPatent.create(
      {
        uuid: uuid.v1(),
        userUuid,
        currentWriteTime,
        isVerify,
        patentType,
        patentName,
        patentCode,
        patentNation,
      },
      { raw: true }
    ),

  /**
   * 查询员工填写专利信息
   */
  queryWritePatentList: (userUuid) =>
    staffPatent.findAll({
      attributes: [
        'uuid',
        'isVerify',
        'patentType',
        'patentName',
        'patentCode',
        'patentNation',
        'verifyRemarks',
        'currentWriteTime',
        'score',
      ],
      where: { userUuid },
      raw: true,
    }),

  /**
   * 查询员工填写专利通过uuid
   */
  selectStaffPatentByUuid: ({ uuid }) =>
    staffPatent.findOne({
      attributes: ['patentType', 'patentName', 'patentCode', 'patentNation'],
      where: { uuid },
      raw: true,
    }),

  /**
   * 查询专利上次修改时间
   */
  selectPatentLastWriteTimeByUuid: (uuid) =>
    staffPatent.findOne({
      attributes: ['currentWriteTime'],
      where: { uuid },
      raw: true,
    }),

  /**
   * 修改专利信息
   */
  updateStaffPatent: ({
    uuid,
    lastWriteTime,
    currentWriteTime,
    patentType,
    patentName,
    patentCode,
    patentNation,
  }) =>
    staffPatent.update(
      {
        lastWriteTime,
        currentWriteTime,
        patentType,
        patentName,
        patentCode,
        patentNation,
        isVerify: '未核实',
        verifyRemarks: '',
      },
      { where: { uuid }, raw: true }
    ),

  /**
   * 删除专利
   */
  deletePatent: (uuid) =>
    staffPatent.destroy({
      where: { uuid },
      raw: true,
    }),

  /**
   * 获取专利的信息
   */
  selectUploadPatent: (uuid) =>
    staffPatent.findOne({
      attributes: ['firstUrl', 'secondUrl', 'thirdUrl'],
      where: { uuid },
      raw: true,
    }),

  /**
   * 保存专利的信息
   */
  updateUploadPatent: async ({ uuid, firstUrl, secondUrl, thirdUrl }) => {
    try {
      let firstProductionUrl = '',
        secondProductionUrl = '',
        thirdProductionUrl = '';

      // 将temp的文件copy到production中
      const [firstFilePosition] = firstUrl.split('/');

      if (firstFilePosition === 'temp') {
        const firstTempUrl = firstUrl;
        firstProductionUrl = firstUrl.replace('temp', 'production');

        const patent = await staffPatent.findOne({
          attributes: ['firstUrl'],
          where: { uuid },
          raw: true,
        });

        if (patent?.firstUrl) {
          await client.delete(patent.firstUrl);
        }

        await client.copy(firstProductionUrl, firstTempUrl);
      } else if (firstFilePosition === 'production') {
        firstProductionUrl = firstUrl;
      } else {
        throw new CustomError('oss文件路径错误');
      }

      if (secondUrl) {
        const [secondFilePosition] = secondUrl.split('/');
        if (secondFilePosition === 'temp') {
          const secondTempUrl = secondUrl;
          secondProductionUrl = secondUrl.replace('temp', 'production');

          const patent = await staffPatent.findOne({
            attributes: ['secondUrl'],
            where: { uuid },
            raw: true,
          });

          if (patent?.secondUrl) {
            await client.delete(patent.secondUrl);
          }

          await client.copy(secondProductionUrl, secondTempUrl);
        } else if (secondFilePosition === 'production') {
          secondProductionUrl = secondUrl;
        } else {
          throw new CustomError('oss文件路径错误');
        }
      }

      if (thirdUrl) {
        const [thirdFilePosition] = thirdUrl.split('/');
        if (thirdFilePosition === 'temp') {
          const thirdTempUrl = thirdUrl;
          thirdProductionUrl = thirdUrl.replace('temp', 'production');

          const patent = await staffPatent.findOne({
            attributes: ['thirdUrl'],
            where: { uuid },
            raw: true,
          });

          if (patent?.thirdUrl) {
            await client.delete(patent.thirdUrl);
          }

          await client.copy(thirdProductionUrl, thirdTempUrl);
        } else if (thirdFilePosition === 'production') {
          thirdProductionUrl = thirdUrl;
        } else {
          throw new CustomError('oss文件路径错误');
        }
      }

      const { currentWriteTime } = await staffPatent.findOne({
        attributes: ['currentWriteTime'],
        where: { uuid },
        raw: true,
      });

      return await staffPatent.update(
        {
          lastWriteTime: currentWriteTime,
          currentWriteTime: new Date(),
          firstUrl: firstProductionUrl,
          secondUrl: secondProductionUrl,
          thirdUrl: thirdProductionUrl,
        },
        { where: { uuid }, raw: true }
      );
    } catch (error) {
      throw error;
    }
  },

  /**
   * 新建一条软件著作权信息
   */
  insertStaffCopyright: ({
    userUuid,
    currentWriteTime,
    isVerify,
    copyrightType,
    copyrightName,
    copyrightCode,
    copyrightArrange,
  }) =>
    staffCopyright.create(
      {
        uuid: uuid.v1(),
        userUuid,
        currentWriteTime,
        isVerify,
        copyrightType,
        copyrightName,
        copyrightCode,
        copyrightArrange,
      },
      { raw: true }
    ),

  /**
   * 查询员工填写软件著作权信息
   */
  queryWriteCopyrightList: (userUuid) =>
    staffCopyright.findAll({
      attributes: [
        'uuid',
        'isVerify',
        'copyrightType',
        'copyrightName',
        'copyrightCode',
        'copyrightArrange',
        'verifyRemarks',
        'currentWriteTime',
        'score',
      ],
      where: { userUuid },
      raw: true,
    }),

  /**
   * 查询员工填写软件著作权通过uuid
   */
  selectStaffCopyrightByUuid: ({ uuid }) =>
    staffCopyright.findOne({
      attributes: [
        'copyrightType',
        'copyrightName',
        'copyrightCode',
        'copyrightArrange',
      ],
      where: { uuid },
      raw: true,
    }),

  /**
   * 查询软件著作权上次修改时间
   */
  selectCopyrightLastWriteTimeByUuid: (uuid) =>
    staffCopyright.findOne({
      attributes: ['currentWriteTime'],
      where: { uuid },
      raw: true,
    }),

  /**
   * 修改软件著作权信息
   */
  updateStaffCopyright: ({
    uuid,
    lastWriteTime,
    currentWriteTime,
    copyrightType,
    copyrightName,
    copyrightCode,
    copyrightArrange,
  }) =>
    staffCopyright.update(
      {
        lastWriteTime,
        currentWriteTime,
        copyrightType,
        copyrightName,
        copyrightCode,
        copyrightArrange,
        isVerify: '未核实',
        verifyRemarks: '',
      },
      { where: { uuid }, raw: true }
    ),

  /**
   * 删除软件著作权
   */
  deleteCopyright: (uuid) =>
    staffCopyright.destroy({
      where: { uuid },
      raw: true,
    }),

  /**
   * 获取软件著作权的信息
   */
  selectUploadCopyright: (uuid) =>
    staffCopyright.findOne({
      attributes: ['firstUrl', 'secondUrl', 'thirdUrl'],
      where: { uuid },
      raw: true,
    }),

  /**
   * 保存软件著作权的信息
   */
  updateUploadCopyright: async ({ uuid, firstUrl, secondUrl, thirdUrl }) => {
    try {
      let firstProductionUrl = '',
        secondProductionUrl = '',
        thirdProductionUrl = '';

      // 将temp的文件copy到production中
      const [firstFilePosition] = firstUrl.split('/');

      if (firstFilePosition === 'temp') {
        const firstTempUrl = firstUrl;
        firstProductionUrl = firstUrl.replace('temp', 'production');

        const copyright = await staffCopyright.findOne({
          attributes: ['firstUrl'],
          where: { uuid },
          raw: true,
        });

        if (copyright?.firstUrl) {
          await client.delete(copyright.firstUrl);
        }

        await client.copy(firstProductionUrl, firstTempUrl);
      } else if (firstFilePosition === 'production') {
        firstProductionUrl = firstUrl;
      } else {
        throw new CustomError('oss文件路径错误');
      }

      if (secondUrl) {
        const [secondFilePosition] = secondUrl.split('/');
        if (secondFilePosition === 'temp') {
          const secondTempUrl = secondUrl;
          secondProductionUrl = secondUrl.replace('temp', 'production');

          const copyright = await staffCopyright.findOne({
            attributes: ['secondUrl'],
            where: { uuid },
            raw: true,
          });

          if (copyright?.secondUrl) {
            await client.delete(copyright.secondUrl);
          }

          await client.copy(secondProductionUrl, secondTempUrl);
        } else if (secondFilePosition === 'production') {
          secondProductionUrl = secondUrl;
        } else {
          throw new CustomError('oss文件路径错误');
        }
      }

      if (thirdUrl) {
        const [thirdFilePosition] = thirdUrl.split('/');
        if (thirdFilePosition === 'temp') {
          const thirdTempUrl = thirdUrl;
          thirdProductionUrl = thirdUrl.replace('temp', 'production');

          const copyright = await staffCopyright.findOne({
            attributes: ['thirdUrl'],
            where: { uuid },
            raw: true,
          });

          if (copyright?.thirdUrl) {
            await client.delete(copyright.thirdUrl);
          }

          await client.copy(thirdProductionUrl, thirdTempUrl);
        } else if (thirdFilePosition === 'production') {
          thirdProductionUrl = thirdUrl;
        } else {
          throw new CustomError('oss文件路径错误');
        }
      }

      const { currentWriteTime } = await staffCopyright.findOne({
        attributes: ['currentWriteTime'],
        where: { uuid },
        raw: true,
      });

      return await staffCopyright.update(
        {
          lastWriteTime: currentWriteTime,
          currentWriteTime: new Date(),
          firstUrl: firstProductionUrl,
          secondUrl: secondProductionUrl,
          thirdUrl: thirdProductionUrl,
        },
        { where: { uuid }, raw: true }
      );
    } catch (error) {
      throw error;
    }
  },


  /**
   * 新建一条奖项信息
   */
  insertStaffAward: ({
    userUuid,
    currentWriteTime,
    isVerify,
    awardType,
    awardName,
    awardTime,
    awardGrade,
    awardDepartment,
    awardNameList,
  }) =>
    staffAward.create(
      {
        uuid: uuid.v1(),
        userUuid,
        currentWriteTime,
        isVerify,
        awardType,
        awardName,
        awardTime,
        awardGrade,
        awardDepartment,
        awardNameList,
      },
      { raw: true }
    ),

  /**
   * 查询员工填写奖项信息
   */
  queryWriteAwardList: (userUuid) =>
    staffAward.findAll({
      attributes: [
        'uuid',
        'isVerify',
        'awardType',
        'awardName',
        'awardTime',
        'awardGrade',
        'awardDepartment',
        'verifyRemarks',
        'currentWriteTime',
        'awardNameList',
        'score',
      ],
      where: { userUuid },
      raw: true,
    }),

  /**
   * 查询员工填写奖项通过uuid
   */
  selectStaffAwardByUuid: ({ uuid }) =>
    staffAward.findOne({
      attributes: [
        'awardType',
        'awardName',
        'awardTime',
        'awardGrade',
        'awardDepartment',
        'awardNameList',
      ],
      where: { uuid },
      raw: true,
    }),

  /**
   * 查询奖项上次修改时间
   */
  selectAwardLastWriteTimeByUuid: (uuid) =>
    staffAward.findOne({
      attributes: ['currentWriteTime'],
      where: { uuid },
      raw: true,
    }),

  /**
   * 修改奖项信息
   */
  updateStaffAward: ({
    uuid,
    lastWriteTime,
    currentWriteTime,
    awardType,
    awardName,
    awardTime,
    awardGrade,
    awardDepartment,
    awardNameList,
  }) =>
    staffAward.update(
      {
        lastWriteTime,
        currentWriteTime,
        awardType,
        awardName,
        awardTime,
        awardGrade,
        awardDepartment,
        awardNameList,
        isVerify: '未核实',
        verifyRemarks: '',
      },
      { where: { uuid }, raw: true }
    ),

  /**
   * 删除奖项
   */
  deleteAward: (uuid) =>
    staffAward.destroy({
      where: { uuid },
      raw: true,
    }),

  /**
   * 新建一条论文/专著信息
   */
  insertStaffThesis: ({
    userUuid,
    currentWriteTime,
    isVerify,
    thesisTitle,
    thesisType,
    thesisJournal,
    thesisTime,
    thesisGrade,
    thesisCode,
    thesisFirstAuthor,
    thesisAuthorSequence,
  }) =>
    staffThesis.create(
      {
        uuid: uuid.v1(),
        userUuid,
        currentWriteTime,
        isVerify,
        thesisTitle,
        thesisType,
        thesisJournal,
        thesisTime,
        thesisGrade,
        thesisCode,
        thesisFirstAuthor,
        thesisAuthorSequence,
      },
      { raw: true }
    ),

  /**
   * 查询员工填写论文/专著信息
   */
  queryWriteThesisList: (userUuid) =>
    staffThesis.findAll({
      attributes: [
        'uuid',
        'isVerify',
        'thesisTitle',
        'thesisType',
        'thesisJournal',
        'thesisTime',
        'thesisGrade',
        'thesisCode',
        'thesisFirstAuthor',
        'thesisAuthorSequence',
        'verifyRemarks',
        'currentWriteTime',
        'score',
      ],
      where: { userUuid },
      raw: true,
    }),

  /**
   * 查询员工填写论文/专著通过uuid
   */
  selectStaffThesisByUuid: ({ uuid }) =>
    staffThesis.findOne({
      attributes: [
        'thesisTitle',
        'thesisType',
        'thesisJournal',
        'thesisTime',
        'thesisGrade',
        'thesisCode',
        'thesisFirstAuthor',
        'thesisAuthorSequence',
      ],
      where: { uuid },
      raw: true,
    }),

  /**
   * 查询论文/专著上次修改时间
   */
  selectThesisLastWriteTimeByUuid: (uuid) =>
    staffThesis.findOne({
      attributes: ['currentWriteTime'],
      where: { uuid },
      raw: true,
    }),

  /**
   * 修改论文/专著信息
   */
  updateStaffThesis: ({
    uuid,
    lastWriteTime,
    currentWriteTime,
    thesisTitle,
    thesisType,
    thesisJournal,
    thesisTime,
    thesisGrade,
    thesisCode,
    thesisFirstAuthor,
    thesisAuthorSequence,
  }) =>
    staffThesis.update(
      {
        lastWriteTime,
        currentWriteTime,
        thesisTitle,
        thesisType,
        thesisJournal,
        thesisTime,
        thesisGrade,
        thesisCode,
        thesisFirstAuthor,
        thesisAuthorSequence,
        isVerify: '未核实',
        verifyRemarks: '',
      },
      { where: { uuid }, raw: true }
    ),

  /**
   * 删除论文/专著
   */
  deleteThesis: (uuid) =>
    staffThesis.destroy({
      where: { uuid },
      raw: true,
    }),

  /**
   * 获取奖项的信息
   */
  selectUploadAward: (uuid) =>
    staffAward.findOne({
      attributes: ['firstUrl', 'secondUrl', 'thirdUrl'],
      where: { uuid },
      raw: true,
    }),

  /**
   * 保存奖项的信息
   */
  updateUploadAward: async ({ uuid, firstUrl, secondUrl, thirdUrl }) => {
    try {
      let firstProductionUrl = '',
        secondProductionUrl = '',
        thirdProductionUrl = '';

      // 将temp的文件copy到production中
      const [firstFilePosition] = firstUrl.split('/');
      console.log('firstFilePosition=', firstFilePosition);

      if (firstFilePosition === 'temp') {
        const firstTempUrl = firstUrl;
        firstProductionUrl = firstUrl.replace('temp', 'production');

        const award = await staffAward.findOne({
          attributes: ['firstUrl'],
          where: { uuid },
          raw: true,
        });

        if (award?.firstUrl) {
          await client.delete(award.firstUrl);
        }

        await client.copy(firstProductionUrl, firstTempUrl);
      } else if (firstFilePosition === 'production') {
        firstProductionUrl = firstUrl;
      } else {
        throw new CustomError('oss文件路径错误');
      }

      if (secondUrl) {
        const [secondFilePosition] = secondUrl.split('/');
        console.log('secondFilePosition=', secondFilePosition);
        if (secondFilePosition === 'temp') {
          const secondTempUrl = secondUrl;
          secondProductionUrl = secondUrl.replace('temp', 'production');

          const award = await staffAward.findOne({
            attributes: ['secondUrl'],
            where: { uuid },
            raw: true,
          });

          if (award?.secondUrl) {
            await client.delete(award.secondUrl);
          }

          await client.copy(secondProductionUrl, secondTempUrl);
        } else if (secondFilePosition === 'production') {
          secondProductionUrl = secondUrl;
        } else {
          throw new CustomError('oss文件路径错误');
        }
      }

      if (thirdUrl) {
        const [thirdFilePosition] = thirdUrl.split('/');
        console.log('thirdFilePosition=', thirdFilePosition);
        if (thirdFilePosition === 'temp') {
          const thirdTempUrl = thirdUrl;
          thirdProductionUrl = thirdUrl.replace('temp', 'production');

          const award = await staffAward.findOne({
            attributes: ['thirdUrl'],
            where: { uuid },
            raw: true,
          });

          if (award?.thirdUrl) {
            await client.delete(award.thirdUrl);
          }

          await client.copy(thirdProductionUrl, thirdTempUrl);
        } else if (thirdFilePosition === 'production') {
          thirdProductionUrl = thirdUrl;
        } else {
          throw new CustomError('oss文件路径错误');
        }
      }

      const { currentWriteTime } = await staffAward.findOne({
        attributes: ['currentWriteTime'],
        where: { uuid },
        raw: true,
      });

      return await staffAward.update(
        {
          lastWriteTime: currentWriteTime,
          currentWriteTime: new Date(),
          firstUrl: firstProductionUrl,
          secondUrl: secondProductionUrl,
          thirdUrl: thirdProductionUrl,
        },
        { where: { uuid }, raw: true }
      );
    } catch (error) {
      throw error;
    }
  },

  /**
   * 获取论文/专著的信息
   */
  selectUploadThesis: (uuid) =>
    staffThesis.findOne({
      attributes: ['firstUrl', 'secondUrl', 'thirdUrl'],
      where: { uuid },
      raw: true,
    }),

  /**
   * 保存论文/专著的信息
   */
  updateUploadThesis: async ({ uuid, firstUrl, secondUrl, thirdUrl }) => {
    try {
      let firstProductionUrl = '',
        secondProductionUrl = '',
        thirdProductionUrl = '';

      // 将temp的文件copy到production中
      const [firstFilePosition] = firstUrl.split('/');

      if (firstFilePosition === 'temp') {
        const firstTempUrl = firstUrl;
        firstProductionUrl = firstUrl.replace('temp', 'production');

        const thesis = await staffThesis.findOne({
          attributes: ['firstUrl'],
          where: { uuid },
          raw: true,
        });

        if (thesis?.firstUrl) {
          await client.delete(thesis.firstUrl);
        }

        await client.copy(firstProductionUrl, firstTempUrl);
      } else if (firstFilePosition === 'production') {
        firstProductionUrl = firstUrl;
      } else {
        throw new CustomError('oss文件路径错误');
      }

      if (secondUrl) {
        const [secondFilePosition] = secondUrl.split('/');
        if (secondFilePosition === 'temp') {
          const secondTempUrl = secondUrl;
          secondProductionUrl = secondUrl.replace('temp', 'production');

          const thesis = await staffThesis.findOne({
            attributes: ['secondUrl'],
            where: { uuid },
            raw: true,
          });

          if (thesis?.secondUrl) {
            await client.delete(thesis.secondUrl);
          }

          await client.copy(secondProductionUrl, secondTempUrl);
        } else if (secondFilePosition === 'production') {
          secondProductionUrl = secondUrl;
        } else {
          throw new CustomError('oss文件路径错误');
        }
      }

      if (thirdUrl) {
        const [thirdFilePosition] = thirdUrl.split('/');
        if (thirdFilePosition === 'temp') {
          const thirdTempUrl = thirdUrl;
          thirdProductionUrl = thirdUrl.replace('temp', 'production');

          const thesis = await staffThesis.findOne({
            attributes: ['thirdUrl'],
            where: { uuid },
            raw: true,
          });

          if (thesis?.thirdUrl) {
            await client.delete(thesis.thirdUrl);
          }

          await client.copy(thirdProductionUrl, thirdTempUrl);
        } else if (thirdFilePosition === 'production') {
          thirdProductionUrl = thirdUrl;
        } else {
          throw new CustomError('oss文件路径错误');
        }
      }

      const { currentWriteTime } = await staffThesis.findOne({
        attributes: ['currentWriteTime'],
        where: { uuid },
        raw: true,
      });

      return await staffThesis.update(
        {
          lastWriteTime: currentWriteTime,
          currentWriteTime: new Date(),
          firstUrl: firstProductionUrl,
          secondUrl: secondProductionUrl,
          thirdUrl: thirdProductionUrl,
        },
        { where: { uuid }, raw: true }
      );
    } catch (error) {
      throw error;
    }
  },

  /**
   * 查询普通员工完成填写上次修改时间
   */
  selectStaffLastWriteTimeByUuid: (uuid) =>
    user.findOne({
      attributes: ['currentWriteTime'],
      where: { uuid },
      raw: true,
    }),

  /**
   * 完成填写
   */
  updateStaffWriteStatus: async ({
    uuid,
    verifyStatus,
    verifyTime,
    lastWriteTime,
    currentWriteTime,
  }) => {
    const [
      basicWriteStatus,
      projectWriteStatus,
      patentWriteStatus,
      copyrightWriteStatus,
      awardWriteStatus,
      thesisWriteStatus,
    ] = await Promise.all([
      staffBasic.findOne({
        attributes: ['currentWriteTime'],
        where: { userUuid: uuid },
        raw: true,
      }),
      staffProject.findAll({
        attributes: ['currentWriteTime'],
        where: { userUuid: uuid },
        raw: true,
      }),
      staffPatent.findAll({
        attributes: ['currentWriteTime'],
        where: { userUuid: uuid },
        raw: true,
      }),
      staffCopyright.findAll({
        attributes: ['currentWriteTime'],
        where: { userUuid: uuid },
        raw: true,
      }),
      staffAward.findAll({
        attributes: ['currentWriteTime'],
        where: { userUuid: uuid },
        raw: true,
      }),
      staffThesis.findAll({
        attributes: ['currentWriteTime'],
        where: { userUuid: uuid },
        raw: true,
      }),
    ]);

    if (!basicWriteStatus?.currentWriteTime) {
      throw new CustomError('请填写基本信息!');
    }

    await Promise.all([
      user.update(
        {
          verifyStatus,
          lastWriteTime,
          currentWriteTime,
          verifyTime,
        },
        { where: { uuid }, raw: true }
      ),
      staffStatus.update(
        {
          basicWriteStatus: basicWriteStatus.currentWriteTime
            ? '已填写'
            : '未填写',
          projectWriteStatus: projectWriteStatus.length ? '已填写' : '未填写',
          patentWriteStatus: patentWriteStatus.length ? '已填写' : '未填写',
          copyrightWriteStatus: copyrightWriteStatus.length
            ? '已填写'
            : '未填写',
          awardWriteStatus: awardWriteStatus.length ? '已填写' : '未填写',
          thesisWriteStatus: thesisWriteStatus.length ? '已填写' : '未填写',
          verifyStatus,
        },
        { where: { uuid }, raw: true }
      ),
    ]);

    const [
      basicVerify,
      projectVerify,
      patentVerify,
      copyrightVerify,
      awardVerify,
      thesisVerify,
    ] = await Promise.all([
      staffBasic.findOne({
        attributes: ['isVerify'],
        where: { userUuid: uuid },
        raw: true,
      }),
      staffProject.findAll({
        attributes: ['isVerify'],
        where: { userUuid: uuid },
        raw: true,
      }),
      staffPatent.findAll({
        attributes: ['isVerify'],
        where: { userUuid: uuid },
        raw: true,
      }),
      staffCopyright.findAll({
        attributes: ['isVerify'],
        where: { userUuid: uuid },
        raw: true,
      }),
      staffAward.findAll({
        attributes: ['isVerify'],
        where: { userUuid: uuid },
        raw: true,
      }),
      staffThesis.findAll({
        attributes: ['isVerify'],
        where: { userUuid: uuid },
        raw: true,
      }),
    ]);

    let basicVerifyStatus = '',
      projectVerifyStatus = '',
      patentVerifyStatus = '',
      copyrightVerifyStatus = '',
      awardVerifyStatus = '',
      thesisVerifyStatus = '';

    if (basicVerify.isVerify === '核实不通过') {
      throw new CustomError('请按统计员修改意见完成修改后完成提交!');
    } else {
      basicVerifyStatus = basicVerify.isVerify;
    }

    if (!projectVerify.length) {
      projectVerifyStatus = '未填写';
    } else {
      let projectVerifyList = projectVerify.map((value) => value.isVerify);
      if (projectVerifyList.indexOf('核实不通过') !== -1) {
        throw new CustomError('请按统计员修改意见完成修改后完成提交!');
      } else if (projectVerifyList.indexOf('未核实') !== -1) {
        projectVerifyStatus = '未核实';
      } else {
        projectVerifyStatus = '核实通过';
      }
    }

    if (!patentVerify.length) {
      patentVerifyStatus = '未填写';
    } else {
      let patentVerifyList = patentVerify.map((value) => value.isVerify);
      if (patentVerifyList.indexOf('核实不通过') !== -1) {
        throw new CustomError('请按统计员修改意见完成修改后完成提交!');
      } else if (patentVerifyList.indexOf('未核实') !== -1) {
        patentVerifyStatus = '未核实';
      } else {
        patentVerifyStatus = '核实通过';
      }
    }

    if (!copyrightVerify.length) {
      copyrightVerifyStatus = '未填写';
    } else {
      let copyrightVerifyList = copyrightVerify.map((value) => value.isVerify);
      if (copyrightVerifyList.indexOf('核实不通过') !== -1) {
        throw new CustomError('请按统计员修改意见完成修改后完成提交!');
      } else if (copyrightVerifyList.indexOf('未核实') !== -1) {
        copyrightVerifyStatus = '未核实';
      } else {
        copyrightVerifyStatus = '核实通过';
      }
    }

    if (!awardVerify.length) {
      awardVerifyStatus = '未填写';
    } else {
      let awardVerifyList = awardVerify.map((value) => value.isVerify);
      if (awardVerifyList.indexOf('核实不通过') !== -1) {
        throw new CustomError('请按统计员修改意见完成修改后完成提交!');
      } else if (awardVerifyList.indexOf('未核实') !== -1) {
        awardVerifyStatus = '未核实';
      } else {
        awardVerifyStatus = '核实通过';
      }
    }

    if (!thesisVerify.length) {
      thesisVerifyStatus = '未填写';
    } else {
      let thesisVerifyList = thesisVerify.map((value) => value.isVerify);
      if (thesisVerifyList.indexOf('核实不通过') !== -1) {
        throw new CustomError('请按统计员修改意见完成修改后完成提交!');
      } else if (thesisVerifyList.indexOf('未核实') !== -1) {
        thesisVerifyStatus = '未核实';
      } else {
        thesisVerifyStatus = '核实通过';
      }
    }

    await staffStatus.update(
      {
        basicVerifyStatus,
        projectVerifyStatus,
        patentVerifyStatus,
        copyrightVerifyStatus,
        awardVerifyStatus,
        thesisVerifyStatus,
      },
      { where: { uuid }, raw: true }
    );
  },
};
