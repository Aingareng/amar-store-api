import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn("criterias", "weight", {
      type: DataTypes.FLOAT,
      allowNull: true,
    });
    await queryInterface.addColumn("criterias", "type", {
      type: DataTypes.ENUM("benefit", "cost"),
      allowNull: true,
    });

    await queryInterface.addColumn("criterias", "code", {
      type: DataTypes.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("criterias", "weight");
    await queryInterface.removeColumn("criterias", "type");
    await queryInterface.removeColumn("criterias", "code");
  },
};
