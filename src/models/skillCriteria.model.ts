import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export class SkillCriteriaModel extends Model {
  public id!: number;
  public name!: string;
  public weight!: number;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SkillCriteriaModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
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
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "SkillCriteriaModel",
    tableName: "skill-criterias",
  }
);
