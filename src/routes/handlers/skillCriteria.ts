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
      res.status(response.status as number).json(response);
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

        res.status(response.status as number).json(response);
      } catch (error) {
        res.status(500).json({ error });
      }
    }
  );

  router.put(
    "/:id",
    validate(SkillCriteriaPayloadSchema),
    async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const payload = req.body as ISkillCriteriaPayload;
        const response = await controller.update(+id, { ...payload });
        res.status(response.status as number).json(response);
      } catch (error) {
        res.status(500).json({ error });
      }
    }
  );

  router.delete("/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const response = await controller.delete(+id);
      res.status(response.status as number).json(response);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  return router;
};

export default skillCriteriaRoute;
