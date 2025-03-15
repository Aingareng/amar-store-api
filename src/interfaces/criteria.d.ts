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
  id?: number;
  search?: string;
}

export interface ICriteriaController {
  updateCriteria(id: number, payload: ICriteriaData): Promise<IApiResponse>;
  getCriteria({ search }: IQueryParams): Promise<IApiResponse>;
  create(payload: ICriteriaData): Promise<IApiResponse>;
  findCriteria({ id }: IQueryParams): Promise<IApiResponse>;
  destroyCriteria({ id }: IQueryParams): Promise<IApiResponse>;
}
