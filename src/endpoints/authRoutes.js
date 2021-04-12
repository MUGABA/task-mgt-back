import { Router } from "express";

import AuthController from "../controllers/authContraller";
import auth from "../middleware/auth";
const router = Router();

router.post("/auth", AuthController.registerUser);

router.get("/auth", AuthController.getAllUsers);

router.put("/auth", auth, AuthController.updateUSerDetails);

router.get("/auth/me", auth, AuthController.me);

router.post("/auth/login", AuthController.logInCustomer);

router.patch("/auth", AuthController.updatePassword);

export default router;
