import { Request, Response } from "express";
import { IApiResponse } from "../interfaces/apiResponse";
import { ISettingController, ISettingData } from "../interfaces/settings";
import { CriteriaModel } from "../models/setting.model";

import { calculateROCWeights } from "../services/rocService";
import { SequelizeScopeError } from "sequelize";
export class SettingController implements ISettingController {
  async getSetting(query?: unknown): Promise<IApiResponse> {
    try {
      const allCriteria = await CriteriaModel.findAll();

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
  async updateSetting(payload: ISettingData[]): Promise<IApiResponse> {
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
