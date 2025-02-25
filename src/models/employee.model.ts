import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export class Employee extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public phone!: string;
  public isMale!: boolean;
  public age!: Date;
  public education!: string;
  public experience!: Date;
  public leadership!: string;
  public final_score!: number;
  public rangking!: number;
  public position!: string;

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
    password: {
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
    final_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rangking: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Employee",
    tableName: "employees",
  }
);
