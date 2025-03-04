import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(
      "criterias",
      [
        {
          name: "skill",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "education",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "experience",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "age",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "leadership",
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
      "criterias",
      {
        name: ["skill", "education", "experience", "age", "leadership"],
      },
      {}
    );
  },
};
