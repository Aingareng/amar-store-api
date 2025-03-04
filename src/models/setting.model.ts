import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export class SettingModel extends Model {
  public id!: number;
  public name!: string;
  public rank_order!: number;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SettingModel.init(
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
  },
  {
    sequelize,
    modelName: "SettingModel",
    tableName: "criterias",
  }
);
