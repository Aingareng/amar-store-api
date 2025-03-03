import { IApiResponse } from "./apiResponse";

export interface ISettingData {
  name: string;
  point: number;
}

export interface ISettingController {
  updateSetting(payload: ISettingData, id: number): Promise<IApiResponse>;
  getSetting(query?: Record<string, string>): Promise<IApiResponse>;
}
