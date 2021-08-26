import { Router } from "express";
import AuthController from "../controllers/authContraller";
import auth from "../middleware/auth";

const router = Router();

router.post("/", AuthController.registerUser);

router.get("/", AuthController.getAllUsers);

router.put("/", auth, AuthController.updateUSerDetails);

router.get("/me", auth, AuthController.me);

router.post("/login", AuthController.logInCustomer);

router.patch("/auth", AuthController.updatePassword);

export default router;
