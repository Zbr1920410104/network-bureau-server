import enterpriseRegistrationDao from '../../dao/enterprise/enterprise-registration-dao';
import managerUserDao from '../../dao/manager/manager-user-dao';
import managerUser from '../../db/models/manager-user';

export default {
  /**
   * 根据名字查询
   */
  selectEnterpriseRegistrationByName: async name => {
    return await enterpriseRegistrationDao.selectEnterpriseRegistrationByName(
      name
    );
  },

  /**
   * 根据RegistrationUuid查询
   */
  selectRegistrationByRegistrationUuid: async registrationUuid => {
    return await enterpriseRegistrationDao.selectRegistrationByRegistrationUuid(
      registrationUuid
    );
  },

  /**
   * 创建登记测试
   */
  createEnterpriseRegistration: async (name, enterpriseUuid) => {
    if (
      await enterpriseRegistrationDao.selectEnterpriseRegistrationByName(name)
    ) {
      return false;
    } else {
      // 查询一个项目管理员
      const projectManager = await managerUserDao.selectManagerUserByRole(10);
      let projectManagerUuid = '';

      if (projectManager && projectManager.uuid) {
        projectManagerUuid = projectManager.uuid;
      }

      return await enterpriseRegistrationDao.createEnterpriseRegistration(
        name,
        enterpriseUuid,
        projectManagerUuid
      );
    }
  },

  /**
   * 查询登记测试通过企业的uuid
   */
  queryRegistrationByEnterpriseUuid: async (enterpriseUuid, page) => {
    return await enterpriseRegistrationDao.queryRegistrationByEnterpriseUuid(
      enterpriseUuid,
      page
    );
  },

  /**
   * 查询企业用户登记测试七个状态通过uuid
   */
  selectRegistrationStatusByRegistrationUuid: async registrationUuid => {
    return await enterpriseRegistrationDao.selectRegistrationStatusByRegistrationUuid(
      registrationUuid
    );
  },

  /**
   * 查询企业用户登记测试具体的步骤状态
   */
  queryEnterpriseRegistrationStepByRegistrationUuid: async registrationUuid => {
    return await enterpriseRegistrationDao.queryEnterpriseRegistrationStepByRegistrationUuid(
      registrationUuid
    );
  },

  /**
   *  无参数查询sys_registration_step表
   */
  querySysRegistrationStep: async () => {
    return await enterpriseRegistrationDao.querySysRegistrationStep();
  },

  /**
   * 查询登记测试的基本信息
   */
  selectRegistrationBasicByRegistrationUuid: async registrationUuid => {
    return await enterpriseRegistrationDao.selectRegistrationBasicByRegistrationUuid(
      registrationUuid
    );
  },

  /**
   * 保存登记测试的基本信息
   */
  saveRegistrationBasic: async ({
    registrationUuid,
    version,
    linkman,
    client,
    phone,
    address,
    devStartTime,
    enterpriseName
  }) => {
    return await enterpriseRegistrationDao.saveRegistrationBasic({
      registrationUuid,
      version,
      linkman,
      client,
      phone,
      address,
      devStartTime,
      enterpriseName,
      status: 1,
      statusText: '待审核'
    });
  },

  /**
   * 查询评测合同的基本信息
   */
  selectRegistrationContractByRegistrationUuid: async registrationUuid => {
    return await enterpriseRegistrationDao.selectRegistrationContractByRegistrationUuid(
      registrationUuid
    );
  },

  /**
   * 保存评测合同的基本信息
   */
  saveRegistrationContract: async ({
    registrationUuid,
    amount,
    fax,
    postalCode,
    mainFunction,
    techIndex
  }) => {
    return await enterpriseRegistrationDao.saveRegistrationContract({
      registrationUuid,
      amount,
      fax,
      postalCode,
      mainFunction,
      techIndex,
      status: 1,
      statusText: '待审核'
    });
  },

  /**
   * 查询样品登记表的基本信息
   */
  selectRegistrationSpecimenByRegistrationUuid: async registrationUuid => {
    return await enterpriseRegistrationDao.selectRegistrationSpecimenByRegistrationUuid(
      registrationUuid
    );
  },

  /**
   * 保存样品登记表的基本信息
   */
  saveRegistrationSpecimen: async ({
    registrationUuid,
    trademark,
    developmentTool,
    securityClassification,
    email,
    unit
  }) => {
    return await enterpriseRegistrationDao.saveRegistrationSpecimen({
      registrationUuid,
      trademark,
      developmentTool,
      securityClassification,
      email,
      unit,
      status: 1,
      statusText: '待审核'
    });
  },

   /**
   * 查询现场测试申请表的基本信息
   */
  selectRegistrationApplyByRegistrationUuid: async registrationUuid => {
    return await enterpriseRegistrationDao.selectRegistrationApplyByRegistrationUuid(
      registrationUuid
    );
  },

  /**
   * 保存现场测试申请表的基本信息
   */
  saveRegistrationApply: async ({
    registrationUuid,
    content
  }) => {
    return await enterpriseRegistrationDao.saveRegistrationApply({
      registrationUuid,
      content,
      status: 1,
      statusText: '待审核'
    });
  }
};
