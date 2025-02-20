import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "john",
          email: "john@example.com",
          password: "john123",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "jane",
          email: "jane@example.com",
          password: "jane123",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "alex",
          email: "alex@example.com",
          password: "alex123",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface: QueryInterface) {
    // Menghapus data yang tadi diinsert
    await queryInterface.bulkDelete(
      "users",
      {
        username: ["john", "jane", "alex"],
      },
      {}
    );
  },
};
