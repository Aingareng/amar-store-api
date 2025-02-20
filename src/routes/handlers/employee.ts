import { Request, Response, Router } from "express";
import { Employee } from "../../models";
import { IApiResponse } from "../../interfaces/apiResponse";
import { IEmployeeData } from "../../interfaces/employee";
import { EmployeeController } from "../../controllers/employee";

const employeeRoute = () => {
  const router: Router = Router();
  const controller: EmployeeController = new EmployeeController();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const result = await controller.getEmployees(req, res);
      res.status(result.status as number).json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  router.post("/", async (req: Request, res: Response) => {
    try {
      const result = await controller.createEmployee(req, res);
      res.status(result.status as number).json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  return router;
};

export default employeeRoute;
