import { QueryInterface, DataTypes } from "sequelize";

// Meskipun file ini TypeScript, kita tetap gunakan `module.exports` agar dibaca oleh sequelize-cli
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("criterias", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("criterias");
  },
};
