import { Request, Response, Router } from "express";
import { SettingController } from "../../controllers/settings";

const criteriaRoute = () => {
  const router: Router = Router();
  const controller: SettingController = new SettingController();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const response = await controller.getSetting();

      res.status(response.status as number).json(response);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch data" });
    }
  });

  router.put("/", async (req: Request, res: Response) => {
    try {
      const payload = {
        name: req.body.name,
        point: req.body.point,
      };
      const response = await controller.updateSetting(payload, req.body.id);

      res.status(response.status as number).json(response);
    } catch (error) {
      res.status(500).json({ message: "Failed to update data" });
    }
  });

  return router;
};

export default criteriaRoute;
