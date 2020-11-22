import user from "../../../db/models/t-user";
import staffBasic from "../../../db/models/staff-basic";
import staffProject from "../../../db/models/staff-project";
import staffPatent from "../../../db/models/staff-patent";
import staffCopyright from "../../../db/models/staff-copyright";
import staffAward from "../../../db/models/staff-award";
import staffThesis from "../../../db/models/staff-thesis";
import staffBook from "../../../db/models/staff-book";

// 工具
import xlsx from "node-xlsx";

// oss
import client from "../../../util/oss";

import Sequelize from "sequelize";
const Op = Sequelize.Op;

// uuid
import uuid from "uuid";

// 工具类
import CustomError from "../../../util/custom-error";
import webToken from "../../../util/token";

export default {
  /**
   * 查询账户信息通过分数限制
   */
  queryStaffReviewInfoByScoreLimit: ({ staffItem, scoreLimit, score }) => {
    switch (staffItem) {
      case "total": {
        switch (scoreLimit) {
          case "等于":
            return user.findAll({
              attributes: [
                "uuid",
                "userName",
                "name",
                "reviewTime",
                "currentWriteTime",
                "department",
                "totalScore",
                "verifyStatus",
                "projectScoreSum",
                "patentScoreSum",
                "copyrightScoreSum",
                "awardScoreSum",
                "thesisScoreSum",
                "bookScoreSum",
              ],
              where: {
                role: 15,
                isCancel: "未注销",
                totalScore: score,
              },
              raw: true,
            });
          case "大于等于":
            return user.findAll({
              attributes: [
                "uuid",
                "userName",
                "name",
                "reviewTime",
                "currentWriteTime",
                "department",
                "totalScore",
                "verifyStatus",
                "projectScoreSum",
                "patentScoreSum",
                "copyrightScoreSum",
                "awardScoreSum",
                "thesisScoreSum",
                "bookScoreSum",
              ],
              where: {
                role: 15,
                isCancel: "未注销",
                totalScore: { [Op.gte]: score },
              },
              raw: true,
            });
          case "小于":
            return user.findAll({
              attributes: [
                "uuid",
                "userName",
                "name",
                "reviewTime",
                "currentWriteTime",
                "department",
                "totalScore",
                "verifyStatus",
                "projectScoreSum",
                "patentScoreSum",
                "copyrightScoreSum",
                "awardScoreSum",
                "thesisScoreSum",
                "bookScoreSum",
              ],
              where: {
                role: 15,
                isCancel: "未注销",
                totalScore: { [Op.lt]: score },
              },
              raw: true,
            });
        }
      }
      case "project": {
        switch (scoreLimit) {
          case "等于":
            return user.findAll({
              attributes: [
                "uuid",
                "userName",
                "name",
                "reviewTime",
                "currentWriteTime",
                "department",
                "totalScore",
                "verifyStatus",
                "projectScoreSum",
                "patentScoreSum",
                "copyrightScoreSum",
                "awardScoreSum",
                "thesisScoreSum",
                "bookScoreSum",
              ],
              where: { role: 15, isCancel: "未注销", projectScoreSum: score },
              raw: true,
            });
          case "大于等于":
            return user.findAll({
              attributes: [
                "uuid",
                "userName",
                "name",
                "reviewTime",
                "currentWriteTime",
                "department",
                "totalScore",
                "verifyStatus",
                "projectScoreSum",
                "patentScoreSum",
                "copyrightScoreSum",
                "awardScoreSum",
                "thesisScoreSum",
                "bookScoreSum",
              ],
              where: {
                role: 15,
                isCancel: "未注销",
                projectScoreSum: { [Op.gte]: score },
              },
              raw: true,
            });
          case "小于":
            return user.findAll({
              attributes: [
                "uuid",
                "userName",
                "name",
                "reviewTime",
                "currentWriteTime",
                "department",
                "totalScore",
                "verifyStatus",
                "projectScoreSum",
                "patentScoreSum",
                "copyrightScoreSum",
                "awardScoreSum",
                "thesisScoreSum",
                "bookScoreSum",
              ],
              where: {
                role: 15,
                isCancel: "未注销",
                projectScoreSum: { [Op.lt]: score },
              },
              raw: true,
            });
        }
      }
      case "patent": {
        switch (scoreLimit) {
          case "等于":
            return user.findAll({
              attributes: [
                "uuid",
                "userName",
                "name",
                "reviewTime",
                "currentWriteTime",
                "department",
                "totalScore",
                "verifyStatus",
                "projectScoreSum",
                "patentScoreSum",
                "copyrightScoreSum",
                "awardScoreSum",
                "thesisScoreSum",
                "bookScoreSum",
              ],
              where: {
                role: 15,
                isCancel: "未注销",
                patentScoreSum: score,
              },
              raw: true,
            });
          case "大于等于":
            return user.findAll({
              attributes: [
                "uuid",
                "userName",
                "name",
                "reviewTime",
                "currentWriteTime",
                "department",
                "totalScore",
                "verifyStatus",
                "projectScoreSum",
                "patentScoreSum",
                "copyrightScoreSum",
                "awardScoreSum",
                "thesisScoreSum",
                "bookScoreSum",
              ],
              where: {
                role: 15,
                isCancel: "未注销",
                patentScoreSum: { [Op.gte]: score },
              },
              raw: true,
            });
          case "小于":
            return user.findAll({
              attributes: [
                "uuid",
                "userName",
                "name",
                "reviewTime",
                "currentWriteTime",
                "department",
                "totalScore",
                "verifyStatus",
                "projectScoreSum",
                "patentScoreSum",
                "copyrightScoreSum",
                "awardScoreSum",
                "thesisScoreSum",
                "bookScoreSum",
              ],
              where: {
                role: 15,
                isCancel: "未注销",
                patentScoreSum: { [Op.lt]: score },
              },
              raw: true,
            });
        }
      }
      case "copyright": {
        switch (scoreLimit) {
          case "等于":
            return user.findAll({
              attributes: [
                "uuid",
                "userName",
                "name",
                "reviewTime",
                "currentWriteTime",
                "department",
                "totalScore",
                "verifyStatus",
                "projectScoreSum",
                "patentScoreSum",
                "copyrightScoreSum",
                "awardScoreSum",
                "thesisScoreSum",
                "bookScoreSum",
              ],
              where: {
                role: 15,
                isCancel: "未注销",
                copyrightScoreSum: score,
              },
              raw: true,
            });
          case "大于等于":
            return user.findAll({
              attributes: [
                "uuid",
                "userName",
                "name",
                "reviewTime",
                "currentWriteTime",
                "department",
                "totalScore",
                "verifyStatus",
                "projectScoreSum",
                "patentScoreSum",
                "copyrightScoreSum",
                "awardScoreSum",
                "thesisScoreSum",
                "bookScoreSum",
              ],
              where: {
                role: 15,
                isCancel: "未注销",
                copyrightScoreSum: { [Op.gte]: score },
              },
              raw: true,
            });
          case "小于":
            return user.findAll({
              attributes: [
                "uuid",
                "userName",
                "name",
                "reviewTime",
                "currentWriteTime",
                "department",
                "totalScore",
                "verifyStatus",
                "projectScoreSum",
                "patentScoreSum",
                "copyrightScoreSum",
                "awardScoreSum",
                "thesisScoreSum",
                "bookScoreSum",
              ],
              where: {
                role: 15,
                isCancel: "未注销",
                copyrightScoreSum: { [Op.lt]: score },
              },
              raw: true,
            });
        }
      }
      case "award": {
        switch (scoreLimit) {
          case "等于":
            return user.findAll({
              attributes: [
                "uuid",
                "userName",
                "name",
                "reviewTime",
                "currentWriteTime",
                "department",
                "totalScore",
                "verifyStatus",
                "projectScoreSum",
                "patentScoreSum",
                "copyrightScoreSum",
                "awardScoreSum",
                "thesisScoreSum",
                "bookScoreSum",
              ],
              where: {
                role: 15,
                isCancel: "未注销",
                awardScoreSum: score,
              },
              raw: true,
            });
          case "大于等于":
            return user.findAll({
              attributes: [
                "uuid",
                "userName",
                "name",
                "reviewTime",
                "currentWriteTime",
                "department",
                "totalScore",
                "verifyStatus",
                "projectScoreSum",
                "patentScoreSum",
                "copyrightScoreSum",
                "awardScoreSum",
                "thesisScoreSum",
                "bookScoreSum",
              ],
              where: {
                role: 15,
                isCancel: "未注销",
                awardScoreSum: { [Op.gte]: score },
              },
              raw: true,
            });
          case "小于":
            return user.findAll({
              attributes: [
                "uuid",
                "userName",
                "name",
                "reviewTime",
                "currentWriteTime",
                "department",
                "totalScore",
                "verifyStatus",
                "projectScoreSum",
                "patentScoreSum",
                "copyrightScoreSum",
                "awardScoreSum",
                "thesisScoreSum",
                "bookScoreSum",
              ],
              where: {
                role: 15,
                isCancel: "未注销",
                awardScoreSum: { [Op.lt]: score },
              },
              raw: true,
            });
        }
      }
      case "thesis": {
        switch (scoreLimit) {
          case "等于":
            return user.findAll({
              attributes: [
                "uuid",
                "userName",
                "name",
                "reviewTime",
                "currentWriteTime",
                "department",
                "totalScore",
                "verifyStatus",
                "projectScoreSum",
                "patentScoreSum",
                "copyrightScoreSum",
                "awardScoreSum",
                "thesisScoreSum",
                "bookScoreSum",
              ],
              where: {
                role: 15,
                isCancel: "未注销",
                thesisScoreSum: score,
              },
              raw: true,
            });
          case "大于等于":
            return user.findAll({
              attributes: [
                "uuid",
                "userName",
                "name",
                "reviewTime",
                "currentWriteTime",
                "department",
                "totalScore",
                "verifyStatus",
                "projectScoreSum",
                "patentScoreSum",
                "copyrightScoreSum",
                "awardScoreSum",
                "thesisScoreSum",
                "bookScoreSum",
              ],
              where: {
                role: 15,
                isCancel: "未注销",
                thesisScoreSum: { [Op.gte]: score },
              },
              raw: true,
            });
          case "小于":
            return user.findAll({
              attributes: [
                "uuid",
                "userName",
                "name",
                "reviewTime",
                "currentWriteTime",
                "department",
                "totalScore",
                "verifyStatus",
                "projectScoreSum",
                "patentScoreSum",
                "copyrightScoreSum",
                "awardScoreSum",
                "thesisScoreSum",
                "bookScoreSum",
              ],
              where: {
                role: 15,
                isCancel: "未注销",
                thesisScoreSum: { [Op.lt]: score },
              },
              raw: true,
            });
        }
      }
      case "book": {
        switch (scoreLimit) {
          case "等于":
            return user.findAll({
              attributes: [
                "uuid",
                "userName",
                "name",
                "reviewTime",
                "currentWriteTime",
                "department",
                "totalScore",
                "verifyStatus",
                "projectScoreSum",
                "patentScoreSum",
                "copyrightScoreSum",
                "awardScoreSum",
                "thesisScoreSum",
                "bookScoreSum",
              ],
              where: {
                role: 15,
                isCancel: "未注销",
                bookScoreSum: score,
              },
              raw: true,
            });
          case "大于等于":
            return user.findAll({
              attributes: [
                "uuid",
                "userName",
                "name",
                "reviewTime",
                "currentWriteTime",
                "department",
                "totalScore",
                "verifyStatus",
                "projectScoreSum",
                "patentScoreSum",
                "copyrightScoreSum",
                "awardScoreSum",
                "thesisScoreSum",
                "bookScoreSum",
              ],
              where: {
                role: 15,
                isCancel: "未注销",
                bookScoreSum: { [Op.gte]: score },
              },
              raw: true,
            });
          case "小于":
            return user.findAll({
              attributes: [
                "uuid",
                "userName",
                "name",
                "reviewTime",
                "currentWriteTime",
                "department",
                "totalScore",
                "verifyStatus",
                "projectScoreSum",
                "patentScoreSum",
                "copyrightScoreSum",
                "awardScoreSum",
                "thesisScoreSum",
                "bookScoreSum",
              ],
              where: {
                role: 15,
                isCancel: "未注销",
                bookScoreSum: { [Op.lt]: score },
              },
              raw: true,
            });
        }
      }
      default: {
        switch (scoreLimit) {
          case "等于":
            return user.findAll({
              attributes: [
                "uuid",
                "userName",
                "name",
                "reviewTime",
                "currentWriteTime",
                "department",
                "totalScore",
                "verifyStatus",
                "projectScoreSum",
                "patentScoreSum",
                "copyrightScoreSum",
                "awardScoreSum",
                "thesisScoreSum",
                "bookScoreSum",
              ],
              where: {
                role: 15,
                isCancel: "未注销",
                totalScore: score,
              },
              raw: true,
            });
          case "大于等于":
            return user.findAll({
              attributes: [
                "uuid",
                "userName",
                "name",
                "reviewTime",
                "currentWriteTime",
                "department",
                "totalScore",
                "verifyStatus",
                "projectScoreSum",
                "patentScoreSum",
                "copyrightScoreSum",
                "awardScoreSum",
                "thesisScoreSum",
                "bookScoreSum",
              ],
              where: {
                role: 15,
                isCancel: "未注销",
                totalScore: { [Op.gte]: score },
              },
              raw: true,
            });
          case "小于":
            return user.findAll({
              attributes: [
                "uuid",
                "userName",
                "name",
                "reviewTime",
                "currentWriteTime",
                "department",
                "totalScore",
                "verifyStatus",
                "projectScoreSum",
                "patentScoreSum",
                "copyrightScoreSum",
                "awardScoreSum",
                "thesisScoreSum",
                "bookScoreSum",
              ],
              where: {
                role: 15,
                isCancel: "未注销",
                totalScore: { [Op.lt]: score },
              },
              raw: true,
            });
        }
      }
    }
  },
  /**
   * 查询账户信息
   */
  queryStaffReviewInfo: () =>
    user.findAll({
      attributes: [
        "uuid",
        "userName",
        "name",
        "reviewTime",
        "currentWriteTime",
        "department",
        "totalScore",
        "verifyStatus",
        "projectScoreSum",
        "patentScoreSum",
        "copyrightScoreSum",
        "awardScoreSum",
        "thesisScoreSum",
        "bookScoreSum",
      ],
      where: { role: 15, isCancel: "未注销" },
      raw: true,
    }),
  /**
   * 评审管理员查询基本信息
   */
  selectReviewManagerBasic: ({ userUuid }) =>
    staffBasic.findOne({
      attributes: [
        "name",
        "idNumber",
        "sex",
        "nation",
        "nativePlace",
        "politicalAffiliation",
        "department",
        "officePhone",
        "phone",
        "education",
        "degree",
        "graduateSchool",
        "major",
        "duty",
        "workTime",
        "professionTitle",
        "getTime",
        "researchDirection",
        "studyExperience",
        "workExperience",
        "skills",
        "professionalPromotion",
        "currentProfession"
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
        "uuid",
        "userName",
        "name",
        "totalScore",
        "reviewTime",
        "currentWriteTime",
        "department",
        "verifyStatus",
        "projectScoreSum",
        "patentScoreSum",
        "copyrightScoreSum",
        "awardScoreSum",
        "thesisScoreSum",
        "bookScoreSum",
      ],
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
        role: 15,
        isCancel: "未注销",
      },
      raw: true,
    }),

  /**
   * 查询账户信息通过核实状态
   */
  queryStaffReviewInfoByReviewStatus: async (reviewStatus) => {
    if (reviewStatus === "已评分") {
      return await user.findAll({
        attributes: [
          "uuid",
          "userName",
          "name",
          "totalScore",
          "currentWriteTime",
          "department",
          "verifyStatus",
          "projectScoreSum",
          "patentScoreSum",
          "copyrightScoreSum",
          "awardScoreSum",
          "thesisScoreSum",
          "bookScoreSum",
        ],
        where: { totalScore: { [Op.ne]: null }, role: 15, isCancel: "未注销" },
        raw: true,
      });
    } else {
      return await user.findAll({
        attributes: [
          "uuid",
          "userName",
          "name",
          "totalScore",
          "currentWriteTime",
          "department",
          "verifyStatus",
          "projectScoreSum",
          "patentScoreSum",
          "copyrightScoreSum",
          "awardScoreSum",
          "thesisScoreSum",
          "bookScoreSum",
        ],
        where: { totalScore: null, role: 15, isCancel: "未注销" },
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
        "uuid",
        "name",
        "grade",
        "type",
        "startTime",
        "endTime",
        "code",
        "resource",
        "funds",
        "controller",
        "participant",
        "content",
        "isVerify",
        "verifyTime",
        "score",
        "reviewTime",
        "firstUrl",
        "secondUrl",
        "thirdUrl",
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
        "uuid",
        "patentType",
        "patentName",
        "patentCode",
        "rank",
        "patentee",
        "patentTime",
        "inventor",
        "isVerify",
        "verifyTime",
        "score",
        "reviewTime",
        "firstUrl",
        "secondUrl",
        "thirdUrl",
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
        "uuid",
        "copyrightType",
        "copyrightName",
        "copyrightCode",
        "copyrightArrange",
        "completeTime",
        "publishTime",
        "copyrightOwner",
        "rank",
        "isVerify",
        "verifyTime",
        "score",
        "reviewTime",
        "firstUrl",
        "secondUrl",
        "thirdUrl",
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
        "uuid",
        "awardType",
        "awardName",
        "awardTime",
        "awardGrade",
        "awardDepartment",
        "awardRank",
        "isVerify",
        "verifyTime",
        "awardNameList",
        "score",
        "reviewTime",
        "firstUrl",
        "secondUrl",
        "thirdUrl",
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
        "uuid",
        "thesisTitle",
        "thesisJournal",
        "thesisTime",
        "thesisGrade",
        "thesisCode",
        "thesisFirstAuthor",
        "thesisAuthorSequence",
        "isVerify",
        "verifyTime",
        "score",
        "reviewTime",
        "firstUrl",
        "secondUrl",
        "thirdUrl",
      ],
      where: { userUuid },
      raw: true,
    }),

  /**
   * 查询员工填写专著信息
   */
  queryReviewBookList: ({ userUuid }) =>
    staffBook.findAll({
      attributes: [
        "uuid",
        "name",
        "copyrightOwner",
        "time",
        "publisher",
        "rank",
        "chiefEditor",
        "isVerify",
        "verifyTime",
        "score",
        "reviewTime",
        "firstUrl",
        "secondUrl",
        "thirdUrl",
      ],
      where: { userUuid },
      raw: true,
    }),

  /**
   * 统计管理员查询项目打分
   */
  selectProjectScoreByUuid: ({ uuid }) =>
    staffProject.findOne({
      attributes: ["score", "reviewRemarks"],
      where: { uuid },
      raw: true,
    }),

  /**
   * 统计管理员查询专利打分
   */
  selectPatentScoreByUuid: ({ uuid }) =>
    staffPatent.findOne({
      attributes: ["score", "reviewRemarks"],
      where: { uuid },
      raw: true,
    }),

  /**
   * 统计管理员查询软件著作权打分
   */
  selectCopyrightScoreByUuid: ({ uuid }) =>
    staffCopyright.findOne({
      attributes: ["score", "reviewRemarks"],
      where: { uuid },
      raw: true,
    }),

  /**
   * 统计管理员查询奖项打分
   */
  selectAwardScoreByUuid: ({ uuid }) =>
    staffAward.findOne({
      attributes: ["score", "reviewRemarks"],
      where: { uuid },
      raw: true,
    }),

  /**
   * 统计管理员查询论文/专著打分
   */
  selectThesisScoreByUuid: ({ uuid }) =>
    staffThesis.findOne({
      attributes: ["score", "reviewRemarks"],
      where: { uuid },
      raw: true,
    }),

  /**
   * 统计管理员查询论文/专著打分
   */
  selectBookScoreByUuid: ({ uuid }) =>
    staffBook.findOne({
      attributes: ["score", "reviewRemarks"],
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
   * 统计员专著信息评分
   */
  updateBookScore: ({
    uuid,
    score,
    reviewUserUuid,
    reviewRemarks,
    reviewTime,
  }) =>
    staffBook.update(
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
        bookScore,
      ] = await Promise.all([
        staffProject.findAll({
          attributes: ["score"],
          where: { userUuid },
          raw: true,
        }),
        staffPatent.findAll({
          attributes: ["score"],
          where: { userUuid },
          raw: true,
        }),
        staffCopyright.findAll({
          attributes: ["score"],
          where: { userUuid },
          raw: true,
        }),
        staffAward.findAll({
          attributes: ["score"],
          where: { userUuid },
          raw: true,
        }),
        staffThesis.findAll({
          attributes: ["score"],
          where: { userUuid },
          raw: true,
        }),
        staffBook.findAll({
          attributes: ["score"],
          where: { userUuid },
          raw: true,
        }),
      ]);

      const projectScoreList = projectScore?.map((item) => item.score);
      const patentScoreList = patentScore?.map((item) => item.score);
      const copyrightScoreList = copyrightScore?.map((item) => item.score);
      const awardScoreList = awardScore?.map((item) => item.score);
      const thesisScoreList = thesisScore?.map((item) => item.score);
      const bookScoreList = bookScore?.map((item) => item.score);

      let projectScoreFinished = true,
        patentScoreFinished = true,
        copyrightScoreFinished = true,
        awardScoreFinished = true,
        thesisScoreFinished = true,
        bookScoreFinished = true,
        projectScoreSum = 0,
        patentScoreSum = 0,
        copyrightScoreSum = 0,
        awardScoreSum = 0,
        thesisScoreSum = 0,
        bookScoreSum = 0;

      for (let projectScoreItem of projectScoreList) {
        if (projectScoreItem === null) {
          projectScoreFinished = false;
          break;
        }
        projectScoreSum += projectScoreItem;
      }

      for (let patentScoreItem of patentScoreList) {
        if (patentScoreItem === null) {
          patentScoreFinished = false;
          break;
        }
        patentScoreSum += patentScoreItem;
      }

      for (let copyrightScoreItem of copyrightScoreList) {
        if (copyrightScoreItem === null) {
          copyrightScoreFinished = false;
          break;
        }
        copyrightScoreSum += copyrightScoreItem;
      }

      for (let awardScoreItem of awardScoreList) {
        if (awardScoreItem === null) {
          awardScoreFinished = false;
          break;
        }
        awardScoreSum += awardScoreItem;
      }

      for (let thesisScoreItem of thesisScoreList) {
        if (thesisScoreItem === null) {
          thesisScoreFinished = false;
          break;
        }
        thesisScoreSum += thesisScoreItem;
      }

      for (let bookScoreItem of bookScoreList) {
        if (bookScoreItem === null) {
          bookScoreFinished = false;
          break;
        }
        bookScoreSum += bookScoreItem;
      }

      if (
        !(
          projectScoreFinished &&
          patentScoreFinished &&
          copyrightScoreFinished &&
          awardScoreFinished &&
          thesisScoreFinished &&
          bookScoreFinished
        )
      ) {
        throw error;
      }

      let totalSum =
        projectScoreSum +
        patentScoreSum +
        copyrightScoreSum +
        awardScoreSum +
        thesisScoreSum +
        bookScoreSum;

      return await user.update(
        {
          projectScoreSum: projectScoreSum.toFixed(2),
          patentScoreSum: patentScoreSum.toFixed(2),
          copyrightScoreSum: copyrightScoreSum.toFixed(2),
          awardScoreSum: awardScoreSum.toFixed(2),
          thesisScoreSum: thesisScoreSum.toFixed(2),
          bookScoreSum: bookScoreSum.toFixed(2),
          totalScore: totalSum.toFixed(2),
          reviewTime: new Date(),
        },
        { where: { uuid: userUuid }, raw: true }
      );
    } catch (error) {
      throw error;
    }
  },

  /**
   * 查询所有人填写信息
   */
  exportAllStaffScoreExcel: async () => {
    const _data = await user.findAll({
      attributes: [
        "userName",
        "name",
        "projectScoreSum",
        "patentScoreSum",
        "copyrightScoreSum",
        "awardScoreSum",
        "thesisScoreSum",
        "bookScoreSum",
        "totalScore",
      ],
      where: {
        role: 15,
        isCancel: "未注销",
        totalScore: { [Op.ne]: null },
      },
      raw: true,
    });

    let data = []; // 其实最后就是把这个数组写入excel
    let title = [
      "账号",
      "姓名",
      "项目得分",
      "专利得分",
      "软件著作权得分",
      "奖项得分",
      "论文得分",
      "专著得分",
      "总得分",
    ]; //这是第一行 俗称列名
    data.push(title); // 添加完列名 下面就是添加真正的内容了
    _data.forEach((element) => {
      let arrInner = [];
      arrInner.push(element.userName);
      arrInner.push(element.name);
      arrInner.push(element.projectScoreSum);
      arrInner.push(element.patentScoreSum);
      arrInner.push(element.copyrightScoreSum);
      arrInner.push(element.awardScoreSum);
      arrInner.push(element.thesisScoreSum);
      arrInner.push(element.bookScoreSum);
      arrInner.push(element.totalScore);
      data.push(arrInner); //data中添加的要是数组，可以将对象的值分解添加进数组，例如：['1','name','上海']
    });

    let buffer = xlsx.build([
      {
        name: "sheet1",
        data: data,
      },
    ]);

    // 上传到oss
    const fileUuid = uuid.v1(),
      fileUrl = `temp/allScore/${fileUuid}.xlsx`;

    // 上传文件
    await client.put(fileUrl, buffer);

    return await client.signatureUrl(fileUrl);
  },
};
