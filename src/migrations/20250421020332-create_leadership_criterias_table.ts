import { QueryInterface, DataTypes } from "sequelize";

// Meskipun file ini TypeScript, kita tetap gunakan `module.exports` agar dibaca oleh sequelize-cli
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("leadership-criterias", {
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
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("leadership-criterias");
  },
};
