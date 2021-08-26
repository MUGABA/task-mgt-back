import { Router } from "express";
import Role from "../controllers/rolesController";
import auth from "../middleware/auth";

const router = Router();

router.post("/", auth, Role.createRoles);

router.get("/", auth, Role.getAllRoles);

export default router;
