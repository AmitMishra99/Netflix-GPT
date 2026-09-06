import express from "express";
import {
  signup,
  login,
  googleAuth,
  logout,
  getMe,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/google", googleAuth);
authRouter.post("/logout", logout);
authRouter.get("/me", protectRoute, getMe);

export default authRouter;
