import staffBasic from '../../../db/models/staff-basic';
import user from '../../../db/models/t-user';

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
   * 查询评审管理员系统时间
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
};
