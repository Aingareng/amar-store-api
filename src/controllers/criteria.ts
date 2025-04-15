import { Request, Response } from "express";
import { IApiResponse } from "../interfaces/apiResponse";
import {
  ICriteriaController,
  ICriteriaData,
  IQueryParams,
} from "../interfaces/criteria";
import { CriteriaModel } from "../models/setting.model";

import { calculateROCWeights } from "../services/rocService";
import { Sequelize } from "sequelize";
import { Op } from "sequelize";

export class CriteriaController implements ICriteriaController {
  async create(payload: ICriteriaData): Promise<IApiResponse> {
    const transaction = await CriteriaModel.sequelize?.transaction();
    try {
      if (!transaction) {
        throw new Error("Failed to start transaction");
      }
      const { count } = await CriteriaModel.findAndCountAll();

      if (count >= 5) {
        transaction.rollback();
        return {
          status: 400,
          message: "Criteria cannot be more than 5",
          data: null,
        };
      }
      const existCriteria = await CriteriaModel.findOne({
        where: { name: payload.name },
      });

      if (existCriteria) {
        return {
          status: 400,
          message: "Criteria already available",
          data: null,
        };
      }

      await CriteriaModel.create({
        name: payload.name,
        type: payload.type,
        code: payload.code,
        rank_order: payload.rank_order,
      });
      await calculateROCWeights();

      await transaction.commit();
      return {
        status: 200,
        message: "success",
        data: null,
      };
    } catch (error) {
      if (transaction) {
        await transaction.rollback(); // Rollback jika terjadi error
      }
      return {
        status: 500,
        message: error as string,
        data: null,
      };
    }
  }

  async findCriteria({ id }: IQueryParams): Promise<IApiResponse> {
    try {
      const criteria = await CriteriaModel.findByPk(id);

      if (!criteria) {
        return {
          status: 400,
          message: "Criteria not found",
          data: criteria,
        };
      }

      return {
        status: 200,
        message: "success",
        data: criteria,
      };
    } catch (error) {
      return {
        status: 500,
        message: error as string,
        data: null,
      };
    }
  }

  async getCriteria({ search }: IQueryParams): Promise<IApiResponse> {
    try {
      const whereClause: any = {};
      if (search) {
        whereClause[Op.or] = [
          { name: { [Op.like]: `%${search}%` } },
          { code: { [Op.like]: `%${search}%` } },
          { type: { [Op.like]: `%${search}%` } },
        ];
      }
      const allCriteria = await CriteriaModel.findAll({
        where: whereClause,
        order: [["rank_order", "ASC"]],
      });

      return {
        status: 200,
        message: "success",
        data: allCriteria,
      };
    } catch (error) {
      return {
        status: 500,
        message: error as string,
        data: null,
      };
    }
  }
  async updateCriteria(
    id: number,
    payload: ICriteriaData
  ): Promise<IApiResponse> {
    try {
      if (!payload) {
        return {
          status: 400,
          message: "No criteria to update",
          data: null,
        };
      }
      const criteria = await CriteriaModel.findByPk(id);

      if (!criteria) {
        return {
          status: 404,
          message: "Employee not found",
          data: undefined,
        };
      }

      // Eksekusi query langsung melalui Sequelize
      const result = await criteria.update({ ...payload });
      if (!result) {
        throw new Error("Query execution failed");
      }

      return {
        status: 201,
        message: "Setting updated successfully",
        data: null,
      };
    } catch (error) {
      return {
        status: 500,
        message: error as string,
        data: null,
      };
    }
  }
  async destroyCriteria({ id }: IQueryParams): Promise<IApiResponse> {
    try {
      const criteria = await CriteriaModel.findByPk(id);

      if (!criteria) {
        return {
          status: 400,
          message: "Criteria not found",
          data: null,
        };
      }

      await criteria.destroy();

      return {
        status: 200,
        message: "success",
        data: null,
      };
    } catch (error) {
      return {
        status: 500,
        message: error as string,
        data: null,
      };
    }
  }
}
