import { Request, Response } from "express";
import { IApiResponse } from "../interfaces/apiResponse";
import { ISettingController, ISettingData } from "../interfaces/settings";
import { SettingModel } from "../models/setting.model";
export class SettingController implements ISettingController {
  async getSetting(query?: unknown): Promise<IApiResponse> {
    try {
      const result = await SettingModel.findAll();

      return {
        status: 200,
        message: "success",
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
  async updateSetting(
    payload: ISettingData,
    id: number
  ): Promise<IApiResponse> {
    try {
      const result = await SettingModel.update(
        { ...payload },
        { where: { id } }
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
