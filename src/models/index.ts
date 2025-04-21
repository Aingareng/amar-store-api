import { sequelize } from "../config/database";
import { Employee } from "./employee.model";
import { LoginModel } from "./login.model";
import { CriteriaModel } from "./setting.model";
import { SkillCriteriaModel } from "./skillCriteria.model";
import { LeadershipCriteriaModel } from "./leadershipCriteria.model";

export {
  sequelize,
  Employee,
  CriteriaModel,
  LoginModel,
  SkillCriteriaModel,
  LeadershipCriteriaModel,
};
