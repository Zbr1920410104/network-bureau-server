import Router from 'koa-router';

// response
import Res from '../../util/response';
import { RESPONSE_CODE } from '../../constants/domain-constants';

// service
import service from '../../service';

const router = new Router({
  prefix: '/user',
});

/**
 * 通过token获取自己信息
 */
router.get('/getMyInfo', async (ctx, next) => {
  try {
    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data: ctx.state.user,
    });
  } catch (error) {
    ctx.throw(RESPONSE_CODE.unauthorized);
  }
});

/**
 * 管理端登录
 */
router.get('/getUserToken', async (ctx, next) => {
  try {
    let { userName, password } = ctx.state.param;

    const token = await service.getUserToken(userName, password);

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data: token,
    });
  } catch (error) {
    throw error;
  }
});

export default router;
