import { Request, Response } from "express";
import { IApiResponse } from "../interfaces/apiResponse";
import { ISettingController, ISettingData } from "../interfaces/settings";
import { SettingModel } from "../models/setting.model";
import { calculateROCWeights } from "../services/rocService";
export class SettingController implements ISettingController {
  async getSetting(query?: unknown): Promise<IApiResponse> {
    try {
      const allCriteria = await SettingModel.findAll();

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
      const result = await Promise.all(
        payload.map((item) =>
          SettingModel.update({ point: item.point }, { where: { id: item.id } })
        )
      );

      return {
        status: 201,
        message: "Setting updated successfully",
        data: result,
      };
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
        data: null,
      };
    }
  }
}
