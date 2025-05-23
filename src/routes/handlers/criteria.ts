import { Request, Response, Router } from "express";
import { CriteriaController } from "../../controllers/criteria";
import { calculateROCWeights } from "../../services/rocService";
import { ICriteriaData } from "../../interfaces/criteria";

const criteriaRoute = () => {
  const router: Router = Router();
  const controller: CriteriaController = new CriteriaController();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const response = await controller.getCriteria({ ...req.query });

      res.status(response.status as number).json(response);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch data" });
    }
  });

  router.get("/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const response = await controller.findCriteria({ id: +id });

      res.status(response.status as number).json(response);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch data" });
    }
  });

  router.post("/", async (req: Request, res: Response) => {
    try {
      const response = await controller.create(req.body as ICriteriaData);
      res.status(response.status as number).json(response);
    } catch (error) {
      res.status(500).json({ message: "Failed to create data" });
    }
  });

  router.put("/", async (req: Request, res: Response) => {
    try {
      const { data } = req.body;
      const { id } = req.query;

      const response = await controller.updateCriteria(Number(id), data);
      await calculateROCWeights();

      res.status(response.status as number).json(response);
    } catch (error) {
      res.status(500).json({ message: "Failed to update data" });
    }
  });

  router.delete("/", async (req: Request, res: Response) => {
    try {
      const response = await controller.destroyCriteria({
        id: Number(req.query.id),
      });
      await calculateROCWeights();
      res.status(response.status as number).json(response);
    } catch (error) {
      res.status(500).json({ message: "Failed to delete data" });
    }
  });

  return router;
};

export default criteriaRoute;
