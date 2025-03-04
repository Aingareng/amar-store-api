import { Employee } from "../models";
import { IEmployeeController, IEmployeeData } from "../interfaces/employee";
import e, { Request, Response } from "express";
import { IApiResponse } from "../interfaces/apiResponse";
import { Op } from "sequelize";
import { getWeightsByROC } from "../utils/getWeightsByROC";
import { calculateARAS } from "../services/arasService";

export class EmployeeController implements IEmployeeController {
  async createEmployee(req: Request, res: Response): Promise<IApiResponse> {
    try {
      const payload: IEmployeeData = req.body;

      const result = await Employee.create({
        ...payload,
        age: +payload.age,
        experience: +payload.experience,
        isMale: payload.gender === "male" ? true : false,
        createdAt: new Date(),
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
      const weights = await getWeightsByROC();
      const { search, id } = req.query;

      const whereClause: any = {};

      if (!search && id) {
        whereClause.id = id;
      }

      if (search) {
        whereClause[Op.or] = [
          { username: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
          { phone: { [Op.like]: `%${search}%` } },
          { position: { [Op.like]: `%${search}%` } },
        ];
      }

      const employees = await Employee.findAll({ where: whereClause });
      const dataString = JSON.stringify(employees, null, 2);
      const dataParse = JSON.parse(dataString) as [];

      const candidateData = employees.map((c) => {
        return {
          ...c,
          id: c.id,
          name: c.username,
          skill: c.skill,
          leadership: c.leadership,
          education: c.education,
          experience: c.experience,
          age: c.age,
        };
      });

      const arasResults = calculateARAS(candidateData, weights);

      const scoreMap = new Map(
        arasResults.map((item) => [item.id, item.score])
      );
      const result = dataParse.map((item: Employee) => {
        return {
          ...item,
          final_score: scoreMap.get(item.id) || item.final_score,
        };
      });

      return {
        status: 200,
        message: "success",
        data: result.sort((a, b) => b.final_score - a.final_score),
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
      const { id } = req.query;
      const payload: IEmployeeData = req.body;
      const employee = await Employee.findByPk(id as string);

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
      const { id } = req.query;
      const employee = await Employee.findByPk(id as string);

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
