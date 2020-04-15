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
 * 删除管理账号
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

export default router;
