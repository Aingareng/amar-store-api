import { IApiResponse } from "./apiResponse";

export interface ISettingData {
  id: number;
  name: string;
  point: number;
}

export interface ISettingController {
  updateSetting(payload: ISettingData[]): Promise<IApiResponse>;
  getSetting(query?: Record<string, string>): Promise<IApiResponse>;
}
