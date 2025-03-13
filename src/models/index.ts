import { sequelize } from "../config/database";
import { Employee } from "./employee.model";
import { LoginModel } from "./login.model";
import { CriteriaModel } from "./setting.model";

export { sequelize, Employee, CriteriaModel, LoginModel };
