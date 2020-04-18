import Router from 'koa-router';

// response
import Res from '../../../util/response';
import { RESPONSE_CODE } from '../../../constants/domain-constants';

// service
import service from '../../../service';

const router = new Router({
  prefix: '/staff',
});

/**
 * 普通员工查询科室
 */
router.get('/getStaffDepartment', async (ctx, next) => {
  try {
    const data = await service.quaryDepartment();

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 保存基本信息
 */
router.post('/saveStaffBasic', async (ctx, next) => {
  try {
    const {
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
    } = ctx.state.param;

    const userUuid = ctx.state.user.uuid;

    const data = await service.insertStaffBasic({
      userUuid,
      currentWriteTime: new Date(),
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
    });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
      msg: '基本信息暂存成功',
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 查询基本信息
 */
router.get('/getStaffBasic', async (ctx, next) => {
  try {
    const userUuid = ctx.state.user.uuid;

    const data = await service.selectStaffBasic({ userUuid });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 修改基本信息
 */
router.post('/modifyStaffBasic', async (ctx, next) => {
  try {
    const {
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
    } = ctx.state.param;

    const userUuid = ctx.state.user.uuid;

    const { currentWriteTime } = await service.selectLastWriteTimeByUuid(
      userUuid
    );

    const data = await service.updateStaffBasic({
      userUuid,
      lastWriteTime: currentWriteTime,
      currentWriteTime: new Date(),
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
    });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
      msg: '基本信息修改成功',
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 查询员工填写信息
 */
router.get('/getStaffWriteInfo', async (ctx, next) => {
  try {
    const userUuid = ctx.state.user.uuid;

    const data = await service.getStaffWriteInfo(userUuid);

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 新建一条项目信息
 */
router.post('/createStaffProject', async (ctx, next) => {
  try {
    const {
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
    } = ctx.state.param;

    const userUuid = ctx.state.user.uuid;

    const data = await service.insertStaffProject({
      userUuid,
      currentWriteTime: new Date(),
      isVerify: '未核实',
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
    });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
      msg: '项目信息新增成功',
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 查询员工填写项目
 */
router.get('/getWriteProjectList', async (ctx, next) => {
  try {
    const userUuid = ctx.state.user.uuid;

    const data = await service.queryWriteProjectList(userUuid);

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 查询员工填写项目通过uuid
 */
router.get('/getStaffProjectByUuid', async (ctx, next) => {
  try {
    const { staffProjectUuid } = ctx.state.param;

    const data = await service.selectStaffProjectByUuid({
      uuid: staffProjectUuid,
    });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 修改一条项目信息
 */
router.post('/modifyStaffProject', async (ctx, next) => {
  try {
    const {
      uuid,
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
    } = ctx.state.param;

    const { currentWriteTime } = await service.selectProjectLastWriteTimeByUuid(
      uuid
    );

    const data = await service.updateStaffProject({
      uuid,
      lastWriteTime: currentWriteTime,
      currentWriteTime: new Date(),
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
    });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
      msg: '项目信息修改成功',
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 删除项目
 */
router.del('/deleteProject', async (ctx, next) => {
  try {
    const { uuid } = ctx.state.param;

    await service.deleteProject(uuid);

    ctx.body = new Res({
      status: RESPONSE_CODE.noContent,
      msg: '删除项目成功',
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 新建一条专利信息
 */
router.post('/createStaffPatent', async (ctx, next) => {
  try {
    const {
      patentType,
      patentName,
      patentCode,
      patentNation,
    } = ctx.state.param;

    const userUuid = ctx.state.user.uuid;

    const data = await service.insertStaffPatent({
      userUuid,
      currentWriteTime: new Date(),
      isVerify: '未核实',
      patentType,
      patentName,
      patentCode,
      patentNation,
    });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
      msg: '专利信息新增成功',
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 查询员工填写专利信息
 */
router.get('/getWritePatentList', async (ctx, next) => {
  try {
    const userUuid = ctx.state.user.uuid;

    const data = await service.queryWritePatentList(userUuid);

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 查询员工填写专利信息通过uuid
 */
router.get('/getStaffPatentByUuid', async (ctx, next) => {
  try {
    const { staffPatentUuid } = ctx.state.param;

    const data = await service.selectStaffPatentByUuid({
      uuid: staffPatentUuid,
    });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 修改一条专利信息
 */
router.post('/modifyStaffPatent', async (ctx, next) => {
  try {
    const {
      uuid,
      patentType,
      patentName,
      patentCode,
      patentNation,
    } = ctx.state.param;

    const { currentWriteTime } = await service.selectPatentLastWriteTimeByUuid(
      uuid
    );

    const data = await service.updateStaffPatent({
      uuid,
      lastWriteTime: currentWriteTime,
      currentWriteTime: new Date(),
      patentType,
      patentName,
      patentCode,
      patentNation,
    });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
      msg: '专利信息修改成功',
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 删除专利
 */
router.del('/deletePatent', async (ctx, next) => {
  try {
    const { uuid } = ctx.state.param;

    await service.deletePatent(uuid);

    ctx.body = new Res({
      status: RESPONSE_CODE.noContent,
      msg: '删除专利成功',
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 新建一条软件著作权信息
 */
router.post('/createStaffCopyright', async (ctx, next) => {
  try {
    const {
      copyrightType,
      copyrightName,
      copyrightCode,
      copyrightArrange,
    } = ctx.state.param;

    const userUuid = ctx.state.user.uuid;

    const data = await service.insertStaffCopyright({
      userUuid,
      currentWriteTime: new Date(),
      isVerify: '未核实',
      copyrightType,
      copyrightName,
      copyrightCode,
      copyrightArrange,
    });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
      msg: '软件著作权信息新增成功',
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 查询员工填写软件著作权信息
 */
router.get('/getWriteCopyrightList', async (ctx, next) => {
  try {
    const userUuid = ctx.state.user.uuid;

    const data = await service.queryWriteCopyrightList(userUuid);

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 查询员工填写软件著作权信息通过uuid
 */
router.get('/getStaffCopyrightByUuid', async (ctx, next) => {
  try {
    const { staffCopyrightUuid } = ctx.state.param;

    const data = await service.selectStaffCopyrightByUuid({
      uuid: staffCopyrightUuid,
    });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 修改一条软件著作权信息
 */
router.post('/modifyStaffCopyright', async (ctx, next) => {
  try {
    const {
      uuid,
      copyrightType,
      copyrightName,
      copyrightCode,
      copyrightArrange,
    } = ctx.state.param;

    const {
      currentWriteTime,
    } = await service.selectCopyrightLastWriteTimeByUuid(uuid);

    const data = await service.updateStaffCopyright({
      uuid,
      lastWriteTime: currentWriteTime,
      currentWriteTime: new Date(),
      copyrightType,
      copyrightName,
      copyrightCode,
      copyrightArrange,
    });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
      msg: '软件著作权信息修改成功',
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 删除软件著作权
 */
router.del('/deleteCopyright', async (ctx, next) => {
  try {
    const { uuid } = ctx.state.param;

    await service.deleteCopyright(uuid);

    ctx.body = new Res({
      status: RESPONSE_CODE.noContent,
      msg: '删除软件著作权成功',
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 新建一条奖项信息
 */
router.post('/createStaffAward', async (ctx, next) => {
  try {
    const {
      awardType,
      awardName,
      awardTime,
      awardGrade,
      awardDepartment,
      awardNameList,
    } = ctx.state.param;

    const userUuid = ctx.state.user.uuid;

    const data = await service.insertStaffAward({
      userUuid,
      currentWriteTime: new Date(),
      isVerify: '未核实',
      awardType,
      awardName,
      awardTime,
      awardGrade,
      awardDepartment,
      awardNameList,
    });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
      msg: '奖项信息新增成功',
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 查询员工填写奖项信息
 */
router.get('/getWriteAwardList', async (ctx, next) => {
  try {
    const userUuid = ctx.state.user.uuid;

    const data = await service.queryWriteAwardList(userUuid);

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 查询员工填写奖项信息通过uuid
 */
router.get('/getStaffAwardByUuid', async (ctx, next) => {
  try {
    const { staffAwardUuid } = ctx.state.param;

    const data = await service.selectStaffAwardByUuid({
      uuid: staffAwardUuid,
    });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 修改一条奖项信息
 */
router.post('/modifyStaffAward', async (ctx, next) => {
  try {
    const {
      uuid,
      awardType,
      awardName,
      awardTime,
      awardGrade,
      awardDepartment,
      awardNameList,
    } = ctx.state.param;

    const { currentWriteTime } = await service.selectAwardLastWriteTimeByUuid(
      uuid
    );

    const data = await service.updateStaffAward({
      uuid,
      lastWriteTime: currentWriteTime,
      currentWriteTime: new Date(),
      awardType,
      awardName,
      awardTime,
      awardGrade,
      awardDepartment,
      awardNameList,
    });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
      msg: '奖项信息修改成功',
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 删除奖项
 */
router.del('/deleteAward', async (ctx, next) => {
  try {
    const { uuid } = ctx.state.param;

    await service.deleteAward(uuid);

    ctx.body = new Res({
      status: RESPONSE_CODE.noContent,
      msg: '删除奖项成功',
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 新建一条论文/专著信息
 */
router.post('/createStaffThesis', async (ctx, next) => {
  try {
    const {
      thesisTitle,
      thesisType,
      thesisJournal,
      thesisTime,
      thesisGrade,
      thesisCode,
      thesisFirstAuthor,
      thesisAuthorSequence,
    } = ctx.state.param;

    const userUuid = ctx.state.user.uuid;

    const data = await service.insertStaffThesis({
      userUuid,
      currentWriteTime: new Date(),
      isVerify: '未核实',
      thesisTitle,
      thesisType,
      thesisJournal,
      thesisTime,
      thesisGrade,
      thesisCode,
      thesisFirstAuthor,
      thesisAuthorSequence,
    });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
      msg: '论文/专著信息新增成功',
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 查询员工填写论文/专著信息
 */
router.get('/getWriteThesisList', async (ctx, next) => {
  try {
    const userUuid = ctx.state.user.uuid;

    const data = await service.queryWriteThesisList(userUuid);

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 查询员工填写论文/专著信息通过uuid
 */
router.get('/getStaffThesisByUuid', async (ctx, next) => {
  try {
    const { staffThesisUuid } = ctx.state.param;

    const data = await service.selectStaffThesisByUuid({
      uuid: staffThesisUuid,
    });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 修改一条论文/专著信息
 */
router.post('/modifyStaffThesis', async (ctx, next) => {
  try {
    const {
      uuid,
      thesisTitle,
      thesisType,
      thesisJournal,
      thesisTime,
      thesisGrade,
      thesisCode,
      thesisFirstAuthor,
      thesisAuthorSequence,
    } = ctx.state.param;

    const { currentWriteTime } = await service.selectThesisLastWriteTimeByUuid(
      uuid
    );

    const data = await service.updateStaffThesis({
      uuid,
      lastWriteTime: currentWriteTime,
      currentWriteTime: new Date(),
      thesisTitle,
      thesisType,
      thesisJournal,
      thesisTime,
      thesisGrade,
      thesisCode,
      thesisFirstAuthor,
      thesisAuthorSequence,
    });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
      msg: '论文/专著信息修改成功',
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 删除论文/专著
 */
router.del('/deleteThesis', async (ctx, next) => {
  try {
    const { uuid } = ctx.state.param;

    await service.deleteThesis(uuid);

    ctx.body = new Res({
      status: RESPONSE_CODE.noContent,
      msg: '删除论文/专著成功',
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 获取奖项的附件信息
 */
router.get('/selectUploadAward', async (ctx) => {
  try {
    const { uuid } = ctx.state.param;

    const data = await service.selectUploadAward(uuid);

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 保存奖项的附件信息
 */
router.post('/saveUploadAward', async (ctx) => {
  try {
    const { uuid, awardUrl } = ctx.state.param;

    const data = await service.updateUploadAward({
      uuid,
      awardUrl,
    });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
      msg: '保存奖项附件成功',
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 获取论文/专著的附件信息
 */
router.get('/selectUploadThesis', async (ctx) => {
  try {
    const { uuid } = ctx.state.param;

    const data = await service.selectUploadThesis(uuid);

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 保存论文/专著的附件信息
 */
router.post('/saveUploadThesis', async (ctx) => {
  try {
    const { uuid, thesisUrl } = ctx.state.param;

    const data = await service.updateUploadThesis({
      uuid,
      thesisUrl,
    });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
      msg: '保存论文/专著附件成功',
    });
  } catch (error) {
    throw error;
  }
});

export default router;
