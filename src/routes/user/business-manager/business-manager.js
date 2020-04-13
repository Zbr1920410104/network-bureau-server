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

export default router;
