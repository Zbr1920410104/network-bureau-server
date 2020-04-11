import Router from 'koa-router';

// response
import Res from '../../../util/response';
import { RESPONSE_CODE } from '../../../constants/domain-constants';

// service
import service from '../../../service';
import serve from 'koa-static';

// 工具类
import CustomError from '../../../util/custom-error';

const router = new Router({
  prefix: '/admin',
});

/**
 * 查询科室
 */
router.get('/quaryDepartment', async (ctx, next) => {
  try {
    const { page } = ctx.state.param;

    const data = await service.quaryDepartmentByPage(page);

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 保存科室
 */
router.post('/saveDepartment', async (ctx) => {
  try {
    const { name } = ctx.state.param;

    const res = await service.selectDepartmentByName(name);

    if (res) {
      throw new CustomError('科室名已存在');
    }

    const data = await service.insertDepartment(name);

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
      msg: '科室新增成功',
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 删除管理账号
 */
router.del('/deleteDepartment', async (ctx, next) => {
  try {
    const { uuid } = ctx.state.param;

    await service.deleteDepartment(uuid);

    ctx.body = new Res({
      status: RESPONSE_CODE.noContent,
      msg: '删除科室成功',
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 保存统计管理员系统时间
 */
router.post('/saveBusinessManagerTime', async (ctx) => {
  try {
    const { startTime, endTime, uuid } = ctx.state.param;

    const res = await service.selectBusinessManagerTime();
    let data;

    if (!res) {
      data = await service.insertBusinessManagerTime({
        startTime,
        endTime,
      });
    } else {
      data = await service.updateBusinessManagerTime({
        startTime,
        endTime,
      });
    }
    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
      msg: '统计管理员系统时间修改成功',
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 查询统计管理员系统时间
 */
router.get('/selectBusinessManagerTime', async (ctx, next) => {
  try {
    const data = await service.selectBusinessManagerTime();

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 保存评审管理员系统时间
 */
router.post('/saveReviewManagerTime', async (ctx) => {
  try {
    const { startTime, endTime } = ctx.state.param;

    const res = await service.selectReviewManagerTime();
    let data;

    if (!res) {
      data = await service.insertReviewManagerTime({
        startTime,
        endTime,
      });
    } else {
      data = await service.updateReviewManagerTime({
        startTime,
        endTime,
      });
    }
    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
      msg: '评审管理员系统时间修改成功',
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 查询评审管理员系统时间
 */
router.get('/selectReviewManagerTime', async (ctx, next) => {
  try {
    const data = await service.selectReviewManagerTime();

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 保存普通员工系统时间
 */
router.post('/saveStaffTime', async (ctx) => {
  try {
    const { startTime, endTime } = ctx.state.param;

    const res = await service.selectStaffTime();
    let data;

    if (!res) {
      data = await service.insertStaffTime({
        startTime,
        endTime,
      });
    } else {
      data = await service.updateStaffTime({
        startTime,
        endTime,
      });
    }
    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
      msg: '普通员工系统时间修改成功',
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 查询普通员工系统时间
 */
router.get('/selectStaffTime', async (ctx, next) => {
  try {
    const data = await service.selectStaffTime();

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 查询账户信息
 */
router.get('/quaryAccount', async (ctx, next) => {
  try {
    const data = await service.quaryAccount();

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 添加用户
 */
router.post('/addAccount', async (ctx, next) => {
  try {
    const { phone, name, role, department, userName } = ctx.state.param;

    const { uuid } = await service.selectDepartmentUuidByName({
      name: department,
    });

    const user = await service.selectUserByUserName(userName);

    if (user) {
      throw new CustomError('账号已存在');
    }

    const data = await service.insertAccount({
      phone,
      name,
      role,
      department,
      userName,
      departmentUuid: uuid,
    });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
      msg: '用户新增成功',
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 查询科室
 */
router.get('/getDepartment', async (ctx, next) => {
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
 * 管理员重置密码
 */
router.post('/resetPassword', async (ctx, next) => {
  try {
    const { uuid } = ctx.state.param;

    const data = await service.updatePassword(uuid);

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
      msg: '密码已重置',
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 账号注销
 */
router.post('/accountCancel', async (ctx, next) => {
  try {
    const { uuid } = ctx.state.param;

    const data = await service.updatAccountCancel(uuid);

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
      msg: '账号已注销',
    });
  } catch (error) {
    throw error;
  }
});

export default router;
