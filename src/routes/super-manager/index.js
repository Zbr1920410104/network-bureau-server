import Router from 'koa-router';
import Res from '../../util/response';
import { RESPONSE_CODE } from '../../constants/domain-constants';

// service
import managerUserService from '../../service/manager-user-service';

// 权限
import verifyAuth from '../../middle/verify-auth';
import { AUTHORITY } from '../../constants/app-constants';

const router = new Router();

router.prefix('/superManager');

router.use('/superManager', verifyAuth(AUTHORITY.SUPER.name));
/**
 * 增加管理账号
 */
router.post('/createNewManager', async (ctx, next) => {
  let { username, phone, password, name, role } = ctx.state.param;

  const status = await managerUserService.createNewManager(
    username,
    phone,
    password,
    name,
    role
  );

  if (status) {
    ctx.body = new Res({
      status: RESPONSE_CODE.created,
      msg: '创建管理用户成功'
    });
  } else {
    ctx.body = new Res({
      status: RESPONSE_CODE.error,
      msg: '用户已存在'
    });
  }
});

/**
 * 更新企业用户
 */
router.put('/updateManager', async (ctx, next) => {
  let { uuid, phone, password, name } = ctx.state.param;

  const status = await managerUserService.updateManager(
    uuid,
    phone,
    password,
    name
  );

  if (status) {
    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      msg: '更改管理员成功'
    });
  } else {
    ctx.body = new Res({
      status: RESPONSE_CODE.error,
      msg: '更改管理员失败'
    });
  }
});

/**
 * 删除企业用户
 */
router.del('/deleteManager', async (ctx, next) => {
  let { uuid } = ctx.state.param;

  const status = await managerUserService.deleteManager(uuid);

  if (status) {
    ctx.body = new Res({
      status: RESPONSE_CODE.noContent,
      msg: '删除管理员成功'
    });
  } else {
    ctx.body = new Res({
      status: RESPONSE_CODE.error,
      msg: '删除管理员失败'
    });
  }
});

export default router;
