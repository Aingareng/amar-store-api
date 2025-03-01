import { Request, Response } from "express";
import { IApiResponse } from "./apiResponse";

export interface IEmployeeData {
  id: number;
  username: string;
  email: string;
  password: string;
  phone: string;
  gender: "male" | "female";
  age: string;
  education: string;
  position: string;
  experience: string;
  leadership: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEmployeeController {
  createEmployee(req: Request, res: Response): Promise<IApiResponse>;
  getEmployees(req: Request, res: Response): Promise<IApiResponse>;
  getEmployeeById(req: Request, res: Response): Promise<IApiResponse>;
  updateEmployee(req: Request, res: Response): Promise<IApiResponse>;
  deleteEmployee(req: Request, res: Response): Promise<IApiResponse>;
}
