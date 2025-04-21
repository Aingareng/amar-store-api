import { IApiResponse } from "./apiResponse";

export interface ILeadershiplCriteriaPayload {
  name: string;
  weight: number;
}

export interface ILeadershipCriteriaData {
  id: number;
  name: string;
  weight: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface IQueryParams {
  id?: number;
  search?: string;
}

export interface ILeadershipCriteriaController {
  get(params: IQueryParams): Promise<IApiResponse>;
  create(payload: ILeadershiplCriteriaPayload): Promise<IApiResponse>;
  update(
    id: number,
    payload: ILeadershiplCriteriaPayload
  ): Promise<IApiResponse>;
  delete(id: number): Promise<IApiResponse>;
}
