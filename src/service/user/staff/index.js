import staffBasic from '../../../db/models/staff-basic';

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
};
