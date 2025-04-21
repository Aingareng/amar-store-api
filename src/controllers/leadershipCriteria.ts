import { Op } from "sequelize";
import { IApiResponse } from "../interfaces/apiResponse";
import {
  ILeadershipCriteriaController,
  ILeadershiplCriteriaPayload,
  IQueryParams,
} from "../interfaces/leadershipCriteria";
import { LeadershipCriteriaModel } from "../models";

class leaderShipController implements ILeadershipCriteriaController {
  async get(params: IQueryParams): Promise<IApiResponse> {
    try {
      const { search } = params;
      const whereClause: any = {};

      if (search) {
        whereClause[Op.or] = [{ name: { [Op.like]: `%${search}%` } }];
      }

      const criterias = await LeadershipCriteriaModel.findAll({
        where: whereClause,
      });

      return {
        status: 200,
        message: "Successfully retrieved data",
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
  async create(payload: ILeadershiplCriteriaPayload): Promise<IApiResponse> {
    try {
      const existData = await LeadershipCriteriaModel.findOne({
        where: { name: payload.name },
      });

      if (existData) {
        return {
          status: 400,
          message: `${payload.name} already exists`,
          data: null,
        };
      }

      const data = {
        name: payload.name,
        weight: payload.weight,
        createdAt: new Date(),
      };

      const result = await LeadershipCriteriaModel.create(data);

      return {
        status: 201,
        message: `Successfully added ${result.name} criteria`,
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
      const existData = await LeadershipCriteriaModel.findByPk(id);

      if (!existData) {
        return {
          status: 400,
          message: "criteria not found",
          data: null,
        };
      }

      await existData.destroy();

      return {
        status: 201,
        message: `Successfully remove ${existData.name} criteria`,
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
    payload: ILeadershiplCriteriaPayload
  ): Promise<IApiResponse> {
    try {
      const existData = await LeadershipCriteriaModel.findByPk(id);

      if (!existData) {
        return {
          status: 400,
          message: "criteria not found",
          data: null,
        };
      }
      const result = await existData.update({
        ...payload,
        updatedAt: new Date(),
      });

      return {
        status: 200,
        message: `Successfully change ${result.name} criteria`,
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

export default leaderShipController;
