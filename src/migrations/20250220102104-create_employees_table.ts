import { QueryInterface, DataTypes } from "sequelize";

// Meskipun file ini TypeScript, kita tetap gunakan `module.exports` agar dibaca oleh sequelize-cli
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("employees", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isMale: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      age: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      education: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      experience: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      leadership: {
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
    await queryInterface.dropTable("employees");
  },
};
