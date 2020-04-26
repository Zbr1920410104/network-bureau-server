import user from '../../../db/models/t-user';
import staffBasic from '../../../db/models/staff-basic';
import staffProject from '../../../db/models/staff-project';
import staffPatent from '../../../db/models/staff-patent';
import staffCopyright from '../../../db/models/staff-copyright';
import staffAward from '../../../db/models/staff-award';
import staffThesis from '../../../db/models/staff-thesis';

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

  /**
   * 查询员工填写项目信息
   */
  queryReviewProjectList: ({ userUuid }) =>
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
        'verifyTime',
        'score',
        'reviewTime',
      ],
      where: { userUuid },
      raw: true,
    }),

  /**
   * 查询员工填写专利信息
   */
  queryReviewPatentList: ({ userUuid }) =>
    staffPatent.findAll({
      attributes: [
        'uuid',
        'patentType',
        'patentName',
        'patentCode',
        'patentNation',
        'isVerify',
        'verifyTime',
        'score',
        'reviewTime',
      ],
      where: { userUuid },
      raw: true,
    }),

  /**
   * 查询员工填写软件著作权信息
   */
  queryReviewCopyrightList: ({ userUuid }) =>
    staffCopyright.findAll({
      attributes: [
        'uuid',
        'copyrightType',
        'copyrightName',
        'copyrightCode',
        'copyrightArrange',
        'isVerify',
        'verifyTime',
        'score',
        'reviewTime',
      ],
      where: { userUuid },
      raw: true,
    }),

  /**
   * 查询员工填写奖项信息
   */
  queryReviewAwardList: ({ userUuid }) =>
    staffAward.findAll({
      attributes: [
        'uuid',
        'awardType',
        'awardName',
        'awardTime',
        'awardGrade',
        'awardDepartment',
        'isVerify',
        'verifyTime',
        'awardNameList',
        'score',
        'reviewTime',
        'url',
      ],
      where: { userUuid },
      raw: true,
    }),

  /**
   * 查询员工填写论文/专著信息
   */
  queryReviewThesisList: ({ userUuid }) =>
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
        'verifyTime',
        'score',
        'reviewTime',
        'url',
      ],
      where: { userUuid },
      raw: true,
    }),

  /**
   * 统计管理员查询项目打分
   */
  selectProjectScoreByUuid: ({ uuid }) =>
    staffProject.findOne({
      attributes: ['score', 'reviewRemarks'],
      where: { uuid },
      raw: true,
    }),

  /**
   * 统计管理员查询专利打分
   */
  selectPatentScoreByUuid: ({ uuid }) =>
    staffPatent.findOne({
      attributes: ['score', 'reviewRemarks'],
      where: { uuid },
      raw: true,
    }),

  /**
   * 统计管理员查询软件著作权打分
   */
  selectCopyrightScoreByUuid: ({ uuid }) =>
    staffCopyright.findOne({
      attributes: ['score', 'reviewRemarks'],
      where: { uuid },
      raw: true,
    }),

  /**
   * 统计管理员查询奖项打分
   */
  selectAwardScoreByUuid: ({ uuid }) =>
    staffAward.findOne({
      attributes: ['score', 'reviewRemarks'],
      where: { uuid },
      raw: true,
    }),

  /**
   * 统计管理员查询论文/专著打分
   */
  selectThesisScoreByUuid: ({ uuid }) =>
    staffThesis.findOne({
      attributes: ['score', 'reviewRemarks'],
      where: { uuid },
      raw: true,
    }),

  /**
   * 统计员项目信息评分
   */
  updateProjectScore: ({
    uuid,
    score,
    reviewUserUuid,
    reviewRemarks,
    reviewTime,
  }) =>
    staffProject.update(
      {
        score,
        reviewUserUuid,
        reviewRemarks,
        reviewTime,
      },
      { where: { uuid }, raw: true }
    ),

  /**
   * 统计员项目信息评分
   */
  updatePatentScore: ({
    uuid,
    score,
    reviewUserUuid,
    reviewRemarks,
    reviewTime,
  }) =>
    staffPatent.update(
      {
        score,
        reviewUserUuid,
        reviewRemarks,
        reviewTime,
      },
      { where: { uuid }, raw: true }
    ),

  /**
   * 统计员软件著作权信息评分
   */
  updateCopyrightScore: ({
    uuid,
    score,
    reviewUserUuid,
    reviewRemarks,
    reviewTime,
  }) =>
    staffCopyright.update(
      {
        score,
        reviewUserUuid,
        reviewRemarks,
        reviewTime,
      },
      { where: { uuid }, raw: true }
    ),

  /**
   * 统计员奖项信息评分
   */
  updateAwardScore: ({
    uuid,
    score,
    reviewUserUuid,
    reviewRemarks,
    reviewTime,
  }) =>
    staffAward.update(
      {
        score,
        reviewUserUuid,
        reviewRemarks,
        reviewTime,
      },
      { where: { uuid }, raw: true }
    ),

  /**
   * 统计员论文/专著信息评分
   */
  updateThesisScore: ({
    uuid,
    score,
    reviewUserUuid,
    reviewRemarks,
    reviewTime,
  }) =>
    staffThesis.update(
      {
        score,
        reviewUserUuid,
        reviewRemarks,
        reviewTime,
      },
      { where: { uuid }, raw: true }
    ),

  /**
   * 完成审核
   */
  finishReviewManagerReview: async ({ userUuid }) => {
    try {
      const [
        projectScore,
        patentScore,
        copyrightScore,
        awardScore,
        thesisScore,
      ] = await Promise.all([
        staffProject.findAll({
          attributes: ['score'],
          where: { userUuid },
          raw: true,
        }),
        staffPatent.findAll({
          attributes: ['score'],
          where: { userUuid },
          raw: true,
        }),
        staffCopyright.findAll({
          attributes: ['score'],
          where: { userUuid },
          raw: true,
        }),
        staffAward.findAll({
          attributes: ['score'],
          where: { userUuid },
          raw: true,
        }),
        staffThesis.findAll({
          attributes: ['score'],
          where: { userUuid },
          raw: true,
        }),
      ]);

      const projectScoreList = projectScore?.map((item) => item.score);
      const patentScoreList = patentScore?.map((item) => item.score);
      const copyrightScoreList = copyrightScore?.map((item) => item.score);
      const awardScoreList = awardScore?.map((item) => item.score);
      const thesisScoreList = thesisScore?.map((item) => item.score);

      let projectScoreFinished = true,
        patentScoreFinished = true,
        copyrightScoreFinished = true,
        awardScoreFinished = true,
        thesisScoreFinished = true,
        sum = 0;

      for (let projectScoreItem of projectScoreList) {
        if (projectScoreItem === null) {
          projectScoreFinished = false;
          break;
        }
        sum += projectScoreItem;
      }

      for (let patentScoreItem of patentScoreList) {
        if (patentScoreItem === null) {
          patentScoreFinished = false;
          break;
        }
        sum += patentScoreItem;
      }

      for (let copyrightScoreItem of copyrightScoreList) {
        if (copyrightScoreItem === null) {
          copyrightScoreFinished = false;
          break;
        }
        sum += copyrightScoreItem;
      }

      for (let awardScoreItem of awardScoreList) {
        if (awardScoreItem === null) {
          awardScoreFinished = false;
          break;
        }
        sum += awardScoreItem;
      }

      for (let thesisScoreItem of thesisScoreList) {
        if (thesisScoreItem === null) {
          thesisScoreFinished = false;
          break;
        }
        sum += thesisScoreItem;
      }

      if (
        !(
          projectScoreFinished &&
          patentScoreFinished &&
          copyrightScoreFinished &&
          awardScoreFinished &&
          thesisScoreFinished
        )
      ) {
        throw error;
      }

      return await user.update(
        {
          totalScore: sum,
          reviewTime: new Date(),
        },
        { where: { uuid: userUuid }, raw: true }
      );
    } catch (error) {
      throw error;
    }
  },
};
