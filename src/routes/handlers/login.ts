import { Request, Response, Router } from "express";
import LoginController, { payloadType } from "../../controllers/login";

const loginRoute = () => {
  const router: Router = Router();

  router.post("/", async (req: Request, res: Response) => {
    try {
      // console.log("🚀 ~ router.post ~ req.body:", req.body);
      const { email, password } = req.body as payloadType;
      const response = await LoginController({ email, password });
      res.status(200).json(response);
    } catch (error: unknown) {
      res.status(500).json({ message: error });
    }
  });

  return router;
};

export default loginRoute;
