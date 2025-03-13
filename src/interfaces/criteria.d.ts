import { IApiResponse } from "./apiResponse";

export interface ICriteriaData {
  id?: number;
  name?: string;
  rank_order?: number;
  weight?: number;
  type?: "benefit" | "cost";
  code?: string;
}
export interface IQueryParams {
  name?: string;
  rank_order?: number;
  type?: "benefit" | "cost";
}

export interface ICriteriaController {
  updateCriteria(payload: ICriteriaData[]): Promise<IApiResponse>;
  getCriteria(query?: Record<string, string>): Promise<IApiResponse>;
  create(payload: ICriteriaData): Promise<IApiResponse>;
}
