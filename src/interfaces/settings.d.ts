import { IApiResponse } from "./apiResponse";

export interface ISettingData {
  id: number;
  name: string;
  rank_order: number;
}

export interface ISettingController {
  updateSetting(payload: ISettingData[]): Promise<IApiResponse>;
  getSetting(query?: Record<string, string>): Promise<IApiResponse>;
}
