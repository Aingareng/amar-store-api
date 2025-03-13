import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export class CriteriaModel extends Model {
  public id!: number;
  public name!: string;
  public rank_order!: number;
  public weight!: number;
  public type!: "benefit" | "cost";
  public code!: string;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CriteriaModel.init(
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
    rank_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM("benefit", "cost"),
      allowNull: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true,
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
    modelName: "CriteriaModel",
    tableName: "criterias",
  }
);
