import { Request, Response, Router } from "express";
import skillCriteriaController from "../../controllers/skillCriteria";
import { ISkillCriteriaPayload } from "../../interfaces/skillCriteria";
import { validate } from "../middleware/validation";
import { SkillCriteriaPayloadSchema } from "../../utils/skill-criteria/skillCriteria";

const skillCriteriaRoute = () => {
  const router: Router = Router();
  const controller: skillCriteriaController = new skillCriteriaController();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const response = await controller.get({ ...req.query });
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  router.post(
    "/",
    validate(SkillCriteriaPayloadSchema),
    async (req: Request, res: Response) => {
      try {
        const response = await controller.create(
          req.body as ISkillCriteriaPayload
        );
      } catch (error) {
        res.status(500).json({ error });
      }
    }
  );

  router.put("/", async (req: Request, res: Response) => {
    try {
      const { id, payload } = req.body as {
        id: number;
        payload: ISkillCriteriaPayload;
      };
      const response = await controller.update(id, payload);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  router.delete("/", async (req: Request, res: Response) => {
    try {
      const { id } = req.body as { id: number };
      const response = await controller.delete(id);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  return router;
};

export default skillCriteriaRoute;
