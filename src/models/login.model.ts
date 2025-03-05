import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export class LoginModel extends Model {
  public id!: number;
  public name!: string;
  public rank_order!: number;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

LoginModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "LoginModel",
    tableName: "users",
  }
);
