import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.changeColumn("employees", "age", {
      type: DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn("employees", "leadership", {
      type: DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn("employees", "education", {
      type: DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn("employees", "experience", {
      type: DataTypes.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.changeColumn("employees", "age", {
      type: DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn("employees", "leadership", {
      type: DataTypes.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("employees", "education", {
      type: DataTypes.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("employees", "experience", {
      type: DataTypes.DATE,
      allowNull: true,
    });
  },
};
