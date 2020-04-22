import Router from 'koa-router';

// response
import Res from '../../../util/response';
import { RESPONSE_CODE } from '../../../constants/domain-constants';

// service
import service from '../../../service';

const router = new Router({
  prefix: '/reviewManager',
});

/**
 * 查询基本信息
 */
router.get('/getStaffReviewInfo', async (ctx, next) => {
  try {
    const { reviewStatus, name } = ctx.state.param;

    let data;

    if (name?.length > 0) {
      data = await service.queryStaffReviewInfoByName(name);

      if (!data.length) {
        throw new CustomError('未找到该用户');
      }
    } else {
      if (reviewStatus === '0') {
        data = await service.queryStaffReviewInfo();
      } else {
        data = await service.queryStaffReviewInfoByReviewStatus(reviewStatus);
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
 * 查询基本信息
 */
router.get('/getReviewManagerBasic', async (ctx, next) => {
  try {
    const { staffUuid } = ctx.state.param;

    const data = await service.selectReviewManagerBasic({
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
 * 评审员查询员工填写项目信息
 */
router.get('/getReviewProjectList', async (ctx, next) => {
  try {
    const { staffUuid } = ctx.state.param;

    const data = await service.queryReviewProjectList({ userUuid: staffUuid });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 评审员查询员工填写专利信息
 */
router.get('/getReviewPatentList', async (ctx, next) => {
  try {
    const { staffUuid } = ctx.state.param;

    const data = await service.queryReviewPatentList({ userUuid: staffUuid });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
    });
  } catch (error) {
    throw error;
  }
});

/**
 * 评审员查询员工填写软件著作权信息
 */
router.get('/getReviewCopyrightList', async (ctx, next) => {
  try {
    const { staffUuid } = ctx.state.param;

    const data = await service.queryReviewCopyrightList({
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
 * 评审员查询员工填写奖项信息
 */
router.get('/getReviewAwardList', async (ctx, next) => {
  try {
    const { staffUuid } = ctx.state.param;

    const data = await service.queryReviewAwardList({
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
 * 评审员查询员工填写论文/专著信息
 */
router.get('/getReviewThesisList', async (ctx, next) => {
  try {
    const { staffUuid } = ctx.state.param;

    const data = await service.queryReviewThesisList({
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
