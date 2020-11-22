import staffBasic from "../../../db/models/staff-basic";
import staffProject from "../../../db/models/staff-project";
import staffPatent from "../../../db/models/staff-patent";
import staffCopyright from "../../../db/models/staff-copyright";
import staffAward from "../../../db/models/staff-award";
import staffThesis from "../../../db/models/staff-thesis";
import staffBook from "../../../db/models/staff-book";
import user from "../../../db/models/t-user";
import staffStatus from "../../../db/models/staff-status";

import { db } from "../../../db/db-connect";

// uuid
import uuid from "uuid";

// 工具
import xlsx from "node-xlsx";
import moment from "moment";

// oss
import client from "../../../util/oss";

// 加密
import md5 from "md5";

import { MANAGER_PAGE_SIZE } from "../../../config/system-config";

// 工具类
import CustomError from "../../../util/custom-error";
import webToken from "../../../util/token";

import Sequelize from "sequelize";
const Op = Sequelize.Op;

export default {
  /**
   * 统计管理员查询基本信息
   */
  selectBusinessManagerBasic: ({ userUuid }) =>
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
        "isVerify",
        "verifyRemarks",
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
        "uuid",
        "name",
        "userName",
        "verifyStatus",
        "currentWriteTime",
        "department",
      ],
      where: { role: 15, isCancel: "未注销" },
      raw: true,
    }),

  /**
   * 查询账户信息通过姓名
   */
  queryStaffVerifyInfoByName: (name) =>
    user.findAll({
      attributes: [
        "uuid",
        "name",
        "userName",
        "verifyStatus",
        "currentWriteTime",
        "department",
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
        isCancel: "未注销",
      },
      raw: true,
    }),

  /**
   * 查询账户信息通过核实状态
   */
  queryStaffVerifyInfoByVerifyStatus: (verifyStatus) =>
    user.findAll({
      attributes: [
        "uuid",
        "name",
        "userName",
        "verifyStatus",
        "currentWriteTime",
        "department",
      ],
      where: { verifyStatus, role: 15, isCancel: "未注销" },
      raw: true,
    }),

  /**
   * 查询员工填写项目信息
   */
  queryVerifyProjectList: ({ userUuid }) =>
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
        "isChecked",
        "checkConclusion",
        "isVerify",
        "currentWriteTime",
        "verifyRemarks",
        "verifyTime",
        "reviewRemarks",
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
  queryVerifyPatentList: ({ userUuid }) =>
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
        "currentWriteTime",
        "verifyRemarks",
        "verifyTime",
        "reviewRemarks",
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
  queryVerifyCopyrightList: ({ userUuid }) =>
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
        "currentWriteTime",
        "verifyRemarks",
        "verifyTime",
        "reviewRemarks",
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
  queryVerifyAwardList: ({ userUuid }) =>
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
        "currentWriteTime",
        "awardNameList",
        "verifyRemarks",
        "verifyTime",
        "reviewRemarks",
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
  queryVerifyThesisList: ({ userUuid }) =>
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
        "currentWriteTime",
        "verifyRemarks",
        "verifyTime",
        "reviewRemarks",
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
  queryVerifyBookList: ({ userUuid }) =>
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
        "currentWriteTime",
        "verifyRemarks",
        "verifyTime",
        "reviewRemarks",
        "firstUrl",
        "secondUrl",
        "thirdUrl",
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
    if (isVerify === "核实不通过") {
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
    if (isVerify === "核实不通过") {
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
        attributes: ["isVerify"],
        where: { userUuid: staffUuid },
        raw: true,
      });

      let projectVerifyList = staffProjectVerify.map((value) => value.isVerify);
      if (projectVerifyList.indexOf("核实不通过") !== -1) {
        return await staffStatus.update(
          { projectVerifyStatus: "核实不通过" },
          { where: { uuid: staffUuid }, raw: true }
        );
      } else if (projectVerifyList.indexOf("未核实") !== -1) {
        return await staffStatus.update(
          { projectVerifyStatus: "未核实" },
          { where: { uuid: staffUuid }, raw: true }
        );
      } else {
        return await staffStatus.update(
          { projectVerifyStatus: "核实通过" },
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
    if (isVerify === "核实不通过") {
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
        attributes: ["isVerify"],
        where: { userUuid: staffUuid },
        raw: true,
      });

      let patentVerifyList = staffPatentVerify.map((value) => value.isVerify);
      if (patentVerifyList.indexOf("核实不通过") !== -1) {
        return await staffStatus.update(
          { patentVerifyStatus: "核实不通过" },
          { where: { uuid: staffUuid }, raw: true }
        );
      } else if (patentVerifyList.indexOf("未核实") !== -1) {
        return await staffStatus.update(
          { patentVerifyStatus: "未核实" },
          { where: { uuid: staffUuid }, raw: true }
        );
      } else {
        return await staffStatus.update(
          { patentVerifyStatus: "核实通过" },
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
    if (isVerify === "核实不通过") {
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
        attributes: ["isVerify"],
        where: { userUuid: staffUuid },
        raw: true,
      });

      let copyrightVerifyList = staffCopyrightVerify.map(
        (value) => value.isVerify
      );
      if (copyrightVerifyList.indexOf("核实不通过") !== -1) {
        return await staffStatus.update(
          { copyrightVerifyStatus: "核实不通过" },
          { where: { uuid: staffUuid }, raw: true }
        );
      } else if (copyrightVerifyList.indexOf("未核实") !== -1) {
        return await staffStatus.update(
          { copyrightVerifyStatus: "未核实" },
          { where: { uuid: staffUuid }, raw: true }
        );
      } else {
        return await staffStatus.update(
          { copyrightVerifyStatus: "核实通过" },
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
    if (isVerify === "核实不通过") {
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
        attributes: ["isVerify"],
        where: { userUuid: staffUuid },
        raw: true,
      });

      let awardVerifyList = staffAwardVerify.map((value) => value.isVerify);
      if (awardVerifyList.indexOf("核实不通过") !== -1) {
        return await staffStatus.update(
          { awardVerifyStatus: "核实不通过" },
          { where: { uuid: staffUuid }, raw: true }
        );
      } else if (awardVerifyList.indexOf("未核实") !== -1) {
        return await staffStatus.update(
          { awardVerifyStatus: "未核实" },
          { where: { uuid: staffUuid }, raw: true }
        );
      } else {
        return await staffStatus.update(
          { awardVerifyStatus: "核实通过" },
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
    if (isVerify === "核实不通过") {
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
        attributes: ["isVerify"],
        where: { userUuid: staffUuid },
        raw: true,
      });

      let thesisVerifyList = staffThesisVerify.map((value) => value.isVerify);
      if (thesisVerifyList.indexOf("核实不通过") !== -1) {
        return await staffStatus.update(
          { thesisVerifyStatus: "核实不通过" },
          { where: { uuid: staffUuid }, raw: true }
        );
      } else if (thesisVerifyList.indexOf("未核实") !== -1) {
        return await staffStatus.update(
          { thesisVerifyStatus: "未核实" },
          { where: { uuid: staffUuid }, raw: true }
        );
      } else {
        return await staffStatus.update(
          { thesisVerifyStatus: "核实通过" },
          { where: { uuid: staffUuid }, raw: true }
        );
      }
    }
  },

  /**
   * 统计员设置员工论专著信息通过状态
   */
  updateVerifyBookStatus: async ({
    uuid,
    verifyRemarks,
    isVerify,
    verifyUserUuid,
    verifyTime,
    staffUuid,
  }) => {
    if (isVerify === "核实不通过") {
      return await Promise.all([
        staffBook.update(
          {
            verifyRemarks,
            isVerify,
            verifyUserUuid,
            verifyTime,
          },
          { where: { uuid }, raw: true }
        ),
        staffStatus.update(
          { bookVerifyStatus: isVerify, verifyStatus: isVerify },
          { where: { uuid: staffUuid }, raw: true }
        ),
        user.update(
          { verifyStatus: isVerify },
          { where: { uuid: staffUuid }, raw: true }
        ),
      ]);
    } else {
      await staffBook.update(
        {
          verifyRemarks,
          isVerify,
          verifyUserUuid,
          verifyTime,
        },
        { where: { uuid }, raw: true }
      );
      const staffBookVerify = await staffBook.findAll({
        attributes: ["isVerify"],
        where: { userUuid: staffUuid },
        raw: true,
      });

      let bookVerifyList = staffBookVerify.map((value) => value.isVerify);
      if (bookVerifyList.indexOf("核实不通过") !== -1) {
        return await staffStatus.update(
          { bookVerifyStatus: "核实不通过" },
          { where: { uuid: staffUuid }, raw: true }
        );
      } else if (bookVerifyList.indexOf("未核实") !== -1) {
        return await staffStatus.update(
          { bookVerifyStatus: "未核实" },
          { where: { uuid: staffUuid }, raw: true }
        );
      } else {
        return await staffStatus.update(
          { bookVerifyStatus: "核实通过" },
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
      const staffVerifyStatus = await staffStatus.findOne({
        attributes: [
          "basicVerifyStatus",
          "projectVerifyStatus",
          "patentVerifyStatus",
          "copyrightVerifyStatus",
          "awardVerifyStatus",
          "thesisVerifyStatus",
          "bookVerifyStatus",
        ],
        where: { uuid: userUuid },
        raw: true,
      });

      if (
        staffVerifyStatus.basicVerifyStatus === "未核实" ||
        staffVerifyStatus.basicVerifyStatus === "核实不通过" ||
        staffVerifyStatus.projectVerifyStatus === "未核实" ||
        staffVerifyStatus.projectVerifyStatus === "核实不通过" ||
        staffVerifyStatus.patentVerifyStatus === "未核实" ||
        staffVerifyStatus.patentVerifyStatus === "核实不通过" ||
        staffVerifyStatus.copyrightVerifyStatus === "未核实" ||
        staffVerifyStatus.copyrightVerifyStatus === "核实不通过" ||
        staffVerifyStatus.awardVerifyStatus === "未核实" ||
        staffVerifyStatus.awardVerifyStatus === "核实不通过" ||
        staffVerifyStatus.thesisVerifyStatus === "未核实" ||
        staffVerifyStatus.thesisVerifyStatus === "核实不通过" ||
        staffVerifyStatus.bookVerifyStatus === "未核实" ||
        staffVerifyStatus.bookVerifyStatus === "核实不通过"
      ) {
        throw error;
      }
      return await Promise.all([
        user.update(
          {
            verifyStatus: "核实通过",
            verifyTime: new Date(),
          },
          { where: { uuid: userUuid }, raw: true }
        ),
        staffStatus.update(
          {
            verifyStatus: "核实通过",
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
          "userName",
          "name",
          "basicWriteStatus",
          "projectWriteStatus",
          "patentWriteStatus",
          "copyrightWriteStatus",
          "awardWriteStatus",
          "thesisWriteStatus",
          "verifyStatus",
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
          isCancel: "未注销",
        },
        raw: true,
      });
    } else if (verifyStatus) {
      _data = await staffStatus.findAll({
        attributes: [
          "userName",
          "name",
          "basicWriteStatus",
          "projectWriteStatus",
          "patentWriteStatus",
          "copyrightWriteStatus",
          "awardWriteStatus",
          "thesisWriteStatus",
          "verifyStatus",
        ],
        where: { verifyStatus, isCancel: "未注销" },
        raw: true,
      });
    } else {
      _data = await staffStatus.findAll({
        attributes: [
          "userName",
          "name",
          "basicWriteStatus",
          "projectWriteStatus",
          "patentWriteStatus",
          "copyrightWriteStatus",
          "awardWriteStatus",
          "thesisWriteStatus",
          "verifyStatus",
        ],
        where: {
          isCancel: "未注销",
        },
        raw: true,
      });
    }

    let data = []; // 其实最后就是把这个数组写入excel
    let title = [
      "账号",
      "姓名",
      "基本信息",
      "项目",
      "专利",
      "软件著作权",
      "奖项",
      "论文/专著",
      "是否提交",
    ]; // 这是第一行 俗称列名
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
      arrInner.push(element.verifyStatus !== "未提交" ? "已提交" : "未提交");
      data.push(arrInner); // data中添加的要是数组，可以将对象的值分解添加进数组
    });

    let buffer = xlsx.build([
      {
        name: "sheet1",
        data: data,
      },
    ]);

    // 上传到oss
    const fileUuid = uuid.v1(),
      fileUrl = `temp/allWriteStatus/${fileUuid}.xlsx`;

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
          "userName",
          "name",
          "basicVerifyStatus",
          "projectVerifyStatus",
          "patentVerifyStatus",
          "copyrightVerifyStatus",
          "awardVerifyStatus",
          "thesisVerifyStatus",
          "verifyStatus",
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
          isCancel: "未注销",
        },
        raw: true,
      });
    } else if (verifyStatus) {
      _data = await staffStatus.findAll({
        attributes: [
          "userName",
          "name",
          "basicVerifyStatus",
          "projectVerifyStatus",
          "patentVerifyStatus",
          "copyrightVerifyStatus",
          "awardVerifyStatus",
          "thesisVerifyStatus",
          "verifyStatus",
        ],
        where: { verifyStatus, isCancel: "未注销" },
        raw: true,
      });
    } else {
      _data = await staffStatus.findAll({
        attributes: [
          "userName",
          "name",
          "basicVerifyStatus",
          "projectVerifyStatus",
          "patentVerifyStatus",
          "copyrightVerifyStatus",
          "awardVerifyStatus",
          "thesisVerifyStatus",
          "verifyStatus",
        ],
        where: {
          isCancel: "未注销",
        },
        raw: true,
      });
    }

    let data = []; // 其实最后就是把这个数组写入excel
    let title = [
      "账号",
      "姓名",
      "基本信息",
      "项目",
      "专利",
      "软件著作权",
      "奖项",
      "论文/专著",
      "核实状态",
    ]; // 这是第一行 俗称列名
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
      data.push(arrInner); // data中添加的要是数组，可以将对象的值分解添加进数组
    });

    let buffer = xlsx.build([
      {
        name: "sheet1",
        data: data,
      },
    ]);

    // 上传到oss
    const fileUuid = uuid.v1(),
      fileUrl = `temp/allVerifyStatus/${fileUuid}.xlsx`;

    // 上传文件
    await client.put(fileUrl, buffer);

    return await client.signatureUrl(fileUrl);
  },

  /**
   * 导出个人信息
   */
  getStaffExportInfoUrl: async ({ userUuid, exportList }) => {
    const [
      projectList,
      patentList,
      copyrightList,
      awardList,
      thesisList,
    ] = await Promise.all([
      staffProject.findAll({
        where: { userUuid },
      }),
      staffPatent.findAll({
        where: { userUuid },
      }),
      staffCopyright.findAll({
        where: { userUuid },
      }),
      staffAward.findAll({
        where: { userUuid },
      }),
      staffThesis.findAll({
        where: { userUuid },
      }),
    ]);

    let numList = [
      1,
      projectList.length,
      patentList.length,
      copyrightList.length,
      awardList.length,
      thesisList.length,
    ];

    let maxNum = Math.max(...numList);

    const _data = await user.findAll({
      attributes: ["userName", "name"],
      where: {
        uuid: userUuid,
      },
      include: [
        {
          model: staffBasic,
          attributes: [
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
          ],
          as: "staffBasic",
        },
        {
          model: staffProject,
          attributes: [
            "name",
            "type",
            "grade",
            "startTime",
            "endTime",
            "code",
            "resource",
            "funds",
            "controller",
            "participant",
            "content",
            "isChecked",
            "checkConclusion",
          ],
          as: "staffProject",
        },
        {
          model: staffPatent,
          attributes: [
            "patentType",
            "patentName",
            "patentCode",
            "rank",
            "patentee",
            "patentTime",
            "inventor",
          ],
          as: "staffPatent",
        },
        {
          model: staffCopyright,
          attributes: [
            "copyrightType",
            "copyrightName",
            "copyrightCode",
            "copyrightArrange",
            "completeTime",
            "publishTime",
            "copyrightOwner",
            "rank",
          ],
          as: "staffCopyright",
        },
        {
          model: staffAward,
          attributes: [
            "awardType",
            "awardName",
            "awardTime",
            "awardGrade",
            "awardDepartment",
            "awardNameList",
            "awardRank",
          ],
          as: "staffAward",
        },
        {
          model: staffThesis,
          attributes: [
            "thesisTitle",
            "thesisJournal",
            "thesisTime",
            "thesisGrade",
            "thesisCode",
            "thesisFirstAuthor",
            "thesisAuthorSequence",
          ],
          as: "staffThesis",
        },
      ],
    });

    let data = []; // 其实最后就是把这个数组写入excel
    let basicTitle =
      exportList.indexOf(0) !== -1
        ? [
            "身份证号",
            "性别",
            "民族",
            "籍贯",
            "政治面貌",
            "科室",
            "办公电话",
            "手机号码",
            "学历",
            "学位",
            "毕业学校",
            "所学专业",
            "职务",
            "参加工作时间",
            "职称",
            "获得时间",
            "研究方向",
            "学习经历",
            "工作经历",
          ]
        : [];

    let projectTitle =
      exportList.indexOf(1) !== -1
        ? [
            "参与类型",
            "项目名称",
            "项目开始时间",
            "项目结束时间",
            "项目编号",
            "项目来源",
            "项目经费(万元)",
            "负责人",
            "参与者名单",
            "主要研究内容",
            "是否验收",
            "验收结论",
          ]
        : [];

    let patentTitle =
      exportList.indexOf(2) !== -1
        ? [
            "专利类型",
            "专利名称",
            "授权号",
            "专利排名",
            "专利权人",
            "专利公告日",
            "发明人（设计人）",
          ]
        : [];

    let copyrightTitle =
      exportList.indexOf(3) !== -1
        ? [
            "权利取得方式",
            "软件著作权名称",
            "登记号",
            "授权范围",
            "开发完成时间",
            "发表时间",
            "软件著作权权人",
            "软著排位",
          ]
        : [];

    let awardTitle =
      exportList.indexOf(4) !== -1
        ? [
            "奖项类型",
            "奖项名称",
            "获奖时间",
            "奖项级别",
            "颁奖部门",
            "获奖名单",
            "获奖排位",
          ]
        : [];

    let thesisTitle =
      exportList.indexOf(5) !== -1
        ? [
            "标题",
            "发表期刊名称",
            "发表时间",
            "期刊级别",
            "论文索引号",
            "第一作者",
            "提交人作者次序",
          ]
        : [];

    let firstBasicTitle =
      exportList.indexOf(0) !== -1
        ? [
            "基本信息",
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
          ]
        : [];

    let firstProjectTitle =
      exportList.indexOf(1) !== -1
        ? [
            "项目",
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
          ]
        : [];

    let firstPatentTitle =
      exportList.indexOf(2) !== -1
        ? ["专利", null, null, null, null, null, null]
        : [];

    let firstCopyrightTitle =
      exportList.indexOf(3) !== -1
        ? ["软件著作权", null, null, null, null, null, null, null]
        : [];

    let firstAwardTitle =
      exportList.indexOf(4) !== -1
        ? ["奖项", null, null, null, null, null, null]
        : [];

    let firstThesisTitle =
      exportList.indexOf(5) !== -1
        ? ["论文/专著", null, null, null, null, null, null]
        : [];

    let firstTitle = [
      "用户信息",
      null,
      ...firstBasicTitle,
      ...firstProjectTitle,
      ...firstPatentTitle,
      ...firstCopyrightTitle,
      ...firstAwardTitle,
      ...firstThesisTitle,
    ]; //这是第一行 俗称列名
    data.push(firstTitle);

    let secondTitle = [
      "用户名",
      "姓名",
      ...basicTitle,
      ...projectTitle,
      ...patentTitle,
      ...copyrightTitle,
      ...awardTitle,
      ...thesisTitle,
    ]; //这是第一行 俗称列名
    data.push(secondTitle); // 添加完列名 下面就是添加真正的内容了

    let titleRange = [
      {
        s: { c: 0, r: 0 },
        e: { c: 1, r: 0 },
      },
    ];

    const columnNum = [19, 13, 7, 8, 9, 9];
    for (let indexNum = 0, columnsum = 2; indexNum < 6; indexNum++) {
      if (exportList.indexOf(indexNum) !== -1) {
        titleRange.push({
          s: { c: columnsum, r: 0 },
          e: { c: columnsum + columnNum[indexNum] - 1, r: 0 },
        });
        columnsum += columnNum[indexNum];
      }
    }

    if (exportList.indexOf(0) !== -1) {
      titleRange.push({
        s: { c: 2, r: 0 },
        e: { c: 20, r: 0 },
      });
    }

    let range = [];
    for (let item = 0; item < maxNum; item++) {
      let arrInner = [];
      arrInner.push(_data[0].dataValues.userName);
      arrInner.push(_data[0].dataValues.name);
      if (exportList.indexOf(0) !== -1) {
        if (item === 0) {
          arrInner.push(_data[0].dataValues.staffBasic?.dataValues.idNumber);
          arrInner.push(_data[0].dataValues.staffBasic?.dataValues.sex);
          arrInner.push(_data[0].dataValues.staffBasic?.dataValues.nation);
          arrInner.push(_data[0].dataValues.staffBasic?.dataValues.nativePlace);
          arrInner.push(
            _data[0].dataValues.staffBasic?.dataValues.politicalAffiliation
          );
          arrInner.push(_data[0].dataValues.staffBasic?.dataValues.department);
          arrInner.push(_data[0].dataValues.staffBasic?.dataValues.officePhone);
          arrInner.push(_data[0].dataValues.staffBasic?.dataValues.phone);
          arrInner.push(_data[0].dataValues.staffBasic?.dataValues.education);
          arrInner.push(_data[0].dataValues.staffBasic?.dataValues.degree);
          arrInner.push(
            _data[0].dataValues.staffBasic?.dataValues.graduateSchool
          );
          arrInner.push(_data[0].dataValues.staffBasic?.dataValues.major);
          arrInner.push(_data[0].dataValues.staffBasic?.dataValues.duty);
          arrInner.push(
            _data[0].dataValues.staffBasic
              ? moment(
                  _data[0].dataValues.staffBasic?.dataValues.workTime
                ).format("YYYY-MM-DD")
              : null
          );
          arrInner.push(
            _data[0].dataValues.staffBasic?.dataValues.professionTitle
          );
          arrInner.push(
            _data[0].dataValues.staffBasic
              ? moment(
                  _data[0].dataValues.staffBasic?.dataValues.getTime
                ).format("YYYY-MM-DD")
              : null
          );
          arrInner.push(
            _data[0].dataValues.staffBasic?.dataValues.researchDirection
          );
          arrInner.push(
            _data[0].dataValues.staffBasic?.dataValues.studyExperience
          );
          arrInner.push(
            _data[0].dataValues.staffBasic?.dataValues.workExperience
          );
        } else {
          arrInner.push(null);
          arrInner.push(null);
          arrInner.push(null);
          arrInner.push(null);
          arrInner.push(null);
          arrInner.push(null);
          arrInner.push(null);
          arrInner.push(null);
          arrInner.push(null);
          arrInner.push(null);
          arrInner.push(null);
          arrInner.push(null);
          arrInner.push(null);
          arrInner.push(null);
          arrInner.push(null);
          arrInner.push(null);
          arrInner.push(null);
          arrInner.push(null);
          arrInner.push(null);
        }
      }
      if (exportList.indexOf(1) !== -1) {
        arrInner.push(
          _data[0].dataValues.staffProject[item]?.type === 1
            ? "主持项目"
            : _data[0].dataValues.staffProject[item]?.type === 2
            ? "参与项目"
            : null
        );
        arrInner.push(_data[0].dataValues.staffProject[item]?.name);
        arrInner.push(
          _data[0].dataValues.staffProject[item]
            ? moment(_data[0].dataValues.staffProject[item]?.startTime).format(
                "YYYY-MM-DD"
              )
            : null
        );
        arrInner.push(
          _data[0].dataValues.staffProject[item]
            ? moment(_data[0].dataValues.staffProject[item]?.endTime).format(
                "YYYY-MM-DD"
              )
            : null
        );
        arrInner.push(_data[0].dataValues.staffProject[item]?.code);
        arrInner.push(_data[0].dataValues.staffProject[item]?.resource);
        arrInner.push(_data[0].dataValues.staffProject[item]?.funds);
        arrInner.push(_data[0].dataValues.staffProject[item]?.controller);
        arrInner.push(_data[0].dataValues.staffProject[item]?.participant);
        arrInner.push(_data[0].dataValues.staffProject[item]?.content);
      }
      if (exportList.indexOf(2) !== -1) {
        arrInner.push(_data[0].dataValues.staffPatent[item]?.patentType);
        arrInner.push(_data[0].dataValues.staffPatent[item]?.patentName);
        arrInner.push(_data[0].dataValues.staffPatent[item]?.patentCode);
        arrInner.push(_data[0].dataValues.staffPatent[item]?.patentNation);
      }
      if (exportList.indexOf(3) !== -1) {
        arrInner.push(_data[0].dataValues.staffCopyright[item]?.copyrightType);
        arrInner.push(_data[0].dataValues.staffCopyright[item]?.copyrightName);
        arrInner.push(_data[0].dataValues.staffCopyright[item]?.copyrightCode);
        arrInner.push(
          _data[0].dataValues?.staffCopyright[item]?.copyrightArrange
        );
      }
      if (exportList.indexOf(4) !== -1) {
        arrInner.push(_data[0].dataValues.staffAward[item]?.awardType);
        arrInner.push(_data[0].dataValues.staffAward[item]?.awardName);
        arrInner.push(
          _data[0].dataValues.staffAward[item]
            ? moment(_data[0].dataValues.staffAward[item]?.awardTime).format(
                "YYYY-MM-DD"
              )
            : null
        );
        arrInner.push(_data[0].dataValues.staffAward[item]?.awardGrade);
        arrInner.push(_data[0].dataValues.staffAward[item]?.awardDepartment);
        arrInner.push(_data[0].dataValues.staffAward[item]?.awardNameList);
      }
      if (exportList.indexOf(5) !== -1) {
        arrInner.push(_data[0].dataValues.staffThesis[item]?.thesisTitle);
        arrInner.push(_data[0].dataValues.staffThesis[item]?.thesisType);
        arrInner.push(_data[0].dataValues.staffThesis[item]?.thesisJournal);
        arrInner.push(
          _data[0].dataValues.staffThesis[item]
            ? moment(_data[0].dataValues.staffThesis[item]?.thesisTime).format(
                "YYYY-MM-DD"
              )
            : null
        );
        arrInner.push(_data[0].dataValues.staffThesis[item]?.thesisGrade);
        arrInner.push(_data[0].dataValues.staffThesis[item]?.thesisCode);
        arrInner.push(_data[0].dataValues.staffThesis[item]?.thesisFirstAuthor);
        arrInner.push(
          _data[0].dataValues.staffThesis[item]?.thesisAuthorSequence
        );
      }
      data.push(arrInner);

      // 合并账户信息和基本信息
      if (exportList.indexOf(0) !== -1) {
        for (let column = 0; column < 21; column++) {
          range[column] = {
            s: { c: column, r: 2 },
            e: { c: column, r: maxNum + 1 },
          };
        }
      } else {
        for (let newColumn = 0; newColumn < 2; newColumn++) {
          range[newColumn] = {
            s: { c: newColumn, r: 2 },
            e: { c: newColumn, r: maxNum + 1 },
          };
        }
      }
    }

    const options = { "!merges": [...range, ...titleRange] };

    let buffer = xlsx.build(
      [
        {
          name: "sheet1",
          data: data,
        },
      ],
      options
    );

    // 上传到oss
    const fileUuid = uuid.v1(),
      fileUrl = `temp/oneInfo/${fileUuid}.xlsx`;

    // 上传文件
    await client.put(fileUrl, buffer);

    return await client.signatureUrl(fileUrl);
  },

  getStaffUuidByNameAndVerifyStatus: async ({ verifyStatus, name }) => {
    if (name) {
      return await staffStatus.findAll({
        attributes: ["uuid"],
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
          isCancel: "未注销",
        },
        raw: true,
      });
    } else if (verifyStatus) {
      return await staffStatus.findAll({
        attributes: ["uuid"],
        where: { verifyStatus, isCancel: "未注销" },
        raw: true,
      });
    } else {
      return await staffStatus.findAll({
        attributes: ["uuid"],
        where: {
          isCancel: "未注销",
        },
        raw: true,
      });
    }
  },

  /**
   * 导出查询出个人信息
   */
  getSearchExportInfoUrl: async ({ userList, exportList }) => {
    let data = []; // 其实最后就是把这个数组写入excel

    let firstBasicTitle =
      exportList.indexOf(0) !== -1
        ? [
            "基本信息",
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
          ]
        : [];

    let firstProjectTitle =
      exportList.indexOf(1) !== -1
        ? ["项目", null, null, null, null, null, null, null, null, null]
        : [];

    let firstPatentTitle =
      exportList.indexOf(2) !== -1 ? ["专利", null, null, null] : [];

    let firstCopyrightTitle =
      exportList.indexOf(3) !== -1 ? ["软件著作权", null, null, null] : [];

    let firstAwardTitle =
      exportList.indexOf(4) !== -1
        ? ["奖项", null, null, null, null, null]
        : [];

    let firstThesisTitle =
      exportList.indexOf(5) !== -1
        ? ["论文/专著", null, null, null, null, null, null, null]
        : [];

    let firstTitle = [
      "用户信息",
      null,
      ...firstBasicTitle,
      ...firstProjectTitle,
      ...firstPatentTitle,
      ...firstCopyrightTitle,
      ...firstAwardTitle,
      ...firstThesisTitle,
    ]; //这是第一行
    data.push(firstTitle);

    let titleRange = [
      {
        s: { c: 0, r: 0 },
        e: { c: 1, r: 0 },
      },
    ];

    const columnNum = [19, 10, 4, 4, 6, 8];
    for (let indexNum = 0, columnsum = 2; indexNum < 6; indexNum++) {
      if (exportList.indexOf(indexNum) !== -1) {
        titleRange.push({
          s: { c: columnsum, r: 0 },
          e: { c: columnsum + columnNum[indexNum] - 1, r: 0 },
        });
        columnsum += columnNum[indexNum];
      }
    }

    if (exportList.indexOf(0) !== -1) {
      titleRange.push({
        s: { c: 2, r: 0 },
        e: { c: 20, r: 0 },
      });
    }

    let basicTitle =
      exportList.indexOf(0) !== -1
        ? [
            "身份证号",
            "性别",
            "民族",
            "籍贯",
            "政治面貌",
            "科室",
            "办公电话",
            "手机号码",
            "学历",
            "学位",
            "毕业学校",
            "所学专业",
            "职务",
            "参加工作时间",
            "职称",
            "获得时间",
            "研究方向",
            "学习经历",
            "工作经历",
          ]
        : [];

    let projectTitle =
      exportList.indexOf(1) !== -1
        ? [
            "项目类型",
            "项目名称",
            "项目开始时间",
            "项目结束时间",
            "项目编号",
            "项目来源",
            "项目经费(万元)",
            "负责人",
            "参与者名单",
            "主要研究内容",
          ]
        : [];

    let patentTitle =
      exportList.indexOf(2) !== -1
        ? ["专利类型", "专利名称", "授权号", "授权国家"]
        : [];

    let copyrightTitle =
      exportList.indexOf(3) !== -1
        ? ["权利取得方式", "软件著作权名称", "登记号", "授权范围"]
        : [];

    let awardTitle =
      exportList.indexOf(4) !== -1
        ? [
            "奖项类型",
            "奖项名称",
            "获奖时间",
            "奖项级别",
            "颁奖部门",
            "获奖名单",
          ]
        : [];

    let thesisTitle =
      exportList.indexOf(5) !== -1
        ? [
            "标题",
            "类型",
            "发表期刊名称",
            "发表时间",
            "期刊级别",
            "论文索引号",
            "第一作者",
            "提交人作者次序",
          ]
        : [];

    let secondTitle = [
      "用户名",
      "姓名",
      ...basicTitle,
      ...projectTitle,
      ...patentTitle,
      ...copyrightTitle,
      ...awardTitle,
      ...thesisTitle,
    ]; //这是第二行
    data.push(secondTitle); // 添加完列名 下面就是添加真正的内容了

    const staffList = userList.map((item) => item.uuid);

    let range = [];

    for (let num = 0, rowNum = 2; num < staffList.length; num++) {
      const [
        projectList,
        patentList,
        copyrightList,
        awardList,
        thesisList,
      ] = await Promise.all([
        staffProject.findAll({
          where: { userUuid: staffList[num] },
        }),
        staffPatent.findAll({
          where: { userUuid: staffList[num] },
        }),
        staffCopyright.findAll({
          where: { userUuid: staffList[num] },
        }),
        staffAward.findAll({
          where: { userUuid: staffList[num] },
        }),
        staffThesis.findAll({
          where: { userUuid: staffList[num] },
        }),
      ]);

      let numList = [
        1,
        projectList.length,
        patentList.length,
        copyrightList.length,
        awardList.length,
        thesisList.length,
      ];

      let maxNum = Math.max(...numList);

      const _data = await user.findAll({
        attributes: ["userName", "name"],
        where: {
          uuid: staffList[num],
        },
        include: [
          {
            model: staffBasic,
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
            ],
            as: "staffBasic",
          },
          {
            model: staffProject,
            attributes: [
              "name",
              "type",
              "startTime",
              "endTime",
              "code",
              "resource",
              "funds",
              "controller",
              "participant",
              "content",
            ],
            as: "staffProject",
          },
          {
            model: staffPatent,
            attributes: [
              "patentType",
              "patentName",
              "patentCode",
              "patentNation",
            ],
            as: "staffPatent",
          },
          {
            model: staffCopyright,
            attributes: [
              "copyrightType",
              "copyrightName",
              "copyrightCode",
              "copyrightArrange",
            ],
            as: "staffCopyright",
          },
          {
            model: staffAward,
            attributes: [
              "awardType",
              "awardName",
              "awardTime",
              "awardGrade",
              "awardDepartment",
              "awardNameList",
            ],
            as: "staffAward",
          },
          {
            model: staffThesis,
            attributes: [
              "thesisTitle",
              "thesisType",
              "thesisJournal",
              "thesisTime",
              "thesisGrade",
              "thesisCode",
              "thesisFirstAuthor",
              "thesisAuthorSequence",
            ],
            as: "staffThesis",
          },
        ],
      });

      for (let item = 0; item < maxNum; item++) {
        let arrInner = [];
        arrInner.push(_data[0].dataValues.userName);
        arrInner.push(_data[0].dataValues.name);
        if (exportList.indexOf(0) !== -1) {
          if (item === 0) {
            arrInner.push(_data[0].dataValues.staffBasic?.dataValues.idNumber);
            arrInner.push(_data[0].dataValues.staffBasic?.dataValues.sex);
            arrInner.push(_data[0].dataValues.staffBasic?.dataValues.nation);
            arrInner.push(
              _data[0].dataValues.staffBasic?.dataValues.nativePlace
            );
            arrInner.push(
              _data[0].dataValues.staffBasic?.dataValues.politicalAffiliation
            );
            arrInner.push(
              _data[0].dataValues.staffBasic?.dataValues.department
            );
            arrInner.push(
              _data[0].dataValues.staffBasic?.dataValues.officePhone
            );
            arrInner.push(_data[0].dataValues.staffBasic?.dataValues.phone);
            arrInner.push(_data[0].dataValues.staffBasic?.dataValues.education);
            arrInner.push(_data[0].dataValues.staffBasic?.dataValues.degree);
            arrInner.push(
              _data[0].dataValues.staffBasic?.dataValues.graduateSchool
            );
            arrInner.push(_data[0].dataValues.staffBasic?.dataValues.major);
            arrInner.push(_data[0].dataValues.staffBasic?.dataValues.duty);
            arrInner.push(
              _data[0].dataValues.staffBasic
                ? moment(
                    _data[0].dataValues.staffBasic?.dataValues.workTime
                  ).format("YYYY-MM-DD")
                : null
            );
            arrInner.push(
              _data[0].dataValues.staffBasic?.dataValues?.professionTitle
            );
            arrInner.push(
              _data[0].dataValues.staffBasic
                ? moment(
                    _data[0].dataValues.staffBasic?.dataValues.getTime
                  ).format("YYYY-MM-DD")
                : null
            );
            arrInner.push(
              _data[0].dataValues.staffBasic?.dataValues?.researchDirection
            );
            arrInner.push(
              _data[0].dataValues.staffBasic?.dataValues?.studyExperience
            );
            arrInner.push(
              _data[0].dataValues.staffBasic?.dataValues?.workExperience
            );
          } else {
            arrInner.push(null);
            arrInner.push(null);
            arrInner.push(null);
            arrInner.push(null);
            arrInner.push(null);
            arrInner.push(null);
            arrInner.push(null);
            arrInner.push(null);
            arrInner.push(null);
            arrInner.push(null);
            arrInner.push(null);
            arrInner.push(null);
            arrInner.push(null);
            arrInner.push(null);
            arrInner.push(null);
            arrInner.push(null);
            arrInner.push(null);
            arrInner.push(null);
            arrInner.push(null);
          }
        }
        if (exportList.indexOf(1) !== -1) {
          arrInner.push(
            _data[0].dataValues.staffProject[item]?.type === 1
              ? "主持项目"
              : _data[0].dataValues.staffProject[item]?.type === 2
              ? "参与项目"
              : null
          );
          arrInner.push(_data[0].dataValues.staffProject[item]?.name);
          arrInner.push(
            _data[0].dataValues.staffProject[item]
              ? moment(
                  _data[0].dataValues.staffProject[item]?.startTime
                ).format("YYYY-MM-DD")
              : null
          );
          arrInner.push(
            _data[0].dataValues.staffProject[item]
              ? moment(_data[0].dataValues.staffProject[item]?.endTime).format(
                  "YYYY-MM-DD"
                )
              : null
          );
          arrInner.push(_data[0].dataValues.staffProject[item]?.code);
          arrInner.push(_data[0].dataValues.staffProject[item]?.resource);
          arrInner.push(_data[0].dataValues.staffProject[item]?.funds);
          arrInner.push(_data[0].dataValues.staffProject[item]?.controller);
          arrInner.push(_data[0].dataValues.staffProject[item]?.participant);
          arrInner.push(_data[0].dataValues.staffProject[item]?.content);
        }
        if (exportList.indexOf(2) !== -1) {
          arrInner.push(_data[0].dataValues.staffPatent[item]?.patentType);
          arrInner.push(_data[0].dataValues.staffPatent[item]?.patentName);
          arrInner.push(_data[0].dataValues.staffPatent[item]?.patentCode);
          arrInner.push(_data[0].dataValues.staffPatent[item]?.patentNation);
        }
        if (exportList.indexOf(3) !== -1) {
          arrInner.push(
            _data[0].dataValues.staffCopyright[item]?.copyrightType
          );
          arrInner.push(
            _data[0].dataValues.staffCopyright[item]?.copyrightName
          );
          arrInner.push(
            _data[0].dataValues.staffCopyright[item]?.copyrightCode
          );
          arrInner.push(
            _data[0].dataValues.staffCopyright[item]?.copyrightArrange
          );
        }
        if (exportList.indexOf(4) !== -1) {
          arrInner.push(_data[0].dataValues.staffAward[item]?.awardType);
          arrInner.push(_data[0].dataValues.staffAward[item]?.awardName);
          arrInner.push(
            _data[0].dataValues.staffAward[item]
              ? moment(_data[0].dataValues.staffAward[item]?.awardTime).format(
                  "YYYY-MM-DD"
                )
              : null
          );
          arrInner.push(_data[0].dataValues.staffAward[item]?.awardGrade);
          arrInner.push(_data[0].dataValues.staffAward[item]?.awardDepartment);
          arrInner.push(_data[0].dataValues.staffAward[item]?.awardNameList);
        }
        if (exportList.indexOf(5) !== -1) {
          arrInner.push(_data[0].dataValues.staffThesis[item]?.thesisTitle);
          arrInner.push(_data[0].dataValues.staffThesis[item]?.thesisType);
          arrInner.push(_data[0].dataValues.staffThesis[item]?.thesisJournal);
          arrInner.push(
            _data[0].dataValues.staffThesis[item]
              ? moment(
                  _data[0].dataValues.staffThesis[item]?.thesisTime
                ).format("YYYY-MM-DD")
              : null
          );
          arrInner.push(_data[0].dataValues.staffThesis[item]?.thesisGrade);
          arrInner.push(_data[0].dataValues.staffThesis[item]?.thesisCode);
          arrInner.push(
            _data[0].dataValues.staffThesis[item]?.thesisFirstAuthor
          );
          arrInner.push(
            _data[0].dataValues.staffThesis[item]?.thesisAuthorSequence
          );
        }
        data.push(arrInner);
      }

      // 合并账户信息和基本信息
      if (exportList.indexOf(0) !== -1) {
        for (let column = 0; column < 21; column++) {
          range.push({
            s: { c: column, r: rowNum },
            e: { c: column, r: maxNum + rowNum - 1 },
          });
        }
      } else {
        for (let newColumn = 0; newColumn < 2; newColumn++) {
          range.push({
            s: { c: newColumn, r: rowNum },
            e: { c: newColumn, r: maxNum + rowNum - 1 },
          });
        }
      }
      rowNum += maxNum;
    }

    const options = { "!merges": [...range, ...titleRange] };

    let buffer = xlsx.build(
      [
        {
          name: "sheet1",
          data: data,
        },
      ],
      options
    );

    // 上传到oss
    const fileUuid = uuid.v1(),
      fileUrl = `temp/allInfo/${fileUuid}.xlsx`;

    // 上传文件
    await client.put(fileUrl, buffer);

    return await client.signatureUrl(fileUrl);
  },
};
