import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.renameColumn("criterias", "point", "rank_order");
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.renameColumn("criterias", "rank_order", "point");
  },
};
