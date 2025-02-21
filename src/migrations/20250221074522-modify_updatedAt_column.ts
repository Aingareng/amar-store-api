import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.changeColumn("employees", "updatedAt", {
      type: DataTypes.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.changeColumn("employees", "updatedAt", {
      type: DataTypes.DATE,
      allowNull: false,
    });
  },
};
