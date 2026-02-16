import type { IRouter } from "express";
import { Router } from "express";
import { login, logout } from "../controllers/auth";

const router: IRouter = Router();

router.post("/login", login);
router.post("/logout", logout);

export { router as authRouter };
