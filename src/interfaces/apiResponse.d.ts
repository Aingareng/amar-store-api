import { HttpStatusCode } from "../types/httpCode";

export interface IApiResponse {
  status?: HttpStatusCode;
  message?: string;
  data?: Record<string, any>;
}
