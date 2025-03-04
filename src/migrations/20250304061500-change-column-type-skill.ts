import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.changeColumn("employees", "skill", {
      type: DataTypes.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.changeColumn("Users", "skill", {
      type: DataTypes.DATE, //
      allowNull: false,
    });
  },
};
