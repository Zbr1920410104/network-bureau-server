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

export default router;
