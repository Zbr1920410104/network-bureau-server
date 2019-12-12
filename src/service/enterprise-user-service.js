import enterpriseUserDao from '../dao/enterprise-user-dao';

import webToken from '../util/token';

export default {
  /**
   * 根据企业的用户名和密码判断之后生成token
   */
  getEnterpriseToken: async (code, password) => {
    const enterprise = await enterpriseUserDao.selectEnterpriseUserByCode(code);

    if (!enterprise || enterprise.password !== password) {
      return false;
    }

    return {
      token: webToken.parseToken({
        uuid: enterprise.uuid
      }),
      enterprise
    };
  },

  /**
   * 企业注册
   */
  createNewEnterprise: async ({ code, name, password, phone }) => {
    if (await enterpriseUserDao.selectEnterpriseByName(name)) {
      return false;
    }

    // 需要表单认证
    await enterpriseUserDao.createNewEnterprise({
      name,
      password,
      phone,
      code
    });

    return true;
  }
};
