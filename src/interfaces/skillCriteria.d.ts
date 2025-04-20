import { IApiResponse } from "./apiResponse";

export interface ISkillCriteriaPayload {
  name: string;
  weight: number;
}

export interface ISkillCriteriaData {
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

export interface ISkillCriteriaController {
  get(params?: IQueryParams): Promise<IApiResponse>;
  create(payload: ISkillCriteriaPayload): Promise<IApiResponse>;
  update(id: number, payload: ISkillCriteriaPayload): Promise<IApiResponse>;
  delete(id: number): Promise<IApiResponse>;
}
