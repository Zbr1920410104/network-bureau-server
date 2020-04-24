import Router from 'koa-router';

// response
import Res from '../../../util/response';
import { RESPONSE_CODE } from '../../../constants/domain-constants';

// 工具
import CustomError from '../../../util/custom-error';

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

/**
 * 统计员设置员工基本信息通过状态
 */
router.post('/setVerifyBasicSuccessStatus', async (ctx, next) => {
  try {
    const { userUuid } = ctx.state.param;

    const verifyUserUuid = ctx.state.user.uuid;

    const data = await service.updateVerifyBasicStatus({
      userUuid,
      verifyRemarks: '',
      isVerify: '核实通过',
      verifyUserUuid,
      verifyTime: new Date(),
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
 * 统计员设置员工基本信息不通过状态
 */
router.post('/setVerifyBasicFailStatus', async (ctx, next) => {
  try {
    const { userUuid, verifyRemarks } = ctx.state.param;

    const verifyUserUuid = ctx.state.user.uuid;

    const data = await service.updateVerifyBasicStatus({
      userUuid,
      verifyRemarks,
      isVerify: '核实不通过',
      verifyUserUuid,
      verifyTime: new Date(),
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
 * 统计员设置员工项目信息通过状态
 */
router.post('/setVerifyProjectSuccessStatus', async (ctx, next) => {
  try {
    const { uuid } = ctx.state.param;

    const verifyUserUuid = ctx.state.user.uuid;

    const data = await service.updateVerifyProjectStatus({
      uuid,
      verifyRemarks: '',
      isVerify: '核实通过',
      verifyUserUuid,
      verifyTime: new Date(),
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
 * 统计员设置员工项目信息不通过状态
 */
router.post('/setVerifyProjectFailStatus', async (ctx, next) => {
  try {
    const { uuid, verifyRemarks } = ctx.state.param;

    const verifyUserUuid = ctx.state.user.uuid;

    const data = await service.updateVerifyProjectStatus({
      uuid,
      verifyRemarks,
      isVerify: '核实不通过',
      verifyUserUuid,
      verifyTime: new Date(),
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
 * 统计员设置员工专利信息通过状态
 */
router.post('/setVerifyPatentSuccessStatus', async (ctx, next) => {
  try {
    const { uuid } = ctx.state.param;

    const verifyUserUuid = ctx.state.user.uuid;

    const data = await service.updateVerifyPatentStatus({
      uuid,
      verifyRemarks: '',
      isVerify: '核实通过',
      verifyUserUuid,
      verifyTime: new Date(),
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
 * 统计员设置员工专利信息不通过状态
 */
router.post('/setVerifyPatentFailStatus', async (ctx, next) => {
  try {
    const { uuid, verifyRemarks } = ctx.state.param;

    const verifyUserUuid = ctx.state.user.uuid;

    const data = await service.updateVerifyPatentStatus({
      uuid,
      verifyRemarks,
      isVerify: '核实不通过',
      verifyUserUuid,
      verifyTime: new Date(),
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
 * 统计员设置员工软件著作权信息通过状态
 */
router.post('/setVerifyCopyrightSuccessStatus', async (ctx, next) => {
  try {
    const { uuid } = ctx.state.param;

    const verifyUserUuid = ctx.state.user.uuid;

    const data = await service.updateVerifyCopyrightStatus({
      uuid,
      verifyRemarks: '',
      isVerify: '核实通过',
      verifyUserUuid,
      verifyTime: new Date(),
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
 * 统计员设置员工软件著作权信息不通过状态
 */
router.post('/setVerifyCopyrightFailStatus', async (ctx, next) => {
  try {
    const { uuid, verifyRemarks } = ctx.state.param;

    const verifyUserUuid = ctx.state.user.uuid;

    const data = await service.updateVerifyCopyrightStatus({
      uuid,
      verifyRemarks,
      isVerify: '核实不通过',
      verifyUserUuid,
      verifyTime: new Date(),
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
 * 统计员设置员工获奖信息通过状态
 */
router.post('/setVerifyAwardSuccessStatus', async (ctx, next) => {
  try {
    const { uuid } = ctx.state.param;

    const verifyUserUuid = ctx.state.user.uuid;

    const data = await service.updateVerifyAwardStatus({
      uuid,
      verifyRemarks: '',
      isVerify: '核实通过',
      verifyUserUuid,
      verifyTime: new Date(),
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
 * 统计员设置员工获奖信息不通过状态
 */
router.post('/setVerifyAwardFailStatus', async (ctx, next) => {
  try {
    const { uuid, verifyRemarks } = ctx.state.param;

    const verifyUserUuid = ctx.state.user.uuid;

    const data = await service.updateVerifyAwardStatus({
      uuid,
      verifyRemarks,
      isVerify: '核实不通过',
      verifyUserUuid,
      verifyTime: new Date(),
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
 * 统计员设置员工论文/专著信息通过状态
 */
router.post('/setVerifyThesisSuccessStatus', async (ctx, next) => {
  try {
    const { uuid } = ctx.state.param;

    const verifyUserUuid = ctx.state.user.uuid;

    const data = await service.updateVerifyThesisStatus({
      uuid,
      verifyRemarks: '',
      isVerify: '核实通过',
      verifyUserUuid,
      verifyTime: new Date(),
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
 * 统计员设置员工论文/专著信息不通过状态
 */
router.post('/setVerifyThesisFailStatus', async (ctx, next) => {
  try {
    const { uuid, verifyRemarks } = ctx.state.param;

    const verifyUserUuid = ctx.state.user.uuid;

    const data = await service.updateVerifyThesisStatus({
      uuid,
      verifyRemarks,
      isVerify: '核实不通过',
      verifyUserUuid,
      verifyTime: new Date(),
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
 * 完成审核
 */
router.post('/finishBusinessManagerVerify', async (ctx) => {
  try {
    const { uuid } = ctx.state.param;

    await service.finishBusinessManagerVerify({
      userUuid: uuid,
    });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      msg: '审核通过状态设置成功',
    });
  } catch (error) {
    throw new CustomError('请确认全部审核通过后再点击按钮');
  }
});

export default router;
