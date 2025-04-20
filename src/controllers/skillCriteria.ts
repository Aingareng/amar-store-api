import { Op } from "sequelize";
import { IApiResponse } from "../interfaces/apiResponse";
import {
  IQueryParams,
  ISkillCriteriaController,
  ISkillCriteriaPayload,
} from "../interfaces/skillCriteria";
import { SkillCriteriaModel } from "../models";
class skillCriteriaController implements ISkillCriteriaController {
  async get(params: IQueryParams): Promise<IApiResponse> {
    try {
      const { search } = params;
      const whereClause: any = {};

      if (search) {
        whereClause[Op.or] = [{ name: { [Op.like]: `%${search}%` } }];
      }

      const criterias = await SkillCriteriaModel.findAll({
        where: whereClause,
      });
      return {
        status: 200,
        message: "Success",
        data: criterias,
      };
    } catch (error) {
      return {
        status: 500,
        message: String(error),
        data: null,
      };
    }
  }
  async create(payload: ISkillCriteriaPayload): Promise<IApiResponse> {
    try {
      const existData = await SkillCriteriaModel.findOne({
        where: { name: payload.name },
      });

      if (existData) {
        return {
          status: 400,
          message: `${payload.name} skill already exists`,
          data: null,
        };
      }

      const result = await SkillCriteriaModel.create({ ...payload });

      return {
        status: 200,
        message: `Successfully added ${result.name} skills`,
        data: null,
      };
    } catch (error) {
      return {
        status: 500,
        message: String(error),
        data: null,
      };
    }
  }
  async delete(id: number): Promise<IApiResponse> {
    try {
      const existData = await SkillCriteriaModel.findByPk(id);

      if (!existData) {
        return {
          status: 400,
          message: "skill not found",
          data: null,
        };
      }

      await existData.destroy();

      return {
        status: 200,
        message: `Successfully remove ${existData.name} skills`,
        data: null,
      };
    } catch (error) {
      return {
        status: 500,
        message: String(error),
        data: null,
      };
    }
  }
  async update(
    id: number,
    payload: ISkillCriteriaPayload
  ): Promise<IApiResponse> {
    try {
      const existData = await SkillCriteriaModel.findByPk(id);

      if (!existData) {
        return {
          status: 400,
          message: "skill not found",
          data: null,
        };
      }

      const result = await existData.update(id, payload);

      return {
        status: 200,
        message: `Successfully change ${result.name} skills`,
        data: null,
      };
    } catch (error) {
      return {
        status: 500,
        message: String(error),
        data: null,
      };
    }
  }
}

export default skillCriteriaController;
