import { Router } from "express";

import AuthController from "../controllers/authContraller";
const router = Router();

router.post("/auth", AuthController.registerUser);

router.post("/auth/login", AuthController.logInCustomer);

router.patch("/auth", AuthController.updatePassword);

export default router;
