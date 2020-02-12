import enterpriseRegistrationStep from '../../db/models/enterprise-registration-step';

export default {
  bulkInsertRegistrationStep: ({
    enterpriseRegistrationSteps,
    transaction
  }) => {
    return enterpriseRegistrationStep.bulkCreate(enterpriseRegistrationSteps, {
      transaction
    });
  },

  /**
   * 根据enterpriseRegistrationUuid查询具体步骤状态
   */
  queryEnterpriseRegistrationStepByRegistrationUuid: async registrationUuid => {
    return await enterpriseRegistrationStep.findAll({
      where: { uuid: registrationUuid },
      attributes: ['step', 'status', 'statusText', 'managerUuid'],
      raw: true
    });
  },

  /**
   * 更新登记测试的步骤
   */
  updateRegistrationStep: async ({
    registrationUuid,
    status,
    statusText,
    step
  }) => {
    return await enterpriseRegistrationStep.update(
      {
        status,
        statusText
      },
      {
        where: {
          uuid: registrationUuid,
          step
        }
      }
    );
  },

  /**
   * 更新步骤的管理员
   */
  updateRegistrationStepManagerUuid: async ({
    registrationUuid,
    step,
    managerUuid
  }) => {
    return await enterpriseRegistrationStep.update(
      { managerUuid },
      {
        where: {
          uuid: registrationUuid,
          step
        }
      }
    );
  },

  /**
   * 查询企业的缴费信息
   */
  queryRegistrationByManagerUuid: async managerUuid => {
    return await enterpriseRegistrationStep.findAll({
      attributes: ['uuid'],
      raw: true,
      where: { managerUuid }
    });
  }
};
