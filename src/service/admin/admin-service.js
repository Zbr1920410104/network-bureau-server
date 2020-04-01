// 工具类
import CustomError from '../../util/custom-error';
import webToken from '../../util/token';

// oss
import client from '../../util/oss';
import { db } from '../../db/db-connect';

export default {
  /**
   * 管理账号登录
   */
  getManagerToken: async (username, password) => {
    try {
      const manager = await managerUserDao.selectManagerUserByUsername(
        username
      );

      if (!manager || manager.password !== password) {
        throw new CustomError('账号或密码错误');
      }

      return {
        token: webToken.parseToken({
          uuid: manager.uuid,
          auth: 'manager'
        }),
        manager
      };
    } catch (error) {
      throw error;
    }
  },

  /**
   * 创建管理账号
   */
  createNewManager: async (
    username,
    phone,
    password,
    name,
    role,
    headPortraitUrl
  ) => {
    try {
      if (await managerUserDao.selectManagerUserByUsername(username)) {
        throw new CustomError('管理员账号已存在');
      }
      let productionUrl = '';
      // 将temp的文件copy到production中
      const [filePosition] = headPortraitUrl.split('/');

      if (filePosition === 'temp') {
        const tempUrl = headPortraitUrl;
        productionUrl = headPortraitUrl.replace('temp', 'production');

        await client.copy(productionUrl, tempUrl);
      } else if (filePosition === 'production') {
        productionUrl = headPortraitUrl;
      } else {
        throw new CustomError('oss文件路径错误');
      }

      await managerUserDao.createNewManagerUser(
        username,
        phone,
        password,
        name,
        role,
        productionUrl
      );
    } catch (error) {
      throw error;
    }
  },

  /**
   * 删除管理员账号
   */
  deleteManager: managerUuid => {
    // #TODO 删除之前判断是否有此管理员是否是项目管理员最后一个
    // #TODO 判断此管理员是否被项目所依赖(登记测试有两个表, enterpriseRegistrationStep和enterpriseRegistration)
    // #TODO 委托测试和委托合同的时候都要有所判断
    // #TODO 头像oss也得删除
    return managerUserDao.deleteManager(managerUuid);
  },

  /**
   * 更改管理员账号
   */
  updateManager: async (
    managerUuid,
    phone,
    password,
    name,
    headPortraitUrl
  ) => {
    try {
      let productionUrl = '';
      // 将temp的文件copy到production中
      const [filePosition] = headPortraitUrl.split('/');

      if (filePosition === 'temp') {
        const tempUrl = headPortraitUrl;
        productionUrl = headPortraitUrl.replace('temp', 'production');
        const managerUser = await managerUserDao.selectManagerByManagerUuid(
          managerUuid
        );

        if (managerUser?.headPortraitUrl) {
          await client.delete(managerUser.headPortraitUrl);
        }

        await client.copy(productionUrl, tempUrl);
      } else if (filePosition === 'production') {
        productionUrl = headPortraitUrl;
      } else {
        throw new CustomError('oss文件路径错误');
      }

      await managerUserDao.updeteManager(
        managerUuid,
        phone,
        password,
        name,
        productionUrl
      );
    } catch (error) {
      throw error;
    }
  },

  /**
   * 查询管理员账号
   */
  queryManager: page => {
    try {
      return managerUserDao.queryManagerUser(page);
    } catch (error) {
      throw error;
    }
  }
};
