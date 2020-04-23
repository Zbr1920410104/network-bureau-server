import user from '../../../db/models/t-user';
import staffBasic from '../../../db/models/staff-basic';
import staffProject from '../../../db/models/staff-project';
import staffPatent from '../../../db/models/staff-patent';
import staffCopyright from '../../../db/models/staff-copyright';
import staffAward from '../../../db/models/staff-award';
import staffThesis from '../../../db/models/staff-thesis';

import uuid from 'uuid';

// 工具类
import CustomError from '../../../util/custom-error';
import webToken from '../../../util/token';

// oss
import client from '../../../util/oss';
import { db } from '../../../db/db-connect';

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
      { where: { userUuid }, raw: true }
    ),
  /**
   * 查询员工填写信息
   */
  getStaffWriteInfo: async (userUuid) => {
    try {
      let lastWriteList = await user.findOne({
        attributes: ['name', 'department', 'lastWriteTime'],
        where: { uuid: userUuid },
        raw: true,
      });

      if ('lastWriteTime' in lastWriteList) {
        lastWriteList.id = 2;
        lastWriteList.writeTime = lastWriteList.lastWriteTime;
      }

      let currentWriteList = await user.findOne({
        attributes: [
          'name',
          'department',
          'currentWriteTime',
          'verifyStatus',
          'verifyTime',
        ],
        where: { uuid: userUuid },
        raw: true,
      });

      if ('currentWriteTime' in currentWriteList) {
        currentWriteList.id = 1;
        currentWriteList.writeTime = currentWriteList.currentWriteTime;
        if (!currentWriteList.verifyStatus) {
          currentWriteList.verifyStatus = '未填写完毕';
        }
      }

      if ('lastWriteTime' in lastWriteList) {
        return [currentWriteList, lastWriteList];
      } else if ('currentWriteTime' in currentWriteList) {
        return [currentWriteList];
      } else return [];
    } catch (error) {
      throw error;
    }
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
      },
      { where: { uuid }, raw: true }
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
        'patentType',
        'patentName',
        'patentCode',
        'patentNation',
        'isVerify',
        'currentWriteTime',
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
        'copyrightType',
        'copyrightName',
        'copyrightCode',
        'copyrightArrange',
        'isVerify',
        'currentWriteTime',
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
        'awardType',
        'awardName',
        'awardTime',
        'awardGrade',
        'awardDepartment',
        'isVerify',
        'currentWriteTime',
        'awardNameList',
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
      attributes: ['url'],
      where: { uuid },
      raw: true,
    }),

  /**
   * 保存奖项的信息
   */
  updateUploadAward: async ({ uuid, awardUrl }) => {
    try {
      let productionUrl = '';
      // 将temp的文件copy到production中
      const [filePosition] = awardUrl.split('/');

      if (filePosition === 'temp') {
        const tempUrl = awardUrl;
        productionUrl = awardUrl.replace('temp', 'production');

        const award = await staffAward.findOne({
          attributes: ['url'],
          where: { uuid },
          raw: true,
        });

        if (award?.url) {
          await client.delete(award.url);
        }

        await client.copy(productionUrl, tempUrl);
      } else if (filePosition === 'production') {
        productionUrl = awardUrl;
      } else {
        throw new CustomError('oss文件路径错误');
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
          url: productionUrl,
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
      attributes: ['url'],
      where: { uuid },
      raw: true,
    }),

  /**
   * 保存论文/专著的信息
   */
  updateUploadThesis: async ({ uuid, thesisUrl }) => {
    try {
      let productionUrl = '';
      // 将temp的文件copy到production中
      const [filePosition] = thesisUrl.split('/');

      if (filePosition === 'temp') {
        const tempUrl = thesisUrl;
        productionUrl = thesisUrl.replace('temp', 'production');

        const thesis = await staffThesis.findOne({
          attributes: ['url'],
          where: { uuid },
          raw: true,
        });

        if (thesis?.url) {
          await client.delete(thesis.url);
        }

        await client.copy(productionUrl, tempUrl);
      } else if (filePosition === 'production') {
        productionUrl = thesisUrl;
      } else {
        throw new CustomError('oss文件路径错误');
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
          url: productionUrl,
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
  updateStaffWriteStatus: ({
    uuid,
    verifyStatus,
    verifyTime,
    lastWriteTime,
    currentWriteTime,
  }) =>
    user.update(
      {
        verifyStatus,
        lastWriteTime,
        currentWriteTime,
        verifyTime,
      },
      { where: { uuid }, raw: true }
    ),
};
