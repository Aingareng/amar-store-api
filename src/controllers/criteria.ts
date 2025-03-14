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

      const [user, isCreated] = await CriteriaModel.findOrCreate(payload);
      await calculateROCWeights();

      if (!isCreated) {
        transaction.rollback();
        return {
          status: 400,
          message: "Criteria already exist",
          data: null,
        };
      }

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
        message: "Internal Server Error",
        data: null,
      };
    }
  }

  async getCriteria(query?: IQueryParams): Promise<IApiResponse> {
    try {
      const allCriteria = await CriteriaModel.findAll({ where: { ...query } });

      // const rankOrdered = allCriteria.map((c) => ({ rankOrder: c.rank_order }));

      // const weights = calculateROCWeights(rankOrdered);
      // console.log("🚀 ~ SettingController ~ getSetting ~ weights:", weights);

      return {
        status: 200,
        message: "success",
        data: allCriteria,
      };
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
        data: null,
      };
    }
  }
  async updateCriteria(payload: ICriteriaData[]): Promise<IApiResponse> {
    try {
      if (!payload.length) {
        return {
          status: 400,
          message: "No settings to update",
          data: null,
        };
      }

      // Ambil semua ID yang perlu diupdate
      const ids = payload.map((item) => item.id);

      // Buat CASE WHEN untuk mengupdate tiap record sesuai ID-nya
      const caseQuery = payload
        .map((item) => `WHEN id = ${item.id} THEN ${item.rank_order}`)
        .join(" ");

      const query = `
      UPDATE criterias
      SET rank_order = CASE ${caseQuery} END
      WHERE id IN (${ids.join(",")});
    `;

      // Eksekusi query langsung melalui Sequelize
      const result = await CriteriaModel.sequelize?.query(query);
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
}
