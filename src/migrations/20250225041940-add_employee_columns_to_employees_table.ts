import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn("employees", "final_score", {
      type: DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("employees", "rangking", {
      type: DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("employees", "position", {
      type: DataTypes.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("employees", "final_score");
    await queryInterface.removeColumn("employees", "rangking");
    await queryInterface.removeColumn("employees", "position");
  },
};
