import { Request, Response, Router } from "express";
import leaderShipController from "../../controllers/leadershipCriteria";
import { ILeadershiplCriteriaPayload } from "../../interfaces/leadershipCriteria";
import { validate } from "../middleware/validation";
import { SkillCriteriaPayloadSchema } from "../../utils/skill-criteria/skillCriteria";

const leadershipCriteriaRoute = () => {
  const router: Router = Router();
  const controller: leaderShipController = new leaderShipController();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const response = await controller.get({ ...req.query });
      res.status(response.status as number).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.post(
    "/",
    validate(SkillCriteriaPayloadSchema),
    async (req: Request, res: Response) => {
      try {
        const payload = req.body as ILeadershiplCriteriaPayload;
        const response = await controller.create(payload);

        res.status(response.status as number).json(response);
      } catch (error) {
        res.status(500).json(error);
      }
    }
  );

  router.put(
    "/:id",
    validate(SkillCriteriaPayloadSchema),
    async (req: Request, res: Response) => {
      try {
        const { id } = req.params as { id: string };
        const payload = req.body as ILeadershiplCriteriaPayload;

        const response = await controller.update(+id, payload);
        res.status(response.status as number).json(response);
      } catch (error) {
        res.status(500).json(error);
      }
    }
  );

  router.delete("/", async (req: Request, res: Response) => {
    try {
      const payload = req.body as { id: number };
      const response = await controller.delete(payload.id);

      res.status(response.status as number).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  return router;
};

export default leadershipCriteriaRoute;
