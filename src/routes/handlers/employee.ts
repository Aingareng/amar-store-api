import { Request, Response, Router } from "express";
import { Employee } from "../../models";

const employeeRoute = () => {
  const router: Router = Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const users = await Employee.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  return router;
};

export default employeeRoute;
