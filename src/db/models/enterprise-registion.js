const Sequelize = require('sequelize');
const { db } = require('../db-connect');

export default db.define('enterprise_registion', {
  id: {
    type: Sequelize.BIGINT(11),
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  name: Sequelize.STRING(32),
  currentStep: Sequelize.INTEGER,
  uuid: Sequelize.STRING(36),
  enterpriseUuid: Sequelize.STRING(36),
});
