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
  search?: string;
}

export interface ICriteriaController {
  updateCriteria(payload: ICriteriaData[]): Promise<IApiResponse>;
  getCriteria({ search }: IQueryParams): Promise<IApiResponse>;
  create(payload: ICriteriaData): Promise<IApiResponse>;
}
