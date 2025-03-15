import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.renameColumn("employees", "skill", "K1");
    await queryInterface.renameColumn("employees", "education", "K2");
    await queryInterface.renameColumn("employees", "age", "K3");
    await queryInterface.renameColumn("employees", "experience", "K4");
    await queryInterface.renameColumn("employees", "leadership", "K5");
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.renameColumn("employees", "K1", "skill");
    await queryInterface.renameColumn("employees", "K2", "education");
    await queryInterface.renameColumn("employees", "K3", "age");
    await queryInterface.renameColumn("employees", "K4", "experience");
    await queryInterface.renameColumn("employees", "K5", "leadership");
  },
};
