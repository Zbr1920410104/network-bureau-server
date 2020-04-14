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

export default router;
