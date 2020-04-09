import Router from 'koa-router';

// response
import Res from '../../../util/response';
import { RESPONSE_CODE } from '../../../constants/domain-constants';

// service
import service from '../../../service';

const router = new Router({
  prefix: '/managerUser'
});

/**
 * 管理端登录
 */
router.get('/getManagerToken', async (ctx, next) => {
  try {
    let { userName, password } = ctx.state.param;

    const token = await service.getManagerToken(userName, password);

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data: token
    });
  } catch (error) {
    throw error;
  }
});

export default router;
