import { Request, Response } from "express";
import { IApiResponse } from "./apiResponse";

export interface IEmployeeData {
  id: number;
  username: string;
  email: string;
  password: string;
  phone: string;
  gender: "male" | "female";
  k3: string;
  k2: string;
  position: string;
  k4: string;
  k5: string;
  createdAt?: Date;
  updatedAt?: Date;
  k1?: string;
}

export interface IEmployeeController {
  createEmployee(req: Request, res: Response): Promise<IApiResponse>;
  getEmployees(req: Request, res: Response): Promise<IApiResponse>;
  getEmployeeById(req: Request, res: Response): Promise<IApiResponse>;
  updateEmployee(req: Request, res: Response): Promise<IApiResponse>;
  deleteEmployee(req: Request, res: Response): Promise<IApiResponse>;
}
