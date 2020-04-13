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

    const { lastWriteTime } = await service.selectLastWriteTimeByUuid(userUuid);

    const data = await service.updateStaffBasic({
      userUuid,
      lastWriteTime,
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

export default router;
