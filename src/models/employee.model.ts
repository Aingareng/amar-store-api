import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export class Employee extends Model {
  public id!: number;
  public username!: string;
  public email!: string;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
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
  },
  {
    sequelize,
    modelName: "Employee",
    tableName: "employees",
  }
);
