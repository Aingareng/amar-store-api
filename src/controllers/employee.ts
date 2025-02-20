import { Employee } from "../models";
import { IEmployeeController, IEmployeeData } from "../interfaces/employee";
import { Request, Response } from "express";
import { IApiResponse } from "../interfaces/apiResponse";

export class EmployeeController implements IEmployeeController {
  async createEmployee(req: Request, res: Response): Promise<IApiResponse> {
    try {
      const payload: IEmployeeData = req.body;
      const result = await Employee.create({
        ...payload,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return {
        status: 201,
        message: "created",
        data: result,
      };
    } catch (error: any) {
      return {
        status: 500,
        message: error.message,
        data: undefined,
      };
    }
  }

  async getEmployees(req: Request, res: Response): Promise<IApiResponse> {
    try {
      const employees = await Employee.findAll();
      return {
        status: 200,
        message: "success",
        data: employees,
      };
    } catch (error: any) {
      return {
        status: 500,
        message: error.message,
        data: undefined,
      };
    }
  }

  async getEmployeeById(req: Request, res: Response): Promise<IApiResponse> {
    try {
      const { id } = req.params;
      const employee = await Employee.findByPk(id);
      if (!employee)
        return {
          status: 404,
          message: "Employee not found",
          data: undefined,
        };

      return {
        status: 200,
        message: "success",
        data: employee,
      };
    } catch (error: any) {
      return {
        status: 500,
        message: error.message,
        data: undefined,
      };
    }
  }

  async updateEmployee(req: Request, res: Response): Promise<IApiResponse> {
    try {
      const { id } = req.params;
      const payload: IEmployeeData = req.body;
      const employee = await Employee.findByPk(id);

      if (!employee)
        return {
          status: 404,
          message: "Employee not found",
          data: undefined,
        };

      await employee.update(payload);
      return {
        status: 201,
        message: "updated",
        data: employee,
      };
    } catch (error: any) {
      return {
        status: 500,
        message: error.message,
        data: undefined,
      };
    }
  }

  async deleteEmployee(req: Request, res: Response): Promise<IApiResponse> {
    try {
      const { id } = req.params;
      const employee = await Employee.findByPk(id);

      if (!employee)
        return {
          status: 404,
          message: "Employee not found",
          data: undefined,
        };

      await employee.destroy();
      return {
        status: 201,
        message: "deleted",
        data: employee,
      };
    } catch (error: any) {
      return {
        status: 500,
        message: error.message,
        data: undefined,
      };
    }
  }
}
