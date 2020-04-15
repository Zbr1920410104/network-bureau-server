import user from '../../../db/models/t-user';
import staffBasic from '../../../db/models/staff-basic';
import staffProject from '../../../db/models/staff-project';

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
};
