import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export class LeadershipCriteriaModel extends Model {
  public id!: number;
  public name!: string;
  public weight!: number;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

LeadershipCriteriaModel.init(
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
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "LeadershipCriteriaModel",
    tableName: "leadership-criterias",
  }
);
