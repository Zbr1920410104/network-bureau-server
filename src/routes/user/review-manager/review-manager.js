import Router from 'koa-router';

// response
import Res from '../../../util/response';
import { RESPONSE_CODE } from '../../../constants/domain-constants';

// service
import service from '../../../service';

// 工具
import CustomError from '../../../util/custom-error';

const router = new Router({
  prefix: '/reviewManager',
});

/**
 * 查询基本信息
 */
router.get('/getStaffReviewInfo', async (ctx, next) => {
  try {
    const {
      reviewStatus,
      name,
      staffItem,
      scoreLimit,
      score,
    } = ctx.state.param;

    console.log('haha', reviewStatus, name, staffItem, scoreLimit, score);

    let data;

    if (score >= 0 && score !== '') {
      data = await service.queryStaffReviewInfoByScoreLimit({
        staffItem,
        scoreLimit,
        score,
      });

      if (!data.length) {
        throw new CustomError('未找到用户');
      }
    } else if (name?.length > 0) {
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

/**
 * 统计员查询员工填写项目信息
 */
router.get('/getProjectScore', async (ctx, next) => {
  try {
    const { staffProjectUuid } = ctx.state.param;

    const data = await service.selectProjectScoreByUuid({
      uuid: staffProjectUuid,
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
 * 统计员查询员工填写专利信息
 */
router.get('/getPatentScore', async (ctx, next) => {
  try {
    const { staffPatentUuid } = ctx.state.param;

    const data = await service.selectPatentScoreByUuid({
      uuid: staffPatentUuid,
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
 * 统计员查询员工填写软件著作权信息
 */
router.get('/getCopyrightScore', async (ctx, next) => {
  try {
    const { staffCopyrightUuid } = ctx.state.param;

    const data = await service.selectCopyrightScoreByUuid({
      uuid: staffCopyrightUuid,
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
router.get('/getAwardScore', async (ctx, next) => {
  try {
    const { staffAwardUuid } = ctx.state.param;

    const data = await service.selectAwardScoreByUuid({
      uuid: staffAwardUuid,
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
router.get('/getThesisScore', async (ctx, next) => {
  try {
    const { staffThesisUuid } = ctx.state.param;

    const data = await service.selectThesisScoreByUuid({
      uuid: staffThesisUuid,
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
 * 统计员项目信息评分
 */
router.post('/setProjectScore', async (ctx, next) => {
  try {
    const { uuid, score, reviewRemarks } = ctx.state.param;

    const reviewUserUuid = ctx.state.user.uuid;

    const data = await service.updateProjectScore({
      uuid,
      score,
      reviewUserUuid,
      reviewRemarks,
      reviewTime: new Date(),
    });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
      msg: '项目信息评分成功',
    });
  } catch (error) {
    throw new CustomError('项目信息评分失败');
  }
});

/**
 * 统计员专利信息评分
 */
router.post('/setPatentScore', async (ctx, next) => {
  try {
    const { uuid, score, reviewRemarks } = ctx.state.param;

    const reviewUserUuid = ctx.state.user.uuid;

    const data = await service.updatePatentScore({
      uuid,
      score,
      reviewUserUuid,
      reviewRemarks,
      reviewTime: new Date(),
    });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
      msg: '专利信息评分成功',
    });
  } catch (error) {
    throw new CustomError('专利信息评分失败');
  }
});

/**
 * 统计员软件著作权信息评分
 */
router.post('/setCopyrightScore', async (ctx, next) => {
  try {
    const { uuid, score, reviewRemarks } = ctx.state.param;

    const reviewUserUuid = ctx.state.user.uuid;

    const data = await service.updateCopyrightScore({
      uuid,
      score,
      reviewUserUuid,
      reviewRemarks,
      reviewTime: new Date(),
    });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
      msg: '软件著作权信息评分成功',
    });
  } catch (error) {
    throw new CustomError('软件著作权信息评分失败');
  }
});

/**
 * 统计员奖项信息评分
 */
router.post('/setAwardScore', async (ctx, next) => {
  try {
    const { uuid, score, reviewRemarks } = ctx.state.param;

    const reviewUserUuid = ctx.state.user.uuid;

    const data = await service.updateAwardScore({
      uuid,
      score,
      reviewUserUuid,
      reviewRemarks,
      reviewTime: new Date(),
    });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
      msg: '奖项信息评分成功',
    });
  } catch (error) {
    throw new CustomError('奖项信息评分失败');
  }
});

/**
 * 统计员论文/专著信息评分
 */
router.post('/setThesisScore', async (ctx, next) => {
  try {
    const { uuid, score, reviewRemarks } = ctx.state.param;

    const reviewUserUuid = ctx.state.user.uuid;

    const data = await service.updateThesisScore({
      uuid,
      score,
      reviewUserUuid,
      reviewRemarks,
      reviewTime: new Date(),
    });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
      msg: '论文/专著信息评分成功',
    });
  } catch (error) {
    throw new CustomError('论文/专著信息评分失败');
  }
});

/**
 * 完成评分
 */
router.post('/finishReviewManagerReview', async (ctx) => {
  try {
    const { uuid } = ctx.state.param;

    await service.finishReviewManagerReview({
      userUuid: uuid,
    });

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      msg: '评分完成状态设置成功',
    });
  } catch (error) {
    throw new CustomError('请确认已全部评分后再点击按钮');
  }
});

/**
 * 导出所有人信息表
 */
router.post('/exportAllStaffInfoExcel', async (ctx) => {
  try {
    const data = await service.exportAllStaffScoreExcel();

    ctx.body = new Res({
      status: RESPONSE_CODE.success,
      data,
    });
  } catch (error) {
    throw error;
  }
});

export default router;
