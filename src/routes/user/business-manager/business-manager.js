import Router from 'koa-router';

// response
import Res from '../../../util/response';
import { RESPONSE_CODE } from '../../../constants/domain-constants';

// service
import service from '../../../service';

const router = new Router({
  prefix: '/businessManager',
});

/**
 * 查询基本信息
 */
router.get('/getBusinessManagerBasic', async (ctx, next) => {
  try {
    const { staffUuid } = ctx.state.param;

    const data = await service.selectBusinessManagerBasic({
      userUuid: staffUuid,
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
 * 查询基本信息
 */
router.get('/getStaffVerifyInfo', async (ctx, next) => {
  try {
    const { verifyStatus, name } = ctx.state.param;

    let data;

    if (name?.length > 0) {
      data = await service.queryStaffVerifyInfoByName(name);

      if (!data.length) {
        throw new CustomError('未找到该用户');
      }
    } else {
      if (verifyStatus === '0') {
        data = await service.queryStaffVerifyInfo();
      } else {
        data = await service.queryStaffVerifyInfoByVerifyStatus(verifyStatus);
      }
    }
    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 统计员查询员工填写项目信息
 */
router.get('/getVerifyProjectList', async (ctx, next) => {
  try {
    const { staffUuid } = ctx.state.param;

    const data = await service.queryVerifyProjectList({ userUuid: staffUuid });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 统计员查询员工填写专利信息
 */
router.get('/getVerifyPatentList', async (ctx, next) => {
  try {
    const { staffUuid } = ctx.state.param;

    const data = await service.queryVerifyPatentList({ userUuid: staffUuid });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 统计员查询员工填写软件著作权信息
 */
router.get('/getVerifyCopyrightList', async (ctx, next) => {
  try {
    const { staffUuid } = ctx.state.param;

    const data = await service.queryVerifyCopyrightList({
      userUuid: staffUuid,
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
 * 统计员查询员工填写奖项信息
 */
router.get('/getVerifyAwardList', async (ctx, next) => {
  try {
    const { staffUuid } = ctx.state.param;

    const data = await service.queryVerifyAwardList({
      userUuid: staffUuid,
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
 * 统计员查询员工填写论文/专著信息
 */
router.get('/getVerifyThesisList', async (ctx, next) => {
  try {
    const { staffUuid } = ctx.state.param;

    const data = await service.queryVerifyThesisList({
      userUuid: staffUuid,
    });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
    });
  } catch (error) {
    throw error;
  }
});

export default router;
